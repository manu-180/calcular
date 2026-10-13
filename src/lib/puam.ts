// Motor de la Pensión Universal para el Adulto Mayor. Funciones puras, sin estado ni fetch.
//
// ⚠️ ENCUADRE — esto NO otorga ni liquida un beneficio. Aplica los artículos 13 a 18 de la Ley
// 27.260 a los datos que declara la persona y deriva el monto del haber mínimo vigente. El
// otorgamiento depende de la evaluación socioeconómica y patrimonial de ANSES (art. 13, último
// párrafo), que se resuelve caso por caso.
//
// LAS DOS CUENTAS QUE NADIE PUBLICA:
//   1. La brecha real contra la jubilación mínima NO es del 20%. El haber sí es el 80% (art. 14),
//      pero el bono extraordinario es el MISMO monto para los dos, así que comprime la brecha:
//      sobre el total depositado, la PUAM termina siendo bastante más que el 80%.
//   2. Pasar de la pensión no contributiva a la vejez (70% del haber mínimo) a la PUAM (80%) son
//      diez puntos del haber mínimo por mes, todos los meses. El art. 13 permite expresamente esa
//      opción. Nadie publica esa diferencia en pesos, que es la plata que deja de cobrarse por no
//      hacer el trámite.

import { bonoVigente, prestacionesVigentes } from "@/data/prestaciones";
import { PUAM } from "@/data/puam";
import { bonoDeHaber, totalMinimaConBono } from "@/lib/pnc";
import { prestacionPorClave } from "@/lib/pnc";

const r2 = (n: number) => Math.round(n * 100) / 100;

export type MontoPuam = {
  /** El 80% del haber mínimo garantizado (art. 14). */
  haber: number;
  /** Bono extraordinario del mes que le corresponde. 0 si no hay decreto. */
  bono: number;
  /** Lo que se deposita: haber + bono. */
  total: number;
};

/** El monto de la PUAM del mes vigente, derivado del haber mínimo. Nada escrito a mano. */
export function montoPuam(): MontoPuam {
  const haber = r2(prestacionesVigentes().haberMinimo * PUAM.proporcionHaberMinimo);
  const bono = bonoDeHaber(haber);
  return { haber, bono, total: r2(haber + bono) };
}

export type ComparacionMinima = {
  /** Haber mínimo garantizado del mes. */
  haberMinima: number;
  /** Lo que se deposita a quien cobra la mínima, bono incluido. */
  totalMinima: number;
  /** Diferencia de haber contra la mínima (positiva: es lo que se cobra de menos). */
  brechaHaber: number;
  /** Diferencia de total depositado contra la mínima. */
  brechaTotal: number;
  /** 0,8 exacto: lo que dice el art. 14. */
  proporcionHaber: number;
  /** La proporción REAL sobre lo depositado, que es mayor porque el bono es plano. */
  proporcionTotal: number;
};

export function compararConMinima(): ComparacionMinima {
  const m = montoPuam();
  const totalMinima = totalMinimaConBono();
  return {
    haberMinima: prestacionesVigentes().haberMinimo,
    totalMinima,
    brechaHaber: r2(prestacionesVigentes().haberMinimo - m.haber),
    brechaTotal: r2(totalMinima - m.total),
    proporcionHaber: m.haber / prestacionesVigentes().haberMinimo,
    proporcionTotal: m.total / totalMinima,
  };
}

export type ComparacionVejez = {
  /** Haber de la pensión no contributiva a la vejez: 70% del mínimo. */
  haberVejez: number;
  /** Total depositado de la PNC a la vejez, bono incluido. */
  totalVejez: number;
  /** Cuánto más se cobra por mes con la PUAM. */
  diferenciaMensual: number;
  /** Esa diferencia por doce meses. No proyecta el bono ni la movilidad futura. */
  diferenciaAnual: number;
};

/**
 * Lo que se gana pasándose de la pensión no contributiva a la vejez a la PUAM. La opción está en
 * el penúltimo párrafo del art. 13 y exige cumplir la TOTALIDAD de los requisitos de la PUAM,
 * que no son los mismos que los de la pensión a la vejez.
 */
export function compararConVejez(): ComparacionVejez {
  const vejez = prestacionPorClave("vejez");
  const haberVejez = r2(prestacionesVigentes().haberMinimo * vejez.proporcionHaberMinimo);
  const totalVejez = r2(haberVejez + bonoDeHaber(haberVejez));
  const puam = montoPuam();
  const diferenciaMensual = r2(puam.total - totalVejez);
  return {
    haberVejez,
    totalVejez,
    diferenciaMensual,
    diferenciaAnual: r2(diferenciaMensual * 12),
  };
}

/** Cómo declara la persona su ciudadanía, que es lo que define la residencia exigida. */
export type Ciudadania = "nativo" | "naturalizado" | "extranjero";

/** Situación laboral, a los fines de la incompatibilidad del art. 16. */
export type TrabajoPuam = "no" | "dependencia" | "autonomo" | "monotributo" | "efector";

export type SituacionPuam = {
  edad: number;
  ciudadania: Ciudadania;
  /** Años de residencia legal en el país. Solo se evalúa si no es nativo. */
  aniosResidencia: number;
  /** Ya cobra jubilación, pensión o retiro, contributivo o no contributivo. */
  cobraOtroBeneficio: boolean;
  /** Está percibiendo la prestación por desempleo de la Ley 24.013. */
  cobraDesempleo: boolean;
  trabajo: TrabajoPuam;
};

export type ObservacionPuam = {
  tono: "ok" | "atencion" | "bloqueante";
  texto: string;
};

export type ResultadoPuam = {
  monto: MontoPuam;
  /** True si ningún requisito objetivo de la norma queda incumplido. */
  cumpleRequisitosObjetivos: boolean;
  /** Años que faltan para llegar a los 65. 0 si ya los tiene. */
  aniosParaLaEdad: number;
  observaciones: ObservacionPuam[];
};

/**
 * Evalúa los requisitos OBJETIVOS del art. 13 y la incompatibilidad del art. 16. No decide el
 * otorgamiento: la evaluación socioeconómica y patrimonial de ANSES no se puede simular, y así se
 * dice siempre en el resultado.
 */
export function evaluarPuam(s: SituacionPuam): ResultadoPuam {
  const observaciones: ObservacionPuam[] = [];
  const edad = Number.isFinite(s.edad) ? Math.max(0, Math.floor(s.edad)) : 0;
  const residencia = Number.isFinite(s.aniosResidencia) ? Math.max(0, Math.floor(s.aniosResidencia)) : 0;
  let bloqueado = false;

  const aniosParaLaEdad = Math.max(0, PUAM.edadMinima - edad);
  if (aniosParaLaEdad > 0) {
    bloqueado = true;
    observaciones.push({
      tono: "bloqueante",
      texto: `La PUAM se pide a partir de los ${PUAM.edadMinima} años (art. 13). Te faltan ${aniosParaLaEdad} año(s). No hace falta ningún año de aportes: es la edad lo único que se espera.`,
    });
  }

  if (s.ciudadania === "naturalizado" && residencia < PUAM.residenciaNaturalizadoAnios) {
    bloqueado = true;
    observaciones.push({
      tono: "bloqueante",
      texto: `Al argentino naturalizado el art. 13 inc. 1 le exige ${PUAM.residenciaNaturalizadoAnios} años de residencia legal anteriores a la solicitud, y declaraste ${residencia}.`,
    });
  }

  if (s.ciudadania === "extranjero" && residencia < PUAM.residenciaExtranjeroAnios) {
    bloqueado = true;
    observaciones.push({
      tono: "bloqueante",
      texto: `Al extranjero el art. 13 inc. 1 le exige ${PUAM.residenciaExtranjeroAnios} años de residencia legal acreditada, y declaraste ${residencia}. Además, ${PUAM.residenciaExtranjeroInmediatosAnios} de esos años tienen que ser inmediatamente anteriores a la solicitud.`,
    });
  } else if (s.ciudadania === "extranjero") {
    observaciones.push({
      tono: "atencion",
      texto: `Llegás a los ${PUAM.residenciaExtranjeroAnios} años de residencia, pero el art. 13 inc. 1 pide algo más que el total: ${PUAM.residenciaExtranjeroInmediatosAnios} de esos años tienen que ser inmediatamente anteriores a la fecha de solicitud. Si hubo una salida larga del país en la última década, conviene revisar cómo quedó acreditada.`,
    });
  }

  if (s.cobraOtroBeneficio) {
    observaciones.push({
      tono: "atencion",
      texto:
        "El art. 13 inc. 2 pide no ser beneficiario de jubilación, pensión o retiro, contributivo o no contributivo. Pero si es una ÚNICA prestación, el inc. 4 te deja optar por la PUAM en su lugar: no es un portazo, es una opción. Antes de hacerla, comparala en pesos: si lo que cobrás hoy supera el 80% del haber mínimo, el cambio te hace perder plata.",
    });
  }

  if (s.cobraDesempleo) {
    bloqueado = true;
    observaciones.push({
      tono: "bloqueante",
      texto:
        "Mientras se cobra la prestación por desempleo de la Ley 24.013 no se puede acceder a la PUAM (art. 13 inc. 3). Es un impedimento temporal: al terminar la prestación, el requisito se cumple.",
    });
  }

  if (s.trabajo === "dependencia" || s.trabajo === "autonomo" || s.trabajo === "monotributo") {
    bloqueado = true;
    observaciones.push({
      tono: "bloqueante",
      texto:
        "Acá está el dato que casi toda la web publica al revés: desde 2018 la PUAM es INCOMPATIBLE con trabajar, tanto en relación de dependencia como por cuenta propia. El art. 16 original decía justo lo contrario, y el art. 38 de la Ley 27.467 (B.O. 4/12/2018) lo sustituyó. La única excepción son los monotributistas inscriptos en el Registro Nacional de Efectores de Desarrollo Local y Economía Social.",
    });
  } else if (s.trabajo === "efector") {
    observaciones.push({
      tono: "ok",
      texto:
        "Sos la excepción que dejó escrita el art. 16: el monotributista inscripto en el Registro Nacional de Efectores de Desarrollo Local y Economía Social puede seguir facturando y cobrar la PUAM. Cualquier otro monotributo, o un trabajo en relación de dependencia, sí es incompatible.",
    });
  }

  if (!bloqueado) {
    observaciones.push({
      tono: "ok",
      texto:
        "Cumplís los requisitos objetivos que la ley escribe con un número (edad, residencia, no tener otro beneficio, no trabajar). Lo que no se puede simular es el último párrafo del art. 13: ANSES hace una evaluación socioeconómica y patrimonial antes de otorgar, con criterios que fija la reglamentación.",
    });
  }

  return {
    monto: montoPuam(),
    cumpleRequisitosObjetivos: !bloqueado,
    aniosParaLaEdad,
    observaciones,
  };
}

/** El tope embargable por cuotas alimentarias: 20% del haber mensual (art. 15 inc. d). */
export function topeEmbargoAlimentos(): number {
  return r2(montoPuam().haber * PUAM.embargoMaximoPorAlimentos);
}

/** Reexportado para las páginas: el bono del mes, por si no hay decreto y hay que decirlo. */
export function bonoDelMes() {
  return bonoVigente();
}
