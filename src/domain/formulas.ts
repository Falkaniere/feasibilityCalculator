// src/domain/formulas.ts
/**
 * a = Itens
 * b = Itens Rastreados
 * ticketMedio = Ticket Médio (editável no app)
 *
 * Observação: CUSTO TAG (2,32%) aplicado apenas sobre a receita dos Itens Rastreados (ticketMedio * b).
 */

export type Inputs = {
  a: number; // Itens
  // b: number; // Itens Rastreados
  ticketMedio: number; // Ticket Médio (decimal)
};

export type Result = {
  ticketMedio: number;
  faturamentoBruto: number;
  // custoTag: number; // 2,32% da receita dos itens rastreados
  gestaoGoSeguros: number; // 6,49% do faturamento
  assistencia24h: number; // 10,00% do faturamento
  setupCaucaoMes: number; // 45,82% do faturamento
  adm: number; // 7,43% do faturamento (ADM / Operacional)
  passivo: number; // 10,00% do faturamento
  iofTributos: number; // 4,00% do faturamento
  resultadoCliente: number; // 26,26% do faturamento
  apolice: number; // 45,48% do faturamento
  gestaoAdmNew: number; // 13,92% do faturamento
};

// ---- Percentuais como decimais ----
const PCT_CUSTO_TAG = 0.0232;
const PCT_GESTAO_GO = 0.0649;
const PCT_ASSISTENCIA_24H = 0.1;
const PCT_SETUP_MES = 0.4582;
const PCT_ADM_OPERACIONAL = 0.0743;
const PCT_IOF_TRIBUTOS = 0.04;
const PCT_RESULTADO_CLIENTE = 0.2626;
const PCT_PASSIVO = 0.1;
const PCT_APOLICE = 0.4548;
const PCT_GESTAO_ADM_NEW = 0.1392;
// ------------------------------------

export function computeViability({ a, ticketMedio }: Inputs): Result {
  // Faturamento Bruto (todos os itens)
  const faturamentoBruto = Number(ticketMedio * a);

  // Receita apenas dos itens rastreados
  // const receitaRastreados = Number(ticketMedio * b);

  // CUSTO TAG: 2,32% apenas sobre a receita dos itens rastreados
  // const custoTag = Number(PCT_CUSTO_TAG * receitaRastreados);

  // Demais itens: percentuais sobre o faturamento total
  const gestaoGoSeguros = Number(PCT_GESTAO_GO * faturamentoBruto);
  const assistencia24h = Number(PCT_ASSISTENCIA_24H * faturamentoBruto);
  const setupCaucaoMes = Number(PCT_SETUP_MES * faturamentoBruto);
  const adm = Number(PCT_ADM_OPERACIONAL * faturamentoBruto);
  const passivo = Number(PCT_PASSIVO * faturamentoBruto);
  const iofTributos = Number(PCT_IOF_TRIBUTOS * faturamentoBruto);
  const apolice = Number(PCT_APOLICE * faturamentoBruto);
  const gestaoAdmNew = Number(PCT_GESTAO_ADM_NEW * faturamentoBruto);

  // Resultado do Cliente como percentual fixo do faturamento bruto
  const resultadoCliente = Number(PCT_RESULTADO_CLIENTE * faturamentoBruto);

  return {
    ticketMedio,
    faturamentoBruto,
    // custoTag,
    gestaoGoSeguros,
    assistencia24h,
    setupCaucaoMes,
    adm,
    passivo,
    iofTributos,
    resultadoCliente,
    apolice,
    gestaoAdmNew,
  };
}
