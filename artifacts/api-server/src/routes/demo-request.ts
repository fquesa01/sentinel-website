import { Router, type Request, type Response } from "express";
import { getUncachableGmailClient } from "../lib/gmail";
import { logger } from "../lib/logger";

const router = Router();

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post("/demo-request", async (req: Request, res: Response) => {
  const { name, email, businessName } = req.body;

  if (!name || !email || !businessName) {
    res.status(400).json({ error: "All fields are required: name, email, businessName" });
    return;
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof businessName !== "string") {
    res.status(400).json({ error: "All fields must be strings" });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  const sanitize = (s: string) => s.replace(/[\r\n]/g, " ").slice(0, 200);
  const safeName = sanitize(name);
  const safeBusiness = sanitize(businessName);

  const subject = `Demo Request: ${safeBusiness} — ${safeName}`;
  const body = [
    `New demo request from Sentinel Counsel website`,
    ``,
    `Name: ${safeName}`,
    `Email: ${email}`,
    `Business: ${safeBusiness}`,
    ``,
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const rawEmail = [
    `To: 1@sntlabs.io`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    ``,
    body,
  ].join("\r\n");

  const encodedMessage = Buffer.from(rawEmail)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    const gmail = await getUncachableGmailClient();
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    logger.info({ name, email, businessName }, "Demo request email sent");
    res.json({ success: true });
  } catch (err: any) {
    logger.error({ err: err.message, name, email, businessName }, "Failed to send demo request email");
    res.status(500).json({ error: "Failed to send demo request. Please try again later." });
  }
});

export default router;
