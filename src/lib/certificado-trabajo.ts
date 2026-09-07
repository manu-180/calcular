// Motor del certificado de trabajo (art. 80 LCT). Funciones puras, sin estado ni fetch.
//
// LO QUE DECIDE TODO ES UNA SOLA FECHA: la de extinción del contrato. Ninguna de las tres normas
// que se cruzan acá es retroactiva, así que el régimen aplicable sale de comparar esa fecha contra
// dos hitos —9/7/2024 (art. 99 de la Ley 27.742) y 6/3/2026 (art. 25 de la Ley 27.802)—. Por eso
// el motor no pregunta «¿te corresponde la multa?»: pregunta cuándo terminó el contrato y de ahí
// deriva qué norma manda, qué plazo corre y qué se puede reclamar.
//
// LA ARITMÉTICA ES EN UTC y sobre cadenas AAAA-MM-DD, igual que en `lib/licencias.ts` y
// `lib/feriados.ts`: con fechas locales el prerender del servidor y el navegador pueden diferir en
// un día entero, y en un plazo legal un día es la diferencia entre llegar y no llegar.
//
// EL CÓMPUTO DE LOS PLAZOS sigue el art. 6 del Código Civil y Comercial: el día de comienzo no se
// cuenta, el plazo arranca al día siguiente. Los 45 días del texto vigente son HÁBILES; los 30 del
// Decreto 146/2001 son CORRIDOS (lo dice el propio artículo). El art. 80 no define qué calendario
// de hábiles usar: acá se cuentan de lunes a viernes, salteando feriados nacionales y días no
// laborables derivados de la Ley 27.399, y se DEVUELVE la lista de días salteados para que el
// resultado sea recontable por quien tenga otro criterio o un feriado provincial.

import {
  DIAS_CORRIDOS_PARA_INTIMAR,
  DIAS_HABILES_DEL_REQUERIMIENTO,
  MULTIPLICADOR_MULTA,
  PLAZO_ENTREGA_DIAS_HABILES,
  VIGENCIA_BASES_ISO,
  VIGENCIA_REFORMA_ISO,
} from "@/data/certificado-trabajo";
import { anioCompleto, esHabil, feriadoDe } from "@/lib/feriados";
import { aISO, parseFechaISO, sumarDias } from "@/lib/licencias";

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

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
];

const DIAS_SEMANA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

/**
 * «2026-08-17» → «lunes 17 de agosto de 2026». Se arma a mano y en UTC a propósito: el
 * `toLocaleDateString` del navegador usa la zona horaria local y, con una fecha AAAA-MM-DD, en
 * Argentina devuelve el día anterior.
 */
export function formatFechaLarga(iso: string, conDiaDeSemana = true): string {
  const d = parseFechaISO(iso);
  if (!d) return iso;
  const cuerpo = `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
  return conDiaDeSemana ? `${DIAS_SEMANA[d.getUTCDay()]} ${cuerpo}` : cuerpo;
}

/**
 * Qué régimen manda, según cuándo se extinguió el contrato.
 *   · `vigente`    — extinción desde el 6/3/2026: art. 80 sustituido por la Ley 27.802.
 *   · `transicion` — entre el 9/7/2024 y el 5/3/2026: el art. 80 conservaba su último párrafo,
 *                    pero el art. 45 de la Ley 25.345 que lo había incorporado ya estaba derogado
 *                    por el art. 99 de la Ley 27.742. Su subsistencia se discute en tribunales.
 *   · `anterior`   — hasta el 8/7/2024: régimen pleno de la indemnización de tres remuneraciones.
 */
export type Regimen = "vigente" | "transicion" | "anterior";

export function regimenDe(fechaExtincionISO: string): Regimen {
  if (fechaExtincionISO >= VIGENCIA_REFORMA_ISO) return "vigente";
  if (fechaExtincionISO >= VIGENCIA_BASES_ISO) return "transicion";
  return "anterior";
}

/** Un día que el plazo salteó por no ser hábil, con el motivo, para que el cálculo sea recontable. */
export type DiaSalteado = { fecha: string; motivo: string };

export type PlazoHabiles = {
  /** Último día del plazo, AAAA-MM-DD. */
  vence: string;
  /** Días no hábiles que quedaron dentro del tramo (fines de semana y feriados). */
  salteados: DiaSalteado[];
  /** Cuántos días corridos terminó abarcando el plazo. */
  diasCorridos: number;
  /** False si algún año del tramo todavía no tiene publicados sus días turísticos (art. 7). */
  calendarioCompleto: boolean;
};

/**
 * Suma `cantidad` días hábiles a partir del día SIGUIENTE a `desdeISO` (art. 6 CCyC) y devuelve el
 * último día del plazo junto con todo lo que salteó. Sábado no cuenta como hábil: para un plazo
 * administrativo el criterio corriente es lunes a viernes, y el art. 160 de la LCT —que sí toma el
 * sábado como hábil— regula otra cosa (las vacaciones).
 */
export function sumarDiasHabiles(desdeISO: string, cantidad: number): PlazoHabiles | null {
  const inicio = parseFechaISO(desdeISO);
  if (!inicio || cantidad < 1) return null;

  const salteados: DiaSalteado[] = [];
  const anios = new Set<number>([inicio.getUTCFullYear()]);
  let cursor = inicio;
  let contados = 0;

  // Cota dura: 45 hábiles nunca superan ~80 corridos ni con Semana Santa y fin de año encima.
  for (let i = 0; i < cantidad * 3 + 30 && contados < cantidad; i++) {
    cursor = sumarDias(cursor, 1);
    anios.add(cursor.getUTCFullYear());
    if (esHabil(cursor, false)) {
      contados++;
      continue;
    }
    const iso = aISO(cursor);
    const feriado = feriadoDe(iso);
    const dia = cursor.getUTCDay();
    salteados.push({
      fecha: iso,
      motivo: feriado ? feriado.nombre : dia === 6 ? "sábado" : "domingo",
    });
  }

  if (contados < cantidad) return null;

  return {
    vence: aISO(cursor),
    salteados,
    diasCorridos: Math.round((cursor.getTime() - inicio.getTime()) / 86_400_000),
    calendarioCompleto: [...anios].every((a) => anioCompleto(a)),
  };
}

/** Un paso del cronograma, con su fecha ya resuelta y la norma que lo manda. */
export type Paso = {
  fecha: string;
  titulo: string;
  detalle: string;
  norma: string;
  /** True cuando el paso todavía no ocurrió respecto de la fecha de referencia. */
  futuro: boolean;
};

export type ResultadoCertificado = {
  regimen: Regimen;
  fechaExtincion: string;
  /** Plazo de entrega del texto vigente. Sólo existe en el régimen `vigente`. */
  plazoEntrega: PlazoHabiles | null;
  /** Primer día en que se puede intimar (Dec. 146/2001 art. 3). Sólo en los regímenes anteriores. */
  habilitadoAIntimarDesde: string | null;
  /** Vencimiento de los 2 días hábiles del requerimiento, si se cargó la fecha de recepción. */
  venceRequerimiento: PlazoHabiles | null;
  /** Importe del párrafo derogado: tres veces la mejor remuneración. */
  montoIndemnizacion: number;
  /** Si ese importe se puede reclamar hoy por una extinción de esa fecha. */
  procedencia: "vigente" | "discutida" | "sin-tarifa";
  cronograma: Paso[];
  avisos: Aviso[];
};

export function calcularCertificado(params: {
  /** Fecha de extinción del contrato, AAAA-MM-DD. */
  fechaExtincion: string;
  /** Mejor remuneración mensual, normal y habitual del último año. */
  mejorRemuneracion: number;
  /** Fecha en que el empleador recibió el requerimiento fehaciente, si hubo. */
  fechaRequerimiento?: string;
  /** Hoy, para marcar qué pasos ya vencieron. Se inyecta para que el cálculo sea determinista. */
  hoy: string;
}): ResultadoCertificado | null {
  const extincion = parseFechaISO(params.fechaExtincion);
  if (!extincion) return null;

  const fechaExtincion = params.fechaExtincion;
  const regimen = regimenDe(fechaExtincion);
  const remuneracion = Math.max(0, params.mejorRemuneracion || 0);
  const hoy = params.hoy;

  const avisos: Aviso[] = [];
  const cronograma: Paso[] = [];

  cronograma.push({
    fecha: fechaExtincion,
    titulo: "Se extingue el contrato",
    detalle:
      "Por cualquier causa: despido con o sin causa, renuncia, mutuo acuerdo, jubilación o vencimiento del plazo. El artículo no distingue.",
    norma: "LCT art. 80",
    futuro: fechaExtincion > hoy,
  });

  let plazoEntrega: PlazoHabiles | null = null;
  let habilitadoAIntimarDesde: string | null = null;
  let venceRequerimiento: PlazoHabiles | null = null;

  if (regimen === "vigente") {
    plazoEntrega = sumarDiasHabiles(fechaExtincion, PLAZO_ENTREGA_DIAS_HABILES);
    if (plazoEntrega) {
      cronograma.push({
        fecha: plazoEntrega.vence,
        titulo: `Último día para entregar o poner a disposición los certificados (${PLAZO_ENTREGA_DIAS_HABILES} días hábiles)`,
        detalle: `Son ${PLAZO_ENTREGA_DIAS_HABILES} días hábiles contados desde el día siguiente a la extinción: ${plazoEntrega.diasCorridos} días corridos, con ${plazoEntrega.salteados.length} día(s) no hábil(es) en el medio.`,
        norma: "LCT art. 80, texto según art. 25 de la Ley 27.802",
        futuro: plazoEntrega.vence > hoy,
      });
      if (!plazoEntrega.calendarioCompleto) {
        avisos.push({
          tono: "atencion",
          texto:
            "El plazo cae en un año cuyos días no laborables con fines turísticos todavía no fueron fijados por el Poder Ejecutivo (art. 7 de la Ley 27.399). La fecha puede correrse hasta tres días hábiles cuando salga esa resolución: acá no se inventan feriados.",
        });
      }
    }
  } else {
    habilitadoAIntimarDesde = aISO(sumarDias(extincion, DIAS_CORRIDOS_PARA_INTIMAR));
    cronograma.push({
      fecha: habilitadoAIntimarDesde,
      titulo: `Recién desde acá se podía intimar (${DIAS_CORRIDOS_PARA_INTIMAR} días corridos)`,
      detalle:
        "El decreto reglamentario habilitaba el requerimiento fehaciente sólo si el empleador no había entregado los certificados dentro de los 30 días corridos de extinguido el contrato. Una intimación anterior era prematura.",
      norma: "Decreto 146/2001, art. 3",
      futuro: habilitadoAIntimarDesde > hoy,
    });

    if (params.fechaRequerimiento && parseFechaISO(params.fechaRequerimiento)) {
      const recepcion = params.fechaRequerimiento;
      cronograma.push({
        fecha: recepcion,
        titulo: "El empleador recibe el requerimiento fehaciente",
        detalle:
          recepcion < habilitadoAIntimarDesde
            ? "Ojo: esta fecha es anterior a los 30 días corridos del decreto reglamentario. Una intimación cursada antes de tiempo se discutía como prematura."
            : "Desde el día siguiente empiezan a correr los dos días hábiles del párrafo que agregó el art. 45 de la Ley 25.345.",
        norma: "LCT art. 80, último párrafo (texto derogado)",
        futuro: recepcion > hoy,
      });

      venceRequerimiento = sumarDiasHabiles(recepcion, DIAS_HABILES_DEL_REQUERIMIENTO);
      if (venceRequerimiento) {
        cronograma.push({
          fecha: venceRequerimiento.vence,
          titulo: "Vencen los 2 días hábiles: acá se devengaba la indemnización",
          detalle: `Pasado este día sin entrega, el párrafo derogado fijaba una indemnización de ${MULTIPLICADOR_MULTA} veces la mejor remuneración mensual, normal y habitual del último año.`,
          norma: "LCT art. 80, último párrafo (texto derogado)",
          futuro: venceRequerimiento.vence > hoy,
        });
      }

      if (recepcion < habilitadoAIntimarDesde) {
        avisos.push({
          tono: "bloqueante",
          texto: `El requerimiento se recibió antes de los ${DIAS_CORRIDOS_PARA_INTIMAR} días corridos que exigía el art. 3 del Decreto 146/2001 (recién habilitaba a partir del ${habilitadoAIntimarDesde}). Ese defecto se planteaba como intimación prematura.`,
        });
      }
    } else {
      avisos.push({
        tono: "atencion",
        texto:
          "Sin la fecha en que el empleador recibió el requerimiento fehaciente no hay indemnización devengada: en el régimen anterior el importe no nacía del solo incumplimiento, sino del silencio después de una intimación cursada en tiempo y forma.",
      });
    }
  }

  const montoIndemnizacion = remuneracion * MULTIPLICADOR_MULTA;

  const procedencia: ResultadoCertificado["procedencia"] =
    regimen === "vigente" ? "sin-tarifa" : regimen === "transicion" ? "discutida" : "vigente";

  if (regimen === "vigente") {
    avisos.push({
      tono: "bloqueante",
      texto:
        "El texto vigente del art. 80 no prevé ninguna indemnización tarifada por no entregar los certificados. La frase «tres veces la mejor remuneración mensual, normal y habitual» no figura en ningún artículo de la Ley de Contrato de Trabajo actualizada: la incorporó el art. 45 de la Ley 25.345 y ese artículo está derogado. Lo que queda es la obligación, su plazo y los reclamos del derecho común, que no tienen importe fijado por la ley.",
    });
    avisos.push({
      tono: "ok",
      texto:
        "La obligación no desapareció: se volvió más concreta. Ahora hay un plazo escrito en la ley (45 días hábiles) y tres formas de cumplirlo, una de las cuales se satisface con la información que ARCA ya publica para el trabajador.",
    });
  }

  if (regimen === "transicion") {
    avisos.push({
      tono: "bloqueante",
      texto: `Zona gris. Para las extinciones ocurridas entre el ${VIGENCIA_BASES_ISO} y el día anterior al ${VIGENCIA_REFORMA_ISO}, el art. 80 todavía tenía su último párrafo, pero el art. 45 de la Ley 25.345 —el que lo había incorporado— ya estaba derogado por el art. 99 de la Ley 27.742. Si esa derogación borró o no la sanción es una discusión abierta, con fallos en los dos sentidos. El importe de acá es de referencia, no un derecho firme.`,
    });
  }

  if (regimen === "anterior") {
    avisos.push({
      tono: "ok",
      texto: `Para una extinción anterior al ${VIGENCIA_BASES_ISO} regía el párrafo que agregó el art. 45 de la Ley 25.345, con su indemnización de ${MULTIPLICADOR_MULTA} remuneraciones. Las normas posteriores no son retroactivas, pero el reclamo prescribe a los dos años (art. 256 LCT): revisá si tu caso sigue en plazo.`,
    });
  }

  if (remuneracion <= 0 && regimen !== "vigente") {
    avisos.push({
      tono: "atencion",
      texto:
        "Cargá la mejor remuneración mensual, normal y habitual del último año para ver el importe. Es la mejor de las mensuales, no un promedio, y se toma la del último año de trabajo o la del tiempo trabajado si fue menor.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "El art. 80 dice «días hábiles» y no aclara qué calendario. Acá se cuentan de lunes a viernes salteando feriados nacionales y días no laborables de la Ley 27.399, y abajo está la lista completa de días salteados: si en tu provincia hubo un feriado local, restalo del cálculo.",
  });

  cronograma.sort((a, b) => a.fecha.localeCompare(b.fecha));

  return {
    regimen,
    fechaExtincion,
    plazoEntrega,
    habilitadoAIntimarDesde,
    venceRequerimiento,
    montoIndemnizacion,
    procedencia,
    cronograma,
    avisos,
  };
}
