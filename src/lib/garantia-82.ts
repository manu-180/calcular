// Motor de la garantía del 82% del SMVM (art. 125 bis Ley 24.241). Funciones puras, sin fetch.
//
// LA MECÁNICA QUE CAMBIA TODO: el artículo no fija un haber del 82% del salario mínimo. Fija un
// SUPLEMENTO "hasta alcanzar" ese nivel. O sea:
//
//     suplemento = max(0, nivelGarantizado − haber que ya cobrás)
//
// Y como el art. 125 de la misma ley ya le garantiza a todo beneficiario el HABER MÍNIMO, el punto
// de partida de cualquiera nunca es cero: es el haber mínimo. Por eso el suplemento del art. 125
// bis sólo puede ser mayor a cero cuando el nivel del 82% supera al haber mínimo — y eso hace años
// que no pasa en el universo general. No es una opinión: se calcula acá, mes por mes, con la
// escala del SMVM y la serie del haber mínimo, las dos verificadas contra el Boletín Oficial.
//
// No se copia ningún monto en este archivo: el SMVM sale de SMVM_SERIE y el haber mínimo de
// HABER_MINIMO_SERIE.

import { SMVM_SERIE, type MesSmvm } from "@/data/desempleo";
import { HABER_MINIMO_SERIE, HABER_MINIMO_ULTIMO } from "@/data/jubilaciones";
import { smvmVigente } from "@/lib/desempleo";
import {
  FACTOR_GARANTIA,
  UNIVERSOS,
  type UniversoGarantia,
} from "@/data/garantia-82";

const r2 = (n: number) => Math.round(n * 100) / 100;

export type AvisoGarantia = { tono: "info" | "atencion" | "alerta"; texto: string };

/** El mes de la escala del SMVM para un período AAAA-MM; sin período, el vigente por fecha. */
export function mesSmvmDe(periodo?: string): MesSmvm {
  if (!periodo) return smvmVigente().mes;
  return SMVM_SERIE.find((m) => m.periodo === periodo) ?? smvmVigente().mes;
}

/** El haber mínimo garantizado (art. 125) de un período, o null si ese mes no tiene resolución. */
export function haberMinimoDe(periodo: string): number | null {
  return HABER_MINIMO_SERIE.find((m) => m.periodo === periodo)?.haberMinimo ?? null;
}

export function universoPorId(id: string): UniversoGarantia {
  return UNIVERSOS.find((u) => u.id === id) ?? UNIVERSOS[0];
}

/** El nivel garantizado del art. 125 bis para un mes y un universo: 82% × N salarios mínimos. */
export function nivelGarantizado(periodo: string, universoId = "general"): number {
  const u = universoPorId(universoId);
  return r2(mesSmvmDe(periodo).mensual * u.smvm * FACTOR_GARANTIA);
}

/**
 * El piso que ESE beneficio ya tiene por su propia norma, en pesos del mes. Es contra este número
 * —y no contra el haber mínimo simple— que hay que medir el nivel del 82%: la pensión honorífica de
 * Veteranos vale tres haberes mínimos (Dec. 1357/2004), así que compararla contra uno solo da un
 * "sí, paga" que es falso. `null` cuando el beneficio no tiene múltiplo fijo verificado: ahí la
 * respuesta depende del haber real de la persona y no se inventa.
 */
export function pisoPropio(periodo: string, universoId = "general"): number | null {
  const u = universoPorId(universoId);
  if (u.haberesMinimos === null) return null;
  const hm = haberMinimoDe(periodo) ?? HABER_MINIMO_ULTIMO.haberMinimo;
  return r2(hm * u.haberesMinimos);
}

/**
 * ¿El art. 125 bis paga algo hoy en ese universo? `null` = depende del haber de la persona.
 * Es una comparación, no una afirmación: si algún mes el SMVM le gana al haber mínimo, esto pasa
 * a true solo y la página tiene que decir lo contrario de lo que dice hoy.
 */
export function pagaHoy(periodo: string, universoId = "general"): boolean | null {
  const piso = pisoPropio(periodo, universoId);
  if (piso === null) return null;
  return nivelGarantizado(periodo, universoId) > piso;
}

export type EntradaGarantia = {
  periodo?: string;
  universoId?: string;
  /** Haber mensual que la persona ya cobra. 0 o vacío = se asume el haber mínimo del mes. */
  haberActual?: number;
  /** ¿Accedió al beneficio por alguna de las moratorias que el art. 125 bis excluye? */
  porMoratoria?: boolean;
};

export type ResultadoGarantia = {
  mes: MesSmvm;
  universo: UniversoGarantia;
  /** Haber mínimo garantizado del art. 125 en ese mes, o null si el mes todavía no tiene norma. */
  haberMinimo: number | null;
  /** El haber usado en la cuenta: el que cargó la persona, o el haber mínimo si no cargó nada. */
  haberBase: number;
  /** true si el haber base salió del mínimo y no de un dato de la persona. */
  haberAsumido: boolean;
  /** 82% × N SMVM del mes. */
  nivel: number;
  /** La diferencia que el art. 125 bis manda pagar. Cero cuando el haber ya supera el nivel. */
  suplemento: number;
  /** true cuando la exclusión del segundo párrafo deja a la persona afuera. */
  excluido: boolean;
  /** Cuánto está el haber base por encima (positivo) o por debajo (negativo) del nivel, en %. */
  brechaPct: number;
  avisos: AvisoGarantia[];
};

export function calcularGarantia82(e: EntradaGarantia = {}): ResultadoGarantia {
  const mes = mesSmvmDe(e.periodo);
  const universo = universoPorId(e.universoId ?? "general");
  const haberMinimo = haberMinimoDe(mes.periodo);
  const nivel = nivelGarantizado(mes.periodo, universo.id);

  // Sin haber cargado se asume el piso que la ley ya garantiza (art. 125). Si ese mes todavía no
  // tiene resolución de ANSES, se usa el último publicado y se avisa: no se proyecta un haber.
  // La base asumida es el piso PROPIO del universo (tres haberes mínimos para la pensión honorífica
  // de Veteranos, por el Dec. 1357/2004), no el haber mínimo simple: asumir el simple en un
  // beneficio triple inventaría un suplemento que no existe.
  const minimoParaBase =
    pisoPropio(mes.periodo, universo.id) ?? haberMinimo ?? HABER_MINIMO_ULTIMO.haberMinimo;
  const cargado = Number.isFinite(e.haberActual) && (e.haberActual as number) > 0;
  const haberBase = cargado ? r2(e.haberActual as number) : minimoParaBase;

  const avisos: AvisoGarantia[] = [];

  // La exclusión del segundo párrafo del art. 125 bis. En el inciso i) la reglamentación la repite
  // con sus propias palabras (los diez años computados por moratoria), así que aplica igual.
  const excluido = e.porMoratoria === true;

  const suplemento = excluido ? 0 : Math.max(0, r2(nivel - haberBase));
  const brechaPct = nivel > 0 ? r2(((haberBase - nivel) / nivel) * 100) : 0;

  if (excluido) {
    avisos.push({
      tono: "alerta",
      texto:
        "El segundo párrafo del art. 125 bis excluye expresamente a quienes accedieron a la PBU por las moratorias de la Ley 24.476 (mod. Dec. 1.454/2005), del art. 6º de la Ley 25.994 o de la Ley 26.970. La garantía no se aplica, sin importar el haber.",
    });
  }

  if (!cargado) {
    avisos.push({
      tono: "info",
      texto:
        universo.normaPiso
          ? `No cargaste tu haber, así que la cuenta usa el piso que ese beneficio ya tiene por su propia norma (${universo.normaPiso}). Si cobrás más que ese piso, el resultado sólo puede ser el mismo o menor.`
          : "No cargaste tu haber, así que la cuenta usa el haber mínimo garantizado del art. 125. Ese régimen no tiene un múltiplo fijo del mínimo: cargá tu haber real para que la comparación signifique algo.",
    });
  }

  if (haberMinimo === null) {
    avisos.push({
      tono: "atencion",
      texto:
        "Ese mes todavía no tiene resolución de haberes de ANSES: el salario mínimo ya está fijado por el laudo, pero el haber mínimo no. La comparación usa el último haber mínimo publicado y va a quedar corta cuando salga la resolución del mes.",
    });
  }

  if (!excluido && suplemento === 0 && haberBase >= nivel) {
    avisos.push({
      tono: "atencion",
      texto:
        "El suplemento da cero: no porque no te corresponda la garantía, sino porque el haber que ya cobrás supera el nivel del 82%. El artículo paga la diferencia «hasta alcanzar» ese nivel, y acá no hay diferencia que pagar.",
    });
  }

  if (!excluido && suplemento > 0) {
    avisos.push({
      tono: "info",
      texto:
        "Quien liquida es ANSES: el art. 3º de la Res. SSS 25-E/2017 la faculta a dictar las normas de procedimiento. Este número es la diferencia que surge de aplicar la norma, no una liquidación oficial.",
    });
  }

  return {
    mes,
    universo,
    haberMinimo,
    haberBase,
    haberAsumido: !cargado,
    nivel,
    suplemento,
    excluido,
    brechaPct,
    avisos,
  };
}

export type FilaComparativa = {
  periodo: string;
  smvm: number;
  nivel: number;
  haberMinimo: number | null;
  suplemento: number | null;
  /** Cuánto está el haber mínimo por encima del nivel del 82%, en %. */
  brechaPct: number | null;
};

/**
 * La tabla que prueba el punto: mes a mes, el nivel del 82% contra el haber mínimo garantizado.
 * Sólo se calcula la brecha en los meses que tienen las dos normas dictadas.
 */
export function comparativaMensual(universoId = "general"): FilaComparativa[] {
  return SMVM_SERIE.map((m) => {
    const nivel = nivelGarantizado(m.periodo, universoId);
    const haberMinimo = haberMinimoDe(m.periodo);
    return {
      periodo: m.periodo,
      smvm: m.mensual,
      nivel,
      haberMinimo,
      suplemento: haberMinimo === null ? null : Math.max(0, r2(nivel - haberMinimo)),
      brechaPct: haberMinimo === null ? null : r2(((haberMinimo - nivel) / nivel) * 100),
    };
  });
}

/**
 * El dato más fuerte de la página, y se deriva en vez de afirmarse: el nivel del 82% del ÚLTIMO
 * mes que el laudo dejó fijado, comparado con el haber mínimo que YA está vigente hoy. Si el
 * último nivel de la escala sigue por debajo del haber mínimo actual, la garantía general no puede
 * activarse en todo ese horizonte salvo que el haber mínimo CAIGA — y devolvemos cuánto tendría
 * que caer, para no decirlo como si fuera imposible por decreto.
 */
export function horizonteSinSuplemento(universoId = "general"): {
  ultimoPeriodo: string;
  nivelUltimo: number;
  haberMinimoHoy: number;
  periodoHaberMinimoHoy: string;
  inoperante: boolean;
  caidaNecesariaPct: number;
} {
  const ultimo = SMVM_SERIE[SMVM_SERIE.length - 1];
  const nivelUltimo = nivelGarantizado(ultimo.periodo, universoId);
  const haberMinimoHoy = HABER_MINIMO_ULTIMO.haberMinimo;
  return {
    ultimoPeriodo: ultimo.periodo,
    nivelUltimo,
    haberMinimoHoy,
    periodoHaberMinimoHoy: HABER_MINIMO_ULTIMO.periodo,
    inoperante: nivelUltimo < haberMinimoHoy,
    caidaNecesariaPct: r2(((haberMinimoHoy - nivelUltimo) / haberMinimoHoy) * 100),
  };
}
