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
 * 방문자 수 / 좋아요 사용 시 추가 설정:
 *   4. Workers & Pages > KV > Create namespace "BLOG_KV"
 *   5. Worker Settings > Bindings > KV Namespace 에 BLOG_KV 바인딩 추가
 *   6. .env 에 PUBLIC_OAUTH_WORKER_URL=https://your-worker.workers.dev 기입
 *      (기존 OAuth URL 과 동일한 Worker URL 사용)
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

      if (!env.BLOG_KV) return json({ visits: 0, likes: 0 });

      const [visits, likes] = await Promise.all([
        env.BLOG_KV.get(`visits:${post}`),
        env.BLOG_KV.get(`likes:${post}`),
      ]);

      return json({
        visits: Number(visits ?? 0),
        likes: Number(likes ?? 0),
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

      if (!env.BLOG_KV) return json({ ok: true, visits: 0 });

      const current = Number((await env.BLOG_KV.get(`visits:${post}`)) ?? 0);
      const updated = current + 1;
      await env.BLOG_KV.put(`visits:${post}`, String(updated));

      return json({ ok: true, visits: updated });
    }

    // ── POST /like ────────────────────────────────────────────
    if (path === "/like" && request.method === "POST") {
      let post;
      try {
        ({ post } = await request.json());
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }
      if (!post) return json({ error: "Missing post" }, 400);

      if (!env.BLOG_KV) return json({ ok: true, likes: 0 });

      const current = Number((await env.BLOG_KV.get(`likes:${post}`)) ?? 0);
      const updated = current + 1;
      await env.BLOG_KV.put(`likes:${post}`, String(updated));

      return json({ ok: true, likes: updated });
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
