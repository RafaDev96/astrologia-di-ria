import { ChartData } from '@/utils/astroCalculations';
import { zodiacDegrees, signElements, elementColors, planets as planetData } from '@/data/astrologyData';

interface ZodiacWheelProps {
  chartData: ChartData;
}

export default function ZodiacWheel({ chartData }: ZodiacWheelProps) {
  const size = 500;
  const center = size / 2;
  const outerRadius = size / 2 - 10;
  const signRadius = outerRadius - 30;
  const houseRadius = signRadius - 40;
  const planetRadius = houseRadius - 50;
  const innerRadius = planetRadius - 30;

  // Get planet symbol
  const getPlanetSymbol = (name: string): string => {
    const planet = planetData.find(p => p.name === name);
    return planet?.symbol || name[0];
  };

  // Convert degree to x,y coordinates
  const degToCoord = (degree: number, radius: number) => {
    // Adjust: 0° Aries at 9 o'clock (left), going counter-clockwise
    const adjustedDegree = 180 - degree;
    const rad = (adjustedDegree * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center - radius * Math.sin(rad),
    };
  };

  // Draw zodiac sign segments
  const renderZodiacSigns = () => {
    return zodiacDegrees.map((sign, index) => {
      const startAngle = 180 - sign.start;
      const endAngle = 180 - sign.end;
      const element = signElements[sign.sign];
      const colors = elementColors[element];
      
      // Arc path
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = center + outerRadius * Math.cos(startRad);
      const y1 = center - outerRadius * Math.sin(startRad);
      const x2 = center + outerRadius * Math.cos(endRad);
      const y2 = center - outerRadius * Math.sin(endRad);
      const x3 = center + signRadius * Math.cos(endRad);
      const y3 = center - signRadius * Math.sin(endRad);
      const x4 = center + signRadius * Math.cos(startRad);
      const y4 = center - signRadius * Math.sin(startRad);
      
      // Symbol position
      const midAngle = (startAngle + endAngle) / 2;
      const midRad = (midAngle * Math.PI) / 180;
      const symbolX = center + (outerRadius - 15) * Math.cos(midRad);
      const symbolY = center - (outerRadius - 15) * Math.sin(midRad);
      
      return (
        <g key={sign.sign}>
          <path
            d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${signRadius} ${signRadius} 0 0 0 ${x4} ${y4} Z`}
            fill={colors.primary}
            fillOpacity="0.3"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="1"
          />
          <text
            x={symbolX}
            y={symbolY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-lg font-bold"
          >
            {sign.symbol}
          </text>
        </g>
      );
    });
  };

  // Draw house cusps
  const renderHouses = () => {
    return chartData.houses.map((cusp, index) => {
      const coord = degToCoord(cusp, signRadius);
      const innerCoord = degToCoord(cusp, innerRadius);
      const labelCoord = degToCoord(cusp + 15, houseRadius);
      
      return (
        <g key={`house-${index}`}>
          <line
            x1={coord.x}
            y1={coord.y}
            x2={innerCoord.x}
            y2={innerCoord.y}
            stroke="hsl(43, 74%, 49%)"
            strokeWidth={index === 0 || index === 3 || index === 6 || index === 9 ? 2 : 1}
            strokeOpacity={index === 0 || index === 3 || index === 6 || index === 9 ? 0.8 : 0.4}
          />
          <text
            x={labelCoord.x}
            y={labelCoord.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground text-xs"
          >
            {index + 1}
          </text>
        </g>
      );
    });
  };

  // Draw planets
  const renderPlanets = () => {
    // Group planets that are close together
    const placedPlanets: { degree: number; y: number }[] = [];
    
    return chartData.planets.map((planet, index) => {
      let adjustedRadius = planetRadius;
      
      // Check for overlapping planets
      const nearby = placedPlanets.find(p => Math.abs(p.degree - planet.degree) < 15);
      if (nearby) {
        adjustedRadius -= 20;
      }
      placedPlanets.push({ degree: planet.degree, y: 0 });
      
      const coord = degToCoord(planet.degree, adjustedRadius);
      const symbol = getPlanetSymbol(planet.planet);
      
      return (
        <g key={`planet-${index}`}>
          <circle
            cx={coord.x}
            cy={coord.y}
            r={12}
            fill="hsl(240, 15%, 10%)"
            stroke="hsl(43, 74%, 49%)"
            strokeWidth="1"
          />
          <text
            x={coord.x}
            y={coord.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-primary text-sm font-bold"
          >
            {symbol}
          </text>
          {planet.retrograde && (
            <text
              x={coord.x + 10}
              y={coord.y - 10}
              className="fill-destructive text-xs"
            >
              R
            </text>
          )}
        </g>
      );
    });
  };

  // Draw aspects
  const renderAspects = () => {
    const aspectColors: Record<string, string> = {
      'Conjunção': 'hsl(43, 74%, 49%)',
      'Sextil': 'hsl(200, 70%, 60%)',
      'Quadratura': 'hsl(0, 70%, 50%)',
      'Trígono': 'hsl(120, 50%, 50%)',
      'Oposição': 'hsl(300, 50%, 50%)',
    };
    
    return chartData.aspects.slice(0, 15).map((aspect, index) => {
      const planet1 = chartData.planets.find(p => p.planet === aspect.planet1);
      const planet2 = chartData.planets.find(p => p.planet === aspect.planet2);
      
      if (!planet1 || !planet2) return null;
      
      const coord1 = degToCoord(planet1.degree, innerRadius + 10);
      const coord2 = degToCoord(planet2.degree, innerRadius + 10);
      
      return (
        <line
          key={`aspect-${index}`}
          x1={coord1.x}
          y1={coord1.y}
          x2={coord2.x}
          y2={coord2.y}
          stroke={aspectColors[aspect.type] || 'hsl(0, 0%, 50%)'}
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray={aspect.type === 'Quadratura' || aspect.type === 'Oposição' ? '4,4' : ''}
        />
      );
    });
  };

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="max-w-full h-auto"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="hsl(240, 20%, 6%)"
          stroke="hsl(43, 74%, 49%)"
          strokeWidth="2"
        />
        
        {/* Inner circle */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="hsl(240, 15%, 8%)"
          stroke="hsl(43, 74%, 49%)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        
        {/* Zodiac signs */}
        {renderZodiacSigns()}
        
        {/* House cusps */}
        {renderHouses()}
        
        {/* Aspects */}
        {renderAspects()}
        
        {/* Planets */}
        {renderPlanets()}
        
        {/* Center point */}
        <circle
          cx={center}
          cy={center}
          r={3}
          fill="hsl(43, 74%, 49%)"
        />
      </svg>
      
      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[hsl(120,50%,50%)]"></span>
          <span>Trígono (harmônico)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[hsl(0,70%,50%)]"></span>
          <span>Quadratura (tensão)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[hsl(200,70%,60%)]"></span>
          <span>Sextil (oportunidade)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[hsl(300,50%,50%)]"></span>
          <span>Oposição (polaridade)</span>
        </div>
      </div>
    </div>
  );
}
