import { CORTE_ANIOS } from "@/data/reingreso";
import { antiguedadEntre, nucleoArt245, type Antiguedad } from "@/lib/indemnizacion";
import { ULTIMO_PERIODO, actualizarMonto, nombrePeriodo, type Periodo } from "@/lib/inflacion";

// Reingreso al mismo empleador: qué antigüedad se computa y cuánto se deduce de la indemnización
// nueva. Dos artículos de la LCT, los dos sustituidos por la Ley 27.802 el 6/3/2026:
//
//   · Art. 18 (por el art. 9º de la reforma) — decide PRIMERO: si entre el cese anterior y el
//     reingreso pasaron dos años, el tiempo de servicio viejo no se computa y el caso se resuelve
//     como un despido común del último período. Si no llegaron a pasar, la antigüedad es la suma.
//   · Art. 255 (por el art. 53) — sólo si el período viejo SÍ se computa: de la indemnización se
//     deduce lo cobrado en su momento, actualizado por IPC, con el piso de lo que hubiera
//     correspondido computando solamente el último período.
//
// El núcleo del art. 245 no se reimplementa acá: se usa `nucleoArt245`, el mismo que usan
// /indemnizacion y /indemnizacion-por-fallecimiento. Dos páginas no pueden publicar dos importes
// distintos para el mismo caso.
//
// LECTURA EXPLÍCITA, porque cambia el número y la norma no la resuelve: cuando el período viejo no
// se computa (pasaron más de dos años), esta calculadora NO deduce lo cobrado antes. La deducción
// del art. 255 existe para evitar que se pague dos veces el mismo tramo de antigüedad; si ese tramo
// quedó afuera del cálculo por el art. 18, no hay nada que evitar. La página lo dice con todas las
// letras en vez de esconderlo en el resultado.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoReingreso = {
  /** Antigüedad de la primera etapa (ingreso original → cese anterior). */
  etapaAnterior: Antiguedad;
  /** Antigüedad de la etapa actual (reingreso → despido). */
  etapaActual: Antiguedad;
  /** Meses completos entre el cese anterior y el reingreso. */
  mesesDeCorte: number;
  /** true si pasaron dos años o más: el art. 18 deja afuera la antigüedad vieja. */
  cortaLaAntiguedad: boolean;
  /** Antigüedad que finalmente se computa. */
  antiguedadComputada: Antiguedad;
  /** Años del art. 245 sobre la antigüedad computada. */
  aniosComputables: number;
  /** Indemnización del art. 245 antes de deducir nada. */
  indemnizacionBruta: number;
  /** Piso del art. 255: la que correspondería computando sólo el último período. */
  pisoUltimoPeriodo: number;
  /** Lo cobrado en el cese anterior, tal como se cobró. */
  deduccionNominal: number;
  /** Eso mismo, actualizado por IPC hasta el último índice publicado. */
  deduccionActualizada: number;
  /** Cuánto más se deduce por efecto de la actualización. */
  efectoActualizacion: number;
  /** Inflación acumulada aplicada, en %. */
  inflacionAplicada: number;
  /** Período hasta el que se pudo actualizar (último IPC publicado). */
  actualizadoHasta: Periodo;
  /** Resultado antes de aplicar el piso. */
  resultadoSinPiso: number;
  /** Lo que finalmente se cobra. */
  indemnizacionFinal: number;
  /** true si el piso del art. 255 fue el que definió el resultado. */
  pisoAplicado: boolean;
  avisos: Aviso[];
};

/** Suma dos tramos de antigüedad como si fueran uno solo, en meses y días. */
function sumarAntiguedad(a: Antiguedad, b: Antiguedad): Antiguedad {
  const totalMeses = a.totalMeses + b.totalMeses;
  const dias = a.dias + b.dias;
  return {
    anios: Math.floor(totalMeses / 12),
    meses: totalMeses % 12,
    dias,
    totalMeses,
  };
}

/** Meses calendario completos entre dos fechas ISO. */
function mesesEntreFechas(desdeISO: string, hastaISO: string): number {
  return antiguedadEntre(desdeISO, hastaISO).totalMeses;
}

export function calcularReingreso(params: {
  /** Mejor remuneración mensual, normal y habitual (base del art. 245). */
  mejorRemuneracion: number;
  /** Ingreso original, ISO YYYY-MM-DD. */
  ingresoAnterior: string;
  /** Cese de esa primera etapa, ISO. */
  ceseAnterior: string;
  /** Reingreso al mismo empleador, ISO. */
  reingreso: string;
  /** Despido actual, ISO. */
  despido: string;
  /** Lo que se cobró de indemnización en el cese anterior. */
  cobradoAntes: number;
  /** Tope del convenio, si se conoce. */
  topeCCT?: number;
}): ResultadoReingreso | null {
  const {
    mejorRemuneracion,
    ingresoAnterior,
    ceseAnterior,
    reingreso,
    despido,
    cobradoAntes,
    topeCCT,
  } = params;

  if (!(mejorRemuneracion > 0)) return null;
  if (mesesEntreFechas(ingresoAnterior, ceseAnterior) < 0) return null;
  if (mesesEntreFechas(reingreso, despido) < 0) return null;

  const etapaAnterior = antiguedadEntre(ingresoAnterior, ceseAnterior);
  const etapaActual = antiguedadEntre(reingreso, despido);
  const mesesDeCorte = mesesEntreFechas(ceseAnterior, reingreso);
  const cortaLaAntiguedad = mesesDeCorte >= CORTE_ANIOS * 12;

  const antiguedadComputada = cortaLaAntiguedad
    ? etapaActual
    : sumarAntiguedad(etapaAnterior, etapaActual);

  const nucleo = nucleoArt245({
    ant: antiguedadComputada,
    mejorRemuneracion,
    enPeriodoPrueba: false,
    topeCCT,
  });
  const soloUltimo = nucleoArt245({
    ant: etapaActual,
    mejorRemuneracion,
    enPeriodoPrueba: false,
    topeCCT,
  });

  const indemnizacionBruta = nucleo.monto;
  const pisoUltimoPeriodo = soloUltimo.monto;

  const deduccionNominal = cortaLaAntiguedad ? 0 : Math.max(0, cobradoAntes || 0);
  const periodoCese: Periodo = ceseAnterior.slice(0, 7);
  const actualizado =
    deduccionNominal > 0 ? actualizarMonto(deduccionNominal, periodoCese, ULTIMO_PERIODO) : null;
  const deduccionActualizada = actualizado ? actualizado.montoActualizado : deduccionNominal;
  const inflacionAplicada = actualizado ? actualizado.variacionPct : 0;

  const resultadoSinPiso = indemnizacionBruta - deduccionActualizada;
  const indemnizacionFinal = Math.max(resultadoSinPiso, pisoUltimoPeriodo);
  const pisoAplicado = indemnizacionFinal > resultadoSinPiso;

  const avisos: Aviso[] = [];

  if (cortaLaAntiguedad) {
    avisos.push({
      tono: "bloqueante",
      texto: `Entre el cese anterior y el reingreso pasaron ${mesesDeCorte} meses, o sea dos años o más. Desde el 6 de marzo de 2026, el artículo 18 de la LCT (sustituido por el artículo 9º de la Ley 27.802) dice que en ese caso «la antigüedad del tiempo de servicio anterior no será computada». Se liquida como un despido común de la última etapa: los ${etapaAnterior.anios} años anteriores quedan afuera del cálculo. Con el texto anterior del artículo 18 se computaban siempre, sin importar cuánto tiempo hubiera pasado.`,
    });
    avisos.push({
      tono: "atencion",
      texto:
        "Por eso tampoco se deduce lo que cobraste en el cese anterior: la deducción del artículo 255 existe para no pagar dos veces el mismo tramo de antigüedad, y ese tramo ya quedó fuera del cálculo. La norma no lo dice con todas las letras: es la lectura que sostiene esta calculadora, y conviene que la revise un profesional en tu caso concreto.",
    });
  } else {
    avisos.push({
      tono: "ok",
      texto: `Entre el cese anterior y el reingreso pasaron ${mesesDeCorte} meses: menos de los dos años del artículo 18, así que el tiempo viejo SÍ se computa. La antigüedad total es de ${antiguedadComputada.anios} años y ${antiguedadComputada.meses} meses, sumando las dos etapas.`,
    });
    if (deduccionNominal > 0) {
      avisos.push({
        tono: "atencion",
        texto: `La deducción del artículo 255 no es lo que cobraste: es lo que cobraste ACTUALIZADO por IPC. Entre ${nombrePeriodo(
          periodoCese,
        )} y ${nombrePeriodo(
          ULTIMO_PERIODO,
        )} el índice acumuló ${inflacionAplicada.toLocaleString("es-AR", {
          maximumFractionDigits: 1,
        })}%, así que se descuentan ${deduccionActualizada.toLocaleString("es-AR", {
          maximumFractionDigits: 0,
        })} pesos en vez de ${deduccionNominal.toLocaleString("es-AR", {
          maximumFractionDigits: 0,
        })}. Los resúmenes que dicen «se deduce lo pagado oportunamente», a secas, están citando el texto viejo.`,
      });
    }
  }

  if (pisoAplicado) {
    avisos.push({
      tono: "ok",
      texto:
        "Acá jugó el piso del artículo 255: la deducción actualizada dejaba un resultado más bajo que lo que te correspondería computando solamente el último período, y el artículo dice que «en ningún caso» puede ser inferior a eso. Ese piso es lo que impide que la actualización se coma el despido nuevo entero.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "El artículo 255 vigente actualiza por IPC y nada más: la versión anterior (art. 83 del DNU 70/2023) sumaba además «una tasa de interés pura del 3% anual», y la Ley 27.802 la eliminó. Ojo con el detalle, porque la misma ley dejó ese 3% en el artículo 276 para la actualización de los créditos laborales: hoy la LCT tiene dos fórmulas distintas, y la de este artículo es la más chica.",
  });

  avisos.push({
    tono: "atencion",
    texto: `La actualización llega hasta ${nombrePeriodo(
      ULTIMO_PERIODO,
    )}, que es el último IPC publicado por el INDEC. El índice del mes en curso todavía no existe: se publica con unos 40 días de atraso.`,
  });

  avisos.push({
    tono: "atencion",
    texto:
      "Los dos artículos rigen desde el 6 de marzo de 2026 y no son retroactivos. Si tu reingreso ocurrió antes de esa fecha, el corte de los dos años del artículo 18 no existía todavía, y es una discusión abierta si se le aplica a una relación que ya estaba en curso. Esta calculadora aplica el texto vigente.",
  });

  avisos.push({
    tono: "atencion",
    texto:
      "Esto calcula la indemnización por antigüedad del artículo 245 y su deducción, no la liquidación completa: preaviso, integración del mes, vacaciones proporcionales y aguinaldo van aparte y no se deducen.",
  });

  return {
    etapaAnterior,
    etapaActual,
    mesesDeCorte,
    cortaLaAntiguedad,
    antiguedadComputada,
    aniosComputables: nucleo.aniosComputables,
    indemnizacionBruta,
    pisoUltimoPeriodo,
    deduccionNominal,
    deduccionActualizada,
    efectoActualizacion: deduccionActualizada - deduccionNominal,
    inflacionAplicada,
    actualizadoHasta: ULTIMO_PERIODO,
    resultadoSinPiso,
    indemnizacionFinal,
    pisoAplicado,
    avisos,
  };
}
