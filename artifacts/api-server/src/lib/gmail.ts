import { google } from "googleapis";

let cachedAccessToken: string | null = null;
let cachedExpiresAt: number = 0;

async function getAccessToken() {
  if (cachedAccessToken && cachedExpiresAt > Date.now()) {
    return cachedAccessToken;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  if (!hostname) {
    throw new Error("REPLIT_CONNECTORS_HOSTNAME is not set");
  }

  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken) {
    throw new Error("X-Replit-Token not found for repl/depl");
  }

  const connectionSettings = await fetch(
    "https://" +
      hostname +
      "/api/v2/connection?include_secrets=true&connector_names=google-mail",
    {
      headers: {
        Accept: "application/json",
        "X-Replit-Token": xReplitToken,
      },
    },
  )
    .then((res) => res.json())
    .then((data) => data.items?.[0]);

  if (!connectionSettings) {
    throw new Error("Gmail not connected — no connection found");
  }

  const accessToken =
    connectionSettings.settings?.access_token ||
    connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!accessToken) {
    throw new Error("Gmail not connected — no access token");
  }

  cachedAccessToken = accessToken;
  cachedExpiresAt = connectionSettings.settings?.expires_at
    ? new Date(connectionSettings.settings.expires_at).getTime()
    : Date.now() + 30 * 60 * 1000;

  return cachedAccessToken;
}

export async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  return google.gmail({ version: "v1", auth: oauth2Client });
}
