import { useMemo } from "react";
import type { Flight } from "../types/flight";
import type { FlightFilters } from "../types/filters";

export function useFlightFilters(flights: Flight[], filters: FlightFilters) {
  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const matchPrice = flight.price <= filters.maxPrice;

      const matchAirline =
        filters.airlines.length === 0 ||
        filters.airlines.includes(flight.airline);

      const matchStops =
        filters.stops.length === 0 || filters.stops.includes(flight.stops);

      return matchPrice && matchAirline && matchStops;
    });
  }, [flights, filters]);

  return { filteredFlights };
}
