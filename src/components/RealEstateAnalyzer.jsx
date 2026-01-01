import React, { useState, useMemo } from 'react';

// ==================== ICONOS SVG ====================
const Icons = {
  Sun: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Moon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Help: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  ChevronUp: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>,
  Building: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
  Calculator: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><line x1="8" y1="11" x2="8" y2="11.01"/><line x1="12" y1="11" x2="12" y2="11.01"/><line x1="16" y1="11" x2="16" y2="11.01"/><line x1="8" y1="15" x2="8" y2="15.01"/><line x1="12" y1="15" x2="12" y2="15.01"/><line x1="8" y1="19" x2="8" y2="19.01"/><line x1="12" y1="19" x2="12" y2="19.01"/></svg>,
  TrendingUp: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Wallet: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  BarChart: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
};

// ==================== TOOLTIPS ====================
const TOOLTIPS = {
  TIR: { title: 'TIR (Tasa Interna de Retorno)', description: 'Es la rentabilidad anualizada que iguala el valor presente de todos los flujos de caja a cero.', formula: 'VPN = Σ CFt / (1+TIR)^t = 0', interpretation: '> 8% suele considerarse atractivo' },
  COC: { title: 'Cash-on-Cash Return', description: 'Mide el rendimiento anual del equity invertido. Es el cashflow neto anual dividido entre tu inversión inicial.', formula: 'CoC = CF Neto Anual / Equity Inicial × 100', interpretation: '> 5% aceptable, > 8% excelente' },
  DSCR: { title: 'DSCR (Debt Service Coverage)', description: 'Indica cuántas veces el ingreso operativo neto cubre los pagos de la hipoteca.', formula: 'DSCR = NOI / Servicio de Deuda Anual', interpretation: '> 1.25x mínimo recomendado' },
  EQUITY_INICIAL: { title: 'Equity Inicial', description: 'Todo el dinero que pones de tu bolsillo: entrada + gastos de adquisición.', formula: 'Equity = Entrada + Costes Adquisición' },
  LTV: { title: 'LTV (Loan to Value)', description: 'Porcentaje del valor de la vivienda que financias con hipoteca.', formula: 'LTV = Préstamo / Valor Vivienda × 100' },
  ITP: { title: 'ITP', description: 'Impuesto de Transmisiones Patrimoniales. Varía por comunidad autónoma (4%-10%).', interpretation: 'Andalucía: 7%, Madrid: 6%, Cataluña: 10%' },
  BONIFICACION_ALQUILER: { title: 'Bonificación Alquiler', description: 'Reducción fiscal sobre los rendimientos del alquiler de vivienda habitual (hasta 60%).', interpretation: 'Solo si el inquilino usa el piso como vivienda habitual' },
  BONIFICACION_VENTA: { title: 'Exención Reinversión', description: 'Si vendes tu vivienda habitual y reinviertes en otra en 2 años, puedes eximir la ganancia.', interpretation: 'No aplica a segundas viviendas' },
  GANANCIA_PATRIMONIAL: { title: 'Ganancia Patrimonial', description: 'Beneficio al vender por encima del precio de compra. Tributa al 19-26%.', formula: 'Ganancia = Precio Venta - (Precio Compra + Gastos)' },
  COMUNIDAD: { title: 'Gastos de Comunidad', description: 'Cuota para mantenimiento de zonas comunes, ascensor, portería, etc.' },
  IBI: { title: 'IBI', description: 'Impuesto municipal anual sobre la propiedad.' },
  DERRAMAS: { title: 'Derramas', description: 'Pagos extraordinarios para obras o reparaciones importantes en el edificio.' },
  OCUPACION: { title: 'Tasa de Ocupación', description: 'Porcentaje del año que el piso está alquilado.', interpretation: '90-95% optimista, 80-85% conservador' },
  CASHFLOW: { title: 'Cashflow', description: 'Dinero que entra/sale de tu bolsillo cada periodo. Positivo = ganas, Negativo = pones.' },
  RENTABILIDAD_APALANCADA: { title: 'Rentabilidad Apalancada', description: 'TIR sobre tu equity invertido, no sobre el valor total del activo.', formula: '(Retorno Total / Equity - 1) / Años × 100' },
  SALDO_HIPOTECA: { title: 'Saldo Pendiente', description: 'Capital que aún debes al banco. Al vender, se resta del precio de venta.' },
  VALOR_LIQUIDACION: { title: 'Valor de Liquidación', description: 'Lo que recibirías si vendieras hoy: Precio Venta - Hipoteca - Impuestos.' },
  EQUITY_MULTIPLE: { title: 'Equity Multiple', description: 'Cuántas veces recuperas tu inversión inicial. 2x = duplicaste tu dinero.', interpretation: '> 2x en 10 años es buen resultado' },
  RENTABILIDAD_BRUTA: { title: 'Rentabilidad Bruta', description: 'Ingresos anuales / Precio de compra. NO incluye gastos ni hipoteca.', interpretation: '> 5% se considera aceptable' },
};

// ==================== DEFAULTS ====================
const DEFAULT_INPUTS = {
  impuestoRentasCapital: 20, impuestoGananciasPatrimoniales: 21, bonificacionAlquiler: 60, bonificacionVenta1Vivienda: 95,
  valorVivienda: 130000, entrada: 10, gastosHipoteca: 1.4, impuestoITP: 6, comisionAgencia: 1, gastosRegistroNotaria: 1, anosHipoteca: 30, tipoInteres: 1.4,
  gastosComunidad: 0.55, ibi: 0.4, mantenimiento: 0.8, derramas: 0.8,
  ocupacion: 83.33, alquilerMensual: 1100, subidaPrecioVivienda: 2, subidaAlquiler: 3,
  ventaFutura: true, anosHastaVenta: 10, tirMinima: 8, cocMinimo: 5
};

const SCENARIOS = {
  optimista: { name: 'Optimista', alquiler: 1.1, ocupacion: 1.05, revalorizacion: 1.3, gastos: 0.9 },
  base: { name: 'Base', alquiler: 1, ocupacion: 1, revalorizacion: 1, gastos: 1 },
  pesimista: { name: 'Pesimista', alquiler: 0.9, ocupacion: 0.85, revalorizacion: 0.7, gastos: 1.15 }
};

// ==================== UTILS ====================
const fmt = (v, d = 0) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
const pct = (v, d = 2) => `${v.toFixed(d)}%`;
const ratio = (v, d = 2) => `${v.toFixed(d)}x`;
const valClass = (v, dm) => v > 0 ? (dm ? 'text-emerald-400' : 'text-emerald-600') : v < 0 ? (dm ? 'text-red-400' : 'text-red-600') : (dm ? 'text-slate-300' : 'text-slate-600');

const calcCuota = (p, t, a) => { if (p <= 0) return 0; const tm = t / 100 / 12; const n = a * 12; return tm === 0 ? p / n : p * (tm * Math.pow(1 + tm, n)) / (Math.pow(1 + tm, n) - 1); };

const getSaldo = (p, t, a, m) => {
  if (m <= 0) return p; let s = p; const tm = t / 100 / 12; const c = calcCuota(p, t, a);
  for (let i = 1; i <= Math.min(m, a * 12); i++) { s = Math.max(0, s - (c - s * tm)); } return s;
};

const calcTIR = (f) => {
  let lo = -0.99, hi = 5, tir = 0;
  for (let i = 0; i < 200; i++) { tir = (lo + hi) / 2; let vpn = f.reduce((s, v, j) => s + v / Math.pow(1 + tir, j), 0); if (Math.abs(vpn) < 0.01) break; vpn > 0 ? lo = tir : hi = tir; }
  return tir * 100;
};

const calcMetricas = (i, esc) => {
  const vv = i.valorVivienda, ie = vv * (i.entrada / 100), ih = vv - ie;
  const ca = { itp: vv * (i.impuestoITP / 100), com: vv * (i.comisionAgencia / 100), gh: ih * (i.gastosHipoteca / 100), rn: vv * (i.gastosRegistroNotaria / 100) };
  const tca = Object.values(ca).reduce((a, b) => a + b, 0), eq = ie + tca;
  const tm = (i.tipoInteres / 100) / 12, cm = calcCuota(ih, i.tipoInteres, i.anosHipoteca), cy = cm * 12;
  const gob = vv * ((i.gastosComunidad + i.ibi + i.mantenimiento + i.derramas) / 100);
  
  const cfs = []; let sh = ih; const ha = i.ventaFutura ? i.anosHastaVenta : 10;
  for (let a = 1; a <= ha; a++) {
    const ev = i.ventaFutura && a === i.anosHastaVenta;
    const ama = i.alquilerMensual * esc.alquiler * Math.pow(1 + (i.subidaAlquiler / 100), a - 1);
    const iba = ama * 12 * (i.ocupacion / 100) * esc.ocupacion;
    const vva = vv * Math.pow(1 + ((i.subidaPrecioVivienda / 100) * esc.revalorizacion), a);
    const iv = ev ? vva : 0, ti = iba + iv, go = gob * esc.gastos;
    let ia = 0, aa = 0;
    for (let m = 0; m < 12; m++) { if (sh > 0) { const im = sh * tm; ia += im; aa += cm - im; sh = Math.max(0, sh - (cm - im)); } }
    const rh = ev ? sh : 0; if (ev) sh = 0;
    const cfo = iba - go, cfd = ti - go - cy - rh;
    const bib = (iba - go - ia) * (1 - i.bonificacionAlquiler / 100);
    const ial = bib > 0 ? bib * (i.impuestoRentasCapital / 100) : 0;
    let ivt = 0;
    if (ev && iv > 0) { const gp = vva - vv - tca; const gb = gp * (1 - i.bonificacionVenta1Vivienda / 100); ivt = gb > 0 ? gb * (i.impuestoGananciasPatrimoniales / 100) : 0; }
    const tImp = ial + ivt, cfn = cfd - tImp;
    cfs.push({ ano: a, iba, iv, ti, go, int: ia, am: aa, ch: cy, rh, cfo, cfd, ial, ivt, tImp, cfn, sh, vv: vva, ev });
  }
  
  const a1 = cfs[0], rb = (a1.iba / vv) * 100, coc = (a1.cfn / eq) * 100, dscr = a1.ch > 0 ? a1.cfo / a1.ch : Infinity;
  const flujos = [-eq, ...cfs.map(c => c.cfn)], tir = calcTIR(flujos);
  const cfAc = cfs.reduce((s, c) => s + c.cfn, 0), em = cfAc / eq, gt = cfAc - eq;
  const cTIR = tir >= i.tirMinima, cCoC = coc >= i.cocMinimo, cDSCR = dscr >= 1.25, cCF = cfs.every(c => c.cfn >= -100);
  
  return { vv, eq, ie, ih, ca, tca, ltv: (ih / vv) * 100, cm, cy, rb, coc, dscr, tir, em, gt, cfs, rec: cTIR && cCoC && cDSCR && cCF, cTIR, cCoC, cDSCR, cCF };
};

const calcVenta = (i, esc, av, vvm = null) => {
  const vv = i.valorVivienda, ie = vv * (i.entrada / 100), ih = vv - ie;
  const ca = { itp: vv * (i.impuestoITP / 100), com: vv * (i.comisionAgencia / 100), gh: ih * (i.gastosHipoteca / 100), rn: vv * (i.gastosRegistroNotaria / 100) };
  const tca = Object.values(ca).reduce((a, b) => a + b, 0), eq = ie + tca;
  const va = vvm || vv * Math.pow(1 + ((i.subidaPrecioVivienda / 100) * esc.revalorizacion), av);
  const shp = getSaldo(ih, i.tipoInteres, i.anosHipoteca, av * 12);
  const cm = calcCuota(ih, i.tipoInteres, i.anosHipoteca), cy = cm * 12, tm = (i.tipoInteres / 100) / 12;
  const goa = vv * ((i.gastosComunidad + i.ibi + i.mantenimiento + i.derramas) / 100) * esc.gastos;
  
  let cfAc = 0, sh = ih;
  for (let a = 1; a <= av; a++) {
    const ama = i.alquilerMensual * esc.alquiler * Math.pow(1 + (i.subidaAlquiler / 100), a - 1);
    const ia = ama * 12 * (i.ocupacion / 100) * esc.ocupacion;
    let int = 0; for (let m = 0; m < 12; m++) { if (sh > 0) { int += sh * tm; sh = Math.max(0, sh - (cm - sh * tm)); } }
    const bi = (ia - goa - int) * (1 - i.bonificacionAlquiler / 100);
    cfAc += ia - goa - cy - (bi > 0 ? bi * (i.impuestoRentasCapital / 100) : 0);
  }
  
  const gp = va - vv - tca, gb = gp * (1 - i.bonificacionVenta1Vivienda / 100);
  const iv = gb > 0 ? gb * (i.impuestoGananciasPatrimoniales / 100) : 0;
  const vl = va - shp - iv, rt = cfAc + vl, ga = rt - eq;
  
  const flujos = [-eq]; sh = ih;
  for (let a = 1; a <= av; a++) {
    const ama = i.alquilerMensual * esc.alquiler * Math.pow(1 + (i.subidaAlquiler / 100), a - 1);
    const ia = ama * 12 * (i.ocupacion / 100) * esc.ocupacion;
    let int = 0; for (let m = 0; m < 12; m++) { if (sh > 0) { int += sh * tm; sh = Math.max(0, sh - (cm - sh * tm)); } }
    const bi = (ia - goa - int) * (1 - i.bonificacionAlquiler / 100);
    let cfa = ia - goa - cy - (bi > 0 ? bi * (i.impuestoRentasCapital / 100) : 0);
    if (a === av) cfa += vl;
    flujos.push(cfa);
  }
  
  return { av, va, shp, cfAc, gp, iv, vl, rt, ga, eq, tir: calcTIR(flujos), em: rt / eq, ra: ((rt / eq) - 1) / av * 100 };
};

// ==================== COMPONENTS ====================
const Tooltip = ({ content, children, dm }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex items-center">
      {children}
      <button className={`ml-1 p-0.5 rounded-full transition-colors ${dm ? 'text-slate-400 hover:text-blue-400 hover:bg-slate-700' : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100'}`}
        onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onClick={() => setShow(!show)}>
        <Icons.Help />
      </button>
      {show && (
        <div className={`absolute z-50 w-72 p-3 rounded-lg border shadow-xl bottom-full left-1/2 -translate-x-1/2 mb-2 ${dm ? 'bg-slate-800 text-slate-100 border-slate-600' : 'bg-white text-slate-800 border-slate-200'}`}
          onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
          <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent ${dm ? 'border-t-slate-800' : 'border-t-white'}`} />
          {typeof content === 'string' ? <p className="text-sm">{content}</p> : (
            <div className="space-y-1.5">
              {content.title && <h4 className={`font-semibold text-sm ${dm ? 'text-blue-400' : 'text-blue-600'}`}>{content.title}</h4>}
              {content.description && <p className={`text-xs ${dm ? 'text-slate-300' : 'text-slate-600'}`}>{content.description}</p>}
              {content.formula && <div className={`text-xs font-mono p-1.5 rounded ${dm ? 'bg-slate-700/50' : 'bg-slate-100'}`}>{content.formula}</div>}
              {content.interpretation && <p className={`text-xs italic ${dm ? 'text-slate-400' : 'text-slate-500'}`}>💡 {content.interpretation}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Label = ({ label, tooltip, dm }) => tooltip ? <Tooltip content={tooltip} dm={dm}><span>{label}</span></Tooltip> : <span>{label}</span>;

const Input = ({ label, value, onChange, step = '1', suffix = '', tooltip = null, dm = false }) => (
  <div>
    <label className={`text-sm block mb-1 ${dm ? 'text-slate-300' : 'text-slate-600'}`}><Label label={label} tooltip={tooltip} dm={dm} /></label>
    <div className="relative">
      <input type="number" step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${suffix ? 'pr-10' : ''} ${dm ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
      {suffix && <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${dm ? 'text-slate-400' : 'text-slate-500'}`}>{suffix}</span>}
    </div>
  </div>
);

const Checkbox = ({ label, checked, onChange, dm = false }) => (
  <label className={`flex items-center gap-3 cursor-pointer ${dm ? 'text-slate-200' : 'text-slate-700'}`}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
      className={`w-5 h-5 rounded border-2 cursor-pointer ${dm ? 'border-slate-500 bg-slate-700' : 'border-slate-300 bg-white'}`} />
    <span>{label}</span>
  </label>
);

const Card = ({ children, dm = false, className = '' }) => (
  <div className={`rounded-xl border p-5 ${dm ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'} ${className}`}>{children}</div>
);

const MetricCard = ({ label, value, subValue = null, variant = 'default', dm = false }) => {
  const v = { default: dm ? 'bg-slate-700/50 text-white' : 'bg-slate-50 text-slate-900', success: dm ? 'bg-emerald-900/30 border border-emerald-700/50 text-emerald-300' : 'bg-emerald-50 border border-emerald-200 text-emerald-700', warning: dm ? 'bg-amber-900/30 border border-amber-700/50 text-amber-300' : 'bg-amber-50 border border-amber-200 text-amber-700', danger: dm ? 'bg-red-900/30 border border-red-700/50 text-red-300' : 'bg-red-50 border border-red-200 text-red-700', highlight: dm ? 'bg-blue-900/30 border border-blue-700/50 text-blue-300' : 'bg-blue-50 border border-blue-200 text-blue-700' };
  return (
    <div className={`p-3 rounded-lg ${v[variant]}`}>
      <div className={`text-sm ${dm ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
      <div className="text-xl font-bold mt-1">{value}</div>
      {subValue && <div className={`text-xs mt-1 ${dm ? 'text-slate-500' : 'text-slate-400'}`}>{subValue}</div>}
    </div>
  );
};

const Row = ({ label, value, highlight = false, indent = false, dm = false }) => (
  <div className={`flex justify-between items-center p-2.5 rounded-lg ${highlight ? (dm ? 'bg-slate-700/50' : 'bg-slate-100') : ''} ${indent ? 'ml-4' : ''}`}>
    <span className={highlight ? (dm ? 'text-white font-semibold' : 'text-slate-900 font-semibold') : (dm ? 'text-slate-400' : 'text-slate-600')}>{label}</span>
    <span className={`font-medium ${highlight ? (dm ? 'text-white font-bold' : 'text-slate-900 font-bold') : (dm ? 'text-slate-200' : 'text-slate-800')}`}>{value}</span>
  </div>
);

// ==================== MAIN APP ====================
export default function RealEstateAnalyzer() {
  const [dm, setDm] = useState(true);
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [scenario, setScenario] = useState('base');
  const [activeTab, setActiveTab] = useState('analysis');
  const [anoVenta, setAnoVenta] = useState(3);
  const [valorManual, setValorManual] = useState(null);
  const [usarManual, setUsarManual] = useState(false);
  const [cfExpanded, setCfExpanded] = useState(true);

  const esc = SCENARIOS[scenario];
  const m = useMemo(() => calcMetricas(inputs, esc), [inputs, esc]);
  const venta = useMemo(() => calcVenta(inputs, esc, anoVenta, usarManual ? valorManual : null), [inputs, esc, anoVenta, usarManual, valorManual]);
  const valorEst = useMemo(() => inputs.valorVivienda * Math.pow(1 + ((inputs.subidaPrecioVivienda / 100) * esc.revalorizacion), anoVenta), [inputs.valorVivienda, inputs.subidaPrecioVivienda, esc.revalorizacion, anoVenta]);

  const handleChange = (field, value) => setInputs(prev => ({ ...prev, [field]: value }));

  const bg = dm ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100';
  const txt = dm ? 'text-white' : 'text-slate-900';
  const txtSec = dm ? 'text-slate-400' : 'text-slate-600';
  const hdrBg = dm ? 'bg-slate-800/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm';
  const hdrBorder = dm ? 'border-slate-700' : 'border-slate-200';

  const totales = m.cfs.reduce((acc, cf) => ({ iba: acc.iba + cf.iba, go: acc.go + cf.go, cfo: acc.cfo + cf.cfo, int: acc.int + cf.int, ch: acc.ch + cf.ch + cf.rh, tImp: acc.tImp + cf.tImp, cfn: acc.cfn + cf.cfn }), { iba: 0, go: 0, cfo: 0, int: 0, ch: 0, tImp: 0, cfn: 0 });

  return (
    <div className={`min-h-screen ${bg} ${txt}`}>
      <header className={`sticky top-0 z-50 ${hdrBg} border-b ${hdrBorder}`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${dm ? 'bg-blue-500/20' : 'bg-blue-100'}`}><Icons.Building /></div>
              <div>
                <h1 className={`text-lg font-bold ${txt}`}>Análisis de Inversión Inmobiliaria</h1>
                <p className={`text-sm ${txtSec}`}>Calculadora de rentabilidad apalancada</p>
              </div>
            </div>
            <button onClick={() => setDm(!dm)} className={`p-3 rounded-xl transition-all ${dm ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
              {dm ? <Icons.Sun /> : <Icons.Moon />}
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            {[{ id: 'analysis', label: 'Análisis', icon: Icons.BarChart }, { id: 'sell', label: 'Simular Venta', icon: Icons.Calculator }].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === tab.id ? (dm ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (dm ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100')}`}>
                <tab.icon />{tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-5">
        <Card dm={dm} className="mb-5">
          <h3 className={`text-sm font-semibold mb-2 ${txtSec}`}>Escenario</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(SCENARIOS).map(([key, data]) => (
              <button key={key} onClick={() => setScenario(key)}
                className={`p-3 rounded-lg font-semibold transition-all text-center ${scenario === key ? (dm ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-blue-500 text-white ring-2 ring-blue-300') : (dm ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')}`}>
                {data.name}
              </button>
            ))}
          </div>
        </Card>

        {activeTab === 'analysis' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-1">
              <Card dm={dm}>
                <h2 className={`text-lg font-bold mb-4 ${txt}`}>Parámetros</h2>
                <div className="space-y-4">
                  <div className={`pb-4 border-b ${hdrBorder}`}>
                    <h3 className={`text-base font-semibold mb-3 ${dm ? 'text-blue-400' : 'text-blue-600'}`}>1. Fiscalidad</h3>
                    <div className="space-y-2">
                      <Input label="Imp. rentas capital" value={inputs.impuestoRentasCapital} onChange={(v) => handleChange('impuestoRentasCapital', v)} suffix="%" dm={dm} />
                      <Input label="Imp. ganancias patrimonio" value={inputs.impuestoGananciasPatrimoniales} onChange={(v) => handleChange('impuestoGananciasPatrimoniales', v)} suffix="%" tooltip={TOOLTIPS.GANANCIA_PATRIMONIAL} dm={dm} />
                      <Input label="Bonificación alquiler" value={inputs.bonificacionAlquiler} onChange={(v) => handleChange('bonificacionAlquiler', v)} suffix="%" tooltip={TOOLTIPS.BONIFICACION_ALQUILER} dm={dm} />
                      <Input label="Bonificación venta 1ª viv." value={inputs.bonificacionVenta1Vivienda} onChange={(v) => handleChange('bonificacionVenta1Vivienda', v)} suffix="%" tooltip={TOOLTIPS.BONIFICACION_VENTA} dm={dm} />
                    </div>
                  </div>
                  <div className={`pb-4 border-b ${hdrBorder}`}>
                    <h3 className={`text-base font-semibold mb-3 ${dm ? 'text-blue-400' : 'text-blue-600'}`}>2. Adquisición</h3>
                    <div className="space-y-2">
                      <Input label="Valor vivienda" value={inputs.valorVivienda} onChange={(v) => handleChange('valorVivienda', v)} suffix="€" dm={dm} />
                      <Input label="Entrada" value={inputs.entrada} onChange={(v) => handleChange('entrada', v)} suffix="%" tooltip={TOOLTIPS.EQUITY_INICIAL} dm={dm} />
                      <Input label="Gastos hipoteca" value={inputs.gastosHipoteca} onChange={(v) => handleChange('gastosHipoteca', v)} step="0.1" suffix="%" dm={dm} />
                      <Input label="ITP" value={inputs.impuestoITP} onChange={(v) => handleChange('impuestoITP', v)} suffix="%" tooltip={TOOLTIPS.ITP} dm={dm} />
                      <Input label="Comisión agencia" value={inputs.comisionAgencia} onChange={(v) => handleChange('comisionAgencia', v)} suffix="%" dm={dm} />
                      <Input label="Registro + Notaría" value={inputs.gastosRegistroNotaria} onChange={(v) => handleChange('gastosRegistroNotaria', v)} suffix="%" dm={dm} />
                      <Input label="Años hipoteca" value={inputs.anosHipoteca} onChange={(v) => handleChange('anosHipoteca', v)} dm={dm} />
                      <Input label="Tipo interés" value={inputs.tipoInteres} onChange={(v) => handleChange('tipoInteres', v)} step="0.1" suffix="%" dm={dm} />
                    </div>
                  </div>
                  <div className={`pb-4 border-b ${hdrBorder}`}>
                    <h3 className={`text-base font-semibold mb-3 ${dm ? 'text-blue-400' : 'text-blue-600'}`}>Gastos operativos</h3>
                    <div className="space-y-2">
                      <Input label="Comunidad" value={inputs.gastosComunidad} onChange={(v) => handleChange('gastosComunidad', v)} step="0.01" suffix="%" tooltip={TOOLTIPS.COMUNIDAD} dm={dm} />
                      <Input label="IBI" value={inputs.ibi} onChange={(v) => handleChange('ibi', v)} step="0.01" suffix="%" tooltip={TOOLTIPS.IBI} dm={dm} />
                      <Input label="Mantenimiento" value={inputs.mantenimiento} onChange={(v) => handleChange('mantenimiento', v)} step="0.01" suffix="%" dm={dm} />
                      <Input label="Derramas" value={inputs.derramas} onChange={(v) => handleChange('derramas', v)} step="0.01" suffix="%" tooltip={TOOLTIPS.DERRAMAS} dm={dm} />
                    </div>
                  </div>
                  <div className={`pb-4 border-b ${hdrBorder}`}>
                    <h3 className={`text-base font-semibold mb-3 ${dm ? 'text-blue-400' : 'text-blue-600'}`}>3. Alquiler</h3>
                    <div className="space-y-2">
                      <Input label="Alquiler mensual" value={inputs.alquilerMensual} onChange={(v) => handleChange('alquilerMensual', v)} suffix="€" dm={dm} />
                      <Input label="Ocupación" value={inputs.ocupacion} onChange={(v) => handleChange('ocupacion', v)} step="0.1" suffix="%" tooltip={TOOLTIPS.OCUPACION} dm={dm} />
                      <Input label="Subida alquiler/año" value={inputs.subidaAlquiler} onChange={(v) => handleChange('subidaAlquiler', v)} step="0.1" suffix="%" dm={dm} />
                      <Input label="Revalorización/año" value={inputs.subidaPrecioVivienda} onChange={(v) => handleChange('subidaPrecioVivienda', v)} step="0.1" suffix="%" dm={dm} />
                    </div>
                  </div>
                  <div className={`pb-4 border-b ${hdrBorder}`}>
                    <h3 className={`text-base font-semibold mb-3 ${dm ? 'text-blue-400' : 'text-blue-600'}`}>Salida</h3>
                    <div className="space-y-2">
                      <Checkbox label="Incluir venta futura" checked={inputs.ventaFutura} onChange={(v) => handleChange('ventaFutura', v)} dm={dm} />
                      {inputs.ventaFutura && <Input label="Años hasta venta" value={inputs.anosHastaVenta} onChange={(v) => handleChange('anosHastaVenta', v)} dm={dm} />}
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-base font-semibold mb-3 ${dm ? 'text-blue-400' : 'text-blue-600'}`}>Criterios</h3>
                    <div className="space-y-2">
                      <Input label="TIR mínima" value={inputs.tirMinima} onChange={(v) => handleChange('tirMinima', v)} suffix="%" tooltip={TOOLTIPS.TIR} dm={dm} />
                      <Input label="CoC mínimo" value={inputs.cocMinimo} onChange={(v) => handleChange('cocMinimo', v)} suffix="%" tooltip={TOOLTIPS.COC} dm={dm} />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-5">
              {/* Decision Panel */}
              <div className={`rounded-xl border-2 p-5 ${m.rec ? (dm ? 'bg-emerald-900/40 border-emerald-600' : 'bg-emerald-50 border-emerald-300') : (dm ? 'bg-red-900/40 border-red-600' : 'bg-red-50 border-red-300')}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={m.rec ? (dm ? 'text-emerald-400' : 'text-emerald-600') : (dm ? 'text-red-400' : 'text-red-600')}>{m.rec ? <Icons.Check /> : <Icons.X />}</div>
                  <div>
                    <h2 className={`text-2xl font-bold ${m.rec ? (dm ? 'text-emerald-400' : 'text-emerald-700') : (dm ? 'text-red-400' : 'text-red-700')}`}>{m.rec ? 'COMPRA RECOMENDADA' : 'NO RECOMENDADO'}</h2>
                    <p className={txtSec}>Análisis según criterios definidos</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'TIR', tooltip: TOOLTIPS.TIR, ok: m.cTIR, val: pct(m.tir), min: pct(inputs.tirMinima) },
                    { label: 'Cash-on-Cash', tooltip: TOOLTIPS.COC, ok: m.cCoC, val: pct(m.coc), min: pct(inputs.cocMinimo) },
                    { label: 'DSCR', tooltip: TOOLTIPS.DSCR, ok: m.cDSCR, val: ratio(m.dscr), min: '1.25x' },
                    { label: 'Cashflows', tooltip: TOOLTIPS.CASHFLOW, ok: m.cCF, val: m.cCF ? 'Positivos' : 'Negativos', min: 'Positivos' }
                  ].map((c, i) => (
                    <div key={i} className={`p-2.5 rounded-lg border ${c.ok ? (dm ? 'bg-emerald-900/30 border-emerald-700/30' : 'bg-emerald-100/50 border-emerald-200') : (dm ? 'bg-red-900/30 border-red-700/30' : 'bg-red-100/50 border-red-200')}`}>
                      <div className={`text-sm ${txtSec}`}><Label label={c.label} tooltip={c.tooltip} dm={dm} /></div>
                      <div className={`font-semibold ${c.ok ? (dm ? 'text-emerald-300' : 'text-emerald-700') : (dm ? 'text-red-300' : 'text-red-700')}`}>{c.ok ? '✓' : '✗'} {c.val}</div>
                      <div className={`text-xs ${dm ? 'text-slate-500' : 'text-slate-400'}`}>Mín: {c.min}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Key Metrics */}
                <Card dm={dm}>
                  <div className="flex items-center gap-2 mb-4"><Icons.TrendingUp /><h2 className={`text-lg font-bold ${txt}`}>Métricas Clave</h2></div>
                  <div className="grid grid-cols-2 gap-2">
                    <MetricCard label={<Label label="TIR" tooltip={TOOLTIPS.TIR} dm={dm} />} value={pct(m.tir)} subValue={`Mín: ${pct(inputs.tirMinima)}`} variant={m.cTIR ? 'success' : 'danger'} dm={dm} />
                    <MetricCard label={<Label label="Cash-on-Cash" tooltip={TOOLTIPS.COC} dm={dm} />} value={pct(m.coc)} subValue={`Mín: ${pct(inputs.cocMinimo)}`} variant={m.cCoC ? 'success' : 'danger'} dm={dm} />
                    <MetricCard label={<Label label="DSCR" tooltip={TOOLTIPS.DSCR} dm={dm} />} value={ratio(m.dscr)} subValue="Mín: 1.25x" variant={m.cDSCR ? 'success' : 'danger'} dm={dm} />
                    <MetricCard label={<Label label="Rent. Bruta" tooltip={TOOLTIPS.RENTABILIDAD_BRUTA} dm={dm} />} value={pct(m.rb)} variant="default" dm={dm} />
                    <MetricCard label={<Label label="Equity Multiple" tooltip={TOOLTIPS.EQUITY_MULTIPLE} dm={dm} />} value={ratio(m.em)} variant={m.em >= 2 ? 'success' : 'default'} dm={dm} />
                    <MetricCard label="Ganancia Total" value={fmt(m.gt)} variant={m.gt > 0 ? 'highlight' : 'danger'} dm={dm} />
                  </div>
                </Card>

                {/* Investment Summary */}
                <Card dm={dm}>
                  <div className="flex items-center gap-2 mb-4"><Icons.Wallet /><h2 className={`text-lg font-bold ${txt}`}>Resumen Inversión</h2></div>
                  <div className="space-y-0.5">
                    <Row label="Valor vivienda" value={fmt(m.vv)} dm={dm} />
                    <Row label="Entrada" value={fmt(m.ie)} indent dm={dm} />
                    <Row label="Hipoteca" value={fmt(m.ih)} indent dm={dm} />
                    <div className={`my-2 border-t ${hdrBorder}`} />
                    <Row label={<Label label="Costes adquisición" tooltip={TOOLTIPS.EQUITY_INICIAL} dm={dm} />} value={fmt(m.tca)} dm={dm} />
                    <Row label="• ITP" value={fmt(m.ca.itp)} indent dm={dm} />
                    <Row label="• Comisión" value={fmt(m.ca.com)} indent dm={dm} />
                    <Row label="• Gastos hip." value={fmt(m.ca.gh)} indent dm={dm} />
                    <Row label="• Registro/Not." value={fmt(m.ca.rn)} indent dm={dm} />
                    <div className={`my-2 border-t ${hdrBorder}`} />
                    <Row label={<Label label="EQUITY INICIAL" tooltip={TOOLTIPS.EQUITY_INICIAL} dm={dm} />} value={fmt(m.eq)} highlight dm={dm} />
                    <Row label={<Label label="LTV" tooltip={TOOLTIPS.LTV} dm={dm} />} value={pct(m.ltv)} dm={dm} />
                    <div className={`my-2 border-t ${hdrBorder}`} />
                    <Row label="Cuota mensual" value={fmt(m.cm)} highlight dm={dm} />
                    <Row label="Cuota anual" value={fmt(m.cy)} dm={dm} />
                  </div>
                </Card>
              </div>

              {/* Cashflow Table */}
              <div className={`rounded-xl border ${hdrBorder} overflow-hidden`}>
                <button onClick={() => setCfExpanded(!cfExpanded)} className={`w-full flex items-center justify-between p-4 ${dm ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <h3 className={`text-lg font-semibold ${txt}`}>Proyección de Cashflows</h3>
                  {cfExpanded ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
                </button>
                {cfExpanded && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`${dm ? 'bg-slate-700' : 'bg-slate-100'} border-b ${hdrBorder}`}>
                          {['Año', 'Ing. Alquiler', 'Gastos Op.', 'NOI', 'Intereses', 'Cuota', 'Impuestos', 'CF Neto', 'Valor Prop.'].map(h => (
                            <th key={h} className={`text-${h === 'Año' ? 'left' : 'right'} p-2.5 ${txtSec} font-semibold`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {m.cfs.map((cf, i) => (
                          <tr key={i} className={`border-b ${hdrBorder} ${dm ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'} ${cf.ev ? (dm ? 'bg-amber-900/20' : 'bg-amber-50') : ''}`}>
                            <td className={`p-2.5 ${dm ? 'text-slate-300' : 'text-slate-700'}`}><span className="font-medium">{cf.ano}</span>{cf.ev && <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${dm ? 'bg-amber-700 text-amber-100' : 'bg-amber-200 text-amber-800'}`}>VENTA</span>}</td>
                            <td className={`p-2.5 text-right ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{fmt(cf.iba)}</td>
                            <td className={`p-2.5 text-right ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{fmt(cf.go)}</td>
                            <td className={`p-2.5 text-right font-medium ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{fmt(cf.cfo)}</td>
                            <td className={`p-2.5 text-right ${dm ? 'text-slate-400' : 'text-slate-500'}`}>{fmt(cf.int)}</td>
                            <td className={`p-2.5 text-right ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{fmt(cf.ch + cf.rh)}</td>
                            <td className={`p-2.5 text-right ${dm ? 'text-red-400' : 'text-red-600'}`}>{fmt(cf.tImp)}</td>
                            <td className={`p-2.5 text-right font-bold ${valClass(cf.cfn, dm)}`}>{fmt(cf.cfn)}</td>
                            <td className={`p-2.5 text-right ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{fmt(cf.vv)}</td>
                          </tr>
                        ))}
                        <tr className={`font-bold ${dm ? 'bg-slate-700' : 'bg-slate-100'}`}>
                          <td className={`p-2.5 ${txt}`}>TOTAL</td>
                          <td className={`p-2.5 text-right ${txt}`}>{fmt(totales.iba)}</td>
                          <td className={`p-2.5 text-right ${txt}`}>{fmt(totales.go)}</td>
                          <td className={`p-2.5 text-right ${txt}`}>{fmt(totales.cfo)}</td>
                          <td className={`p-2.5 text-right ${txt}`}>{fmt(totales.int)}</td>
                          <td className={`p-2.5 text-right ${txt}`}>{fmt(totales.ch)}</td>
                          <td className={`p-2.5 text-right ${txt}`}>{fmt(totales.tImp)}</td>
                          <td className={`p-2.5 text-right text-lg ${valClass(totales.cfn, dm)}`}>{fmt(totales.cfn)}</td>
                          <td className="p-2.5"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sell' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-1">
              <Card dm={dm}>
                <h2 className={`text-lg font-bold mb-4 ${txt}`}>Parámetros</h2>
                <p className={`text-sm mb-4 ${txtSec}`}>Los parámetros de la pestaña "Análisis" se aplican aquí también.</p>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <div className={`rounded-xl border ${hdrBorder} overflow-hidden`}>
                <div className={`${dm ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50' : 'bg-gradient-to-r from-blue-50 to-purple-50'} p-5 border-b ${hdrBorder}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${dm ? 'bg-blue-500/20' : 'bg-blue-100'}`}><Icons.Calculator /></div>
                    <div>
                      <h3 className={`text-xl font-bold ${txt}`}>Simulador de Venta Anticipada</h3>
                      <p className={txtSec}>¿Qué rentabilidad obtendrías si vendieras hoy?</p>
                    </div>
                  </div>
                </div>

                <div className={`${dm ? 'bg-slate-800/80' : 'bg-white'} p-5`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                      <Input label="Año actual de tenencia" value={anoVenta} onChange={setAnoVenta} tooltip={TOOLTIPS.APALANCAMIENTO} dm={dm} />
                      <p className={`text-xs mt-1 ${dm ? 'text-slate-500' : 'text-slate-400'}`}>¿Cuántos años llevas con la propiedad?</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" checked={usarManual} onChange={(e) => setUsarManual(e.target.checked)} className="w-4 h-4 rounded" />
                        <span className={`text-sm ${txtSec}`}>Usar valor de venta manual</span>
                      </div>
                      {usarManual ? (
                        <Input label="Valor de venta (€)" value={valorManual || valorEst} onChange={setValorManual} dm={dm} />
                      ) : (
                        <div className={`p-3 rounded-lg ${dm ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
                          <div className={`text-sm ${txtSec}`}>Valor estimado (proyección)</div>
                          <div className={`text-xl font-bold ${txt}`}>{fmt(valorEst)}</div>
                          <div className={`text-xs ${dm ? 'text-slate-500' : 'text-slate-400'}`}>+{pct(inputs.subidaPrecioVivienda * esc.revalorizacion)} anual</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
                    <MetricCard label="TIR Venta" value={pct(venta.tir)} variant={venta.tir >= inputs.tirMinima ? 'success' : 'danger'} dm={dm} />
                    <MetricCard label={<Label label="Equity Multiple" tooltip={TOOLTIPS.EQUITY_MULTIPLE} dm={dm} />} value={ratio(venta.em)} variant={venta.em >= 1 ? 'success' : 'danger'} dm={dm} />
                    <MetricCard label="Ganancia Total" value={fmt(venta.ga)} variant={venta.ga >= 0 ? 'success' : 'danger'} dm={dm} />
                    <MetricCard label={<Label label="Rent. Anual Apal." tooltip={TOOLTIPS.RENTABILIDAD_APALANCADA} dm={dm} />} value={pct(venta.ra)} variant="highlight" dm={dm} />
                  </div>

                  <div className={`rounded-lg border ${hdrBorder} overflow-hidden`}>
                    <div className={`px-4 py-3 ${dm ? 'bg-slate-700/50' : 'bg-slate-50'} border-b ${hdrBorder}`}>
                      <h4 className={`font-semibold ${txt}`}>Desglose de la operación</h4>
                    </div>
                    <div className="p-4 space-y-0.5">
                      <div className={`text-sm font-semibold mb-2 ${txtSec}`}>Inversión Inicial</div>
                      <Row label={<Label label="Equity inicial" tooltip={TOOLTIPS.EQUITY_INICIAL} dm={dm} />} value={fmt(venta.eq)} dm={dm} />
                      
                      <div className={`text-sm font-semibold mt-4 mb-2 ${txtSec}`}>Durante {anoVenta} año{anoVenta !== 1 ? 's' : ''} de tenencia</div>
                      <Row label="Cashflows acumulados" value={fmt(venta.cfAc)} dm={dm} />
                      
                      <div className={`text-sm font-semibold mt-4 mb-2 ${txtSec}`}>En la venta</div>
                      <Row label={<Label label="Valor de venta" tooltip={TOOLTIPS.VALOR_LIQUIDACION} dm={dm} />} value={fmt(venta.va)} dm={dm} />
                      <Row label={<Label label="Saldo hipoteca" tooltip={TOOLTIPS.SALDO_HIPOTECA} dm={dm} />} value={`-${fmt(venta.shp)}`} indent dm={dm} />
                      <Row label={<Label label="Impuestos venta" tooltip={TOOLTIPS.GANANCIA_PATRIMONIAL} dm={dm} />} value={`-${fmt(venta.iv)}`} indent dm={dm} />
                      <Row label={<Label label="Valor liquidación" tooltip={TOOLTIPS.VALOR_LIQUIDACION} dm={dm} />} value={fmt(venta.vl)} highlight dm={dm} />
                      
                      <div className={`mt-4 pt-4 border-t ${hdrBorder}`}>
                        <Row label="RETORNO TOTAL" value={fmt(venta.rt)} highlight dm={dm} />
                        <div className={`mt-3 p-4 rounded-lg ${venta.ga >= 0 ? (dm ? 'bg-emerald-900/30 border border-emerald-700/50' : 'bg-emerald-50 border border-emerald-200') : (dm ? 'bg-red-900/30 border border-red-700/50' : 'bg-red-50 border border-red-200')}`}>
                          <div className="flex justify-between items-center">
                            <span className={`font-semibold ${venta.ga >= 0 ? (dm ? 'text-emerald-400' : 'text-emerald-700') : (dm ? 'text-red-400' : 'text-red-700')}`}>GANANCIA NETA</span>
                            <span className={`text-2xl font-bold ${valClass(venta.ga, dm)}`}>{fmt(venta.ga)}</span>
                          </div>
                          <p className={`text-sm mt-2 ${txtSec}`}>
                            Con {fmt(venta.eq)} de inversión, en {anoVenta} año{anoVenta !== 1 ? 's' : ''} obtienes {fmt(venta.rt)}, una rentabilidad del {pct(venta.ra)} anual sobre tu capital.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className={`mt-10 py-5 border-t ${hdrBorder}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={`text-sm ${txtSec}`}>Análisis de Inversión Inmobiliaria • Calculadora de rentabilidad apalancada</p>
        </div>
      </footer>
    </div>
  );
}
