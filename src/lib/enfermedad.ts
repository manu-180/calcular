// Motor de la licencia por enfermedad y accidente inculpable (arts. 208 a 213 LCT).
// Funciones puras, sin estado ni fetch.
//
// ⚠️ ENCUADRE — esto NO liquida un recibo ni reemplaza al médico. Aplica los plazos del art. 208 a
// la fecha que declara la persona y deriva las dos fechas que nadie publica: el último día pago y
// el último día de conservación del empleo. La fecha real depende del certificado y del control
// médico del empleador (art. 210).
//
// TODA LA ARITMÉTICA DE FECHAS ES EN UTC A PROPÓSITO — mismo criterio que `lib/licencias.ts`, de
// donde se reutilizan los helpers: con fechas locales, un usuario en otra zona horaria (o el propio
// prerender del servidor) corre un día entero al convertir.

import {
  CONSERVACION_EMPLEO_MESES,
  PLAZOS_ART_208,
  RECIDIVA_ANIOS,
} from "@/data/enfermedad";
import { diasEntre, parseFechaISO, sumarDias, sumarMeses } from "@/lib/licencias";

export type EntradaEnfermedad = {
  /** Primer día de la licencia, en AAAA-MM-DD. */
  fechaInicio: string;
  /** Fecha de ingreso al empleo, en AAAA-MM-DD: de acá sale la antigüedad del art. 208. */
  fechaIngreso: string;
  /** Cónyuge o hijos a cargo: duplica el plazo (art. 208, segunda oración). */
  cargasDeFamilia: boolean;
  /**
   * Días ya gozados por la MISMA dolencia dentro de los últimos {@link RECIDIVA_ANIOS} años.
   * Consumen el mismo plazo: la recidiva no abre uno nuevo.
   */
  diasYaUsados: number;
  /** Remuneración bruta mensual. 0 si no se declaró. */
  brutoMensual: number;
};

export type AvisoEnfermedad = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoEnfermedad = {
  /** Plazo del art. 208 que corresponde al caso, en meses (3, 6 o 12). */
  mesesPlazo: number;
  /** Ese plazo medido en días corridos de calendario desde el día de inicio. */
  plazoDias: number;
  /** Días de ese plazo que ya se consumieron por la misma dolencia. */
  diasConsumidos: number;
  /** Días pagos que quedan a partir del inicio declarado. */
  diasDisponibles: number;
  inicio: Date;
  /** Último día con derecho a remuneración (inclusive). Null si el plazo ya está agotado. */
  fin: Date | null;
  /** Primer día del año de conservación del empleo sin goce de sueldo (art. 211). */
  conservacionDesde: Date;
  /** Último día de conservación del empleo (art. 211). */
  conservacionHasta: Date;
  antiguedadAnios: number;
  antiguedadMeses: number;
  /** True si el caso cae en el tramo largo por superar los 5 años de antigüedad. */
  masDe5Anios: boolean;
  /** Lo que corresponde percibir por el tramo pago que queda, a razón de 30 días por mes. */
  totalPago: number;
  avisos: AvisoEnfermedad[];
};

/** Años enteros de antigüedad entre dos fechas (el corte del art. 208 se mide en años). */
export function aniosDeAntiguedad(ingreso: Date, referencia: Date): number {
  let anios = referencia.getUTCFullYear() - ingreso.getUTCFullYear();
  const mesActual = referencia.getUTCMonth();
  const mesIngreso = ingreso.getUTCMonth();
  if (
    mesActual < mesIngreso ||
    (mesActual === mesIngreso && referencia.getUTCDate() < ingreso.getUTCDate())
  ) {
    anios -= 1;
  }
  return anios;
}

/** Meses enteros de antigüedad (para mostrar el detalle cuando falta poco para el corte). */
export function mesesDeAntiguedadEnfermedad(ingreso: Date, referencia: Date): number {
  let meses =
    (referencia.getUTCFullYear() - ingreso.getUTCFullYear()) * 12 +
    (referencia.getUTCMonth() - ingreso.getUTCMonth());
  if (referencia.getUTCDate() < ingreso.getUTCDate()) meses -= 1;
  return meses;
}

/** El plazo del art. 208 en meses, según antigüedad y cargas de familia. */
export function mesesDePlazo(antiguedadAnios: number, cargasDeFamilia: boolean): number {
  const tabla = cargasDeFamilia ? PLAZOS_ART_208.conCargas : PLAZOS_ART_208.sinCargas;
  return antiguedadAnios >= PLAZOS_ART_208.corteAntiguedadAnios ? tabla.mas5 : tabla.hasta5;
}

export function calcularEnfermedad(e: EntradaEnfermedad): ResultadoEnfermedad | null {
  const inicio = parseFechaISO(e.fechaInicio);
  const ingreso = parseFechaISO(e.fechaIngreso);
  if (!inicio || !ingreso) return null;
  if (ingreso.getTime() > inicio.getTime()) return null;

  const antiguedadAnios = Math.max(0, aniosDeAntiguedad(ingreso, inicio));
  const antiguedadMeses = Math.max(0, mesesDeAntiguedadEnfermedad(ingreso, inicio));
  const masDe5Anios = antiguedadAnios >= PLAZOS_ART_208.corteAntiguedadAnios;
  const mesesPlazo = mesesDePlazo(antiguedadAnios, e.cargasDeFamilia);

  // El art. 208 habla de MESES, no de días: los 3 meses de una licencia que empieza el 31 de enero
  // no son los mismos días corridos que los de una que empieza el 1 de marzo. Por eso el plazo se
  // mide como meses de calendario desde el inicio y recién ahí se convierte a días.
  const plazoDias = diasEntre(inicio, sumarMeses(inicio, mesesPlazo));

  const diasConsumidos = Number.isFinite(e.diasYaUsados)
    ? Math.min(Math.max(0, Math.round(e.diasYaUsados)), plazoDias)
    : 0;
  const diasDisponibles = Math.max(0, plazoDias - diasConsumidos);

  // El último día pago es el día `diasDisponibles` contando el propio día de inicio como el 1.
  const fin = diasDisponibles > 0 ? sumarDias(inicio, diasDisponibles - 1) : null;

  // Art. 211: el año de conservación se cuenta DESDE EL VENCIMIENTO del plazo pago. Si el plazo ya
  // está agotado, arranca el mismo día de inicio declarado.
  const conservacionDesde = fin ? sumarDias(fin, 1) : inicio;
  const conservacionHasta = sumarDias(
    sumarMeses(conservacionDesde, CONSERVACION_EMPLEO_MESES),
    -1,
  );

  const bruto = Number.isFinite(e.brutoMensual) ? Math.max(0, e.brutoMensual) : 0;
  const totalPago = Math.round(((bruto * diasDisponibles) / 30) * 100) / 100;

  const avisos: AvisoEnfermedad[] = [];

  if (diasDisponibles === 0) {
    avisos.push({
      tono: "bloqueante",
      texto: `Con los ${diasConsumidos} días que ya usaste por esta misma dolencia, el plazo pago de ${mesesPlazo} meses quedó agotado. Desde ahora la licencia sigue, pero SIN goce de sueldo: lo que corre es el año de conservación del empleo del artículo 211. No es un despido ni una baja, y el empleador tiene que guardarte el puesto todo ese año.`,
    });
  } else if (diasConsumidos > 0) {
    avisos.push({
      tono: "atencion",
      texto: `Ojo con esto, que es lo que casi nadie calcula: la recaída de la misma dolencia dentro de los ${RECIDIVA_ANIOS} años NO abre un plazo nuevo, consume el mismo. De los ${plazoDias} días pagos que te da el artículo 208 ya usaste ${diasConsumidos}, así que te quedan ${diasDisponibles}. El plazo vuelve a nacer entero recién si la dolencia se manifiesta pasados los ${RECIDIVA_ANIOS} años.`,
    });
  }

  if (!masDe5Anios) {
    const mesesParaElCorte = PLAZOS_ART_208.corteAntiguedadAnios * 12 - antiguedadMeses;
    if (mesesParaElCorte <= 12) {
      avisos.push({
        tono: "atencion",
        texto: `Te faltan ${mesesParaElCorte} mes(es) para cumplir ${PLAZOS_ART_208.corteAntiguedadAnios} años de antigüedad, y ahí el plazo del artículo 208 pasa de ${mesesPlazo} a ${mesesDePlazo(PLAZOS_ART_208.corteAntiguedadAnios, e.cargasDeFamilia)} meses. La antigüedad se computa al momento en que se produce la enfermedad, no durante la licencia.`,
      });
    }
  }

  if (!e.cargasDeFamilia) {
    avisos.push({
      tono: "ok",
      texto: `Si tenés cónyuge o hijos a cargo, marcá la casilla: con cargas de familia el mismo caso pasa de ${mesesPlazo} a ${mesesDePlazo(antiguedadAnios, true)} meses de licencia paga. Es la diferencia más grande de todo el artículo 208 y depende de un dato que muchos liquidadores no piden.`,
    });
  }

  avisos.push({
    tono: "atencion",
    texto: `La remuneración de estos días no es la del mes en que te enfermaste y se congela: el artículo 208 manda pagar la del momento de la interrupción MÁS los aumentos que durante la licencia se acuerden a los de tu misma categoría, por ley, convenio o decisión del empleador. Si tu sueldo tiene parte variable, esa parte se liquida por el promedio del último semestre trabajado.`,
  });

  return {
    mesesPlazo,
    plazoDias,
    diasConsumidos,
    diasDisponibles,
    inicio,
    fin,
    conservacionDesde,
    conservacionHasta,
    antiguedadAnios,
    antiguedadMeses,
    masDe5Anios,
    totalPago,
    avisos,
  };
}
