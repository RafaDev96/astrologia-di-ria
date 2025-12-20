// Deep interpretations for planets in signs and houses

export interface PlanetDeepInterpretation {
  id: string;
  name: string;
  symbol: string;
  archetype: string;
  governs: string[];
  bodyParts: string[];
  keywords: string[];
  deepMeaning: string;
  questions: string[];
  shadowSide: string;
  growthPath: string;
  signInterpretations: Record<string, SignInterpretation>;
}

export interface SignInterpretation {
  essence: string;
  strengths: string[];
  challenges: string[];
  deepInsight: string;
  lifeLesson: string;
}

export const planetDeepInterpretations: PlanetDeepInterpretation[] = [
  {
    id: 'sun',
    name: 'Sol',
    symbol: '☉',
    archetype: 'O Herói / O Rei',
    governs: ['Ego', 'Identidade central', 'Propósito de vida', 'Vitalidade', 'Força de vontade'],
    bodyParts: ['Coração', 'Coluna vertebral', 'Sistema circulatório'],
    keywords: ['Essência', 'Brilho', 'Consciência', 'Autoridade', 'Criatividade'],
    deepMeaning: `O Sol é o centro do seu ser astrológico, assim como é o centro do nosso sistema solar. Ele representa não quem você aparenta ser, mas quem você realmente É no nível mais profundo. É a sua luz interior, seu propósito de vida e a missão que sua alma escolheu para esta encarnação.

Quando você vive alinhado com seu Sol, sente-se vivo, criativo e cheio de propósito. Quando está desalinhado, pode sentir uma sensação de vazio ou falta de direção. O signo do seu Sol mostra COMO você brilha, e a casa mostra ONDE você é chamado a brilhar.

O Sol também representa figuras de autoridade na sua vida, especialmente o pai ou figura paterna, e sua relação com poder e liderança.`,
    questions: [
      'O que faz você se sentir verdadeiramente vivo?',
      'Qual é o legado que você deseja deixar no mundo?',
      'Em que momentos você se sente mais autêntico?',
      'Como você expressa sua individualidade?'
    ],
    shadowSide: 'Quando desequilibrado, o Sol pode manifestar arrogância, egocentrismo, necessidade excessiva de atenção e dificuldade em reconhecer as contribuições dos outros.',
    growthPath: 'Desenvolva sua identidade autêntica sem depender da validação externa. Aprenda a liderar com humildade e a inspirar outros através do exemplo.',
    signInterpretations: {
      'Áries': {
        essence: 'Você veio ao mundo para iniciar, liderar e abrir caminhos. Sua essência é a do pioneiro corajoso que não teme o desconhecido.',
        strengths: ['Coragem inata', 'Capacidade de iniciativa', 'Energia vital forte', 'Honestidade direta'],
        challenges: ['Impaciência', 'Tendência a começar e não terminar', 'Impulsividade nas decisões'],
        deepInsight: 'Sua alma escolheu Áries para aprender sobre coragem autêntica — não a ausência de medo, mas a ação apesar dele. Você é um farol de iniciativa que inspira outros a também ousarem.',
        lifeLesson: 'Aprender que verdadeira força inclui paciência, e que nem toda batalha precisa ser sua.'
      },
      'Touro': {
        essence: 'Você veio para construir, estabilizar e apreciar a beleza tangível da vida. Sua essência é a do construtor paciente que cria valor duradouro.',
        strengths: ['Determinação inabalável', 'Senso estético refinado', 'Confiabilidade', 'Conexão com o mundo material'],
        challenges: ['Resistência a mudanças', 'Possessividade', 'Teimosia excessiva'],
        deepInsight: 'Sua alma escolheu Touro para ensinar ao mundo o valor da persistência e da beleza simples. Você é um alquimista que transforma esforço consistente em resultados tangíveis.',
        lifeLesson: 'Aprender que segurança verdadeira vem de dentro, e que mudanças podem enriquecer ao invés de ameaçar.'
      },
      'Gêmeos': {
        essence: 'Você veio para conectar, comunicar e explorar a infinita variedade da experiência humana. Sua essência é a do mensageiro curioso que tece conexões.',
        strengths: ['Adaptabilidade', 'Inteligência versátil', 'Dom da comunicação', 'Eterna curiosidade'],
        challenges: ['Superficialidade', 'Dificuldade de foco', 'Nervosismo', 'Inconsistência'],
        deepInsight: 'Sua alma escolheu Gêmeos para ser uma ponte entre mundos, ideias e pessoas. Você é um tradutor cósmico que ajuda a humanidade a se entender.',
        lifeLesson: 'Aprender que profundidade e versatilidade podem coexistir, e que compromisso não significa prisão.'
      },
      'Câncer': {
        essence: 'Você veio para nutrir, proteger e criar santuários emocionais. Sua essência é a do guardião sensível que preserva o que é sagrado.',
        strengths: ['Intuição profunda', 'Capacidade de cuidar', 'Memória emocional', 'Sensibilidade empática'],
        challenges: ['Mudanças de humor', 'Tendência a se fechar', 'Apego ao passado', 'Hipersensibilidade'],
        deepInsight: 'Sua alma escolheu Câncer para ensinar ao mundo o poder do cuidado genuíno e da vulnerabilidade como força. Você é um guardião das emoções que cria espaços seguros para cura.',
        lifeLesson: 'Aprender que proteção saudável inclui permitir que outros cresçam, e que o passado nutre mas não deve aprisionar.'
      },
      'Leão': {
        essence: 'Você veio para brilhar, criar e inspirar através da expressão autêntica do seu coração. Sua essência é a do artista generoso que ilumina.',
        strengths: ['Generosidade natural', 'Criatividade vibrante', 'Carisma magnético', 'Lealdade profunda'],
        challenges: ['Necessidade de aplausos', 'Drama excessivo', 'Orgulho ferido', 'Dificuldade em ceder o centro'],
        deepInsight: 'Sua alma escolheu Leão para demonstrar que todos têm direito a brilhar. Você é um sol humano que aquece os corações ao redor quando vive com autenticidade.',
        lifeLesson: 'Aprender que sua luz não diminui ao celebrar a luz dos outros, e que vulnerabilidade é a maior coragem.'
      },
      'Virgem': {
        essence: 'Você veio para aperfeiçoar, servir e trazer ordem ao caos. Sua essência é a do curador meticuloso que busca a excelência.',
        strengths: ['Mente analítica', 'Dedicação ao serviço', 'Atenção aos detalhes', 'Praticidade eficiente'],
        challenges: ['Autocrítica severa', 'Perfeccionismo paralisante', 'Preocupação excessiva', 'Dificuldade em relaxar'],
        deepInsight: 'Sua alma escolheu Virgem para mostrar que o divino está nos detalhes e que serviço genuíno é uma forma de amor. Você é um alquimista do cotidiano.',
        lifeLesson: 'Aprender que imperfeição é humana e bela, e que você merece o mesmo cuidado que dá aos outros.'
      },
      'Libra': {
        essence: 'Você veio para harmonizar, equilibrar e criar beleza nas relações humanas. Sua essência é a do diplomata artístico que busca justiça.',
        strengths: ['Senso de justiça', 'Capacidade diplomática', 'Apreciação estética', 'Habilidade relacional'],
        challenges: ['Indecisão', 'Dependência de aprovação', 'Evitação de conflitos', 'Perda de identidade nas relações'],
        deepInsight: 'Sua alma escolheu Libra para ensinar que relacionamentos são espelhos para autoconhecimento e que harmonia verdadeira inclui tensão criativa.',
        lifeLesson: 'Aprender que seu valor existe independente dos outros, e que conflitos saudáveis fortalecem relações.'
      },
      'Escorpião': {
        essence: 'Você veio para transformar, mergulhar nas profundezas e renascer das cinzas. Sua essência é a do fênix que encontra poder na vulnerabilidade.',
        strengths: ['Intensidade magnética', 'Poder de transformação', 'Percepção profunda', 'Lealdade absoluta'],
        challenges: ['Tendência ao controle', 'Ciúmes', 'Dificuldade em deixar ir', 'Desconfiança'],
        deepInsight: 'Sua alma escolheu Escorpião para demonstrar que morte e renascimento são processos naturais da vida. Você é um xamã moderno que não teme as sombras.',
        lifeLesson: 'Aprender que vulnerabilidade é força, que perdão liberta primeiro a você, e que compartilhar poder multiplica poder.'
      },
      'Sagitário': {
        essence: 'Você veio para explorar, inspirar e expandir os horizontes da consciência humana. Sua essência é a do filósofo aventureiro que busca verdade.',
        strengths: ['Otimismo contagiante', 'Visão ampla', 'Sede de conhecimento', 'Generosidade de espírito'],
        challenges: ['Excesso de promessas', 'Falta de tato', 'Inquietação', 'Dogmatismo'],
        deepInsight: 'Sua alma escolheu Sagitário para ser um arqueiro cósmico que mira no impossível e inspira outros a sonharem maior.',
        lifeLesson: 'Aprender que a verdade é multifacetada, que compromisso pode ser libertador, e que o extraordinário existe no ordinário.'
      },
      'Capricórnio': {
        essence: 'Você veio para construir, liderar com integridade e deixar um legado duradouro. Sua essência é a do sábio estrategista que escala montanhas.',
        strengths: ['Disciplina inabalável', 'Visão de longo prazo', 'Responsabilidade', 'Ambição saudável'],
        challenges: ['Rigidez', 'Dificuldade com emoções', 'Workaholic', 'Pessimismo'],
        deepInsight: 'Sua alma escolheu Capricórnio para provar que sucesso autêntico é construído tijolo por tijolo e que autoridade verdadeira vem da competência.',
        lifeLesson: 'Aprender que descanso é produtivo, que vulnerabilidade não é fraqueza, e que o topo só vale a pena se a jornada tiver significado.'
      },
      'Aquário': {
        essence: 'Você veio para revolucionar, unir a humanidade e trazer o futuro para o presente. Sua essência é a do visionário rebelde que pensa coletivamente.',
        strengths: ['Originalidade', 'Visão humanitária', 'Pensamento inovador', 'Desapego saudável'],
        challenges: ['Frieza emocional', 'Excentricidade alienante', 'Teimosia ideológica', 'Dificuldade com intimidade'],
        deepInsight: 'Sua alma escolheu Aquário para ser um canal entre o futuro possível e o presente. Você é um agente de mudança que ajuda a humanidade a evoluir.',
        lifeLesson: 'Aprender que individualidade inclui conexão emocional, e que mudança gradual também é revolução.'
      },
      'Peixes': {
        essence: 'Você veio para transcender, curar e lembrar a humanidade de sua natureza espiritual. Sua essência é a do místico compassivo que dissolve fronteiras.',
        strengths: ['Compaixão infinita', 'Intuição aguçada', 'Criatividade transcendente', 'Conexão espiritual'],
        challenges: ['Escapismo', 'Falta de limites', 'Martírio', 'Confusão identitária'],
        deepInsight: 'Sua alma escolheu Peixes para ser um portal entre mundos visíveis e invisíveis. Você é um curador que lembra os outros de sua natureza divina.',
        lifeLesson: 'Aprender que limites são atos de amor próprio, que escapar da realidade não a transforma, e que você é tanto espírito quanto corpo.'
      }
    }
  },
  {
    id: 'moon',
    name: 'Lua',
    symbol: '☽',
    archetype: 'A Mãe / A Sacerdotisa',
    governs: ['Emoções', 'Instintos', 'Memória', 'Necessidades de segurança', 'Vida doméstica'],
    bodyParts: ['Estômago', 'Seios', 'Sistema linfático', 'Útero'],
    keywords: ['Sentimentos', 'Nutrição', 'Passado', 'Intuição', 'Conforto'],
    deepMeaning: `A Lua é sua paisagem emocional interior — o mundo privado que poucos veem. Enquanto o Sol é quem você conscientemente busca ser, a Lua é quem você É quando ninguém está olhando, nos momentos vulneráveis.

Ela representa suas necessidades emocionais mais profundas, como você foi nutrido na infância, e como você nutre a si mesmo e aos outros. A Lua também governa sua memória, seus hábitos automáticos e suas reações instintivas.

O signo da sua Lua mostra COMO você processa emoções, e a casa mostra ONDE você busca segurança emocional. Compreender sua Lua é essencial para autocuidado e relacionamentos saudáveis.`,
    questions: [
      'O que você precisa para se sentir emocionalmente seguro?',
      'Como você cuida de si mesmo em momentos difíceis?',
      'Quais memórias da infância ainda influenciam suas reações?',
      'O que faz você se sentir "em casa"?'
    ],
    shadowSide: 'Quando desequilibrada, a Lua pode manifestar dependência emocional, mudanças de humor extremas, apego excessivo ao passado e dificuldade em estabelecer limites.',
    growthPath: 'Honre suas necessidades emocionais sem ser controlado por elas. Aprenda a se nutrir de forma saudável e a criar segurança interna.',
    signInterpretations: {
      'Áries': {
        essence: 'Você precisa de ação e independência para se sentir emocionalmente seguro. Suas emoções são intensas, rápidas e diretas.',
        strengths: ['Coragem emocional', 'Recuperação rápida', 'Autenticidade nos sentimentos', 'Iniciativa em cuidar'],
        challenges: ['Impaciência com processos emocionais', 'Reações impulsivas', 'Dificuldade em ser vulnerável'],
        deepInsight: 'Sua alma precisa de movimento para processar emoções. Quando parado, você fica inquieto. Aprendeu cedo que ser forte era necessário.',
        lifeLesson: 'Descobrir que vulnerabilidade é a maior coragem, e que pausar para sentir não é fraqueza.'
      },
      'Touro': {
        essence: 'Você precisa de estabilidade, conforto físico e rotinas para se sentir emocionalmente seguro. Suas emoções são profundas e constantes.',
        strengths: ['Estabilidade emocional', 'Lealdade profunda', 'Capacidade de criar conforto', 'Presença reconfortante'],
        challenges: ['Resistência a mudanças emocionais', 'Possessividade afetiva', 'Teimosia nos sentimentos'],
        deepInsight: 'Você encontra paz no tangível — um abraço, uma refeição, um lugar conhecido. Sua segurança emocional está ligada ao mundo material.',
        lifeLesson: 'Aprender que mudanças emocionais são naturais, e que segurança verdadeira existe dentro de você, não nas coisas.'
      },
      'Gêmeos': {
        essence: 'Você precisa de estímulo mental e comunicação para processar emoções. Suas emoções são curiosas e precisam ser verbalizadas.',
        strengths: ['Capacidade de articular sentimentos', 'Adaptabilidade emocional', 'Leveza com emoções pesadas', 'Interesse genuíno pelos outros'],
        challenges: ['Racionalização excessiva', 'Superficialidade emocional', 'Nervosismo', 'Dispersão afetiva'],
        deepInsight: 'Para você, falar sobre emoções É processá-las. O silêncio emocional é desconfortável. Você precisa de movimento mental para paz.',
        lifeLesson: 'Aprender que algumas emoções precisam ser sentidas, não apenas entendidas, e que profundidade não significa peso.'
      },
      'Câncer': {
        essence: 'A Lua está em casa em Câncer. Você tem profunda sensibilidade emocional e forte conexão com família e passado.',
        strengths: ['Intuição poderosa', 'Capacidade de nutrir', 'Memória emocional rica', 'Empatia natural'],
        challenges: ['Mudanças de humor', 'Apego excessivo', 'Dificuldade em deixar o passado', 'Hipersensibilidade'],
        deepInsight: 'Você sente as emoções dos outros como se fossem suas. Seu lar é seu santuário sagrado. As memórias são vivas para você.',
        lifeLesson: 'Aprender a se proteger sem se isolar, e que nutrir os outros não deve esgotar você.'
      },
      'Leão': {
        essence: 'Você precisa de reconhecimento e expressão criativa para se sentir emocionalmente realizado. Suas emoções são dramáticas e generosas.',
        strengths: ['Generosidade emocional', 'Calor humano', 'Lealdade apaixonada', 'Capacidade de celebrar'],
        challenges: ['Necessidade de validação', 'Drama emocional', 'Orgulho ferido', 'Dificuldade com rejeição'],
        deepInsight: 'Seu coração é grande e precisa de espaço para brilhar. Você ama com intensidade e espera ser amado da mesma forma.',
        lifeLesson: 'Aprender que seu valor existe independente de aplausos, e que vulnerabilidade é a maior expressão de coragem.'
      },
      'Virgem': {
        essence: 'Você processa emoções através da análise e do serviço prático. Suas emoções são contidas mas profundamente cuidadosas.',
        strengths: ['Cuidado prático', 'Análise emocional', 'Serviço amoroso', 'Atenção aos detalhes do outro'],
        challenges: ['Autocrítica emocional', 'Dificuldade em expressar necessidades', 'Preocupação excessiva', 'Perfeccionismo afetivo'],
        deepInsight: 'Você mostra amor através de atos de serviço. Quando ansioso, você organiza. Precisa se sentir útil para se sentir amado.',
        lifeLesson: 'Aprender que você merece cuidado tanto quanto dá, e que imperfeição emocional é humana e bela.'
      },
      'Libra': {
        essence: 'Você precisa de harmonia relacional e beleza para se sentir emocionalmente equilibrado. Suas emoções buscam equilíbrio.',
        strengths: ['Diplomacia emocional', 'Capacidade de ver todos os lados', 'Busca de harmonia', 'Gentileza natural'],
        challenges: ['Evitação de conflitos', 'Dependência emocional', 'Indecisão afetiva', 'Perda de si nos relacionamentos'],
        deepInsight: 'Você se conhece através do espelho do outro. A solidão emocional é profundamente desconfortável para você.',
        lifeLesson: 'Aprender que você existe completamente sozinho, e que conflitos saudáveis podem fortalecer relacionamentos.'
      },
      'Escorpião': {
        essence: 'Você sente profundamente e intensamente. Suas emoções são transformadoras, às vezes avassaladoras, sempre poderosas.',
        strengths: ['Profundidade emocional', 'Lealdade absoluta', 'Capacidade de transformação', 'Intuição penetrante'],
        challenges: ['Intensidade esmagadora', 'Ciúmes', 'Dificuldade em perdoar', 'Tendência ao controle'],
        deepInsight: 'Você não conhece emoções superficiais. Tudo é intenso, tudo importa profundamente. Você tem poder de cura emocional.',
        lifeLesson: 'Aprender que vulnerabilidade é poder, que perdão liberta você, e que nem toda emoção precisa ser agida.'
      },
      'Sagitário': {
        essence: 'Você precisa de liberdade, aventura e significado para se sentir emocionalmente vivo. Suas emoções são otimistas e expansivas.',
        strengths: ['Otimismo resiliente', 'Generosidade emocional', 'Capacidade de encontrar significado', 'Humor curativo'],
        challenges: ['Evitação de emoções difíceis', 'Inquietação emocional', 'Compromisso relutante', 'Exagero emocional'],
        deepInsight: 'Você precisa sentir que está indo a algum lugar emocionalmente. Estagnação é seu maior medo emocional.',
        lifeLesson: 'Aprender que emoções difíceis também são mestres, e que compromisso pode ser uma aventura.'
      },
      'Capricórnio': {
        essence: 'Você processa emoções de forma controlada e estruturada. Suas emoções são profundas mas raramente expressas.',
        strengths: ['Maturidade emocional', 'Responsabilidade afetiva', 'Lealdade duradoura', 'Força em crises'],
        challenges: ['Repressão emocional', 'Dificuldade em pedir ajuda', 'Frieza aparente', 'Medo de vulnerabilidade'],
        deepInsight: 'Você aprendeu cedo a ser forte. Suas emoções são como montanhas — profundas, sólidas, mas nem sempre visíveis na superfície.',
        lifeLesson: 'Aprender que vulnerabilidade é força, que pedir ajuda é sabedoria, e que você merece carinho tanto quanto respeito.'
      },
      'Aquário': {
        essence: 'Você processa emoções de forma racional e desapegada. Suas emoções precisam de espaço e originalidade.',
        strengths: ['Perspectiva única', 'Desapego saudável', 'Amizade profunda', 'Aceitação das diferenças'],
        challenges: ['Frieza emocional', 'Dificuldade com intimidade', 'Intelectualização dos sentimentos', 'Desconexão'],
        deepInsight: 'Você ama a humanidade às vezes mais facilmente que indivíduos. Precisa de liberdade mesmo em intimidade.',
        lifeLesson: 'Aprender que emoções não são inimigas da razão, e que intimidade profunda não ameaça sua individualidade.'
      },
      'Peixes': {
        essence: 'Você é uma esponja emocional que sente tudo profundamente. Suas emoções são fluidas, compassivas e às vezes avassaladoras.',
        strengths: ['Compaixão infinita', 'Intuição aguçada', 'Criatividade emocional', 'Capacidade de cura'],
        challenges: ['Falta de limites', 'Absorção de emoções alheias', 'Escapismo', 'Martírio'],
        deepInsight: 'Você sente a dor do mundo. Às vezes não sabe onde você termina e o outro começa. Sua sensibilidade é um dom e um desafio.',
        lifeLesson: 'Aprender que limites são atos de amor próprio, e que você pode ser compassivo sem se perder.'
      }
    }
  },
  {
    id: 'mercury',
    name: 'Mercúrio',
    symbol: '☿',
    archetype: 'O Mensageiro / O Comerciante',
    governs: ['Comunicação', 'Pensamento', 'Aprendizado', 'Viagens curtas', 'Irmãos'],
    bodyParts: ['Sistema nervoso', 'Mãos', 'Pulmões', 'Intestinos'],
    keywords: ['Intelecto', 'Linguagem', 'Conexões', 'Análise', 'Curiosidade'],
    deepMeaning: `Mercúrio é o planeta que governa como você pensa, comunica e processa informações. É a ponte entre sua mente interna e o mundo externo, o tradutor de suas ideias em palavras e ações.

Este planeta mostra seu estilo de aprendizado, como você toma decisões, e como se expressa verbalmente e por escrito. Mercúrio também governa viagens curtas, irmãos e vizinhos — as conexões do dia a dia.

O signo do seu Mercúrio revela COMO você pensa e comunica, enquanto a casa mostra ONDE você aplica mais sua mente e habilidades comunicativas.`,
    questions: [
      'Como você aprende melhor?',
      'Qual é seu estilo natural de comunicação?',
      'O que sua mente curiosa quer explorar?',
      'Como você processa e toma decisões?'
    ],
    shadowSide: 'Quando desequilibrado, Mercúrio pode manifestar ansiedade mental, fofoca, desonestidade, superficialidade e dificuldade de concentração.',
    growthPath: 'Desenvolva comunicação consciente e escuta ativa. Use sua mente como ferramenta de conexão, não de separação.',
    signInterpretations: {
      'Áries': {
        essence: 'Sua mente é rápida, direta e competitiva. Você pensa em termos de ação e toma decisões rapidamente.',
        strengths: ['Pensamento rápido', 'Comunicação assertiva', 'Pioneirismo mental', 'Coragem intelectual'],
        challenges: ['Interromper os outros', 'Impaciência com detalhes', 'Decisões impulsivas'],
        deepInsight: 'Sua mente é uma flecha — rápida e direcionada. Você prefere fazer a falar sobre fazer.',
        lifeLesson: 'Aprender que ouvir é tão importante quanto falar, e que algumas decisões merecem tempo.'
      },
      'Touro': {
        essence: 'Sua mente é prática, deliberada e sensata. Você pensa devagar mas com profundidade e bom senso.',
        strengths: ['Pensamento prático', 'Memória excelente', 'Comunicação confiável', 'Aprendizado através da experiência'],
        challenges: ['Lentidão para mudar de ideia', 'Teimosia mental', 'Resistência a novas ideias'],
        deepInsight: 'Sua mente mastiga as ideias lentamente, mas quando as absorve, elas ficam para sempre.',
        lifeLesson: 'Aprender que flexibilidade mental não significa fraqueza, e que novas ideias podem enriquecer.'
      },
      'Gêmeos': {
        essence: 'Mercúrio está em casa em Gêmeos. Sua mente é ágil, curiosa e infinitamente versátil.',
        strengths: ['Versatilidade mental', 'Habilidade comunicativa', 'Aprendizado rápido', 'Conexões criativas'],
        challenges: ['Superficialidade', 'Nervosismo mental', 'Dificuldade de foco', 'Falar demais'],
        deepInsight: 'Sua mente é como uma borboleta — móvel, curiosa, tocando muitas flores. O mundo das ideias é seu playground.',
        lifeLesson: 'Aprender que profundidade pode coexistir com variedade, e que foco pode amplificar seu brilho.'
      },
      'Câncer': {
        essence: 'Sua mente é intuitiva, emocional e memorável. Você pensa através dos sentimentos e lembranças.',
        strengths: ['Memória emocional', 'Intuição mental', 'Comunicação empática', 'Aprendizado através de conexão'],
        challenges: ['Pensamento influenciado por humor', 'Dificuldade com objetividade', 'Apego a velhas ideias'],
        deepInsight: 'Você não apenas pensa — você sente seus pensamentos. Suas ideias estão entrelaçadas com memórias e emoções.',
        lifeLesson: 'Aprender que objetividade e empatia podem trabalhar juntas, e que nem toda memória é verdade.'
      },
      'Leão': {
        essence: 'Sua mente é criativa, dramática e expressiva. Você pensa em termos grandiosos e comunica com flair.',
        strengths: ['Expressão criativa', 'Comunicação carismática', 'Pensamento visionário', 'Apresentações naturais'],
        challenges: ['Orgulho intelectual', 'Resistência a críticas', 'Exagero', 'Necessidade de aplausos mentais'],
        deepInsight: 'Suas ideias não são apenas pensamentos — são performances. Você pensa com o coração e comunica com drama.',
        lifeLesson: 'Aprender que suas ideias têm valor mesmo sem aplausos, e que escutar também é uma forma de brilhar.'
      },
      'Virgem': {
        essence: 'Mercúrio está exaltado em Virgem. Sua mente é analítica, detalhista e orientada ao serviço.',
        strengths: ['Análise precisa', 'Atenção aos detalhes', 'Pensamento prático', 'Comunicação clara'],
        challenges: ['Autocrítica mental', 'Perfeccionismo paralisante', 'Preocupação excessiva', 'Foco em falhas'],
        deepInsight: 'Sua mente é um scanner de alta precisão — você vê o que outros perdem. Isso é dom e desafio.',
        lifeLesson: 'Aprender que imperfeição é humana, e que sua mente pode analisar belezas tão bem quanto falhas.'
      },
      'Libra': {
        essence: 'Sua mente busca equilíbrio, harmonia e múltiplas perspectivas. Você pensa em termos relacionais.',
        strengths: ['Pensamento equilibrado', 'Diplomacia verbal', 'Capacidade de ver todos os lados', 'Comunicação elegante'],
        challenges: ['Indecisão', 'Dificuldade com posições firmes', 'Dependência de opiniões alheias'],
        deepInsight: 'Sua mente é uma balança — sempre pesando opções, buscando justiça. Você pensa melhor em diálogo.',
        lifeLesson: 'Aprender que tomar posição não significa injustiça, e que sua opinião também importa.'
      },
      'Escorpião': {
        essence: 'Sua mente é investigativa, profunda e penetrante. Você pensa abaixo da superfície.',
        strengths: ['Percepção profunda', 'Pesquisa intensiva', 'Comunicação poderosa', 'Capacidade de guardar segredos'],
        challenges: ['Desconfiança', 'Obsessão mental', 'Manipulação verbal', 'Pensamentos sombrios'],
        deepInsight: 'Sua mente é um detetive — você vê o que está escondido, sente mentiras, busca verdades incômodas.',
        lifeLesson: 'Aprender que nem tudo esconde algo, e que compartilhar vulnerabilidade pode construir confiança.'
      },
      'Sagitário': {
        essence: 'Sua mente é expansiva, filosófica e orientada ao significado. Você pensa em grande escala.',
        strengths: ['Visão ampla', 'Pensamento filosófico', 'Comunicação inspiradora', 'Aprendizado através de viagens'],
        challenges: ['Falta de atenção aos detalhes', 'Promessas exageradas', 'Dogmatismo', 'Falta de tato'],
        deepInsight: 'Sua mente quer entender o porquê por trás de tudo. Detalhes são menos interessantes que o quadro geral.',
        lifeLesson: 'Aprender que detalhes também têm sabedoria, e que verdade pode ser múltipla.'
      },
      'Capricórnio': {
        essence: 'Sua mente é estruturada, estratégica e orientada a resultados. Você pensa de forma prática e ambiciosa.',
        strengths: ['Pensamento estratégico', 'Planejamento de longo prazo', 'Comunicação séria', 'Foco em resultados'],
        challenges: ['Rigidez mental', 'Pessimismo', 'Dificuldade com leveza', 'Frieza na comunicação'],
        deepInsight: 'Sua mente constrói escadas para o topo. Você pensa em termos de utilidade, durabilidade e legado.',
        lifeLesson: 'Aprender que nem todo pensamento precisa ter utilidade, e que leveza também tem valor.'
      },
      'Aquário': {
        essence: 'Sua mente é inovadora, original e orientada ao futuro. Você pensa fora da caixa naturalmente.',
        strengths: ['Originalidade', 'Pensamento progressista', 'Visão humanitária', 'Comunicação única'],
        challenges: ['Excentricidade alienante', 'Teimosia ideológica', 'Frieza mental', 'Dificuldade com tradição'],
        deepInsight: 'Sua mente vive no futuro. Você vê possibilidades que outros ainda não conseguem imaginar.',
        lifeLesson: 'Aprender que tradição também tem sabedoria, e que conexão emocional enriquece ideias.'
      },
      'Peixes': {
        essence: 'Sua mente é intuitiva, imaginativa e porosa. Você pensa em imagens, símbolos e sentimentos.',
        strengths: ['Intuição mental', 'Criatividade', 'Empatia comunicativa', 'Pensamento simbólico'],
        challenges: ['Confusão mental', 'Dificuldade com lógica', 'Dispersão', 'Ilusões'],
        deepInsight: 'Sua mente não opera em linhas retas — ela flui como água, absorvendo impressões, criando conexões mágicas.',
        lifeLesson: 'Aprender que estrutura pode apoiar criatividade, e que nem toda impressão é verdade.'
      }
    }
  }
];

// Get deep interpretation for a planet in a specific sign
export function getPlanetDeepInterpretation(planetId: string, sign: string): SignInterpretation | null {
  const planet = planetDeepInterpretations.find(p => p.id === planetId);
  if (!planet) return null;
  return planet.signInterpretations[sign] || null;
}

// Get planet data by id
export function getPlanetData(planetId: string): PlanetDeepInterpretation | undefined {
  return planetDeepInterpretations.find(p => p.id === planetId);
}
