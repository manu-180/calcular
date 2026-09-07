// Motor de los plazos de la comisión médica (Ley 27.348). Funciones puras, sin fetch.
//
// ⚠️ ENCUADRE — esto NO declara vencido un trámite ni habilita a nadie a demandar. Calcula las
// fechas que salen de contar los plazos de la ley desde los datos que el usuario declara. El
// art. 3° prevé una PRÓRROGA fundada por cuestiones de hecho de la acreditación: si la comisión la
// dictó, la fecha real se corre y ningún formulario puede saberlo. Se dice en la página.
//
// TODA LA ARITMÉTICA DE FECHAS ES EN UTC, por la misma razón que en `lib/licencias.ts`: con fechas
// locales el prerender del servidor y el navegador del usuario pueden diferir en un día entero, y
// acá un día es la diferencia entre «todavía tenés que esperar» y «ya podés ir al juzgado».
//
// LA AMBIGÜEDAD QUE SE MUESTRA EN VEZ DE RESOLVERSE. El art. 3° dice «contados a partir de la
// primera presentación debidamente cumplimentada» y no aclara si ese día cuenta. Se toma la
// lectura CONSERVADORA para el trabajador —el plazo arranca el día hábil siguiente, así que la
// fecha de vencimiento cae más tarde— y se dice explícitamente en la página que la otra lectura da
// un día hábil antes. Anunciar la fecha temprana como certeza es lo peligroso: alguien podría
// iniciar la demanda un día antes de que la vía esté expedita.
//
// QUÉ CUENTA COMO «DÍA HÁBIL ADMINISTRATIVO» ACÁ: no cuentan sábados, domingos, feriados
// nacionales, días no laborables ni los días no laborables con fines turísticos de la Ley 27.399.
// Lo que este motor NO sabe, y la página declara: feriados provinciales y municipales, y los
// asuetos administrativos, que no son feriados y se dictan por acto del Poder Ejecutivo. Todos
// esos corren la fecha HACIA ADELANTE, así que la fecha calculada es la más temprana posible.

import {
  ANIOS_ILT,
  DIAS_ILT_EFECTIVOS,
  DIAS_PAGO_HOMOLOGACION,
  PLAZO_DICTAMEN_HABILES,
} from "@/data/comision-medica";
import { ANIO_MAXIMO_COMPLETO, esHabil } from "@/lib/feriados";
import { aISO, diasEntre, parseFechaISO, sumarDias, sumarMeses } from "@/lib/licencias";

export type AvisoCM = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

/** El sábado NO es hábil administrativo. Se nombra en vez de pasar un `false` suelto. */
const SABADO_ES_HABIL = false;

/**
 * Suma `cantidad` días hábiles administrativos a `desde`, SIN contar el día de partida.
 * El resultado es siempre un día hábil. Cota dura para no colgar el render si el calendario
 * devolviera algo absurdo: ninguna racha de días no hábiles en Argentina llega a 30 días.
 */
export function sumarHabiles(desde: Date, cantidad: number): Date {
  let d = desde;
  let contados = 0;
  let vueltas = 0;
  while (contados < cantidad && vueltas < cantidad * 30 + 60) {
    d = sumarDias(d, 1);
    if (esHabil(d, SABADO_ES_HABIL)) contados++;
    vueltas++;
  }
  return d;
}

/** Días hábiles administrativos transcurridos entre dos fechas, sin contar la de partida. */
export function habilesEntre(desde: Date, hasta: Date): number {
  if (hasta <= desde) return 0;
  let d = desde;
  let n = 0;
  while (d < hasta) {
    d = sumarDias(d, 1);
    if (d <= hasta && esHabil(d, SABADO_ES_HABIL)) n++;
  }
  return n;
}

export type ResultadoILT = {
  /** Tope de calendario: dos años desde la primera manifestación invalidante (art. 7° ap. 2 c). */
  topeCalendarioISO: string;
  /** Días que faltan para ese tope. Negativo si ya pasó. */
  diasHastaTope: number;
  /** True si el usuario declaró recaída: ahí manda el tope de días EFECTIVOS del ap. 3. */
  huboRecaida: boolean;
  /** Días efectivos de baja ya acumulados, tal como los declaró el usuario. */
  diasEfectivosAcumulados: number;
  /** Días efectivos que le quedan hasta los 730 del ap. 3. Sólo cuando hubo recaída. */
  diasEfectivosRestantes: number | null;
};

export type ResultadoCM = {
  /** Fecha en que vence el plazo del art. 3°, lectura conservadora (el día 0 no se cuenta). */
  vencimientoISO: string;
  /** La otra lectura: contando el día de la presentación. Siempre un día hábil antes. */
  vencimientoAlternativoISO: string;
  /** Primer día en que la vía judicial queda expedita por vencimiento del plazo. */
  viaExpeditaISO: string;
  /** Días hábiles administrativos ya transcurridos a la fecha consultada. */
  habilesTranscurridos: number;
  /** Días hábiles que faltan. Cero si el plazo ya venció. */
  habilesRestantes: number;
  /** True si a la fecha consultada el plazo del art. 3° ya está vencido. */
  vencido: boolean;
  /** Fecha límite para que la plata esté a disposición, si se declaró la homologación. */
  pagoHomologacionISO: string | null;
  /** La misma fecha contada en días hábiles: el Anexo dice «cinco (5) días» sin aclarar cuáles. */
  pagoHomologacionHabilesISO: string | null;
  /** El reloj de la incapacidad temporaria, si se declaró la primera manifestación invalidante. */
  ilt: ResultadoILT | null;
  /** True si el trabajador declaró estar exento de la instancia (art. 1°, párrafo 3). */
  exento: boolean;
  avisos: AvisoCM[];
};

export type EntradaCM = {
  /** Fecha de la primera presentación debidamente cumplimentada ante la comisión médica. */
  presentacionISO: string;
  /** Fecha desde la cual mirar el trámite. Normalmente hoy. */
  hoyISO: string;
  /** Primera manifestación invalidante, para el reloj de la ILT. Opcional. */
  primeraManifestacionISO?: string;
  /** Hubo reincorporación y nueva baja por la misma contingencia (art. 7° ap. 3). */
  huboRecaida?: boolean;
  /** Días efectivos de baja ya acumulados por esta contingencia. Sólo si hubo recaída. */
  diasEfectivosAcumulados?: number;
  /** Fecha de notificación del acto de homologación, para el plazo de pago. Opcional. */
  homologacionISO?: string;
  /** El empleador no tenía ART y la relación no estaba registrada (art. 1°, párrafo 3). */
  noRegistrado?: boolean;
};

export function calcularComisionMedica(e: EntradaCM): ResultadoCM | null {
  const presentacion = parseFechaISO(e.presentacionISO);
  const hoy = parseFechaISO(e.hoyISO);
  if (!presentacion || !hoy) return null;
  if (hoy < presentacion) return null;

  const vencimiento = sumarHabiles(presentacion, PLAZO_DICTAMEN_HABILES);
  const alternativo = sumarHabiles(presentacion, PLAZO_DICTAMEN_HABILES - 1);
  const viaExpedita = sumarHabiles(vencimiento, 1);

  const habilesTranscurridos = habilesEntre(presentacion, hoy);
  // El día del vencimiento TODAVÍA está dentro del plazo: la ley dice «dentro de los sesenta (60)
  // días hábiles», así que la comisión tiene ese día entero. Un `>=` acá adelantaría un día la
  // habilitación de la vía judicial, que es exactamente el error que no se puede cometer.
  const vencido = hoy > vencimiento;
  const habilesRestantes = Math.max(0, PLAZO_DICTAMEN_HABILES - habilesTranscurridos);

  const avisos: AvisoCM[] = [];

  if (e.noRegistrado) {
    avisos.push({
      tono: "ok",
      texto:
        "Declaraste que la relación no estaba registrada y el empleador no tenía ART. En ese caso el art. 1° de la Ley 27.348 no te obliga a pasar por la comisión médica: tenés la vía judicial expedita desde el día uno. Los plazos de abajo sólo te sirven si igual decidiste iniciar el trámite administrativo.",
    });
  }

  if (vencido) {
    avisos.push({
      tono: "atencion",
      texto:
        "El plazo del art. 3° ya está vencido. La ley dice que todos los plazos son perentorios y que su vencimiento «dejará expedita la vía prevista en el artículo 2°»: no hace falta esperar el dictamen para ir al fuero laboral. Ojo con la excepción: si la comisión dictó una prórroga fundada por cuestiones de hecho de la acreditación, el plazo real es más largo y esta fecha no la refleja.",
    });
  } else {
    avisos.push({
      tono: "ok",
      texto:
        "El plazo todavía corre. Mientras no venza —o no salga el dictamen— la instancia administrativa sigue siendo obligatoria y excluyente: una demanda iniciada antes queda expuesta a que le opongan la falta de agotamiento de la vía.",
    });
  }

  const anioTope = Number(aISO(viaExpedita).slice(0, 4));
  if (anioTope > ANIO_MAXIMO_COMPLETO) {
    avisos.push({
      tono: "atencion",
      texto: `El plazo cae en ${anioTope}, un año cuyo calendario de feriados todavía no está completo: los días no laborables con fines turísticos de ese año los fija una resolución que aún no se publicó. La fecha calculada es la más temprana posible; cada día turístico que se declare la corre un día hacia adelante.`,
    });
  }

  let pagoHomologacionISO: string | null = null;
  let pagoHomologacionHabilesISO: string | null = null;
  const homologacion = e.homologacionISO ? parseFechaISO(e.homologacionISO) : null;
  if (homologacion) {
    pagoHomologacionISO = aISO(sumarDias(homologacion, DIAS_PAGO_HOMOLOGACION));
    pagoHomologacionHabilesISO = aISO(sumarHabiles(homologacion, DIAS_PAGO_HOMOLOGACION));
    avisos.push({
      tono: "atencion",
      texto:
        "El Anexo I dice «dentro de los cinco (5) días de notificado el acto» y no aclara si son corridos o hábiles. Por eso se muestran las dos fechas: la de días corridos es la exigible con la lectura más estricta.",
    });
  }

  let ilt: ResultadoILT | null = null;
  const manifestacion = e.primeraManifestacionISO
    ? parseFechaISO(e.primeraManifestacionISO)
    : null;
  if (manifestacion) {
    const topeCalendario = sumarMeses(manifestacion, ANIOS_ILT * 12);
    const huboRecaida = Boolean(e.huboRecaida);
    const acumulados = Math.max(0, Math.trunc(e.diasEfectivosAcumulados ?? 0));
    ilt = {
      topeCalendarioISO: aISO(topeCalendario),
      diasHastaTope: diasEntre(hoy, topeCalendario),
      huboRecaida,
      diasEfectivosAcumulados: huboRecaida ? acumulados : diasEntre(manifestacion, hoy),
      diasEfectivosRestantes: huboRecaida
        ? Math.max(0, DIAS_ILT_EFECTIVOS - acumulados)
        : null,
    };
    if (huboRecaida) {
      avisos.push({
        tono: "ok",
        texto:
          "Declaraste una recaída por la misma contingencia. Ahí el tope de la incapacidad temporaria deja de ser una fecha del almanaque: el art. 7° ap. 3 lo mide en dos años EFECTIVOS de baja, sumando todos los períodos. Por eso no se puede dar una fecha de cese: depende de cuántos días más estés de baja.",
      });
    }
  }

  return {
    vencimientoISO: aISO(vencimiento),
    vencimientoAlternativoISO: aISO(alternativo),
    viaExpeditaISO: aISO(viaExpedita),
    habilesTranscurridos,
    habilesRestantes,
    vencido,
    pagoHomologacionISO,
    pagoHomologacionHabilesISO,
    ilt,
    exento: Boolean(e.noRegistrado),
    avisos,
  };
}
