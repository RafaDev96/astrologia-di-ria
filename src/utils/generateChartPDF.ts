import jsPDF from 'jspdf';
import { ChartData } from './astroCalculations';
import { signElements } from '@/data/astrologyData';

interface PDFOptions {
  chartData: ChartData;
  userName: string;
  birthPlace: string;
}

export async function generateChartPDF({ chartData, userName, birthPlace }: PDFOptions): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Helper functions
  const centerText = (text: string, y: number, size: number = 12) => {
    doc.setFontSize(size);
    doc.text(text, pageWidth / 2, y, { align: 'center' });
  };

  const addSection = (title: string) => {
    yPos += 15;
    doc.setFontSize(14);
    doc.setTextColor(139, 92, 246); // Primary purple
    doc.text(title, margin, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 8;
  };

  const addLine = (text: string, indent: number = 0) => {
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2 - indent);
    lines.forEach((line: string) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, margin + indent, yPos);
      yPos += 5;
    });
  };

  // Header
  doc.setFillColor(30, 27, 75);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  doc.setTextColor(255, 255, 255);
  centerText('MAPA ASTRAL COMPLETO', 20, 22);
  centerText(userName, 32, 16);
  
  const birthDate = new Date(chartData.birthData.date).toLocaleDateString('pt-BR');
  centerText(`${birthDate} às ${chartData.birthData.time} - ${birthPlace}`, 42, 10);
  
  doc.setTextColor(0, 0, 0);
  yPos = 60;

  // Big Six Section
  addSection('✨ SUA ESSÊNCIA ASTROLÓGICA');
  
  const sunSign = chartData.planets.find(p => p.planet === 'Sol')?.sign || '-';
  const moonSign = chartData.planets.find(p => p.planet === 'Lua')?.sign || '-';
  
  addLine(`☀️ Sol em ${sunSign} - Sua identidade, ego e propósito de vida`, 5);
  addLine(`🌙 Lua em ${moonSign} - Suas emoções, instintos e vida interior`, 5);
  addLine(`⬆️ Ascendente em ${chartData.ascendant.sign} - Como você se apresenta ao mundo`, 5);
  addLine(`⭐ Meio do Céu em ${chartData.midheaven.sign} - Sua carreira e imagem pública`, 5);
  if (chartData.descendant) {
    addLine(`⬇️ Descendente em ${chartData.descendant.sign} - Suas parcerias e relacionamentos`, 5);
  }
  if (chartData.imumCoeli) {
    addLine(`🌑 Fundo do Céu em ${chartData.imumCoeli.sign} - Suas raízes e vida privada`, 5);
  }

  // Element Distribution
  const elementCounts: Record<string, number> = { Fogo: 0, Terra: 0, Ar: 0, Água: 0 };
  chartData.planets.forEach(planet => {
    const element = signElements[planet.sign];
    if (element) elementCounts[element]++;
  });
  const dominantElement = Object.entries(elementCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  addSection('🔮 DISTRIBUIÇÃO DOS ELEMENTOS');
  addLine(`Fogo: ${elementCounts.Fogo} | Terra: ${elementCounts.Terra} | Ar: ${elementCounts.Ar} | Água: ${elementCounts.Água}`, 5);
  addLine(`Elemento Dominante: ${dominantElement}`, 5);

  // Planets Section
  addSection('🪐 POSIÇÃO DOS PLANETAS');
  chartData.planets.forEach(planet => {
    const degree = Math.floor(planet.degree % 30);
    const minutes = Math.floor((planet.degree % 1) * 60);
    addLine(`${planet.planet}: ${planet.sign} ${degree}°${minutes}'`, 5);
  });

  // Houses Section
  addSection('🏠 CASAS ASTROLÓGICAS');
  const signs = ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 
                 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'];
  chartData.houses.forEach((houseDegree, index) => {
    const houseNumber = index + 1;
    const normalized = ((houseDegree % 360) + 360) % 360;
    const signIndex = Math.floor(normalized / 30);
    const degreeInSign = Math.floor(normalized % 30);
    const minutes = Math.floor((normalized % 1) * 60);
    addLine(`Casa ${houseNumber}: ${signs[signIndex]} ${degreeInSign}°${minutes}'`, 5);
  });

  // Aspects Section
  if (chartData.aspects && chartData.aspects.length > 0) {
    addSection('✨ ASPECTOS PRINCIPAIS');
    const mainAspects = chartData.aspects.slice(0, 15);
    mainAspects.forEach(aspect => {
      addLine(`${aspect.planet1} ${aspect.type} ${aspect.planet2} (${aspect.orb.toFixed(1)}°)`, 5);
    });
    if (chartData.aspects.length > 15) {
      addLine(`... e mais ${chartData.aspects.length - 15} aspectos`, 5);
    }
  }

  // Footer
  doc.addPage();
  yPos = 20;
  
  doc.setFillColor(30, 27, 75);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(255, 255, 255);
  centerText('SOBRE SEU MAPA ASTRAL', 20, 16);
  doc.setTextColor(0, 0, 0);
  yPos = 50;

  addLine('Este mapa astral foi calculado com base na sua data, hora e local de nascimento. Ele representa um instantâneo do céu no momento exato em que você nasceu, revelando tendências e potenciais únicos da sua personalidade.');
  yPos += 10;
  addLine('Lembre-se: a astrologia é uma ferramenta de autoconhecimento. Os astros inclinam, mas não determinam. Você tem o poder de escolha e pode usar essas informações para seu desenvolvimento pessoal.');
  
  yPos += 20;
  doc.setFontSize(10);
  doc.setTextColor(139, 92, 246);
  centerText('Gerado por Horóscopo da Gabi', yPos, 12);
  yPos += 8;
  doc.setTextColor(128, 128, 128);
  centerText(new Date().toLocaleDateString('pt-BR'), yPos, 10);

  // Save the PDF
  const fileName = `mapa-astral-${userName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  doc.save(fileName);
}
