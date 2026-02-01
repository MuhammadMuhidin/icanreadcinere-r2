import { R2Explorer } from "r2-explorer";

export default {
  async fetch(request, env) {
    const auth = request.headers.get("Authorization");

    if (!auth || !auth.startsWith("Basic ")) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="R2 Explorer"'
        }
      });
    }

    const decoded = atob(auth.replace("Basic ", ""));
    const [username, password] = decoded.split(":");

    // 🔑 ambil data user dari secret JSON
    const users = JSON.parse(env.BASIC_AUTH_USERS);
    const user = users[username];

    if (!user || user.password !== password) {
      return new Response("Forbidden", { status: 403 });
    }

    const explorer = R2Explorer({
      readonly: false,
      prefix: user.prefix,   // ⭐ folder ditentukan DI SINI
      disablePublicUrls: true
    });

    return explorer.fetch(request, env);
  }
};
