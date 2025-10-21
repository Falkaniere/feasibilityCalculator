// src/lib/format.ts
/** Utilidades de formatação/conversão (pt-BR). */

/** Converte string para número inteiro, aceitando '.' como milhar e ',' ou '.' como decimal. */
export function parseInteger(raw: string): number {
  if (raw == null) return NaN;
  const s = String(raw).trim();
  if (!s) return NaN;
  // Normaliza: remove milhar e troca vírgula por ponto
  const normalized = s.replace(/\./g, '').replace(',', '.');
  const n = Number(normalized.replace(/[^\d.-]/g, ''));
  if (!Number.isFinite(n)) return NaN;
  return Math.trunc(n);
}

/** Converte string para número decimal respeitando variações de pt-BR. */
export function parseDecimal(raw: string): number {
  if (raw == null) return NaN;
  let s = String(raw).trim();
  if (!s) return NaN;
  // Remove símbolos não numéricos (ex.: R$, espaços)
  s = s.replace(/[^\d.,-]/g, '');
  const hasDot = s.includes('.');
  const hasComma = s.includes(',');

  if (hasDot && hasComma) {
    // Assume '.' como milhar e ',' como decimal: 1.234,56 -> 1234.56
    s = s.replace(/\./g, '').replace(',', '.');
  } else if (hasComma) {
    // Apenas vírgula -> decimal
    s = s.replace(',', '.');
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

/** Formata número com casas decimais no locale pt-BR. */
export function formatNumber(n: number, fractionDigits = 2): string {
  if (!isFinite(n)) return '-';
  return n.toLocaleString('pt-BR', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

/** Formata moeda BRL (R$) no locale pt-BR. */
export function formatCurrencyBRL(n: number): string {
  if (!isFinite(n)) return '-';
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
