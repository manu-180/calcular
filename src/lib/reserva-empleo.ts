import {
  ARTICULO_DEROGADO,
  ARTICULO_DEROGATORIO,
  DIAS_PARA_REINCORPORAR,
  SUPUESTOS_RESERVA,
  type SupuestoReserva,
} from "@/data/reserva-empleo";
import {
  antiguedadEntre,
  calcularIndemnizacion,
  type Antiguedad,
  type ResultadoIndemnizacion,
} from "@/lib/indemnizacion";

// Reserva del empleo (LCT arts. 214 a 217): cuánto cambia la indemnización según si el período de
// reserva cuenta o no cuenta como antigüedad.
//
// POR QUÉ ESTA CALCULADORA CALCULA DOS ESCENARIOS Y NO UNO: hasta el 6/3/2026 la respuesta estaba
// escrita. El art. 216 decía, con todas las letras, que "a los efectos de dichas indemnizaciones la
// antigüedad computable incluirá el período de reserva del empleo". La Ley 27.802 lo derogó (su
// art. 207) y esa oración desapareció del cuerpo legal. Lo que quedó es la regla genérica de la
// segunda parte de los arts. 214 y 215 —el tiempo de reserva "será considerado período de trabajo a
// los efectos del cómputo de su antigüedad, frente a los beneficios que por esta ley (…) le
// hubiesen correspondido"—, que no fue tocada.
//
// O sea: la respuesta pasó de estar escrita a depender de una interpretación. Publicar UN número
// sería fingir que la discusión no existe. Esta página publica LOS DOS y nombra la diferencia:
// es exactamente lo que se juega en el reclamo.
//
// EL ART. 245 NO SE REIMPLEMENTA (regla de s85): los dos escenarios salen de `calcularIndemnizacion`,
// la misma función que usa /indemnizacion. Dos páginas de calcular.ar no pueden publicar dos
// importes distintos para el mismo sueldo y la misma antigüedad.
//
// CÓMO SE CONSTRUYE EL ESCENARIO "SIN RESERVA": no se inventa una antigüedad, se corre la MISMA
// función con una fecha de ingreso corrida hacia adelante tantos días como duró la reserva. El
// resultado es el que tendría un trabajador con idéntico tiempo efectivo de servicio, y se muestra
// esa fecha equivalente en pantalla en vez de esconderla.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoReserva = {
  supuesto: SupuestoReserva;
  /** Días corridos que duró el período de reserva (deja de prestar servicios → fin de la función). */
  diasDeReserva: number;
  /** El período de reserva expresado en años/meses/días. */
  duracionReserva: Antiguedad;
  /** Fecha de ingreso corrida, con la que se calcula el escenario sin reserva. */
  ingresoEquivalente: string;
  /** Último día del plazo de reincorporación: fin de la función + 30 días (arts. 214/215/217). */
  limiteReincorporacion: string;
  /** true si el egreso quedó después de ese plazo. */
  egresoFueraDeVentana: boolean;
  /** Indemnización computando el período de reserva (lo que decía el art. 216 derogado). */
  conReserva: ResultadoIndemnizacion;
  /** Indemnización sin computarlo. */
  sinReserva: ResultadoIndemnizacion;
  /** Cuánto se juega: diferencia entre los dos totales indemnizatorios. */
  diferencia: number;
  /** true si la duración del preaviso (1 mes vs 2) depende del período de reserva. */
  cambiaElPreaviso: boolean;
  /** true si sin el período de reserva el trabajador caería dentro del período de prueba. */
  cambiaElPeriodoDePrueba: boolean;
  avisos: Aviso[];
};

function parseUTC(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function aISO(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

/** Días corridos entre dos fechas ISO (b − a). Negativo si b es anterior a a. */
function diasEntre(desdeISO: string, hastaISO: string): number {
  return Math.round((parseUTC(hastaISO).getTime() - parseUTC(desdeISO).getTime()) / 86_400_000);
}

function sumarDias(iso: string, dias: number): string {
  const f = parseUTC(iso);
  f.setUTCDate(f.getUTCDate() + dias);
  return aISO(f);
}

export function calcularReservaEmpleo(params: {
  /** Mejor remuneración mensual, normal y habitual (base del art. 245). */
  mejorRemuneracion: number;
  /** Ingreso a la empresa, ISO YYYY-MM-DD. */
  ingreso: string;
  /** Fecha en la que dejó de prestar servicios por la convocatoria, el cargo o la función. */
  inicioReserva: string;
  /** Fecha en la que concluyó el servicio, el mandato o la función. */
  finFuncion: string;
  /** Despido o fecha de la no reincorporación. */
  egreso: string;
  /** Cuál de los tres supuestos del Título X. */
  supuestoId: SupuestoReserva["id"];
  /** Tope del convenio, si se conoce. */
  topeCCT?: number;
}): ResultadoReserva | null {
  const { mejorRemuneracion, ingreso, inicioReserva, finFuncion, egreso, supuestoId, topeCCT } =
    params;

  const supuesto = SUPUESTOS_RESERVA.find((s) => s.id === supuestoId);
  if (!supuesto) return null;
  if (!(mejorRemuneracion > 0)) return null;
  if (!(inicioReserva > ingreso)) return null;
  if (!(finFuncion > inicioReserva)) return null;
  if (!(egreso > finFuncion)) return null;

  const diasDeReserva = diasEntre(inicioReserva, finFuncion);
  const duracionReserva = antiguedadEntre(inicioReserva, finFuncion);
  const ingresoEquivalente = sumarDias(ingreso, diasDeReserva);
  if (!(egreso > ingresoEquivalente)) return null;

  const limiteReincorporacion = sumarDias(finFuncion, DIAS_PARA_REINCORPORAR);
  const egresoFueraDeVentana = egreso > limiteReincorporacion;

  const conReserva = calcularIndemnizacion({
    ingresoISO: ingreso,
    despidoISO: egreso,
    mejorRemuneracion,
    preavisoOtorgado: false,
    topeCCT,
  });
  const sinReserva = calcularIndemnizacion({
    ingresoISO: ingresoEquivalente,
    despidoISO: egreso,
    mejorRemuneracion,
    preavisoOtorgado: false,
    topeCCT,
  });
  if (!conReserva || !sinReserva) return null;

  const diferencia = conReserva.totalIndemnizatorio - sinReserva.totalIndemnizatorio;
  const cambiaElPreaviso =
    (conReserva.preaviso?.meses ?? 0) !== (sinReserva.preaviso?.meses ?? 0);
  const cambiaElPeriodoDePrueba = !conReserva.enPeriodoPrueba && sinReserva.enPeriodoPrueba;

  const avisos: Aviso[] = [];

  avisos.push({
    tono: "bloqueante",
    texto: `Desde el 6 de marzo de 2026 no hay artículo que resuelva esto. El art. ${ARTICULO_DEROGADO} de la LCT (el que decía que «a los efectos de dichas indemnizaciones la antigüedad computable incluirá el período de reserva del empleo») fue derogado por el art. ${ARTICULO_DEROGATORIO} de la Ley 27.802, sin fecha diferida. La diferencia entre las dos columnas es lo que quedó a discutir.`,
  });

  if (supuesto.cubriaElArt216) {
    avisos.push({
      tono: "atencion",
      texto: `Tu caso es de los que el art. ${ARTICULO_DEROGADO} nombraba expresamente: hablaba de «un trabajador que se encontrare en la situación de los artículos 214 o 215», y el tuyo es el art. ${supuesto.articulo}. Lo que NO se derogó es la segunda parte de ese mismo artículo, que sigue diciendo que el tiempo de reserva «será considerado período de trabajo a los efectos del cómputo de su antigüedad» frente a los beneficios de la ley. Esa regla genérica es hoy el argumento para sostener la columna de la izquierda.`,
    });
  } else {
    avisos.push({
      tono: "ok",
      texto:
        "Tu caso es el del art. 217 (cargo gremial), que la reforma NO tocó: conserva la reserva del empleo, el cómputo del tiempo «con el alcance de los artículos 214 y 215, segunda parte» y, además, la prohibición expresa de despedir durante los plazos que fije la ley sindical. El art. 216 nunca te nombró (hablaba sólo de los arts. 214 o 215), así que su derogación no te quita el artículo propio. La calculadora te muestra igual las dos columnas porque el cómputo también se discute acá.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto: `Los arts. 214 y 215 dan ${DIAS_PARA_REINCORPORAR} días para reincorporarte después de concluida la función: en tu caso, hasta el ${limiteReincorporacion}. ${
      egresoFueraDeVentana
        ? "La fecha que cargaste es posterior a ese plazo, así que la obligación de reincorporar ya estaba vencida cuando se produjo el egreso."
        : "La fecha que cargaste cae dentro de ese plazo: la obligación de reincorporar estaba vigente."
    }`,
  });

  if (cambiaElPreaviso) {
    avisos.push({
      tono: "bloqueante",
      texto: `Acá el período de reserva no cambia sólo el monto: cambia el PREAVISO. Con la reserva computada la antigüedad supera los cinco años y el preaviso es de ${
        conReserva.preaviso?.meses ?? 0
      } meses (art. 231); sin computarla, queda en ${
        sinReserva.preaviso?.meses ?? 0
      }. Es el mismo umbral que el art. 216 derogado alcanzaba cuando nombraba las indemnizaciones «por falta u omisión del preaviso».`,
    });
  }

  if (cambiaElPeriodoDePrueba) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Caso extremo: sin computar el período de reserva, tu antigüedad efectiva queda por debajo de los seis meses del período de prueba (art. 92 bis) y la indemnización por antigüedad se va a cero. Es la diferencia entre cobrar y no cobrar, no entre cobrar más o menos.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "Lo que sí quedó escrito y juega a tu favor: los arts. 214 y 215 aclaran que el tiempo de reserva «no será considerado para determinar los promedios de remuneraciones». Los meses sin sueldo del período de reserva no bajan la base del art. 245: la mejor remuneración mensual, normal y habitual se busca entre los meses efectivamente trabajados.",
  });

  avisos.push({
    tono: "atencion",
    texto:
      "La derogación rige desde el 6 de marzo de 2026 y no es retroactiva: la nota del propio artículo dice «a partir de su publicación en el Boletín Oficial». Si el despido o la no reincorporación ocurrieron antes de esa fecha, el art. 216 estaba vigente y la antigüedad computable incluía el período de reserva por texto expreso.",
  });

  avisos.push({
    tono: "atencion",
    texto:
      "Esto calcula los dos rubros que el art. 216 nombraba: la indemnización por despido injustificado (art. 245) y el preaviso omitido, con la integración del mes del art. 233. No es la liquidación final completa. Es orientativo y no reemplaza a un profesional: la reforma es de marzo de 2026 y todavía no hay jurisprudencia sobre el vacío que dejó.",
  });

  return {
    supuesto,
    diasDeReserva,
    duracionReserva,
    ingresoEquivalente,
    limiteReincorporacion,
    egresoFueraDeVentana,
    conReserva,
    sinReserva,
    diferencia,
    cambiaElPreaviso,
    cambiaElPeriodoDePrueba,
    avisos,
  };
}
