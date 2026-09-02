import { requireEnv } from "@/lib/env";

type TokenCacheEntry = { accessToken: string; expiresAt: number };

const tokenCache = new Map<string, TokenCacheEntry>();

async function getAccessToken(
  cacheKey: string,
  clientId: string,
  clientSecret: string,
  refreshToken: string
) {
  const cached = tokenCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now() + 30_000) {
    return cached.accessToken;
  }

  const accountsDomain = process.env.ZOHO_ACCOUNTS_DOMAIN || "https://accounts.zoho.com";
  const url = new URL(`${accountsDomain}/oauth/v2/token`);
  url.searchParams.set("refresh_token", refreshToken);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("client_secret", clientSecret);
  url.searchParams.set("grant_type", "refresh_token");

  const res = await fetch(url.toString(), { method: "POST" });
  const data = await res.json();

  if (!res.ok || !data.access_token) {
    throw new Error(`Zoho token refresh failed: ${JSON.stringify(data)}`);
  }

  tokenCache.set(cacheKey, {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  });

  return data.access_token as string;
}

export async function getZohoCrmAccessToken() {
  const [clientId, clientSecret, refreshToken] = requireEnv(
    "ZOHO_CRM_CLIENT_ID",
    "ZOHO_CRM_CLIENT_SECRET",
    "ZOHO_CRM_REFRESH_TOKEN"
  );
  return getAccessToken("crm", clientId, clientSecret, refreshToken);
}

export async function getZohoCampaignsAccessToken() {
  const [clientId, clientSecret, refreshToken] = requireEnv(
    "ZOHO_CAMPAIGNS_CLIENT_ID",
    "ZOHO_CAMPAIGNS_CLIENT_SECRET",
    "ZOHO_CAMPAIGNS_REFRESH_TOKEN"
  );
  return getAccessToken("campaigns", clientId, clientSecret, refreshToken);
}
