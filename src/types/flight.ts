export type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first';

export interface Airport {
  code: string;
  city: string;
  cityArabic: string;
  name: string;
  nameArabic: string;
  country: string;
  countryArabic: string;
  timezone: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: {
    code: string;
    city: string;
    cityArabic?: string;
    airport: string;
    terminal: string;
  };
  destination: {
    code: string;
    city: string;
    cityArabic?: string;
    airport: string;
    terminal: string;
  };
  departureTime: string;
  arrivalTime: string;
  duration: string;
  aircraft: {
    model: string;
    registration: string;
  };
  stops: number;
  prices: Record<CabinClass, number>;
  amenities: {
    wifi: boolean;
    meal: string;
    entertainment: boolean;
    power: boolean;
  };
  seatsRemaining: number;
  status: 'ON_TIME' | 'DELAYED' | 'BOARDING' | 'DEPARTED' | 'LANDED';
}
