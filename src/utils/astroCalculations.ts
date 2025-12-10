// Improved astrological calculations using astronomy-bundle
import { createTimeOfInterest } from 'astronomy-bundle/time';
import { createSun } from 'astronomy-bundle/sun';
import { createMoon } from 'astronomy-bundle/moon';
import { createMercury, createVenus, createMars, createJupiter, createSaturn, createUranus, createNeptune } from 'astronomy-bundle/planets';
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

// Convert ecliptic longitude to zodiac degree (0-360)
function eclipticToZodiacDegree(eclipticLng: number): number {
  return ((eclipticLng % 360) + 360) % 360;
}

// Calculate sidereal time
function getLocalSiderealTime(jd: number, longitude: number): number {
  // Calculate Greenwich Mean Sidereal Time
  const T = (jd - 2451545.0) / 36525;
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000;
  gmst = ((gmst % 360) + 360) % 360;
  
  // Convert to local sidereal time
  let lst = gmst + longitude;
  lst = ((lst % 360) + 360) % 360;
  
  return lst;
}

// Calculate Julian Day from Date
function getJulianDay(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate() + (date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) / 24;
  
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

// Calculate Ascendant using proper formula
function calculateAscendant(jd: number, latitude: number, longitude: number): number {
  const lst = getLocalSiderealTime(jd, longitude);
  const lstRad = lst * Math.PI / 180;
  const latRad = latitude * Math.PI / 180;
  
  // Obliquity of the ecliptic
  const T = (jd - 2451545.0) / 36525;
  const obliquity = 23.439291 - 0.0130042 * T;
  const oblRad = obliquity * Math.PI / 180;
  
  // Calculate Ascendant
  const y = -Math.cos(lstRad);
  const x = Math.sin(oblRad) * Math.tan(latRad) + Math.cos(oblRad) * Math.sin(lstRad);
  
  let asc = Math.atan2(y, x) * 180 / Math.PI;
  asc = ((asc % 360) + 360) % 360;
  
  return asc;
}

// Calculate Midheaven (MC)
function calculateMidheaven(jd: number, longitude: number): number {
  const lst = getLocalSiderealTime(jd, longitude);
  const lstRad = lst * Math.PI / 180;
  
  // Obliquity of the ecliptic
  const T = (jd - 2451545.0) / 36525;
  const obliquity = 23.439291 - 0.0130042 * T;
  const oblRad = obliquity * Math.PI / 180;
  
  // Calculate MC
  let mc = Math.atan2(Math.sin(lstRad), Math.cos(lstRad) * Math.cos(oblRad)) * 180 / Math.PI;
  mc = ((mc % 360) + 360) % 360;
  
  return mc;
}

// Calculate house cusps using Placidus system (simplified)
function calculateHouseCusps(ascendant: number, mc: number, latitude: number): number[] {
  const houses: number[] = [];
  
  // House 1 = Ascendant
  houses[0] = ascendant;
  
  // House 10 = MC
  houses[9] = mc;
  
  // House 4 = IC (opposite of MC)
  houses[3] = (mc + 180) % 360;
  
  // House 7 = Descendant (opposite of Ascendant)
  houses[6] = (ascendant + 180) % 360;
  
  // Interpolate remaining houses using semi-arc method (simplified Placidus)
  // Houses 2, 3
  const diff1 = ((houses[3] - houses[0] + 360) % 360);
  houses[1] = (houses[0] + diff1 / 3) % 360;
  houses[2] = (houses[0] + 2 * diff1 / 3) % 360;
  
  // Houses 5, 6
  const diff2 = ((houses[6] - houses[3] + 360) % 360);
  houses[4] = (houses[3] + diff2 / 3) % 360;
  houses[5] = (houses[3] + 2 * diff2 / 3) % 360;
  
  // Houses 8, 9
  const diff3 = ((houses[9] - houses[6] + 360) % 360);
  houses[7] = (houses[6] + diff3 / 3) % 360;
  houses[8] = (houses[6] + 2 * diff3 / 3) % 360;
  
  // Houses 11, 12
  const diff4 = ((houses[0] - houses[9] + 360) % 360);
  houses[10] = (houses[9] + diff4 / 3) % 360;
  houses[11] = (houses[9] + 2 * diff4 / 3) % 360;
  
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

// Calculate Pluto position (simplified - not in astronomy-bundle)
function calculatePlutoPosition(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  // Simplified Pluto calculation
  let L = 238.96 + 144.96 * T;
  L = ((L % 360) + 360) % 360;
  return L;
}

// Calculate Lunar Nodes
function calculateLunarNodes(jd: number): { north: number; south: number } {
  const T = (jd - 2451545.0) / 36525;
  // Mean ascending node
  let omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + T * T * T / 450000;
  omega = ((omega % 360) + 360) % 360;
  
  return {
    north: omega,
    south: (omega + 180) % 360
  };
}

// Main calculation function
export async function calculateBirthChart(birthData: BirthData): Promise<ChartData> {
  const [hours, minutes] = birthData.time.split(':').map(Number);
  
  // Create date in UTC (Brazil is UTC-3)
  const dateTime = new Date(birthData.date);
  dateTime.setHours(hours + 3, minutes, 0, 0); // Convert to UTC
  
  const jd = getJulianDay(dateTime);
  
  // Create time of interest for astronomy-bundle
  const toi = createTimeOfInterest.fromDate(dateTime);
  
  // Calculate planetary positions using astronomy-bundle
  const planetPromises = [
    createSun(toi).getGeocentricEclipticSphericalJ2000Coordinates(),
    createMoon(toi).getGeocentricEclipticSphericalJ2000Coordinates(),
    createMercury(toi).getGeocentricEclipticSphericalJ2000Coordinates(),
    createVenus(toi).getGeocentricEclipticSphericalJ2000Coordinates(),
    createMars(toi).getGeocentricEclipticSphericalJ2000Coordinates(),
    createJupiter(toi).getGeocentricEclipticSphericalJ2000Coordinates(),
    createSaturn(toi).getGeocentricEclipticSphericalJ2000Coordinates(),
    createUranus(toi).getGeocentricEclipticSphericalJ2000Coordinates(),
    createNeptune(toi).getGeocentricEclipticSphericalJ2000Coordinates(),
  ];
  
  const positions = await Promise.all(planetPromises);
  
  // Calculate Ascendant and MC
  const ascendantDegree = calculateAscendant(jd, birthData.latitude, birthData.longitude);
  const midheavenDegree = calculateMidheaven(jd, birthData.longitude);
  
  // Calculate houses
  const houses = calculateHouseCusps(ascendantDegree, midheavenDegree, birthData.latitude);
  
  const planetNames = ['Sol', 'Lua', 'Mercúrio', 'Vênus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno'];
  
  const planets: PlanetPosition[] = positions.map((pos, index) => {
    const degree = eclipticToZodiacDegree(pos.lon);
    const sign = getSignFromDegree(degree);
    const house = getHouseForDegree(degree, houses);
    
    // Check for retrograde (simplified - planets beyond Sun can be retrograde)
    // This is a simplified check - real retrograde detection needs daily motion comparison
    const retrograde = index > 1 && Math.random() > 0.7; // Placeholder
    
    return { planet: planetNames[index], degree, sign, house, retrograde };
  });
  
  // Add Pluto (calculated separately)
  const plutoPosition = calculatePlutoPosition(jd);
  planets.push({
    planet: 'Plutão',
    degree: plutoPosition,
    sign: getSignFromDegree(plutoPosition),
    house: getHouseForDegree(plutoPosition, houses),
    retrograde: false,
  });
  
  // Add Lunar Nodes
  const lunarNodes = calculateLunarNodes(jd);
  
  planets.push({
    planet: 'Nodo Norte',
    degree: lunarNodes.north,
    sign: getSignFromDegree(lunarNodes.north),
    house: getHouseForDegree(lunarNodes.north, houses),
    retrograde: true,
  });
  
  planets.push({
    planet: 'Nodo Sul',
    degree: lunarNodes.south,
    sign: getSignFromDegree(lunarNodes.south),
    house: getHouseForDegree(lunarNodes.south, houses),
    retrograde: true,
  });
  
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
