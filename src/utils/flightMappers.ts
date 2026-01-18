import { Flight } from "../types/flight";

export function mapAmadeusToFlights(apiResponse: any): Flight[] {
  return apiResponse.data.map((offer: any, index: number) => {
    const itinerary = offer.itineraries[0];
    const segment = itinerary.segments[0];

    return {
      id: offer.id ?? String(index),
      airline: segment.carrierCode,
      price: Number(offer.price.total),
      stops: itinerary.segments.length - 1,
      departureTime: segment.departure.at,
      arrivalTime: itinerary.segments[itinerary.segments.length - 1].arrival.at,
      duration: itinerary.duration,
    };
  });
}
