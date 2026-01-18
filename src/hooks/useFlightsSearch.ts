import { useState } from "react";
import type { Flight } from "../types/flight";
import type { FlightSearchParams } from "../components/SearchForm/SearchForm";
import { fetchFlights } from "../services/flightsApi";
import { mapAmadeusToFlights } from "../utils/flightMappers";

export function useFlightsSearch() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchFlights = async (params: FlightSearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchFlights({
        origin: params.origin,
        destination: params.destination,
        departureDate: params.departureDate,
      });

      const mappedFlights = mapAmadeusToFlights(response);

      setFlights(mappedFlights);
    } catch (err) {
      setError("Unable to load flights");
    } finally {
      setLoading(false);
    }
  };

  return {
    flights,
    loading,
    error,
    searchFlights,
  };
}
