// Detailed interpretations for planetary aspects
// Each interpretation explains the psychological meaning of the aspect

export interface AspectInterpretation {
  title: string;
  description: string;
  personality: string;
  emotions: string;
  behavior: string;
  challenges: string;
  talents: string;
}

// Get planet names in Portuguese
const planetNames: Record<string, string> = {
  'Sol': 'Sol',
  'Lua': 'Lua',
  'Mercúrio': 'Mercúrio',
  'Vênus': 'Vênus',
  'Marte': 'Marte',
  'Júpiter': 'Júpiter',
  'Saturno': 'Saturno',
  'Urano': 'Urano',
  'Netuno': 'Netuno',
  'Plutão': 'Plutão',
};

// Aspect type interpretations
const aspectTypes = {
  'Conjunção': {
    nature: 'neutral' as const,
    symbol: '☌',
    baseInterpretation: 'fusão intensa de energias',
    personality: 'Você integra naturalmente essas duas forças em sua personalidade, criando uma expressão única e potente.',
    emotions: 'Suas emoções nessa área são intensas e concentradas, sem separação entre as duas influências.',
    behavior: 'Você age de forma unificada, combinando ambas as qualidades automaticamente em suas atitudes.',
    challenges: 'Pode ser difícil distinguir onde uma energia termina e outra começa, o que às vezes causa excesso.',
    talents: 'Capacidade natural de integrar forças complementares de forma poderosa e autêntica.',
  },
  'Sextil': {
    nature: 'harmonious' as const,
    symbol: '⚹',
    baseInterpretation: 'oportunidade de cooperação harmoniosa',
    personality: 'Essas energias se comunicam bem em você, criando talentos naturais que podem ser desenvolvidos.',
    emotions: 'Suas emoções fluem suavemente entre essas duas áreas, gerando equilíbrio interno.',
    behavior: 'Você encontra facilmente maneiras criativas de combinar essas qualidades no dia a dia.',
    challenges: 'Por ser fácil, você pode não aproveitar todo o potencial dessa combinação se não a cultivar conscientemente.',
    talents: 'Dom natural para combinar habilidades de formas inovadoras e produtivas.',
  },
  'Quadratura': {
    nature: 'challenging' as const,
    symbol: '□',
    baseInterpretation: 'tensão que gera crescimento',
    personality: 'Essas duas forças criam um atrito interno que te impulsiona a agir e evoluir constantemente.',
    emotions: 'Você pode sentir inquietação ou frustração nessa área, mas isso te motiva a buscar soluções.',
    behavior: 'Suas ações refletem essa tensão criativa, levando-te a superar obstáculos através do esforço.',
    challenges: 'A tensão pode gerar conflitos internos, impulsividade ou padrões repetitivos se não for trabalhada.',
    talents: 'Grande capacidade de superação, resiliência e força para transformar desafios em conquistas.',
  },
  'Trígono': {
    nature: 'harmonious' as const,
    symbol: '△',
    baseInterpretation: 'fluxo natural e dons inatos',
    personality: 'Você possui uma facilidade natural nessa combinação, como se fosse um talento inato.',
    emotions: 'Suas emoções fluem harmoniosamente, trazendo paz e confiança nessa área da vida.',
    behavior: 'Você age com naturalidade e graça, sem esforço aparente, nessa combinação de energias.',
    challenges: 'Por vir tão facilmente, você pode não valorizar ou desenvolver plenamente esse dom.',
    talents: 'Dons naturais que podem ser aprimorados para alcançar excelência com relativa facilidade.',
  },
  'Oposição': {
    nature: 'challenging' as const,
    symbol: '☍',
    baseInterpretation: 'polaridade que busca equilíbrio',
    personality: 'Você experimenta essas duas forças como polos opostos que precisam ser equilibrados.',
    emotions: 'Suas emoções podem oscilar entre extremos, buscando um ponto médio de integração.',
    behavior: 'Você pode alternar entre comportamentos opostos até encontrar o equilíbrio através da experiência.',
    challenges: 'Tendência a projetar uma das energias nos outros, criando conflitos externos que refletem tensões internas.',
    talents: 'Capacidade de ver múltiplas perspectivas e mediar conflitos, uma vez que aprende a integrar as polaridades.',
  },
};

// Planet combination meanings
const planetCombinations: Record<string, Record<string, string>> = {
  'Sol': {
    'Lua': 'sua identidade e emoções',
    'Mercúrio': 'sua essência e forma de pensar',
    'Vênus': 'seu eu e seus valores afetivos',
    'Marte': 'sua vitalidade e impulso de ação',
    'Júpiter': 'seu propósito e expansão pessoal',
    'Saturno': 'sua identidade e responsabilidades',
    'Urano': 'sua essência e originalidade',
    'Netuno': 'seu ego e espiritualidade',
    'Plutão': 'sua vitalidade e poder de transformação',
  },
  'Lua': {
    'Mercúrio': 'suas emoções e pensamentos',
    'Vênus': 'seus sentimentos e afetividade',
    'Marte': 'suas emoções e impulsos',
    'Júpiter': 'sua segurança emocional e otimismo',
    'Saturno': 'suas emoções e estrutura interna',
    'Urano': 'seus instintos e necessidade de liberdade',
    'Netuno': 'sua sensibilidade e intuição',
    'Plutão': 'suas emoções profundas e transformações',
  },
  'Mercúrio': {
    'Vênus': 'comunicação e relações afetivas',
    'Marte': 'pensamento e ação',
    'Júpiter': 'mente e expansão do conhecimento',
    'Saturno': 'intelecto e disciplina mental',
    'Urano': 'ideias e inovação',
    'Netuno': 'razão e imaginação',
    'Plutão': 'comunicação e profundidade',
  },
  'Vênus': {
    'Marte': 'amor e desejo',
    'Júpiter': 'valores e abundância',
    'Saturno': 'afeto e compromisso',
    'Urano': 'relacionamentos e liberdade',
    'Netuno': 'amor e idealização',
    'Plutão': 'atração e intensidade',
  },
  'Marte': {
    'Júpiter': 'ação e expansão',
    'Saturno': 'energia e disciplina',
    'Urano': 'impulso e revolução',
    'Netuno': 'vontade e inspiração',
    'Plutão': 'força e poder',
  },
  'Júpiter': {
    'Saturno': 'expansão e limitação',
    'Urano': 'crescimento e mudança',
    'Netuno': 'fé e transcendência',
    'Plutão': 'abundância e transformação',
  },
  'Saturno': {
    'Urano': 'tradição e inovação',
    'Netuno': 'estrutura e dissolução',
    'Plutão': 'controle e poder',
  },
  'Urano': {
    'Netuno': 'revolução e espiritualidade',
    'Plutão': 'mudança e regeneração',
  },
  'Netuno': {
    'Plutão': 'dissolução e renascimento',
  },
};

export function getAspectInterpretation(
  planet1: string,
  planet2: string,
  aspectType: string
): AspectInterpretation | null {
  const aspect = aspectTypes[aspectType as keyof typeof aspectTypes];
  if (!aspect) return null;

  // Get the combination meaning (check both directions)
  let combinationMeaning = planetCombinations[planet1]?.[planet2] 
    || planetCombinations[planet2]?.[planet1]
    || `${planet1.toLowerCase()} e ${planet2.toLowerCase()}`;

  const title = `${planet1} ${aspect.symbol} ${planet2} — ${aspectType}`;
  
  const description = `Este aspecto representa ${aspect.baseInterpretation} entre ${combinationMeaning}. ` +
    `É uma conexão ${aspect.nature === 'harmonious' ? 'harmoniosa que traz facilidade' : 
      aspect.nature === 'challenging' ? 'desafiadora que promove crescimento' : 
      'neutra de intensificação'} para sua jornada de autoconhecimento.`;

  return {
    title,
    description,
    personality: aspect.personality,
    emotions: aspect.emotions,
    behavior: aspect.behavior,
    challenges: aspect.challenges,
    talents: aspect.talents,
  };
}

export function getNatureColor(nature: 'harmonious' | 'challenging' | 'neutral'): string {
  switch (nature) {
    case 'harmonious':
      return 'text-green-400';
    case 'challenging':
      return 'text-amber-400';
    case 'neutral':
      return 'text-blue-400';
  }
}

export function getNatureBgColor(nature: 'harmonious' | 'challenging' | 'neutral'): string {
  switch (nature) {
    case 'harmonious':
      return 'bg-green-500/10 border-green-500/20';
    case 'challenging':
      return 'bg-amber-500/10 border-amber-500/20';
    case 'neutral':
      return 'bg-blue-500/10 border-blue-500/20';
  }
}

export function getAspectNature(aspectType: string): 'harmonious' | 'challenging' | 'neutral' {
  return aspectTypes[aspectType as keyof typeof aspectTypes]?.nature || 'neutral';
}
