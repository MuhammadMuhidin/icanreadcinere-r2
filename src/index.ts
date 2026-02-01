import { R2Explorer } from "r2-explorer";

export default {
  fetch(request, env) {
    return R2Explorer({
      readonly: false,
      basicAuth: {
        username: env.BASIC_AUTH_USER,
        password: env.BASIC_AUTH_PASS,
      }
    }).fetch(request, env);
  }
};};
