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

// Color palette
const colors = {
  deepPurple: [30, 27, 75],
  gold: [255, 215, 0],
  white: [255, 255, 255],
  black: [0, 0, 0],
  purple: [139, 92, 246],
  lightPurple: [167, 139, 250],
  green: [34, 197, 94],
  darkGreen: [22, 163, 74],
  amber: [245, 158, 11],
  rose: [244, 63, 94],
  gray: [128, 128, 128],
  lightGray: [229, 231, 235],
  darkGray: [75, 85, 99],
};

const signs = ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 
               'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'];

export async function generateChartPDF({
  chartData,
  userName,
  birthPlace,
  isPremium = false,
  birthDateISO,
}: PDFOptions): Promise<void> {
  const doc = new jsPDF();
  
  if (!isPremium) {
    return generateSimplifiedPDF(doc, chartData, userName, birthPlace, birthDateISO);
  }

  return generatePremiumPDF(doc, chartData, userName, birthPlace, birthDateISO);
}

// ============================================
// PREMIUM PDF - Full comprehensive version
// ============================================
function generatePremiumPDF(
  doc: jsPDF,
  chartData: ChartData,
  userName: string,
  birthPlace: string,
  birthDateISO?: string
): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = 20;

  // Helper functions
  const setColor = (color: number[]) => doc.setTextColor(color[0], color[1], color[2]);
  const setFillColor = (color: number[]) => doc.setFillColor(color[0], color[1], color[2]);
  
  const centerText = (text: string, y: number, size: number = 12) => {
    doc.setFontSize(size);
    doc.text(text, pageWidth / 2, y, { align: 'center' });
  };

  const checkPageBreak = (neededSpace: number = 30) => {
    if (yPos > pageHeight - neededSpace) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  const addLine = (text: string, indent: number = 0, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2 - indent);
    lines.forEach((line: string) => {
      checkPageBreak();
      doc.text(line, margin + indent, yPos);
      yPos += fontSize * 0.45;
    });
  };

  const addBoldLine = (label: string, value: string, indent: number = 0) => {
    checkPageBreak();
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(label, margin + indent, yPos);
    const labelWidth = doc.getTextWidth(label);
    doc.setFont('helvetica', 'normal');
    doc.text(value, margin + indent + labelWidth + 2, yPos);
    yPos += 5;
  };

  const addSectionHeader = (title: string, emoji: string, bgColor: number[] = colors.deepPurple) => {
    checkPageBreak(50);
    yPos += 8;
    setFillColor(bgColor);
    doc.roundedRect(margin - 5, yPos - 6, pageWidth - margin * 2 + 10, 14, 3, 3, 'F');
    setColor(colors.gold);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${emoji} ${title}`, margin, yPos + 3);
    doc.setFont('helvetica', 'normal');
    setColor(colors.black);
    yPos += 16;
  };

  const addSubSection = (title: string) => {
    checkPageBreak(25);
    yPos += 6;
    setColor(colors.purple);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, yPos);
    doc.setFont('helvetica', 'normal');
    setColor(colors.black);
    yPos += 7;
  };

  // Get key chart data
  const sunSign = chartData.planets.find(p => p.planet === 'Sol')?.sign || '';
  const moonSign = chartData.planets.find(p => p.planet === 'Lua')?.sign || '';
  const ascSign = chartData.ascendant.sign;
  const mcSign = chartData.midheaven.sign;
  const birthDate = formatBirthDatePtBR(chartData.birthData.date, birthDateISO);

  // ========== COVER PAGE ==========
  setFillColor(colors.deepPurple);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative elements
  setFillColor(colors.purple);
  doc.circle(pageWidth / 2, 60, 35, 'F');
  setFillColor(colors.deepPurple);
  doc.circle(pageWidth / 2, 60, 28, 'F');
  
  setColor(colors.gold);
  centerText('✦', 60, 40);
  
  setColor(colors.gold);
  centerText('MAPA ASTRAL COMPLETO', 105, 26);
  
  setColor(colors.white);
  centerText('━━━━━━━━━━━━━━━━━━━━━━━━━', 115, 10);
  
  doc.setFontSize(22);
  centerText(userName.toUpperCase(), 135, 22);
  
  setColor(colors.lightPurple);
  centerText(`${birthDate} às ${chartData.birthData.time}`, 150, 12);
  centerText(birthPlace, 162, 11);
  
  // Big Six summary box
  yPos = 180;
  setFillColor([45, 42, 95]);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 70, 5, 5, 'F');
  
  setColor(colors.gold);
  doc.setFontSize(11);
  doc.text('Sua Tríade Astrológica:', margin + 10, yPos + 15);
  
  setColor(colors.white);
  doc.setFontSize(10);
  doc.text(`☀️ Sol em ${sunSign} - Sua essência e propósito`, margin + 10, yPos + 30);
  doc.text(`🌙 Lua em ${moonSign} - Suas emoções e instintos`, margin + 10, yPos + 42);
  doc.text(`⬆️ Ascendente em ${ascSign} - Sua imagem e caminho`, margin + 10, yPos + 54);
  
  // Footer
  setColor(colors.gray);
  centerText('Horóscopo da Gabi • horoscopodagabi.com', 275, 9);
  centerText(`Gerado em ${new Date().toLocaleDateString('pt-BR')}`, 282, 8);

  // ========== PAGE 2: BIG SIX DETAILED ==========
  doc.addPage();
  yPos = 20;
  
  addSectionHeader('SUA ESSÊNCIA ASTROLÓGICA', '✨');

  // Sun
  const sunInterp = bigSixInterpretations.sun;
  const sunSignInterp = sunInterp.signInterpretations[sunSign as keyof typeof sunInterp.signInterpretations];
  
  addSubSection(`☀️ SOL EM ${sunSign.toUpperCase()}`);
  addLine(`Arquétipo: ${sunInterp.archetype}`, 3, 9);
  addLine(sunInterp.deepMeaning, 3, 9);
  yPos += 3;
  if (sunSignInterp) {
    addLine(`Essência: ${sunSignInterp.essence}`, 3, 9);
    addBoldLine('Forças: ', sunSignInterp.strengths, 3);
    addBoldLine('Desafios: ', sunSignInterp.challenges, 3);
    addBoldLine('Lição de vida: ', sunSignInterp.lifeLesson, 3);
  }

  // Moon
  const moonInterp = bigSixInterpretations.moon;
  const moonSignInterp = moonInterp.signInterpretations[moonSign as keyof typeof moonInterp.signInterpretations];
  
  yPos += 5;
  addSubSection(`🌙 LUA EM ${moonSign.toUpperCase()}`);
  addLine(`Arquétipo: ${moonInterp.archetype}`, 3, 9);
  addLine(moonInterp.deepMeaning, 3, 9);
  yPos += 3;
  if (moonSignInterp) {
    addLine(`Essência emocional: ${moonSignInterp.essence}`, 3, 9);
    addBoldLine('Forças: ', moonSignInterp.strengths, 3);
    addBoldLine('Desafios: ', moonSignInterp.challenges, 3);
    addBoldLine('Lição de vida: ', moonSignInterp.lifeLesson, 3);
  }

  // Ascendant
  const ascInterp = bigSixInterpretations.ascendant;
  const ascSignInterp = ascInterp.signInterpretations[ascSign as keyof typeof ascInterp.signInterpretations];
  
  yPos += 5;
  addSubSection(`⬆️ ASCENDENTE EM ${ascSign.toUpperCase()}`);
  addLine(`Arquétipo: ${ascInterp.archetype}`, 3, 9);
  addLine(ascInterp.deepMeaning, 3, 9);
  yPos += 3;
  if (ascSignInterp) {
    addLine(`Como você se apresenta: ${ascSignInterp.essence}`, 3, 9);
    addBoldLine('Forças: ', ascSignInterp.strengths, 3);
    addBoldLine('Desafios: ', ascSignInterp.challenges, 3);
    addBoldLine('Lição de vida: ', ascSignInterp.lifeLesson, 3);
  }

  // Midheaven
  const mcInterp = bigSixInterpretations.midheaven;
  const mcSignInterp = mcInterp.signInterpretations[mcSign as keyof typeof mcInterp.signInterpretations];
  
  yPos += 5;
  addSubSection(`⭐ MEIO DO CÉU EM ${mcSign.toUpperCase()}`);
  addLine(`Arquétipo: ${mcInterp.archetype}`, 3, 9);
  addLine(mcInterp.deepMeaning, 3, 9);
  yPos += 3;
  if (mcSignInterp) {
    addLine(`Sua vocação: ${mcSignInterp.essence}`, 3, 9);
    addBoldLine('Forças: ', mcSignInterp.strengths, 3);
    addBoldLine('Desafios: ', mcSignInterp.challenges, 3);
    addBoldLine('Lição de vida: ', mcSignInterp.lifeLesson, 3);
  }

  // Descendant and IC
  if (chartData.descendant) {
    const dcInterp = bigSixInterpretations.descendant;
    const dcSign = chartData.descendant.sign;
    const dcSignInterp = dcInterp.signInterpretations[dcSign as keyof typeof dcInterp.signInterpretations];
    
    yPos += 5;
    addSubSection(`⬇️ DESCENDENTE EM ${dcSign.toUpperCase()}`);
    addLine(dcInterp.deepMeaning, 3, 9);
    if (dcSignInterp) {
      addLine(`Nas parcerias: ${dcSignInterp.essence}`, 3, 9);
      addBoldLine('Forças: ', dcSignInterp.strengths, 3);
      addBoldLine('Desafios: ', dcSignInterp.challenges, 3);
    }
  }

  if (chartData.imumCoeli) {
    const icInterp = bigSixInterpretations.imumCoeli;
    const icSign = chartData.imumCoeli.sign;
    const icSignInterp = icInterp.signInterpretations[icSign as keyof typeof icInterp.signInterpretations];
    
    yPos += 5;
    addSubSection(`🌑 FUNDO DO CÉU EM ${icSign.toUpperCase()}`);
    addLine(icInterp.deepMeaning, 3, 9);
    if (icSignInterp) {
      addLine(`Suas raízes: ${icSignInterp.essence}`, 3, 9);
      addBoldLine('Forças: ', icSignInterp.strengths, 3);
    }
  }

  // ========== PAGE 3: ELEMENTS ==========
  doc.addPage();
  yPos = 20;

  const elementCounts: Record<string, number> = { Fogo: 0, Terra: 0, Ar: 0, Água: 0 };
  chartData.planets.forEach(planet => {
    const element = signElements[planet.sign];
    if (element) elementCounts[element]++;
  });
  const dominantElement = Object.entries(elementCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const elementInfo = deepElementInterpretations[dominantElement as keyof typeof deepElementInterpretations];

  addSectionHeader(`ELEMENTO DOMINANTE: ${dominantElement.toUpperCase()}`, '🔮');

  // Element distribution bar
  const barWidth = pageWidth - margin * 2 - 40;
  const totalPlanets = Object.values(elementCounts).reduce((a, b) => a + b, 0);
  
  setColor(colors.darkGray);
  doc.setFontSize(9);
  doc.text('Distribuição Elemental:', margin, yPos);
  yPos += 8;

  const elementColors: Record<string, number[]> = {
    Fogo: [239, 68, 68],
    Terra: [34, 197, 94],
    Ar: [59, 130, 246],
    Água: [99, 102, 241]
  };

  let barX = margin;
  Object.entries(elementCounts).forEach(([element, count]) => {
    const width = (count / totalPlanets) * barWidth;
    if (width > 0) {
      setFillColor(elementColors[element] || colors.gray);
      doc.roundedRect(barX, yPos, width, 10, 2, 2, 'F');
      if (width > 15) {
        setColor(colors.white);
        doc.setFontSize(7);
        doc.text(`${element}: ${count}`, barX + 3, yPos + 7);
      }
      barX += width + 2;
    }
  });
  yPos += 20;

  if (elementInfo) {
    addSubSection(`${elementInfo.symbol} ${elementInfo.archetype}`);
    addLine(elementInfo.essence, 3, 9);
    yPos += 5;
    addBoldLine('Dons naturais: ', elementInfo.gifts.join(' • '), 3);
    addBoldLine('Pontos de atenção: ', elementInfo.shadows.join(' • '), 3);
    yPos += 3;
    addLine(`Como equilibrar: ${elementInfo.howToBalance}`, 3, 9);
  }

  // ========== PLANETS SECTION ==========
  yPos += 10;
  addSectionHeader('POSIÇÃO DOS PLANETAS', '🪐');

  // Create a table-like layout for planets
  const colWidth = (pageWidth - margin * 2) / 3;
  let col = 0;
  let startY = yPos;

  chartData.planets.forEach((planet, index) => {
    const degree = Math.floor(planet.degree % 30);
    const minutes = Math.floor((planet.degree % 1) * 60);
    const houseInfo = planet.house ? `Casa ${planet.house}` : '';
    
    const x = margin + (col * colWidth);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    setColor(colors.purple);
    doc.text(planet.planet, x, yPos);
    
    doc.setFont('helvetica', 'normal');
    setColor(colors.black);
    doc.text(`${planet.sign} ${degree}°${minutes}'`, x, yPos + 4);
    if (houseInfo) {
      setColor(colors.gray);
      doc.setFontSize(8);
      doc.text(houseInfo, x, yPos + 8);
    }
    
    col++;
    if (col >= 3) {
      col = 0;
      yPos += 14;
      checkPageBreak(20);
    }
  });
  
  if (col !== 0) yPos += 14;

  // ========== HOUSES SECTION ==========
  yPos += 10;
  addSectionHeader('CASAS ASTROLÓGICAS', '🏠');

  chartData.houses.forEach((houseDegree, index) => {
    const houseNumber = index + 1;
    const normalized = ((houseDegree % 360) + 360) % 360;
    const signIndex = Math.floor(normalized / 30);
    const cuspSign = signs[signIndex];
    const degreeInSign = Math.floor(normalized % 30);
    
    const houseInterp = houseInterpretations.find(h => h.number === houseNumber);
    const signInfluence = getSignInfluenceForHouse(houseNumber, cuspSign);
    const planetsInHouse = chartData.planets.filter(p => p.house === houseNumber);
    
    if (houseInterp) {
      checkPageBreak(35);
      addSubSection(`Casa ${houseNumber}: ${houseInterp.title} - ${cuspSign} ${degreeInSign}°`);
      
      doc.setFontSize(8);
      setColor(colors.gray);
      doc.text(`Arquétipo: ${houseInterp.archetype} | Regente: ${houseInterp.naturalRuler}`, margin + 3, yPos);
      yPos += 4;
      doc.text(`Temas: ${houseInterp.keywords.slice(0, 4).join(', ')}`, margin + 3, yPos);
      setColor(colors.black);
      yPos += 5;
      
      if (signInfluence) {
        addLine(signInfluence, 3, 9);
      }
      
      if (planetsInHouse.length > 0) {
        const planetsList = planetsInHouse.map(p => `${p.planet}`).join(', ');
        setColor(colors.purple);
        doc.setFontSize(8);
        doc.text(`Planetas: ${planetsList}`, margin + 3, yPos);
        setColor(colors.black);
        yPos += 5;
      }
      
      yPos += 3;
    }
  });

  // ========== ASPECTS SECTION ==========
  if (chartData.aspects && chartData.aspects.length > 0) {
    doc.addPage();
    yPos = 20;
    
    addSectionHeader('ASPECTOS PLANETÁRIOS', '✨');
    
    const aspectDescriptions: Record<string, { emoji: string; desc: string; color: number[] }> = {
      'Conjunção': { emoji: '☌', desc: 'fusão de energias', color: colors.purple },
      'Sextil': { emoji: '⚹', desc: 'oportunidade harmônica', color: colors.green },
      'Quadratura': { emoji: '□', desc: 'tensão criativa', color: colors.rose },
      'Trígono': { emoji: '△', desc: 'fluxo natural', color: colors.green },
      'Oposição': { emoji: '☍', desc: 'polaridade consciente', color: colors.amber }
    };

    // Group aspects by type
    const aspectsByType: Record<string, typeof chartData.aspects> = {};
    chartData.aspects.forEach(aspect => {
      if (!aspectsByType[aspect.type]) aspectsByType[aspect.type] = [];
      aspectsByType[aspect.type].push(aspect);
    });

    Object.entries(aspectsByType).forEach(([type, aspects]) => {
      const info = aspectDescriptions[type] || { emoji: '•', desc: '', color: colors.gray };
      
      checkPageBreak(20);
      setColor(info.color);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${info.emoji} ${type} (${info.desc})`, margin, yPos);
      doc.setFont('helvetica', 'normal');
      yPos += 6;
      
      setColor(colors.black);
      aspects.slice(0, 6).forEach(aspect => {
        checkPageBreak();
        doc.setFontSize(9);
        doc.text(`   ${aspect.planet1} ↔ ${aspect.planet2} (orbe: ${aspect.orb.toFixed(1)}°)`, margin, yPos);
        yPos += 4;
      });
      yPos += 5;
    });
  }

  // ========== ANNUAL FORECAST 2026 ==========
  doc.addPage();
  yPos = 20;

  setFillColor(colors.deepPurple);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  setColor(colors.gold);
  centerText('🔮 PREVISÃO 2026', 20, 20);
  setColor(colors.white);
  centerText('Tendências e oportunidades para o seu ano', 35, 11);
  
  yPos = 60;
  setColor(colors.black);

  addSubSection('📅 VISÃO GERAL PARA 2026');
  addLine(`Com Sol em ${sunSign}, Lua em ${moonSign} e Ascendente em ${ascSign}, 2026 traz oportunidades únicas de crescimento alinhadas com sua essência astrológica.`, 3, 9);
  yPos += 5;

  addSubSection('💫 ÁREAS EM DESTAQUE');
  
  // Solar themes
  setFillColor([254, 243, 199]);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 25, 3, 3, 'F');
  setColor(colors.amber);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`☀️ Propósito (Sol em ${sunSign})`, margin + 5, yPos + 8);
  doc.setFont('helvetica', 'normal');
  setColor(colors.black);
  doc.setFontSize(9);
  const sunTheme = `Ano para desenvolver sua autoexpressão e brilhar com autenticidade. Foco em liderança e propósito de vida.`;
  const sunLines = doc.splitTextToSize(sunTheme, pageWidth - margin * 2 - 10);
  doc.text(sunLines, margin + 5, yPos + 16);
  yPos += 32;

  // Moon themes
  setFillColor([224, 231, 255]);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 25, 3, 3, 'F');
  setColor(colors.purple);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`🌙 Emoções (Lua em ${moonSign})`, margin + 5, yPos + 8);
  doc.setFont('helvetica', 'normal');
  setColor(colors.black);
  doc.setFontSize(9);
  const moonTheme = `Período para nutrir sua vida emocional e cuidar das suas necessidades internas. Conexões familiares em destaque.`;
  const moonLines = doc.splitTextToSize(moonTheme, pageWidth - margin * 2 - 10);
  doc.text(moonLines, margin + 5, yPos + 16);
  yPos += 32;

  // Ascendant themes
  setFillColor([220, 252, 231]);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 25, 3, 3, 'F');
  setColor(colors.green);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`⬆️ Novos começos (Ascendente ${ascSign})`, margin + 5, yPos + 8);
  doc.setFont('helvetica', 'normal');
  setColor(colors.black);
  doc.setFontSize(9);
  const ascTheme = `Oportunidades de reinvenção pessoal e novos projetos. Sua imagem e forma de se apresentar ganham destaque.`;
  const ascLines = doc.splitTextToSize(ascTheme, pageWidth - margin * 2 - 10);
  doc.text(ascLines, margin + 5, yPos + 16);
  yPos += 35;

  addSubSection('🌟 RECOMENDAÇÕES PARA O ANO');
  addLine('1. Aproveite as Luas Novas para iniciar projetos alinhados com seu Sol.', 3, 9);
  addLine('2. Durante Mercúrio retrógrado, revise e evite decisões precipitadas.', 3, 9);
  addLine('3. Cultive as qualidades do seu elemento dominante para equilíbrio.', 3, 9);
  addLine('4. Use as tensões como catalisadores de mudança positiva.', 3, 9);
  yPos += 5;

  addLine('➡️ Acesse a Previsão 2026 completa no site para análise detalhada mês a mês!', 0, 10);

  // ========== VOCATIONAL MAP ==========
  yPos += 15;

  setFillColor(colors.green);
  doc.roundedRect(margin - 5, yPos, pageWidth - margin * 2 + 10, 14, 3, 3, 'F');
  setColor(colors.white);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('💼 MAPA PROFISSIONAL E VOCACIONAL', margin, yPos + 9);
  doc.setFont('helvetica', 'normal');
  setColor(colors.black);
  yPos += 22;

  const house6Sign = signs[Math.floor(((chartData.houses[5] % 360) + 360) % 360 / 30)];
  const house2Sign = signs[Math.floor(((chartData.houses[1] % 360) + 360) % 360 / 30)];
  const house10Sign = mcSign;

  // Career indicators
  const careerData = [
    { title: `Meio do Céu em ${house10Sign}`, icon: '⭐', desc: 'Sua vocação e como deseja ser reconhecido profissionalmente.' },
    { title: `Casa 6 em ${house6Sign}`, icon: '📋', desc: 'Como você lida com rotina de trabalho e ambiente profissional.' },
    { title: `Casa 2 em ${house2Sign}`, icon: '💰', desc: 'Como você ganha dinheiro e seus valores relacionados ao trabalho.' }
  ];

  careerData.forEach(item => {
    checkPageBreak(20);
    setColor(colors.darkGreen);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${item.icon} ${item.title}`, margin, yPos);
    doc.setFont('helvetica', 'normal');
    setColor(colors.black);
    yPos += 5;
    addLine(item.desc, 3, 9);
    yPos += 3;
  });

  yPos += 5;
  addSubSection('🎯 Sugestões Profissionais');
  addLine('• Combine as energias do seu Sol, Meio do Céu e Casa 6 na escolha de carreira.', 3, 9);
  addLine('• Seus talentos naturais estão ligados ao seu elemento dominante.', 3, 9);
  addLine('• Evite ambientes que contradigam as necessidades da sua Lua.', 3, 9);
  yPos += 5;

  addLine('➡️ Acesse o Mapa Profissional e Vocacional completo no site!', 0, 10);

  // ========== FINAL PAGE ==========
  doc.addPage();
  yPos = 20;

  setFillColor(colors.deepPurple);
  doc.rect(0, 0, pageWidth, 45, 'F');
  setColor(colors.gold);
  centerText('ORIENTAÇÕES PARA SUA JORNADA', 20, 16);
  setColor(colors.white);
  centerText('Como usar este mapa para seu crescimento pessoal', 35, 10);
  yPos = 55;
  setColor(colors.black);

  addSubSection('📌 PONTOS IMPORTANTES');
  addLine('• Seu Sol mostra quem você está se tornando - é uma jornada de vida.', 3, 9);
  addLine('• Sua Lua revela necessidades emocionais profundas. Honrá-las é essencial.', 3, 9);
  addLine('• O Ascendente é sua porta de entrada para o mundo.', 3, 9);
  addLine('• O Meio do Céu indica sua vocação - alinhe sua carreira com essa energia.', 3, 9);
  addLine('• Os desafios são áreas de crescimento, não limitações.', 3, 9);
  yPos += 8;

  addSubSection('🌱 PRÓXIMOS PASSOS');
  addLine('1. Reflita sobre as perguntas de cada seção do seu mapa online.', 3, 9);
  addLine('2. Observe como as energias descritas se manifestam no seu dia a dia.', 3, 9);
  addLine('3. Trabalhe conscientemente com os caminhos de crescimento sugeridos.', 3, 9);
  addLine('4. Lembre-se: os astros inclinam, mas não determinam.', 3, 9);
  yPos += 10;

  setFillColor([45, 42, 95]);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 35, 5, 5, 'F');
  setColor(colors.white);
  centerText('Este mapa astral foi calculado com base na sua data,', yPos + 12, 9);
  centerText('hora e local de nascimento exatos, revelando tendências,', yPos + 20, 9);
  centerText('potenciais e oportunidades únicas da sua jornada.', yPos + 28, 9);
  yPos += 50;

  setColor(colors.purple);
  centerText('✨ Horóscopo da Gabi ✨', yPos, 14);
  yPos += 8;
  setColor(colors.gray);
  centerText('horoscopodagabi.com', yPos, 10);
  yPos += 6;
  centerText(`Gerado em ${new Date().toLocaleDateString('pt-BR')}`, yPos, 9);

  // Save
  const fileName = `mapa-astral-completo-${userName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  doc.save(fileName);
}

// ============================================
// FREE PDF - Simplified but still beautiful
// ============================================
function generateSimplifiedPDF(
  doc: jsPDF,
  chartData: ChartData,
  userName: string,
  birthPlace: string,
  birthDateISO?: string
): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = 20;

  const setColor = (color: number[]) => doc.setTextColor(color[0], color[1], color[2]);
  const setFillColor = (color: number[]) => doc.setFillColor(color[0], color[1], color[2]);

  const centerText = (text: string, y: number, size: number = 12) => {
    doc.setFontSize(size);
    doc.text(text, pageWidth / 2, y, { align: 'center' });
  };

  const checkPageBreak = (neededSpace: number = 30) => {
    if (yPos > pageHeight - neededSpace) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  const addLine = (text: string, indent: number = 0, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2 - indent);
    lines.forEach((line: string) => {
      checkPageBreak();
      doc.text(line, margin + indent, yPos);
      yPos += fontSize * 0.45;
    });
  };

  const addSectionHeader = (title: string, emoji: string, bgColor: number[] = colors.deepPurple) => {
    checkPageBreak(40);
    yPos += 8;
    setFillColor(bgColor);
    doc.roundedRect(margin - 5, yPos - 6, pageWidth - margin * 2 + 10, 12, 3, 3, 'F');
    setColor(colors.gold);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${emoji} ${title}`, margin, yPos + 2);
    doc.setFont('helvetica', 'normal');
    setColor(colors.black);
    yPos += 14;
  };

  // Get key data
  const sunSign = chartData.planets.find(p => p.planet === 'Sol')?.sign || '';
  const moonSign = chartData.planets.find(p => p.planet === 'Lua')?.sign || '';
  const ascSign = chartData.ascendant.sign;
  const mcSign = chartData.midheaven.sign;
  const birthDate = formatBirthDatePtBR(chartData.birthData.date, birthDateISO);

  // ========== COVER / HEADER ==========
  setFillColor(colors.deepPurple);
  doc.rect(0, 0, pageWidth, 65, 'F');

  setColor(colors.gold);
  centerText('✦ MAPA ASTRAL ✦', 20, 20);
  centerText('RESUMO', 32, 14);

  setColor(colors.white);
  centerText('━━━━━━━━━━━━━━━━━━━━', 40, 8);
  centerText(userName.toUpperCase(), 50, 16);
  
  setColor(colors.lightPurple);
  centerText(`${birthDate} às ${chartData.birthData.time} • ${birthPlace}`, 60, 9);

  yPos = 80;
  setColor(colors.black);

  // ========== BIG THREE ==========
  addSectionHeader('SUA TRÍADE ASTROLÓGICA', '✨');

  // Sun
  setFillColor([254, 243, 199]);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 28, 3, 3, 'F');
  setColor(colors.amber);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`☀️ Sol em ${sunSign}`, margin + 5, yPos + 8);
  doc.setFont('helvetica', 'normal');
  setColor(colors.black);
  doc.setFontSize(9);
  doc.text('Representa sua essência, ego e propósito de vida.', margin + 5, yPos + 16);
  doc.text('É a energia central do seu mapa e quem você está se tornando.', margin + 5, yPos + 22);
  yPos += 35;

  // Moon
  setFillColor([224, 231, 255]);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 28, 3, 3, 'F');
  setColor(colors.purple);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`🌙 Lua em ${moonSign}`, margin + 5, yPos + 8);
  doc.setFont('helvetica', 'normal');
  setColor(colors.black);
  doc.setFontSize(9);
  doc.text('Representa suas emoções, instintos e necessidades internas.', margin + 5, yPos + 16);
  doc.text('É como você se sente seguro e o que precisa para bem-estar.', margin + 5, yPos + 22);
  yPos += 35;

  // Ascendant
  setFillColor([220, 252, 231]);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 28, 3, 3, 'F');
  setColor(colors.green);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`⬆️ Ascendente em ${ascSign}`, margin + 5, yPos + 8);
  doc.setFont('helvetica', 'normal');
  setColor(colors.black);
  doc.setFontSize(9);
  doc.text('Representa como você se apresenta ao mundo e primeiras impressões.', margin + 5, yPos + 16);
  doc.text('É sua máscara social e o filtro pelo qual você vive a vida.', margin + 5, yPos + 22);
  yPos += 40;

  // ========== PLANETS ==========
  addSectionHeader('POSIÇÃO DOS PLANETAS', '🪐');

  const colWidth = (pageWidth - margin * 2) / 2;
  let col = 0;

  chartData.planets.forEach((planet, index) => {
    const degree = Math.floor(planet.degree % 30);
    const houseInfo = planet.house ? ` (Casa ${planet.house})` : '';
    
    const x = margin + (col * colWidth);
    
    doc.setFontSize(9);
    setColor(colors.purple);
    doc.setFont('helvetica', 'bold');
    doc.text(planet.planet, x, yPos);
    doc.setFont('helvetica', 'normal');
    setColor(colors.black);
    doc.text(`: ${planet.sign} ${degree}°${houseInfo}`, x + doc.getTextWidth(planet.planet), yPos);
    
    col++;
    if (col >= 2) {
      col = 0;
      yPos += 6;
      checkPageBreak(15);
    }
  });
  
  if (col !== 0) yPos += 6;
  yPos += 8;

  // ========== HOUSES ==========
  addSectionHeader('CÚSPIDES DAS CASAS', '🏠');

  col = 0;
  chartData.houses.forEach((houseDegree, index) => {
    const normalized = ((houseDegree % 360) + 360) % 360;
    const signIndex = Math.floor(normalized / 30);
    const cuspSign = signs[signIndex];
    const degInSign = Math.floor(normalized % 30);
    
    const x = margin + (col * (pageWidth - margin * 2) / 3);
    
    doc.setFontSize(9);
    setColor(colors.darkGray);
    doc.text(`Casa ${index + 1}: ${cuspSign} ${degInSign}°`, x, yPos);
    
    col++;
    if (col >= 3) {
      col = 0;
      yPos += 5;
      checkPageBreak(12);
    }
  });
  
  if (col !== 0) yPos += 5;
  yPos += 8;

  // ========== ASPECTS SUMMARY ==========
  if (chartData.aspects && chartData.aspects.length > 0) {
    addSectionHeader('ASPECTOS PLANETÁRIOS', '✨');
    
    const aspectCounts: Record<string, number> = {};
    chartData.aspects.forEach(a => {
      aspectCounts[a.type] = (aspectCounts[a.type] || 0) + 1;
    });

    doc.setFontSize(9);
    setColor(colors.black);
    doc.text(`Seu mapa possui ${chartData.aspects.length} aspectos:`, margin, yPos);
    yPos += 6;

    Object.entries(aspectCounts).forEach(([type, count]) => {
      checkPageBreak(8);
      doc.setFontSize(9);
      doc.text(`   • ${count}x ${type}`, margin, yPos);
      yPos += 5;
    });
    yPos += 8;
  }

  // ========== PAGE 2: FORECAST & VOCATIONAL ==========
  doc.addPage();
  yPos = 20;

  // Annual Forecast Preview
  setFillColor(colors.deepPurple);
  doc.rect(0, 0, pageWidth, 40, 'F');
  setColor(colors.gold);
  centerText('🔮 PREVISÃO 2026 - PRÉVIA', 18, 14);
  setColor(colors.white);
  centerText('Uma amostra das tendências do seu ano', 32, 9);
  yPos = 50;
  setColor(colors.black);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('📅 Visão Geral para 2026', margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 8;

  addLine(`Com Sol em ${sunSign} e Lua em ${moonSign}, 2026 traz oportunidades de crescimento alinhadas com sua essência.`, 3, 9);
  yPos += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Principais Tendências:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 6;

  addLine(`• Autoexpressão: Desenvolva as qualidades do seu Sol em ${sunSign}.`, 5, 9);
  addLine(`• Emoções: Cuide das necessidades da sua Lua em ${moonSign}.`, 5, 9);
  addLine(`• Imagem: Seu Ascendente em ${ascSign} atrairá oportunidades.`, 5, 9);
  yPos += 10;

  // CTA for full forecast
  setFillColor(colors.purple);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 22, 3, 3, 'F');
  setColor(colors.white);
  doc.setFontSize(9);
  centerText('➡️ Acesse a Previsão 2026 completa no site!', yPos + 9, 10);
  centerText('Análise detalhada mês a mês de todas as áreas da vida.', yPos + 17, 8);
  yPos += 35;

  // Vocational Preview
  setFillColor(colors.green);
  doc.roundedRect(margin - 5, yPos, pageWidth - margin * 2 + 10, 12, 3, 3, 'F');
  setColor(colors.white);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('💼 MAPA VOCACIONAL - PRÉVIA', margin, yPos + 8);
  doc.setFont('helvetica', 'normal');
  yPos += 20;

  const house6Sign = signs[Math.floor(((chartData.houses[5] % 360) + 360) % 360 / 30)];
  const house2Sign = signs[Math.floor(((chartData.houses[1] % 360) + 360) % 360 / 30)];

  setColor(colors.black);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`⭐ Meio do Céu em ${mcSign}`, margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 5;
  addLine('Indica sua vocação e reconhecimento profissional.', 5, 9);
  yPos += 4;

  doc.setFont('helvetica', 'bold');
  doc.text(`📋 Casa 6 em ${house6Sign}`, margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 5;
  addLine('Mostra como você lida com rotina e ambiente de trabalho.', 5, 9);
  yPos += 4;

  doc.setFont('helvetica', 'bold');
  doc.text(`💰 Casa 2 em ${house2Sign}`, margin, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 5;
  addLine('Revela como você ganha dinheiro e seus valores.', 5, 9);
  yPos += 10;

  // CTA for vocational
  setFillColor(colors.darkGreen);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 22, 3, 3, 'F');
  setColor(colors.white);
  doc.setFontSize(9);
  centerText('➡️ Acesse o Mapa Vocacional completo no site!', yPos + 9, 10);
  centerText('Descubra as melhores áreas de atuação para você.', yPos + 17, 8);
  yPos += 40;

  // ========== PREMIUM CTA ==========
  setFillColor(colors.deepPurple);
  doc.roundedRect(margin, yPos, pageWidth - margin * 2, 50, 5, 5, 'F');
  
  setColor(colors.gold);
  centerText('🌟 QUER O MAPA COMPLETO?', yPos + 14, 13);
  
  setColor(colors.white);
  doc.setFontSize(9);
  centerText('Adquira o Mapa Astral Completo Premium e receba:', yPos + 25, 9);
  centerText('✓ Interpretações profundas de todos os planetas e casas', yPos + 33, 9);
  centerText('✓ Análise completa de aspectos • Previsão 2026 detalhada', yPos + 40, 9);
  
  yPos += 65;

  // Footer
  setColor(colors.purple);
  centerText('✨ Horóscopo da Gabi ✨', yPos, 12);
  yPos += 6;
  setColor(colors.gray);
  centerText('horoscopodagabi.com', yPos, 9);
  yPos += 5;
  centerText(`Gerado em ${new Date().toLocaleDateString('pt-BR')}`, yPos, 8);

  // Save
  const fileName = `mapa-astral-resumo-${userName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  doc.save(fileName);
}
