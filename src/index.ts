import { R2Explorer } from "r2-explorer";

const USER_FOLDER_MAP = {
  mita: "MITA/",
  test: "TEST/",
  admin: ""
};

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

    // validasi password
    if (password !== env.BASIC_AUTH_PASS) {
      return new Response("Forbidden", { status: 403 });
    }

    // tentukan folder
    const prefix = USER_FOLDER_MAP[username];
    if (prefix === undefined) {
      return new Response("No folder access", { status: 403 });
    }

    // 🔑 inject prefix ke R2 Explorer
    const explorer = R2Explorer({
      readonly: false,
      prefix,              // ⭐ INI KUNCI UTAMA
      disablePublicUrls: true
    });

    return explorer.fetch(request, env);
  }
};
