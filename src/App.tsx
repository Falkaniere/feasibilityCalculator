// src/App.tsx
import React, { useMemo, useState } from 'react';
import Input from './components/Input';
import { parseInteger, formatNumber, parseDecimal } from './lib/format';
import { computeViability } from './domain/formulas';
// import logo from './assets/GO_360.svg';
import logo from './assets/new_logo.png';

const logoSrc = `${logo}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`;

export default function App() {
  const [aRaw, setARaw] = useState('');
  const [bRaw, setBRaw] = useState('');
  const [tmRaw, setTmRaw] = useState('158'); // Ticket Médio default
  const [touched, setTouched] = useState(false);

  // a = Itens, b = Itens Rastreados (inteiros)
  const a = useMemo(() => parseInteger(aRaw), [aRaw]);
  // const b = useMemo(() => parseInteger(bRaw), [bRaw]);

  const tmParsed = useMemo(() => {
    if (tmRaw.trim() === '') return 0;
    const n = parseDecimal(tmRaw);
    return Number.isFinite(n) ? n : 0;
  }, [tmRaw]);

  const errors = useMemo(() => {
    const e: Record<string, string | undefined> = {};
    if (touched) {
      if (!isFinite(a)) e.a = 'Informe um inteiro válido';
      // if (!isFinite(b)) e.b = 'Informe um inteiro válido';
      if (tmRaw.trim() !== '' && !Number.isFinite(parseDecimal(tmRaw))) {
        e.tm = 'Informe um número válido';
      }
    }
    return e;
  }, [a, tmRaw, touched]);

  // const canCalc = isFinite(a) && isFinite(b);
  const canCalc = isFinite(a);
  const result = useMemo(
    () => (canCalc ? computeViability({ a, ticketMedio: tmParsed }) : null),
    [a, tmParsed, canCalc]
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

          {/* <Input
            label="Itens Rastreados"
            placeholder="Ex.: 250"
            inputMode="numeric"
            pattern="[0-9]*"
            value={bRaw}
            onChange={(e) => setBRaw(e.target.value)}
            onBlur={() => setTouched(true)}
            error={errors.b}
            aria-invalid={!!errors.b}
          /> */}
        </div>
      </form>

      <section className="result">
        <h2>Resultado</h2>

        <div className="card">
          <div className="row">
            <span className="k">TICKET MÉDIO</span>
            <input
              className={`v-input ${errors.tm ? 'error' : ''}`}
              placeholder="Ex.: 158,00"
              inputMode="decimal"
              value={tmRaw}
              onChange={(e) => setTmRaw(e.target.value)}
              onBlur={() => {
                setTouched(true);
                if (tmRaw.trim() === '') setTmRaw('0');
              }}
              aria-invalid={!!errors.tm}
              aria-label="Ticket Médio"
              title={errors.tm || 'Ticket Médio'}
            />
          </div>

          <div className="row">
            <span className="k">FATURAMENTO BRUTO</span>
            <span className="v">
              {formatNumber(result?.faturamentoBruto ?? NaN, 2)}
            </span>
          </div>
          {/* <div className="row">
            <span className="k">CUSTO TAG</span>
            <span className="v">
              {formatNumber(result?.custoTag ?? NaN, 2)}
            </span>
          </div> */}
          <div className="row">
            <span className="k">APÓLICE</span>
            <span className="v">{formatNumber(result?.apolice ?? NaN, 2)}</span>
          </div>
          <div className="row">
            <span className="k">GESTÃO / ADM NEW</span>
            <span className="v">
              {formatNumber(result?.gestaoAdmNew ?? NaN, 2)}
            </span>
          </div>
          <div className="row">
            <span className="k">ASSISTENCIA 24 HORAS</span>
            <span className="v">
              {formatNumber(result?.assistencia24h ?? NaN, 2)}
            </span>
          </div>
          {/* <div className="row">
            <span className="k">IOF TRIBUTOS</span>
            <span className="v">{formatNumber(result?.iofTributos ?? NaN, 2)}</span>
          </div> */}
          {/* <div className="row">
            <span className="k">PASSIVO</span>
            <span className="v">{formatNumber(result?.passivo ?? NaN, 2)}</span>
          </div> */}
          <div className="row">
            <span className="k">IOF - TRIBUTOS</span>
            <span className="v">
              {formatNumber(result?.iofTributos ?? NaN, 2)}
            </span>
          </div>
          <div className="row" style={{ fontSize: '2.00rem', fontWeight: 700 }}>
            <span className="k">RESULTADO CLIENTE</span>
            <span className="v">
              {formatNumber(result?.resultadoCliente ?? NaN, 2)}
            </span>
          </div>
        </div>

        {!canCalc && (
          <p className="muted" style={{ marginTop: 8 }}>
            Preencha Itens e Itens Rastreados para ver os resultados.
          </p>
        )}
      </section>
    </div>
  );
}
