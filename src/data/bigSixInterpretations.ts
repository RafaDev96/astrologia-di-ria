// Interpretações profundas para o Big Six (Sol, Lua, Ascendente, Meio do Céu, Descendente, Fundo do Céu)

export const bigSixInterpretations = {
  sun: {
    name: "Sol",
    symbol: "☀️",
    archetype: "O Herói Interior",
    keywords: ["Identidade", "Propósito", "Vitalidade", "Ego Consciente"],
    deepMeaning: "O Sol representa a essência do seu ser — aquilo que você está se tornando ao longo da vida. Não é apenas 'quem você é', mas a jornada de autodescoberta e autorrealização. É o centro gravitacional do seu mapa, assim como o Sol é o centro do sistema solar. Sua energia solar é o que você irradia para o mundo quando está alinhado com seu propósito verdadeiro.",
    questions: [
      "Em que momentos você se sente mais vivo e autêntico?",
      "O que faz seus olhos brilharem de verdade?",
      "Qual legado você deseja deixar no mundo?"
    ],
    howToWork: "Honre sua natureza solar fazendo mais daquilo que genuinamente te energiza. O Sol precisa brilhar — reprimir sua essência causa esgotamento e perda de propósito. Cultive atividades que alimentem sua vitalidade e expressem sua individualidade única.",
    signInterpretations: {
      "Áries": {
        essence: "Você veio para ser pioneiro, para iniciar, para ter coragem onde outros hesitam. Sua identidade se forja na ação e na iniciativa.",
        strengths: "Coragem instintiva, capacidade de começar do zero, energia vital poderosa, honestidade direta",
        challenges: "Impaciência com processos lentos, tendência a abandonar projetos no meio, agressividade quando frustrado",
        lifeLesson: "Aprender que verdadeira força inclui paciência, e que liderar é também saber esperar"
      },
      "Touro": {
        essence: "Você veio para manifestar beleza e estabilidade no mundo. Sua identidade se constrói através da persistência e dos valores que você cultiva.",
        strengths: "Determinação inabalável, senso estético refinado, capacidade de criar segurança, lealdade profunda",
        challenges: "Resistência excessiva a mudanças, possessividade, tendência a estagnar na zona de conforto",
        lifeLesson: "Descobrir que verdadeira segurança vem de dentro, e que às vezes precisamos soltar para crescer"
      },
      "Gêmeos": {
        essence: "Você veio para conectar, comunicar e explorar a diversidade da experiência humana. Sua identidade floresce através do aprendizado contínuo.",
        strengths: "Versatilidade mental, comunicação fluida, adaptabilidade, curiosidade insaciável",
        challenges: "Dispersão, superficialidade, dificuldade de compromisso, ansiedade mental",
        lifeLesson: "Integrar a multiplicidade interior em uma identidade coesa, encontrando profundidade na variedade"
      },
      "Câncer": {
        essence: "Você veio para nutrir, proteger e criar vínculos emocionais profundos. Sua identidade se forma através do cuidado e da conexão com suas raízes.",
        strengths: "Intuição emocional, capacidade de nutrir, memória afetiva, proteção amorosa",
        challenges: "Apego excessivo ao passado, humor instável, tendência a se esconder na própria concha",
        lifeLesson: "Aprender a nutrir a si mesmo primeiro, e que soltar não significa abandono"
      },
      "Leão": {
        essence: "Você veio para brilhar, criar e inspirar outros com sua luz interior. Sua identidade se expressa através da criatividade e do reconhecimento.",
        strengths: "Generosidade magnânima, criatividade vibrante, liderança natural, calor humano",
        challenges: "Necessidade excessiva de aprovação, drama emocional, orgulho ferido facilmente",
        lifeLesson: "Descobrir que seu brilho não depende de aplausos externos, mas de sua conexão com o coração"
      },
      "Virgem": {
        essence: "Você veio para aperfeiçoar, servir e trazer ordem ao caos. Sua identidade se constrói através da dedicação ao trabalho bem feito.",
        strengths: "Análise precisa, dedicação ao serviço, humildade prática, atenção aos detalhes",
        challenges: "Autocrítica paralisante, perfeccionismo, preocupação excessiva, dificuldade de aceitar imperfeições",
        lifeLesson: "Aceitar que a imperfeição é parte da perfeição maior, e que você merece a mesma gentileza que oferece aos outros"
      },
      "Libra": {
        essence: "Você veio para criar harmonia, beleza e justiça no mundo. Sua identidade se desenvolve através dos relacionamentos e do equilíbrio.",
        strengths: "Diplomacia natural, senso estético apurado, capacidade de ver múltiplos lados, charme social",
        challenges: "Indecisão crônica, dependência da aprovação alheia, evitação de conflitos necessários",
        lifeLesson: "Descobrir que sua identidade não se define pelos outros, e que conflito pode gerar harmonia maior"
      },
      "Escorpião": {
        essence: "Você veio para transformar, penetrar mistérios e renascer das cinzas. Sua identidade se forja através de intensas experiências de morte e renascimento.",
        strengths: "Intensidade magnética, capacidade de regeneração, percepção profunda, lealdade absoluta",
        challenges: "Controle excessivo, vingança, paranoia, dificuldade de perdoar",
        lifeLesson: "Aprender que vulnerabilidade é força, e que soltar controle permite transformação genuína"
      },
      "Sagitário": {
        essence: "Você veio para expandir horizontes, buscar verdade e inspirar fé na vida. Sua identidade se constrói através da busca por significado.",
        strengths: "Otimismo contagiante, visão expansiva, honestidade filosófica, espírito aventureiro",
        challenges: "Exagero, promessas não cumpridas, fuga de responsabilidades, dogmatismo",
        lifeLesson: "Descobrir que a verdade mais profunda está na jornada, não no destino final"
      },
      "Capricórnio": {
        essence: "Você veio para construir, conquistar e deixar um legado duradouro. Sua identidade se forma através de realizações concretas e responsabilidade.",
        strengths: "Disciplina admirável, visão de longo prazo, integridade, capacidade de liderança madura",
        challenges: "Rigidez emocional, workaholic, pessimismo, dificuldade de se permitir prazer",
        lifeLesson: "Aprender que sucesso inclui alegria, e que vulnerabilidade não é fraqueza"
      },
      "Aquário": {
        essence: "Você veio para inovar, libertar e trazer visões do futuro para o presente. Sua identidade se forma através da originalidade e do coletivo.",
        strengths: "Pensamento revolucionário, humanitarismo, originalidade, desapego saudável",
        challenges: "Distanciamento emocional, rebeldia sem causa, excentricidade alienante",
        lifeLesson: "Descobrir que pertencer não significa conformar, e que intimidade não ameaça liberdade"
      },
      "Peixes": {
        essence: "Você veio para transcender, curar e conectar com o divino. Sua identidade se dissolve nos oceanos do inconsciente coletivo.",
        strengths: "Compaixão infinita, imaginação vívida, sensibilidade artística, conexão espiritual",
        challenges: "Fuga da realidade, vitimização, limites fracos, confusão identitária",
        lifeLesson: "Aprender a ancorar a espiritualidade no mundo material, mantendo os pés na terra enquanto sonha"
      }
    }
  },
  moon: {
    name: "Lua",
    symbol: "🌙",
    archetype: "A Alma Interior",
    keywords: ["Emoções", "Necessidades", "Instintos", "Memória"],
    deepMeaning: "A Lua é seu mundo interior — como você processa emoções, o que precisa para se sentir seguro, como foi nutrido na infância e como nutre a si mesmo e aos outros. É a parte de você que reage antes que o pensamento consciente chegue. Enquanto o Sol é quem você está se tornando, a Lua é de onde você veio e o que carrega no coração.",
    questions: [
      "O que você precisa para se sentir verdadeiramente em casa?",
      "Como você se consola quando está sozinho?",
      "Quais memórias da infância ainda moldam suas reações emocionais?"
    ],
    howToWork: "Honre suas necessidades emocionais sem julgamento. A Lua precisa de segurança e nutrição — negá-las causa vazio interno. Crie rituais de autocuidado, cultive um lar que acolha sua alma, permita-se sentir sem racionalizar.",
    signInterpretations: {
      "Áries": {
        essence: "Você precisa de ação para processar emoções. Seus sentimentos são diretos, impulsivos e precisam de expressão imediata.",
        strengths: "Honestidade emocional, capacidade de começar de novo emocionalmente, coragem afetiva",
        challenges: "Impaciência com próprios sentimentos, reações explosivas, dificuldade de vulnerabilidade suave",
        lifeLesson: "Aprender que emoções podem ser processadas lentamente, e que pedir ajuda não é fraqueza"
      },
      "Touro": {
        essence: "Você precisa de estabilidade física e sensorial para se sentir emocionalmente seguro. Conforto material nutre sua alma.",
        strengths: "Constância emocional, lealdade afetiva, capacidade de criar ambientes acolhedores",
        challenges: "Apego excessivo, resistência a mudanças emocionais, possessividade nos afetos",
        lifeLesson: "Descobrir que segurança emocional pode existir mesmo quando o mundo externo muda"
      },
      "Gêmeos": {
        essence: "Você processa emoções através de palavras e ideias. Comunicar sentimentos ajuda a entendê-los.",
        strengths: "Adaptabilidade emocional, capacidade de articular sentimentos, curiosidade afetiva",
        challenges: "Racionalização excessiva de emoções, dispersão afetiva, nervosismo emocional",
        lifeLesson: "Aprender que alguns sentimentos não podem ser explicados, apenas sentidos"
      },
      "Câncer": {
        essence: "A Lua está em casa aqui. Você tem profunda conexão com suas emoções, memórias e necessidade de nutrir e ser nutrido.",
        strengths: "Intuição emocional extraordinária, capacidade de cuidar, memória afetiva rica",
        challenges: "Humor oscilante como as marés, apego ao passado, dificuldade de soltar mágoas",
        lifeLesson: "Aprender a fluir com as emoções sem se afogar nelas, mantendo limites saudáveis"
      },
      "Leão": {
        essence: "Você precisa se sentir especial e apreciado emocionalmente. Seu coração é generoso e dramático.",
        strengths: "Generosidade afetiva, calor emocional, lealdade de coração, expressividade",
        challenges: "Necessidade de ser o centro das atenções emocionais, orgulho ferido facilmente",
        lifeLesson: "Descobrir que você é digno de amor mesmo sem aplausos, e que dar atenção é tão importante quanto receber"
      },
      "Virgem": {
        essence: "Você processa emoções através de análise e serviço. Cuidar de detalhes práticos é sua forma de amar.",
        strengths: "Cuidado prático, atenção às necessidades alheias, autoconhecimento analítico",
        challenges: "Autocrítica emocional, preocupação excessiva, dificuldade de aceitar imperfeições afetivas",
        lifeLesson: "Aprender que emoções não precisam ser perfeitas ou racionais para serem válidas"
      },
      "Libra": {
        essence: "Você precisa de harmonia e parceria para equilíbrio emocional. Relacionamentos são espelhos da sua alma.",
        strengths: "Diplomacia emocional, capacidade de equilibrar necessidades, charme afetivo",
        challenges: "Dependência emocional, evitação de conflitos afetivos, indecisão sobre sentimentos",
        lifeLesson: "Descobrir que você pode ter paz interior mesmo quando há dissonância ao redor"
      },
      "Escorpião": {
        essence: "Você sente com intensidade oceânica. Suas emoções são profundas, transformadoras e exigem honestidade absoluta.",
        strengths: "Intensidade emocional, capacidade de regeneração afetiva, lealdade profunda",
        challenges: "Ciúme, controle emocional, dificuldade de perdoar, guardar mágoas",
        lifeLesson: "Aprender que vulnerabilidade não é traição, e que perdoar liberta a si mesmo"
      },
      "Sagitário": {
        essence: "Você precisa de liberdade e aventura para se sentir emocionalmente vivo. Seu coração busca significado.",
        strengths: "Otimismo emocional, generosidade de espírito, capacidade de ver o lado positivo",
        challenges: "Fuga de emoções difíceis, compromisso emocional instável, exagero afetivo",
        lifeLesson: "Descobrir que enfrentar emoções difíceis é a maior aventura interior"
      },
      "Capricórnio": {
        essence: "Você processa emoções com cautela e responsabilidade. Sentimentos são tratados com seriedade e maturidade.",
        strengths: "Estabilidade emocional, responsabilidade afetiva, capacidade de superar dificuldades",
        challenges: "Repressão emocional, pessimismo, dificuldade de expressar vulnerabilidade",
        lifeLesson: "Aprender que sentir profundamente não é fraqueza, e que emoções não precisam ser 'úteis'"
      },
      "Aquário": {
        essence: "Você precisa de liberdade emocional e conexão mental. Seus sentimentos são processados através do intelecto.",
        strengths: "Desapego saudável, originalidade afetiva, humanitarismo emocional",
        challenges: "Distanciamento, dificuldade de intimidade, racionalização excessiva de sentimentos",
        lifeLesson: "Descobrir que intimidade emocional não ameaça sua individualidade"
      },
      "Peixes": {
        essence: "Você sente tudo — suas emoções e as dos outros se misturam. Sua alma é esponja do universo emocional.",
        strengths: "Empatia ilimitada, compaixão, conexão espiritual, sensibilidade artística",
        challenges: "Absorção de emoções alheias, fuga da realidade, limites fracos",
        lifeLesson: "Aprender a proteger sua sensibilidade sem fechá-la, distinguindo suas emoções das alheias"
      }
    }
  },
  ascendant: {
    name: "Ascendente",
    symbol: "⬆️",
    archetype: "A Máscara Social e Porta de Entrada",
    keywords: ["Aparência", "Primeira Impressão", "Estilo de Ação", "Corpo Físico"],
    deepMeaning: "O Ascendente é a porta de entrada para sua vida — como você inicia experiências e como o mundo o percebe antes de te conhecer profundamente. É sua interface com a realidade, o filtro através do qual você experimenta o mundo e o mundo experimenta você. Não é uma máscara falsa, mas uma faceta genuína da sua personalidade, especialmente ativa em novas situações.",
    questions: [
      "Como as pessoas te descrevem ao te conhecerem?",
      "Qual é seu estilo natural de abordar novas situações?",
      "O que você projeta mesmo quando não está tentando?"
    ],
    howToWork: "Trabalhe conscientemente com seu Ascendente como ferramenta de navegação na vida. Ele indica como você pode iniciar projetos, conhecer pessoas e enfrentar desafios de forma natural e eficaz. Não resista a ele — integre-o com seu Sol e Lua.",
    signInterpretations: {
      "Áries": {
        essence: "Você entra na vida como um guerreiro. Sua presença é direta, energética e impactante. As pessoas veem coragem e iniciativa em você.",
        strengths: "Presença imediata, capacidade de começar, energia física visível, autenticidade",
        challenges: "Parecer agressivo ou impaciente, dificuldade de sutileza nas primeiras impressões",
        lifeLesson: "Canalizar a energia de iniciativa com consciência do impacto nos outros"
      },
      "Touro": {
        essence: "Você entra na vida com calma e sensualidade. Sua presença é estável, acolhedora e esteticamente consciente.",
        strengths: "Presença tranquilizadora, magnetismo sensual, confiabilidade aparente",
        challenges: "Parecer lento ou teimoso, resistência visível a mudanças",
        lifeLesson: "Usar sua estabilidade para ancorar outros sem estagnar"
      },
      "Gêmeos": {
        essence: "Você entra na vida com curiosidade e comunicação. Sua presença é animada, inteligente e socialmente ágil.",
        strengths: "Charme verbal, adaptabilidade social, juventude aparente",
        challenges: "Parecer superficial ou disperso, nervosismo visível",
        lifeLesson: "Usar a versatilidade sem perder profundidade nas conexões"
      },
      "Câncer": {
        essence: "Você entra na vida com sensibilidade e proteção. Sua presença é acolhedora, empática e intuitiva.",
        strengths: "Calor emocional imediato, intuição sobre outros, cuidado natural",
        challenges: "Parecer defensivo ou emotivo demais, oscilações de humor visíveis",
        lifeLesson: "Abrir a carapaça gradualmente sem se expor demais rápido"
      },
      "Leão": {
        essence: "Você entra na vida como realeza. Sua presença é magnética, calorosa e naturalmente no centro das atenções.",
        strengths: "Carisma natural, generosidade aparente, confiança visível",
        challenges: "Parecer arrogante ou dramático, necessidade visível de atenção",
        lifeLesson: "Brilhar autenticamente sem ofuscar outros"
      },
      "Virgem": {
        essence: "Você entra na vida com modéstia e atenção aos detalhes. Sua presença é prática, útil e observadora.",
        strengths: "Competência visível, prestatividade natural, presença discreta mas eficiente",
        challenges: "Parecer crítico ou ansioso, autocrítica visível",
        lifeLesson: "Ser útil sem se diminuir, aceitar imperfeições visíveis"
      },
      "Libra": {
        essence: "Você entra na vida com graça e diplomacia. Sua presença é harmoniosa, elegante e socialmente consciente.",
        strengths: "Charme social, senso estético, capacidade de harmonizar ambientes",
        challenges: "Parecer indeciso ou superficial, dependência de aprovação visível",
        lifeLesson: "Manter a própria identidade enquanto cria harmonia"
      },
      "Escorpião": {
        essence: "Você entra na vida com intensidade e mistério. Sua presença é magnética, penetrante e memorável.",
        strengths: "Magnetismo intenso, percepção aguçada, presença transformadora",
        challenges: "Parecer intimidador ou secretivo, intensidade que afasta",
        lifeLesson: "Usar a intensidade para conectar profundamente, não para controlar"
      },
      "Sagitário": {
        essence: "Você entra na vida com otimismo e expansividade. Sua presença é entusiástica, filosófica e aventureira.",
        strengths: "Otimismo contagiante, humor natural, expansividade inspiradora",
        challenges: "Parecer exagerado ou irresponsável, promessas demais",
        lifeLesson: "Manter os pés no chão enquanto aponta para as estrelas"
      },
      "Capricórnio": {
        essence: "Você entra na vida com seriedade e competência. Sua presença é madura, confiável e ambiciosa.",
        strengths: "Respeito natural, maturidade aparente, competência visível",
        challenges: "Parecer frio ou distante, severidade excessiva",
        lifeLesson: "Mostrar calor humano por trás da seriedade"
      },
      "Aquário": {
        essence: "Você entra na vida com originalidade e desapego. Sua presença é única, progressista e intelectualmente estimulante.",
        strengths: "Originalidade natural, mente aberta visível, amizade fácil",
        challenges: "Parecer excêntrico ou distante, frieza aparente",
        lifeLesson: "Conectar emocionalmente enquanto mantém individualidade"
      },
      "Peixes": {
        essence: "Você entra na vida com sensibilidade e fluidez. Sua presença é gentil, artística e espiritualmente perceptiva.",
        strengths: "Compaixão visível, adaptabilidade, presença etérea e encantadora",
        challenges: "Parecer vago ou evasivo, limites fracos visíveis",
        lifeLesson: "Manter presença terrena enquanto flui espiritualmente"
      }
    }
  },
  midheaven: {
    name: "Meio do Céu (MC)",
    symbol: "⭐",
    archetype: "O Topo da Montanha",
    keywords: ["Vocação", "Reputação", "Legado", "Autoridade"],
    deepMeaning: "O Meio do Céu é o ponto mais alto do seu mapa — literalmente acima da sua cabeça no momento do nascimento. Representa sua vocação mais elevada, como você quer ser lembrado, e o papel que você desempenha no mundo público. É a montanha que você está destinado a escalar e a vista que terá do topo.",
    questions: [
      "Pelo que você gostaria de ser reconhecido profissionalmente?",
      "Qual impacto você quer ter no mundo maior?",
      "Quem você admira e por quê isso revela sobre sua própria vocação?"
    ],
    howToWork: "Alinhe sua carreira e contribuição pública com a energia do seu Meio do Céu. Não precisa ser uma profissão específica, mas o estilo e valores que você traz para qualquer trabalho. É seu 'chamado' — ouça-o e honre-o.",
    signInterpretations: {
      "Áries": {
        essence: "Sua vocação envolve liderança pioneira, empreendedorismo e abrir caminhos onde outros não ousam.",
        strengths: "Capacidade de iniciar projetos, liderança corajosa, identidade profissional forte",
        challenges: "Conflitos com autoridade, impaciência na carreira, queimar pontes",
        lifeLesson: "Liderar com coragem e também com consideração pelos outros"
      },
      "Touro": {
        essence: "Sua vocação envolve construir valor duradouro, trazer beleza ao mundo e criar segurança material.",
        strengths: "Persistência profissional, senso de valor, construção de legado tangível",
        challenges: "Resistência a mudanças de carreira, possessividade sobre conquistas",
        lifeLesson: "Construir com paciência enquanto permanece aberto a novas formas de valor"
      },
      "Gêmeos": {
        essence: "Sua vocação envolve comunicação, educação, conectar ideias e pessoas.",
        strengths: "Versatilidade profissional, habilidades de comunicação, adaptabilidade de carreira",
        challenges: "Dispersão profissional, dificuldade de escolher uma direção, superficialidade",
        lifeLesson: "Encontrar profundidade na diversidade, criar pontes entre mundos diferentes"
      },
      "Câncer": {
        essence: "Sua vocação envolve nutrir, proteger e criar ambientes de cuidado em larga escala.",
        strengths: "Liderança maternal/paternal, intuição empresarial, criar ambientes acolhedores",
        challenges: "Levar rejeição profissional para o pessoal, apego a posições",
        lifeLesson: "Cuidar do mundo enquanto mantém limites saudáveis"
      },
      "Leão": {
        essence: "Sua vocação envolve criatividade, liderança carismática e inspirar outros com sua luz.",
        strengths: "Carisma profissional, criatividade, capacidade de inspirar equipes",
        challenges: "Necessidade de reconhecimento, drama profissional, ego ferido por críticas",
        lifeLesson: "Brilhar autenticamente e ajudar outros a brilharem também"
      },
      "Virgem": {
        essence: "Sua vocação envolve serviço, aperfeiçoamento e trazer ordem e eficiência ao mundo.",
        strengths: "Excelência profissional, atenção aos detalhes, dedicação ao serviço",
        challenges: "Perfeccionismo paralisante, não receber crédito merecido, autocrítica",
        lifeLesson: "Servir com excelência enquanto reconhece o próprio valor"
      },
      "Libra": {
        essence: "Sua vocação envolve criar harmonia, justiça, beleza e equilibrar relações em escala social.",
        strengths: "Diplomacia profissional, senso de justiça, criação de parcerias",
        challenges: "Indecisão sobre direção, dependência de parceiros, evitar conflitos necessários",
        lifeLesson: "Criar justiça e beleza mesmo quando isso requer confronto"
      },
      "Escorpião": {
        essence: "Sua vocação envolve transformação, investigação profunda e facilitar renascimentos.",
        strengths: "Poder transformador, capacidade de lidar com crises, percepção psicológica",
        challenges: "Lutas de poder, obsessão profissional, segredos na carreira",
        lifeLesson: "Usar poder para transformar positivamente, não para controlar"
      },
      "Sagitário": {
        essence: "Sua vocação envolve expandir horizontes, ensinar verdades maiores e inspirar fé.",
        strengths: "Visão expansiva, capacidade de inspirar, conexão com significado maior",
        challenges: "Prometer demais, falta de foco, dogmatismo profissional",
        lifeLesson: "Expandir fronteiras enquanto mantém compromissos concretos"
      },
      "Capricórnio": {
        essence: "Sua vocação envolve construir estruturas duradouras, conquistar posições de autoridade e deixar legado.",
        strengths: "Ambição saudável, planejamento estratégico, autoridade natural",
        challenges: "Workaholic, rigidez, sacrificar vida pessoal por carreira",
        lifeLesson: "Construir sucesso que inclua felicidade, não apenas conquistas"
      },
      "Aquário": {
        essence: "Sua vocação envolve inovação, reforma social e trazer o futuro para o presente.",
        strengths: "Pensamento inovador, visão de futuro, capacidade de liderar mudanças",
        challenges: "Rebeldia improdutiva, alienação, ideais demais longe da realidade",
        lifeLesson: "Inovar de forma que conecte com as necessidades humanas reais"
      },
      "Peixes": {
        essence: "Sua vocação envolve curar, criar arte e conectar outros com o transcendente.",
        strengths: "Compaixão em ação, criatividade ilimitada, conexão espiritual pública",
        challenges: "Falta de limites profissionais, desilusão com o mundo, escapismo",
        lifeLesson: "Ancorar a espiritualidade em contribuições concretas ao mundo"
      }
    }
  },
  descendant: {
    name: "Descendente (DC)",
    symbol: "⬇️",
    archetype: "O Espelho do Outro",
    keywords: ["Parcerias", "Relacionamentos", "Sombra Projetada", "Complemento"],
    deepMeaning: "O Descendente é o ponto oposto ao Ascendente — enquanto o Ascendente é como você se apresenta, o Descendente é o que você busca nos outros. Representa as qualidades que você projeta em parceiros, o que precisa integrar em si mesmo, e como você se comporta em relacionamentos íntimos. É seu complemento, sua sombra, e seu professor.",
    questions: [
      "Que qualidades você mais admira (ou critica) em parceiros?",
      "O que você busca em relacionamentos que talvez precise desenvolver em si mesmo?",
      "Que padrões se repetem em suas parcerias?"
    ],
    howToWork: "Reconheça que o Descendente mostra partes de você que você projeta nos outros. Em vez de apenas buscar essas qualidades em parceiros, trabalhe para integrá-las em si mesmo. Isso cria relacionamentos mais equilibrados e menos dependentes.",
    signInterpretations: {
      "Áries": {
        essence: "Você busca parceiros dinâmicos, corajosos e diretos. Precisa integrar mais assertividade em si mesmo.",
        strengths: "Atração por pessoas fortes, relacionamentos energizantes, admiração por coragem",
        challenges: "Conflitos com parceiros, projetar agressividade, dependência de outros para iniciativa",
        lifeLesson: "Integrar coragem própria, criar parcerias de iguais guerreiros"
      },
      "Touro": {
        essence: "Você busca parceiros estáveis, sensuais e confiáveis. Precisa integrar mais constância em si mesmo.",
        strengths: "Atração por segurança, relacionamentos estáveis, valorização de lealdade",
        challenges: "Possessividade em relações, projetar teimosia, dependência material de parceiros",
        lifeLesson: "Criar própria estabilidade interior, relacionar-se sem possuir"
      },
      "Gêmeos": {
        essence: "Você busca parceiros comunicativos, versáteis e mentalmente estimulantes. Precisa integrar mais curiosidade.",
        strengths: "Atração por inteligência, relacionamentos conversacionais, variedade",
        challenges: "Parceiros inconsistentes, projetar superficialidade, relacionamentos mentais demais",
        lifeLesson: "Desenvolver própria versatilidade, comunicar-se autenticamente"
      },
      "Câncer": {
        essence: "Você busca parceiros nutritivos, emocionalmente disponíveis e protetores. Precisa integrar mais cuidado.",
        strengths: "Atração por calor emocional, relacionamentos íntimos, criação de lar",
        challenges: "Parceiros dependentes, projetar carência, relacionamentos simbióticos",
        lifeLesson: "Nutrir a si mesmo primeiro, relacionar-se sem se perder no outro"
      },
      "Leão": {
        essence: "Você busca parceiros expressivos, generosos e carismáticos. Precisa integrar mais expressividade.",
        strengths: "Atração por pessoas brilhantes, relacionamentos criativos, admiração mútua",
        challenges: "Parceiros dramáticos, projetar necessidade de atenção, competição por holofotes",
        lifeLesson: "Desenvolver próprio brilho, celebrar o brilho do outro sem se ofuscar"
      },
      "Virgem": {
        essence: "Você busca parceiros práticos, úteis e organizados. Precisa integrar mais discernimento.",
        strengths: "Atração por competência, relacionamentos úteis, melhoria mútua",
        challenges: "Criticar parceiros, projetar perfeccionismo, relacionamentos de 'conserto'",
        lifeLesson: "Aceitar imperfeições alheias, ser útil sem ser crítico"
      },
      "Libra": {
        essence: "Você busca parceiros harmoniosos, justos e esteticamente conscientes. Precisa integrar mais diplomacia.",
        strengths: "Atração por equilíbrio, relacionamentos harmoniosos, parcerias justas",
        challenges: "Dependência de parcerias, projetar indecisão, evitar conflitos",
        lifeLesson: "Ser completo sozinho, relacionar-se como escolha não necessidade"
      },
      "Escorpião": {
        essence: "Você busca parceiros intensos, profundos e transformadores. Precisa integrar mais intimidade.",
        strengths: "Atração por intensidade, relacionamentos transformadores, conexões profundas",
        challenges: "Parceiros controladores, projetar manipulação, relacionamentos dramáticos",
        lifeLesson: "Abraçar própria profundidade, amar sem controlar"
      },
      "Sagitário": {
        essence: "Você busca parceiros aventureiros, filosóficos e expansivos. Precisa integrar mais liberdade interior.",
        strengths: "Atração por crescimento, relacionamentos expansivos, aventuras conjuntas",
        challenges: "Parceiros incomitados, projetar irresponsabilidade, relacionamentos instáveis",
        lifeLesson: "Desenvolver própria filosofia, dar liberdade sem se perder"
      },
      "Capricórnio": {
        essence: "Você busca parceiros maduros, responsáveis e bem-sucedidos. Precisa integrar mais estrutura própria.",
        strengths: "Atração por maturidade, relacionamentos estáveis, construção conjunta",
        challenges: "Parceiros controladores, projetar rigidez, relacionamentos hierárquicos",
        lifeLesson: "Construir própria autoridade, relacionar-se como iguais"
      },
      "Aquário": {
        essence: "Você busca parceiros únicos, independentes e intelectualmente livres. Precisa integrar mais originalidade.",
        strengths: "Atração por originalidade, relacionamentos não-convencionais, amizade romântica",
        challenges: "Parceiros distantes, projetar frieza, relacionamentos desconectados emocionalmente",
        lifeLesson: "Desenvolver própria individualidade, conectar emocionalmente com liberdade"
      },
      "Peixes": {
        essence: "Você busca parceiros sensíveis, espirituais e compassivos. Precisa integrar mais fluidez.",
        strengths: "Atração por sensibilidade, relacionamentos espirituais, fusão romântica",
        challenges: "Parceiros evasivos, projetar vitimização, relacionamentos ilusórios",
        lifeLesson: "Desenvolver própria espiritualidade, amar com os olhos abertos"
      }
    }
  },
  imumCoeli: {
    name: "Fundo do Céu (IC)",
    symbol: "🌑",
    archetype: "As Raízes da Alma",
    keywords: ["Lar", "Família", "Herança Ancestral", "Fundação Interna"],
    deepMeaning: "O Fundo do Céu é o ponto mais profundo do seu mapa — literalmente abaixo dos seus pés no momento do nascimento. Representa suas raízes, sua família de origem, sua herança ancestral e o fundamento psicológico sobre o qual você constrói sua vida. É sua 'casa interna', o lugar para onde você retorna quando precisa se reconectar consigo mesmo.",
    questions: [
      "Como era o ambiente emocional da sua infância?",
      "Que padrões familiares você carrega (conscientemente ou não)?",
      "Onde e como você se sente verdadeiramente 'em casa'?"
    ],
    howToWork: "Explore conscientemente sua herança familiar — os presentes e as feridas. O IC não é destino, mas raiz. Você pode cultivar novas flores a partir das mesmas raízes. Crie um lar (interno e externo) que honre sua herança enquanto a transforma.",
    signInterpretations: {
      "Áries": {
        essence: "Suas raízes envolvem independência, competição familiar ou necessidade de se afirmar desde cedo. Seu lar interno é um campo de batalha que se tornou força.",
        strengths: "Força interior forjada cedo, independência fundamental, resiliência",
        challenges: "Raiva guardada da infância, competição com família, dificuldade de pedir ajuda",
        lifeLesson: "Transformar a luta inicial em coragem adulta, fazer as pazes com o passado combativo"
      },
      "Touro": {
        essence: "Suas raízes envolvem estabilidade material, tradições sensoriais e valores familiares sólidos. Seu lar interno é um jardim cultivado.",
        strengths: "Base sólida, tradições nutritivas, senso de valor herdado",
        challenges: "Apego a bens familiares, resistência a mudar padrões, valores rígidos",
        lifeLesson: "Honrar tradições enquanto cria novas raízes, valorizar além do material"
      },
      "Gêmeos": {
        essence: "Suas raízes envolvem comunicação, múltiplas influências familiares ou mudanças frequentes. Seu lar interno é uma biblioteca.",
        strengths: "Adaptabilidade desde cedo, inteligência estimulada, versatilidade",
        challenges: "Raízes instáveis, comunicação familiar superficial, dificuldade de profundidade",
        lifeLesson: "Criar profundidade a partir da diversidade, encontrar lar na mente"
      },
      "Câncer": {
        essence: "Suas raízes são profundamente emocionais, matriarcais e conectadas com memórias afetivas. Seu lar interno é um ninho.",
        strengths: "Conexão emocional forte com família, intuição herdada, nutrição natural",
        challenges: "Apego excessivo ao passado, dificuldade de cortar cordão umbilical",
        lifeLesson: "Criar próprio lar emocional, nutrir enquanto liberta"
      },
      "Leão": {
        essence: "Suas raízes envolvem criatividade, expressividade familiar ou figuras paternas/maternas dominantes. Seu lar interno é um palco.",
        strengths: "Orgulho familiar saudável, criatividade herdada, calor no lar",
        challenges: "Drama familiar, necessidade de ser especial na família, competição por atenção",
        lifeLesson: "Brilhar a partir das raízes, honrar linhagem sem se perder nela"
      },
      "Virgem": {
        essence: "Suas raízes envolvem serviço, rotinas estruturadas ou crítica familiar. Seu lar interno é uma oficina organizada.",
        strengths: "Eficiência herdada, humildade de raiz, capacidade de servir naturalmente",
        challenges: "Crítica internalizada da infância, perfeccionismo aprendido, preocupação",
        lifeLesson: "Transformar crítica em discernimento, servir com amor não obrigação"
      },
      "Libra": {
        essence: "Suas raízes envolvem harmonia, parcerias familiares ou necessidade de equilibrar conflitos em casa. Seu lar interno é um salão equilibrado.",
        strengths: "Diplomacia herdada, senso estético de raiz, harmonia natural",
        challenges: "Evitar conflitos familiares, identidade moldada por outros, codependência",
        lifeLesson: "Criar harmonia que inclua autenticidade, equilibrar sem se anular"
      },
      "Escorpião": {
        essence: "Suas raízes envolvem intensidade, segredos familiares ou transformações profundas. Seu lar interno é uma caverna de tesouros e sombras.",
        strengths: "Força forjada em crises, percepção psicológica profunda, resiliência",
        challenges: "Segredos familiares, poder e controle no lar, traumas não processados",
        lifeLesson: "Iluminar as sombras familiares, transformar herança em poder curativo"
      },
      "Sagitário": {
        essence: "Suas raízes envolvem expansão, culturas diversas ou busca filosófica. Seu lar interno é um templo de sabedoria.",
        strengths: "Visão ampla desde cedo, otimismo herdado, fé fundamental",
        challenges: "Raízes nômades, fuga do lar, dificuldade de estabelecer base",
        lifeLesson: "Encontrar lar no significado, expandir a partir de raízes sólidas"
      },
      "Capricórnio": {
        essence: "Suas raízes envolvem estrutura, responsabilidade precoce ou herança de trabalho duro. Seu lar interno é uma fortaleza.",
        strengths: "Responsabilidade desde cedo, estrutura sólida, respeito por ancestrais",
        challenges: "Frieza emocional no lar, peso de expectativas, amadurecimento forçado",
        lifeLesson: "Construir calor dentro da estrutura, honrar ancestrais com alegria"
      },
      "Aquário": {
        essence: "Suas raízes envolvem originalidade, família não-convencional ou sensação de ser diferente. Seu lar interno é um laboratório.",
        strengths: "Originalidade de berço, liberdade interior, perspectiva única",
        challenges: "Alienação familiar, sensação de não pertencer, distância emocional",
        lifeLesson: "Pertencer sem conformar, criar família escolhida honrando a de origem"
      },
      "Peixes": {
        essence: "Suas raízes envolvem sensibilidade, espiritualidade ou confusão de limites familiares. Seu lar interno é um oceano de memórias.",
        strengths: "Compaixão aprendida em casa, imaginação herdada, conexão espiritual ancestral",
        challenges: "Limites fracos com família, absorção de problemas alheios, escapismo",
        lifeLesson: "Ancorar a sensibilidade em limites saudáveis, curar linhagem com consciência"
      }
    }
  }
};

// Interpretações profundas para elementos
export const deepElementInterpretations = {
  Fogo: {
    symbol: "🔥",
    archetype: "O Espírito Criador",
    essence: "O Fogo é a centelha da criação, a força que inicia, inspira e transforma. É pura energia de vida, sem medo de se consumir enquanto ilumina o caminho. Pessoas com forte ênfase em Fogo carregam uma chama interior que precisa se expressar — em ação, criatividade, liderança ou aventura.",
    gifts: [
      "Entusiasmo contagiante que inspira outros",
      "Coragem de começar onde outros hesitam",
      "Capacidade de renovação — como a fênix, você sempre renasce",
      "Autenticidade natural — você não sabe ser falso"
    ],
    shadows: [
      "Impulsividade que queima antes de pensar",
      "Impaciência com processos lentos ou pessoas cautelosas",
      "Egocentrismo inconsciente — dificuldade de ver além de si",
      "Burnout por não saber diminuir a chama"
    ],
    howToBalance: "O Fogo precisa de combustível (propósito) e oxigênio (espaço). Sem direção, queima-se inutilmente. Cultive a sabedoria de saber quando avançar e quando aquecer suavemente. Aprenda com a Terra a paciência, com o Ar a perspectiva, e com a Água a sensibilidade aos outros."
  },
  Terra: {
    symbol: "🌍",
    archetype: "O Construtor Sábio",
    essence: "A Terra é a manifestação, a capacidade de trazer ideias para a realidade tangível. É a força que constrói, persiste e valoriza o que é real e útil. Pessoas com forte ênfase em Terra são os pilares do mundo prático — sem elas, sonhos permaneceriam apenas sonhos.",
    gifts: [
      "Capacidade de manifestar e construir coisas duradouras",
      "Paciência para processos de longo prazo",
      "Senso prático que resolve problemas concretos",
      "Confiabilidade que outros podem depender"
    ],
    shadows: [
      "Resistência excessiva a mudanças necessárias",
      "Materialismo que esquece valores intangíveis",
      "Pessimismo disfarçado de 'realismo'",
      "Estagnação na zona de conforto"
    ],
    howToBalance: "A Terra precisa ser cultivada, não apenas habitada. Sem movimento, torna-se árida. Cultive flexibilidade e abertura ao novo. Aprenda com o Fogo a iniciativa, com o Ar a leveza, e com a Água a fluidez emocional."
  },
  Ar: {
    symbol: "💨",
    archetype: "O Mensageiro Cósmico",
    essence: "O Ar é o pensamento, a comunicação, a capacidade de conectar ideias e pessoas. É a força que circula, questiona e mantém a mente em movimento. Pessoas com forte ênfase em Ar são os tradutores do universo — transformando experiência em conceito, conceito em palavra, palavra em conexão.",
    gifts: [
      "Inteligência versátil que vê múltiplos ângulos",
      "Comunicação que constrói pontes entre mundos",
      "Sociabilidade natural e genuíno interesse pelos outros",
      "Capacidade de manter perspectiva e objetividade"
    ],
    shadows: [
      "Racionalização excessiva de emoções",
      "Dispersão mental sem completar o que começa",
      "Superficialidade — saber um pouco de tudo, muito de nada",
      "Desconexão do corpo e das emoções"
    ],
    howToBalance: "O Ar precisa de direção ou se torna tornado sem propósito. Cultive ancoragem no corpo e nas emoções. Aprenda com o Fogo o foco, com a Terra a persistência, e com a Água a profundidade emocional."
  },
  Água: {
    symbol: "💧",
    archetype: "O Curador Intuitivo",
    essence: "A Água é a emoção, a intuição, a capacidade de sentir profundamente e conectar-se com o invisível. É a força que flui, adapta e penetra os mistérios da alma. Pessoas com forte ênfase em Água são os sensitivos do zodíaco — elas percebem o que outros não veem e sentem o que outros não sentem.",
    gifts: [
      "Empatia profunda que cura e conecta",
      "Intuição que conhece sem explicação racional",
      "Imaginação rica e criatividade artística",
      "Capacidade de transformação emocional profunda"
    ],
    shadows: [
      "Absorção das emoções alheias sem limites",
      "Oscilações de humor como marés incontroláveis",
      "Fuga da realidade em fantasia ou escapismo",
      "Vitimização e dificuldade de responsabilidade"
    ],
    howToBalance: "A Água precisa de margens ou se torna inundação. Cultive limites saudáveis e ancoragem na realidade. Aprenda com o Fogo a ação, com a Terra a estrutura, e com o Ar a perspectiva objetiva."
  }
};
