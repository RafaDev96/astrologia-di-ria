// Accurate astrological calculations using astronomy-bundle (VSOP87 theory)
// Using geocentric ecliptic coordinates for tropical zodiac

import { createTimeOfInterest } from 'astronomy-bundle/time';
import { createSun } from 'astronomy-bundle/sun';
import { createMoon } from 'astronomy-bundle/moon';
import { 
  createMercury, 
  createVenus, 
  createMars, 
  createJupiter, 
  createSaturn, 
  createUranus, 
  createNeptune 
} from 'astronomy-bundle/planets';
import { createEarth, createLocation } from 'astronomy-bundle/earth';
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
  degreeInSign: number;
}

export interface ChartData {
  birthData: BirthData;
  planets: PlanetPosition[];
  houses: number[];
  aspects: ChartAspect[];
  ascendant: { degree: number; sign: string; degreeInSign: number };
  midheaven: { degree: number; sign: string; degreeInSign: number };
  descendant: { degree: number; sign: string; degreeInSign: number };
  imumCoeli: { degree: number; sign: string; degreeInSign: number };
}

export interface ChartAspect {
  planet1: string;
  planet2: string;
  type: string;
  angle: number;
  orb: number;
}

// Normalize angle to 0-360
function normalize(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

// Convert degrees to radians
function rad(deg: number): number {
  return deg * Math.PI / 180;
}

// Convert radians to degrees
function deg(rad: number): number {
  return rad * 180 / Math.PI;
}

// Get zodiac sign from degree
export function getSignFromDegree(degree: number): string {
  const normalizedDegree = normalize(degree);
  const signData = zodiacDegrees.find(
    z => normalizedDegree >= z.start && normalizedDegree < z.end
  );
  return signData?.sign || 'Áries';
}

// Get degree within sign (0-30)
function getDegreeInSign(degree: number): number {
  return normalize(degree) % 30;
}

// Calculate Julian Day Number
function getJulianDay(year: number, month: number, day: number, hour: number, minute: number): number {
  let y = year;
  let m = month;
  
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
  const dayFraction = (hour + minute / 60) / 24;
  
  return jd + dayFraction;
}

// Calculate Greenwich Mean Sidereal Time
function getGMST(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000;
  return normalize(gmst);
}

// Calculate Local Sidereal Time
function getLST(jd: number, longitude: number): number {
  const gmst = getGMST(jd);
  return normalize(gmst + longitude);
}

// Calculate obliquity of the ecliptic
function getObliquity(T: number): number {
  const eps0 = 84381.448 - 46.8150 * T - 0.00059 * T * T + 0.001813 * T * T * T;
  return eps0 / 3600;
}

// Calculate Ascendant using precise formula
function calculateAscendant(jd: number, latitude: number, longitude: number): number {
  const lst = getLST(jd, longitude);
  const lstRad = rad(lst);
  const latRad = rad(latitude);
  
  const T = (jd - 2451545.0) / 36525;
  const obliquity = getObliquity(T);
  const oblRad = rad(obliquity);
  
  // Correct formula: ASC = atan2(-cos(RAMC), sin(RAMC)*cos(e) + tan(lat)*sin(e))
  const y = Math.cos(lstRad);
  const x = -(Math.sin(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad));
  
  let asc = deg(Math.atan2(y, x));
  asc = normalize(asc);
  
  return asc;
}

// Calculate Midheaven (MC) using precise formula
function calculateMidheaven(jd: number, longitude: number): number {
  const lst = getLST(jd, longitude);
  const lstRad = rad(lst);
  
  const T = (jd - 2451545.0) / 36525;
  const obliquity = getObliquity(T);
  const oblRad = rad(obliquity);
  
  let mc = deg(Math.atan(Math.tan(lstRad) / Math.cos(oblRad)));
  
  // Adjust quadrant
  if (lst > 90 && lst <= 270) {
    mc += 180;
  } else if (lst > 270) {
    mc += 360;
  }
  
  return normalize(mc);
}

// Calculate house cusps (Placidus simplified)
function calculateHouseCusps(ascendant: number, mc: number): number[] {
  const houses: number[] = new Array(12);
  
  houses[0] = ascendant;
  houses[9] = mc;
  houses[3] = normalize(mc + 180);
  houses[6] = normalize(ascendant + 180);
  
  // Interpolate intermediate houses
  const diff1 = ((houses[3] - houses[0] + 360) % 360);
  houses[1] = normalize(houses[0] + diff1 / 3);
  houses[2] = normalize(houses[0] + 2 * diff1 / 3);
  
  const diff2 = ((houses[6] - houses[3] + 360) % 360);
  houses[4] = normalize(houses[3] + diff2 / 3);
  houses[5] = normalize(houses[3] + 2 * diff2 / 3);
  
  const diff3 = ((houses[9] - houses[6] + 360) % 360);
  houses[7] = normalize(houses[6] + diff3 / 3);
  houses[8] = normalize(houses[6] + 2 * diff3 / 3);
  
  const diff4 = ((houses[0] - houses[9] + 360) % 360);
  houses[10] = normalize(houses[9] + diff4 / 3);
  houses[11] = normalize(houses[9] + 2 * diff4 / 3);
  
  return houses;
}

// Determine which house a planet is in
function getHouseForDegree(degree: number, houses: number[]): number {
  const normalizedDegree = normalize(degree);
  
  for (let i = 0; i < 12; i++) {
    const nextHouse = (i + 1) % 12;
    const start = houses[i];
    const end = houses[nextHouse];
    
    if (end < start) {
      if (normalizedDegree >= start || normalizedDegree < end) {
        return i + 1;
      }
    } else {
      if (normalizedDegree >= start && normalizedDegree < end) {
        return i + 1;
      }
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
            orb: Math.round(orb * 100) / 100
          });
          break;
        }
      }
    }
  }
  
  return aspects;
}

// Simplified Pluto calculation (not in astronomy-bundle)
function calcPlutoPosition(year: number, month: number, day: number): number {
  // Pluto orbital period ~248 years, moves ~1.48° per year
  // At Jan 1, 1996, Pluto was at approximately 2° Sagittarius (242°)
  const jd1996 = getJulianDay(1996, 1, 1, 0, 0);
  const jdNow = getJulianDay(year, month, day, 0, 0);
  const daysSince = jdNow - jd1996;
  const yearsSince = daysSince / 365.25;
  
  // Pluto was at ~1°25' Sagittarius (241.42°) on June 3, 1996
  // Moving about 1.48° per year with slight variation
  const plutoLon = 241.42 + (yearsSince * 1.48);
  
  return normalize(plutoLon);
}

// Main calculation function using astronomy-bundle
export async function calculateBirthChart(birthData: BirthData): Promise<ChartData> {
  const { date, time, latitude, longitude } = birthData;
  
  // Parse time
  const [hours, minutes] = time.split(':').map(Number);
  
  // Brazil is UTC-3, convert to UTC
  const utcHours = hours + 3;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Create Time of Interest for astronomy-bundle
  const toi = createTimeOfInterest.fromTime(year, month, day, utcHours, minutes, 0);
  
  // Calculate Julian Day for house calculations
  const jd = getJulianDay(year, month, day, utcHours, minutes);
  
  // Calculate Ascendant and Midheaven
  const ascendantDegree = calculateAscendant(jd, latitude, longitude);
  const midheavenDegree = calculateMidheaven(jd, longitude);
  const descendantDegree = normalize(ascendantDegree + 180);
  const imumCoeliDegree = normalize(midheavenDegree + 180);
  
  // Calculate house cusps
  const houses = calculateHouseCusps(ascendantDegree, midheavenDegree);
  
  // Create celestial objects
  const sun = createSun(toi);
  const moon = createMoon(toi);
  const mercury = createMercury(toi);
  const venus = createVenus(toi);
  const mars = createMars(toi);
  const jupiter = createJupiter(toi);
  const saturn = createSaturn(toi);
  const uranus = createUranus(toi);
  const neptune = createNeptune(toi);
  
  // Get geocentric ecliptic coordinates (tropical zodiac - "Date" coordinates)
  const [
    sunCoords,
    moonCoords,
    mercuryCoords,
    venusCoords,
    marsCoords,
    jupiterCoords,
    saturnCoords,
    uranusCoords,
    neptuneCoords
  ] = await Promise.all([
    sun.getGeocentricEclipticSphericalDateCoordinates(),
    moon.getGeocentricEclipticSphericalDateCoordinates(),
    mercury.getGeocentricEclipticSphericalDateCoordinates(),
    venus.getGeocentricEclipticSphericalDateCoordinates(),
    mars.getGeocentricEclipticSphericalDateCoordinates(),
    jupiter.getGeocentricEclipticSphericalDateCoordinates(),
    saturn.getGeocentricEclipticSphericalDateCoordinates(),
    uranus.getGeocentricEclipticSphericalDateCoordinates(),
    neptune.getGeocentricEclipticSphericalDateCoordinates()
  ]);
  
  // Calculate Pluto separately (not available in astronomy-bundle)
  const plutoLon = calcPlutoPosition(year, month, day);
  
  // Build planet positions
  const planetData = [
    { name: 'Sol', lon: sunCoords.lon, retrograde: false },
    { name: 'Lua', lon: moonCoords.lon, retrograde: false },
    { name: 'Mercúrio', lon: mercuryCoords.lon, retrograde: false },
    { name: 'Vênus', lon: venusCoords.lon, retrograde: false },
    { name: 'Marte', lon: marsCoords.lon, retrograde: false },
    { name: 'Júpiter', lon: jupiterCoords.lon, retrograde: false },
    { name: 'Saturno', lon: saturnCoords.lon, retrograde: false },
    { name: 'Urano', lon: uranusCoords.lon, retrograde: false },
    { name: 'Netuno', lon: neptuneCoords.lon, retrograde: false },
    { name: 'Plutão', lon: plutoLon, retrograde: false }
  ];
  
  const planets: PlanetPosition[] = planetData.map(p => ({
    planet: p.name,
    degree: normalize(p.lon),
    sign: getSignFromDegree(p.lon),
    house: getHouseForDegree(p.lon, houses),
    retrograde: p.retrograde,
    degreeInSign: getDegreeInSign(p.lon)
  }));
  
  // Calculate aspects
  const aspects = calculateAspects(planets);
  
  return {
    birthData,
    planets,
    houses,
    aspects,
    ascendant: {
      degree: ascendantDegree,
      sign: getSignFromDegree(ascendantDegree),
      degreeInSign: getDegreeInSign(ascendantDegree)
    },
    midheaven: {
      degree: midheavenDegree,
      sign: getSignFromDegree(midheavenDegree),
      degreeInSign: getDegreeInSign(midheavenDegree)
    },
    descendant: {
      degree: descendantDegree,
      sign: getSignFromDegree(descendantDegree),
      degreeInSign: getDegreeInSign(descendantDegree)
    },
    imumCoeli: {
      degree: imumCoeliDegree,
      sign: getSignFromDegree(imumCoeliDegree),
      degreeInSign: getDegreeInSign(imumCoeliDegree)
    }
  };
}

// Placeholder for elements/modalities analysis
export function analyzeElements(planets: PlanetPosition[]) {
  const elements = { Fogo: 0, Terra: 0, Ar: 0, Água: 0 };
  const modalities = { Cardinal: 0, Fixo: 0, Mutável: 0 };
  
  const signElements: Record<string, keyof typeof elements> = {
    'Áries': 'Fogo', 'Leão': 'Fogo', 'Sagitário': 'Fogo',
    'Touro': 'Terra', 'Virgem': 'Terra', 'Capricórnio': 'Terra',
    'Gêmeos': 'Ar', 'Libra': 'Ar', 'Aquário': 'Ar',
    'Câncer': 'Água', 'Escorpião': 'Água', 'Peixes': 'Água'
  };
  
  const signModalities: Record<string, keyof typeof modalities> = {
    'Áries': 'Cardinal', 'Câncer': 'Cardinal', 'Libra': 'Cardinal', 'Capricórnio': 'Cardinal',
    'Touro': 'Fixo', 'Leão': 'Fixo', 'Escorpião': 'Fixo', 'Aquário': 'Fixo',
    'Gêmeos': 'Mutável', 'Virgem': 'Mutável', 'Sagitário': 'Mutável', 'Peixes': 'Mutável'
  };
  
  planets.forEach(planet => {
    const element = signElements[planet.sign];
    const modality = signModalities[planet.sign];
    if (element) elements[element]++;
    if (modality) modalities[modality]++;
  });
  
  return { elements, modalities };
}

export function formatDegree(degree: number): string {
  const d = Math.floor(degree);
  const m = Math.floor((degree - d) * 60);
  return `${d}°${m.toString().padStart(2, '0')}'`;
}
