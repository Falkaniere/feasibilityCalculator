// src/App.tsx
import React, { useMemo, useState } from 'react';
import Input from './components/Input';
import { parseInteger, formatNumber } from './lib/format';
import { computeViability } from './domain/formulas';

export default function App() {
  const [aRaw, setARaw] = useState('');
  const [bRaw, setBRaw] = useState('');
  const [touched, setTouched] = useState(false);

  // a = Itens, b = Itens Rastreados (inteiros)
  const a = useMemo(() => parseInteger(aRaw), [aRaw]);
  const b = useMemo(() => parseInteger(bRaw), [bRaw]);

  const errors = useMemo(() => {
    const e: Record<string, string | undefined> = {};
    if (touched) {
      if (!isFinite(a)) e.a = 'Informe um inteiro válido';
      if (!isFinite(b)) e.b = 'Informe um inteiro válido';
    }
    return e;
  }, [a, b, touched]);

  const canCalc = isFinite(a) && isFinite(b);
  const result = useMemo(
    () => (canCalc ? computeViability({ a, b }) : null),
    [a, b, canCalc]
  );

  return (
    <div className="container">
      <h1>Calculadora de Viabilidade</h1>
      <p className="subtitle">MVP — Itens e Itens Rastreados</p>

      <form
        className="form"
        onSubmit={(ev) => {
          ev.preventDefault();
          setTouched(true);
        }}
      >
        <div className="grid">
          <Input
            label="Itens"
            placeholder="Ex.: 1000"
            inputMode="numeric"
            pattern="[0-9]*"
            value={aRaw}
            onChange={(e) => setARaw(e.target.value)}
            onBlur={() => setTouched(true)}
            error={errors.a}
            aria-invalid={!!errors.a}
          />

          <Input
            label="Itens Rastreados"
            placeholder="Ex.: 250"
            inputMode="numeric"
            pattern="[0-9]*"
            value={bRaw}
            onChange={(e) => setBRaw(e.target.value)}
            onBlur={() => setTouched(true)}
            error={errors.b}
            aria-invalid={!!errors.b}
          />
        </div>

        <button type="submit" className="button" disabled={!canCalc}>
          Calcular
        </button>
      </form>

      <section className="result">
        <h2>Resultado</h2>
        {result ? (
          <div className="card">
            <div className="row">
              <span className="k">TICKET MÉDIO</span>
              <span className="v">{formatNumber(result.ticketMedio, 2)}</span>
            </div>
            <div className="row">
              <span className="k">FATURAMENTO BRUTO</span>
              <span className="v">
                {formatNumber(result.faturamentoBruto, 2)}
              </span>
            </div>
            <div className="row">
              <span className="k">CUSTO TAG</span>
              <span className="v">{formatNumber(result.custoTag, 2)}</span>
            </div>
            <div className="row">
              <span className="k">GESTÃO GO SEGUROS</span>
              <span className="v">
                {formatNumber(result.gestaoGoSeguros, 2)}
              </span>
            </div>
            <div className="row">
              <span className="k">ASSISTÊNCIA 24 HORAS</span>
              <span className="v">
                {formatNumber(result.assistencia24h, 2)}
              </span>
            </div>
            <div className="row">
              <span className="k">SETUP / CAUÇÃO / MÊS</span>
              <span className="v">
                {formatNumber(result.setupCaucaoMes, 2)}
              </span>
            </div>
            <div className="row">
              <span className="k">ADM</span>
              <span className="v">{formatNumber(result.adm, 2)}</span>
            </div>
            <div className="row">
              <span className="k">IOF - TRIBUTOS</span>
              <span className="v">{formatNumber(result.iofTributos, 2)}</span>
            </div>
            <div className="row">
              <span className="k">RESULTADO CLIENTE</span>
              <span className="v">
                {formatNumber(result.resultadoCliente, 2)}
              </span>
            </div>
          </div>
        ) : (
          <p className="muted">
            Preencha Itens e Itens Rastreados (inteiros) para ver os resultados
            calculados.
          </p>
        )}
      </section>
    </div>
  );
}
