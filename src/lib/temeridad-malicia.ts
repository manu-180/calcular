import { MULTIPLICADOR_MAXIMO, TOPE_COSTAS } from "@/data/temeridad-malicia";
import { actualizarCreditoLaboral, type ResultadoCredito } from "@/lib/actualizacion-creditos";
import type { Periodo } from "@/lib/inflacion";

// ────────────────────────────────────────────────────────────────────────────────────────────
// Qué se puede calcular acá con honestidad, y qué no.
//
// SE PUEDE: lo que rige HOY. El art. 276 de la LCT (texto del art. 54 de la Ley 27.802) actualiza
// el crédito por IPC Nivel General del INDEC más el 3% anual. El índice es dato oficial publicado
// y el motor ya existe (`actualizarCreditoLaboral`): acá se reusa, no se reimplementa, porque dos
// páginas del sitio no pueden publicar dos números distintos para el mismo crédito.
//
// NO SE PUEDE, y por eso se pide como dato: la tasa del art. 275 derogado. El artículo hablaba de
// «el que cobren los bancos oficiales, para operaciones corrientes de descuento de documentos
// comerciales» — no una serie con nombre, no un número derivable de la ley — y el multiplicador
// era «de HASTA dos veces y media», «graduado por los jueces, atendiendo a la conducta procesal
// asumida». Inventar un importe único sería fabricar evidencia. Lo que se publica es la REGLA: se
// carga la tasa de referencia y se muestra el abanico de 1× a 2,5×, con el máximo marcado, que es
// además el que el tercer párrafo (Ley 26.696) imponía de oficio cuando se incumplía un acuerdo
// homologado.
//
// EL TERCER NÚMERO, que es el riesgo NUEVO: el art. 20 sustituido manda que, si hay pluspetición
// inexcusable, las costas se soporten «solidariamente entre la parte y el profesional actuante».
// El art. 277 pone el techo: las costas de primera o única instancia «no excederán del veinticinco
// por ciento (25%) del monto de la sentencia». Ese 25% es el peor caso, y se muestra como tal.
// ────────────────────────────────────────────────────────────────────────────────────────────

export type TramoSancion = {
  /** El multiplicador del art. 275 («de hasta dos veces y media»). */
  multiplicador: number;
  /** Interés sancionatorio que ese multiplicador habría devengado en el período. */
  importe: number;
  /** Si es el tope del artículo (2,5×), que es el que se imponía de oficio por acuerdo incumplido. */
  esMaximo: boolean;
};

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoTemeridad = {
  /** Lo que rige hoy, con dato oficial: art. 276 (IPC + 3% anual). */
  hoy: ResultadoCredito;
  /** Años transcurridos entre la mora y el pago (los mismos que usa el art. 276). */
  anios: number;
  /** Tasa de referencia cargada por quien usa la página, en tanto por uno anual. */
  tasaAnual: number;
  /** El abanico del art. 275 derogado: 1×, 1,5×, 2× y 2,5×. */
  tramos: TramoSancion[];
  /** El tramo que corresponde al multiplicador elegido. */
  elegido: TramoSancion;
  /** Total que se habría reclamado con la sanción del art. 275, al multiplicador elegido. */
  totalConSancion: number;
  /** Cuánto se perdió con la derogación, al multiplicador elegido. */
  diferencia: number;
  /** Peor caso del riesgo nuevo del art. 20: el 25% del art. 277 sobre el monto de la sentencia. */
  costasMaximas: number;
  avisos: Aviso[];
};

const MULTIPLICADORES = [1, 1.5, 2, MULTIPLICADOR_MAXIMO];

const redondear = (n: number) => Math.round(n * 100) / 100;

export function calcularTemeridad(p: {
  /** Monto del crédito, en pesos del momento en que se hizo debido. */
  monto: number;
  /** Mes en que la suma se hizo debida. */
  desde: Periodo;
  /** Mes del efectivo pago. */
  hasta: Periodo;
  /** Tasa bancaria anual de referencia, en porcentaje (la carga el usuario: la ley no la publica). */
  tasaAnualPct: number;
  /** Multiplicador del art. 275 a mostrar como elegido (1 a 2,5). */
  multiplicador: number;
  /** ¿El reclamo viene de un acuerdo homologado que no se cumplió? (tercer párrafo del art. 275) */
  acuerdoHomologadoIncumplido: boolean;
}): ResultadoTemeridad | null {
  const hoy = actualizarCreditoLaboral({ monto: p.monto, desde: p.desde, hasta: p.hasta });
  if (!hoy) return null;

  const anios = hoy.meses / 12;
  const tasaAnual = Math.max(0, p.tasaAnualPct || 0) / 100;

  // La sanción del art. 275 era un INTERÉS: tasa × multiplicador × tiempo, sobre el capital. Se
  // aplica sobre el capital ya actualizado por la misma razón por la que el art. 276 aplica ahí su
  // 3%: sobre el nominal histórico, en una economía con esta inflación, el interés no sería nada.
  const base = hoy.capitalActualizado;

  const tramos: TramoSancion[] = MULTIPLICADORES.map((m) => ({
    multiplicador: m,
    importe: redondear(base * tasaAnual * m * anios),
    esMaximo: m === MULTIPLICADOR_MAXIMO,
  }));

  const mElegido = Math.min(
    MULTIPLICADOR_MAXIMO,
    Math.max(0, p.acuerdoHomologadoIncumplido ? MULTIPLICADOR_MAXIMO : p.multiplicador || 0),
  );
  const elegido: TramoSancion = {
    multiplicador: mElegido,
    importe: redondear(base * tasaAnual * mElegido * anios),
    esMaximo: mElegido === MULTIPLICADOR_MAXIMO,
  };

  const totalConSancion = redondear(hoy.total + elegido.importe);
  const diferencia = redondear(elegido.importe);
  const costasMaximas = redondear(hoy.total * TOPE_COSTAS);

  const avisos: Aviso[] = [];

  if (p.acuerdoHomologadoIncumplido) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Con un acuerdo homologado incumplido, el tercer párrafo del art. 275 (incorporado por la Ley 26.696 en 2011) calificaba la conducta como «temeraria y maliciosa» de oficio y mandaba aplicar el MÁXIMO del interés desde la fecha de la mora. No era una facultad del juez: era automático. Ese párrafo cayó el 6 de marzo de 2026 junto con el artículo entero.",
    });
  } else {
    avisos.push({
      tono: "atencion",
      texto:
        "El art. 275 no fijaba un importe: el interés era «de hasta» dos veces y media el de los bancos oficiales y lo graduaba el juez «atendiendo a la conducta procesal asumida». Por eso acá se muestra el abanico completo y no un número único.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "La derogación no es retroactiva: la nota dice «a partir de su publicación en el Boletín Oficial». Para la conducta desplegada antes del 6 de marzo de 2026 el art. 275 seguía vigente, y eso es lo que se discute hoy en los juicios en trámite.",
  });

  avisos.push({
    tono: "bloqueante",
    texto:
      "El riesgo que apareció en el otro sentido: el art. 20 sustituido dice que si del proceso resulta pluspetición inexcusable («configurándose ésta de manera objetiva en caso de sobreestimación de los créditos reclamados»), las costas se soportan solidariamente entre el trabajador y su abogado. Está escrito dentro del artículo de la gratuidad, que es justo el que garantizaba que litigar no costara.",
  });

  if (tasaAnual === 0) {
    avisos.push({
      tono: "atencion",
      texto:
        "Sin tasa de referencia cargada, la sanción da cero. La ley nunca publicó esa tasa: hablaba de la que cobran los bancos oficiales para descuento de documentos comerciales, que fija el expediente, no esta página.",
    });
  }

  return {
    hoy,
    anios: Math.round(anios * 100) / 100,
    tasaAnual,
    tramos,
    elegido,
    totalConSancion,
    diferencia,
    costasMaximas,
    avisos,
  };
}
