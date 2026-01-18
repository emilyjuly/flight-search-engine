import { useState } from "react";
import { getFlightDestinations } from "../services/flightsApi";

export function useFlightDestinations() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDestinations = async () => {
    setLoading(true);
    const result = await getFlightDestinations("PAR", 200);
    setData(result.data);
    setLoading(false);
  };

  return { data, loading, fetchDestinations };
}
