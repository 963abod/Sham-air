export interface AircraftSpec {
  id: string;
  name: string;
  tagline: string;
  manufacturer: string;
  rangeKm: number;
  cruiseSpeedKm: string;
  engineThrust: string;
  capacity: number;
  firstClassSuites: number;
  businessSuites: number;
  premiumEconSeats: number;
  economySeats: number;
  seatPitch: {
    first: string;
    business: string;
    premiumEcon: string;
    economy: string;
  };
  description: string;
}

export const FLEET_DATA: AircraftSpec[] = [
  {
    id: 'a350-1000',
    name: 'Airbus A350-1000 Flagship',
    tagline: 'The Pinnacle of Imperial Syrian Flight',
    manufacturer: 'Airbus',
    rangeKm: 16100,
    cruiseSpeedKm: 'Mach 0.85 (903 km/h)',
    engineThrust: '97,000 lbf (Rolls-Royce Trent XWB-97)',
    capacity: 298,
    firstClassSuites: 6,
    businessSuites: 38,
    premiumEconSeats: 42,
    economySeats: 212,
    seatPitch: {
      first: '82" Private Sanctuary with Sliding Door & Private Courtyard Air Flow',
      business: '78" Fully Flat Bed with Direct Aisle Access',
      premiumEcon: '40" Recline with Leather Legrest',
      economy: '34" Ultra-ergonomic Basalt Fabric Contour',
    },
    description: 'Custom commissioned with acoustic dampening cabin lining, ambient jasmine aromatherapy diffusers, and state-of-the-art climate control mimicking Damascene breeze.',
  },
  {
    id: '787-9',
    name: 'Boeing 787-9 Dreamliner',
    tagline: 'Silk Road Sky Transporter',
    manufacturer: 'Boeing',
    rangeKm: 14010,
    cruiseSpeedKm: 'Mach 0.85 (903 km/h)',
    engineThrust: '76,000 lbf (GEnx-1B)',
    capacity: 242,
    firstClassSuites: 4,
    businessSuites: 28,
    premiumEconSeats: 36,
    economySeats: 174,
    seatPitch: {
      first: '80" Royal Suite with Ablaq Inlaid Wood',
      business: '76" Fully Flat Suite',
      premiumEcon: '38" Executive Recline',
      economy: '32"-33" Comfort Contour',
    },
    description: 'Featuring dynamic dimmable electrochromic windows styled with subtle mashrabiya geometric light patterns.',
  },
];
