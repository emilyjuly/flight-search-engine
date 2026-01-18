import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { origin, maxPrice } = req.query;

  try {
    const tokenResponse = await fetch(
      `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"}/api/amadeus/token`,
    );

    const tokenData = await tokenResponse.json();

    const response = await fetch(
      `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${origin}&maxPrice=${maxPrice}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      },
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Flight destination error" });
  }
}
