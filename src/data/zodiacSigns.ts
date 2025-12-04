export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  element: 'Fogo' | 'Terra' | 'Ar' | 'Água';
  dateRange: string;
  ruling: string;
}

export const zodiacSigns: ZodiacSign[] = [
  { id: 'aries', name: 'Áries', symbol: '♈', element: 'Fogo', dateRange: '21/03 - 19/04', ruling: 'Marte' },
  { id: 'touro', name: 'Touro', symbol: '♉', element: 'Terra', dateRange: '20/04 - 20/05', ruling: 'Vênus' },
  { id: 'gemeos', name: 'Gêmeos', symbol: '♊', element: 'Ar', dateRange: '21/05 - 20/06', ruling: 'Mercúrio' },
  { id: 'cancer', name: 'Câncer', symbol: '♋', element: 'Água', dateRange: '21/06 - 22/07', ruling: 'Lua' },
  { id: 'leao', name: 'Leão', symbol: '♌', element: 'Fogo', dateRange: '23/07 - 22/08', ruling: 'Sol' },
  { id: 'virgem', name: 'Virgem', symbol: '♍', element: 'Terra', dateRange: '23/08 - 22/09', ruling: 'Mercúrio' },
  { id: 'libra', name: 'Libra', symbol: '♎', element: 'Ar', dateRange: '23/09 - 22/10', ruling: 'Vênus' },
  { id: 'escorpiao', name: 'Escorpião', symbol: '♏', element: 'Água', dateRange: '23/10 - 21/11', ruling: 'Plutão' },
  { id: 'sagitario', name: 'Sagitário', symbol: '♐', element: 'Fogo', dateRange: '22/11 - 21/12', ruling: 'Júpiter' },
  { id: 'capricornio', name: 'Capricórnio', symbol: '♑', element: 'Terra', dateRange: '22/12 - 19/01', ruling: 'Saturno' },
  { id: 'aquario', name: 'Aquário', symbol: '♒', element: 'Ar', dateRange: '20/01 - 18/02', ruling: 'Urano' },
  { id: 'peixes', name: 'Peixes', symbol: '♓', element: 'Água', dateRange: '19/02 - 20/03', ruling: 'Netuno' },
];

export const horoscopeContent: Record<string, { daily: string; weekly: string; monthly: string }> = {
  aries: {
    daily: "Hoje é um dia de energia intensa para você, Áries. Marte, seu regente, está em aspecto favorável, trazendo coragem e determinação para enfrentar qualquer desafio. No amor, conversas sinceras fortalecem os laços. No trabalho, sua liderança será reconhecida. Cuide da sua saúde física praticando atividades que canalizem essa energia vibrante.",
    weekly: "Esta semana promete muitas conquistas, Áries. A Lua Nova em seu setor de comunicação abre portas para novos projetos e parcerias. Aproveite a energia para iniciar conversas importantes e expressar suas ideias. No amor, momentos de cumplicidade fortalecem a relação. Finanças pedem atenção no meio da semana.",
    monthly: "Dezembro traz um período de transformação profunda para Áries. Com Júpiter favorecendo seu signo, oportunidades de crescimento surgem em diversas áreas. No trabalho, reconhecimento e possíveis promoções. No amor, intensidade e paixão renovada. Cuide do equilíbrio entre vida pessoal e profissional.",
  },
  touro: {
    daily: "Touro, hoje Vênus ilumina suas finanças e valores pessoais. É um excelente dia para revisar investimentos e planejar o futuro. No amor, gestos de carinho e cuidado fortalecem os vínculos. No trabalho, sua persistência traz resultados concretos. Permita-se momentos de prazer e autocuidado.",
    weekly: "A semana favorece reflexões sobre seus valores e metas, Touro. Com o Sol em aspecto harmônico, você ganha clareza sobre o que realmente importa. Finanças apresentam oportunidades interessantes. No amor, diálogos profundos aproximam os corações. Saúde pede atenção à alimentação.",
    monthly: "Este mês de dezembro convida você a revisitar seus sonhos, Touro. Mercúrio retrógrado pede paciência nas comunicações, mas traz insights valiosos. No trabalho, projetos antigos podem ser retomados com sucesso. No amor, nostalgias podem trazer reconciliações. Finanças estáveis, mas evite gastos impulsivos.",
  },
  gemeos: {
    daily: "Gêmeos, sua mente brilha hoje com novas ideias e conexões. Mercúrio favorece comunicações e aprendizados. É um dia perfeito para reuniões, apresentações e networking. No amor, palavras doces encantam seu par. Cuide para não dispersar energia em muitas direções.",
    weekly: "Semana de intensa atividade mental para Gêmeos. Sua curiosidade natural será recompensada com descobertas fascinantes. No trabalho, projetos criativos ganham destaque. No amor, comunicação fluida fortalece a relação. Atenção ao descanso no final de semana.",
    monthly: "Dezembro é seu mês de brilhar socialmente, Gêmeos. Festas e encontros trazem conexões valiosas. No trabalho, sua versatilidade será seu maior trunfo. No amor, momento de definições importantes. Finanças pedem organização, mas promessas de melhora surgem no horizonte.",
  },
  cancer: {
    daily: "Câncer, hoje a Lua, sua regente, pede que você cuide das suas emoções com carinho. É um dia propício para estar em família e cuidar do lar. No amor, intimidade e aconchego são as palavras-chave. No trabalho, sua intuição guia decisões certeiras.",
    weekly: "Semana emocionalmente intensa para Câncer. A Lua cheia ilumina questões do passado que precisam de resolução. No lar, harmonia e aconchego. No trabalho, reconhecimento de seus esforços. No amor, momentos de profunda conexão emocional.",
    monthly: "Este dezembro pede introspecção e cuidado, Câncer. É tempo de nutrir seus sonhos e planejar o futuro com sabedoria. No trabalho, fechamento de ciclos. No amor, aprofundamento das conexões existentes. Saúde pede atenção especial ao sistema emocional.",
  },
  leao: {
    daily: "Leão, o Sol ilumina sua criatividade e expressão pessoal hoje. É um dia para brilhar e mostrar seus talentos ao mundo. No amor, romance e paixão estão em alta. No trabalho, liderança natural atrai admiradores. Permita-se momentos de alegria e diversão.",
    weekly: "Semana de destaque para Leão. Sua presença magnética atrai olhares e oportunidades. No trabalho, projetos criativos ganham força. No amor, declarações e gestos grandiosos. Finanças apresentam movimentação positiva, especialmente ligada a talentos pessoais.",
    monthly: "Dezembro promete ser um mês de celebração para Leão. Com Vênus favorecendo seu signo, amor e beleza cercam sua vida. No trabalho, reconhecimento merecido. No amor, período de intensidade e entrega. Cuide da saúde com práticas que energizem corpo e espírito.",
  },
  virgem: {
    daily: "Virgem, hoje Mercúrio favorece sua capacidade analítica e organizacional. É um dia excelente para resolver pendências e organizar projetos. No amor, pequenos gestos de cuidado fortalecem a relação. No trabalho, sua eficiência é notada e valorizada.",
    weekly: "Semana produtiva para Virgem. Sua atenção aos detalhes será crucial para o sucesso de projetos importantes. No amor, demonstrações práticas de afeto. No trabalho, possíveis promoções ou reconhecimento. Saúde pede rotina equilibrada.",
    monthly: "Este dezembro favorece sua vida doméstica, Virgem. É tempo de cuidar do lar e das raízes familiares. No trabalho, consolidação de conquistas do ano. No amor, estabilidade e conforto. Finanças pedem planejamento para o próximo ano.",
  },
  libra: {
    daily: "Libra, Vênus ilumina suas relações hoje, trazendo harmonia e beleza. É um dia perfeito para encontros sociais e momentos românticos. No trabalho, parcerias se fortalecem. No amor, equilíbrio e compreensão mútua. Cultive a paz interior através da arte e da beleza.",
    weekly: "Semana de harmonia para Libra. O Sol em aspecto favorável traz clareza nas decisões importantes. No amor, momentos de romantismo e conexão. No trabalho, negociações bem-sucedidas. Finanças estáveis com possíveis surpresas positivas.",
    monthly: "Dezembro é um mês de comunicação intensa para Libra. Novas conexões e aprendizados enriquecem sua vida. No trabalho, projetos de comunicação ganham destaque. No amor, palavras de amor e compromisso. Cuide das viagens e deslocamentos.",
  },
  escorpiao: {
    daily: "Escorpião, Plutão intensifica sua percepção hoje. É um dia de revelações e transformações profundas. No amor, intimidade e vulnerabilidade aproximam. No trabalho, sua intuição guia decisões estratégicas. Permita que antigas peles sejam deixadas para trás.",
    weekly: "Semana intensa para Escorpião. Transformações profundas estão em curso, trazendo renovação. No amor, conexões de alma são possíveis. No trabalho, poder e influência crescem. Finanças podem surpreender positivamente.",
    monthly: "Este dezembro coloca o foco nas suas finanças e valores, Escorpião. É tempo de rever prioridades e investimentos. No trabalho, recompensas financeiras por esforços passados. No amor, questões materiais precisam de alinhamento. Cuide do seu poder pessoal.",
  },
  sagitario: {
    daily: "Sagitário, Júpiter expande seus horizontes hoje. É um dia de otimismo e novas possibilidades. No amor, aventuras e descobertas a dois. No trabalho, visão ampla traz soluções criativas. Cultive a fé e a alegria de viver.",
    weekly: "Semana de expansão para Sagitário. Novas oportunidades de crescimento e aprendizado surgem. No amor, liberdade e cumplicidade caminham juntas. No trabalho, projetos internacionais ou de longo alcance. Saúde pede atividades ao ar livre.",
    monthly: "Dezembro é seu mês de aniversário, Sagitário! O Sol ilumina sua personalidade e atrai novas oportunidades. No trabalho, início de ciclos promissores. No amor, encontros significativos. É tempo de sonhar grande e acreditar em si mesmo.",
  },
  capricornio: {
    daily: "Capricórnio, Saturno fortalece sua determinação hoje. É um dia para trabalho focado e construção de bases sólidas. No amor, compromisso e estabilidade são valorizados. No trabalho, reconhecimento de sua disciplina e competência.",
    weekly: "Semana de realizações para Capricórnio. Seu esforço constante começa a dar frutos visíveis. No amor, relações maduras e estáveis. No trabalho, possíveis promoções ou novas responsabilidades. Finanças em crescimento.",
    monthly: "Este dezembro convida à introspecção, Capricórnio. É tempo de refletir sobre o ano que passou e preparar-se para o novo ciclo. No trabalho, fechamento de projetos importantes. No amor, cura de questões do passado. Cuide do seu mundo interior.",
  },
  aquario: {
    daily: "Aquário, Urano inspira sua originalidade hoje. É um dia de insights inovadores e conexões surpreendentes. No amor, liberdade e autenticidade são essenciais. No trabalho, ideias revolucionárias ganham espaço. Cultive sua singularidade.",
    weekly: "Semana de inovação para Aquário. Sua visão de futuro atrai pessoas alinhadas. No amor, relacionamentos não-convencionais florescem. No trabalho, tecnologia e criatividade se unem. Amizades trazem alegrias inesperadas.",
    monthly: "Dezembro favorece suas conexões sociais, Aquário. Amizades antigas e novas enriquecem sua vida. No trabalho, projetos em grupo ganham força. No amor, reencontros significativos. É tempo de celebrar a diversidade e a união.",
  },
  peixes: {
    daily: "Peixes, Netuno aguça sua sensibilidade hoje. É um dia de intuição afiada e conexões espirituais profundas. No amor, romance e fantasia se encontram. No trabalho, criatividade flui naturalmente. Cuide da sua energia espiritual.",
    weekly: "Semana de sonhos para Peixes. Sua intuição está especialmente aguçada, guiando decisões importantes. No amor, momentos mágicos e conexões de alma. No trabalho, projetos artísticos ou espirituais. Saúde pede descanso e meditação.",
    monthly: "Este dezembro coloca o foco na sua carreira, Peixes. É tempo de reconhecimento e crescimento profissional. No trabalho, seus talentos únicos são valorizados. No amor, equilíbrio entre vida pessoal e profissional. Cuide dos seus sonhos mais elevados.",
  },
};
