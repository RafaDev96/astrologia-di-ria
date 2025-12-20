// Interpretações profundas e educativas das Casas Astrológicas

export interface HouseInterpretation {
  number: number;
  name: string;
  title: string;
  keywords: string[];
  deepMeaning: string;
  lifeAreas: string[];
  questions: string[];
  shadowSide: string;
  growthPath: string;
  signInfluences: Record<string, string>;
}

export const houseInterpretations: HouseInterpretation[] = [
  {
    number: 1,
    name: "Casa 1",
    title: "A Casa do Eu - O Ascendente",
    keywords: ["Identidade", "Aparência", "Primeira Impressão", "Começos", "Vitalidade"],
    deepMeaning: `A Casa 1 é a mais pessoal de todas as casas astrológicas. Ela representa a máscara que você usa para o mundo, sua aparência física, e como você instintivamente se apresenta aos outros. O signo no Ascendente (cúspide da Casa 1) é tão importante quanto o signo solar, pois define como você inicia ações e enfrenta novos começos.

Esta casa governa seu corpo físico, sua energia vital, e a primeira impressão que causa nos outros. É aqui que vemos como você "nasce" para cada nova situação - sua abordagem instintiva da vida.`,
    lifeAreas: [
      "Aparência física e como você se apresenta",
      "Primeiras impressões que causa nos outros",
      "Abordagem instintiva de novas situações",
      "Saúde física e vitalidade",
      "Senso de identidade pessoal"
    ],
    questions: [
      "Como você quer ser visto pelo mundo?",
      "Qual é sua primeira reação diante de novos desafios?",
      "Você se sente confortável em sua própria pele?"
    ],
    shadowSide: "Quando mal trabalhada, pode manifestar-se como egocentrismo excessivo, preocupação obsessiva com aparência, ou dificuldade em considerar as perspectivas dos outros.",
    growthPath: "O caminho de crescimento envolve alinhar sua apresentação externa com seu eu autêntico, desenvolvendo autoconfiança genuína e aprendendo a iniciar ações de forma consciente.",
    signInfluences: {
      "Áries": "Você irradia energia pioneira e assertiva. Sua presença é dinâmica, impulsiva e corajosa. Tende a agir primeiro e pensar depois, com uma abordagem direta e competitiva da vida.",
      "Touro": "Sua presença transmite estabilidade e sensualidade. Você se apresenta de forma calma, prática e confiável. Valoriza conforto e segurança, movendo-se em ritmo próprio.",
      "Gêmeos": "Você transmite curiosidade e versatilidade. Sua energia é comunicativa, adaptável e mentalmente ágil. Tende a abordar a vida com leveza e interesse em múltiplas direções.",
      "Câncer": "Sua presença é acolhedora e protetora. Você se apresenta de forma sensível, intuitiva e emocionalmente receptiva. Cria um senso de familiaridade e cuidado.",
      "Leão": "Você irradia carisma e autoconfiança. Sua presença é dramática, calorosa e magnética. Naturalmente atrai atenção e tende a liderar com criatividade.",
      "Virgem": "Sua presença é refinada e atenciosa. Você se apresenta de forma analítica, prestativa e modesta. Presta atenção aos detalhes e busca ser útil.",
      "Libra": "Você transmite charme e diplomacia. Sua energia é harmoniosa, elegante e socialmente consciente. Busca equilíbrio e justiça em suas interações.",
      "Escorpião": "Sua presença é intensa e magnética. Você se apresenta de forma profunda, perceptiva e transformadora. Emana uma aura de mistério e poder.",
      "Sagitário": "Você irradia otimismo e aventura. Sua energia é expansiva, filosófica e entusiasta. Aborda a vida com fé e sede de experiências.",
      "Capricórnio": "Sua presença é séria e competente. Você se apresenta de forma madura, ambiciosa e responsável. Transmite autoridade e determinação.",
      "Aquário": "Você transmite originalidade e independência. Sua energia é inovadora, humanitária e não-convencional. Valoriza autenticidade acima de conformidade.",
      "Peixes": "Sua presença é etérea e compassiva. Você se apresenta de forma sensível, adaptável e espiritualmente receptiva. Possui uma qualidade quase mística."
    }
  },
  {
    number: 2,
    name: "Casa 2",
    title: "A Casa dos Valores e Recursos",
    keywords: ["Dinheiro", "Valores", "Autoestima", "Talentos", "Posses"],
    deepMeaning: `A Casa 2 vai muito além de finanças - ela representa aquilo que você valoriza profundamente e como você manifesta segurança material e emocional. Esta casa revela sua relação com dinheiro, posses, mas também com seus talentos naturais e senso de autoestima.

Aqui vemos como você ganha dinheiro, o que considera valioso, e como você constrói segurança. A Casa 2 também governa os prazeres sensoriais - como você experimenta o mundo físico através dos cinco sentidos.`,
    lifeAreas: [
      "Finanças pessoais e ganhos",
      "Posses materiais e recursos",
      "Talentos naturais e habilidades",
      "Autoestima e senso de valor próprio",
      "Prazeres sensoriais e conforto"
    ],
    questions: [
      "O que você realmente valoriza na vida?",
      "Como você define segurança?",
      "Quais são seus talentos naturais que podem gerar recursos?"
    ],
    shadowSide: "Pode manifestar-se como ganância, materialismo excessivo, insegurança financeira crônica, ou basear a autoestima apenas em posses.",
    growthPath: "Desenvolver uma relação saudável com dinheiro, reconhecer seus talentos inatos, e construir autoestima baseada em valores internos, não apenas externos.",
    signInfluences: {
      "Áries": "Você ganha dinheiro através de iniciativa e ação independente. Valoriza autonomia e pode ser impulsivo com gastos. Seus talentos envolvem liderança e começar novos projetos.",
      "Touro": "Você tem talento natural para acumular recursos e criar estabilidade financeira. Valoriza qualidade sobre quantidade e aprecia os prazeres sensoriais da vida.",
      "Gêmeos": "Você pode ter múltiplas fontes de renda ou ganhar através de comunicação e ideias. Valoriza versatilidade e informação. Pode ter tendência a gastos variáveis.",
      "Câncer": "Você valoriza segurança emocional tanto quanto financeira. Pode ganhar através de cuidado com outros ou negócios familiares. Tende a poupar para o futuro.",
      "Leão": "Você valoriza luxo e generosidade. Pode ganhar através de criatividade ou liderança. Tende a ser generoso com dinheiro, às vezes excessivamente.",
      "Virgem": "Você é prático e analítico com finanças. Ganha através de serviço, análise ou habilidades técnicas. Valoriza utilidade e eficiência.",
      "Libra": "Você pode ganhar através de parcerias ou campos relacionados à beleza e arte. Valoriza harmonia e pode gastar em estética. Busca equilíbrio financeiro.",
      "Escorpião": "Você tem uma relação intensa com recursos. Pode ganhar através de investimentos, pesquisa ou trabalhar com recursos dos outros. Valoriza controle e poder.",
      "Sagitário": "Você valoriza liberdade e experiências sobre posses. Pode ganhar através de ensino, viagens ou publicações. Tende a ser otimista (às vezes demais) com finanças.",
      "Capricórnio": "Você é ambicioso e estratégico com recursos. Valoriza conquista e status. Tende a construir riqueza lentamente através de disciplina e planejamento.",
      "Aquário": "Você tem uma abordagem não-convencional com dinheiro. Pode ganhar através de tecnologia ou trabalho humanitário. Valoriza independência sobre riqueza.",
      "Peixes": "Você pode ter uma relação fluida com dinheiro. Ganha através de criatividade, espiritualidade ou serviço compassivo. Pode precisar de estrutura financeira."
    }
  },
  {
    number: 3,
    name: "Casa 3",
    title: "A Casa da Mente e Comunicação",
    keywords: ["Comunicação", "Pensamento", "Irmãos", "Vizinhança", "Aprendizado"],
    deepMeaning: `A Casa 3 governa como sua mente funciona no dia a dia - seus padrões de pensamento, estilo de comunicação, e curiosidade natural. Esta é a casa do aprendizado inicial, das trocas de ideias, e de como você processa e compartilha informações.

Também governa seus relacionamentos com irmãos, vizinhos, e seu ambiente local. Representa viagens curtas, o que você lê, e como você se expressa verbalmente e por escrito.`,
    lifeAreas: [
      "Estilo de comunicação e expressão",
      "Padrões de pensamento e processamento mental",
      "Relacionamento com irmãos e vizinhos",
      "Educação básica e aprendizado contínuo",
      "Viagens curtas e ambiente local"
    ],
    questions: [
      "Como você prefere se comunicar?",
      "O que desperta sua curiosidade?",
      "Como é sua relação com irmãos e pessoas próximas?"
    ],
    shadowSide: "Pode manifestar-se como fofoca, superficialidade intelectual, dificuldade de concentração, ou uso de palavras para manipular.",
    growthPath: "Desenvolver comunicação consciente e autêntica, cultivar curiosidade genuína, e usar a mente como ferramenta de conexão ao invés de separação.",
    signInfluences: {
      "Áries": "Sua comunicação é direta, assertiva e rápida. Você pensa de forma independente e pode ser impaciente com explicações longas. Ama debates e novos aprendizados.",
      "Touro": "Você pensa de forma prática e deliberada. Sua comunicação é calma e sensata. Aprende melhor através de experiência prática e repetição.",
      "Gêmeos": "Sua mente é extremamente ágil e versátil. Você é um comunicador natural, curioso sobre tudo. Pode ter dificuldade em se aprofundar em um único tópico.",
      "Câncer": "Sua comunicação é emocional e intuitiva. Você pensa através de sentimentos e memórias. Tem uma conexão profunda com familiares e passado.",
      "Leão": "Sua comunicação é dramática e criativa. Você pensa de forma confiante e ama se expressar. Pode ter talento natural para falar em público.",
      "Virgem": "Sua mente é analítica e detalhista. Você se comunica de forma precisa e organizada. Excelente para pesquisa e análise crítica.",
      "Libra": "Sua comunicação busca harmonia e equilíbrio. Você considera múltiplas perspectivas antes de formar opiniões. Talento natural para mediação.",
      "Escorpião": "Sua mente vai às profundezas. Você se comunica de forma intensa e perceptiva. Interesse em mistérios e verdades ocultas.",
      "Sagitário": "Sua comunicação é entusiasta e filosófica. Você pensa em grande escala e ama aprender sobre culturas e ideias diversas.",
      "Capricórnio": "Sua mente é séria e estruturada. Você se comunica de forma prática e orientada a objetivos. Valoriza conhecimento útil.",
      "Aquário": "Sua mente é inovadora e não-convencional. Você pensa de forma original e se comunica ideias progressistas. Interesse em tecnologia e futuro.",
      "Peixes": "Sua comunicação é imaginativa e intuitiva. Você pensa de forma não-linear e absorve informação do ambiente. Talento para expressão artística."
    }
  },
  {
    number: 4,
    name: "Casa 4",
    title: "A Casa do Lar e Raízes - O Fundo do Céu",
    keywords: ["Lar", "Família", "Raízes", "Ancestralidade", "Fundações"],
    deepMeaning: `A Casa 4, também conhecida como Fundo do Céu (IC), representa suas raízes mais profundas - sua família de origem, sua ancestralidade, e as fundações emocionais sobre as quais você constrói sua vida. É o ponto mais privado do mapa, onde você encontra refúgio.

Esta casa governa sua relação com um dos pais (tradicionalmente o pai ou a figura mais nutridora), seu lar físico, e como você cria segurança emocional. Também representa sua vida interior, seu mundo privado, e até mesmo o final da vida.`,
    lifeAreas: [
      "Lar e ambiente doméstico",
      "Família de origem e ancestralidade",
      "Fundações emocionais e segurança",
      "Vida privada e intimidade",
      "Um dos pais ou figura nutridora"
    ],
    questions: [
      "O que significa 'lar' para você?",
      "Quais padrões familiares você carrega?",
      "Onde você encontra verdadeira segurança emocional?"
    ],
    shadowSide: "Pode manifestar-se como apego excessivo ao passado, feridas familiares não curadas, dificuldade em estabelecer raízes, ou usar o lar como escape.",
    growthPath: "Honrar suas raízes enquanto cria suas próprias fundações, curar padrões familiares, e construir um lar interno de paz independente das circunstâncias externas.",
    signInfluences: {
      "Áries": "Você precisa de independência no lar. Pode ter tido um lar dinâmico ou conflituoso. Cria um ambiente energético e é pioneiro em sua família.",
      "Touro": "Você valoriza estabilidade e conforto no lar. Sua família pode ter enfatizado segurança material. Cria ambientes bonitos e acolhedores.",
      "Gêmeos": "Seu lar pode ter sido intelectualmente estimulante. Você precisa de variedade no ambiente doméstico. Pode ter se mudado frequentemente.",
      "Câncer": "Posição natural - lar e família são extremamente importantes. Você é profundamente ligado às suas raízes. Cria ambientes muito acolhedores e protetores.",
      "Leão": "Seu lar é um lugar de expressão criativa. Você quer se orgulhar de seu ambiente. Pode ter tido um pai/mãe dominante ou carismático.",
      "Virgem": "Você valoriza ordem e funcionalidade no lar. Pode ter assumido responsabilidades domésticas cedo. Seu ambiente tende a ser organizado e limpo.",
      "Libra": "Você busca harmonia e beleza no lar. Pode ter dificuldade com conflitos familiares. Cria ambientes esteticamente agradáveis e equilibrados.",
      "Escorpião": "Seu lar é um lugar de intensidade emocional. Pode haver segredos familiares. Você experimenta transformações profundas através da família.",
      "Sagitário": "Você precisa de liberdade no lar. Sua família pode ter raízes culturais diversas. Pode sentir desejo de viver em terras estrangeiras.",
      "Capricórnio": "Você leva o lar a sério e busca estabilidade. Pode ter tido responsabilidades familiares precoces. Constrói tradições e estruturas sólidas.",
      "Aquário": "Seu lar pode ser não-convencional. Você valoriza liberdade no ambiente doméstico. Sua família pode ser excêntrica ou progressista.",
      "Peixes": "Seu lar é um santuário espiritual. Pode haver confusão ou sacrifício em dinâmicas familiares. Você cria ambientes místicos e acolhedores."
    }
  },
  {
    number: 5,
    name: "Casa 5",
    title: "A Casa da Criatividade e Alegria",
    keywords: ["Criatividade", "Romance", "Filhos", "Diversão", "Autoexpressão"],
    deepMeaning: `A Casa 5 é onde seu espírito brinca! Esta é a casa da pura autoexpressão criativa, da alegria, do romance, dos filhos, e de tudo que você faz pelo simples prazer de fazer. É onde seu coração se expande em direção à vida.

Governa romances (diferente de parcerias sérias da Casa 7), jogos, hobbies, especulação, e sua capacidade de criar - seja filhos biológicos ou "filhos" artísticos. A Casa 5 mostra como você se diverte e o que faz seu coração cantar.`,
    lifeAreas: [
      "Expressão criativa e artística",
      "Romances e casos amorosos",
      "Filhos e relação com crianças",
      "Hobbies, diversão e lazer",
      "Jogos, especulação e riscos"
    ],
    questions: [
      "O que você faz puramente por prazer?",
      "Como você expressa sua criatividade?",
      "O que faz seu coração vibrar de alegria?"
    ],
    shadowSide: "Pode manifestar-se como busca excessiva por prazer, drama emocional em romances, necessidade de aprovação, ou evitação de responsabilidades.",
    growthPath: "Cultivar alegria autêntica, expressar criatividade sem medo de julgamento, e encontrar o equilíbrio entre diversão e responsabilidade.",
    signInfluences: {
      "Áries": "Sua criatividade é ardente e espontânea. Você ama a emoção da conquista romântica. Seus hobbies tendem a ser competitivos ou físicos.",
      "Touro": "Sua criatividade é sensual e artística. Você aprecia romances estáveis e luxuosos. Hobbies relacionados a arte, música ou natureza.",
      "Gêmeos": "Sua criatividade é versátil e intelectual. Você precisa de estimulação mental em romances. Múltiplos hobbies e interesses.",
      "Câncer": "Sua criatividade é emotiva e nutritiva. Romances profundamente emocionais. Forte conexão com filhos e atividades domésticas criativas.",
      "Leão": "Posição natural - criatividade dramática e expressiva. Você ama ser o centro das atenções. Romances apaixonados e generosidade com quem ama.",
      "Virgem": "Sua criatividade é refinada e técnica. Você pode ser perfeccionista em hobbies. Romances que envolvem serviço e cuidado prático.",
      "Libra": "Sua criatividade busca beleza e harmonia. Romances são importantes e você valoriza parcerias equilibradas. Hobbies artísticos e sociais.",
      "Escorpião": "Sua criatividade é intensa e transformadora. Romances profundos e às vezes obsessivos. Hobbies que envolvem mistério ou investigação.",
      "Sagitário": "Sua criatividade é aventureira e expansiva. Romances com pessoas de outras culturas. Hobbies relacionados a viagens, esportes ou filosofia.",
      "Capricórnio": "Sua criatividade é estruturada e ambiciosa. Você pode demorar a se soltar em romances. Hobbies que constroem algo duradouro.",
      "Aquário": "Sua criatividade é original e excêntrica. Romances não-convencionais. Hobbies relacionados a tecnologia, causas sociais ou experimentos.",
      "Peixes": "Sua criatividade é imaginativa e transcendente. Romances idealizados ou espirituais. Hobbies artísticos, musicais ou meditativos."
    }
  },
  {
    number: 6,
    name: "Casa 6",
    title: "A Casa da Saúde e Serviço",
    keywords: ["Saúde", "Trabalho", "Rotina", "Serviço", "Aperfeiçoamento"],
    deepMeaning: `A Casa 6 governa os aspectos práticos do dia a dia - sua saúde física, rotinas diárias, ambiente de trabalho, e seu desejo de ser útil. É aqui que você aperfeiçoa suas habilidades e coloca seu conhecimento em prática.

Esta casa não é sobre carreira (Casa 10), mas sobre o trabalho diário, a relação com colegas e subordinados, e como você cuida do seu corpo. Também governa animais de estimação e pequenos animais, simbolizando a relação de cuidado.`,
    lifeAreas: [
      "Saúde física e hábitos de bem-estar",
      "Trabalho diário e ambiente de trabalho",
      "Rotinas e organização",
      "Serviço aos outros e utilidade",
      "Relação com animais de estimação"
    ],
    questions: [
      "Como você cuida do seu corpo?",
      "Você se sente útil em seu trabalho diário?",
      "Suas rotinas apoiam ou drenam sua energia?"
    ],
    shadowSide: "Pode manifestar-se como perfeccionismo excessivo, hipocondria, workaholismo, ou martírio através do serviço.",
    growthPath: "Desenvolver rotinas saudáveis sustentáveis, encontrar propósito no serviço sem se sacrificar, e honrar as necessidades do corpo.",
    signInfluences: {
      "Áries": "Você aborda trabalho e saúde com energia e iniciativa. Pode ser impaciente com rotinas. Beneficia-se de exercícios intensos e trabalho independente.",
      "Touro": "Você prefere rotinas estáveis e confortáveis. Trabalha de forma consistente e valora qualidade. Atenção especial à alimentação e prazeres sensoriais.",
      "Gêmeos": "Você precisa de variedade no trabalho diário. Pode ter múltiplas tarefas ou empregos. Saúde mental é tão importante quanto física.",
      "Câncer": "Você trabalha melhor em ambientes acolhedores. Saúde está ligada às emoções. Pode ter papel de cuidador no trabalho.",
      "Leão": "Você quer brilhar em seu trabalho diário. Precisa de reconhecimento por seu serviço. Saúde beneficia de atividades que expressem criatividade.",
      "Virgem": "Posição natural - você é detalhista e dedicado ao aperfeiçoamento. Pode ser perfeccionista. Interesse em saúde, nutrição e rotinas organizadas.",
      "Libra": "Você trabalha bem em equipe e busca harmonia no ambiente. Saúde beneficia de equilíbrio trabalho-vida. Estética é importante no espaço de trabalho.",
      "Escorpião": "Você trabalha com intensidade e profundidade. Pode ser atraído por trabalhos de investigação ou cura. Saúde requer atenção a processos de purificação.",
      "Sagitário": "Você precisa de liberdade e significado no trabalho. Rotinas rígidas são desafiadoras. Saúde beneficia de atividades ao ar livre e movimento.",
      "Capricórnio": "Você é disciplinado e ambicioso no trabalho diário. Pode assumir muita responsabilidade. Saúde requer equilíbrio entre trabalho e descanso.",
      "Aquário": "Você prefere métodos de trabalho não-convencionais. Interesse em tecnologia ou trabalho humanitário. Saúde pode beneficiar de abordagens alternativas.",
      "Peixes": "Você serve com compaixão e intuição. Pode absorver energias no trabalho. Saúde requer atenção a limites e práticas de limpeza energética."
    }
  },
  {
    number: 7,
    name: "Casa 7",
    title: "A Casa das Parcerias - O Descendente",
    keywords: ["Casamento", "Parcerias", "Relacionamentos", "Contratos", "O Outro"],
    deepMeaning: `A Casa 7, oposta à Casa 1, representa o "outro" em sua vida - parceiros românticos, de negócios, e até inimigos declarados. O Descendente (cúspide da Casa 7) revela o que você busca e atrai em relacionamentos íntimos, muitas vezes qualidades que você não reconhece em si mesmo.

Esta casa governa casamento, parcerias de negócios, contratos legais, e qualquer relacionamento um-a-um significativo. Mostra como você se comporta em relacionamentos comprometidos e o que precisa de um parceiro.`,
    lifeAreas: [
      "Casamento e parcerias românticas sérias",
      "Parcerias de negócios e contratos",
      "Relacionamentos um-a-um significativos",
      "Inimigos declarados e processos legais",
      "O que você busca e atrai nos outros"
    ],
    questions: [
      "Que qualidades você busca em um parceiro?",
      "Você tende a projetar partes de si nos outros?",
      "Como você se comporta em relacionamentos comprometidos?"
    ],
    shadowSide: "Pode manifestar-se como dependência excessiva de parceiros, perda de identidade em relacionamentos, ou atrair repetidamente os mesmos tipos problemáticos.",
    growthPath: "Desenvolver parcerias equilibradas onde ambos mantêm sua identidade, reconhecer qualidades projetadas nos outros como suas próprias, e escolher conscientemente parceiros.",
    signInfluences: {
      "Áries": "Você atrai/busca parceiros independentes e assertivos. Relacionamentos dinâmicos com possível competição. Precisa de um parceiro que respeite sua individualidade.",
      "Touro": "Você busca estabilidade e lealdade em parcerias. Atrai parceiros práticos e sensuais. Valoriza segurança e conforto nos relacionamentos.",
      "Gêmeos": "Você precisa de comunicação e estimulação mental nas parcerias. Atrai parceiros versáteis e curiosos. Relacionamentos precisam de variedade.",
      "Câncer": "Você busca cuidado e conexão emocional profunda. Atrai parceiros nutritivos e protetores. Segurança emocional é fundamental.",
      "Leão": "Você atrai/busca parceiros carismáticos e generosos. Relacionamentos devem ter romance e admiração mútua. Cuidado com dinâmicas de ego.",
      "Virgem": "Você busca parceiros práticos e prestativos. Relacionamentos envolvem serviço mútuo. Cuidado com crítica excessiva ou perfeccionismo.",
      "Libra": "Posição natural - relacionamentos são centrais em sua vida. Você busca harmonia, beleza e igualdade nas parcerias. Forte necessidade de companhia.",
      "Escorpião": "Você atrai/busca conexões intensas e transformadoras. Relacionamentos são profundos com possíveis dinâmicas de poder. Transformação através do outro.",
      "Sagitário": "Você busca parceiros aventureiros e filosóficos. Relacionamentos devem expandir seus horizontes. Liberdade dentro do compromisso.",
      "Capricórnio": "Você atrai/busca parceiros maduros e responsáveis. Parcerias tendem a ser estruturadas e orientadas a objetivos. Compromisso sério.",
      "Aquário": "Você busca parceiros originais e independentes. Relacionamentos não-convencionais ou baseados em amizade. Liberdade e autenticidade.",
      "Peixes": "Você atrai/busca conexões espirituais e compassivas. Relacionamentos idealizados ou sacrificiais. Necessita limites saudáveis."
    }
  },
  {
    number: 8,
    name: "Casa 8",
    title: "A Casa da Transformação e Mistérios",
    keywords: ["Transformação", "Morte/Renascimento", "Sexualidade", "Recursos Compartilhados", "Ocultismo"],
    deepMeaning: `A Casa 8 é uma das mais profundas e misteriosas do zodíaco. Governa os processos de morte e renascimento - não necessariamente físicos, mas transformações psicológicas profundas. É aqui que você encontra poder através de crises e renovação.

Esta casa também governa sexualidade como união íntima, heranças, impostos, dívidas, e todos os recursos que compartilha com outros. Representa o oculto, tabus, e os aspectos da vida que a sociedade prefere não discutir.`,
    lifeAreas: [
      "Transformação profunda e crises",
      "Sexualidade e intimidade profunda",
      "Heranças, impostos e recursos compartilhados",
      "Morte, renascimento e regeneração",
      "Ocultismo, mistérios e psicologia profunda"
    ],
    questions: [
      "O que você precisa deixar morrer em sua vida?",
      "Como você lida com intimidade profunda?",
      "Quais transformações você está evitando?"
    ],
    shadowSide: "Pode manifestar-se como medo de vulnerabilidade, obsessão com controle, manipulação, ou resistência a mudanças necessárias.",
    growthPath: "Abraçar transformações como parte natural da vida, desenvolver intimidade autêntica, e encontrar poder pessoal através de crises superadas.",
    signInfluences: {
      "Áries": "Transformações tendem a ser rápidas e dramáticas. Você enfrenta crises com coragem. Pode haver impulsividade em questões financeiras compartilhadas.",
      "Touro": "Transformações são lentas mas profundas. Você pode resistir a mudanças necessárias. Questões de posse e segurança em recursos compartilhados.",
      "Gêmeos": "Transformações vêm através de informação e comunicação. Mente analítica para mistérios. Pode intelectualizar emoções profundas.",
      "Câncer": "Transformações profundamente emocionais. Questões familiares podem envolver heranças. Intimidade é emocional e protetora.",
      "Leão": "Transformações dramáticas que transformam sua identidade. Poder pessoal é tema central. Generosidade ou conflitos em recursos compartilhados.",
      "Virgem": "Transformações através de análise e purificação. Pode ser crítico com intimidade. Atenção meticulosa a finanças compartilhadas.",
      "Libra": "Transformações através de relacionamentos. Busca equilíbrio em recursos compartilhados. Pode evitar confrontar o lado sombrio.",
      "Escorpião": "Posição natural - intensidade transformadora máxima. Você não tem medo de profundidades. Poder pessoal através de regeneração.",
      "Sagitário": "Transformações através de filosofia e expansão de consciência. Interesse em mistérios espirituais. Pode ser otimista demais sobre riscos.",
      "Capricórnio": "Transformações estruturadas e controladas. Pode carregar peso de responsabilidades passadas. Estratégico com recursos compartilhados.",
      "Aquário": "Transformações súbitas e não-convencionais. Interesse em mistérios científicos ou humanitários. Pode intelectualizar intimidade.",
      "Peixes": "Transformações espirituais e transcendentes. Interesse em misticismo e além. Pode ter limites difusos em recursos compartilhados."
    }
  },
  {
    number: 9,
    name: "Casa 9",
    title: "A Casa da Expansão e Sabedoria",
    keywords: ["Filosofia", "Viagens", "Educação Superior", "Espiritualidade", "Publicação"],
    deepMeaning: `A Casa 9 expande seus horizontes além do familiar. Governa viagens longas (físicas e mentais), educação superior, filosofia, religião, e sua busca por significado. É onde você encontra sabedoria e desenvolve sua visão de mundo.

Esta casa também governa publicações, assuntos legais superiores, e culturas estrangeiras. Representa seu guru interior e sua capacidade de ver o quadro maior da existência.`,
    lifeAreas: [
      "Filosofia de vida e crenças",
      "Viagens longas e culturas estrangeiras",
      "Educação superior e estudos avançados",
      "Espiritualidade e religião",
      "Publicações e ensino superior"
    ],
    questions: [
      "Em que você acredita profundamente?",
      "O que expande seus horizontes?",
      "Qual é o significado maior da sua vida?"
    ],
    shadowSide: "Pode manifestar-se como dogmatismo, escapismo através de viagens ou filosofia, ou impor suas crenças aos outros.",
    growthPath: "Desenvolver uma filosofia de vida genuína e flexível, expandir horizontes através de experiências diversas, e compartilhar sabedoria com humildade.",
    signInfluences: {
      "Áries": "Você é um pioneiro em filosofia e exploração. Viagens aventureiras e independentes. Pode ser impaciente com sistemas filosóficos lentos.",
      "Touro": "Sua filosofia é prática e baseada em experiência. Viagens envolvem conforto e prazeres sensoriais. Abordagem estável das crenças.",
      "Gêmeos": "Você é um eterno estudante, curioso sobre todas as filosofias. Viagens para aprender. Pode ter dificuldade em se comprometer com uma visão.",
      "Câncer": "Sua espiritualidade é emocional e conectada a tradições familiares. Viagens para lugares de significado ancestral. Filosofia do coração.",
      "Leão": "Você tem uma filosofia generosa e dramática da vida. Viagens com estilo. Pode ensinar ou publicar com carisma.",
      "Virgem": "Você analisa filosofias com discernimento. Viagens práticas ou para aprender habilidades. Abordagem detalhada de estudos superiores.",
      "Libra": "Sua filosofia busca equilíbrio e justiça. Interesse em culturas artísticas. Viagens para lugares bonitos e harmoniosos.",
      "Escorpião": "Você busca verdades profundas e ocultas. Viagens transformadoras. Interesse em filosofias que exploram morte e renascimento.",
      "Sagitário": "Posição natural - amor por expansão, viagens, e sabedoria. Você é um filósofo e aventureiro nato. Grande sede de experiências.",
      "Capricórnio": "Sua filosofia é estruturada e orientada a conquistas. Viagens com propósito. Respeito por tradições e sabedoria ancestral.",
      "Aquário": "Filosofia progressista e humanitária. Interesse em culturas futuristas ou alternativas. Viagens para lugares não-convencionais.",
      "Peixes": "Sua espiritualidade é mística e compassiva. Viagens espirituais ou a lugares sagrados. Filosofia que abraça o mistério."
    }
  },
  {
    number: 10,
    name: "Casa 10",
    title: "A Casa da Carreira e Vocação - O Meio do Céu",
    keywords: ["Carreira", "Reputação", "Status", "Vocação", "Legado"],
    deepMeaning: `A Casa 10, cujo ponto inicial é o Meio do Céu (MC), é o ponto mais público do seu mapa. Representa sua carreira, reputação, status social, e como você é visto pelo mundo. É seu papel na sociedade e o legado que você deixa.

Também governa um dos pais (tradicionalmente a mãe ou a figura de autoridade), figuras de autoridade em geral, e sua relação com estruturas de poder. Mostra suas ambições mais elevadas e seu potencial de realização no mundo.`,
    lifeAreas: [
      "Carreira e vocação profissional",
      "Reputação e imagem pública",
      "Status social e conquistas",
      "Um dos pais ou figuras de autoridade",
      "Legado e contribuição ao mundo"
    ],
    questions: [
      "Qual é sua vocação verdadeira?",
      "Como você quer ser lembrado?",
      "Que contribuição você quer fazer ao mundo?"
    ],
    shadowSide: "Pode manifestar-se como obsessão com status, negligência da vida pessoal por carreira, ou medo de exposição pública.",
    growthPath: "Alinhar carreira com propósito autêntico, desenvolver reputação baseada em integridade, e equilibrar ambição com vida pessoal.",
    signInfluences: {
      "Áries": "Sua carreira envolve liderança e pioneirismo. Você é visto como dinâmico e independente. Pode iniciar novos campos ou empresas.",
      "Touro": "Sua carreira envolve construção estável de valor. Você é visto como confiável e persistente. Profissões relacionadas a beleza, finanças ou natureza.",
      "Gêmeos": "Sua carreira envolve comunicação e versatilidade. Você é visto como inteligente e adaptável. Pode ter múltiplas carreiras ou papéis.",
      "Câncer": "Sua carreira envolve cuidado e nutrição. Você é visto como acolhedor e protetivo. Profissões relacionadas a lar, família ou cuidado.",
      "Leão": "Sua carreira envolve criatividade e liderança visível. Você é visto como carismático e generoso. Profissões artísticas ou de entretenimento.",
      "Virgem": "Sua carreira envolve serviço e precisão. Você é visto como competente e detalhista. Profissões de saúde, análise ou organização.",
      "Libra": "Sua carreira envolve harmonia e parcerias. Você é visto como diplomático e justo. Profissões de arte, justiça ou mediação.",
      "Escorpião": "Sua carreira envolve transformação e profundidade. Você é visto como poderoso e perceptivo. Profissões de psicologia, investigação ou cura.",
      "Sagitário": "Sua carreira envolve expansão e sabedoria. Você é visto como otimista e visionário. Profissões de ensino, viagens ou publicação.",
      "Capricórnio": "Posição natural - ambição estruturada e realizações duradouras. Você é visto como responsável e autoritativo. Posições de liderança e gestão.",
      "Aquário": "Sua carreira envolve inovação e causas sociais. Você é visto como original e progressista. Profissões de tecnologia ou humanitarismo.",
      "Peixes": "Sua carreira envolve compaixão e criatividade. Você é visto como sensível e artístico. Profissões de arte, cura ou espiritualidade."
    }
  },
  {
    number: 11,
    name: "Casa 11",
    title: "A Casa das Amizades e Ideais",
    keywords: ["Amizades", "Grupos", "Esperanças", "Causas Sociais", "Futuro"],
    deepMeaning: `A Casa 11 governa suas conexões com a humanidade como um todo - amizades, grupos, organizações, e sua visão para o futuro. É onde seus sonhos e esperanças encontram apoio comunitário e onde você contribui para causas maiores que você.

Esta casa também representa tecnologia, inovação, e movimentos sociais. Mostra como você se relaciona com grupos, sua rede de contatos, e o tipo de futuro que você sonha criar.`,
    lifeAreas: [
      "Amizades e círculos sociais",
      "Grupos, clubes e organizações",
      "Esperanças, sonhos e aspirações",
      "Causas humanitárias e sociais",
      "Tecnologia e inovação"
    ],
    questions: [
      "Que tipo de amigos você atrai?",
      "Quais são seus sonhos para o futuro?",
      "A quais causas ou grupos você se sente chamado?"
    ],
    shadowSide: "Pode manifestar-se como conformismo ao grupo, perda de individualidade, idealismo impraticável, ou dificuldade com amizades íntimas.",
    growthPath: "Cultivar amizades autênticas, participar de causas alinhadas com seus valores, e manter sua individualidade dentro de grupos.",
    signInfluences: {
      "Áries": "Você lidera grupos e inicia movimentos. Amizades dinâmicas e independentes. Esperanças envolvem pioneirismo e ação.",
      "Touro": "Você valoriza amizades estáveis e duradouras. Grupos relacionados a arte ou natureza. Esperanças de segurança e conforto.",
      "Gêmeos": "Você tem uma rede social ampla e diversificada. Grupos intelectuais ou de comunicação. Amizades baseadas em troca de ideias.",
      "Câncer": "Você trata amigos como família. Grupos de apoio emocional. Esperanças envolvem segurança para todos.",
      "Leão": "Você é o centro de grupos sociais. Amizades generosas e divertidas. Esperanças de expressão criativa coletiva.",
      "Virgem": "Você serve em grupos com dedicação prática. Amizades úteis e funcionais. Esperanças de melhorar sistemas.",
      "Libra": "Você harmoniza grupos e cria conexões. Amizades equilibradas e justas. Esperanças de paz e beleza.",
      "Escorpião": "Você tem amizades profundas e intensas. Grupos de transformação. Esperanças de mudança radical.",
      "Sagitário": "Você expande através de grupos internacionais. Amizades filosóficas e aventureiras. Esperanças de liberdade universal.",
      "Capricórnio": "Você lidera grupos com responsabilidade. Amizades que apoiam ambições. Esperanças de conquista estruturada.",
      "Aquário": "Posição natural - você brilha em grupos e causas. Amizades não-convencionais. Esperanças de revolução social.",
      "Peixes": "Você se conecta espiritualmente com grupos. Amizades compassivas. Esperanças de transcendência coletiva."
    }
  },
  {
    number: 12,
    name: "Casa 12",
    title: "A Casa do Inconsciente e Transcendência",
    keywords: ["Inconsciente", "Espiritualidade", "Isolamento", "Karma", "Mistério"],
    deepMeaning: `A Casa 12 é a mais misteriosa e difícil de acessar conscientemente. Representa seu inconsciente, padrões kármicos, e tudo que está oculto - incluindo partes de você mesmo que você não reconhece. É simultaneamente uma casa de confinamento e de libertação espiritual.

Governa retiros, hospitais, prisões, solidão, e também meditação, sonhos, e conexão com o divino. É onde você dissolve o ego e encontra unidade com algo maior. Representa o fim de ciclos e a preparação para novos começos.`,
    lifeAreas: [
      "Inconsciente e padrões ocultos",
      "Espiritualidade e transcendência",
      "Solidão, retiros e isolamento",
      "Karma e vidas passadas",
      "Sonhos e imaginação"
    ],
    questions: [
      "Quais padrões inconscientes controlam sua vida?",
      "O que você precisa liberar?",
      "Como você se conecta com o transcendente?"
    ],
    shadowSide: "Pode manifestar-se como fuga da realidade, vitimização, auto-sabotagem, vícios, ou medo do desconhecido.",
    growthPath: "Desenvolver práticas contemplativas, enfrentar sombras com compaixão, e usar a solidão para crescimento espiritual ao invés de escape.",
    signInfluences: {
      "Áries": "Seu inconsciente é impulsivo e combativo. Pode haver raiva reprimida. Espiritualidade através de ação e coragem interior.",
      "Touro": "Seu inconsciente busca segurança. Pode haver apego a posses ou conforto. Espiritualidade através de conexão com natureza e corpo.",
      "Gêmeos": "Seu inconsciente é mental e disperso. Pode haver ansiedade não reconhecida. Espiritualidade através de estudos e meditação mental.",
      "Câncer": "Seu inconsciente é profundamente emocional. Pode haver feridas familiares ocultas. Espiritualidade através de cura emocional.",
      "Leão": "Seu inconsciente busca reconhecimento. Pode haver ego ferido não reconhecido. Espiritualidade através de expressão criativa sagrada.",
      "Virgem": "Seu inconsciente é crítico e ansioso. Pode haver perfeccionismo paralisante. Espiritualidade através de serviço silencioso.",
      "Libra": "Seu inconsciente busca harmonia. Pode haver dependência oculta de outros. Espiritualidade através de beleza e equilíbrio interior.",
      "Escorpião": "Seu inconsciente é profundo e poderoso. Pode haver medos intensos de transformação. Espiritualidade através de morte mística do ego.",
      "Sagitário": "Seu inconsciente busca significado. Pode haver fuga através de filosofias. Espiritualidade através de expansão da consciência.",
      "Capricórnio": "Seu inconsciente carrega responsabilidades. Pode haver medo de fracasso oculto. Espiritualidade através de disciplina contemplativa.",
      "Aquário": "Seu inconsciente é não-convencional. Pode haver alienação não reconhecida. Espiritualidade através de consciência cósmica.",
      "Peixes": "Posição natural - seu inconsciente é vasto e místico. Sensibilidade extrema ao invisível. Espiritualidade através de dissolução e compaixão."
    }
  }
];

export const getHouseInterpretation = (houseNumber: number): HouseInterpretation | undefined => {
  return houseInterpretations.find(h => h.number === houseNumber);
};

export const getSignInfluenceForHouse = (houseNumber: number, sign: string): string => {
  const house = getHouseInterpretation(houseNumber);
  if (!house) return "";
  return house.signInfluences[sign] || "";
};
