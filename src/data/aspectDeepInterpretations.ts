// Deep interpretations for astrological aspects

export interface AspectDeepInterpretation {
  name: string;
  symbol: string;
  angle: number;
  nature: 'harmonious' | 'challenging' | 'neutral';
  archetype: string;
  keywords: string[];
  deepMeaning: string;
  howToWork: string;
  growthOpportunity: string;
}

export const aspectDeepInterpretations: AspectDeepInterpretation[] = [
  {
    name: 'Conjunção',
    symbol: '☌',
    angle: 0,
    nature: 'neutral',
    archetype: 'A Fusão',
    keywords: ['Intensificação', 'União', 'Potência', 'Foco', 'Amplificação'],
    deepMeaning: `A conjunção é o aspecto mais poderoso da astrologia — dois planetas ocupando o mesmo espaço no céu, fundindo suas energias em uma única força. Imagine duas cores se misturando: o resultado é algo novo e único.

Quando planetas estão em conjunção, suas qualidades se amplificam mutuamente. Isso pode ser maravilhoso (criatividade + disciplina = arte refinada) ou desafiador (impulsividade + intensidade = reações explosivas). Tudo depende dos planetas envolvidos.

A conjunção não permite distância — as energias não podem ser separadas. Isso significa que você experimenta esses temas de forma integrada, nem sempre conseguindo distinguir onde um planeta termina e o outro começa.`,
    howToWork: 'Reconheça que essas duas energias são aliadas, não inimigas. Em vez de tentar separar, busque a expressão mais elevada dessa fusão. Use a intensidade como combustível, não como explosivo.',
    growthOpportunity: 'Desenvolver maestria na integração de energias aparentemente distintas, criando uma expressão única que só você possui.'
  },
  {
    name: 'Sextil',
    symbol: '⚹',
    angle: 60,
    nature: 'harmonious',
    archetype: 'A Oportunidade',
    keywords: ['Talento', 'Facilidade', 'Oportunidade', 'Cooperação', 'Potencial'],
    deepMeaning: `O sextil é como uma porta entreaberta — a oportunidade está lá, mas você precisa empurrá-la para entrar. Diferente do trígono (que flui automaticamente), o sextil requer algum esforço consciente para ativar seus benefícios.

Este aspecto conecta planetas em signos de elementos compatíveis (Fogo-Ar ou Terra-Água), criando uma comunicação natural entre eles. Há um talento latente aqui, uma habilidade que pode ser desenvolvida com prática.

O sextil representa recursos disponíveis, não garantidos. É como ter um instrumento musical em casa — o potencial para música existe, mas só se manifesta quando você pratica.`,
    howToWork: 'Não deixe talentos naturais adormecidos. Identifique as áreas de facilidade que o sextil indica e invista conscientemente nelas. A oportunidade bate, mas você precisa abrir a porta.',
    growthOpportunity: 'Transformar potencial latente em habilidade desenvolvida através de prática consciente e aproveitamento de oportunidades.'
  },
  {
    name: 'Quadratura',
    symbol: '□',
    angle: 90,
    nature: 'challenging',
    archetype: 'O Desafio Criativo',
    keywords: ['Tensão', 'Crescimento', 'Ação', 'Fricção', 'Motivação'],
    deepMeaning: `A quadratura é o aspecto da tensão criativa — duas energias que parecem incompatíveis, puxando em direções diferentes, criando fricção interna que EXIGE resolução. Não é confortável, mas é extraordinariamente produtivo.

Imagine dois cavalos puxando uma carruagem em ângulos diferentes. A tensão parece destrutiva, mas quando domada, pode gerar movimento poderoso. A quadratura funciona assim: a fricção entre os planetas cria a motivação para agir e crescer.

As pessoas com muitas quadraturas são frequentemente as mais realizadas — não apesar da tensão, mas por causa dela. A quadratura não permite complacência; ela empurra você a se desenvolver, resolver conflitos internos e integrar partes aparentemente opostas de si mesmo.`,
    howToWork: 'Não fuja da tensão — dance com ela. Reconheça que ambas as energias são válidas e busque formas criativas de satisfazer ambas, em vez de sacrificar uma pela outra. A solução está na integração, não na eliminação.',
    growthOpportunity: 'Desenvolver resiliência, criatividade sob pressão e a capacidade de transformar conflito em combustível para realização.'
  },
  {
    name: 'Trígono',
    symbol: '△',
    angle: 120,
    nature: 'harmonious',
    archetype: 'O Dom Natural',
    keywords: ['Fluência', 'Talento', 'Harmonia', 'Facilidade', 'Graça'],
    deepMeaning: `O trígono é o aspecto do fluxo natural — duas energias que dançam juntas sem esforço, como se sempre soubessem cooperar. Este aspecto conecta planetas no mesmo elemento, criando uma sintonia harmoniosa.

É como ter uma habilidade natural que você nem percebe, tão fácil que parece obvio. Pessoas com trígonos podem subestimar seus talentos porque não exigiram suor para desenvolvê-los. "Todo mundo consegue fazer isso", você pode pensar — mas não, é seu dom especial.

O perigo do trígono é a complacência. Justamente porque a energia flui fácil, pode não haver motivação para desenvolvê-la ao máximo. Os maiores dons podem ficar adormecidos se não forem conscientemente cultivados.`,
    howToWork: 'Não tome seus talentos naturais como garantidos. Reconheça que facilidade é um dom que deve ser honrado através de desenvolvimento consciente. Use seus trígonos como fundação, não como teto.',
    growthOpportunity: 'Elevar talentos naturais ao nível de maestria através de prática consciente, e usar essa facilidade para ajudar outros.'
  },
  {
    name: 'Oposição',
    symbol: '☍',
    angle: 180,
    nature: 'challenging',
    archetype: 'O Espelho',
    keywords: ['Polaridade', 'Consciência', 'Relacionamentos', 'Equilíbrio', 'Projeção'],
    deepMeaning: `A oposição é o aspecto do espelho — duas energias se olhando face a face, criando consciência através do contraste. Diferente da quadratura (tensão interna), a oposição frequentemente se manifesta através de relacionamentos e situações externas.

É como segurar dois polos de um ímã: há atração e repulsão simultaneamente. Você pode ver claramente ambos os lados, mas escolher um parece significar abandonar o outro. A sabedoria está em perceber que opostos são complementares, não excludentes.

Frequentemente, projetamos um polo da oposição em outras pessoas. "Eu sou assim, mas meu parceiro é o oposto" — na verdade, ambos os polos existem em você. O outro apenas espelha o que você não quer ver em si mesmo.`,
    howToWork: 'Reconheça que você contém ambos os polos, não apenas um. Quando frustrado com outros que parecem "o oposto" de você, pergunte: "Onde essa energia existe em mim?" O equilíbrio vem da integração, não da escolha.',
    growthOpportunity: 'Desenvolver consciência profunda de si mesmo através dos relacionamentos, e aprender que opostos podem dançar juntos em harmonia.'
  }
];

// Interpretações específicas para combinações de planetas
export const planetPairInterpretations: Record<string, Record<string, string>> = {
  'Sol-Lua': {
    'Conjunção': 'Sua identidade consciente e suas necessidades emocionais estão fundidas. Você age com todo seu ser, sem divisão interna. Lua Nova natal traz intensidade de propósito mas pode ter dificuldade em ver as próprias emoções objetivamente.',
    'Sextil': 'Há uma oportunidade natural de harmonizar seu ego e suas emoções. Com algum esforço consciente, você pode alinhar o que quer ser com o que precisa para se sentir seguro.',
    'Quadratura': 'Tensão entre quem você quer ser e o que precisa emocionalmente. Pode haver conflito entre ambições e vida doméstica, entre razão e emoção. O crescimento vem de integrar essas necessidades aparentemente opostas.',
    'Trígono': 'Fluxo natural entre sua identidade e suas emoções. Você se sente confortável consigo mesmo, e seus pais provavelmente tinham uma boa relação. Cuidado para não dar essa harmonia como garantida.',
    'Oposição': 'Lua Cheia natal: consciência expandida entre identidade e emoções, mas também possível divisão. Pode haver tensão entre necessidades de brilhar e necessidades de nutrir, entre pai e mãe internos.'
  },
  'Sol-Mercúrio': {
    'Conjunção': 'Sua mente está intensamente conectada ao seu senso de identidade. Você se identifica fortemente com suas ideias e forma de pensar. Comunicação é central para quem você é.',
    'Sextil': 'Nunca está mais que 28° do Sol, então sextil é muito raro. Se presente, indica comunicação fácil sobre si mesmo.',
    'Quadratura': 'Não é possível astronomicamente.',
    'Trígono': 'Não é possível astronomicamente.',
    'Oposição': 'Não é possível astronomicamente.'
  },
  'Sol-Vênus': {
    'Conjunção': 'Você irradia charme e graça naturalmente. Amor, beleza e relacionamentos são centrais para sua identidade. Pode ter talento artístico ou forte magnetismo social.',
    'Sextil': 'Facilidade em expressar afeto e apreciação estética. Você pode desenvolver talentos artísticos com esforço consciente.',
    'Quadratura': 'Não é possível astronomicamente (Vênus nunca está mais que 48° do Sol).',
    'Trígono': 'Não é possível astronomicamente.',
    'Oposição': 'Não é possível astronomicamente.'
  },
  'Sol-Marte': {
    'Conjunção': 'Energia vital intensa, assertividade natural, coragem como traço de identidade. Você tem motor poderoso mas precisa aprender a canalizar sem queimar.',
    'Sextil': 'Facilidade em agir conforme sua vontade. Você pode desenvolver sua assertividade de forma harmoniosa.',
    'Quadratura': 'Tensão entre quem você é e como age. Pode haver impulsividade, frustração ou conflitos com figuras de autoridade masculinas. O crescimento vem de alinhar ação com propósito.',
    'Trígono': 'Fluxo natural de energia vital. Você age com confiança e assertividade natural, sem agressividade. Habilidade atlética ou competitiva pode ser um dom.',
    'Oposição': 'Projeção de agressividade ou assertividade em outros. Pode atrair competição ou conflito, até perceber essa energia em si mesmo.'
  },
  'Lua-Vênus': {
    'Conjunção': 'Emoções e afeto estão entrelaçados. Você nutre através do amor e precisa de carinho para segurança emocional. Forte apreciação de beleza e conforto.',
    'Sextil': 'Facilidade em conectar amor e cuidado emocional. Talentos artísticos podem ser desenvolvidos através do mundo emocional.',
    'Quadratura': 'Tensão entre necessidades emocionais e de relacionamento. Pode haver dificuldade em receber amor ou em amar sem medo. Crescimento vem de integrar segurança e vulnerabilidade.',
    'Trígono': 'Fluxo natural de carinho e nutrição. Você dá e recebe amor facilmente. Ambiente doméstico provavelmente é estético e harmonioso.',
    'Oposição': 'Oscilação entre necessidade de segurança emocional e desejo de relacionamentos. Pode projetar qualidades amorosas em parceiros.'
  },
  'Lua-Marte': {
    'Conjunção': 'Emoções intensas e reativas. Você sente com paixão e pode ter temperamento forte. Energia para proteger e cuidar é poderosa.',
    'Sextil': 'Facilidade em agir conforme sentimentos. Você pode desenvolver coragem emocional com esforço consciente.',
    'Quadratura': 'Tensão entre sensibilidade e agressividade. Pode haver explosões emocionais ou dificuldade em expressar raiva saudavelmente. Crescimento vem de integrar força e vulnerabilidade.',
    'Trígono': 'Fluxo natural entre emoções e ação. Você age conforme sente sem bloquear nenhuma energia. Proteção ativa dos que ama.',
    'Oposição': 'Oscilação entre passividade e agressividade, entre cuidar e competir. Pode atrair pessoas assertivas até integrar essa energia.'
  },
  'Mercúrio-Vênus': {
    'Conjunção': 'Comunicação com charme e diplomacia natural. Talentos para escrita, poesia ou artes que envolvem linguagem. Mente aprecia beleza.',
    'Sextil': 'Facilidade em expressar afeto verbalmente. Talentos comunicativos podem ser desenvolvidos artisticamente.',
    'Quadratura': 'Não é possível astronomicamente (nunca mais que 76° de distância).',
    'Trígono': 'Raro mas possível. Fluxo natural entre pensamento e valores estéticos.',
    'Oposição': 'Não é possível astronomicamente.'
  },
  'Vênus-Marte': {
    'Conjunção': 'Fusão de feminino e masculino, de atração e conquista. Magnetismo sexual, paixão intensa, presença magnética. Pode haver talento artístico vigoroso.',
    'Sextil': 'Facilidade em equilibrar dar e receber em relacionamentos. Harmonia entre desejo e afeto.',
    'Quadratura': 'Tensão entre amor e desejo, entre querer harmonia e querer conquista. Pode haver padrões turbulentos em relacionamentos. Crescimento vem de integrar ternura e paixão.',
    'Trígono': 'Fluxo natural entre amor e desejo. Você atrai e é atraído harmoniosamente. Relacionamentos tendem a ser apaixonados mas equilibrados.',
    'Oposição': 'Oscilação entre romance e paixão, entre comprometer e conquistar. Pode projetar um polo em parceiros até integrá-lo.'
  },
  'Júpiter-Saturno': {
    'Conjunção': 'Fusão de expansão e contração, de otimismo e realismo. Você pode construir grandes coisas com disciplina. Importantes novos ciclos sociais.',
    'Sextil': 'Facilidade em equilibrar crescimento e estrutura. Você pode expandir de forma sustentável.',
    'Quadratura': 'Tensão entre querer mais e precisar limitar, entre fé e medo. Ciclos de expansão e contração na vida. Crescimento vem de saber quando expandir e quando consolidar.',
    'Trígono': 'Fluxo natural entre crescimento e responsabilidade. Você expande de forma madura, constrói de forma otimista.',
    'Oposição': 'Oscilação entre excesso e restrição, entre otimismo e pessimismo. Aprender a equilibrar ambos é o caminho.'
  }
};

export function getAspectDeepInterpretation(aspectName: string): AspectDeepInterpretation | undefined {
  return aspectDeepInterpretations.find(a => a.name === aspectName);
}

export function getPlanetPairInterpretation(planet1: string, planet2: string, aspectName: string): string | null {
  // Try both orders
  const key1 = `${planet1}-${planet2}`;
  const key2 = `${planet2}-${planet1}`;
  
  const interpretation = planetPairInterpretations[key1]?.[aspectName] || 
                         planetPairInterpretations[key2]?.[aspectName];
  
  return interpretation || null;
}
