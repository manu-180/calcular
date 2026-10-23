import type { MundoCalculadora, ResultadoBase, ValorResuelto } from "../tipos";

export type ValorFijo = string | number | boolean;

export interface ContextoAdaptador {
  valores: Readonly<Record<string, ValorResuelto>>;
  crudos: Readonly<Record<string, string | boolean>>;
  // Un dato numérico del país vigente a la fecha, aunque la calculadora no lo pida en requiere.
  numero(id: string): number;
}

// Una calculadora de sueldo neto que no descuenta el impuesto a la renta (Francia lo cobra aparte)
// se completa con la calculadora oficial del impuesto del mismo país. Neto = neto − impuesto anual.
export interface ImpuestoAparte {
  calculadora: string;
  entrada(r: ResultadoBase, brutoAnual: number): Readonly<Record<string, ValorFijo>>;
  clave: string;
}

export interface AdaptadorMundo extends MundoCalculadora {
  nota?: string;
  entradaSegun?(valorCampo: number, ctx: ContextoAdaptador): Readonly<Record<string, ValorFijo>>;
  // Con brutoAnual la grilla busca el valor del campo que da ese bruto anual (bisección/secante).
  brutoAnual?(r: ResultadoBase, ctx: ContextoAdaptador): number;
  netoAnual?(r: ResultadoBase, ctx: ContextoAdaptador): number;
  impuesto?: ImpuestoAparte;
  // Solo para el traspaso (lo que la persona cargó en su calculadora): cuántos meses de sueldo es el
  // monto según la opción del selector de período, campos que se suman al bruto y condiciones para
  // que el monto sea un bruto (Francia deja cargar el neto).
  periodoPago?: { campo: string; aMes: Readonly<Record<string, number>> };
  sumarAlBruto?: readonly string[];
  traspasoSi?: Readonly<Record<string, string | boolean>>;
}

export interface ExclusionFija {
  excluir: string;
}

export type EntradaAdaptadores = AdaptadorMundo | ExclusionFija;

export function esExclusion(a: EntradaAdaptadores): a is ExclusionFija {
  return "excluir" in a;
}

const n = (r: ResultadoBase, clave: string): number => {
  const v = r[clave];
  if (typeof v !== "number" || !Number.isFinite(v)) throw new Error(`la calculadora no devolvió ${clave}`);
  return v;
};

// Tabla de las calculadoras de sueldo neto que existían al armar la grilla (2026-10-23). Una nueva no
// necesita estar acá: el país declara `mundo` en su definición o el motor la infiere (inferir.ts).
// pagasAnuales = sueldos que paga la ley en el año; el bruto anual se reparte en esas pagas y cada
// paga extra se descuenta igual que un sueldo (donde la ley la exime, la carga real es algo menor).
export const ADAPTADORES: Readonly<Record<string, EntradaAdaptadores>> = {
  "cl.sueldo-liquido": {
    bruto: "imponible",
    periodoBruto: "mes",
    neto: "liquido",
    periodoNeto: "mes",
    nota: "Sin gratificación legal aparte. AFP: la de menor comisión, que es la que recibe por licitación a quien entra a trabajar.",
    entradaSegun: (_, ctx) => {
      const comisiones = ctx.valores["cl.comision-afp"] as Readonly<Record<string, number>>;
      const [afp] = Object.entries(comisiones).sort((a, b) => a[1] - b[1])[0];
      return { afp };
    },
  },
  "co.salario-neto": {
    bruto: "salario",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    pagasAnuales: 13,
    entrada: { auxilio: false, dependiente: false },
    nota: "13 pagas: la prima de servicios equivale a un salario al año. Sin auxilio de transporte (no es sueldo) ni cesantías (van a un fondo).",
  },
  "mx.sueldo-neto": {
    bruto: "sueldo",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    pagasAnuales: 12.5,
    entrada: { periodo: "mensual" },
    nota: "12,5 pagas: el aguinaldo mínimo de ley son 15 días de salario.",
    periodoPago: { campo: "periodo", aMes: { mensual: 1, quincenal: 30.4 / 15, decenal: 30.4 / 10, semanal: 30.4 / 7 } },
  },
  "pe.sueldo-neto": {
    bruto: "sueldo",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    pagasAnuales: 14,
    nota: "14 sueldos con las gratificaciones de julio y diciembre más la bonificación extraordinaria, que no pagan aporte de pensión. Sin CTS (va a un depósito).",
    brutoAnual: (r, ctx) => {
      const tasas = ctx.valores["pe.bonificacion-extraordinaria"] as Readonly<Record<string, number>>;
      const tasa = tasas[String(ctx.crudos.seguro)];
      if (typeof tasa !== "number") throw new Error(`sin tasa de bonificación para ${String(ctx.crudos.seguro)}`);
      return n(r, "bruto") * (14 + (2 * tasa) / 100);
    },
    netoAnual: (r, ctx) => {
      const tasas = ctx.valores["pe.bonificacion-extraordinaria"] as Readonly<Record<string, number>>;
      const tasa = tasas[String(ctx.crudos.seguro)];
      return n(r, "bruto") * (14 + (2 * tasa) / 100) - 12 * n(r, "pension") - 12 * n(r, "quinta");
    },
  },
  "uy.sueldo-liquido": { bruto: "nominal", periodoBruto: "mes", neto: "liquido", periodoNeto: "mes", pagasAnuales: 13, nota: "13 pagas con el aguinaldo." },
  "ec.sueldo-neto": {
    bruto: "sueldo",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    pagasAnuales: 13,
    entrada: { decimos: true },
    nota: "Bruto anual = 12 sueldos + décimo tercero (un sueldo) + décimo cuarto (un salario básico unificado). Sin fondo de reserva (empieza al segundo año).",
    brutoAnual: (r) => 12 * (n(r, "sueldo") + n(r, "decimoTercero") + n(r, "decimoCuarto")),
    netoAnual: (r) => 12 * (n(r, "sueldo") - n(r, "aporte") + n(r, "decimoTercero") + n(r, "decimoCuarto")) - n(r, "impuestoAnual"),
  },
  "cr.salario-neto": { bruto: "salario", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", pagasAnuales: 13, nota: "13 pagas con el aguinaldo." },
  "gt.sueldo-liquido": { bruto: "sueldo", periodoBruto: "mes", neto: "liquido", periodoNeto: "mes", pagasAnuales: 14, sumarAlBruto: ["bonificaciones"], nota: "14 pagas: aguinaldo y bono 14." },
  "py.salario-neto": {
    bruto: "bruto",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    pagasAnuales: 13,
    nota: "13 pagas con el aguinaldo. El IRP no se retiene en el recibo: se resta con la calculadora de IRP sobre todo lo cobrado en el año y sin gastos deducibles.",
    impuesto: { calculadora: "py.irp", entrada: (_, bruto) => ({ ingresos: bruto, gastos: 0 }), clave: "impuesto" },
  },
  "do.salario-neto": { bruto: "salario", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", pagasAnuales: 13, nota: "13 pagas con el salario de Navidad." },
  "sv.salario-liquido": {
    bruto: "salario",
    periodoBruto: "mes",
    neto: "liquido",
    periodoNeto: "mes",
    pagasAnuales: 12.5,
    entrada: { periodo: "mensual" },
    nota: "12,5 pagas: el aguinaldo mínimo de ley son 15 días de salario.",
    periodoPago: { campo: "periodo", aMes: { mensual: 1, quincenal: 2 } },
  },
  "pa.salario-neto": { bruto: "salario", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", pagasAnuales: 13, nota: "13 pagas con el décimo tercer mes." },
  "hn.salario-neto": { bruto: "salario", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", pagasAnuales: 14, nota: "14 pagas: décimo tercer y décimo cuarto mes." },
  "ni.salario-neto": { bruto: "salario", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", pagasAnuales: 13, nota: "13 pagas con el décimo tercer mes." },
  "ve.salario-neto": { bruto: "salario", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { moneda: "VES" } },
  "bo.sueldo-liquido": { bruto: "totalGanado", periodoBruto: "mes", neto: "liquido", periodoNeto: "mes", pagasAnuales: 13, nota: "13 pagas con el aguinaldo. Sin facturas para el RC-IVA." },
  "us.take-home-pay": {
    bruto: "sueldo",
    periodoBruto: "anio",
    neto: "netoAnual",
    periodoNeto: "anio",
    entrada: { estado: "single", aporte: 0 },
    nota: "Impuesto federal y FICA; sin impuesto estatal ni local (como en Texas o Florida).",
  },
  "br.salario-liquido": {
    bruto: "salarioBruto",
    periodoBruto: "mes",
    neto: "liquido",
    periodoNeto: "mes",
    pagasAnuales: 12 + 1 + 1 / 3,
    nota: "13⅓ pagas: 13º salário y el tercio constitucional de vacaciones.",
  },
  "gb.take-home-pay": { bruto: "salario", periodoBruto: "anio", neto: "anual", periodoNeto: "anio", nota: "Inglaterra, sin préstamo de estudios ni aporte a pensión." },
  "fr.salaire-brut-net": {
    bruto: "montant",
    periodoBruto: "anio",
    neto: "netAvantImpot",
    periodoNeto: "anio",
    entrada: { sens: "brut", periode: "an", statut: "non-cadre", alsaceMoselle: false },
    periodoPago: { campo: "periode", aMes: { an: 1 / 12, mois: 1 } },
    traspasoSi: { sens: "brut" },
    nota: "El impuesto a la renta se resta con la calculadora oficial del impuesto (una parte, sin hijos) sobre el neto imponible.",
    impuesto: {
      calculadora: "fr.impot-sur-le-revenu",
      entrada: (r) => ({ situation: "seul", typeRevenu: "salaires", revenu1: n(r, "netImposable"), enfants: 0, parentIsole: false }),
      clave: "impotNet",
    },
  },
  "de.brutto-netto-rechner": { bruto: "brutto", periodoBruto: "mes", neto: "netto", periodoNeto: "mes", nota: "Steuerklasse I, Nordrhein-Westfalen, sin iglesia." },
  "es.sueldo-neto": { bruto: "bruto", periodoBruto: "anio", neto: "netoAnual", periodoNeto: "anio", entrada: { pagas: "14" }, nota: "14 pagas, contrato indefinido." },
  "it.stipendio-netto": { bruto: "ral", periodoBruto: "anio", neto: "nettoAnnuo", periodoNeto: "anio" },
  "ca.take-home-pay": { bruto: "salario", periodoBruto: "anio", neto: "anual", periodoNeto: "anio", entrada: { pension: 0 }, nota: "Ontario." },
  "nl.bruto-netto-salaris": {
    bruto: "bruto",
    periodoBruto: "anio",
    neto: "nettoJaar",
    periodoNeto: "anio",
    entrada: { periode: "jaar", vakantiegeld: false, dertiendeMaand: false, pensioen: 0 },
    periodoPago: { campo: "periode", aMes: { jaar: 1 / 12, maand: 1 } },
    brutoResultado: "brutoJaar",
    nota: "El bruto anual ya incluye la paga de vacaciones (vakantiegeld).",
  },
  "ie.take-home-pay": { bruto: "salario", periodoBruto: "anio", neto: "anual", periodoNeto: "anio", entrada: { alquiler: 0 } },
  "at.brutto-netto-rechner": { bruto: "brutto", periodoBruto: "mes", neto: "nettoJahr", periodoNeto: "anio", pagasAnuales: 14, nota: "14 pagas (Urlaubs- y Weihnachtsgeld), fuera de Viena." },
  "pt.salario-liquido": { bruto: "bruto", periodoBruto: "mes", neto: "anual", periodoNeto: "anio", pagasAnuales: 14, nota: "14 pagas (subsidios de vacaciones y de Navidad)." },
  "au.pay-calculator": { bruto: "salario", periodoBruto: "anio", neto: "neto", periodoNeto: "anio", entrada: { periodo: "anual", incluyeSuper: false, help: false },
    nota: "Sin el super que paga el empleador.",
    periodoPago: { campo: "periodo", aMes: { anual: 1 / 12, mensual: 1, quincenal: 26 / 12, semanal: 52 / 12 } },
  },
  "nz.take-home-pay": { bruto: "salario", periodoBruto: "anio", neto: "anual", periodoNeto: "anio", entrada: { periodo: "year", kiwisaver: "none" },
    nota: "Sin aporte voluntario a KiwiSaver.",
    periodoPago: { campo: "periodo", aMes: { year: 1 / 12, month: 1, fortnight: 26 / 12, week: 52 / 12 } },
  },
  "za.take-home-pay": { bruto: "salario", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { retiro: 0 } },
  "ch.brutto-netto-rechner": {
    excluir: "la calculadora de sueldo neto no descuenta impuestos a la renta (en Suiza se pagan aparte y la mayor parte es cantonal y comunal; el motor solo tiene la federal)",
  },
  "sg.take-home-pay": {
    bruto: "salario",
    periodoBruto: "mes",
    neto: "anual",
    periodoNeto: "anio",
    nota: "Ciudadano o residente permanente. El impuesto a la renta no se retiene: se resta con la calculadora oficial del impuesto, con el CPF propio como alivio.",
    impuesto: {
      calculadora: "sg.income-tax-calculator",
      entrada: (r, bruto) => ({ ingreso: bruto, cpf: 12 * n(r, "cpfEmpleado"), otros: 0 }),
      clave: "impuesto",
    },
  },
  "be.bruto-netto-berekenen": { bruto: "bruto", periodoBruto: "mes", neto: "netto", periodoNeto: "mes", nota: "Empleado (bediende), sin el doble pago de vacaciones ni la prima de fin de año." },
  "in.in-hand-salary-calculator": {
    bruto: "ctc",
    periodoBruto: "anio",
    neto: "anual",
    periodoNeto: "anio",
    brutoResultado: "bruto",
    nota: "El bruto es el sueldo bruto, no el CTC: el PF y la gratuity del empleador quedan afuera. Régimen nuevo.",
  },
  "hk.take-home-pay": { bruto: "sueldo", periodoBruto: "mes", neto: "netoAnual", periodoNeto: "anio", entrada: { bono: 0 }, nota: "Después del MPF y del impuesto estimado del año." },
  "ng.net-salary-calculator": {
    bruto: "basico",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    entrada: { vivienda: 0, transporte: 0, otros: 0, alquiler: 0 },
    sumarAlBruto: ["vivienda", "transporte", "otros"],
    brutoResultado: "bruto",
    nota: "Todo el sueldo como básico y sin alquiler declarado.",
  },
  "my.take-home-pay": {
    bruto: "bruto",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    nota: "EPF propio a la tasa general sobre el sueldo.",
    entradaSegun: (bruto, ctx) => ({ epf: Math.round(bruto * ctx.numero("my.epf-employee-rate")) / 100 }),
  },
  "ph.take-home-pay": { bruto: "sueldo", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", pagasAnuales: 13, entrada: { minimo: false }, nota: "13 pagas con el 13th month pay." },
  "ma.calcul-salaire-net": { bruto: "brut", periodoBruto: "mes", neto: "net", periodoNeto: "mes" },
  "lu.salaire-brut-net": { bruto: "brut", periodoBruto: "mes", neto: "net", periodoNeto: "mes", nota: "Clase de impuesto 1." },
  "ke.net-salary-calculator": { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
  "tz.net-salary-calculator": { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { heslb: false } },
  "gh.take-home-pay": { bruto: "basico", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { subsidios: 0, tier3: 0 }, sumarAlBruto: ["subsidios"] },
  "pk.take-home-salary-calculator": { bruto: "mensual", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { otros: 0 } },
};

export function notaMundo(calculadora: string): string | undefined {
  const a = ADAPTADORES[calculadora];
  return a && !esExclusion(a) ? a.nota : undefined;
}
