/**
 * gamebai-server deno project
 */
import { handleWebSocket } from "./websocket.ts";
import { handleHttpRequest } from "./http.ts";

Deno.serve({ hostname: "0.0.0.0", port: 8000 }, async (req) => {
  if (req.headers.get("upgrade") === "websocket") {
    return handleWebSocket(req);
  } else {
    return handleHttpRequest(req);
  }
});
