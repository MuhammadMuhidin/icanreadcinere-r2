import { R2Explorer } from "r2-explorer";

export default {
  fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    // ✅ biarkan request ini lewat tanpa auth
    if (url.pathname === "/favicon.ico") {
      return new Response(null, { status: 204 });
    }

    return R2Explorer({
      readonly: false,
      basicAuth: {
        username: env.BASIC_AUTH_USER,
        password: env.BASIC_AUTH_PASS,
      },
    }).fetch(req, env);
  },
};

interface Env {
  BASIC_AUTH_USER: string;
  BASIC_AUTH_PASS: string;
}
