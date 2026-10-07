import {
  ANIOS_LABORAL,
  ANIOS_PREVISIONAL,
  MESES_INTERRUPCION_ART257,
} from "@/data/conservacion-recibos";

// Conservación de recibos (LCT art. 143, texto Ley 27.802): hasta cuándo hay que guardar cada
// constancia de pago.
//
// LA ARITMÉTICA ES TRIVIAL Y ESE ES EL PUNTO: hasta el 6/3/2026 el artículo no traía ningún
// número —remitía a «la prescripción liberatoria del beneficio de que se trate»— así que no había
// nada que calcular, sólo que averiguar. El texto vigente trae dos plazos: dos (2) años por las
// obligaciones laborales y diez (10) por las previsionales. Lo único que hace esta función es
// convertirlos en fechas, y decir cuál de los dos manda.
//
// LA REGLA QUE HAY QUE PUBLICAR FUERTE: manda el MÁS LARGO. Un mismo recibo prueba la obligación
// laboral y la previsional; destruirlo a los dos años deja al empleador sin respaldo por los otros
// ocho. El artículo no autoriza a destruir a los dos años: enuncia los dos plazos que hay que
// «considerar».

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoConservacion = {
  /** Fecha de pago del recibo, ISO. */
  pagoISO: string;
  /** Hasta cuándo lo pide el plazo laboral (art. 143 + art. 256): pago + 2 años. */
  limiteLaboralISO: string;
  /** Hasta cuándo lo pide el plazo previsional: pago + 10 años. */
  limitePrevisionalISO: string;
  /** El que manda: siempre el más largo de los dos. */
  limiteQueMandaISO: string;
  /** Años que faltan (o que pasaron, en negativo) hasta el límite que manda. */
  aniosRestantes: number;
  /** true si el plazo laboral ya venció a la fecha de referencia. */
  laboralVencido: boolean;
  /** true si ya venció también el previsional: recién ahí el art. 143 deja de exigir. */
  previsionalVencido: boolean;
  avisos: Aviso[];
};

function sumarAnios(iso: string, anios: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const yy = y + anios;
  // 29/2 + N años cae en 28/2 cuando el año destino no es bisiesto.
  const ultimoDia = new Date(Date.UTC(yy, m, 0)).getUTCDate();
  const dd = Math.min(d, ultimoDia);
  return `${yy}-${String(m).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
}

const DIA_MS = 86_400_000;

function aniosEntre(desdeISO: string, hastaISO: string): number {
  const dias =
    (Date.parse(`${hastaISO}T00:00:00Z`) - Date.parse(`${desdeISO}T00:00:00Z`)) / DIA_MS;
  return dias / 365.25;
}

export function calcularConservacion(params: {
  /** Fecha en que se pagó el sueldo (la del recibo). */
  pagoISO: string;
  /** Fecha de referencia contra la que se compara (hoy, en el cliente; fija en los tests). */
  hoyISO: string;
}): ResultadoConservacion | null {
  const { pagoISO, hoyISO } = params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(pagoISO) || !/^\d{4}-\d{2}-\d{2}$/.test(hoyISO)) return null;

  const limiteLaboralISO = sumarAnios(pagoISO, ANIOS_LABORAL);
  const limitePrevisionalISO = sumarAnios(pagoISO, ANIOS_PREVISIONAL);
  // El art. 143 enuncia los dos plazos: el que decide cuándo se puede archivar es el mayor.
  const limiteQueMandaISO =
    limitePrevisionalISO > limiteLaboralISO ? limitePrevisionalISO : limiteLaboralISO;

  const laboralVencido = hoyISO > limiteLaboralISO;
  const previsionalVencido = hoyISO > limitePrevisionalISO;

  const avisos: Aviso[] = [];

  avisos.push({
    tono: "ok",
    texto: `El artículo 143 vigente escribe los dos plazos: ${ANIOS_LABORAL} años por las obligaciones laborales y ${ANIOS_PREVISIONAL} por las previsionales. El texto anterior no traía ningún número: decía sólo «durante todo el plazo correspondiente a la prescripción liberatoria del beneficio de que se trate».`,
  });

  if (!previsionalVencido) {
    avisos.push({
      tono: "bloqueante",
      texto: `Este recibo hay que seguir conservándolo hasta el ${limitePrevisionalISO}. Manda el plazo más largo: el mismo papel prueba la obligación laboral y la previsional, así que destruirlo cuando vence el de ${ANIOS_LABORAL} años deja a la empresa sin respaldo por los ${ANIOS_PREVISIONAL - ANIOS_LABORAL} años que siguen.`,
    });
  } else {
    avisos.push({
      tono: "atencion",
      texto: `Los dos plazos del artículo 143 ya vencieron para este recibo (el laboral el ${limiteLaboralISO} y el previsional el ${limitePrevisionalISO}). Eso significa que la ley ya no obliga a conservarlo, no que convenga destruirlo si hay un reclamo abierto o una inspección en curso.`,
    });
  }

  if (laboralVencido && !previsionalVencido) {
    avisos.push({
      tono: "atencion",
      texto: `El plazo laboral de ${ANIOS_LABORAL} años ya pasó, pero el previsional de ${ANIOS_PREVISIONAL} sigue corriendo. Es exactamente la ventana en la que se cometen los archivos apurados.`,
    });
  }

  avisos.push({
    tono: "atencion",
    texto: `Los ${ANIOS_LABORAL} años no siempre corren de un tirón: el artículo 257 dice que un reclamo ante la autoridad administrativa del trabajo interrumpe la prescripción durante el trámite, «pero en ningún caso por un lapso mayor de ${MESES_INTERRUPCION_ART257} meses». Si hubo un reclamo, la fecha real se corre.`,
  });

  avisos.push({
    tono: "ok",
    texto:
      "No hace falta guardar papel: la misma norma dice que los recibos «podrán ser digitalizados, los cuales tendrán la misma validez que en formato papel». Esa oración ya estaba antes de la reforma y no fue tocada.",
  });

  return {
    pagoISO,
    limiteLaboralISO,
    limitePrevisionalISO,
    limiteQueMandaISO,
    aniosRestantes: aniosEntre(hoyISO, limiteQueMandaISO),
    laboralVencido,
    previsionalVencido,
    avisos,
  };
}
