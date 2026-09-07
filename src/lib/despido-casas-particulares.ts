import {
  DIAS_TRABAJO_POR_DIA_DESCANSO,
  DIVISOR_DIA,
  FRACCION_MESES_ART48,
  PISO_MESES_ART48,
  PREAVISO,
  PRUEBA_DIAS_ANTERIOR_CON_RETIRO,
  PRUEBA_DIAS_ANTERIOR_SIN_RETIRO,
  PRUEBA_MESES_VIGENTE,
  PRUEBA_TOPE_MESES_ANTERIOR_CON_RETIRO,
  VIGENCIA_REFORMA_ISO,
} from "@/data/despido-casas-particulares";
import { diasInclusivos } from "@/lib/aguinaldo";

// Liquidación final del personal de casas particulares (Ley 26.844), con el texto vigente.
//
// EL CÁLCULO SE HACE DOS VECES, como en /periodo-de-prueba: con el art. 7 vigente (seis meses de
// prueba, texto del art. 107 de la Ley 27.802) y con el anterior (30 días sin retiro, 15 días con
// tope de 3 meses con retiro). Cuál rige lo decide la FECHA DE EGRESO: la nota de vigencia dice
// «a partir de su publicación en el Boletín Oficial», así que la reforma no es retroactiva. La
// diferencia entre las dos liquidaciones es exactamente lo que la reforma sacó o dejó.
//
// DIFERENCIAS CON LA LCT QUE NO HAY QUE «UNIFICAR» EN UN REFACTOR:
//   · La indemnización del art. 48 es **un mes por año o fracción mayor de TRES meses** (la LCT
//     usa fracción mayor de tres meses también, pero su art. 245 tiene topes y bases distintas).
//     Acá **no hay tope de convenio**: el art. 48 no lo prevé.
//   · El preaviso del art. 42 son **10 o 30 días** según se llegue al año, no uno o dos meses.
//   · El SAC del art. 26 es el **50% de la mayor remuneración mensual del semestre**, y el art. 28
//     manda pagar su proporcional «por cualquier causa».
//   · Las vacaciones proporcionales salen del art. 30 (un día cada veinte de trabajo efectivo),
//     no del art. 153 de la LCT — que desde el 6/3/2026 ya no se aplica supletoriamente.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type Modalidad = "sin-retiro" | "con-retiro";

export type ResultadoDespidoCasas = {
  /** true si el egreso ocurrió el 6/3/2026 o después. */
  rigeTextoNuevo: boolean;
  diasTrabajadosTotales: number;
  mesesTrabajados: number;
  aniosCompletos: number;
  mesesDeFraccion: number;
  /** Duración del período de prueba aplicable, en días, con el texto que rige. */
  pruebaDias: number;
  /** Duración con el OTRO texto, para mostrar la diferencia. */
  pruebaDiasOtroTexto: number;
  dentroDePrueba: boolean;
  dentroDePruebaOtroTexto: boolean;
  valorDia: number;
  /** Días trabajados del último mes y su importe. */
  diasDelMes: number;
  sueldoDelMes: number;
  preaviso: { dias: number; importe: number; corresponde: boolean };
  integracionMes: { dias: number; importe: number; corresponde: boolean };
  antiguedad: { meses: number; importe: number; aplicaPiso: boolean; corresponde: boolean };
  sac: { diasSemestre: number; diasTrabajadosSemestre: number; importe: number };
  vacaciones: { dias: number; diasTrabajados: number; importe: number };
  totalACobrar: number;
  /** Lo mismo, liquidado con el texto del art. 7 que NO rige. */
  totalOtroTexto: number;
  diferencia: number;
  avisos: Aviso[];
};

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Meses completos entre dos fechas ISO. */
function mesesEntre(desdeISO: string, hastaISO: string): number {
  const [ay, am, ad] = desdeISO.split("-").map(Number);
  const [by, bm, bd] = hastaISO.split("-").map(Number);
  let meses = (by - ay) * 12 + (bm - am);
  if (bd < ad) meses -= 1;
  return Math.max(0, meses);
}

/** El semestre del SAC (art. 26) en el que cae una fecha. */
function semestreDe(iso: string): { inicioISO: string; finISO: string } {
  const [anio, mes] = iso.split("-").map(Number);
  return mes <= 6
    ? { inicioISO: `${anio}-01-01`, finISO: `${anio}-06-30` }
    : { inicioISO: `${anio}-07-01`, finISO: `${anio}-12-31` };
}

/** Último día del mes de una fecha ISO. */
function finDeMes(iso: string): string {
  const [anio, mes] = iso.split("-").map(Number);
  const ultimo = new Date(Date.UTC(anio, mes, 0)).getUTCDate();
  return `${anio}-${String(mes).padStart(2, "0")}-${String(ultimo).padStart(2, "0")}`;
}

/**
 * Días de período de prueba con el texto ANTERIOR del art. 7. Para el personal con retiro el
 * texto contaba «quince (15) días de trabajo en tanto no supere los tres (3) meses»: dos límites
 * a la vez. Como acá no se cargan los días efectivamente trabajados, se toma el tope de 3 meses
 * como cota máxima y se avisa; para el personal sin retiro son 30 días corridos, sin ambigüedad.
 */
function pruebaDiasTextoAnterior(modalidad: Modalidad): number {
  return modalidad === "sin-retiro"
    ? PRUEBA_DIAS_ANTERIOR_SIN_RETIRO
    : PRUEBA_TOPE_MESES_ANTERIOR_CON_RETIRO * DIVISOR_DIA;
}

export function calcularDespidoCasas(params: {
  sueldoMensual: number;
  ingresoISO: string;
  egresoISO: string;
  modalidad: Modalidad;
}): ResultadoDespidoCasas {
  const sueldo = Math.max(0, params.sueldoMensual || 0);
  const { ingresoISO, egresoISO, modalidad } = params;

  const rigeTextoNuevo = egresoISO >= VIGENCIA_REFORMA_ISO;
  const diasTrabajadosTotales = Math.max(0, diasInclusivos(ingresoISO, egresoISO));
  const mesesTrabajados = mesesEntre(ingresoISO, egresoISO);

  const pruebaVigente = PRUEBA_MESES_VIGENTE * DIVISOR_DIA;
  const pruebaAnterior = pruebaDiasTextoAnterior(modalidad);
  const pruebaDias = rigeTextoNuevo ? pruebaVigente : pruebaAnterior;
  const pruebaDiasOtroTexto = rigeTextoNuevo ? pruebaAnterior : pruebaVigente;

  const valorDia = r2(sueldo / DIVISOR_DIA);

  // Días del último mes efectivamente trabajados (salario, se paga siempre).
  const diasDelMes = Number(egresoISO.slice(8, 10));
  const sueldoDelMes = r2(valorDia * diasDelMes);

  // SAC proporcional (arts. 26 y 28): 50% de la mayor remuneración, prorrateado por el semestre.
  const semestre = semestreDe(egresoISO);
  const inicioSemestre = ingresoISO > semestre.inicioISO ? ingresoISO : semestre.inicioISO;
  const diasSemestre = diasInclusivos(semestre.inicioISO, semestre.finISO);
  const diasTrabajadosSemestre =
    inicioSemestre > egresoISO ? 0 : diasInclusivos(inicioSemestre, egresoISO);
  const sacImporte = r2((sueldo / 2) * (diasTrabajadosSemestre / diasSemestre));

  // Vacaciones proporcionales (art. 30): un día por cada veinte de trabajo efectivo.
  const diasVacaciones = Math.floor(diasTrabajadosTotales / DIAS_TRABAJO_POR_DIA_DESCANSO);
  const vacacionesImporte = r2(diasVacaciones * valorDia);

  // Un cálculo por cada texto del art. 7.
  function liquidar(diasPrueba: number) {
    const dentro = diasTrabajadosTotales <= diasPrueba;

    const diasPreaviso = mesesTrabajados >= 12 ? PREAVISO.diasDesdeUnAnio : PREAVISO.diasHastaUnAnio;
    const preavisoImporte = dentro ? 0 : r2(valorDia * diasPreaviso);

    // Art. 44: si el despido no cae el último día del mes, se integra hasta fin de mes.
    const ultimoDelMes = finDeMes(egresoISO);
    const diasIntegracion = dentro
      ? 0
      : Math.max(0, diasInclusivos(egresoISO, ultimoDelMes) - 1);
    const integracionImporte = r2(valorDia * diasIntegracion);

    // Art. 48: un mes por año o fracción mayor de 3 meses, con piso de un mes.
    const anios = Math.floor(mesesTrabajados / 12);
    const fraccion = mesesTrabajados % 12;
    const mesesIndemnizables = anios + (fraccion > FRACCION_MESES_ART48 ? 1 : 0);
    const conPiso = Math.max(mesesIndemnizables, PISO_MESES_ART48);
    const antiguedadImporte = dentro ? 0 : r2(sueldo * conPiso);

    const total = r2(
      sueldoDelMes + sacImporte + vacacionesImporte + preavisoImporte + integracionImporte + antiguedadImporte,
    );

    return {
      dentro,
      diasPreaviso,
      preavisoImporte,
      diasIntegracion,
      integracionImporte,
      anios,
      fraccion,
      mesesIndemnizables: conPiso,
      aplicaPiso: mesesIndemnizables < PISO_MESES_ART48,
      antiguedadImporte,
      total,
    };
  }

  const rige = liquidar(pruebaDias);
  const otro = liquidar(pruebaDiasOtroTexto);

  const avisos: Aviso[] = [];

  if (rige.dentro) {
    avisos.push({
      tono: "atencion",
      texto: rigeTextoNuevo
        ? `El contrato se extinguió dentro de los ${PRUEBA_MESES_VIGENTE} meses de prueba del art. 7 vigente: «sin generarse derecho a indemnización alguna con motivo de la extinción». Con el texto anterior —${modalidad === "sin-retiro" ? `${PRUEBA_DIAS_ANTERIOR_SIN_RETIRO} días` : `${PRUEBA_DIAS_ANTERIOR_CON_RETIRO} días de trabajo, con tope de ${PRUEBA_TOPE_MESES_ANTERIOR_CON_RETIRO} meses`}— este mismo caso ya estaba fuera del período de prueba.`
        : "El contrato se extinguió dentro del período de prueba del texto anterior, que es el que rige para esta fecha: la reforma no es retroactiva.",
    });
  }

  if (rigeTextoNuevo && !rige.dentro && otro.dentro) {
    avisos.push({
      tono: "ok",
      texto: "Con el texto anterior este caso habría caído dentro del período de prueba. Con el vigente, no: por eso corresponde la liquidación completa.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto: "La Ley 26.844 no tiene un artículo de indemnización por vacaciones no gozadas —la expresión no aparece en toda la norma— y desde el 6/3/2026 la LCT ya no se aplica supletoriamente salvo remisión expresa. El proporcional del art. 30 se calcula acá como se venía liquidando, pero su fundamento cambió: es un punto abierto.",
  });

  avisos.push({
    tono: "bloqueante",
    texto: "Esto es una estimación bruta sobre el sueldo que cargaste. La base del art. 48 es «la mejor remuneración, mensual, normal y habitual» del último año: si tuviste aumentos, es la más alta, no la última.",
  });

  return {
    rigeTextoNuevo,
    diasTrabajadosTotales,
    mesesTrabajados,
    aniosCompletos: rige.anios,
    mesesDeFraccion: rige.fraccion,
    pruebaDias,
    pruebaDiasOtroTexto,
    dentroDePrueba: rige.dentro,
    dentroDePruebaOtroTexto: otro.dentro,
    valorDia,
    diasDelMes,
    sueldoDelMes,
    preaviso: { dias: rige.diasPreaviso, importe: rige.preavisoImporte, corresponde: !rige.dentro },
    integracionMes: {
      dias: rige.diasIntegracion,
      importe: rige.integracionImporte,
      corresponde: !rige.dentro && rige.diasIntegracion > 0,
    },
    antiguedad: {
      meses: rige.mesesIndemnizables,
      importe: rige.antiguedadImporte,
      aplicaPiso: rige.aplicaPiso,
      corresponde: !rige.dentro,
    },
    sac: { diasSemestre, diasTrabajadosSemestre, importe: sacImporte },
    vacaciones: {
      dias: diasVacaciones,
      diasTrabajados: diasTrabajadosTotales,
      importe: vacacionesImporte,
    },
    totalACobrar: rige.total,
    totalOtroTexto: otro.total,
    diferencia: r2(Math.abs(rige.total - otro.total)),
    avisos,
  };
}
