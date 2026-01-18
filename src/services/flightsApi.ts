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
  
  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }

  return response.json();
}
