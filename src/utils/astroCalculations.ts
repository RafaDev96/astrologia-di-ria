// Accurate astrological calculations for tropical zodiac
// Using VSOP87-inspired calculations for planetary positions

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
  degreeInSign: number; // Degree within the sign (0-30)
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
  
  // Add time as fraction of day
  const dayFraction = (hour + minute / 60) / 24;
  
  return jd + dayFraction;
}

// Calculate obliquity of the ecliptic
function getObliquity(T: number): number {
  // Mean obliquity in arcseconds
  const eps0 = 84381.448 - 46.8150 * T - 0.00059 * T * T + 0.001813 * T * T * T;
  return eps0 / 3600; // Convert to degrees
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

// Calculate Sun position (accurate tropical zodiac)
function calcSun(T: number): { lon: number; lat: number } {
  // Mean longitude of the Sun
  let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  L0 = normalize(L0);
  
  // Mean anomaly of the Sun
  let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  M = normalize(M);
  const Mrad = rad(M);
  
  // Equation of center
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
          + 0.000289 * Math.sin(3 * Mrad);
  
  // Sun's true longitude (tropical)
  let sunLon = L0 + C;
  sunLon = normalize(sunLon);
  
  return { lon: sunLon, lat: 0 };
}

// Calculate Moon position
function calcMoon(T: number): { lon: number; lat: number } {
  // Mean longitude
  let Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841;
  Lp = normalize(Lp);
  
  // Mean elongation
  let D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868;
  D = normalize(D);
  
  // Mean anomaly of Sun
  let M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;
  M = normalize(M);
  
  // Mean anomaly of Moon
  let Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699;
  Mp = normalize(Mp);
  
  // Moon's argument of latitude
  let F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000;
  F = normalize(F);
  
  // Convert to radians
  const Drad = rad(D);
  const Mrad = rad(M);
  const Mprad = rad(Mp);
  const Frad = rad(F);
  
  // Longitude terms (simplified)
  let lonSum = 6288774 * Math.sin(Mprad)
             + 1274027 * Math.sin(2 * Drad - Mprad)
             + 658314 * Math.sin(2 * Drad)
             + 213618 * Math.sin(2 * Mprad)
             - 185116 * Math.sin(Mrad)
             - 114332 * Math.sin(2 * Frad)
             + 58793 * Math.sin(2 * Drad - 2 * Mprad)
             + 57066 * Math.sin(2 * Drad - Mrad - Mprad)
             + 53322 * Math.sin(2 * Drad + Mprad)
             + 45758 * Math.sin(2 * Drad - Mrad)
             - 40923 * Math.sin(Mrad - Mprad)
             - 34720 * Math.sin(Drad)
             - 30383 * Math.sin(Mrad + Mprad)
             + 15327 * Math.sin(2 * Drad - 2 * Frad)
             - 12528 * Math.sin(Mprad + 2 * Frad)
             + 10980 * Math.sin(Mprad - 2 * Frad);
  
  let moonLon = Lp + lonSum / 1000000;
  moonLon = normalize(moonLon);
  
  // Latitude terms (simplified)
  let latSum = 5128122 * Math.sin(Frad)
             + 280602 * Math.sin(Mprad + Frad)
             + 277693 * Math.sin(Mprad - Frad)
             + 173237 * Math.sin(2 * Drad - Frad)
             + 55413 * Math.sin(2 * Drad - Mprad + Frad)
             + 46271 * Math.sin(2 * Drad - Mprad - Frad)
             + 32573 * Math.sin(2 * Drad + Frad);
  
  const moonLat = latSum / 1000000;
  
  return { lon: moonLon, lat: moonLat };
}

// Calculate Mercury position
function calcMercury(T: number): { lon: number; retrograde: boolean } {
  // Mean longitude
  const L = normalize(252.2509 + 4.09233445 * T * 36525);
  // Mean anomaly  
  const M = normalize(174.7948 + 4.09233445 * T * 36525);
  const Mrad = rad(M);
  
  // Simplified heliocentric to geocentric conversion
  // Mercury's position relative to Sun
  const sunLon = calcSun(T).lon;
  
  // Mercury orbital elements
  const a = 0.387098; // semi-major axis in AU
  const e = 0.205635; // eccentricity
  
  // True anomaly (simplified)
  const E = M + (180/Math.PI) * e * Math.sin(Mrad) * (1 + e * Math.cos(Mrad));
  const v = 2 * Math.atan(Math.sqrt((1+e)/(1-e)) * Math.tan(rad(E)/2)) * 180 / Math.PI;
  
  // Heliocentric longitude
  const helioLon = normalize(77.4561 + v + 4.09233445 * T * 36525);
  
  // Geocentric longitude (simplified)
  const lon = normalize(helioLon);
  
  // Retrograde check
  const synodic = normalize(lon - sunLon);
  const retrograde = (synodic > 245 && synodic < 295) || (synodic > 65 && synodic < 115);
  
  return { lon, retrograde };
}

// Calculate Venus position
function calcVenus(T: number): { lon: number; retrograde: boolean } {
  // Mean longitude (degrees per century: 58517.8 = 1.60213 * 36525)
  const L = normalize(181.9798 + 1.60213034 * T * 36525);
  const M = normalize(50.4161 + 1.60213034 * T * 36525);
  const Mrad = rad(M);
  
  const C = 0.7758 * Math.sin(Mrad) + 0.0033 * Math.sin(2 * Mrad);
  
  let lon = L + C;
  lon = normalize(lon);
  
  const sunLon = calcSun(T).lon;
  const synodic = normalize(lon - sunLon);
  const retrograde = (synodic > 245 && synodic < 295) || (synodic > 65 && synodic < 115);
  
  return { lon, retrograde };
}

// Calculate Mars position
function calcMars(T: number): { lon: number; retrograde: boolean } {
  // Mean longitude (degrees per century: 19141 / 100 for T in centuries)
  const L = normalize(355.4330 + 0.5240208 * T * 36525);
  const M = normalize(19.3730 + 0.5240711 * T * 36525);
  const Mrad = rad(M);
  
  const C = 10.6912 * Math.sin(Mrad) + 0.6228 * Math.sin(2 * Mrad) + 0.0503 * Math.sin(3 * Mrad);
  
  let lon = L + C;
  lon = normalize(lon);
  
  const sunLon = calcSun(T).lon;
  const synodic = normalize(lon - sunLon);
  const retrograde = (synodic > 135 && synodic < 225);
  
  return { lon, retrograde };
}

// Calculate Jupiter position
function calcJupiter(T: number): { lon: number; retrograde: boolean } {
  // Mean longitude (degrees per century)
  const L = normalize(34.3515 + 0.0831294 * T * 36525);
  const M = normalize(20.0202 + 0.0830854 * T * 36525);
  const Mrad = rad(M);
  
  const C = 5.5549 * Math.sin(Mrad) + 0.1683 * Math.sin(2 * Mrad) + 0.0071 * Math.sin(3 * Mrad);
  
  let lon = L + C;
  lon = normalize(lon);
  
  const sunLon = calcSun(T).lon;
  const synodic = normalize(lon - sunLon);
  const retrograde = (synodic > 115 && synodic < 245);
  
  return { lon, retrograde };
}

// Calculate Saturn position
function calcSaturn(T: number): { lon: number; retrograde: boolean } {
  // Mean longitude (degrees per century)
  const L = normalize(50.0774 + 0.0334979 * T * 36525);
  const M = normalize(317.0207 + 0.0334614 * T * 36525);
  const Mrad = rad(M);
  
  const C = 6.3642 * Math.sin(Mrad) + 0.2609 * Math.sin(2 * Mrad) + 0.0129 * Math.sin(3 * Mrad);
  
  let lon = L + C;
  lon = normalize(lon);
  
  const sunLon = calcSun(T).lon;
  const synodic = normalize(lon - sunLon);
  const retrograde = (synodic > 110 && synodic < 250);
  
  return { lon, retrograde };
}

// Calculate Uranus position
function calcUranus(T: number): { lon: number; retrograde: boolean } {
  // Mean longitude (degrees per century)
  const L = normalize(314.0550 + 0.0117725 * T * 36525);
  const M = normalize(141.0500 + 0.0117454 * T * 36525);
  const Mrad = rad(M);
  
  const C = 5.3281 * Math.sin(Mrad) + 0.1870 * Math.sin(2 * Mrad);
  
  let lon = L + C;
  lon = normalize(lon);
  
  const sunLon = calcSun(T).lon;
  const synodic = normalize(lon - sunLon);
  const retrograde = (synodic > 105 && synodic < 255);
  
  return { lon, retrograde };
}

// Calculate Neptune position
function calcNeptune(T: number): { lon: number; retrograde: boolean } {
  // Mean longitude (degrees per century)
  const L = normalize(304.2228 + 0.0060183 * T * 36525);
  const M = normalize(256.2250 + 0.0060094 * T * 36525);
  const Mrad = rad(M);
  
  const C = 1.0302 * Math.sin(Mrad) + 0.0058 * Math.sin(2 * Mrad);
  
  let lon = L + C;
  lon = normalize(lon);
  
  const sunLon = calcSun(T).lon;
  const synodic = normalize(lon - sunLon);
  const retrograde = (synodic > 105 && synodic < 255);
  
  return { lon, retrograde };
}

// Calculate Pluto position (simplified)
function calcPluto(T: number): { lon: number; retrograde: boolean } {
  // Pluto moves about 1.48 degrees per year = 0.00405 degrees per day
  // At J2000 (Jan 1, 2000), Pluto was at approximately 251° (Sagittarius)
  const L = normalize(251.0 + 0.00405 * T * 36525);
  const M = normalize(14.8820 + 0.00397 * T * 36525);
  const Mrad = rad(M);
  
  const C = 6.9000 * Math.sin(Mrad) + 0.4500 * Math.sin(2 * Mrad);
  
  let lon = L + C;
  lon = normalize(lon);
  
  const sunLon = calcSun(T).lon;
  const synodic = normalize(lon - sunLon);
  const retrograde = (synodic > 105 && synodic < 255);
  
  return { lon, retrograde };
}

// Calculate Lunar Nodes
function calcLunarNodes(T: number): { north: number; south: number } {
  // Mean ascending node (Rahu)
  let omega = 125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + T * T * T / 467441;
  omega = normalize(omega);
  
  return {
    north: omega,
    south: normalize(omega + 180)
  };
}

// Calculate Ascendant
function calculateAscendant(jd: number, latitude: number, longitude: number): number {
  const lst = getLST(jd, longitude);
  const lstRad = rad(lst);
  const latRad = rad(latitude);
  
  const T = (jd - 2451545.0) / 36525;
  const obliquity = getObliquity(T);
  const oblRad = rad(obliquity);
  
  // Ascendant formula: ASC = atan2(-cos(RAMC), sin(RAMC)*cos(ε) + tan(φ)*sin(ε))
  const y = -Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad);
  
  let asc = deg(Math.atan2(y, x));
  asc = normalize(asc);
  
  return asc;
}

// Calculate Midheaven (MC)
function calculateMidheaven(jd: number, longitude: number): number {
  const lst = getLST(jd, longitude);
  const lstRad = rad(lst);
  
  const T = (jd - 2451545.0) / 36525;
  const obliquity = getObliquity(T);
  const oblRad = rad(obliquity);
  
  // MC formula: MC = atan(tan(RAMC) / cos(ε))
  let mc = deg(Math.atan(Math.tan(lstRad) / Math.cos(oblRad)));
  
  // Adjust quadrant
  if (lst > 90 && lst <= 270) {
    mc += 180;
  } else if (lst > 270) {
    mc += 360;
  }
  
  mc = normalize(mc);
  
  return mc;
}

// Calculate house cusps (Placidus simplified)
function calculateHouseCusps(ascendant: number, mc: number): number[] {
  const houses: number[] = new Array(12);
  
  houses[0] = ascendant;          // House 1 = Ascendant
  houses[9] = mc;                  // House 10 = MC
  houses[3] = normalize(mc + 180); // House 4 = IC
  houses[6] = normalize(ascendant + 180); // House 7 = Descendant
  
  // Interpolate intermediate houses
  // Houses 2, 3 (between ASC and IC)
  const diff1 = ((houses[3] - houses[0] + 360) % 360);
  houses[1] = normalize(houses[0] + diff1 / 3);
  houses[2] = normalize(houses[0] + 2 * diff1 / 3);
  
  // Houses 5, 6 (between IC and DSC)
  const diff2 = ((houses[6] - houses[3] + 360) % 360);
  houses[4] = normalize(houses[3] + diff2 / 3);
  houses[5] = normalize(houses[3] + 2 * diff2 / 3);
  
  // Houses 8, 9 (between DSC and MC)
  const diff3 = ((houses[9] - houses[6] + 360) % 360);
  houses[7] = normalize(houses[6] + diff3 / 3);
  houses[8] = normalize(houses[6] + 2 * diff3 / 3);
  
  // Houses 11, 12 (between MC and ASC)
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
      // House spans 0°
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
export async function calculateBirthChart(birthData: BirthData): Promise<ChartData> {
  const [hours, minutes] = birthData.time.split(':').map(Number);
  
  const dateTime = new Date(birthData.date);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  
  // Convert local time to UTC (Brazil is UTC-3)
  const utcHours = hours + 3;
  
  // Calculate Julian Day
  const jd = getJulianDay(year, month, day, utcHours, minutes);
  
  // Calculate T (Julian centuries from J2000.0)
  const T = (jd - 2451545.0) / 36525;
  
  // Calculate planetary positions
  const sun = calcSun(T);
  const moon = calcMoon(T);
  const mercury = calcMercury(T);
  const venus = calcVenus(T);
  const mars = calcMars(T);
  const jupiter = calcJupiter(T);
  const saturn = calcSaturn(T);
  const uranus = calcUranus(T);
  const neptune = calcNeptune(T);
  const pluto = calcPluto(T);
  const nodes = calcLunarNodes(T);
  
  // Calculate Ascendant and MC
  const ascendantDegree = calculateAscendant(jd, birthData.latitude, birthData.longitude);
  const midheavenDegree = calculateMidheaven(jd, birthData.longitude);
  const descendantDegree = normalize(ascendantDegree + 180);
  const icDegree = normalize(midheavenDegree + 180);
  
  // Calculate houses
  const houses = calculateHouseCusps(ascendantDegree, midheavenDegree);
  
  // Build planet positions array
  const planetData = [
    { name: 'Sol', lon: sun.lon, retrograde: false },
    { name: 'Lua', lon: moon.lon, retrograde: false },
    { name: 'Mercúrio', lon: mercury.lon, retrograde: mercury.retrograde },
    { name: 'Vênus', lon: venus.lon, retrograde: venus.retrograde },
    { name: 'Marte', lon: mars.lon, retrograde: mars.retrograde },
    { name: 'Júpiter', lon: jupiter.lon, retrograde: jupiter.retrograde },
    { name: 'Saturno', lon: saturn.lon, retrograde: saturn.retrograde },
    { name: 'Urano', lon: uranus.lon, retrograde: uranus.retrograde },
    { name: 'Netuno', lon: neptune.lon, retrograde: neptune.retrograde },
    { name: 'Plutão', lon: pluto.lon, retrograde: pluto.retrograde },
  ];
  
  const planets: PlanetPosition[] = planetData.map(p => ({
    planet: p.name,
    degree: p.lon,
    sign: getSignFromDegree(p.lon),
    house: getHouseForDegree(p.lon, houses),
    retrograde: p.retrograde,
    degreeInSign: getDegreeInSign(p.lon),
  }));
  
  // Add lunar nodes
  planets.push({
    planet: 'Nodo Norte',
    degree: nodes.north,
    sign: getSignFromDegree(nodes.north),
    house: getHouseForDegree(nodes.north, houses),
    retrograde: true,
    degreeInSign: getDegreeInSign(nodes.north),
  });
  
  planets.push({
    planet: 'Nodo Sul',
    degree: nodes.south,
    sign: getSignFromDegree(nodes.south),
    house: getHouseForDegree(nodes.south, houses),
    retrograde: true,
    degreeInSign: getDegreeInSign(nodes.south),
  });
  
  const aspects = calculateAspects(planets);
  
  return {
    birthData,
    planets,
    houses,
    aspects,
    ascendant: {
      degree: ascendantDegree,
      sign: getSignFromDegree(ascendantDegree),
      degreeInSign: getDegreeInSign(ascendantDegree),
    },
    midheaven: {
      degree: midheavenDegree,
      sign: getSignFromDegree(midheavenDegree),
      degreeInSign: getDegreeInSign(midheavenDegree),
    },
    descendant: {
      degree: descendantDegree,
      sign: getSignFromDegree(descendantDegree),
      degreeInSign: getDegreeInSign(descendantDegree),
    },
    imumCoeli: {
      degree: icDegree,
      sign: getSignFromDegree(icDegree),
      degreeInSign: getDegreeInSign(icDegree),
    },
  };
}
