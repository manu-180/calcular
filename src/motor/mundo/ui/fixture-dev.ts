import { BRUTOS_GRILLA } from "../calculo";
import type { GrillaMundo, PaisMundo } from "../tipos";

// SOLO PARA `next dev` mientras grillaMundo() sea el stub: once países con tramos aproximados (no son
// los datos oficiales, no se publican nunca). La página la importa con import() detrás de
// NODE_ENV === "development" (src/app/(intl)/intl/[mercado]/_mundo/datos.ts).

type Tramos = readonly (readonly [hasta: number, tasa: number])[];

function progresivo(base: number, tramos: Tramos): number {
  let impuesto = 0;
  let desde = 0;
  for (const [hasta, tasa] of tramos) {
    if (base <= desde) break;
    impuesto += (Math.min(base, hasta) - desde) * tasa;
    desde = hasta;
  }
  return impuesto;
}

const INF = Number.POSITIVE_INFINITY;

const MODELOS: Record<string, { iso: string; moneda: string; ppa: number; ruta: string; sitio?: "ar"; neto: (bruto: number) => number }> = {
  us: {
    iso: "US",
    moneda: "USD",
    ppa: 1,
    ruta: "/us/paycheck-calculator",
    neto: (b) => {
      const fica = Math.min(b, 176100) * 0.062 + b * 0.0145;
      const renta = progresivo(Math.max(0, b - 15000), [[11925, 0.1], [48475, 0.12], [103350, 0.22], [197300, 0.24], [250525, 0.32], [626350, 0.35], [INF, 0.37]]);
      return b - fica - renta;
    },
  },
  mx: {
    iso: "MX",
    moneda: "MXN",
    ppa: 10.1,
    ruta: "/mx/sueldo-neto",
    neto: (b) =>
      b -
      b * 0.028 -
      progresivo(b, [[8952, 0.0192], [75985, 0.064], [133536, 0.1088], [155230, 0.16], [185853, 0.1792], [374838, 0.2136], [590796, 0.2352], [1127927, 0.3], [1503902, 0.32], [4511707, 0.34], [INF, 0.35]]),
  },
  de: {
    iso: "DE",
    moneda: "EUR",
    ppa: 0.72,
    ruta: "/de/brutto-netto-rechner",
    neto: (b) => {
      const social = Math.min(b, 96600) * 0.106 + Math.min(b, 66150) * 0.109;
      return b - social - progresivo(b, [[12096, 0], [17443, 0.19], [68480, 0.33], [277825, 0.42], [INF, 0.45]]);
    },
  },
  es: {
    iso: "ES",
    moneda: "EUR",
    ppa: 0.62,
    ruta: "/es/sueldo-neto",
    neto: (b) => {
      const ss = Math.min(b, 58908) * 0.0647;
      const irpf = Math.max(0, progresivo(Math.max(0, b - ss - 2000), [[12450, 0.19], [20200, 0.24], [35200, 0.3], [60000, 0.37], [300000, 0.45], [INF, 0.47]]) - 5550 * 0.19);
      return b - ss - irpf;
    },
  },
  pt: {
    iso: "PT",
    moneda: "EUR",
    ppa: 0.56,
    ruta: "/pt/salario-liquido",
    neto: (b) => {
      const ss = b * 0.11;
      const irs = progresivo(Math.max(0, b - 4462), [[8059, 0.125], [12160, 0.16], [17233, 0.215], [22306, 0.244], [28400, 0.314], [41629, 0.349], [44987, 0.431], [83696, 0.446], [INF, 0.48]]);
      return b - ss - irs;
    },
  },
  br: {
    iso: "BR",
    moneda: "BRL",
    ppa: 2.5,
    ruta: "/br/salario-liquido",
    neto: (b) => {
      const m = b / 12;
      const inss = progresivo(m, [[1518, 0.075], [2793.88, 0.09], [4190.83, 0.12], [8157.41, 0.14]]);
      const irpf = progresivo(m - inss, [[2259.2, 0], [2826.65, 0.075], [3751.05, 0.15], [4664.68, 0.225], [INF, 0.275]]);
      return (m - inss - irpf) * 12;
    },
  },
  gb: {
    iso: "GB",
    moneda: "GBP",
    ppa: 0.67,
    ruta: "/gb/take-home-pay",
    neto: (b) => {
      const pa = Math.max(0, 12570 - Math.max(0, b - 100000) / 2);
      const it = progresivo(Math.max(0, b - pa), [[37700, 0.2], [125140 - 12570, 0.4], [INF, 0.45]]);
      const ni = progresivo(b, [[12570, 0], [50270, 0.08], [INF, 0.02]]);
      return b - it - ni;
    },
  },
  fr: {
    iso: "FR",
    moneda: "EUR",
    ppa: 0.73,
    ruta: "/fr/salaire-net",
    neto: (b) => {
      const net = b * 0.78;
      return net - progresivo(net * 0.9, [[11497, 0], [29315, 0.11], [83823, 0.3], [180294, 0.41], [INF, 0.45]]);
    },
  },
  ch: {
    iso: "CH",
    moneda: "CHF",
    ppa: 1.08,
    ruta: "/ch/lohnrechner",
    neto: (b) => b - Math.min(b, 148200) * 0.064 - b * 0.05 - progresivo(b, [[18000, 0], [40000, 0.07], [80000, 0.12], [150000, 0.18], [INF, 0.24]]),
  },
  in: {
    iso: "IN",
    moneda: "INR",
    ppa: 22,
    ruta: "/in/salary-calculator",
    neto: (b) => {
      const pf = Math.min(b * 0.06, 21600);
      const base = Math.max(0, b - 75000);
      const tax = base <= 1200000 ? 0 : progresivo(base, [[400000, 0], [800000, 0.05], [1200000, 0.1], [1600000, 0.15], [2000000, 0.2], [2400000, 0.25], [INF, 0.3]]) * 1.04;
      return b - pf - tax;
    },
  },
  ar: {
    iso: "AR",
    moneda: "ARS",
    ppa: 610,
    ruta: "/sueldo-neto",
    sitio: "ar",
    neto: (b) => {
      const aportes = Math.min(b, 40000000) * 0.17;
      const base = Math.max(0, b - aportes - 21000000);
      return b - aportes - progresivo(base, [[2000000, 0.05], [4000000, 0.09], [6000000, 0.12], [9000000, 0.15], [18000000, 0.19], [27000000, 0.23], [40000000, 0.27], [60000000, 0.31], [INF, 0.35]]);
    },
  },
};

export function grillaDePrueba(): GrillaMundo {
  const paises: PaisMundo[] = Object.entries(MODELOS).map(([mercado, m]) => ({
    mercado,
    iso: m.iso,
    moneda: m.moneda,
    ppa: m.ppa,
    anioPpa: 2024,
    calculadora: "sueldo-neto",
    ruta: m.ruta,
    sitio: m.sitio ?? "intl",
    puntos: BRUTOS_GRILLA.map((bruto) => ({ bruto, neto: Math.max(0, m.neto(bruto * m.ppa)) / m.ppa })),
    datosVerificadosEl: "2026-10-01",
  }));
  return {
    version: 1,
    generadoEl: "2026-10-23",
    fuentePpa: { organismo: "Banco Mundial", indicador: "PA.NUS.PRVT.PP", url: "https://data.worldbank.org/indicator/PA.NUS.PRVT.PP", consultadoEl: "2026-10-23" },
    paises,
  };
}
