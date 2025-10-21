// src/domain/formulas.ts
/**
 * a = Itens
 * b = Itens Rastreados
 * ticketMedio = Ticket Médio (editável no app)
 */

export type Inputs = {
  a: number; // Itens
  b: number; // Itens Rastreados
  ticketMedio: number; // Ticket Médio (decimal)
};

export type Result = {
  ticketMedio: number;
  faturamentoBruto: number;
  custoTag: number;
  gestaoGoSeguros: number;
  assistencia24h: number;
  setupCaucaoMes: number;
  adm: number;
  passivo: number;
  iofTributos: number;
  resultadoCliente: number;
};

// ---- Constantes da planilha ----
const J10 = 3.67; // custo por item rastreado
const J12 = 0.1; // 10%
const J13 = 0.1249; // 12,49%
const J14 = 0.3481; // 34,81%
const A1 = 0.04; // 4%

// ADM (P16): 2,43%
const P16_ADM = 0.0243;

export function computeViability({ a, b, ticketMedio }: Inputs): Result {
  // Faturamento Bruto = Ticket Médio * Itens
  const faturamentoBruto = Number(ticketMedio * a);

  // Custos proporcionais
  const custoTag = Number(J10 * b);
  const gestaoGoSeguros = Number(J13 * faturamentoBruto);
  const assistencia24h = Number(J12 * faturamentoBruto);
  const setupCaucaoMes = Number(J14 * faturamentoBruto);
  const adm = Number(P16_ADM * faturamentoBruto);

  // Passivo = 10% do faturamento bruto
  const passivo = Number(0.1 * faturamentoBruto);

  const iofTributos = Number(A1 * faturamentoBruto);

  // Mantendo fórmula original do "RESULTADO CLIENTE" (não inclui PASSIVO)
  const resultadoCliente = Number(
    faturamentoBruto -
      custoTag -
      gestaoGoSeguros -
      assistencia24h -
      setupCaucaoMes -
      adm -
      iofTributos
  );

  return {
    ticketMedio,
    faturamentoBruto,
    custoTag,
    gestaoGoSeguros,
    assistencia24h,
    setupCaucaoMes,
    adm,
    passivo,
    iofTributos,
    resultadoCliente,
  };
}
