import {
  ANIOS_DE_VIDA,
  PRIMER_INICIO_ACTUALIZABLE,
} from "@/data/quebrantos";
import { ULTIMO_PERIODO, existePeriodo, indiceDe, sumarMeses } from "@/lib/inflacion";

// El motor de la actualización de un quebranto impositivo (art. 25, undécimo párrafo, LIG).
//
// LA CUENTA ES CORTA; LAS DOS CONDICIONES SON LO QUE IMPORTA:
//
//   coeficiente = IPC(mes de cierre del ejercicio que se liquida) / IPC(mes de cierre del ejercicio
//                 en que se originó el quebranto)
//
// 1. **El ejercicio tiene que HABERSE INICIADO desde el 1/1/2025**, no cerrado. Es la trampa de
//    este artículo para cualquiera que no cierre en diciembre: una sociedad con cierre en junio
//    tuvo un ejercicio que se inició el 1/7/2024 y cerró el 30/6/2025 — cierra en 2025 y NO está
//    alcanzado, porque se inició en 2024. Su primer quebranto actualizable es el del ejercicio
//    1/7/2025–30/6/2026. Por eso acá se pregunta el mes de CIERRE y se deriva el inicio restando
//    once meses: es el dato que el contribuyente tiene a mano, y la condición se evalúa sobre el
//    inicio, como manda la ley.
// 2. **El quebranto tiene que seguir vivo**: se pierde pasados cinco años contados desde el
//    ejercicio en que se produjo la pérdida (noveno párrafo). Un quebranto vencido no se actualiza
//    porque ya no se deduce.
//
// LO QUE SE DEVUELVE SIEMPRE, aunque no corresponda actualizar: el monto nominal y el aviso de por
// qué. Un cero silencioso no le sirve a nadie.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoQuebranto = {
  /** Monto tal como se generó, sin tocar. */
  nominal: number;
  /** Monto que se puede computar en el ejercicio que se liquida. */
  actualizado: number;
  /** IPC(cierre liquidado) / IPC(cierre de origen). Es 1 cuando no corresponde actualizar. */
  coeficiente: number;
  /** Lo que la actualización agrega: actualizado − nominal. */
  diferencia: number;
  /** Mes de inicio del ejercicio en que se originó, derivado del cierre. */
  inicioEjercicio: string;
  /** Si el ejercicio de origen quedó dentro de la fecha de corte del art. 190. */
  alcanzado: boolean;
  /** Ejercicios completos transcurridos entre el de origen y el que se liquida. */
  ejerciciosTranscurridos: number;
  /** Si ya pasaron los cinco años del noveno párrafo y el quebranto no se puede deducir más. */
  vencido: boolean;
  /** Último ejercicio (año de cierre) en el que todavía se puede computar. */
  ultimoAnioComputable: number;
  /** Si el IPC del mes pedido todavía no está publicado y se usó el último disponible. */
  indiceTopeado: boolean;
  avisos: Aviso[];
};

const pesos = (n: number) => `$${Math.round(n).toLocaleString("es-AR")}`;

/**
 * Índice del período pedido. Si el período es posterior al último publicado por el INDEC, devuelve
 * el último y lo declara: preferimos una actualización incompleta y avisada antes que extrapolar un
 * IPC que todavía no existe.
 */
function indiceConTope(periodo: string): { indice: number | null; topeado: boolean } {
  if (existePeriodo(periodo)) return { indice: indiceDe(periodo), topeado: false };
  if (periodo > ULTIMO_PERIODO) return { indice: indiceDe(ULTIMO_PERIODO), topeado: true };
  return { indice: null, topeado: false };
}

export function calcularQuebranto(params: {
  /** Monto del quebranto, en pesos del ejercicio en que se generó. */
  monto: number;
  /** Mes de CIERRE del ejercicio fiscal en que se originó el quebranto, "YYYY-MM". */
  cierreOrigen: string;
  /** Mes de CIERRE del ejercicio fiscal que se está liquidando, "YYYY-MM". */
  cierreLiquidado: string;
}): ResultadoQuebranto | null {
  const { monto, cierreOrigen, cierreLiquidado } = params;
  if (!(monto > 0)) return null;
  if (!/^\d{4}-\d{2}$/.test(cierreOrigen) || !/^\d{4}-\d{2}$/.test(cierreLiquidado)) return null;
  if (cierreLiquidado <= cierreOrigen) return null;

  const avisos: Aviso[] = [];

  // El ejercicio dura doce meses: si cierra en el mes M, se inició once meses antes.
  const inicioEjercicio = sumarMeses(cierreOrigen, -11);
  const alcanzado = inicioEjercicio >= PRIMER_INICIO_ACTUALIZABLE;

  const anioOrigen = Number(cierreOrigen.slice(0, 4));
  const anioLiquidado = Number(cierreLiquidado.slice(0, 4));
  const ejerciciosTranscurridos = anioLiquidado - anioOrigen;
  const ultimoAnioComputable = anioOrigen + ANIOS_DE_VIDA;
  const vencido = ejerciciosTranscurridos > ANIOS_DE_VIDA;

  let coeficiente = 1;
  let indiceTopeado = false;

  if (alcanzado && !vencido) {
    const origen = indiceConTope(cierreOrigen);
    const liquidado = indiceConTope(cierreLiquidado);
    if (origen.indice === null || liquidado.indice === null) return null;
    coeficiente = liquidado.indice / origen.indice;
    indiceTopeado = origen.topeado || liquidado.topeado;
  }

  const actualizado = vencido ? 0 : Math.round(monto * coeficiente * 100) / 100;
  const diferencia = Math.round((actualizado - monto) * 100) / 100;

  if (vencido) {
    avisos.push({
      tono: "bloqueante",
      texto: `El quebranto ya no se puede deducir: pasaron ${ejerciciosTranscurridos} ejercicios desde el de origen y el art. 25 le da cinco. El último en el que se podía computar fue el que cerró en ${ultimoAnioComputable}.`,
    });
  } else if (!alcanzado) {
    avisos.push({
      tono: "atencion",
      texto: `Este quebranto NO se actualiza: su ejercicio se inició en ${inicioEjercicio.replace("-", "/")}, antes del 1/1/2025. El art. 190 de la Ley 27.802 puso la fecha de corte en el INICIO del ejercicio, no en el cierre, así que se computa por su valor nominal de ${pesos(monto)}.`,
    });
  } else {
    avisos.push({
      tono: "ok",
      texto: `El ejercicio de origen se inició en ${inicioEjercicio.replace("-", "/")}, así que el quebranto se actualiza por IPC. Sin la reforma se habría computado por los ${pesos(monto)} nominales: la actualización agrega ${pesos(diferencia)}.`,
    });
  }

  if (!vencido && ejerciciosTranscurridos === ANIOS_DE_VIDA) {
    avisos.push({
      tono: "atencion",
      texto: `Es el último ejercicio en el que este quebranto se puede computar: el plazo de cinco años del art. 25 se agota acá.`,
    });
  }

  if (indiceTopeado) {
    avisos.push({
      tono: "atencion",
      texto: `El INDEC todavía no publicó el IPC de alguno de los dos meses. La cuenta usa el último publicado (${ULTIMO_PERIODO.replace("-", "/")}), así que el coeficiente está incompleto hacia abajo.`,
    });
  }

  return {
    nominal: monto,
    actualizado,
    coeficiente,
    diferencia,
    inicioEjercicio,
    alcanzado,
    ejerciciosTranscurridos,
    vencido,
    ultimoAnioComputable,
    indiceTopeado,
    avisos,
  };
}
