import jsPDF from 'jspdf';
import { ChartData } from './astroCalculations';
import { signElements } from '@/data/astrologyData';
import { bigSixInterpretations, deepElementInterpretations } from '@/data/bigSixInterpretations';
import { houseInterpretations, getSignInfluenceForHouse } from '@/data/houseInterpretations';

function parseISODateOnly(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function formatBirthDatePtBR(dateValue: unknown, birthDateISO?: string): string {
  const raw = (birthDateISO ?? dateValue) as any;
  if (typeof raw === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return parseISODateOnly(raw).toLocaleDateString('pt-BR');
  }
  const d = raw instanceof Date ? raw : new Date(raw);
  return d.toLocaleDateString('pt-BR');
}

interface PDFOptions {
  chartData: ChartData;
  userName: string;
  birthPlace: string;
  isPremium?: boolean;
  birthDateISO?: string;
}

export async function generateChartPDF({
  chartData,
  userName,
  birthPlace,
  isPremium = false,
  birthDateISO,
}: PDFOptions): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // If not premium, generate simplified PDF
  if (!isPremium) {
    return generateSimplifiedPDF(doc, chartData, userName, birthPlace, birthDateISO);
  }

  // Helper functions
  const centerText = (text: string, y: number, size: number = 12) => {
    doc.setFontSize(size);
    doc.text(text, pageWidth / 2, y, { align: 'center' });
  };

  const addSection = (title: string) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    yPos += 12;
    doc.setFontSize(14);
    doc.setTextColor(139, 92, 246);
    doc.text(title, margin, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 8;
  };

  const addSubSection = (title: string) => {
    if (yPos > 260) {
      doc.addPage();
      yPos = 20;
    }
    yPos += 8;
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(title, margin, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 6;
  };

  const addLine = (text: string, indent: number = 0, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2 - indent);
    lines.forEach((line: string) => {
      if (yPos > 275) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, margin + indent, yPos);
      yPos += fontSize * 0.45;
    });
  };

  const addBoldLine = (label: string, value: string, indent: number = 0) => {
    if (yPos > 275) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(label, margin + indent, yPos);
    const labelWidth = doc.getTextWidth(label);
    doc.setFont('helvetica', 'normal');
    doc.text(value, margin + indent + labelWidth + 2, yPos);
    yPos += 5;
  };

  // Header
  doc.setFillColor(30, 27, 75);
  doc.rect(0, 0, pageWidth, 55, 'F');
  
  doc.setTextColor(255, 215, 0);
  centerText('MAPA ASTRAL COMPLETO', 18, 22);
  doc.setTextColor(255, 255, 255);
  centerText(userName, 32, 18);
  
  const birthDate = formatBirthDatePtBR(chartData.birthData.date, birthDateISO);
  centerText(`${birthDate} às ${chartData.birthData.time}`, 44, 11);
  centerText(birthPlace, 52, 10);
  
  doc.setTextColor(0, 0, 0);
  yPos = 65;

  // ========== BIG SIX SECTION ==========
  addSection('✨ SUA ESSÊNCIA ASTROLÓGICA - O BIG SIX');
  
  const sunSign = chartData.planets.find(p => p.planet === 'Sol')?.sign || '';
  const moonSign = chartData.planets.find(p => p.planet === 'Lua')?.sign || '';

  // Sun interpretation
  const sunInterp = bigSixInterpretations.sun;
  const sunSignInterp = sunInterp.signInterpretations[sunSign as keyof typeof sunInterp.signInterpretations];
  
  addSubSection(`☀️ SOL EM ${sunSign.toUpperCase()} - ${sunInterp.archetype}`);
  addLine(sunInterp.deepMeaning, 5, 9);
  yPos += 3;
  if (sunSignInterp) {
    addLine(`Sua essência: ${sunSignInterp.essence}`, 5, 9);
    yPos += 2;
    addBoldLine('Forças: ', sunSignInterp.strengths, 5);
    addBoldLine('Desafios: ', sunSignInterp.challenges, 5);
    addBoldLine('Lição de vida: ', sunSignInterp.lifeLesson, 5);
  }

  // Moon interpretation
  const moonInterp = bigSixInterpretations.moon;
  const moonSignInterp = moonInterp.signInterpretations[moonSign as keyof typeof moonInterp.signInterpretations];
  
  yPos += 5;
  addSubSection(`🌙 LUA EM ${moonSign.toUpperCase()} - ${moonInterp.archetype}`);
  addLine(moonInterp.deepMeaning, 5, 9);
  yPos += 3;
  if (moonSignInterp) {
    addLine(`Sua essência emocional: ${moonSignInterp.essence}`, 5, 9);
    yPos += 2;
    addBoldLine('Forças: ', moonSignInterp.strengths, 5);
    addBoldLine('Desafios: ', moonSignInterp.challenges, 5);
    addBoldLine('Lição de vida: ', moonSignInterp.lifeLesson, 5);
  }

  // Ascendant interpretation
  const ascInterp = bigSixInterpretations.ascendant;
  const ascSign = chartData.ascendant.sign;
  const ascSignInterp = ascInterp.signInterpretations[ascSign as keyof typeof ascInterp.signInterpretations];
  
  yPos += 5;
  addSubSection(`⬆️ ASCENDENTE EM ${ascSign.toUpperCase()} - ${ascInterp.archetype}`);
  addLine(ascInterp.deepMeaning, 5, 9);
  yPos += 3;
  if (ascSignInterp) {
    addLine(`Como você se apresenta: ${ascSignInterp.essence}`, 5, 9);
    yPos += 2;
    addBoldLine('Forças: ', ascSignInterp.strengths, 5);
    addBoldLine('Desafios: ', ascSignInterp.challenges, 5);
    addBoldLine('Lição de vida: ', ascSignInterp.lifeLesson, 5);
  }

  // Midheaven interpretation
  const mcInterp = bigSixInterpretations.midheaven;
  const mcSign = chartData.midheaven.sign;
  const mcSignInterp = mcInterp.signInterpretations[mcSign as keyof typeof mcInterp.signInterpretations];
  
  yPos += 5;
  addSubSection(`⭐ MEIO DO CÉU EM ${mcSign.toUpperCase()} - ${mcInterp.archetype}`);
  addLine(mcInterp.deepMeaning, 5, 9);
  yPos += 3;
  if (mcSignInterp) {
    addLine(`Sua vocação: ${mcSignInterp.essence}`, 5, 9);
    yPos += 2;
    addBoldLine('Forças: ', mcSignInterp.strengths, 5);
    addBoldLine('Desafios: ', mcSignInterp.challenges, 5);
    addBoldLine('Lição de vida: ', mcSignInterp.lifeLesson, 5);
  }

  // Descendant interpretation
  if (chartData.descendant) {
    const dcInterp = bigSixInterpretations.descendant;
    const dcSign = chartData.descendant.sign;
    const dcSignInterp = dcInterp.signInterpretations[dcSign as keyof typeof dcInterp.signInterpretations];
    
    yPos += 5;
    addSubSection(`⬇️ DESCENDENTE EM ${dcSign.toUpperCase()} - ${dcInterp.archetype}`);
    addLine(dcInterp.deepMeaning, 5, 9);
    yPos += 3;
    if (dcSignInterp) {
      addLine(`Nas parcerias: ${dcSignInterp.essence}`, 5, 9);
      yPos += 2;
      addBoldLine('Forças: ', dcSignInterp.strengths, 5);
      addBoldLine('Desafios: ', dcSignInterp.challenges, 5);
      addBoldLine('Lição de vida: ', dcSignInterp.lifeLesson, 5);
    }
  }

  // Imum Coeli interpretation
  if (chartData.imumCoeli) {
    const icInterp = bigSixInterpretations.imumCoeli;
    const icSign = chartData.imumCoeli.sign;
    const icSignInterp = icInterp.signInterpretations[icSign as keyof typeof icInterp.signInterpretations];
    
    yPos += 5;
    addSubSection(`🌑 FUNDO DO CÉU EM ${icSign.toUpperCase()} - ${icInterp.archetype}`);
    addLine(icInterp.deepMeaning, 5, 9);
    yPos += 3;
    if (icSignInterp) {
      addLine(`Suas raízes: ${icSignInterp.essence}`, 5, 9);
      yPos += 2;
      addBoldLine('Forças: ', icSignInterp.strengths, 5);
      addBoldLine('Desafios: ', icSignInterp.challenges, 5);
      addBoldLine('Lição de vida: ', icSignInterp.lifeLesson, 5);
    }
  }

  // ========== ELEMENT DISTRIBUTION ==========
  const elementCounts: Record<string, number> = { Fogo: 0, Terra: 0, Ar: 0, Água: 0 };
  chartData.planets.forEach(planet => {
    const element = signElements[planet.sign];
    if (element) elementCounts[element]++;
  });
  const dominantElement = Object.entries(elementCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const elementInfo = deepElementInterpretations[dominantElement as keyof typeof deepElementInterpretations];

  yPos += 8;
  addSection(`🔮 SEU ELEMENTO DOMINANTE: ${dominantElement.toUpperCase()}`);
  addLine(`Distribuição: Fogo (${elementCounts.Fogo}) | Terra (${elementCounts.Terra}) | Ar (${elementCounts.Ar}) | Água (${elementCounts.Água})`, 5, 9);
  yPos += 5;
  
  if (elementInfo) {
    addSubSection(`${elementInfo.symbol} ${elementInfo.archetype}`);
    addLine(elementInfo.essence, 5, 9);
    yPos += 3;
    
    addBoldLine('Dons: ', elementInfo.gifts.join('; '), 5);
    yPos += 2;
    addBoldLine('Sombras: ', elementInfo.shadows.join('; '), 5);
    yPos += 2;
    addLine(`Como equilibrar: ${elementInfo.howToBalance}`, 5, 9);
  }

  // ========== PLANETS SECTION ==========
  yPos += 8;
  addSection('🪐 POSIÇÃO DOS PLANETAS');
  
  chartData.planets.forEach(planet => {
    const degree = Math.floor(planet.degree % 30);
    const minutes = Math.floor((planet.degree % 1) * 60);
    const houseInfo = planet.house ? ` (Casa ${planet.house})` : '';
    addLine(`${planet.planet}: ${planet.sign} ${degree}°${minutes}'${houseInfo}`, 5, 10);
  });

  // ========== HOUSES SECTION ==========
  yPos += 8;
  addSection('🏠 CASAS ASTROLÓGICAS - INTERPRETAÇÕES');
  
  const signs = ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 
                 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'];
  
  // Show first 6 houses with interpretations (others on demand due to space)
  chartData.houses.slice(0, 12).forEach((houseDegree, index) => {
    const houseNumber = index + 1;
    const normalized = ((houseDegree % 360) + 360) % 360;
    const signIndex = Math.floor(normalized / 30);
    const cuspSign = signs[signIndex];
    const degreeInSign = Math.floor(normalized % 30);
    
    const houseInterp = houseInterpretations.find(h => h.number === houseNumber);
    const signInfluence = getSignInfluenceForHouse(houseNumber, cuspSign);
    const planetsInHouse = chartData.planets.filter(p => p.house === houseNumber);
    
    if (houseInterp) {
      addSubSection(`Casa ${houseNumber}: ${houseInterp.title} - ${cuspSign} ${degreeInSign}°`);
      
      // Show archetype and keywords
      addLine(`Arquétipo: ${houseInterp.archetype} | Regente: ${houseInterp.naturalRuler}`, 5, 8);
      addLine(`Palavras-chave: ${houseInterp.keywords.join(', ')}`, 5, 8);
      yPos += 2;
      
      // Show personalized interpretation
      if (signInfluence) {
        addLine(signInfluence, 5, 9);
      }
      
      // Show planets in house if any
      if (planetsInHouse.length > 0) {
        const planetsList = planetsInHouse.map(p => `${p.planet} em ${p.sign}`).join(', ');
        addLine(`Planetas nesta casa: ${planetsList}`, 5, 9);
      }
      
      yPos += 3;
    }
  });

  // ========== ASPECTS SECTION ==========
  if (chartData.aspects && chartData.aspects.length > 0) {
    yPos += 8;
    addSection('✨ ASPECTOS PRINCIPAIS');
    
    const aspectDescriptions: Record<string, string> = {
      'Conjunção': 'fusão de energias',
      'Sextil': 'oportunidade harmônica',
      'Quadratura': 'tensão criativa',
      'Trígono': 'fluxo natural',
      'Oposição': 'polaridade consciente'
    };
    
    const mainAspects = chartData.aspects.slice(0, 12);
    mainAspects.forEach(aspect => {
      const desc = aspectDescriptions[aspect.type] || '';
      addLine(`${aspect.planet1} ${aspect.type} ${aspect.planet2} (${aspect.orb.toFixed(1)}°) - ${desc}`, 5, 9);
    });
    
    if (chartData.aspects.length > 12) {
      addLine(`... e mais ${chartData.aspects.length - 12} aspectos no seu mapa`, 5, 9);
    }
  }

  // ========== ANNUAL FORECAST 2026 SECTION ==========
  doc.addPage();
  yPos = 20;
  
  doc.setFillColor(30, 27, 75);
  doc.rect(0, 0, pageWidth, 45, 'F');
  doc.setTextColor(255, 215, 0);
  centerText('🔮 PREVISÃO ANUAL 2026', 18, 18);
  doc.setTextColor(255, 255, 255);
  centerText('Tendências e oportunidades para o seu ano', 32, 11);
  doc.setTextColor(0, 0, 0);
  yPos = 55;

  addSubSection('📅 VISÃO GERAL PARA 2026');
  addLine('Com base nas posições do seu mapa natal, 2026 traz oportunidades de crescimento e transformação. Os trânsitos planetários deste ano ativam áreas específicas da sua vida.', 5, 9);
  yPos += 5;

  addSubSection('💫 ÁREAS EM DESTAQUE');
  addLine(`• Sol em ${sunSign}: Foco em autoexpressão e propósito de vida. Ano para brilhar e assumir liderança.`, 5, 9);
  addLine(`• Lua em ${moonSign}: Necessidade de cuidar das emoções e nutrir relacionamentos próximos.`, 5, 9);
  addLine(`• Ascendente ${ascSign}: Novos começos e oportunidades de reinvenção pessoal.`, 5, 9);
  addLine(`• Meio do Céu ${mcSign}: Direcionamento de carreira e reconhecimento profissional.`, 5, 9);
  yPos += 5;

  addSubSection('🌟 RECOMENDAÇÕES PARA O ANO');
  addLine('1. Aproveite os períodos de Lua Nova para iniciar novos projetos.', 5, 9);
  addLine('2. Durante Mercúrio retrógrado, revise planos e evite decisões precipitadas.', 5, 9);
  addLine('3. Cultive as qualidades do seu elemento dominante para manter equilíbrio.', 5, 9);
  addLine('4. Use as tensões (quadraturas) como catalisadores de mudança positiva.', 5, 9);
  yPos += 5;

  addLine('➡️ Para uma previsão detalhada e personalizada, acesse sua Previsão 2026 completa no site!', 5, 10);

  // ========== VOCATIONAL/CAREER SECTION ==========
  yPos += 15;
  
  doc.setFillColor(34, 139, 34);
  doc.rect(0, yPos - 5, pageWidth, 35, 'F');
  doc.setTextColor(255, 255, 255);
  yPos += 10;
  centerText('💼 MAPA PROFISSIONAL E VOCACIONAL', yPos, 14);
  yPos += 12;
  centerText('Tendências de carreira baseadas no seu mapa natal', yPos, 10);
  doc.setTextColor(0, 0, 0);
  yPos += 20;

  addSubSection('🏠 CASA 6 - TRABALHO E ROTINA');
  const house6Sign = signs[Math.floor(((chartData.houses[5] % 360) + 360) % 360 / 30)];
  addLine(`Com a cúspide da Casa 6 em ${house6Sign}, você tende a funcionar melhor em ambientes de trabalho que valorizam ${house6Sign === 'Áries' ? 'ação rápida e autonomia' : house6Sign === 'Touro' ? 'estabilidade e conforto' : house6Sign === 'Gêmeos' ? 'comunicação e variedade' : house6Sign === 'Câncer' ? 'acolhimento e cuidado' : house6Sign === 'Leão' ? 'reconhecimento e criatividade' : house6Sign === 'Virgem' ? 'organização e detalhes' : house6Sign === 'Libra' ? 'harmonia e parcerias' : house6Sign === 'Escorpião' ? 'profundidade e transformação' : house6Sign === 'Sagitário' ? 'liberdade e expansão' : house6Sign === 'Capricórnio' ? 'estrutura e metas claras' : house6Sign === 'Aquário' ? 'inovação e independência' : 'intuição e fluidez'}.`, 5, 9);
  yPos += 3;

  addSubSection('⭐ CASA 10 - CARREIRA E VOCAÇÃO');
  addLine(`Com o Meio do Céu em ${mcSign}, sua vocação natural está ligada a ${mcSignInterp?.essence || 'realizações profissionais que expressem sua essência'}. Busque carreiras onde possa aplicar essas qualidades.`, 5, 9);
  yPos += 3;

  addSubSection('💰 CASA 2 - DINHEIRO E VALORES');
  const house2Sign = signs[Math.floor(((chartData.houses[1] % 360) + 360) % 360 / 30)];
  addLine(`A Casa 2 em ${house2Sign} indica que você valoriza e ganha dinheiro através de ${house2Sign === 'Áries' ? 'iniciativas próprias e pioneirismo' : house2Sign === 'Touro' ? 'segurança material e talentos artísticos' : house2Sign === 'Gêmeos' ? 'comunicação e versatilidade' : house2Sign === 'Câncer' ? 'cuidado com os outros e intuição' : house2Sign === 'Leão' ? 'criatividade e liderança' : house2Sign === 'Virgem' ? 'serviço e atenção aos detalhes' : house2Sign === 'Libra' ? 'parcerias e senso estético' : house2Sign === 'Escorpião' ? 'recursos compartilhados e pesquisa' : house2Sign === 'Sagitário' ? 'ensino e aventuras' : house2Sign === 'Capricórnio' ? 'disciplina e autoridade' : house2Sign === 'Aquário' ? 'inovação e tecnologia' : 'artes e intuição'}.`, 5, 9);
  yPos += 5;

  addSubSection('🎯 SUGESTÕES PROFISSIONAIS');
  addLine('• Considere carreiras que combinem as energias do seu Sol, Meio do Céu e Casa 6.', 5, 9);
  addLine('• Seus talentos naturais estão ligados ao elemento dominante do seu mapa.', 5, 9);
  addLine('• Evite ambientes que contradigam fortemente as necessidades da sua Lua.', 5, 9);
  yPos += 5;

  addLine('➡️ Para uma análise vocacional completa, acesse o Mapa Profissional e Vocacional no site!', 5, 10);

  // ========== FINAL PAGE - GUIDANCE ==========
  doc.addPage();
  yPos = 20;
  
  doc.setFillColor(30, 27, 75);
  doc.rect(0, 0, pageWidth, 45, 'F');
  doc.setTextColor(255, 215, 0);
  centerText('ORIENTAÇÕES PARA SUA JORNADA', 18, 16);
  doc.setTextColor(255, 255, 255);
  centerText('Como usar este mapa para seu crescimento pessoal', 32, 11);
  doc.setTextColor(0, 0, 0);
  yPos = 55;

  addSubSection('📌 PONTOS IMPORTANTES PARA LEMBRAR');
  addLine('• Seu Sol mostra quem você está se tornando - não quem você já é. É uma jornada de vida.', 5, 9);
  addLine('• Sua Lua revela suas necessidades emocionais profundas. Honrá-las é essencial para bem-estar.', 5, 9);
  addLine('• O Ascendente é sua porta de entrada para o mundo. Use-o conscientemente.', 5, 9);
  addLine('• O Meio do Céu indica sua vocação - alinhe sua carreira com essa energia.', 5, 9);
  addLine('• Os desafios (sombras) são tão importantes quanto as forças - são áreas de crescimento.', 5, 9);
  
  yPos += 8;
  addSubSection('🌱 PRÓXIMOS PASSOS');
  addLine('1. Reflita sobre as perguntas de cada seção do seu mapa astral completo online.', 5, 9);
  addLine('2. Observe como as energias descritas se manifestam no seu dia a dia.', 5, 9);
  addLine('3. Trabalhe conscientemente com os caminhos de crescimento sugeridos.', 5, 9);
  addLine('4. Lembre-se: os astros inclinam, mas não determinam. Você tem poder de escolha.', 5, 9);
  
  yPos += 10;
  addLine('Este mapa astral foi calculado com base na sua data, hora e local de nascimento exatos. Ele representa um instantâneo do céu no momento em que você nasceu, revelando tendências, potenciais e oportunidades de crescimento únicos da sua jornada.', 0, 9);
  
  yPos += 15;
  doc.setFontSize(11);
  doc.setTextColor(139, 92, 246);
  centerText('✨ Gerado por Horóscopo da Gabi ✨', yPos, 12);
  yPos += 8;
  doc.setTextColor(128, 128, 128);
  centerText(`Criado em ${new Date().toLocaleDateString('pt-BR')}`, yPos, 10);

  // Save the PDF
  const fileName = `mapa-astral-completo-${userName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  doc.save(fileName);
}

// Simplified PDF for free users
function generateSimplifiedPDF(
  doc: jsPDF,
  chartData: ChartData,
  userName: string,
  birthPlace: string,
  birthDateISO?: string
): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  const centerText = (text: string, y: number, size: number = 12) => {
    doc.setFontSize(size);
    doc.text(text, pageWidth / 2, y, { align: 'center' });
  };

  const addLine = (text: string, indent: number = 0, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2 - indent);
    lines.forEach((line: string) => {
      if (yPos > 275) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, margin + indent, yPos);
      yPos += fontSize * 0.45;
    });
  };

  // Header
  doc.setFillColor(30, 27, 75);
  doc.rect(0, 0, pageWidth, 55, 'F');
  
  doc.setTextColor(255, 215, 0);
  centerText('MAPA ASTRAL - RESUMO', 18, 22);
  doc.setTextColor(255, 255, 255);
  centerText(userName, 32, 18);
  
  const birthDate = formatBirthDatePtBR(chartData.birthData.date, birthDateISO);
  centerText(`${birthDate} às ${chartData.birthData.time}`, 44, 11);
  centerText(birthPlace, 52, 10);
  
  doc.setTextColor(0, 0, 0);
  yPos = 70;

  // Basic Big Three
  doc.setFontSize(14);
  doc.setTextColor(139, 92, 246);
  doc.text('☀️ O BÁSICO DO SEU MAPA', margin, yPos);
  doc.setTextColor(0, 0, 0);
  yPos += 12;

  const sunSign = chartData.planets.find(p => p.planet === 'Sol')?.sign || '';
  const moonSign = chartData.planets.find(p => p.planet === 'Lua')?.sign || '';
  const ascSign = chartData.ascendant.sign;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Sol em ${sunSign}`, margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  addLine('Representa sua essência, ego e propósito de vida.', 5, 9);
  yPos += 8;

  doc.setFont('helvetica', 'bold');
  doc.text(`Lua em ${moonSign}`, margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  addLine('Representa suas emoções, instintos e necessidades internas.', 5, 9);
  yPos += 8;

  doc.setFont('helvetica', 'bold');
  doc.text(`Ascendente em ${ascSign}`, margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  addLine('Representa como você se apresenta ao mundo e primeiras impressões.', 5, 9);
  yPos += 12;

  // Planets list
  doc.setFontSize(14);
  doc.setTextColor(139, 92, 246);
  doc.text('🪐 POSIÇÃO DOS PLANETAS', margin, yPos);
  doc.setTextColor(0, 0, 0);
  yPos += 10;

  chartData.planets.forEach(planet => {
    const degree = Math.floor(planet.degree % 30);
    const houseInfo = planet.house ? ` (Casa ${planet.house})` : '';
    addLine(`${planet.planet}: ${planet.sign} ${degree}°${houseInfo}`, 5, 10);
  });

  // Houses summary
  yPos += 10;
  doc.setFontSize(14);
  doc.setTextColor(139, 92, 246);
  doc.text('🏠 CÚSPIDES DAS CASAS', margin, yPos);
  doc.setTextColor(0, 0, 0);
  yPos += 10;

  const signs = ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 
                 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'];

  chartData.houses.forEach((houseDegree, index) => {
    const normalized = ((houseDegree % 360) + 360) % 360;
    const signIndex = Math.floor(normalized / 30);
    const cuspSign = signs[signIndex];
    addLine(`Casa ${index + 1}: ${cuspSign}`, 5, 10);
  });

  // Aspects count
  if (chartData.aspects && chartData.aspects.length > 0) {
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(139, 92, 246);
    doc.text('✨ ASPECTOS', margin, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 10;

    addLine(`Seu mapa possui ${chartData.aspects.length} aspectos planetários.`, 5, 10);
    
    const aspectCounts: Record<string, number> = {};
    chartData.aspects.forEach(a => {
      aspectCounts[a.type] = (aspectCounts[a.type] || 0) + 1;
    });
    
    Object.entries(aspectCounts).forEach(([type, count]) => {
      addLine(`• ${count}x ${type}`, 10, 9);
    });
  }

  // ========== ANNUAL FORECAST 2026 SUMMARY ==========
  doc.addPage();
  yPos = 20;
  
  doc.setFillColor(30, 27, 75);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(255, 215, 0);
  centerText('🔮 PREVISÃO 2026 - RESUMO', 15, 16);
  doc.setTextColor(255, 255, 255);
  centerText('Uma prévia das tendências do seu ano', 30, 10);
  doc.setTextColor(0, 0, 0);
  yPos = 50;

  doc.setFontSize(12);
  doc.setTextColor(139, 92, 246);
  doc.text('📅 Visão Geral para 2026', margin, yPos);
  doc.setTextColor(0, 0, 0);
  yPos += 10;

  addLine(`Com Sol em ${sunSign} e Lua em ${moonSign}, 2026 traz oportunidades de crescimento pessoal alinhadas com sua essência e necessidades emocionais.`, 5, 9);
  yPos += 5;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('💫 Principais Tendências:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 8;
  
  addLine(`• Autoexpressão: Ano para desenvolver as qualidades do seu Sol em ${sunSign}.`, 5, 9);
  addLine(`• Emoções: Cuidar das necessidades da sua Lua em ${moonSign} será essencial.`, 5, 9);
  addLine(`• Imagem: Seu Ascendente em ${ascSign} atrairá novas oportunidades.`, 5, 9);
  yPos += 8;

  doc.setFillColor(139, 92, 246);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 25, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  centerText('➡️ Acesse a Previsão 2026 completa no site para detalhes!', yPos + 15, 10);
  doc.setTextColor(0, 0, 0);
  yPos += 35;

  // ========== VOCATIONAL SUMMARY ==========
  doc.setFontSize(14);
  doc.setTextColor(34, 139, 34);
  doc.text('💼 MAPA VOCACIONAL - RESUMO', margin, yPos);
  doc.setTextColor(0, 0, 0);
  yPos += 12;

  const mcSign = chartData.midheaven.sign;
  const house6Sign = signs[Math.floor(((chartData.houses[5] % 360) + 360) % 360 / 30)];
  const house2Sign = signs[Math.floor(((chartData.houses[1] % 360) + 360) % 360 / 30)];

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Meio do Céu em ${mcSign}`, margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  addLine('Indica sua vocação e como deseja ser reconhecido profissionalmente.', 5, 9);
  yPos += 6;

  doc.setFont('helvetica', 'bold');
  doc.text(`Casa 6 em ${house6Sign}`, margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  addLine('Mostra como você lida com rotina de trabalho e ambiente profissional.', 5, 9);
  yPos += 6;

  doc.setFont('helvetica', 'bold');
  doc.text(`Casa 2 em ${house2Sign}`, margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  addLine('Revela como você ganha dinheiro e seus valores relacionados ao trabalho.', 5, 9);
  yPos += 10;

  doc.setFillColor(34, 139, 34);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 25, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  centerText('➡️ Acesse o Mapa Profissional e Vocacional no site!', yPos + 15, 10);
  doc.setTextColor(0, 0, 0);
  yPos += 40;

  // CTA for premium
  doc.setFillColor(139, 92, 246);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 45, 5, 5, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  centerText('🌟 Quer interpretações profundas?', yPos + 12, 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  centerText('Adquira o Mapa Astral Completo Premium e receba', yPos + 25, 10);
  centerText('análises detalhadas de todas as posições do seu mapa,', yPos + 33, 10);
  centerText('previsão 2026 completa e mapa vocacional!', yPos + 41, 10);

  yPos += 60;
  doc.setTextColor(128, 128, 128);
  centerText('✨ Gerado por Horóscopo da Gabi ✨', yPos, 11);
  yPos += 6;
  centerText(`Criado em ${new Date().toLocaleDateString('pt-BR')}`, yPos, 9);

  // Save
  const fileName = `mapa-astral-resumo-${userName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  doc.save(fileName);
}
