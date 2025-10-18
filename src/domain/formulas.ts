// src/domain/formulas.ts
/**
 * Mapas e hipóteses:
 * - a = Itens
 * - b = Itens Rastreados
 *
 * Fórmulas:
 * - FATURAMENTO BRUTO     = ticketMedio * a
 * - CUSTO TAG             = J10 * b
 * - GESTÃO GO SEGUROS     = J13 * faturamentoBruto
 * - ASSISTÊNCIA 24 HORAS  = J12 * faturamentoBruto
 * - SETUP / CAUÇÃO / MÊS  = J14 * faturamentoBruto
 * - ADM                   = P16 * faturamentoBruto
 * - IOF - TRIBUTOS        = A1 * faturamentoBruto
 * - RESULTADO CLIENTE     = faturamentoBruto - (custos acima)
 */

export type Inputs = {
  a: number; // Itens
  b: number; // Itens Rastreados
};

export type Result = {
  ticketMedio: number;
  faturamentoBruto: number;
  custoTag: number;
  gestaoGoSeguros: number;
  assistencia24h: number;
  setupCaucaoMes: number;
  adm: number;
  iofTributos: number;
  resultadoCliente: number;
};

// ---- Constantes da planilha ----
const J10 = 3.67; // custo por item rastreado
const J12 = 0.1; // 10%
const J13 = 0.1249; // 12,49%
const J14 = 0.3481; // 34,81%
const A1 = 0.04; // 4%

// ADM (P16) confirmado: 2,43%
const P16_ADM = 0.0243;

// Ticket Médio fixo (E11)
const TICKET_MEDIO_BASE = 158;

export function computeViability({ a, b }: Inputs): Result {
  // Ticket Médio
  const ticketMedio = Number(TICKET_MEDIO_BASE);

  // Faturamento Bruto = Ticket Médio * Itens
  const faturamentoBruto = Number(ticketMedio * a);

  // Custos proporcionais
  const custoTag = Number(J10 * b);
  const gestaoGoSeguros = Number(J13 * faturamentoBruto);
  const assistencia24h = Number(J12 * faturamentoBruto);
  const setupCaucaoMes = Number(J14 * faturamentoBruto);
  const adm = Number(P16_ADM * faturamentoBruto);
  const iofTributos = Number(A1 * faturamentoBruto);

  // Resultado do Cliente
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
    iofTributos,
    resultadoCliente,
  };
}
