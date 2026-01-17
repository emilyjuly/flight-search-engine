import { useState } from 'react'
import type { Flight } from '../types/flight'
import type { FlightSearchParams } from '../components/SearchForm/SearchForm'

export function useFlightsSearch() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchFlights = async (params: FlightSearchParams) => {
    setLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockFlights: Flight[] = [
        {
          id: '1',
          airline: 'Delta',
          price: 450,
          stops: 1,
          departureTime: '08:00',
          arrivalTime: '14:00',
          duration: '6h',
        },
        {
          id: '2',
          airline: 'United',
          price: 520,
          stops: 0,
          departureTime: '10:30',
          arrivalTime: '16:00',
          duration: '5h 30m',
        },
      ]

      setFlights(mockFlights)
    } catch (err) {
      setError('Failed to fetch flights')
    } finally {
      setLoading(false)
    }
  }

  return {
    flights,
    loading,
    error,
    searchFlights,
  }
}
