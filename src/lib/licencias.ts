// Motor de las licencias por maternidad y paternidad. Funciones puras, sin estado ni fetch.
//
// ⚠️ ENCUADRE — esto NO liquida un beneficio. Calcula los plazos que fija la LCT sobre la fecha
// que declara el usuario y el importe que resulta de la regla del art. 11 de la Ley 24.714. La
// fecha real de inicio depende del certificado médico, y ANSES verifica la antigüedad contra los
// aportes registrados.
//
// TODA LA ARITMÉTICA DE FECHAS ES EN UTC A PROPÓSITO. Con fechas locales, un usuario en una zona
// horaria distinta —o el propio servidor durante el prerender— puede correr un día entero al
// convertir. Acá las fechas son cadenas AAAA-MM-DD y se operan como días enteros.

import {
  ANTIGUEDAD_MINIMA_MESES,
  ESTABILIDAD,
  MATERNIDAD,
  PATERNIDAD,
} from "@/data/licencias";

const MS_DIA = 86_400_000;

/** Convierte AAAA-MM-DD a un instante UTC. Devuelve null si la cadena no es una fecha válida. */
export function parseFechaISO(iso: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [a, m, d] = iso.split("-").map(Number);
  const fecha = new Date(Date.UTC(a, m - 1, d));
  // Rechaza fechas que el constructor "arregla" solo (31 de febrero, mes 13, etc.).
  if (
    fecha.getUTCFullYear() !== a ||
    fecha.getUTCMonth() !== m - 1 ||
    fecha.getUTCDate() !== d
  ) {
    return null;
  }
  return fecha;
}

export function aISO(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

export function sumarDias(fecha: Date, dias: number): Date {
  return new Date(fecha.getTime() + dias * MS_DIA);
}

/**
 * Suma meses de calendario. Si el día no existe en el mes destino (31 de enero + 1 mes), cae en
 * el último día de ese mes, en vez de saltar al mes siguiente como haría `setUTCMonth` solo.
 */
export function sumarMeses(fecha: Date, meses: number): Date {
  const dia = fecha.getUTCDate();
  const destino = new Date(
    Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth() + meses, 1),
  );
  const ultimoDia = new Date(
    Date.UTC(destino.getUTCFullYear(), destino.getUTCMonth() + 1, 0),
  ).getUTCDate();
  destino.setUTCDate(Math.min(dia, ultimoDia));
  return destino;
}

/** Días enteros entre dos fechas (b - a). */
export function diasEntre(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / MS_DIA);
}

const DIAS_SEMANA = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
] as const;

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

/** "lunes 3 de agosto de 2026" — sin depender del locale del navegador ni de la zona horaria. */
export function fechaLarga(fecha: Date): string {
  return `${DIAS_SEMANA[fecha.getUTCDay()]} ${fecha.getUTCDate()} de ${MESES[fecha.getUTCMonth()]} de ${fecha.getUTCFullYear()}`;
}

export type EntradaMaternidad = {
  /** Fecha probable de parto, en AAAA-MM-DD. */
  fechaParto: string;
  /** Días que se toman ANTES del parto. Entre 10 y 45 (art. 177 LCT). */
  diasAntes: number;
  /** Remuneración bruta mensual. 0 si no se declaró. */
  brutoMensual: number;
  /** Fecha de ingreso al empleo, para la antigüedad de 3 meses. Vacío si no se declaró. */
  fechaIngreso?: string;
};

export type AvisoLicencia = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoMaternidad = {
  /** Días efectivamente asignados antes del parto, ya acotados al rango legal. */
  diasAntes: number;
  /** Días posteriores: el total legal menos los tomados antes. */
  diasDespues: number;
  inicio: Date;
  parto: Date;
  /** Último día de licencia (inclusive). */
  fin: Date;
  reintegro: Date;
  /** Inicio y fin de la ventana de estabilidad reforzada (art. 178 LCT). */
  estabilidadDesde: Date;
  estabilidadHasta: Date;
  /** Lo que paga ANSES por el período completo de licencia: 3 meses de la remuneración bruta. */
  asignacionTotal: number;
  /** Un mes de asignación, que es lo que se cobra por mes de licencia. */
  asignacionMensual: number;
  /** Meses de antigüedad al momento del parto, si se declaró la fecha de ingreso. */
  antiguedadMeses: number | null;
  avisos: AvisoLicencia[];
};

/** Acota los días previos al rango que permite el art. 177: entre 10 y 45. */
export function acotarDiasAntes(dias: number): number {
  if (!Number.isFinite(dias)) return MATERNIDAD.diasAntes;
  const entero = Math.round(dias);
  if (entero < MATERNIDAD.diasAntesMinimo) return MATERNIDAD.diasAntesMinimo;
  if (entero > MATERNIDAD.diasAntes) return MATERNIDAD.diasAntes;
  return entero;
}

/** Meses enteros de antigüedad entre dos fechas. */
export function mesesDeAntiguedad(ingreso: Date, referencia: Date): number {
  let meses =
    (referencia.getUTCFullYear() - ingreso.getUTCFullYear()) * 12 +
    (referencia.getUTCMonth() - ingreso.getUTCMonth());
  if (referencia.getUTCDate() < ingreso.getUTCDate()) meses -= 1;
  return meses;
}

export function calcularMaternidad(e: EntradaMaternidad): ResultadoMaternidad | null {
  const parto = parseFechaISO(e.fechaParto);
  if (!parto) return null;

  const diasAntes = acotarDiasAntes(e.diasAntes);
  // La regla del art. 177: lo que no se toma antes se acumula después, hasta completar el total.
  const diasDespues = MATERNIDAD.diasTotal - diasAntes;

  // CÓMO SE CUENTAN LOS 90 DÍAS (dicho explícito porque acá se corre un día con facilidad):
  // el tramo anterior son los `diasAntes` días previos al parto —del día parto-diasAntes al
  // día anterior al parto— y el tramo posterior arranca EL DÍA DEL PARTO. Así los dos tramos
  // suman exactamente los 90 días del art. 177, sin contar el día del parto dos veces.
  const inicio = sumarDias(parto, -diasAntes);
  const fin = sumarDias(parto, diasDespues - 1);
  const reintegro = sumarDias(fin, 1);

  const bruto = Number.isFinite(e.brutoMensual) ? Math.max(0, e.brutoMensual) : 0;
  const asignacionMensual = Math.round(bruto * 100) / 100;
  // El período legal son 90 días: tres meses de remuneración.
  const asignacionTotal = Math.round(((bruto * MATERNIDAD.diasTotal) / 30) * 100) / 100;

  const avisos: AvisoLicencia[] = [];

  let antiguedadMeses: number | null = null;
  if (e.fechaIngreso) {
    const ingreso = parseFechaISO(e.fechaIngreso);
    if (ingreso) {
      antiguedadMeses = mesesDeAntiguedad(ingreso, parto);
      if (antiguedadMeses < ANTIGUEDAD_MINIMA_MESES) {
        avisos.push({
          tono: "bloqueante",
          texto: `Al momento del parto vas a tener ${antiguedadMeses < 0 ? 0 : antiguedadMeses} mes(es) de antigüedad. El artículo 11 de la Ley 24.714 exige ${ANTIGUEDAD_MINIMA_MESES} meses continuados para cobrar la asignación por maternidad. La licencia y la conservación del empleo te corresponden igual (eso lo da la LCT, no ANSES), pero el pago de la asignación puede quedar fuera.`,
        });
      }
    }
  }

  if (diasAntes === MATERNIDAD.diasAntesMinimo) {
    avisos.push({
      tono: "ok",
      texto: `Estás usando el mínimo legal de ${MATERNIDAD.diasAntesMinimo} días antes del parto, así que acumulás ${diasDespues} días después. Es el máximo que permite el artículo 177: el mínimo NO es de 15 días, como se publica seguido.`,
    });
  }

  avisos.push({
    tono: "atencion",
    texto: `Si el nacimiento es pretérmino, no perdés los días: el artículo 177 manda acumular al descanso posterior todo el lapso que no se hubiera gozado antes, de modo de completar los ${MATERNIDAD.diasTotal} días.`,
  });

  return {
    diasAntes,
    diasDespues,
    inicio,
    parto,
    fin,
    reintegro,
    // 7 meses y medio = 7 meses de calendario más 15 días, hacia atrás y hacia adelante.
    estabilidadDesde: sumarDias(sumarMeses(parto, -7), -15),
    estabilidadHasta: sumarDias(sumarMeses(parto, 7), 15),
    asignacionTotal,
    asignacionMensual,
    antiguedadMeses,
    avisos,
  };
}

export type ResultadoPaternidad = {
  inicio: Date;
  fin: Date;
  /** True si los dos días corridos caen íntegramente en domingo o feriado declarado. */
  caeEnDomingo: boolean;
};

/**
 * Los dos días corridos por nacimiento (art. 158 inc. a). El art. 160 exige que se compute
 * necesariamente un día hábil cuando coincidan con domingo, feriado o día no laborable: acá se
 * detecta el domingo, que es el único no laborable que se puede saber sin un calendario de feriados.
 */
export function calcularPaternidad(fechaNacimientoISO: string): ResultadoPaternidad | null {
  const nacimiento = parseFechaISO(fechaNacimientoISO);
  if (!nacimiento) return null;
  const fin = sumarDias(nacimiento, PATERNIDAD.dias - 1);
  let caeEnDomingo = false;
  for (let i = 0; i < PATERNIDAD.dias; i++) {
    if (sumarDias(nacimiento, i).getUTCDay() === 0) caeEnDomingo = true;
  }
  return { inicio: nacimiento, fin, caeEnDomingo };
}
