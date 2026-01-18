import type { VercelRequest, VercelResponse } from "@vercel/node";

const AMADEUS_BASE_URL = "https://test.api.amadeus.com/v2";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { origin, destination, departureDate } = req.query;

  if (!origin || !destination || !departureDate) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const tokenResponse = await fetch(
      `${
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"
      }/api/amadeus/token`,
    );

    const tokenData = await tokenResponse.json();

    const query = new URLSearchParams({
      originLocationCode: origin as string,
      destinationLocationCode: destination as string,
      departureDate: departureDate as string,
      adults: "1",
    });

    const response = await fetch(
      `${AMADEUS_BASE_URL}/shopping/flight-offers?${query.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      },
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flight offers" });
  }
}
