/**
 * Cloudflare Worker — GitHub OAuth Proxy
 *
 * 배포 방법:
 *   1. Cloudflare Dashboard > Workers & Pages > Create application > Create Worker
 *   2. 이 코드 붙여넣기 후 Deploy
 *   3. Settings > Variables 에서 환경 변수 두 개 추가:
 *      - GITHUB_CLIENT_ID     : GitHub OAuth App 의 Client ID
 *      - GITHUB_CLIENT_SECRET : GitHub OAuth App 의 Client Secret (Encrypt 체크)
 *   4. Worker URL 을 .env 의 PUBLIC_OAUTH_WORKER_URL 에 기입
 */

const ALLOWED_ORIGIN = "https://blog.somiri.dev";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    let code;
    try {
      ({ code } = await request.json());
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!code) {
      return new Response(JSON.stringify({ error: "Missing code" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

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
