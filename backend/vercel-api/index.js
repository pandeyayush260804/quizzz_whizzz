import app from "../serverless-app.js";
import { ensureDb } from "../serverless-app.js";

export default async function handler(req, res) {
  try {
    await ensureDb();
    return app(req, res);
  } catch (err) {
    console.log("❌ Serverless handler error:", err);

    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
