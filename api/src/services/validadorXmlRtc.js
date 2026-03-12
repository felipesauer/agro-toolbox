// Validador XML RTC — validates RTC (Reforma Tributária Consumo) fields in NF-e XML
// Based on NT 2025.002 v1.34 — NF-e/NFC-e layout adequation for CBS/IBS

export async function validarXmlRtc({ xml, tipoDfe = 'nfe' }) {
  const erros = [];
  const avisos = [];

  // Basic XML structure validation for RTC fields
  const hasGIBSCBS = xml.includes('<gIBSCBS') || xml.includes('gIBSCBS');
  const hasCST = xml.includes('<CST>') && (xml.includes('CBS') || xml.includes('IBS'));
  const hasCClassTrib = xml.includes('<cClassTrib>');
  const hasVBC = xml.includes('<vBC>');

  if (!hasGIBSCBS) {
    avisos.push({
      campo: 'gIBSCBS',
      mensagem: 'Grupo CBS/IBS (gIBSCBS) não encontrado no XML. Este grupo é obrigatório a partir da vigência da Reforma Tributária.',
      regra: 'NT 2025.002 — Grupo LA01',
    });
  }

  if (hasGIBSCBS && !hasCST) {
    erros.push({
      campo: 'CST',
      mensagem: 'CST de CBS/IBS não encontrado dentro do grupo gIBSCBS.',
      regra: 'NT 2025.002 — Campo N12-30',
    });
  }

  if (hasGIBSCBS && !hasCClassTrib) {
    erros.push({
      campo: 'cClassTrib',
      mensagem: 'Classificação tributária (cClassTrib) não encontrada. Obrigatória quando gIBSCBS presente.',
      regra: 'NT 2025.002 — Campo LA01-20',
    });
  }

  // Check for versaoNotaTecnica
  const versaoMatch = xml.match(/<versaoNotaTecnica>([^<]+)<\/versaoNotaTecnica>/);
  if (versaoMatch) {
    const versao = versaoMatch[1];
    if (!versao.startsWith('2025.002')) {
      avisos.push({
        campo: 'versaoNotaTecnica',
        mensagem: `Versão da NT é "${versao}". A NT vigente para RTC é 2025.002. Verifique compatibilidade.`,
      });
    }
  }

  // Validate tipoDfe
  const tiposValidos = ['nfe', 'nfce'];
  if (!tiposValidos.includes(tipoDfe)) {
    erros.push({
      campo: 'tipoDfe',
      mensagem: `Tipo de DFe "${tipoDfe}" inválido. Use: ${tiposValidos.join(', ')}`,
    });
  }

  // Extract cClassTrib values
  const cClassTribMatches = xml.match(/<cClassTrib>([^<]+)<\/cClassTrib>/g) || [];
  const cClassTribs = cClassTribMatches.map((m) => m.replace(/<\/?cClassTrib>/g, ''));

  // Extract CST values in gIBSCBS context
  const cstMatches = xml.match(/<CST>(\d{3})<\/CST>/g) || [];
  const csts = cstMatches.map((m) => m.replace(/<\/?CST>/g, ''));

  return {
    tipoDfe,
    valido: erros.length === 0,
    totalErros: erros.length,
    totalAvisos: avisos.length,
    erros,
    avisos,
    camposEncontrados: {
      gIBSCBS: hasGIBSCBS,
      CST: csts,
      cClassTrib: cClassTribs,
      vBC: hasVBC,
    },
    versaoNotaTecnica: versaoMatch ? versaoMatch[1] : 'não identificada',
    nota: 'Validação baseada na NT 2025.002 v1.34. O layout RTC está em evolução — verifique atualizações no Portal da NF-e.',
  };
}
