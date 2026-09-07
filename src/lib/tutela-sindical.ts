import { DIVISOR_DIA } from "@/data/indemnizacion";
import {
  ART245BIS_PISO,
  ART245BIS_TECHO,
  MESES_ESTABILIDAD_POSTERIOR,
  MESES_EXTRA_CANDIDATO_NO_ELECTO,
  MESES_TUTELA_POSTULANTE,
  PISO_VOTOS_POSTULANTE,
  type RolSindical,
} from "@/data/tutela-sindical";
import { antiguedadEntre, calcularIndemnizacion } from "@/lib/indemnizacion";
import type { ResultadoIndemnizacion } from "@/lib/indemnizacion";

/**
 * TUTELA SINDICAL — art. 52 de la Ley 23.551 con el texto de la Ley 27.802 (B.O. 6/3/2026).
 *
 * La base (art. 245 + preaviso + integración + SAC proporcional + vacaciones) NO se recalcula acá:
 * la trae `calcularIndemnizacion`, que es el mismo motor que usa /indemnizacion. Si esta página
 * hiciera su propia cuenta, calcular.ar podría publicar dos importes distintos para el mismo
 * sueldo y la misma antigüedad, que es exactamente la forma de perder el moat.
 *
 * Lo que se agrega es el AGRAVAMIENTO, y sólo en los dos supuestos que el artículo cuantifica.
 * Lo que el artículo no dice, esta función no lo inventa:
 *   - no suma SAC sobre las remuneraciones del agravamiento (la ley dice «remuneraciones», y si
 *     el aguinaldo entra o no lo discuten los tribunales, no la norma);
 *   - no aplica el tope del convenio al agravamiento (el tope del art. 245 es del art. 245);
 *   - no acumula el art. 52 con el art. 245 bis de la LCT: los compara y devuelve los dos, porque
 *     el propio art. 52 dice «no siendo las mismas acumulables» y el art. 245 bis agrega que «no
 *     será acumulable con ningún otro régimen especial que establezca agravamientos».
 */

/** Un período expresado como meses enteros + días sueltos, y su valor en pesos. */
export type Tramo = {
  meses: number;
  dias: number;
  /** Meses equivalentes (meses + días/30), para mostrar el total en una sola cifra. */
  mesesEquivalentes: number;
  monto: number;
};

export type ResultadoTutela = {
  base: ResultadoIndemnizacion;
  rol: RolSindical;
  /** ¿El art. 52 le fija un importe a este rol? */
  cuantificado: boolean;
  /** Motivo por el que no hay agravamiento (suplente excluido, votos por debajo del 5%…). */
  sinAgravamiento: string | null;
  /** Titular: lo que faltaba del mandato. Candidato no electo: la tutela del art. 50 no agotada. */
  tramoPendiente: Tramo | null;
  /** Los 12 meses fijos: año de estabilidad posterior (titular) o año extra (candidato). */
  tramoAnioExtra: Tramo | null;
  /** art. 52 completo = tramoPendiente + tramoAnioExtra. */
  agravamientoArt52: number;
  /** art. 245 bis LCT: 50% del art. 245 (piso) y 100% (techo que puede fijar el juez). */
  art245bisPiso: number;
  art245bisTecho: number;
  /** Base + el agravamiento del art. 52 (0 si no corresponde). */
  totalConArt52: number;
  /** Base + el art. 245 bis en su piso del 50%: la alternativa, no la suma. */
  totalConArt245bisPiso: number;
  /** Base + el art. 245 bis llevado al 100% por el juez. */
  totalConArt245bisTecho: number;
  /** Cuál de los dos regímenes deja más, comparando el art. 52 contra el piso del art. 245 bis. */
  conviene: "art52" | "art245bis" | "empate" | "ninguno";
};

export type EntradaTutela = {
  ingresoISO: string;
  despidoISO: string;
  mejorRemuneracion: number;
  preavisoOtorgado: boolean;
  topeCCT?: number;
  rol: RolSindical;
  /** Titular: fecha en que terminaba el mandato. */
  finMandatoISO?: string;
  /** Candidato no electo: notificación fehaciente de la postulación (art. 50). */
  postulacionISO?: string;
  /** Candidato no electo: porcentaje de votos válidos obtenido (0 a 100). */
  porcentajeVotos?: number;
};

/** Meses enteros + días sueltos entre dos fechas, valuados a sueldo/mes y sueldo/30 por día. */
function tramo(desdeISO: string, hastaISO: string, remuneracion: number): Tramo {
  if (!desdeISO || !hastaISO || hastaISO <= desdeISO) {
    return { meses: 0, dias: 0, mesesEquivalentes: 0, monto: 0 };
  }
  const a = antiguedadEntre(desdeISO, hastaISO);
  const meses = a.anios * 12 + a.meses;
  const dias = a.dias;
  return {
    meses,
    dias,
    mesesEquivalentes: meses + dias / DIVISOR_DIA,
    monto: remuneracion * meses + (remuneracion / DIVISOR_DIA) * dias,
  };
}

/** Los 12 meses fijos del art. 52, sin días sueltos. */
function tramoFijo(meses: number, remuneracion: number): Tramo {
  return { meses, dias: 0, mesesEquivalentes: meses, monto: remuneracion * meses };
}

/** Fecha ISO + N meses, con el día clampeado al largo del mes destino (31/1 + 1 mes = 28/2). */
export function sumarMeses(iso: string, meses: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const totalMes = m - 1 + meses;
  const anio = y + Math.floor(totalMes / 12);
  const mes = ((totalMes % 12) + 12) % 12;
  const ultimoDia = new Date(Date.UTC(anio, mes + 1, 0)).getUTCDate();
  const dia = Math.min(d, ultimoDia);
  return `${anio}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

export function calcularTutelaSindical(e: EntradaTutela): ResultadoTutela | null {
  const base = calcularIndemnizacion({
    ingresoISO: e.ingresoISO,
    despidoISO: e.despidoISO,
    mejorRemuneracion: e.mejorRemuneracion,
    preavisoOtorgado: e.preavisoOtorgado,
    topeCCT: e.topeCCT,
  });
  if (!base) return null;

  const rem = e.mejorRemuneracion;

  // Art. 245 bis LCT: se calcula SIEMPRE, porque es la alternativa contra la que hay que comparar.
  const art245bisPiso = base.indemnizacionAntiguedad * ART245BIS_PISO;
  const art245bisTecho = base.indemnizacionAntiguedad * ART245BIS_TECHO;

  let cuantificado = false;
  let sinAgravamiento: string | null = null;
  let tramoPendiente: Tramo | null = null;
  let tramoAnioExtra: Tramo | null = null;

  if (e.rol === "suplente") {
    sinAgravamiento =
      "El art. 52 con el texto de la Ley 27.802 excluye a los suplentes: «A aquellos que sean designados suplentes no les será aplicable la tutela sindical prevista en la presente ley».";
  } else if (e.rol === "congresal") {
    sinAgravamiento =
      "El art. 52 le reconoce la tutela al congresal titular sólo mientras asiste al congreso, pero no lo menciona en la cláusula que fija el importe del despido indirecto. La ley no le pone número: acá no se inventa uno.";
  } else if (e.rol === "titular") {
    cuantificado = true;
    tramoPendiente = tramo(e.despidoISO, e.finMandatoISO ?? "", rem);
    tramoAnioExtra = tramoFijo(MESES_ESTABILIDAD_POSTERIOR, rem);
  } else {
    // Candidato no electo.
    const votos = e.porcentajeVotos;
    if (votos !== undefined && votos < PISO_VOTOS_POSTULANTE * 100) {
      sinAgravamiento = `El art. 50 nuevo hace cesar la protección del candidato que «hubiere obtenido menos del cinco por ciento (5%) de los votos válidos emitidos». Con ${votos.toLocaleString(
        "es-AR",
        { maximumFractionDigits: 2 },
      )}% no hay tutela que violar, y sin tutela no hay agravamiento del art. 52.`;
    } else {
      cuantificado = true;
      const finTutela = e.postulacionISO
        ? sumarMeses(e.postulacionISO, MESES_TUTELA_POSTULANTE)
        : "";
      tramoPendiente = tramo(e.despidoISO, finTutela, rem);
      tramoAnioExtra = tramoFijo(MESES_EXTRA_CANDIDATO_NO_ELECTO, rem);
    }
  }

  const agravamientoArt52 = (tramoPendiente?.monto ?? 0) + (tramoAnioExtra?.monto ?? 0);
  const totalConArt52 = base.totalGeneral + agravamientoArt52;
  const totalConArt245bisPiso = base.totalGeneral + art245bisPiso;
  const totalConArt245bisTecho = base.totalGeneral + art245bisTecho;

  let conviene: ResultadoTutela["conviene"];
  if (!cuantificado) {
    conviene = "ninguno";
  } else if (Math.abs(agravamientoArt52 - art245bisPiso) < 0.005) {
    conviene = "empate";
  } else {
    conviene = agravamientoArt52 > art245bisPiso ? "art52" : "art245bis";
  }

  return {
    base,
    rol: e.rol,
    cuantificado,
    sinAgravamiento,
    tramoPendiente,
    tramoAnioExtra,
    agravamientoArt52,
    art245bisPiso,
    art245bisTecho,
    totalConArt52,
    totalConArt245bisPiso,
    totalConArt245bisTecho,
    conviene,
  };
}
