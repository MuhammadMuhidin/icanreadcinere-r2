import { R2Explorer } from "r2-explorer";

export default {
  fetch: (req: Request, env: Env): Promise<Response> =>
    R2Explorer({
      readonly: false,
      basicAuth: {
        username: env.BASIC_AUTH_USER,
        password: env.BASIC_AUTH_PASS,
      },
    }).fetch(req, env),
};

interface Env {
  BASIC_AUTH_USER: string;
  BASIC_AUTH_PASS: string;
}
