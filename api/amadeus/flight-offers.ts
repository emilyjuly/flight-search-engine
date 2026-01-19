import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAmadeusToken } from "../../lib/getToken.ts";

const AMADEUS_BASE_URL = "https://test.api.amadeus.com/v2";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = Array.isArray(req.query.origin)
    ? req.query.origin[0]
    : req.query.origin;

  const destination = Array.isArray(req.query.destination)
    ? req.query.destination[0]
    : req.query.destination;

  const departureDate = Array.isArray(req.query.departureDate)
    ? req.query.departureDate[0]
    : req.query.departureDate;

  if (!origin || !destination || !departureDate) {
    return res.status(400).json({
      error: "Missing parameters",
      received: { origin, destination, departureDate },
    });
  }

  try {
    const tokenData = await getAmadeusToken();

    const query = new URLSearchParams({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
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

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Amadeus API error",
        raw: text,
      });
    }

    return res.status(200).json(JSON.parse(text));
  } catch (error: any) {
    console.error("FLIGHT OFFERS ERROR:", error);
    return res.status(500).json({
      error: "Failed to fetch flight offers",
      details: error.message,
    });
  }
}
