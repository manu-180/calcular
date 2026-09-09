import {
  CAUSALES_RECHAZO,
  PLAZO_RECHAZO_HABILES,
  PRORROGA_HABILES,
} from "@/data/rechazo-art";
import { aISO, sumarDias } from "@/lib/licencias";
import { anioCompleto, esHabil, parseFechaISO } from "@/lib/feriados";

export type CausalId = "a" | "b" | "c" | "otra";
export type Veredicto = "aceptado-por-silencio" | "rechazo-en-plazo" | "en-plazo-todavia";
export type AdondeVa = "comision-medica" | "autoridad-competente" | "sin-encuadre";
export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type Entrada = {
  fechaDenuncia: string;
  prorrogaNotificada: boolean;
  fechaProrroga?: string;
  rechazoNotificado: boolean;
  fechaRechazo?: string;
  causal: CausalId;
  empleadorReconoceRelacion: boolean;
  hoy: string;
};

export type ResultadoRechazoArt = {
  vencimientoBase: string;
  vencimientoFinal: string;
  prorrogaValida: boolean;
  veredicto: Veredicto;
  fechaRechazoEnPlazo: boolean | null;
  adondeVa: AdondeVa;
  exigeFundamento: boolean;
  habilesTranscurridos: number;
  habilesRestantes: number;
  diasHabilesContados: string[];
  calendarioCompleto: boolean;
  avisos: Aviso[];
};

function sumarHabiles(desde: Date, cantidad: number): { fecha: Date; dias: string[] } {
  let fecha = desde;
  const dias: string[] = [];
  while (dias.length < cantidad) {
    fecha = sumarDias(fecha, 1);
    if (esHabil(fecha, false)) dias.push(aISO(fecha));
  }
  return { fecha, dias };
}

export function calcularRechazoArt(e: Entrada): ResultadoRechazoArt {
  const denuncia = parseFechaISO(e.fechaDenuncia)!;
  const base = sumarHabiles(denuncia, PLAZO_RECHAZO_HABILES);
  const vencimientoBase = aISO(base.fecha);
  const prorrogaValida = Boolean(
    e.prorrogaNotificada && e.fechaProrroga && e.fechaProrroga <= vencimientoBase,
  );
  const extension = prorrogaValida
    ? sumarHabiles(base.fecha, PRORROGA_HABILES)
    : { fecha: base.fecha, dias: [] as string[] };
  const vencimientoFinal = aISO(extension.fecha);
  const diasHabilesContados = [...base.dias, ...extension.dias];
  const rechazoConFecha = Boolean(e.rechazoNotificado && e.fechaRechazo);
  const fechaRechazoEnPlazo = rechazoConFecha && e.fechaRechazo
    ? e.fechaRechazo <= vencimientoFinal
    : null;

  let veredicto: Veredicto;
  if (fechaRechazoEnPlazo === true) {
    veredicto = "rechazo-en-plazo";
  } else if (
    (rechazoConFecha && e.fechaRechazo && e.fechaRechazo > vencimientoFinal) ||
    (!rechazoConFecha && e.hoy > vencimientoFinal)
  ) {
    veredicto = "aceptado-por-silencio";
  } else {
    veredicto = "en-plazo-todavia";
  }

  const causal = CAUSALES_RECHAZO.find((item) => item.id === e.causal);
  const adondeVa: AdondeVa = causal?.vaA ?? "sin-encuadre";
  const exigeFundamento = causal?.exigeFundamento ?? false;
  const avisos: Aviso[] = [
    {
      tono: "ok",
      texto:
        "Los 10 días y, si corresponde, los otros 10 de prórroga se cuentan en días hábiles administrativos, desde el día siguiente a la recepción de la denuncia (art. 36 bis).",
    },
    {
      tono: "atencion",
      texto:
        "Un asueto administrativo puntual no se puede derivar del calendario nacional y puede correr la fecha un día más. Por eso el vencimiento calculado es el más temprano posible.",
    },
  ];

  if (e.prorrogaNotificada && !e.fechaProrroga) {
    avisos.push({
      tono: "bloqueante",
      texto: "Marcaste que hubo prórroga, pero falta la fecha de su notificación fehaciente.",
    });
  } else if (e.prorrogaNotificada && !prorrogaValida) {
    avisos.push({
      tono: "atencion",
      texto: `La prórroga fue notificada después del vencimiento base (${vencimientoBase}) y no es válida: el art. 6º exige avisarla dentro de los primeros 10 días hábiles administrativos.`,
    });
  } else if (prorrogaValida) {
    avisos.push({
      tono: "ok",
      texto: `La prórroga fue notificada dentro del plazo base y agrega otros ${PRORROGA_HABILES} días hábiles administrativos.`,
    });
  }

  if (e.rechazoNotificado && !e.fechaRechazo) {
    avisos.push({
      tono: "bloqueante",
      texto: "Marcaste que hubo rechazo, pero falta la fecha en que se cursó la notificación fehaciente.",
    });
  }

  if (veredicto === "aceptado-por-silencio") {
    avisos.push({
      tono: "bloqueante",
      texto:
        "El rechazo fue tardío o no fue notificado dentro del plazo: el art. 6º establece la aceptación de la pretensión por silencio de la Aseguradora.",
    });
  } else if (veredicto === "rechazo-en-plazo") {
    avisos.push({
      tono: "ok",
      texto: "La notificación fehaciente del rechazo fue cursada dentro del plazo aplicable, inclusive el día del vencimiento.",
    });
  } else {
    avisos.push({
      tono: "atencion",
      texto: "La Aseguradora todavía está dentro del plazo para cursar una notificación fehaciente de rechazo.",
    });
  }

  if (e.causal === "a") {
    if (e.empleadorReconoceRelacion) {
      avisos.push({
        tono: "bloqueante",
        texto:
          "La Aseguradora no puede rechazar por inexistencia de una relación laboral reconocida por el empleador (art. 6º).",
      });
    }
    avisos.push({
      tono: "atencion",
      texto:
        "La comisión médica no interviene ni da curso a cuestiones sobre la existencia de la relación laboral: deben resolverse previamente ante la autoridad competente (art. 11).",
    });
  } else if (e.causal === "b" || e.causal === "c") {
    avisos.push({
      tono: "ok",
      texto:
        "El rechazo debe estar fundado (art. 6º bis) y la divergencia tramita ante la comisión médica (art. 10 inc. 5), con patrocinio letrado obligatorio y gratuito.",
    });
  } else {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Las causales del art. 6º son taxativas: el rechazo sólo puede fundarse en los incisos a), b) o c). Este motivo queda sin encuadre en esa lista.",
    });
  }

  const aniosCalculados = new Set(
    [vencimientoBase, vencimientoFinal, ...diasHabilesContados].map((fecha) => Number(fecha.slice(0, 4))),
  );
  const calendarioCompleto = [...aniosCalculados].every(anioCompleto);
  if (!calendarioCompleto) {
    avisos.push({
      tono: "atencion",
      texto:
        "El calendario de al menos uno de los años calculados no tiene calendario completo de días no laborables turísticos. Las fechas son una estimación temprana, no un vencimiento cierto.",
    });
  }

  const habilesTranscurridos = diasHabilesContados.filter((fecha) => fecha <= e.hoy).length;
  const habilesRestantes = veredicto === "en-plazo-todavia"
    ? diasHabilesContados.filter((fecha) => fecha > e.hoy).length
    : 0;

  return {
    vencimientoBase,
    vencimientoFinal,
    prorrogaValida,
    veredicto,
    fechaRechazoEnPlazo,
    adondeVa,
    exigeFundamento,
    habilesTranscurridos,
    habilesRestantes,
    diasHabilesContados,
    calendarioCompleto,
    avisos,
  };
}
