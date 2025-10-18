// src/lib/format.ts
/** Utilidades de formatação/conversão (pt-BR). */

/** Converte string para número inteiro, aceitando '.' como milhar e ',' ou '.' como decimal. */
export function parseInteger(raw: string): number {
  if (raw == null) return NaN;
  const s = String(raw).trim();
  if (!s) return NaN;
  // Normaliza: remove milhar e troca vírgula por ponto
  const normalized = s.replace(/\./g, '').replace(',', '.');
  const n = Number(normalized);
  if (!Number.isFinite(n)) return NaN;
  return Math.trunc(n);
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
