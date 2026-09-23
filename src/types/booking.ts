import { CabinClass, Flight } from './flight';

export interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

export interface BookingState {
  tripType: 'round_trip' | 'one_way' | 'multi_city';
  origin: string;
  destination: string;
  departureDate: string | null;
  returnDate: string | null;
  passengers: PassengerCount;
  cabinClass: CabinClass;
  selectedOutboundFlight: Flight | null;
  selectedReturnFlight: Flight | null;
  selectedSeats: string[];
  selectedMeals: string[];
  totalPrice: number;
  currency: string;
  step: number;
  pnr: string | null;
  passengerDetails?: Array<{
    firstName: string;
    lastName: string;
    passportNumber: string;
    nationality: string;
  }>;
}

export interface AircraftSeat {
  id: string;
  row: number;
  col: string;
  cabin: CabinClass;
  isOccupied: boolean;
  price: number;
  type: 'window' | 'aisle' | 'middle' | 'suite';
}
