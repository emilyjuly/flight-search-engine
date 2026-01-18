import type { Flight } from "../types/flight";

export type PriceChartPoint = {
  label: string;
  price: number;
};

export function mapFlightsToPriceChart(flights: Flight[]): PriceChartPoint[] {
  return flights.map((flight, index) => ({
    label: `${flight.airline} ${index + 1}`,
    price: flight.price,
  }));
}
