/**
 * Cloudflare Worker — GitHub OAuth Proxy + Blog Stats
 *
 * 배포 방법:
 *   1. Cloudflare Dashboard > Workers & Pages > Create application > Create Worker
 *   2. 이 코드 붙여넣기 후 Deploy
 *   3. Settings > Variables 에서 환경 변수 두 개 추가:
 *      - GITHUB_CLIENT_ID     : GitHub OAuth App 의 Client ID
 *      - GITHUB_CLIENT_SECRET : GitHub OAuth App 의 Client Secret (Encrypt 체크)
 *
 * 방문자 수 사용 시 추가 설정:
 *   4. Workers & Pages > KV > Create namespace "BLOG_KV"
 *   5. Worker Settings > Bindings > KV Namespace 에 BLOG_KV 바인딩 추가
 *   6. .env 에 PUBLIC_OAUTH_WORKER_URL=https://your-worker.workers.dev 기입
 *
 * KV 키 구조:
 *   visit-ip:{post}:{ip}:{YYYY-MM-DD}  TTL 86400  — 일별 IP 중복 방지
 *   visits:total:{post}                            — 누적 방문 수
 *   visits:daily:{post}:{YYYY-MM-DD}   TTL 172800 — 일별 방문 수
 */

const ALLOWED_ORIGIN = "https://blog.somiri.dev";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function todayUTC() {
  return new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";

    // ── GET /stats?post={slug} ────────────────────────────────
    if (path === "/stats" && request.method === "GET") {
      const post = url.searchParams.get("post");
      if (!post) return json({ error: "Missing post param" }, 400);

      if (!env.BLOG_KV) return json({ today: 0, total: 0 });

      const date = todayUTC();
      const [total, today] = await Promise.all([
        env.BLOG_KV.get(`visits:total:${post}`),
        env.BLOG_KV.get(`visits:daily:${post}:${date}`),
      ]);

      return json({
        today: Number(today ?? 0),
        total: Number(total ?? 0),
      });
    }

    // ── POST /visit ───────────────────────────────────────────
    if (path === "/visit" && request.method === "POST") {
      let post;
      try {
        ({ post } = await request.json());
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }
      if (!post) return json({ error: "Missing post" }, 400);

      if (!env.BLOG_KV) return json({ ok: true, today: 0, total: 0 });

      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const date = todayUTC();
      const ipKey = `visit-ip:${post}:${ip}:${date}`;

      // 같은 IP는 하루에 한 번만 카운트
      const alreadyCounted = await env.BLOG_KV.get(ipKey);
      if (alreadyCounted) {
        const [total, today] = await Promise.all([
          env.BLOG_KV.get(`visits:total:${post}`),
          env.BLOG_KV.get(`visits:daily:${post}:${date}`),
        ]);
        return json({ ok: true, today: Number(today ?? 0), total: Number(total ?? 0), duplicate: true });
      }

      // IP 중복 방지 키 저장 (24시간 TTL)
      await env.BLOG_KV.put(ipKey, "1", { expirationTtl: 86400 });

      // 누적 / 일별 카운트 증가
      const [currentTotal, currentDaily] = await Promise.all([
        env.BLOG_KV.get(`visits:total:${post}`),
        env.BLOG_KV.get(`visits:daily:${post}:${date}`),
      ]);

      const newTotal = Number(currentTotal ?? 0) + 1;
      const newDaily = Number(currentDaily ?? 0) + 1;

      await Promise.all([
        env.BLOG_KV.put(`visits:total:${post}`, String(newTotal)),
        env.BLOG_KV.put(`visits:daily:${post}:${date}`, String(newDaily), { expirationTtl: 172800 }),
      ]);

      return json({ ok: true, today: newDaily, total: newTotal });
    }

    // ── POST / — GitHub OAuth ─────────────────────────────────
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    let code;
    try {
      ({ code } = await request.json());
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    if (!code) return json({ error: "Missing code" }, 400);

    const ghRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await ghRes.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  },
};
