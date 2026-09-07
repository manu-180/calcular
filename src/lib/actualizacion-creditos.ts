import {
  ULTIMO_PERIODO,
  PRIMER_PERIODO,
  existePeriodo,
  indiceDe,
  mesesEntre,
  nombrePeriodo,
  sumarMeses,
  variacionMensual,
  type Periodo,
} from "@/lib/inflacion";
import { TASA_PURA_ANUAL } from "@/data/actualizacion-creditos";

// ────────────────────────────────────────────────────────────────────────────────────────────
// Art. 276 LCT (texto del art. 54 de la Ley 27.802): el crédito se actualiza por la variación
// del IPC Nivel General y se le suma "una tasa de interés del tres por ciento (3%) anual, desde
// que cada suma sea debida y hasta el momento del efectivo pago".
//
// TRES DECISIONES DE LECTURA, explícitas porque cambian el número:
//
//   1. **El 3% corre sobre el capital YA actualizado.** Es la lectura natural del orden en que la
//      norma enumera ("serán actualizados … con más una tasa de interés"): primero se repotencia
//      el capital y sobre ese valor corre el interés puro. Aplicarlo sobre el capital nominal
//      histórico convertiría al 3% en nada.
//   2. **Interés SIMPLE.** La ley no dice que se capitalice, y sin norma que lo autorice el
//      interés no se capitaliza. Igual se expone el compuesto al lado: es el mismo texto leído
//      con la otra hipótesis, y el lector merece ver los dos.
//   3. **La actualización llega hasta el último IPC PUBLICADO; el interés, hasta el pago.**
//      El INDEC publica con ~40 días de atraso: no existe el índice de un mes que todavía no
//      terminó. El interés, en cambio, corre por tiempo transcurrido y no depende de que se
//      publique nada.
// ────────────────────────────────────────────────────────────────────────────────────────────

export type TonoAviso = "ok" | "atencion" | "bloqueante";

export type AvisoCredito = { tono: TonoAviso; texto: string };

export type ResultadoCredito = {
  /** Período en que la suma se hizo debida. */
  desde: Periodo;
  /** Período de pago pedido por el usuario. */
  hastaPedido: Periodo;
  /** Hasta dónde se pudo actualizar de verdad (último IPC publicado si el pago es posterior). */
  hastaIpc: Periodo;
  /** Meses de IPC que faltan publicar para cubrir el período pedido (0 si no falta ninguno). */
  mesesSinIpc: number;

  indiceDesde: number;
  indiceHasta: number;
  /** Coeficiente de actualización: índice(hastaIpc) / índice(desde). */
  coeficiente: number;
  /** Inflación acumulada del tramo, en %. */
  inflacionPct: number;

  /** Meses entre la fecha en que se debió y la fecha de pago. */
  meses: number;
  anios: number;

  capitalActualizado: number;
  interesPuro: number;
  /** Mismo cálculo suponiendo que el 3% se capitaliza anualmente. */
  interesCompuesto: number;
  total: number;
  totalCompuesto: number;

  /** Cuánto se lleva el pacto de cuota litis (0 si no se pactó). */
  cuotaLitis: number;
  /** Lo que le queda al trabajador después del pacto. */
  neto: number;

  /** Cuánto multiplicó el crédito respecto del nominal (total / monto). */
  multiplicador: number;

  avisos: AvisoCredito[];
};

export type ParametrosCredito = {
  monto: number;
  desde: Periodo;
  hasta: Periodo;
  /** Porcentaje del pacto de cuota litis, 0 a 20 (art. 277). */
  cuotaLitisPct?: number;
};

/**
 * Actualiza un crédito laboral según el art. 276 LCT vigente.
 * Devuelve `null` sólo cuando el pedido es imposible de responder con la serie oficial
 * (monto inválido, período anterior a la serie del INDEC o pago anterior a la deuda).
 */
export function actualizarCreditoLaboral(p: ParametrosCredito): ResultadoCredito | null {
  const { monto, desde, hasta } = p;
  if (!Number.isFinite(monto) || monto <= 0) return null;
  if (!existePeriodo(desde)) return null;
  if (mesesEntre(desde, hasta) < 0) return null;

  const hastaIpc = mesesEntre(hasta, ULTIMO_PERIODO) < 0 ? ULTIMO_PERIODO : hasta;
  const mesesSinIpc = Math.max(0, mesesEntre(ULTIMO_PERIODO, hasta));

  const indiceDesde = indiceDe(desde);
  const indiceHasta = indiceDe(hastaIpc);
  if (indiceDesde === null || indiceHasta === null) return null;

  const coeficiente = indiceHasta / indiceDesde;
  const capitalActualizado = monto * coeficiente;

  const meses = mesesEntre(desde, hasta);
  const anios = meses / 12;

  const interesPuro = capitalActualizado * TASA_PURA_ANUAL * anios;
  const interesCompuesto = capitalActualizado * (Math.pow(1 + TASA_PURA_ANUAL, anios) - 1);

  const total = capitalActualizado + interesPuro;
  const totalCompuesto = capitalActualizado + interesCompuesto;

  const pct = Math.min(Math.max(p.cuotaLitisPct ?? 0, 0), 20) / 100;
  const cuotaLitis = total * pct;

  const avisos: AvisoCredito[] = [];

  if (mesesSinIpc > 0) {
    avisos.push({
      tono: "atencion",
      texto: `El INDEC todavía no publicó el IPC de ${nombrePeriodo(sumarMeses(ULTIMO_PERIODO, 1))} en adelante: la actualización llega hasta ${nombrePeriodo(ULTIMO_PERIODO)} y quedan ${mesesSinIpc} ${mesesSinIpc === 1 ? "mes" : "meses"} sin repotenciar. El 3% anual sí corre por todo el período, porque no depende de que se publique un índice.`,
    });
  }

  if (meses === 0) {
    avisos.push({
      tono: "atencion",
      texto:
        "La fecha de pago es el mismo mes en que la suma se hizo debida: no hay nada que actualizar ni interés que corra. El art. 276 mide desde que cada suma es debida hasta el efectivo pago.",
    });
  }

  const mensual = variacionMensual(ULTIMO_PERIODO);
  if (mensual !== null && meses > 0) {
    const costoMensual = mensual / 100 + TASA_PURA_ANUAL / 12;
    avisos.push({
      tono: "ok",
      texto: `Cada mes de demora suma hoy alrededor de ${(costoMensual * 100).toLocaleString("es-AR", { maximumFractionDigits: 2 })}% al crédito: ${mensual.toLocaleString("es-AR", { maximumFractionDigits: 2 })}% del último IPC publicado más la doceava parte del 3% anual. Sobre este monto son unos ${Math.round(total * costoMensual).toLocaleString("es-AR")} pesos por mes.`,
    });
  }

  if (pct > 0) {
    avisos.push({
      tono: "atencion",
      texto: `El pacto de cuota litis se descuenta de lo que cobra el trabajador y el art. 277 lo topea en el 20% del monto del proceso, con ratificación personal y homologación judicial. Sin esos dos requisitos el pacto es nulo de pleno derecho.`,
    });
  }

  return {
    desde,
    hastaPedido: hasta,
    hastaIpc,
    mesesSinIpc,
    indiceDesde,
    indiceHasta,
    coeficiente,
    inflacionPct: (coeficiente - 1) * 100,
    meses,
    anios,
    capitalActualizado,
    interesPuro,
    interesCompuesto,
    total,
    totalCompuesto,
    cuotaLitis,
    neto: total - cuotaLitis,
    multiplicador: total / monto,
    avisos,
  };
}

/** Motivo por el que un pedido no se puede responder, para explicarlo en vez de mostrar cero. */
export function motivoImposible(desde: Periodo, hasta: Periodo): string | null {
  if (!existePeriodo(desde)) {
    return `La serie oficial del IPC Nacional del INDEC —la que nombra el art. 276— arranca en ${nombrePeriodo(PRIMER_PERIODO)}. Para un crédito anterior no hay índice publicado con el que actualizarlo: haría falta empalmar series distintas, y eso ya no es aplicar la norma sino elegir un criterio.`;
  }
  if (mesesEntre(desde, hasta) < 0) {
    return "La fecha de pago no puede ser anterior a la fecha en que la suma se hizo debida.";
  }
  return null;
}

/**
 * Art. 277: la sentencia puede pagarse en cuotas mensuales. El texto dice que se ajustan
 * "conforme la pauta establecida en el artículo 276" sólo para el supuesto de las grandes
 * empresas; para las MiPyME no lo repite. Esta función calcula qué vale de verdad la última
 * cuota si NO se ajusta, proyectando la última variación mensual publicada del IPC.
 */
export type CuotasSinAjuste = {
  cuotas: number;
  valorCuotaNominal: number;
  /** Valor de la última cuota medido en plata del mes de la sentencia. */
  valorRealUltimaCuota: number;
  /** Valor real de la suma de todas las cuotas. */
  valorRealTotal: number;
  /** Cuánto se licua el total, en %. */
  perdidaPct: number;
  mensualUsadaPct: number;
};

export function cuotasSinAjuste(total: number, cuotas: number): CuotasSinAjuste | null {
  const mensual = variacionMensual(ULTIMO_PERIODO);
  if (mensual === null) return null;
  if (!Number.isFinite(total) || total <= 0) return null;
  if (!Number.isInteger(cuotas) || cuotas < 1) return null;

  const valorCuotaNominal = total / cuotas;
  let valorRealTotal = 0;
  // La cuota k se paga k-1 meses después de la sentencia: se descuenta la inflación de ese tramo.
  for (let k = 1; k <= cuotas; k++) {
    valorRealTotal += valorCuotaNominal / Math.pow(1 + mensual / 100, k - 1);
  }
  const valorRealUltimaCuota = valorCuotaNominal / Math.pow(1 + mensual / 100, cuotas - 1);

  return {
    cuotas,
    valorCuotaNominal,
    valorRealUltimaCuota,
    valorRealTotal,
    perdidaPct: (1 - valorRealTotal / total) * 100,
    mensualUsadaPct: mensual,
  };
}
