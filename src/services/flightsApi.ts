export async function fetchFlights(params: {
  origin: string;
  destination: string;
  departureDate: string;
}) {
  const query = new URLSearchParams({
    origin: params.origin,
    destination: params.destination,
    departureDate: params.departureDate,
  });

  const response = await fetch(
    `/api/amadeus/flight-offers?${query.toString()}`,
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }

  return response.json();
}

export async function fetchLocations(keyword: string) {
  const res = await fetch(`/api/amadeus/locations?keyword=${keyword}`);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json();
}

