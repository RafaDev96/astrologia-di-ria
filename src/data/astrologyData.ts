// Planetary data and interpretations for birth chart

export interface Planet {
  id: string;
  name: string;
  symbol: string;
  meaning: string;
}

export interface House {
  number: number;
  name: string;
  meaning: string;
}

export interface Aspect {
  name: string;
  symbol: string;
  angle: number;
  orb: number;
  nature: 'harmonious' | 'challenging' | 'neutral';
  meaning: string;
}

export const planets: Planet[] = [
  { id: 'sun', name: 'Sol', symbol: '☉', meaning: 'Essência, ego, vitalidade e propósito de vida' },
  { id: 'moon', name: 'Lua', symbol: '☽', meaning: 'Emoções, instintos, memória e necessidades emocionais' },
  { id: 'mercury', name: 'Mercúrio', symbol: '☿', meaning: 'Comunicação, pensamento, aprendizado e expressão' },
  { id: 'venus', name: 'Vênus', symbol: '♀', meaning: 'Amor, beleza, valores e relacionamentos' },
  { id: 'mars', name: 'Marte', symbol: '♂', meaning: 'Ação, energia, desejo e assertividade' },
  { id: 'jupiter', name: 'Júpiter', symbol: '♃', meaning: 'Expansão, sorte, sabedoria e crescimento' },
  { id: 'saturn', name: 'Saturno', symbol: '♄', meaning: 'Estrutura, responsabilidade, limites e disciplina' },
  { id: 'uranus', name: 'Urano', symbol: '♅', meaning: 'Inovação, liberdade, revolução e originalidade' },
  { id: 'neptune', name: 'Netuno', symbol: '♆', meaning: 'Espiritualidade, intuição, sonhos e transcendência' },
  { id: 'pluto', name: 'Plutão', symbol: '♇', meaning: 'Transformação, poder, renascimento e profundidade' },
  { id: 'northNode', name: 'Nodo Norte', symbol: '☊', meaning: 'Destino, evolução da alma e propósito kármico' },
  { id: 'southNode', name: 'Nodo Sul', symbol: '☋', meaning: 'Karma passado, talentos inatos e zona de conforto' },
  { id: 'ascendant', name: 'Ascendente', symbol: 'AC', meaning: 'Personalidade externa, primeira impressão e aparência' },
  { id: 'midheaven', name: 'Meio do Céu', symbol: 'MC', meaning: 'Carreira, reputação pública e aspirações' },
];

export const houses: House[] = [
  { number: 1, name: 'Casa 1 - Identidade', meaning: 'Aparência física, personalidade, começos e autoconsciência' },
  { number: 2, name: 'Casa 2 - Valores', meaning: 'Finanças, posses, autoestima e recursos pessoais' },
  { number: 3, name: 'Casa 3 - Comunicação', meaning: 'Pensamento, irmãos, viagens curtas e aprendizado básico' },
  { number: 4, name: 'Casa 4 - Lar', meaning: 'Família, raízes, lar e fundações emocionais' },
  { number: 5, name: 'Casa 5 - Criatividade', meaning: 'Romance, filhos, arte, diversão e autoexpressão' },
  { number: 6, name: 'Casa 6 - Saúde', meaning: 'Trabalho diário, saúde, rotinas e serviço aos outros' },
  { number: 7, name: 'Casa 7 - Parcerias', meaning: 'Casamento, parcerias, contratos e relacionamentos íntimos' },
  { number: 8, name: 'Casa 8 - Transformação', meaning: 'Morte, renascimento, sexualidade, recursos compartilhados' },
  { number: 9, name: 'Casa 9 - Filosofia', meaning: 'Viagens longas, estudos superiores, espiritualidade e expansão' },
  { number: 10, name: 'Casa 10 - Carreira', meaning: 'Profissão, status social, reputação e ambições' },
  { number: 11, name: 'Casa 11 - Amizades', meaning: 'Amigos, grupos, esperanças, sonhos e humanitarismo' },
  { number: 12, name: 'Casa 12 - Espiritualidade', meaning: 'Subconsciente, isolamento, karma e transcendência' },
];

export const aspects: Aspect[] = [
  { name: 'Conjunção', symbol: '☌', angle: 0, orb: 8, nature: 'neutral', meaning: 'Fusão de energias, intensificação' },
  { name: 'Sextil', symbol: '⚹', angle: 60, orb: 6, nature: 'harmonious', meaning: 'Oportunidades, talentos naturais' },
  { name: 'Quadratura', symbol: '□', angle: 90, orb: 8, nature: 'challenging', meaning: 'Tensão, desafios, crescimento' },
  { name: 'Trígono', symbol: '△', angle: 120, orb: 8, nature: 'harmonious', meaning: 'Fluxo fácil, dons naturais' },
  { name: 'Oposição', symbol: '☍', angle: 180, orb: 8, nature: 'challenging', meaning: 'Polaridade, relacionamentos, equilíbrio' },
];

export const zodiacDegrees = [
  { sign: 'Áries', start: 0, end: 30, symbol: '♈' },
  { sign: 'Touro', start: 30, end: 60, symbol: '♉' },
  { sign: 'Gêmeos', start: 60, end: 90, symbol: '♊' },
  { sign: 'Câncer', start: 90, end: 120, symbol: '♋' },
  { sign: 'Leão', start: 120, end: 150, symbol: '♌' },
  { sign: 'Virgem', start: 150, end: 180, symbol: '♍' },
  { sign: 'Libra', start: 180, end: 210, symbol: '♎' },
  { sign: 'Escorpião', start: 210, end: 240, symbol: '♏' },
  { sign: 'Sagitário', start: 240, end: 270, symbol: '♐' },
  { sign: 'Capricórnio', start: 270, end: 300, symbol: '♑' },
  { sign: 'Aquário', start: 300, end: 330, symbol: '♒' },
  { sign: 'Peixes', start: 330, end: 360, symbol: '♓' },
];

export const elementColors = {
  Fogo: { primary: 'hsl(15, 80%, 50%)', secondary: 'hsl(30, 90%, 60%)' },
  Terra: { primary: 'hsl(85, 40%, 40%)', secondary: 'hsl(45, 60%, 50%)' },
  Ar: { primary: 'hsl(200, 70%, 60%)', secondary: 'hsl(180, 60%, 70%)' },
  Água: { primary: 'hsl(220, 70%, 50%)', secondary: 'hsl(260, 60%, 60%)' },
};

export const signElements: Record<string, 'Fogo' | 'Terra' | 'Ar' | 'Água'> = {
  'Áries': 'Fogo', 'Leão': 'Fogo', 'Sagitário': 'Fogo',
  'Touro': 'Terra', 'Virgem': 'Terra', 'Capricórnio': 'Terra',
  'Gêmeos': 'Ar', 'Libra': 'Ar', 'Aquário': 'Ar',
  'Câncer': 'Água', 'Escorpião': 'Água', 'Peixes': 'Água',
};

// Interpretation texts for each planet in each sign
export const planetInSignInterpretations: Record<string, Record<string, string>> = {
  sun: {
    'Áries': 'Sua essência é pioneira, corajosa e independente. Você tem uma energia vital forte e natureza competitiva.',
    'Touro': 'Sua essência é estável, sensual e determinada. Você valoriza segurança material e prazeres da vida.',
    'Gêmeos': 'Sua essência é curiosa, comunicativa e versátil. Você tem mente ágil e necessidade de variedade.',
    'Câncer': 'Sua essência é protetora, emocional e intuitiva. Você tem forte conexão com família e memórias.',
    'Leão': 'Sua essência é criativa, generosa e carismática. Você tem necessidade de reconhecimento e expressão.',
    'Virgem': 'Sua essência é analítica, prestativa e perfeccionista. Você tem talento para detalhes e serviço.',
    'Libra': 'Sua essência é diplomática, harmoniosa e estética. Você valoriza relacionamentos e equilíbrio.',
    'Escorpião': 'Sua essência é intensa, transformadora e profunda. Você tem poder de regeneração e percepção.',
    'Sagitário': 'Sua essência é expansiva, otimista e filosófica. Você busca significado e novas experiências.',
    'Capricórnio': 'Sua essência é ambiciosa, disciplinada e responsável. Você tem determinação para construir.',
    'Aquário': 'Sua essência é original, humanitária e independente. Você valoriza liberdade e inovação.',
    'Peixes': 'Sua essência é compassiva, imaginativa e espiritual. Você tem sensibilidade artística e intuitiva.',
  },
  moon: {
    'Áries': 'Suas emoções são impulsivas e diretas. Você precisa de ação e independência emocional.',
    'Touro': 'Suas emoções são estáveis e sensuais. Você precisa de segurança e conforto material.',
    'Gêmeos': 'Suas emoções são variáveis e racionalizadas. Você precisa de estímulo mental e comunicação.',
    'Câncer': 'Suas emoções são profundas e protetoras. Você precisa de intimidade e conexões familiares.',
    'Leão': 'Suas emoções são dramáticas e generosas. Você precisa de admiração e expressão criativa.',
    'Virgem': 'Suas emoções são contidas e práticas. Você precisa de ordem e utilidade.',
    'Libra': 'Suas emoções são harmoniosas e sociais. Você precisa de parcerias e beleza.',
    'Escorpião': 'Suas emoções são intensas e transformadoras. Você precisa de profundidade e intimidade.',
    'Sagitário': 'Suas emoções são otimistas e livres. Você precisa de aventura e significado.',
    'Capricórnio': 'Suas emoções são controladas e ambiciosas. Você precisa de respeito e conquistas.',
    'Aquário': 'Suas emoções são independentes e progressistas. Você precisa de liberdade e amizades.',
    'Peixes': 'Suas emoções são fluidas e empáticas. Você precisa de conexão espiritual e escape criativo.',
  },
  mercury: {
    'Áries': 'Sua mente é rápida e assertiva. Você comunica de forma direta e competitiva.',
    'Touro': 'Sua mente é prática e deliberada. Você comunica de forma sensata e confiável.',
    'Gêmeos': 'Sua mente é ágil e curiosa. Você comunica de forma versátil e espirituosa.',
    'Câncer': 'Sua mente é intuitiva e memorável. Você comunica de forma emocional e protetora.',
    'Leão': 'Sua mente é criativa e dramática. Você comunica de forma expressiva e autoritária.',
    'Virgem': 'Sua mente é analítica e detalhista. Você comunica de forma precisa e crítica.',
    'Libra': 'Sua mente é diplomática e estética. Você comunica de forma harmoniosa e indecisa.',
    'Escorpião': 'Sua mente é penetrante e investigativa. Você comunica de forma intensa e secreta.',
    'Sagitário': 'Sua mente é expansiva e filosófica. Você comunica de forma otimista e direta.',
    'Capricórnio': 'Sua mente é estruturada e pragmática. Você comunica de forma séria e ambiciosa.',
    'Aquário': 'Sua mente é inovadora e excêntrica. Você comunica de forma original e rebelde.',
    'Peixes': 'Sua mente é imaginativa e intuitiva. Você comunica de forma poética e dispersa.',
  },
  venus: {
    'Áries': 'No amor você é apaixonado e conquista. Valoriza independência nos relacionamentos.',
    'Touro': 'No amor você é sensual e leal. Valoriza estabilidade e prazeres materiais.',
    'Gêmeos': 'No amor você é comunicativo e curioso. Valoriza estímulo mental e variedade.',
    'Câncer': 'No amor você é carinhoso e protetor. Valoriza segurança emocional e família.',
    'Leão': 'No amor você é generoso e dramático. Valoriza admiração e romance grandioso.',
    'Virgem': 'No amor você é devotado e prestativo. Valoriza perfeição e cuidado prático.',
    'Libra': 'No amor você é harmonioso e romântico. Valoriza equilíbrio e parcerias ideais.',
    'Escorpião': 'No amor você é intenso e possessivo. Valoriza profundidade e transformação.',
    'Sagitário': 'No amor você é aventureiro e livre. Valoriza crescimento e honestidade.',
    'Capricórnio': 'No amor você é sério e comprometido. Valoriza segurança e status.',
    'Aquário': 'No amor você é independente e amigável. Valoriza liberdade e originalidade.',
    'Peixes': 'No amor você é romântico e compassivo. Valoriza conexão espiritual e sacrifício.',
  },
  mars: {
    'Áries': 'Sua energia é forte, direta e competitiva. Age com coragem e impulsividade.',
    'Touro': 'Sua energia é persistente e determinada. Age com paciência e determinação.',
    'Gêmeos': 'Sua energia é mental e versátil. Age através de comunicação e estratégia.',
    'Câncer': 'Sua energia é defensiva e emocional. Age para proteger e nutrir.',
    'Leão': 'Sua energia é dramática e criativa. Age para brilhar e liderar.',
    'Virgem': 'Sua energia é precisa e útil. Age para aperfeiçoar e servir.',
    'Libra': 'Sua energia é diplomática e social. Age através de parcerias e justiça.',
    'Escorpião': 'Sua energia é intensa e estratégica. Age para transformar e controlar.',
    'Sagitário': 'Sua energia é expansiva e aventureira. Age por ideais e aventura.',
    'Capricórnio': 'Sua energia é disciplinada e ambiciosa. Age para construir e conquistar.',
    'Aquário': 'Sua energia é rebelde e humanitária. Age por causas e inovação.',
    'Peixes': 'Sua energia é fluida e compassiva. Age por inspiração e intuição.',
  },
  jupiter: {
    'Áries': 'Expansão através de iniciativas e liderança. Sorte em novos começos.',
    'Touro': 'Expansão através de recursos e valores. Sorte em finanças e conforto.',
    'Gêmeos': 'Expansão através de comunicação e aprendizado. Sorte em conexões e ideias.',
    'Câncer': 'Expansão através de família e emoções. Sorte em lar e proteção.',
    'Leão': 'Expansão através de criatividade e expressão. Sorte em artes e liderança.',
    'Virgem': 'Expansão através de serviço e análise. Sorte em saúde e trabalho.',
    'Libra': 'Expansão através de parcerias e justiça. Sorte em relacionamentos e arte.',
    'Escorpião': 'Expansão através de transformação e profundidade. Sorte em recursos compartilhados.',
    'Sagitário': 'Expansão através de filosofia e viagens. Sorte em estudos e aventuras.',
    'Capricórnio': 'Expansão através de estrutura e disciplina. Sorte em carreira e status.',
    'Aquário': 'Expansão através de inovação e grupos. Sorte em tecnologia e amizades.',
    'Peixes': 'Expansão através de espiritualidade e compaixão. Sorte em arte e intuição.',
  },
  saturn: {
    'Áries': 'Lições de paciência e liderança consciente. Desafios com impulsividade.',
    'Touro': 'Lições de valor próprio e recursos. Desafios com segurança material.',
    'Gêmeos': 'Lições de comunicação e foco mental. Desafios com dispersão.',
    'Câncer': 'Lições de estrutura emocional e família. Desafios com insegurança.',
    'Leão': 'Lições de expressão autêntica e criatividade. Desafios com reconhecimento.',
    'Virgem': 'Lições de serviço e autocrítica. Desafios com perfeccionismo.',
    'Libra': 'Lições de relacionamentos e compromisso. Desafios com dependência.',
    'Escorpião': 'Lições de poder e transformação. Desafios com controle.',
    'Sagitário': 'Lições de fé e expansão. Desafios com exagero.',
    'Capricórnio': 'Lições de ambição e responsabilidade. Desafios com rigidez.',
    'Aquário': 'Lições de individualidade e humanitarismo. Desafios com rebeldia.',
    'Peixes': 'Lições de fé e limites. Desafios com escapismo.',
  },
  uranus: {
    'Áries': 'Revolução através de individualidade e pioneirismo. Mudanças súbitas de direção.',
    'Touro': 'Revolução através de valores e recursos. Mudanças em segurança material.',
    'Gêmeos': 'Revolução através de ideias e comunicação. Mudanças em pensamento.',
    'Câncer': 'Revolução através de família e emoções. Mudanças em raízes.',
    'Leão': 'Revolução através de criatividade e expressão. Mudanças em identidade.',
    'Virgem': 'Revolução através de trabalho e saúde. Mudanças em rotinas.',
    'Libra': 'Revolução através de relacionamentos e justiça. Mudanças em parcerias.',
    'Escorpião': 'Revolução através de poder e transformação. Mudanças profundas.',
    'Sagitário': 'Revolução através de crenças e viagens. Mudanças em filosofia.',
    'Capricórnio': 'Revolução através de estruturas e autoridade. Mudanças em sistemas.',
    'Aquário': 'Revolução através de tecnologia e humanitarismo. Mudanças sociais.',
    'Peixes': 'Revolução através de espiritualidade e arte. Mudanças em consciência.',
  },
  neptune: {
    'Áries': 'Inspiração através de ação e coragem. Ilusões sobre identidade.',
    'Touro': 'Inspiração através de beleza e valores. Ilusões sobre segurança.',
    'Gêmeos': 'Inspiração através de ideias e comunicação. Ilusões sobre verdade.',
    'Câncer': 'Inspiração através de família e emoções. Ilusões sobre proteção.',
    'Leão': 'Inspiração através de criatividade e romance. Ilusões sobre ego.',
    'Virgem': 'Inspiração através de serviço e saúde. Ilusões sobre perfeição.',
    'Libra': 'Inspiração através de arte e relacionamentos. Ilusões sobre harmonia.',
    'Escorpião': 'Inspiração através de mistério e profundidade. Ilusões sobre poder.',
    'Sagitário': 'Inspiração através de fé e aventura. Ilusões sobre verdade.',
    'Capricórnio': 'Inspiração através de ambição e estrutura. Ilusões sobre sucesso.',
    'Aquário': 'Inspiração através de ideais e humanitarismo. Ilusões sobre progresso.',
    'Peixes': 'Inspiração através de espiritualidade e arte. Ilusões transcendentes.',
  },
  pluto: {
    'Áries': 'Transformação através de identidade e liderança. Poder do pioneirismo.',
    'Touro': 'Transformação através de valores e recursos. Poder da persistência.',
    'Gêmeos': 'Transformação através de comunicação e ideias. Poder do conhecimento.',
    'Câncer': 'Transformação através de família e emoções. Poder da proteção.',
    'Leão': 'Transformação através de criatividade e expressão. Poder do carisma.',
    'Virgem': 'Transformação através de serviço e análise. Poder da purificação.',
    'Libra': 'Transformação através de relacionamentos e justiça. Poder da diplomacia.',
    'Escorpião': 'Transformação através de profundidade e regeneração. Poder absoluto.',
    'Sagitário': 'Transformação através de crenças e expansão. Poder da verdade.',
    'Capricórnio': 'Transformação através de estruturas e autoridade. Poder institucional.',
    'Aquário': 'Transformação através de tecnologia e humanitarismo. Poder coletivo.',
    'Peixes': 'Transformação através de espiritualidade e compaixão. Poder transcendente.',
  },
};
