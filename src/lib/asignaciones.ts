// Motor de asignaciones familiares: tramo por Ingreso del Grupo Familiar, exclusiones y escalones.
//
// ⚠️ ENCUADRE — leer antes de tocar esto. Esto NO liquida un beneficio ni reemplaza a ANSES:
// aplica la tabla oficial del mes al ingreso que declara el usuario. El importe real puede diferir
// por altas/bajas del grupo familiar, por la fecha de alta del beneficio, por la zona declarada por
// el empleador ante ARCA (que no siempre es donde vive el trabajador) y por deudas o retenciones.
//
// LAS TRES REGLAS QUE HACEN LA DIFERENCIA (todas de la cartilla oficial):
//   1. El IGF es la suma de los ingresos brutos de TODO el grupo familiar, pero EXCLUYE horas
//      extras, plus por zona desfavorable y aguinaldo. No es el bruto del recibo.
//   2. Hay DOS topes. El grupal deja afuera al grupo si la suma se pasa; el INDIVIDUAL deja afuera
//      al grupo entero si UNA sola persona se pasa, aunque la suma esté por debajo del grupal.
//   3. La asignación por hijo con discapacidad NO tiene tope: con la autorización de ANSES vigente
//      no rigen topes de ingreso, ni individuales ni del grupo.

import {
  asignacionesVigentes,
  type GrupoMonotributo,
  type TramoIgf,
  type Zona,
} from "@/data/asignaciones";

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Suma de los ingresos declarados. Los vacíos/negativos cuentan como cero. */
export function calcularIgf(ingresos: number[]): number {
  return r2(
    ingresos.reduce((acc, n) => acc + (Number.isFinite(n) && n > 0 ? n : 0), 0),
  );
}

/**
 * Índice del tramo que le corresponde a un IGF dentro de una tabla, o null si queda por encima del
 * último tramo con tope. Un tramo con `hasta: null` no tiene techo: siempre matchea.
 */
export function tramoDe(igf: number, tabla: TramoIgf[]): number | null {
  for (let i = 0; i < tabla.length; i++) {
    const t = tabla[i];
    if (igf >= t.desde - 0.005 && (t.hasta === null || igf <= t.hasta)) return i;
  }
  return null;
}

export type MotivoExclusion = "tope-individual" | "tope-grupal";

export type Concepto = {
  clave: string;
  nombre: string;
  /** Importe unitario del concepto. */
  unitario: number;
  cantidad: number;
  total: number;
  /** "mensual" entra en el total del mes; "unico" es un pago por única vez o anual. */
  frecuencia: "mensual" | "unico";
  detalle?: string;
};

export type Escalon = {
  /** Cuánto falta de IGF para caer al tramo siguiente. */
  margen: number;
  /** IGF a partir del cual se cae de tramo. */
  limite: number;
  /** Cuánto se pierde por mes al cruzar el límite, con el grupo familiar declarado. */
  perdidaMensual: number;
};

export type ResultadoAsignaciones = {
  igf: number;
  /** Tramo de la tabla de hijo/prenatal, o null si el IGF supera el último. */
  tramo: number | null;
  /** Tramo de la tabla de hijo con discapacidad (nunca es null: el último no tiene techo). */
  tramoDiscapacidad: number;
  /** Si el grupo queda afuera de las asignaciones con tope, por qué. */
  exclusion: MotivoExclusion | null;
  /** Ingreso individual que dispara la exclusión, si es ese el motivo. */
  ingresoQueExcluye: number | null;
  conceptos: Concepto[];
  totalMensual: number;
  totalUnico: number;
  /** El escalón: cuánto falta para caer de tramo y cuánto cuesta cruzarlo. null si no aplica. */
  escalon: Escalon | null;
};

export type EntradaAsignaciones = {
  /** Ingresos brutos mensuales de cada integrante del grupo familiar. */
  ingresos: number[];
  zona: Zona;
  hijos: number;
  hijosDiscapacidad: number;
  /** Embarazo en curso: corresponde la asignación prenatal. */
  prenatal: boolean;
  /** Sólo jubilados y pensionados del SIPA. */
  conyuge: boolean;
  /** Sumar la ayuda escolar anual (pago único por ciclo lectivo). */
  ayudaEscolar: boolean;
};

/**
 * Liquida el mes completo sobre la tabla oficial vigente.
 *
 * El orden importa: primero se decide si el grupo está excluido (tope individual o grupal) y recién
 * después se calculan los conceptos, porque las asignaciones con tope caen a cero pero la de hijo
 * con discapacidad se sigue cobrando igual.
 */
export function calcularAsignaciones(e: EntradaAsignaciones): ResultadoAsignaciones {
  const V = asignacionesVigentes();
  const igf = calcularIgf(e.ingresos);
  const zona = e.zona;

  const ingresoQueExcluye =
    e.ingresos.find((n) => Number.isFinite(n) && n > V.topeIgfIndividual) ?? null;

  const exclusion: MotivoExclusion | null = ingresoQueExcluye !== null
    ? "tope-individual"
    : igf > V.topeIgfGrupo
      ? "tope-grupal"
      : null;

  const tramo = tramoDe(igf, V.hijo);
  const tramoDiscapacidad = tramoDe(igf, V.hijoDiscapacidad) ?? V.hijoDiscapacidad.length - 1;

  const conceptos: Concepto[] = [];

  const cobraConTope = exclusion === null && tramo !== null;
  const montoHijo = cobraConTope ? V.hijo[tramo].montos[zona] : 0;

  if (e.hijos > 0) {
    conceptos.push({
      clave: "hijo",
      nombre: "Asignación por hijo",
      unitario: montoHijo,
      cantidad: e.hijos,
      total: montoHijo * e.hijos,
      frecuencia: "mensual",
      detalle: cobraConTope
        ? `Tramo ${tramo! + 1} de 4 · ${etiquetaTramo(V.hijo[tramo!])}`
        : "El grupo familiar quedó fuera del régimen por superar el tope de ingresos.",
    });
  }

  if (e.prenatal) {
    conceptos.push({
      clave: "prenatal",
      nombre: "Asignación prenatal",
      unitario: montoHijo,
      cantidad: 1,
      total: montoHijo,
      frecuencia: "mensual",
      detalle: "Misma tabla que la asignación por hijo, desde el tercer mes de embarazo.",
    });
  }

  if (e.hijosDiscapacidad > 0) {
    const unitario = V.hijoDiscapacidad[tramoDiscapacidad].montos[zona];
    conceptos.push({
      clave: "hijo-discapacidad",
      nombre: "Asignación por hijo con discapacidad",
      unitario,
      cantidad: e.hijosDiscapacidad,
      total: unitario * e.hijosDiscapacidad,
      frecuencia: "mensual",
      detalle:
        "Con la autorización de ANSES vigente no rigen topes de ingreso: se cobra aunque el grupo supere el tope.",
    });
  }

  if (e.conyuge) {
    const unitario = exclusion === null
      ? zona === "general"
        ? V.conyuge.general
        : V.conyuge.zona1
      : 0;
    conceptos.push({
      clave: "conyuge",
      nombre: "Asignación por cónyuge",
      unitario,
      cantidad: 1,
      total: unitario,
      frecuencia: "mensual",
      detalle: "Sólo para jubilados y pensionados del SIPA y titulares de pensiones no contributivas.",
    });
  }

  if (e.ayudaEscolar) {
    const hijosEscolares = e.hijos + e.hijosDiscapacidad;
    // La ayuda escolar del hijo con discapacidad no tiene tope de IGF; la del hijo sí, y con el suyo
    // propio, que este mes quedó en el valor del mes anterior.
    const cobraEscolarHijo = exclusion === null && igf <= V.topeIgfAyudaEscolar;
    const unitario = V.ayudaEscolar.total[zona];
    const cantidad = (cobraEscolarHijo ? e.hijos : 0) + e.hijosDiscapacidad;
    if (hijosEscolares > 0) {
      conceptos.push({
        clave: "ayuda-escolar",
        nombre: "Ayuda escolar anual",
        unitario,
        cantidad,
        total: unitario * cantidad,
        frecuencia: "unico",
        detalle: `Pago único por ciclo lectivo, contra el certificado de escolaridad. Incluye el refuerzo del Decreto 115/26 (${formatoCorto(V.ayudaEscolar.refuerzo[zona])}).`,
      });
    }
  }

  const totalMensual = r2(
    conceptos.filter((c) => c.frecuencia === "mensual").reduce((a, c) => a + c.total, 0),
  );
  const totalUnico = r2(
    conceptos.filter((c) => c.frecuencia === "unico").reduce((a, c) => a + c.total, 0),
  );

  return {
    igf,
    tramo,
    tramoDiscapacidad,
    exclusion,
    ingresoQueExcluye,
    conceptos,
    totalMensual,
    totalUnico,
    escalon: calcularEscalon(igf, zona, e.hijos + (e.prenatal ? 1 : 0), e.hijosDiscapacidad, exclusion),
  };
}

/**
 * El escalón: cuánto falta para caer al tramo siguiente y cuánta plata cuesta cruzarlo.
 *
 * Es el dato que ninguna nota publica y el que más sirve: los tramos son escalones, no una rampa.
 * Un peso más de IGF puede costar decenas de miles por mes, así que un aumento chico puede dejar al
 * grupo peor que antes. Devuelve null si el grupo ya está excluido o si no hay tramo siguiente.
 */
export function calcularEscalon(
  igf: number,
  zona: Zona,
  hijos: number,
  hijosDiscapacidad: number,
  exclusion: MotivoExclusion | null,
): Escalon | null {
  const V = asignacionesVigentes();
  if (exclusion !== null) return null;
  if (hijos + hijosDiscapacidad === 0) return null;

  const i = tramoDe(igf, V.hijo);
  if (i === null) return null;

  const limite = V.hijo[i].hasta;
  if (limite === null) return null;

  const proximo = igf > V.topeIgfGrupo ? null : limite + 0.01;
  if (proximo === null) return null;

  const iSig = tramoDe(proximo, V.hijo);
  const dSig = tramoDe(proximo, V.hijoDiscapacidad) ?? V.hijoDiscapacidad.length - 1;
  const dAct = tramoDe(igf, V.hijoDiscapacidad) ?? V.hijoDiscapacidad.length - 1;

  const hoyHijo = V.hijo[i].montos[zona];
  const luegoHijo = iSig === null ? 0 : V.hijo[iSig].montos[zona];
  const hoyDisc = V.hijoDiscapacidad[dAct].montos[zona];
  const luegoDisc = V.hijoDiscapacidad[dSig].montos[zona];

  const perdidaMensual = r2(
    (hoyHijo - luegoHijo) * hijos + (hoyDisc - luegoDisc) * hijosDiscapacidad,
  );
  if (perdidaMensual <= 0) return null;

  return { margen: r2(limite - igf), limite, perdidaMensual };
}

/** Monto mensual que le corresponde a un monotributista por hijo, según su categoría. */
export function montoMonotributoHijo(grupo: GrupoMonotributo): number | null {
  const V = asignacionesVigentes();
  return V.monotributo.hijo[grupo];
}

/** Desglose 80/20 de una asignación universal (AUH o embarazo). */
/** Art. 3 de la resolución mensual: redondeo al entero SIGUIENTE, sobre el valor publicado. */
export function moverAlMesSiguiente(valor: number, movilidad: number): number {
  return Math.ceil(Math.round(valor * (1 + movilidad / 100) * 1e6) / 1e6);
}

export function desglose8020(monto: number): { mensual: number; retenido: number } {
  const V = asignacionesVigentes();
  const mensual = r2(monto * V.universales.porcentajeMensual);
  return { mensual, retenido: r2(monto - mensual) };
}

export function etiquetaTramo(t: TramoIgf): string {
  if (t.desde === 0) return `IGF hasta ${formatoCorto(t.hasta ?? 0)}`;
  if (t.hasta === null) return `IGF desde ${formatoCorto(t.desde)}`;
  return `IGF entre ${formatoCorto(t.desde)} y ${formatoCorto(t.hasta)}`;
}

function formatoCorto(n: number): string {
  return `$${n.toLocaleString("es-AR", { maximumFractionDigits: 2 })}`;
}
