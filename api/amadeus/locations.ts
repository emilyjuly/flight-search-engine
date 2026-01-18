import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAmadeusToken } from "./getToken.ts";

const AMADEUS_BASE_URL = "https://test.api.amadeus.com/v1";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const keyword = Array.isArray(req.query.keyword)
    ? req.query.keyword[0]
    : req.query.keyword;

  if (!keyword || keyword.length < 2) {
    return res.status(400).json({ error: "Invalid keyword" });
  }

  try {
    const tokenData = await getAmadeusToken();

    const response = await fetch(
      `${AMADEUS_BASE_URL}/reference-data/locations?keyword=${encodeURIComponent(
        keyword,
      )}&subType=AIRPORT,CITY&page[limit]=10`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("AMADEUS ERROR:", text);
      return res.status(500).json({ error: "Amadeus locations failed" });
    }

    const data = await response.json();
    return res.status(200).json(data.data ?? []);
  } catch (error) {
    console.error("UNEXPECTED ERROR:", error);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
