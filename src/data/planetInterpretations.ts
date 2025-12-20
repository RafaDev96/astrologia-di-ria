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
  },
  {
    id: 'venus',
    name: 'Vênus',
    symbol: '♀',
    archetype: 'A Amante / A Artista',
    governs: ['Amor', 'Beleza', 'Valores', 'Prazer', 'Relacionamentos'],
    bodyParts: ['Rins', 'Garganta', 'Pele', 'Sistema venoso'],
    keywords: ['Atração', 'Harmonia', 'Estética', 'Afeto', 'Valores'],
    deepMeaning: `Vênus é a deusa do amor e da beleza em seu mapa. Ela governa o que você considera bonito, valioso e digno de amor — incluindo você mesmo. É através de Vênus que você atrai e é atraído, que você dá e recebe afeto.

Este planeta revela seu estilo de amar, o que você valoriza em relacionamentos, e como você expressa carinho. Vênus também governa sua relação com dinheiro e posses, pois mostra o que você considera valioso.

O signo de Vênus mostra COMO você ama e o que acha bonito. A casa mostra ONDE você busca prazer, harmonia e conexão amorosa.`,
    questions: [
      'O que faz você se sentir amado e valorizado?',
      'Qual é seu estilo natural de demonstrar afeto?',
      'O que você considera verdadeiramente belo?',
      'Como você se relaciona com prazer e abundância?'
    ],
    shadowSide: 'Quando desequilibrada, Vênus pode manifestar vaidade, superficialidade, dependência emocional, materialismo excessivo ou dificuldade em estar só.',
    growthPath: 'Desenvolva amor-próprio genuíno como base para todos os relacionamentos. Aprenda a valorizar substância tanto quanto forma.',
    signInterpretations: {
      'Áries': {
        essence: 'Você ama com paixão e intensidade, preferindo conquistar a ser conquistado. Seu amor é direto, honesto e cheio de energia.',
        strengths: ['Paixão ardente', 'Iniciativa romântica', 'Honestidade afetiva', 'Entusiasmo contagiante'],
        challenges: ['Impaciência em relacionamentos', 'Competitividade amorosa', 'Dificuldade com rotina afetiva'],
        deepInsight: 'Para você, amar é uma aventura. Você precisa de faísca, desafio e conquista constante para manter o interesse.',
        lifeLesson: 'Aprender que amor duradouro requer paciência, e que vulnerabilidade é mais corajosa que conquista.'
      },
      'Touro': {
        essence: 'Vênus está em casa em Touro. Você ama com sensualidade, lealdade e profunda apreciação pelos prazeres da vida.',
        strengths: ['Sensualidade refinada', 'Lealdade inabalável', 'Apreciação estética', 'Presença reconfortante'],
        challenges: ['Possessividade', 'Resistência a mudanças', 'Materialismo afetivo', 'Teimosia em relacionamentos'],
        deepInsight: 'Você ama com todos os sentidos — toque, sabor, beleza. Segurança e conforto são a linguagem do seu amor.',
        lifeLesson: 'Aprender que amor verdadeiro não pode ser possuído, e que mudanças podem enriquecer relacionamentos.'
      },
      'Gêmeos': {
        essence: 'Você ama através da mente, da comunicação e da curiosidade. Conversa é seu afrodisíaco.',
        strengths: ['Charme comunicativo', 'Versatilidade afetiva', 'Leveza nos relacionamentos', 'Interesse genuíno pelo outro'],
        challenges: ['Superficialidade emocional', 'Dificuldade de compromisso', 'Flerte excessivo', 'Distração afetiva'],
        deepInsight: 'Para você, uma boa conversa é tão íntima quanto um beijo. Você precisa de estímulo mental para manter a chama acesa.',
        lifeLesson: 'Aprender que profundidade emocional não significa peso, e que compromisso pode ser uma aventura.'
      },
      'Câncer': {
        essence: 'Você ama cuidando, protegendo e criando um ninho de segurança emocional. Seu amor é maternal e profundo.',
        strengths: ['Cuidado genuíno', 'Intuição afetiva', 'Lealdade familiar', 'Criação de lar amoroso'],
        challenges: ['Apego excessivo', 'Mudanças de humor afetivo', 'Carência emocional', 'Dificuldade em deixar ir'],
        deepInsight: 'Amar para você é cuidar e proteger. Você quer criar um santuário emocional para quem ama.',
        lifeLesson: 'Aprender que cuidar demais pode sufocar, e que deixar ir também é uma forma de amor.'
      },
      'Leão': {
        essence: 'Você ama com generosidade, drama e desejo de celebração. Seu amor quer brilhar e ser visto.',
        strengths: ['Generosidade afetiva', 'Lealdade apaixonada', 'Romance grandioso', 'Calor humano irresistível'],
        challenges: ['Necessidade de admiração', 'Drama em relacionamentos', 'Orgulho ferido', 'Dificuldade em ceder'],
        deepInsight: 'Quando você ama, quer que o mundo inteiro saiba. Seu coração é um palco, e o amor é sua performance mais sincera.',
        lifeLesson: 'Aprender que amor verdadeiro existe mesmo sem plateia, e que receber é tão importante quanto dar.'
      },
      'Virgem': {
        essence: 'Você ama através de atos de serviço, cuidado prático e atenção aos detalhes. Seu amor é devotado.',
        strengths: ['Cuidado prático', 'Lealdade devotada', 'Atenção aos detalhes do outro', 'Amor através do serviço'],
        challenges: ['Crítica excessiva', 'Perfeccionismo afetivo', 'Dificuldade em expressar sentimentos', 'Autocrítica'],
        deepInsight: 'Você mostra amor fazendo — consertando, organizando, cuidando. Seus atos de serviço são declarações de amor.',
        lifeLesson: 'Aprender que você merece amor imperfeito, e que expressar sentimentos verbalmente também é importante.'
      },
      'Libra': {
        essence: 'Vênus está em casa em Libra. Você ama com elegância, busca de equilíbrio e profundo desejo de parceria.',
        strengths: ['Diplomacia afetiva', 'Charme natural', 'Senso de justiça relacional', 'Criação de harmonia'],
        challenges: ['Dependência de relacionamentos', 'Indecisão amorosa', 'Evitação de conflitos', 'Perda de identidade'],
        deepInsight: 'Você se conhece através do espelho do relacionamento. Parceria é essencial para seu senso de completude.',
        lifeLesson: 'Aprender que você é completo sozinho, e que conflitos saudáveis fortalecem relacionamentos.'
      },
      'Escorpião': {
        essence: 'Você ama com intensidade transformadora, profundidade emocional e desejo de fusão total.',
        strengths: ['Intensidade magnética', 'Lealdade absoluta', 'Profundidade emocional', 'Capacidade de transformar através do amor'],
        challenges: ['Ciúmes', 'Possessividade', 'Tendência ao controle', 'Dificuldade em confiar'],
        deepInsight: 'Quando você ama, você quer tudo — corpo, alma, segredos. Meio-termo não existe em seu vocabulário afetivo.',
        lifeLesson: 'Aprender que amor verdadeiro não requer posse, e que vulnerabilidade é mais poderosa que controle.'
      },
      'Sagitário': {
        essence: 'Você ama com liberdade, aventura e busca de significado compartilhado. Seu amor quer crescer.',
        strengths: ['Generosidade afetiva', 'Otimismo nos relacionamentos', 'Honestidade', 'Busca de crescimento mútuo'],
        challenges: ['Medo de compromisso', 'Falta de tato', 'Inquietação afetiva', 'Promessas exageradas'],
        deepInsight: 'Para você, amor sem liberdade não é amor. Você precisa de espaço para crescer, mesmo em intimidade.',
        lifeLesson: 'Aprender que compromisso pode ser libertador, e que profundidade emocional não limita aventura.'
      },
      'Capricórnio': {
        essence: 'Você ama com seriedade, compromisso de longo prazo e desejo de construir algo duradouro.',
        strengths: ['Lealdade duradoura', 'Responsabilidade afetiva', 'Amor que amadurece', 'Compromisso sólido'],
        challenges: ['Frieza aparente', 'Dificuldade com demonstrações públicas', 'Priorização excessiva de trabalho', 'Medo de vulnerabilidade'],
        deepInsight: 'Você não ama facilmente, mas quando ama, é para sempre. Seu amor é um investimento de longo prazo.',
        lifeLesson: 'Aprender que vulnerabilidade não é fraqueza, e que prazer também merece espaço na vida.'
      },
      'Aquário': {
        essence: 'Você ama com amizade, originalidade e respeito pela individualidade de cada um.',
        strengths: ['Amizade profunda', 'Respeito à liberdade', 'Amor não-possessivo', 'Aceitação das diferenças'],
        challenges: ['Frieza emocional', 'Dificuldade com intimidade tradicional', 'Distanciamento', 'Intelectualização do amor'],
        deepInsight: 'Para você, o melhor amante é primeiro o melhor amigo. Você precisa de liberdade mesmo em intimidade.',
        lifeLesson: 'Aprender que intimidade emocional profunda não ameaça sua individualidade.'
      },
      'Peixes': {
        essence: 'Você ama com compaixão infinita, romantismo transcendente e desejo de fusão espiritual.',
        strengths: ['Compaixão sem limites', 'Romantismo profundo', 'Sacrifício amoroso', 'Conexão espiritual'],
        challenges: ['Idealização excessiva', 'Martírio', 'Falta de limites', 'Ilusões sobre o outro'],
        deepInsight: 'Seu amor quer dissolver fronteiras e se fundir com o outro. Você ama o potencial tanto quanto a realidade.',
        lifeLesson: 'Aprender que amor saudável inclui limites, e que você não pode salvar ninguém do seu próprio caminho.'
      }
    }
  },
  {
    id: 'mars',
    name: 'Marte',
    symbol: '♂',
    archetype: 'O Guerreiro / O Conquistador',
    governs: ['Ação', 'Desejo', 'Energia', 'Sexualidade', 'Assertividade'],
    bodyParts: ['Músculos', 'Sangue', 'Glândulas suprarrenais', 'Cabeça'],
    keywords: ['Força', 'Coragem', 'Competição', 'Iniciativa', 'Paixão'],
    deepMeaning: `Marte é seu guerreiro interior — a energia que o impulsiona a agir, lutar e conquistar. É através de Marte que você persegue o que deseja, defende o que acredita e enfrenta obstáculos.

Este planeta governa sua energia física, sua sexualidade ativa, sua raiva e como você lida com conflitos. Marte mostra como você compete, como reage sob pressão e o que inflama sua paixão.

O signo de Marte revela COMO você age e luta. A casa mostra ONDE você investe mais energia e onde busca conquistas.`,
    questions: [
      'Como você reage quando está com raiva?',
      'O que inflama sua paixão e motivação?',
      'Como você lida com competição e conflito?',
      'De que forma você persegue seus desejos?'
    ],
    shadowSide: 'Quando desequilibrado, Marte pode manifestar agressividade destrutiva, impulsividade perigosa, violência, impaciência crônica ou passividade excessiva.',
    growthPath: 'Desenvolva assertividade saudável que honra seus desejos sem ferir outros. Aprenda a canalizar sua energia de forma construtiva.',
    signInterpretations: {
      'Áries': {
        essence: 'Marte está em casa em Áries. Sua energia é direta, corajosa e competitiva. Você age primeiro, pensa depois.',
        strengths: ['Coragem inabalável', 'Iniciativa rápida', 'Energia abundante', 'Honestidade na ação'],
        challenges: ['Impulsividade', 'Agressividade', 'Impaciência', 'Conflitos desnecessários'],
        deepInsight: 'Você é um guerreiro nato. A ação é seu estado natural, e a hesitação é seu maior desconforto.',
        lifeLesson: 'Aprender que pausa estratégica é sabedoria, não covardia, e que nem toda batalha merece sua energia.'
      },
      'Touro': {
        essence: 'Sua energia é persistente, determinada e focada em resultados tangíveis. Você é lento para iniciar, impossível de parar.',
        strengths: ['Determinação inabalável', 'Energia consistente', 'Paciência estratégica', 'Força física'],
        challenges: ['Lentidão para agir', 'Teimosia', 'Resistência à mudança', 'Raiva acumulada'],
        deepInsight: 'Você não corre — você marcha. Sua força está na constância, não na velocidade.',
        lifeLesson: 'Aprender que flexibilidade não é fraqueza, e que às vezes mudar de direção é mais sábio que persistir.'
      },
      'Gêmeos': {
        essence: 'Sua energia é mental, versátil e estratégica. Você prefere usar palavras e inteligência a força bruta.',
        strengths: ['Estratégia mental', 'Versatilidade de ação', 'Comunicação assertiva', 'Rapidez de reação'],
        challenges: ['Dispersão de energia', 'Nervosismo', 'Falta de persistência', 'Ações superficiais'],
        deepInsight: 'Sua caneta (ou teclado) é mais poderosa que qualquer espada. Você luta com ideias e palavras.',
        lifeLesson: 'Aprender que algumas batalhas requerem persistência, não apenas inteligência.'
      },
      'Câncer': {
        essence: 'Sua energia é defensiva, protetora e emocionalmente motivada. Você luta para proteger quem ama.',
        strengths: ['Proteção feroz', 'Intuição tática', 'Tenacidade emocional', 'Força para defender outros'],
        challenges: ['Reatividade emocional', 'Passivo-agressividade', 'Manipulação', 'Ações guiadas por humor'],
        deepInsight: 'Você é uma mãe urso cósmica — gentil com os seus, feroz com quem ameaça seu ninho.',
        lifeLesson: 'Aprender a agir proativamente, não apenas reativamente, e a expressar raiva diretamente.'
      },
      'Leão': {
        essence: 'Sua energia é dramática, criativa e orientada a brilhar. Você age para ser visto e admirado.',
        strengths: ['Coragem carismática', 'Liderança natural', 'Generosidade na ação', 'Energia criativa'],
        challenges: ['Orgulho excessivo', 'Necessidade de plateia', 'Drama desnecessário', 'Dificuldade em ser coadjuvante'],
        deepInsight: 'Você não apenas age — você performa. Cada ação é uma expressão do seu coração criativo.',
        lifeLesson: 'Aprender que algumas vitórias são privadas, e que humildade amplifica verdadeira grandeza.'
      },
      'Virgem': {
        essence: 'Sua energia é precisa, analítica e orientada ao serviço. Você age de forma metódica e eficiente.',
        strengths: ['Precisão nas ações', 'Eficiência', 'Trabalho duro', 'Atenção aos detalhes'],
        challenges: ['Perfeccionismo paralisante', 'Autocrítica severa', 'Ansiedade', 'Foco excessivo em falhas'],
        deepInsight: 'Você é um cirurgião cósmico — sua energia corta com precisão, não com força bruta.',
        lifeLesson: 'Aprender que ação imperfeita é melhor que paralisia perfeita, e que você merece gentileza.'
      },
      'Libra': {
        essence: 'Marte está em queda em Libra. Sua energia busca equilíbrio e justiça, mas pode hesitar em conflitos.',
        strengths: ['Diplomacia assertiva', 'Luta por justiça', 'Ação harmoniosa', 'Parceria na ação'],
        challenges: ['Indecisão', 'Evitação de conflito', 'Dependência de outros', 'Passivo-agressividade'],
        deepInsight: 'Você prefere negociar a lutar. Sua força está na diplomacia, mas você pode evitar conflitos necessários.',
        lifeLesson: 'Aprender que conflito direto às vezes é necessário, e que sua opinião vale a luta.'
      },
      'Escorpião': {
        essence: 'Marte é co-regente de Escorpião. Sua energia é intensa, estratégica e profundamente poderosa.',
        strengths: ['Poder transformador', 'Estratégia profunda', 'Persistência absoluta', 'Magnetismo'],
        challenges: ['Vingança', 'Manipulação', 'Obsessão', 'Controle excessivo'],
        deepInsight: 'Você é um guerreiro das sombras — poderoso, estratégico, capaz de destruir e reconstruir.',
        lifeLesson: 'Aprender que perdão é o maior poder, e que controle verdadeiro é autodomínio.'
      },
      'Sagitário': {
        essence: 'Sua energia é aventureira, otimista e orientada a causas maiores. Você luta por ideais.',
        strengths: ['Coragem aventureira', 'Entusiasmo contagiante', 'Luta por causas', 'Visão ampla'],
        challenges: ['Promessas exageradas', 'Falta de follow-through', 'Imprudência', 'Fanatismo'],
        deepInsight: 'Você é um cruzado cósmico — sua energia se inflama por causas, aventuras e verdades maiores.',
        lifeLesson: 'Aprender que detalhes importam, e que consistência é tão valiosa quanto entusiasmo.'
      },
      'Capricórnio': {
        essence: 'Marte está exaltado em Capricórnio. Sua energia é disciplinada, estratégica e orientada a conquistas de longo prazo.',
        strengths: ['Disciplina inabalável', 'Estratégia de longo prazo', 'Ambição focada', 'Resistência'],
        challenges: ['Frieza', 'Workaholism', 'Rigidez', 'Supressão de emoções'],
        deepInsight: 'Você é um general cósmico — cada ação é calculada para vitória de longo prazo.',
        lifeLesson: 'Aprender que descanso é estratégico, e que sucesso sem alegria é vazio.'
      },
      'Aquário': {
        essence: 'Sua energia é rebelde, inovadora e orientada a causas coletivas. Você luta pela humanidade.',
        strengths: ['Rebeldia construtiva', 'Inovação na ação', 'Luta por causas sociais', 'Independência'],
        challenges: ['Teimosia ideológica', 'Frieza', 'Imprevisibilidade', 'Dificuldade com ação individual'],
        deepInsight: 'Você é um revolucionário cósmico — sua energia se inflama por mudança social e progresso.',
        lifeLesson: 'Aprender que mudança pessoal precede mudança social, e que emoções também são importantes.'
      },
      'Peixes': {
        essence: 'Sua energia é fluida, compassiva e às vezes nebulosa. Você age por inspiração e intuição.',
        strengths: ['Ação compassiva', 'Intuição tática', 'Adaptabilidade', 'Criatividade na ação'],
        challenges: ['Passividade', 'Confusão de direção', 'Escapismo', 'Vitimização'],
        deepInsight: 'Você é um guerreiro poético — sua força está na adaptação, não na confrontação direta.',
        lifeLesson: 'Aprender que assertividade direta é às vezes necessária, e que escapar não resolve.'
      }
    }
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    symbol: '♃',
    archetype: 'O Rei / O Sábio',
    governs: ['Expansão', 'Sorte', 'Sabedoria', 'Viagens', 'Filosofia'],
    bodyParts: ['Fígado', 'Quadris', 'Coxas', 'Crescimento'],
    keywords: ['Abundância', 'Otimismo', 'Fé', 'Generosidade', 'Crescimento'],
    deepMeaning: `Júpiter é o Grande Benéfico — o planeta da sorte, expansão e abundância. Ele mostra onde você naturalmente atrai bênçãos, onde você busca crescimento e como você encontra significado.

Este planeta governa sua fé, sua filosofia de vida, seu senso de humor e sua capacidade de ver o quadro geral. Júpiter é onde você é generoso, otimista e onde busca se expandir além dos limites atuais.

O signo de Júpiter mostra COMO você cresce e onde está sua sorte natural. A casa revela a ÁREA de vida onde você experimenta mais expansão e abundância.`,
    questions: [
      'O que dá significado à sua vida?',
      'Onde você naturalmente tem sorte?',
      'Qual é sua filosofia de vida?',
      'Como você busca crescimento pessoal?'
    ],
    shadowSide: 'Quando desequilibrado, Júpiter pode manifestar exagero, excesso de confiança, irresponsabilidade, ganância ou dogmatismo.',
    growthPath: 'Use sua sorte e otimismo natural para elevar outros. Aprenda que verdadeira abundância inclui gratidão e responsabilidade.',
    signInterpretations: {
      'Áries': {
        essence: 'Você cresce através de iniciativas corajosas e novos começos. Sua sorte está no pioneirismo.',
        strengths: ['Coragem expandida', 'Iniciativa abençoada', 'Liderança inspiradora', 'Fé em si mesmo'],
        challenges: ['Imprudência', 'Arrogância', 'Exagero na ação', 'Impaciência com resultados'],
        deepInsight: 'Você é abençoado com coragem. Quando você ousa, o universo tende a apoiar.',
        lifeLesson: 'Aprender que coragem sem sabedoria é imprudência, e que paciência multiplica sorte.'
      },
      'Touro': {
        essence: 'Você cresce através de recursos materiais e apreciação sensorial. Sua sorte está na abundância tangível.',
        strengths: ['Abundância material', 'Prazer refinado', 'Generosidade tangível', 'Valores sólidos'],
        challenges: ['Materialismo', 'Excesso de conforto', 'Gula', 'Preguiça'],
        deepInsight: 'Você atrai recursos naturalmente. O universo te dá meios tangíveis para realizar sua missão.',
        lifeLesson: 'Aprender que abundância verdadeira inclui generosidade, e que excesso pode ser prisão.'
      },
      'Gêmeos': {
        essence: 'Você cresce através de comunicação, aprendizado e conexões. Sua sorte está nas ideias.',
        strengths: ['Mente expansiva', 'Comunicação abençoada', 'Aprendizado fácil', 'Conexões múltiplas'],
        challenges: ['Superficialidade', 'Dispersão', 'Promessas exageradas', 'Falta de profundidade'],
        deepInsight: 'Você é abençoado com curiosidade infinita. O conhecimento flui facilmente para você.',
        lifeLesson: 'Aprender que profundidade pode coexistir com variedade, e que nem toda informação é sabedoria.'
      },
      'Câncer': {
        essence: 'Júpiter está exaltado em Câncer. Você cresce através de família, nutrição e conexões emocionais.',
        strengths: ['Abundância emocional', 'Lar abençoado', 'Proteção expandida', 'Intuição rica'],
        challenges: ['Apego excessivo', 'Proteção sufocante', 'Emoções exageradas'],
        deepInsight: 'Você é abençoado com capacidade de nutrir. Seu lar e família são fontes de expansão.',
        lifeLesson: 'Aprender que nutrir outros não deve esgotar você, e que crescimento às vezes requer deixar ir.'
      },
      'Leão': {
        essence: 'Você cresce através de expressão criativa e generosidade. Sua sorte está no brilho pessoal.',
        strengths: ['Criatividade abençoada', 'Generosidade magnânima', 'Carisma expandido', 'Alegria contagiante'],
        challenges: ['Orgulho exagerado', 'Drama excessivo', 'Necessidade de atenção', 'Extravagância'],
        deepInsight: 'Você é abençoado com capacidade de brilhar. Quando você expressa seu coração, a sorte te acompanha.',
        lifeLesson: 'Aprender que verdadeira grandeza inclui humildade, e que dar holofote a outros também é generosidade.'
      },
      'Virgem': {
        essence: 'Você cresce através de serviço, análise e aperfeiçoamento. Sua sorte está nos detalhes.',
        strengths: ['Trabalho abençoado', 'Saúde favorecida', 'Serviço expandido', 'Competência reconhecida'],
        challenges: ['Perfeccionismo', 'Crítica exagerada', 'Preocupação excessiva', 'Modéstia bloqueadora'],
        deepInsight: 'Você é abençoado com capacidade de servir. O universo expande através da excelência do seu trabalho.',
        lifeLesson: 'Aprender que imperfeição também pode ser abençoada, e que você merece receber tanto quanto dar.'
      },
      'Libra': {
        essence: 'Você cresce através de relacionamentos e parcerias. Sua sorte está na harmonia.',
        strengths: ['Parcerias abençoadas', 'Justiça favorecida', 'Diplomacia expandida', 'Beleza atraída'],
        challenges: ['Dependência excessiva', 'Indecisão', 'Superficialidade relacional'],
        deepInsight: 'Você é abençoado através de outros. Parcerias são portais de expansão para você.',
        lifeLesson: 'Aprender que você é completo sozinho, mesmo que floresça em parceria.'
      },
      'Escorpião': {
        essence: 'Você cresce através de transformação, profundidade e poder. Sua sorte está na regeneração.',
        strengths: ['Transformação abençoada', 'Profundidade expandida', 'Recursos ocultos', 'Poder regenerativo'],
        challenges: ['Obsessão', 'Manipulação', 'Excesso de intensidade', 'Controle exagerado'],
        deepInsight: 'Você é abençoado com poder de renascimento. Suas crises são portais de expansão.',
        lifeLesson: 'Aprender que poder verdadeiro é compartilhado, e que leveza também pode ser profunda.'
      },
      'Sagitário': {
        essence: 'Júpiter está em casa em Sagitário. Você cresce através de aventura, filosofia e busca de verdade.',
        strengths: ['Otimismo poderoso', 'Aventura abençoada', 'Sabedoria natural', 'Fé inabalável'],
        challenges: ['Exagero', 'Dogmatismo', 'Promessas impossíveis', 'Irresponsabilidade'],
        deepInsight: 'Você é naturalmente abençoado com fé e otimismo. O mundo é seu campus de aprendizado.',
        lifeLesson: 'Aprender que verdade é multifacetada, e que compromisso pode ser tão expansivo quanto liberdade.'
      },
      'Capricórnio': {
        essence: 'Júpiter está em queda em Capricórnio. Seu crescimento é lento mas sólido, através de disciplina e estrutura.',
        strengths: ['Sucesso duradouro', 'Ambição realista', 'Crescimento estruturado', 'Autoridade respeitada'],
        challenges: ['Pessimismo', 'Crescimento lento', 'Rigidez', 'Medo de expansão'],
        deepInsight: 'Sua abundância vem através de trabalho duro e tempo. Você constrói fortunas, não as encontra.',
        lifeLesson: 'Aprender que otimismo não é ingenuidade, e que alegria também é produtiva.'
      },
      'Aquário': {
        essence: 'Você cresce através de inovação, grupos e causas humanitárias. Sua sorte está no coletivo.',
        strengths: ['Inovação abençoada', 'Amizades expansivas', 'Causas apoiadas', 'Visão de futuro'],
        challenges: ['Excentricidade exagerada', 'Frieza', 'Idealismo impraticável'],
        deepInsight: 'Você é abençoado através de conexões sociais e ideias revolucionárias.',
        lifeLesson: 'Aprender que mudança individual também importa, e que emoções não são obstáculos.'
      },
      'Peixes': {
        essence: 'Júpiter é co-regente de Peixes. Você cresce através de espiritualidade, compaixão e transcendência.',
        strengths: ['Compaixão infinita', 'Espiritualidade expandida', 'Intuição poderosa', 'Criatividade abençoada'],
        challenges: ['Escapismo', 'Ilusões', 'Falta de limites', 'Sacrifício excessivo'],
        deepInsight: 'Você é abençoado com conexão ao infinito. Sua fé transcende dogmas e toca o divino.',
        lifeLesson: 'Aprender que espiritualidade inclui realidade prática, e que limites são formas de amor.'
      }
    }
  },
  {
    id: 'saturn',
    name: 'Saturno',
    symbol: '♄',
    archetype: 'O Mestre / O Pai',
    governs: ['Estrutura', 'Tempo', 'Limites', 'Responsabilidade', 'Maturidade'],
    bodyParts: ['Ossos', 'Joelhos', 'Dentes', 'Pele'],
    keywords: ['Disciplina', 'Autoridade', 'Karma', 'Lições', 'Maestria'],
    deepMeaning: `Saturno é o Grande Mestre — o planeta que traz lições difíceis mas necessárias. Ele representa onde você encontra seus maiores desafios, mas também onde pode desenvolver sua maior maestria.

Este planeta governa o tempo, a maturidade, a responsabilidade e as estruturas da vida. Saturno mostra onde você precisa trabalhar duro, onde enfrenta medos e onde eventualmente se torna uma autoridade através da experiência.

O signo de Saturno revela a NATUREZA das suas lições kármicas. A casa mostra a ÁREA de vida onde você mais precisa desenvolver disciplina e maturidade.`,
    questions: [
      'Qual é seu maior medo e como ele o limita?',
      'Onde você precisa desenvolver mais disciplina?',
      'Quais responsabilidades você tem evitado?',
      'Em que área você pode se tornar mestre com dedicação?'
    ],
    shadowSide: 'Quando desequilibrado, Saturno pode manifestar rigidez, pessimismo, medo paralisante, autoritarismo ou auto-sabotagem.',
    growthPath: 'Aceite suas lições com humildade. Transforme limitações em estrutura. Torne-se a autoridade que você precisava encontrar.',
    signInterpretations: {
      'Áries': {
        essence: 'Suas lições envolvem iniciativa, identidade e coragem. Você pode ter medo de começar ou se afirmar.',
        strengths: ['Liderança conquistada', 'Coragem desenvolvida', 'Iniciativa madura', 'Autoridade ganha'],
        challenges: ['Medo de agir', 'Dúvida da identidade', 'Frustração', 'Impaciência com obstáculos'],
        deepInsight: 'Você está aprendendo que verdadeira coragem é construída, não nascida. Cada ação consciente te fortalece.',
        lifeLesson: 'Aprender que paciência com você mesmo é essencial, e que identidade sólida leva tempo.'
      },
      'Touro': {
        essence: 'Suas lições envolvem recursos, valores e autoestima. Você pode ter medos sobre segurança material.',
        strengths: ['Valores sólidos', 'Recursos construídos', 'Autoestima conquistada', 'Estabilidade criada'],
        challenges: ['Medo da escassez', 'Rigidez material', 'Baixa autoestima', 'Possessividade defensiva'],
        deepInsight: 'Você está aprendendo que verdadeiro valor vem de dentro. A segurança que você busca deve ser construída internamente.',
        lifeLesson: 'Aprender que abundância é mentalidade, e que seu valor não depende de posses.'
      },
      'Gêmeos': {
        essence: 'Suas lições envolvem comunicação, aprendizado e pensamento. Você pode ter dúvidas sobre sua inteligência.',
        strengths: ['Mente disciplinada', 'Comunicação precisa', 'Aprendizado profundo', 'Conhecimento sólido'],
        challenges: ['Medo de falar', 'Dúvida intelectual', 'Rigidez mental', 'Dificuldades de aprendizado'],
        deepInsight: 'Você está aprendendo a confiar em sua mente. Seu conhecimento, quando construído com paciência, é sólido como rocha.',
        lifeLesson: 'Aprender que sua voz merece ser ouvida, e que conhecimento verdadeiro vem com tempo.'
      },
      'Câncer': {
        essence: 'Suas lições envolvem família, emoções e vulnerabilidade. Você pode ter tido uma infância difícil.',
        strengths: ['Maturidade emocional', 'Estrutura familiar', 'Proteção sábia', 'Vulnerabilidade corajosa'],
        challenges: ['Frieza emocional', 'Medo de intimidade', 'Dificuldades familiares', 'Repressão de necessidades'],
        deepInsight: 'Você está aprendendo a criar segurança interna que talvez não tenha recebido. Você pode se tornar a mãe/pai que precisava.',
        lifeLesson: 'Aprender que vulnerabilidade é força, e que você merece cuidado tanto quanto oferece.'
      },
      'Leão': {
        essence: 'Suas lições envolvem expressão, criatividade e autovalor. Você pode ter medo de brilhar.',
        strengths: ['Criatividade disciplinada', 'Liderança madura', 'Expressão autêntica', 'Autoridade criativa'],
        challenges: ['Medo de se expressar', 'Bloqueio criativo', 'Necessidade de validação', 'Vergonha de brilhar'],
        deepInsight: 'Você está aprendendo que seu brilho é merecido. A criatividade que você desenvolve com disciplina é duradoura.',
        lifeLesson: 'Aprender que você tem direito de ocupar espaço, e que autenticidade supera aplausos.'
      },
      'Virgem': {
        essence: 'Suas lições envolvem serviço, saúde e perfeição. Você pode ser excessivamente autocrítico.',
        strengths: ['Excelência alcançada', 'Saúde estruturada', 'Serviço maduro', 'Competência reconhecida'],
        challenges: ['Perfeccionismo paralisante', 'Autocrítica severa', 'Ansiedade sobre saúde', 'Workaholism'],
        deepInsight: 'Você está aprendendo que imperfeição é humana. Sua excelência verdadeira inclui autocompaixão.',
        lifeLesson: 'Aprender que você é suficiente como é, e que perfeição é jornada, não destino.'
      },
      'Libra': {
        essence: 'Saturno está exaltado em Libra. Suas lições envolvem relacionamentos, justiça e equilíbrio.',
        strengths: ['Relacionamentos maduros', 'Justiça implementada', 'Compromisso sólido', 'Diplomacia mestra'],
        challenges: ['Medo de solidão', 'Relacionamentos difíceis', 'Dificuldade com compromisso'],
        deepInsight: 'Você está aprendendo que relacionamentos saudáveis requerem trabalho e que você é completo sozinho.',
        lifeLesson: 'Aprender que independência e parceria podem coexistir, e que limites são atos de amor.'
      },
      'Escorpião': {
        essence: 'Suas lições envolvem poder, transformação e controle. Você pode ter medos profundos sobre vulnerabilidade.',
        strengths: ['Poder maduro', 'Transformação consciente', 'Profundidade sábia', 'Controle sobre si mesmo'],
        challenges: ['Medo de perda de controle', 'Desconfiança', 'Dificuldade em deixar ir', 'Segredos pesados'],
        deepInsight: 'Você está aprendendo que verdadeiro poder é rendição. O controle que você busca deve ser sobre si mesmo, não sobre outros.',
        lifeLesson: 'Aprender que vulnerabilidade é o maior poder, e que perdão liberta você primeiro.'
      },
      'Sagitário': {
        essence: 'Suas lições envolvem fé, filosofia e liberdade. Você pode ter dúvidas sobre significado e propósito.',
        strengths: ['Sabedoria conquistada', 'Fé testada e provada', 'Filosofia prática', 'Ensino maduro'],
        challenges: ['Crise de fé', 'Cinismo', 'Medo de expansão', 'Limitação de horizontes'],
        deepInsight: 'Você está aprendendo que fé verdadeira sobrevive à dúvida. Sua sabedoria é construída através de questionamento.',
        lifeLesson: 'Aprender que significado é criado, não encontrado, e que dúvida é parte da jornada.'
      },
      'Capricórnio': {
        essence: 'Saturno está em casa em Capricórnio. Suas lições são intensas mas você tem força nativa para enfrentá-las.',
        strengths: ['Disciplina natural', 'Ambição madura', 'Autoridade conquistada', 'Resiliência profunda'],
        challenges: ['Peso excessivo', 'Pessimismo', 'Workaholism', 'Dificuldade com leveza'],
        deepInsight: 'Você nasceu para escalar montanhas. Sua jornada é árdua mas suas conquistas são reais e duradouras.',
        lifeLesson: 'Aprender que sucesso inclui alegria, e que você merece descanso tanto quanto conquista.'
      },
      'Aquário': {
        essence: 'Saturno é co-regente de Aquário. Suas lições envolvem individualidade, comunidade e inovação.',
        strengths: ['Inovação estruturada', 'Comunidade organizada', 'Individualidade madura', 'Visão implementada'],
        challenges: ['Medo de diferença', 'Alienação', 'Frieza social', 'Rigidez ideológica'],
        deepInsight: 'Você está aprendendo a ser diferente com propósito. Sua originalidade se fortalece quando estruturada.',
        lifeLesson: 'Aprender que pertencer não significa conformar, e que emoções fortalecem conexões.'
      },
      'Peixes': {
        essence: 'Suas lições envolvem fé, limites e espiritualidade. Você pode ter dificuldade em se ancorar na realidade.',
        strengths: ['Espiritualidade prática', 'Compaixão estruturada', 'Limites saudáveis', 'Fé madura'],
        challenges: ['Medo do infinito', 'Escapismo', 'Falta de limites', 'Martírio'],
        deepInsight: 'Você está aprendendo que espiritualidade inclui responsabilidade. Compaixão verdadeira tem limites saudáveis.',
        lifeLesson: 'Aprender que estar ancorado não significa estar preso, e que limites são atos de amor próprio.'
      }
    }
  },
  {
    id: 'uranus',
    name: 'Urano',
    symbol: '♅',
    archetype: 'O Rebelde / O Gênio',
    governs: ['Revolução', 'Originalidade', 'Tecnologia', 'Liberdade', 'Insight súbito'],
    bodyParts: ['Sistema nervoso', 'Tornozelos', 'Circulação'],
    keywords: ['Inovação', 'Despertar', 'Mudança súbita', 'Independência', 'Excentricidade'],
    deepMeaning: `Urano é o grande despertador — o planeta que traz insights súbitos, revoluções e libertação de padrões antigos. Onde Urano está, você não pode ser convencional mesmo que tente.

Este é um planeta geracional (leva 84 anos para completar o zodíaco), então seu signo é compartilhado com sua geração. Mas a CASA de Urano é única para você, mostrando onde você experimenta mudanças súbitas e onde sua originalidade se expressa.

Urano representa onde você é diferente, onde resiste à conformidade, e onde pode ter insights geniais ou experiências de despertar.`,
    questions: [
      'Onde você se recusa a conformar?',
      'Que verdades revolucionárias você carrega?',
      'Como você lida com mudanças súbitas?',
      'Onde sua originalidade quer se expressar?'
    ],
    shadowSide: 'Quando desequilibrado, Urano pode manifestar rebeldia sem causa, excentricidade alienante, instabilidade crônica ou frieza emocional.',
    growthPath: 'Use sua originalidade para elevar, não alienar. Aprenda que liberdade verdadeira inclui responsabilidade.',
    signInterpretations: {
      'Áries': { essence: 'Sua geração revoluciona através de ação direta e novas identidades.', strengths: ['Pioneirismo radical', 'Coragem inovadora'], challenges: ['Impulsividade rebelde', 'Agressividade tecnológica'], deepInsight: 'Sua geração traz novas formas de liderança e identidade.', lifeLesson: 'Canalizar rebeldia em liderança consciente.' },
      'Touro': { essence: 'Sua geração revoluciona valores, economia e relação com natureza.', strengths: ['Inovação econômica', 'Novos valores'], challenges: ['Instabilidade material', 'Apego a mudanças'], deepInsight: 'Sua geração transforma como a humanidade se relaciona com recursos.', lifeLesson: 'Revolucionar sem perder estabilidade essencial.' },
      'Gêmeos': { essence: 'Sua geração revoluciona comunicação e tecnologia da informação.', strengths: ['Inovação comunicativa', 'Mente revolucionária'], challenges: ['Dispersão digital', 'Superficialidade tecnológica'], deepInsight: 'Sua geração transforma como a humanidade se comunica.', lifeLesson: 'Usar inovação para conexão profunda, não superficial.' },
      'Câncer': { essence: 'Sua geração revoluciona família, lar e segurança emocional.', strengths: ['Novas estruturas familiares', 'Liberdade emocional'], challenges: ['Instabilidade doméstica', 'Raízes fragmentadas'], deepInsight: 'Sua geração redefine o que significa família e lar.', lifeLesson: 'Criar segurança em novos formatos.' },
      'Leão': { essence: 'Sua geração revoluciona expressão criativa e identidade pessoal.', strengths: ['Criatividade radical', 'Auto-expressão livre'], challenges: ['Ego inflado', 'Drama revolucionário'], deepInsight: 'Sua geração traz novas formas de criatividade e liderança.', lifeLesson: 'Brilhar autenticamente sem precisar chocar.' },
      'Virgem': { essence: 'Sua geração revoluciona trabalho, saúde e serviço.', strengths: ['Inovação no trabalho', 'Saúde alternativa'], challenges: ['Ansiedade tecnológica', 'Perfeccionismo rebelde'], deepInsight: 'Sua geração transforma como trabalhamos e cuidamos da saúde.', lifeLesson: 'Revolucionar com praticidade.' },
      'Libra': { essence: 'Sua geração revoluciona relacionamentos e justiça social.', strengths: ['Novos modelos relacionais', 'Justiça progressista'], challenges: ['Instabilidade relacional', 'Idealismo desconectado'], deepInsight: 'Sua geração redefine parcerias e equilíbrio social.', lifeLesson: 'Revolucionar relacionamentos com respeito.' },
      'Escorpião': { essence: 'Sua geração revoluciona poder, sexualidade e transformação.', strengths: ['Transformação radical', 'Poder revolucionário'], challenges: ['Obsessão destrutiva', 'Extremismo'], deepInsight: 'Sua geração transforma estruturas de poder profundas.', lifeLesson: 'Usar poder transformador construtivamente.' },
      'Sagitário': { essence: 'Sua geração revoluciona educação, religião e visão de mundo.', strengths: ['Filosofia inovadora', 'Liberdade de pensamento'], challenges: ['Dogmatismo rebelde', 'Excesso de otimismo'], deepInsight: 'Sua geração expande horizontes de consciência.', lifeLesson: 'Revolucionar crenças com sabedoria.' },
      'Capricórnio': { essence: 'Sua geração revoluciona estruturas, governos e autoridade.', strengths: ['Reforma estrutural', 'Autoridade inovadora'], challenges: ['Destruição de estruturas', 'Cinismo'], deepInsight: 'Sua geração transforma instituições e sistemas.', lifeLesson: 'Construir novas estruturas, não apenas destruir antigas.' },
      'Aquário': { essence: 'Urano está em casa em Aquário. Sua geração traz revolução tecnológica e social massiva.', strengths: ['Inovação máxima', 'Visão de futuro'], challenges: ['Frieza extrema', 'Alienação'], deepInsight: 'Sua geração é ponte para o futuro da humanidade.', lifeLesson: 'Humanizar a tecnologia e a revolução.' },
      'Peixes': { essence: 'Sua geração revoluciona espiritualidade, arte e compaixão coletiva.', strengths: ['Espiritualidade inovadora', 'Criatividade transcendente'], challenges: ['Confusão espiritual', 'Escapismo tecnológico'], deepInsight: 'Sua geração dissolve fronteiras entre material e espiritual.', lifeLesson: 'Ancorar revolução espiritual na realidade.' }
    }
  },
  {
    id: 'neptune',
    name: 'Netuno',
    symbol: '♆',
    archetype: 'O Místico / O Sonhador',
    governs: ['Espiritualidade', 'Sonhos', 'Ilusão', 'Compaixão', 'Transcendência'],
    bodyParts: ['Sistema linfático', 'Pés', 'Glândula pineal'],
    keywords: ['Intuição', 'Fantasia', 'Dissolução', 'Inspiração', 'Sacrifício'],
    deepMeaning: `Netuno é o véu entre mundos — o planeta que dissolve fronteiras, traz inspiração divina e também confusão. Onde Netuno está, a realidade é nebulosa mas a conexão espiritual é profunda.

Como planeta geracional (leva 165 anos para completar o zodíaco), seu signo é compartilhado com sua geração. A CASA de Netuno mostra onde você busca transcendência, onde pode ter ilusões, e onde sua compaixão flui naturalmente.

Netuno representa sua conexão com o infinito, sua capacidade de sonhar, e também onde você pode ser enganado ou escapar da realidade.`,
    questions: [
      'Onde você busca transcendência?',
      'Quais são seus sonhos mais profundos?',
      'Onde você pode estar se iludindo?',
      'Como você conecta com algo maior que você?'
    ],
    shadowSide: 'Quando desequilibrado, Netuno pode manifestar escapismo, vícios, ilusões, martírio ou desconexão da realidade.',
    growthPath: 'Canalize sua sensibilidade em criatividade e compaixão prática. Mantenha-se ancorado enquanto sonha.',
    signInterpretations: {
      'Áries': { essence: 'Sua geração espiritualiza ação e busca significado em iniciativas.', strengths: ['Ação inspirada', 'Coragem espiritual'], challenges: ['Confusão de identidade', 'Ilusões sobre força'], deepInsight: 'Sua geração busca heroísmo espiritual.', lifeLesson: 'Agir com inspiração sem perder discernimento.' },
      'Touro': { essence: 'Sua geração espiritualiza o material e busca beleza transcendente.', strengths: ['Beleza espiritual', 'Valores elevados'], challenges: ['Ilusões materiais', 'Confusão sobre valor'], deepInsight: 'Sua geração conecta o material ao espiritual.', lifeLesson: 'Encontrar o sagrado no cotidiano.' },
      'Gêmeos': { essence: 'Sua geração espiritualiza comunicação e busca verdade através de palavras.', strengths: ['Comunicação inspirada', 'Intuição mental'], challenges: ['Confusão mental', 'Ilusões comunicativas'], deepInsight: 'Sua geração canaliza mensagens do além.', lifeLesson: 'Discernir verdade de ilusão nas palavras.' },
      'Câncer': { essence: 'Sua geração espiritualiza família e busca lar espiritual.', strengths: ['Lar sagrado', 'Compaixão familiar'], challenges: ['Ilusões sobre família', 'Escapismo doméstico'], deepInsight: 'Sua geração busca pertencimento cósmico.', lifeLesson: 'Criar santuário enquanto aceita realidade.' },
      'Leão': { essence: 'Sua geração espiritualiza criatividade e busca expressão divina.', strengths: ['Arte espiritual', 'Criatividade transcendente'], challenges: ['Ilusões sobre si', 'Ego espiritual'], deepInsight: 'Sua geração canaliza criatividade do divino.', lifeLesson: 'Expressar o divino com humildade.' },
      'Virgem': { essence: 'Sua geração espiritualiza serviço e busca purificação.', strengths: ['Serviço sagrado', 'Cura holística'], challenges: ['Perfeccionismo espiritual', 'Martírio'], deepInsight: 'Sua geração serve através de compaixão prática.', lifeLesson: 'Servir sem se sacrificar.' },
      'Libra': { essence: 'Sua geração espiritualiza relacionamentos e busca amor divino.', strengths: ['Amor espiritual', 'Harmonia transcendente'], challenges: ['Ilusões sobre parceiros', 'Codependência'], deepInsight: 'Sua geração busca o divino através do outro.', lifeLesson: 'Amar sem perder limites.' },
      'Escorpião': { essence: 'Sua geração espiritualiza transformação e busca morte do ego.', strengths: ['Transformação espiritual', 'Profundidade mística'], challenges: ['Obsessão espiritual', 'Escapismo em intensidade'], deepInsight: 'Sua geração mergulha nas profundezas do inconsciente.', lifeLesson: 'Transformar sem destruir.' },
      'Sagitário': { essence: 'Sua geração espiritualiza busca de significado e expande consciência.', strengths: ['Fé expandida', 'Visão espiritual'], challenges: ['Fanatismo espiritual', 'Ilusões filosóficas'], deepInsight: 'Sua geração expande horizontes espirituais da humanidade.', lifeLesson: 'Expandir sem perder discernimento.' },
      'Capricórnio': { essence: 'Sua geração espiritualiza estruturas e busca autoridade espiritual.', strengths: ['Espiritualidade prática', 'Estrutura sagrada'], challenges: ['Ilusões sobre autoridade', 'Cinismo espiritual'], deepInsight: 'Sua geração ancora espiritualidade em realidade.', lifeLesson: 'Construir estruturas que servem ao espírito.' },
      'Aquário': { essence: 'Sua geração espiritualiza tecnologia e busca consciência coletiva.', strengths: ['Intuição coletiva', 'Tecnologia espiritual'], challenges: ['Ilusões sobre progresso', 'Frieza espiritual'], deepInsight: 'Sua geração conecta tecnologia e espiritualidade.', lifeLesson: 'Usar tecnologia para elevar consciência.' },
      'Peixes': { essence: 'Netuno está em casa em Peixes. Sua geração vive dissolução máxima de fronteiras.', strengths: ['Compaixão infinita', 'Conexão cósmica'], challenges: ['Escapismo máximo', 'Dissolução de ego'], deepInsight: 'Sua geração lembra a humanidade de sua natureza divina.', lifeLesson: 'Permanecer ancorado enquanto transcende.' }
    }
  },
  {
    id: 'pluto',
    name: 'Plutão',
    symbol: '♇',
    archetype: 'O Transformador / O Fênix',
    governs: ['Transformação', 'Poder', 'Morte/Renascimento', 'Intensidade', 'Inconsciente'],
    bodyParts: ['Órgãos reprodutivos', 'Sistema excretor', 'Regeneração celular'],
    keywords: ['Poder', 'Regeneração', 'Obsessão', 'Profundidade', 'Catarse'],
    deepMeaning: `Plutão é o senhor do submundo — o planeta que governa morte, renascimento e transformação profunda. Onde Plutão está, você encontra suas maiores intensidades, seus medos mais profundos e seu maior poder de regeneração.

Como planeta geracional (leva 248 anos para completar o zodíaco), seu signo é compartilhado com sua geração. A CASA de Plutão é única para você, mostrando onde você experimenta transformação profunda, onde tem poder oculto, e onde precisa morrer para renascer.

Plutão representa o inconsciente coletivo, os tabus, a sexualidade profunda e tudo que está escondido nas sombras esperando ser integrado.`,
    questions: [
      'O que você está sendo chamado a transformar?',
      'Onde está seu poder oculto?',
      'O que precisa morrer para que o novo nasça?',
      'Quais padrões inconscientes controlam você?'
    ],
    shadowSide: 'Quando desequilibrado, Plutão pode manifestar obsessão, manipulação, sede de poder destrutiva ou medo paralisante de perda de controle.',
    growthPath: 'Aceite a morte como parte da vida. Use seu poder para transformar, não controlar. Ilumine suas sombras com compaixão.',
    signInterpretations: {
      'Áries': { essence: 'Sua geração transforma identidade e liderança.', strengths: ['Poder pioneiro', 'Transformação de identidade'], challenges: ['Agressividade transformadora', 'Poder impulsivo'], deepInsight: 'Sua geração redefine o que significa liderar e ser.', lifeLesson: 'Transformar com consciência, não com força.' },
      'Touro': { essence: 'Sua geração transforma valores, economia e relação com Terra.', strengths: ['Poder sobre recursos', 'Transformação de valores'], challenges: ['Obsessão material', 'Resistência à mudança'], deepInsight: 'Sua geração transforma como a humanidade se relaciona com abundância.', lifeLesson: 'Deixar ir para receber mais.' },
      'Gêmeos': { essence: 'Sua geração transforma comunicação e pensamento.', strengths: ['Poder da informação', 'Transformação mental'], challenges: ['Manipulação verbal', 'Obsessão mental'], deepInsight: 'Sua geração transforma como a humanidade pensa e comunica.', lifeLesson: 'Usar poder da palavra com responsabilidade.' },
      'Câncer': { essence: 'Sua geração transforma família e estruturas emocionais.', strengths: ['Poder emocional', 'Transformação familiar'], challenges: ['Manipulação emocional', 'Controle através de cuidado'], deepInsight: 'Sua geração redefine família e segurança emocional.', lifeLesson: 'Transformar padrões familiares com amor.' },
      'Leão': { essence: 'Sua geração transforma criatividade e poder pessoal.', strengths: ['Criatividade poderosa', 'Transformação do ego'], challenges: ['Obsessão com reconhecimento', 'Drama transformador'], deepInsight: 'Sua geração redefine auto-expressão e poder criativo.', lifeLesson: 'Transformar ego sem destruí-lo.' },
      'Virgem': { essence: 'Sua geração transforma trabalho, saúde e serviço.', strengths: ['Poder de cura', 'Transformação de sistemas'], challenges: ['Obsessão com perfeição', 'Crítica destrutiva'], deepInsight: 'Sua geração transforma como trabalhamos e curamos.', lifeLesson: 'Purificar sem destruir.' },
      'Libra': { essence: 'Sua geração transforma relacionamentos e justiça.', strengths: ['Poder relacional', 'Transformação de parcerias'], challenges: ['Jogos de poder em relacionamentos', 'Obsessão com equilíbrio'], deepInsight: 'Sua geração redefine parcerias e justiça social.', lifeLesson: 'Transformar relacionamentos com respeito.' },
      'Escorpião': { essence: 'Plutão está em casa em Escorpião. Transformação máxima, poder profundo.', strengths: ['Poder regenerativo máximo', 'Transformação profunda'], challenges: ['Intensidade extrema', 'Obsessão e controle'], deepInsight: 'Sua geração traz transformação evolutiva massiva.', lifeLesson: 'Usar poder para elevar, não controlar.' },
      'Sagitário': { essence: 'Sua geração transforma crenças, educação e visão de mundo.', strengths: ['Poder da verdade', 'Transformação filosófica'], challenges: ['Fanatismo', 'Obsessão com ter razão'], deepInsight: 'Sua geração transforma como a humanidade busca significado.', lifeLesson: 'Transformar crenças sem destruir fé.' },
      'Capricórnio': { essence: 'Sua geração transforma estruturas, governos e autoridade.', strengths: ['Poder estrutural', 'Transformação institucional'], challenges: ['Abuso de poder', 'Destruição de estruturas'], deepInsight: 'Sua geração destrói e reconstrói instituições.', lifeLesson: 'Transformar sistemas com responsabilidade.' },
      'Aquário': { essence: 'Sua geração transforma tecnologia, sociedade e consciência coletiva.', strengths: ['Poder coletivo', 'Transformação social'], challenges: ['Frieza revolucionária', 'Poder tecnológico descontrolado'], deepInsight: 'Sua geração transforma como a humanidade se organiza coletivamente.', lifeLesson: 'Transformar sociedade com humanidade.' },
      'Peixes': { essence: 'Sua geração transforma espiritualidade e dissolve fronteiras finais.', strengths: ['Poder espiritual', 'Transformação da consciência'], challenges: ['Dissolução caótica', 'Escapismo transformador'], deepInsight: 'Sua geração transcende limitações da consciência humana.', lifeLesson: 'Transformar através de compaixão, não destruição.' }
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
