import { ChartData } from '@/utils/astroCalculations';
import { signElements, elementColors } from '@/data/astrologyData';

interface ArtisticMandalaProps {
  chartData: ChartData;
}

export default function ArtisticMandala({ chartData }: ArtisticMandalaProps) {
  const size = 500;
  const center = size / 2;
  
  // Get dominant element
  const elementCounts = { Fogo: 0, Terra: 0, Ar: 0, Água: 0 };
  chartData.planets.forEach(planet => {
    const element = signElements[planet.sign];
    if (element) elementCounts[element]++;
  });
  
  const dominantElement = Object.entries(elementCounts)
    .sort((a, b) => b[1] - a[1])[0][0] as keyof typeof elementColors;
  
  const colors = elementColors[dominantElement];
  
  // Generate unique ID for gradients
  const gradientId = `mandala-gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  // Create decorative patterns based on planets
  const generatePetals = (count: number, innerR: number, outerR: number, offset = 0) => {
    const petals = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * 360 / count) + offset;
      const rad = (angle * Math.PI) / 180;
      const nextRad = ((angle + 360 / count / 2) * Math.PI) / 180;
      
      const x1 = center + innerR * Math.cos(rad);
      const y1 = center + innerR * Math.sin(rad);
      const x2 = center + outerR * Math.cos(nextRad);
      const y2 = center + outerR * Math.sin(nextRad);
      const x3 = center + innerR * Math.cos((angle + 360 / count) * Math.PI / 180);
      const y3 = center + innerR * Math.sin((angle + 360 / count) * Math.PI / 180);
      
      const controlX = center + (outerR + 20) * Math.cos(nextRad);
      const controlY = center + (outerR + 20) * Math.sin(nextRad);
      
      petals.push(
        <path
          key={`petal-${i}`}
          d={`M ${x1} ${y1} Q ${controlX} ${controlY} ${x3} ${y3}`}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeOpacity="0.6"
        />
      );
    }
    return petals;
  };
  
  // Generate concentric circles with zodiac symbols
  const generateZodiacRing = () => {
    const symbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    return symbols.map((symbol, i) => {
      const angle = (i * 30) - 90;
      const rad = (angle * Math.PI) / 180;
      const x = center + 180 * Math.cos(rad);
      const y = center + 180 * Math.sin(rad);
      
      // Check if this sign has planets
      const signName = ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'][i];
      const hasPlanet = chartData.planets.some(p => p.sign === signName);
      
      return (
        <g key={`zodiac-${i}`}>
          <circle
            cx={x}
            cy={y}
            r={hasPlanet ? 18 : 15}
            fill={hasPlanet ? colors.primary : 'transparent'}
            fillOpacity={hasPlanet ? 0.3 : 0}
            stroke={colors.primary}
            strokeWidth={hasPlanet ? 2 : 1}
            strokeOpacity={hasPlanet ? 1 : 0.4}
          />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`${hasPlanet ? 'fill-foreground text-xl' : 'fill-muted-foreground text-lg'}`}
          >
            {symbol}
          </text>
        </g>
      );
    });
  };
  
  // Generate decorative geometric patterns
  const generateGeometricPattern = () => {
    const shapes = [];
    
    // Outer decorative triangles
    for (let i = 0; i < 12; i++) {
      const angle = i * 30;
      const rad1 = (angle * Math.PI) / 180;
      const rad2 = ((angle + 15) * Math.PI) / 180;
      const rad3 = ((angle - 15) * Math.PI) / 180;
      
      const x1 = center + 220 * Math.cos(rad1);
      const y1 = center + 220 * Math.sin(rad1);
      const x2 = center + 240 * Math.cos(rad2);
      const y2 = center + 240 * Math.sin(rad2);
      const x3 = center + 240 * Math.cos(rad3);
      const y3 = center + 240 * Math.sin(rad3);
      
      shapes.push(
        <path
          key={`tri-${i}`}
          d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} Z`}
          fill={colors.secondary}
          fillOpacity="0.2"
          stroke={colors.primary}
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      );
    }
    
    return shapes;
  };
  
  // Generate planet positions as decorative dots
  const generatePlanetDots = () => {
    return chartData.planets.slice(0, 10).map((planet, i) => {
      const angle = (planet.degree - 90) * Math.PI / 180;
      const radius = 120 + (i % 3) * 15;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      
      return (
        <g key={`planet-dot-${i}`}>
          <circle
            cx={x}
            cy={y}
            r={6}
            fill={colors.primary}
            fillOpacity="0.8"
          />
          <circle
            cx={x}
            cy={y}
            r={10}
            fill="none"
            stroke={colors.secondary}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        </g>
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
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} />
          </linearGradient>
          <radialGradient id={`${gradientId}-radial`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.3" />
            <stop offset="70%" stopColor={colors.secondary} stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background glow */}
        <circle
          cx={center}
          cy={center}
          r={240}
          fill={`url(#${gradientId}-radial)`}
        />
        
        {/* Outer decorative ring */}
        <circle
          cx={center}
          cy={center}
          r={240}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
        />
        
        {/* Geometric patterns */}
        {generateGeometricPattern()}
        
        {/* Decorative petal rings */}
        {generatePetals(12, 80, 130)}
        {generatePetals(24, 130, 160, 7.5)}
        {generatePetals(12, 160, 200, 15)}
        
        {/* Zodiac ring */}
        {generateZodiacRing()}
        
        {/* Inner circles */}
        <circle
          cx={center}
          cy={center}
          r={100}
          fill="none"
          stroke={colors.primary}
          strokeWidth="2"
          strokeOpacity="0.6"
        />
        <circle
          cx={center}
          cy={center}
          r={60}
          fill="none"
          stroke={colors.secondary}
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        
        {/* Planet dots */}
        {generatePlanetDots()}
        
        {/* Center elements */}
        <circle
          cx={center}
          cy={center}
          r={40}
          fill={colors.primary}
          fillOpacity="0.2"
          stroke={colors.primary}
          strokeWidth="2"
        />
        
        {/* Ascendant symbol in center */}
        <text
          x={center}
          y={center - 5}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-2xl font-display"
          filter="url(#glow)"
        >
          {chartData.ascendant.sign.charAt(0)}
        </text>
        <text
          x={center}
          y={center + 18}
          textAnchor="middle"
          className="fill-muted-foreground text-xs"
        >
          ASC
        </text>
      </svg>
      
      {/* Element indicator */}
      <div className="mt-4 text-center">
        <span 
          className="inline-block px-4 py-1 rounded-full text-sm"
          style={{ 
            backgroundColor: `${colors.primary}33`,
            border: `1px solid ${colors.primary}`,
            color: colors.secondary
          }}
        >
          Elemento Dominante: {dominantElement}
        </span>
      </div>
    </div>
  );
}
