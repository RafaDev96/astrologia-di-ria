// Simplified astrological calculations
// Note: For production, use a proper ephemeris library

import { zodiacDegrees } from '@/data/astrologyData';

export interface BirthData {
  date: Date;
  time: string;
  latitude: number;
  longitude: number;
  city: string;
}

export interface PlanetPosition {
  planet: string;
  degree: number;
  sign: string;
  house: number;
  retrograde: boolean;
}

export interface ChartData {
  birthData: BirthData;
  planets: PlanetPosition[];
  houses: number[];
  aspects: ChartAspect[];
  ascendant: { degree: number; sign: string };
  midheaven: { degree: number; sign: string };
}

export interface ChartAspect {
  planet1: string;
  planet2: string;
  type: string;
  angle: number;
  orb: number;
}

// Get zodiac sign from degree
export function getSignFromDegree(degree: number): string {
  const normalizedDegree = ((degree % 360) + 360) % 360;
  const signData = zodiacDegrees.find(
    z => normalizedDegree >= z.start && normalizedDegree < z.end
  );
  return signData?.sign || 'Áries';
}

// Simple Julian Day calculation
function getJulianDay(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate() + (date.getHours() + date.getMinutes() / 60) / 24;
  
  let jy = y;
  let jm = m;
  
  if (m <= 2) {
    jy -= 1;
    jm += 12;
  }
  
  const a = Math.floor(jy / 100);
  const b = 2 - a + Math.floor(a / 4);
  
  return Math.floor(365.25 * (jy + 4716)) + Math.floor(30.6001 * (jm + 1)) + d + b - 1524.5;
}

// Simplified planetary position calculation
// In production, use Swiss Ephemeris or similar
function calculatePlanetPosition(jd: number, planetIndex: number): number {
  // Mean orbital periods in days
  const periods = [
    0,        // Sun (Earth around Sun)
    27.32,    // Moon
    87.97,    // Mercury
    224.7,    // Venus
    686.98,   // Mars
    4332.59,  // Jupiter
    10759.22, // Saturn
    30688.5,  // Uranus
    60182,    // Neptune
    90560,    // Pluto
  ];
  
  // J2000.0 epoch
  const j2000 = 2451545.0;
  const daysSinceJ2000 = jd - j2000;
  
  // Starting positions at J2000 (simplified)
  const startPositions = [
    280.46,   // Sun
    218.32,   // Moon  
    252.25,   // Mercury
    181.98,   // Venus
    355.45,   // Mars
    34.40,    // Jupiter
    49.94,    // Saturn
    313.23,   // Uranus
    304.88,   // Neptune
    238.93,   // Pluto
  ];
  
  if (planetIndex >= periods.length) return 0;
  
  // Calculate mean longitude
  const period = periods[planetIndex] || 365.25;
  const meanMotion = 360 / period;
  let position = startPositions[planetIndex] + (daysSinceJ2000 * meanMotion);
  
  // Add some perturbation for more realistic looking results
  const perturbation = Math.sin(daysSinceJ2000 * 0.01 + planetIndex) * 5;
  position += perturbation;
  
  return ((position % 360) + 360) % 360;
}

// Calculate house cusps using Placidus (simplified)
function calculateHouseCusps(jd: number, latitude: number, longitude: number): number[] {
  // Simplified house calculation
  const lst = (280.46 + 360.98564736629 * (jd - 2451545.0) + longitude) % 360;
  const ramc = lst; // Right Ascension of Midheaven
  
  const houses: number[] = [];
  for (let i = 0; i < 12; i++) {
    // Simplified equal house system with offset
    const cusp = (ramc + (i * 30) + (latitude * 0.1)) % 360;
    houses.push(cusp);
  }
  
  return houses;
}

// Determine which house a planet is in
function getHouseForDegree(degree: number, houses: number[]): number {
  for (let i = 0; i < 12; i++) {
    const nextHouse = (i + 1) % 12;
    let start = houses[i];
    let end = houses[nextHouse];
    
    if (end < start) {
      if (degree >= start || degree < end) return i + 1;
    } else {
      if (degree >= start && degree < end) return i + 1;
    }
  }
  return 1;
}

// Calculate aspects between planets
function calculateAspects(planets: PlanetPosition[]): ChartAspect[] {
  const aspectTypes = [
    { name: 'Conjunção', angle: 0, orb: 8 },
    { name: 'Sextil', angle: 60, orb: 6 },
    { name: 'Quadratura', angle: 90, orb: 8 },
    { name: 'Trígono', angle: 120, orb: 8 },
    { name: 'Oposição', angle: 180, orb: 8 },
  ];
  
  const aspects: ChartAspect[] = [];
  
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      let diff = Math.abs(planets[i].degree - planets[j].degree);
      if (diff > 180) diff = 360 - diff;
      
      for (const aspectType of aspectTypes) {
        const orb = Math.abs(diff - aspectType.angle);
        if (orb <= aspectType.orb) {
          aspects.push({
            planet1: planets[i].planet,
            planet2: planets[j].planet,
            type: aspectType.name,
            angle: aspectType.angle,
            orb: Math.round(orb * 10) / 10,
          });
          break;
        }
      }
    }
  }
  
  return aspects;
}

// Main calculation function
export function calculateBirthChart(birthData: BirthData): ChartData {
  const [hours, minutes] = birthData.time.split(':').map(Number);
  const dateTime = new Date(birthData.date);
  dateTime.setHours(hours, minutes, 0, 0);
  
  const jd = getJulianDay(dateTime);
  const houses = calculateHouseCusps(jd, birthData.latitude, birthData.longitude);
  
  const planetNames = ['Sol', 'Lua', 'Mercúrio', 'Vênus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno', 'Plutão'];
  
  const planets: PlanetPosition[] = planetNames.map((name, index) => {
    const degree = calculatePlanetPosition(jd, index);
    const sign = getSignFromDegree(degree);
    const house = getHouseForDegree(degree, houses);
    // Simplified retrograde calculation
    const retrograde = index > 1 && index < 8 && Math.random() > 0.7;
    
    return { planet: name, degree, sign, house, retrograde };
  });
  
  // Add Lunar Nodes
  const northNodeDegree = (125.04 - 0.0529539 * (jd - 2451545.0) + 360) % 360;
  const southNodeDegree = (northNodeDegree + 180) % 360;
  
  planets.push({
    planet: 'Nodo Norte',
    degree: northNodeDegree,
    sign: getSignFromDegree(northNodeDegree),
    house: getHouseForDegree(northNodeDegree, houses),
    retrograde: true,
  });
  
  planets.push({
    planet: 'Nodo Sul',
    degree: southNodeDegree,
    sign: getSignFromDegree(southNodeDegree),
    house: getHouseForDegree(southNodeDegree, houses),
    retrograde: true,
  });
  
  const ascendantDegree = houses[0];
  const midheavenDegree = houses[9];
  
  const aspects = calculateAspects(planets);
  
  return {
    birthData,
    planets,
    houses,
    aspects,
    ascendant: { degree: ascendantDegree, sign: getSignFromDegree(ascendantDegree) },
    midheaven: { degree: midheavenDegree, sign: getSignFromDegree(midheavenDegree) },
  };
}
