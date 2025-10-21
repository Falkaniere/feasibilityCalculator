// src/App.tsx
import React, { useMemo, useState } from 'react';
import Input from './components/Input';
import { parseInteger, formatNumber, parseDecimal } from './lib/format';
import { computeViability } from './domain/formulas';
import logo from './assets/GO_360.svg';

const logoSrc = `${logo}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`;

export default function App() {
  const [aRaw, setARaw] = useState('');
  const [bRaw, setBRaw] = useState('');
  const [tmRaw, setTmRaw] = useState('158'); // Ticket Médio default
  const [touched, setTouched] = useState(false);

  // a = Itens, b = Itens Rastreados (inteiros)
  const a = useMemo(() => parseInteger(aRaw), [aRaw]);
  const b = useMemo(() => parseInteger(bRaw), [bRaw]);
  // ticket médio (decimal)
  const tm = useMemo(() => parseDecimal(tmRaw), [tmRaw]);

  const errors = useMemo(() => {
    const e: Record<string, string | undefined> = {};
    if (touched) {
      if (!isFinite(a)) e.a = 'Informe um inteiro válido';
      if (!isFinite(b)) e.b = 'Informe um inteiro válido';
      if (!isFinite(tm)) e.tm = 'Informe um número válido';
    }
    return e;
  }, [a, b, tm, touched]);

  const canCalc = isFinite(a) && isFinite(b) && isFinite(tm);
  const result = useMemo(
    () => (canCalc ? computeViability({ a, b, ticketMedio: tm }) : null),
    [a, b, tm, canCalc]
  );

  return (
    <div className="container">
      <div className="logo-wrap">
        <img src={logo} alt="Logo" className="logo-svg" />
      </div>

      <h1>Calculadora de Viabilidade</h1>

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
      </form>

      <section className="result">
        <h2>Resultado</h2>
        {result ? (
          <div className="card">
            <div className="row">
              <span className="k">TICKET MÉDIO</span>
              <input
                className={`v-input ${errors.tm ? 'error' : ''}`}
                placeholder="Ex.: 158,00"
                inputMode="decimal"
                value={tmRaw}
                onChange={(e) => setTmRaw(e.target.value)}
                onBlur={() => setTouched(true)}
                aria-invalid={!!errors.tm}
                aria-label="Ticket Médio"
                title={errors.tm || 'Ticket Médio'}
              />
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
              <span className="k">PASSIVO</span>
              <span className="v">{formatNumber(result.passivo, 2)}</span>
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
