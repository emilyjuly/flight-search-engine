export async function getAmadeusToken() {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.AMADEUS_CLIENT_ID || "",
    client_secret: process.env.AMADEUS_CLIENT_SECRET || "",
  });

  const response = await fetch(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    },
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Token error: ${text}`);
  }

  return JSON.parse(text);
}
