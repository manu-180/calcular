// Motor de la Prestación por Edad Avanzada. Funciones puras, sin estado ni fetch.
//
// ⚠️ ENCUADRE — esto NO otorga ni liquida un beneficio. Aplica el art. 34 bis de la Ley 24.241 a
// los datos que declara la persona y deriva los pesos del haber mínimo y la PBU vigentes. El
// otorgamiento y la liquidación final los hace ANSES sobre la certificación de servicios.
//
// LAS DOS CUENTAS QUE NO ESTÁN EN NINGÚN LADO:
//   1. **El 70% de la PBU que publica toda la SERP no es lo que se cobra.** Es cierto como cita del
//      art. 34 bis ap. 3, pero queda muy por debajo del haber mínimo que garantiza el art. 125. El
//      número que decide es el piso, no la fórmula.
//   2. **A partir de qué sueldo la fórmula le gana al piso.** Es la única pregunta que cambia una
//      decisión (seguir aportando o no) y se deriva: hay que despejar el promedio de remuneraciones
//      que hace que 70% PBU + 1,5% × años × promedio llegue al haber mínimo. Con 10 años de aportes
//      el resultado es un sueldo promedio altísimo — o sea: casi nadie. Ese «casi nadie» es la
//      respuesta que falta.

import { BONO_VIGENTE, PRESTACIONES_VIGENTES } from "@/data/prestaciones";
import { PEA } from "@/data/edad-avanzada";
import { bonoDeHaber } from "@/lib/pnc";

const r2 = (n: number) => Math.round(n * 100) / 100;
const entero = (n: number) => (Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0);

/** Cómo se prestaron los servicios, a los fines del requisito extra del art. 34 bis ap. 2 inc. c. */
export type CondicionPea = "dependencia" | "autonomo";

export type SituacionPea = {
  edad: number;
  /** Años de servicios con aportes en total, de todos los regímenes de reciprocidad. */
  aniosAportes: number;
  /** De esos años, los anteriores a la puesta en marcha del SIJP: son los únicos que dan PC. */
  aniosAnterioresAlSijp: number;
  /** Años trabajados dentro de la ventana de 8 años previa al cese. */
  aniosEnLaVentana: number;
  condicion: CondicionPea;
  /** Antigüedad en la afiliación. Solo se evalúa si es autónomo. */
  antiguedadAfiliacionAnios: number;
  /** Los años de aportes son de casas particulares (la cartilla de ANSES los excluye). */
  serviciosDomesticos: boolean;
  /** Ya cobra otra jubilación, pensión o retiro. */
  cobraOtroBeneficio: boolean;
  /** Promedio de las remuneraciones actualizadas de los últimos 10 años. 0 si no se declara. */
  promedioRemuneraciones: number;
};

export type HaberPea = {
  /** El 70% de la PBU del mes (art. 34 bis ap. 3). Es el número que publica toda la SERP. */
  componentePbu: number;
  /** Prestación compensatoria: 1,5% por año ANTERIOR al SIJP, tope 35 años (arts. 23 y 24). */
  componentePc: number;
  /** Prestación adicional por permanencia: 1,5% por año posterior al SIJP (art. 30 inc. b). */
  componentePap: number;
  /** Años que entran en la PC, ya con el tope de 35 aplicado. */
  aniosPc: number;
  /** Años que entran en la PAP. */
  aniosPap: number;
  /** Lo que da la fórmula del art. 34 bis, antes del piso y del techo. */
  haberFormula: number;
  /** Haber mínimo garantizado del mes (art. 125). */
  haberMinimo: number;
  /** Haber máximo del SIPA (art. 17, último párrafo). */
  haberMaximo: number;
  /** True cuando la fórmula queda por debajo del mínimo y manda el piso. Es el caso normal. */
  mandaElPiso: boolean;
  /** True cuando la fórmula supera el tope máximo del art. 17. */
  mandaElTecho: boolean;
  /** El haber que efectivamente se cobra: la fórmula acotada entre el piso y el techo. */
  haber: number;
  /** Bono extraordinario del mes que le corresponde a ese haber. 0 si no hay decreto. */
  bono: number;
  /** Lo que se deposita: haber + bono. */
  total: number;
};

/**
 * El haber de la PEA para un promedio de remuneraciones y un reparto de años dado.
 * Ningún importe está escrito a mano: la PBU, el mínimo y el máximo salen de `prestaciones.ts`.
 */
export function haberPea(
  promedioRemuneraciones: number,
  aniosAportes: number,
  aniosAnterioresAlSijp: number,
): HaberPea {
  const promedio = Number.isFinite(promedioRemuneraciones) ? Math.max(0, promedioRemuneraciones) : 0;
  const total = entero(aniosAportes);
  const antes = Math.min(entero(aniosAnterioresAlSijp), total);
  const aniosPc = Math.min(antes, PEA.topeAniosPc);
  const aniosPap = total - antes;

  const componentePbu = r2(PRESTACIONES_VIGENTES.pbu * PEA.proporcionPbu);
  const componentePc = r2(promedio * PEA.porcentajePorAnio * aniosPc);
  const componentePap = r2(promedio * PEA.porcentajePorAnio * aniosPap);
  const haberFormula = r2(componentePbu + componentePc + componentePap);

  const haberMinimo = PRESTACIONES_VIGENTES.haberMinimo;
  const haberMaximo = PRESTACIONES_VIGENTES.haberMaximo;
  const acotado = r2(Math.min(Math.max(haberFormula, haberMinimo), haberMaximo));
  const bono = bonoDeHaber(acotado);

  return {
    componentePbu,
    componentePc,
    componentePap,
    aniosPc,
    aniosPap,
    haberFormula,
    haberMinimo,
    haberMaximo,
    mandaElPiso: haberFormula < haberMinimo,
    mandaElTecho: haberFormula > haberMaximo,
    haber: acotado,
    bono,
    total: r2(acotado + bono),
  };
}

/**
 * El promedio de remuneraciones actualizadas a partir del cual la fórmula del art. 34 bis le gana
 * al haber mínimo garantizado. Se despeja de:
 *
 *   0,70 × PBU + 0,015 × años_computables × promedio = haber mínimo
 *
 * Devuelve null si no hay años computables (sin PC ni PAP la fórmula es fija y nunca alcanza) o si
 * el componente de la PBU ya supera el mínimo por sí solo.
 */
export function promedioParaSuperarElMinimo(
  aniosAportes: number,
  aniosAnterioresAlSijp: number,
): number | null {
  const total = entero(aniosAportes);
  const antes = Math.min(entero(aniosAnterioresAlSijp), total);
  const computables = Math.min(antes, PEA.topeAniosPc) + (total - antes);
  if (computables <= 0) return null;

  const componentePbu = PRESTACIONES_VIGENTES.pbu * PEA.proporcionPbu;
  const falta = PRESTACIONES_VIGENTES.haberMinimo - componentePbu;
  if (falta <= 0) return null;

  return r2(falta / (PEA.porcentajePorAnio * computables));
}

export type ObservacionPea = {
  tono: "ok" | "atencion" | "bloqueante";
  texto: string;
};

export type ResultadoPea = {
  haber: HaberPea;
  /** True si ningún requisito objetivo del art. 34 bis queda incumplido. */
  cumpleRequisitosObjetivos: boolean;
  /** Años que faltan para llegar a los 70. 0 si ya los tiene. */
  aniosParaLaEdad: number;
  /** El promedio que haría falta para que la fórmula supere el piso, con los años declarados. */
  promedioUmbral: number | null;
  observaciones: ObservacionPea[];
};

/**
 * Evalúa los requisitos OBJETIVOS del art. 34 bis ap. 2, la incompatibilidad del ap. 4 y el
 * requisito de servicio doméstico que agrega la cartilla de ANSES. No decide el otorgamiento: eso
 * lo resuelve ANSES sobre la certificación de servicios, y así se dice siempre en el resultado.
 */
export function evaluarPea(s: SituacionPea): ResultadoPea {
  const observaciones: ObservacionPea[] = [];
  const edad = entero(s.edad);
  const aniosAportes = entero(s.aniosAportes);
  const antes = Math.min(entero(s.aniosAnterioresAlSijp), aniosAportes);
  const enLaVentana = Math.min(entero(s.aniosEnLaVentana), aniosAportes);
  const antiguedad = entero(s.antiguedadAfiliacionAnios);
  let bloqueado = false;

  const aniosParaLaEdad = Math.max(0, PEA.edadMinima - edad);
  if (aniosParaLaEdad > 0) {
    bloqueado = true;
    observaciones.push({
      tono: "bloqueante",
      texto: `La prestación por edad avanzada se pide a partir de los ${PEA.edadMinima} años, sin distinción de género (art. 34 bis ap. 2 inc. a). Te faltan ${aniosParaLaEdad} año(s). Si ya tenés 65, mirá antes la PUAM: se pide cinco años antes y tampoco exige los 30 años de aportes.`,
    });
  }

  if (aniosAportes < PEA.aniosServiciosConAportes) {
    bloqueado = true;
    observaciones.push({
      tono: "bloqueante",
      texto: `El art. 34 bis ap. 2 inc. b pide ${PEA.aniosServiciosConAportes} años de servicios con aportes y declaraste ${aniosAportes}. Los años pueden ser de relación de dependencia, autónomo o monotributo, y de más de un régimen de reciprocidad. Con menos de eso, el camino no contributivo es la PUAM.`,
    });
  }

  if (enLaVentana < PEA.aniosDentroDeLaVentana) {
    bloqueado = true;
    observaciones.push({
      tono: "bloqueante",
      texto: `Este es el requisito que más solicitudes voltea y casi nunca se enuncia: de los ${PEA.aniosServiciosConAportes} años, al menos ${PEA.aniosDentroDeLaVentana} tienen que caer dentro de los ${PEA.ventanaAniosAnteriores} años inmediatamente anteriores al cese de la actividad (art. 34 bis ap. 2 inc. b). Declaraste ${enLaVentana}. Tener los años sueltos no alcanza: tienen que estar cerca del final.`,
    });
  }

  if (s.condicion === "autonomo" && antiguedad < PEA.antiguedadAfiliacionAutonomoAnios) {
    bloqueado = true;
    observaciones.push({
      tono: "bloqueante",
      texto: `Al autónomo el art. 34 bis ap. 2 inc. c le exige, además de los aportes, una antigüedad en la afiliación no inferior a ${PEA.antiguedadAfiliacionAutonomoAnios} años, y declaraste ${antiguedad}. Son dos cosas distintas: se puede tener aportes pagos por moratoria y poca antigüedad de afiliación.`,
    });
  }

  if (s.serviciosDomesticos) {
    bloqueado = true;
    observaciones.push({
      tono: "bloqueante",
      texto:
        "La cartilla oficial de ANSES para esta prestación exige «no acreditar tareas en calidad de servicio doméstico». Ese requisito NO está en el texto de la Ley 24.241: lo agrega ANSES en su propia cartilla, y por eso no aparece en ninguna nota que copie solo la ley. Si tus años son de casas particulares, consultá tu caso en ANSES antes de iniciar el trámite.",
    });
  }

  if (s.cobraOtroBeneficio) {
    observaciones.push({
      tono: "atencion",
      texto:
        "El ap. 4 la declara incompatible con toda jubilación, pensión o retiro civil o militar, nacional, provincial o municipal. Pero tenés derecho a optar: podés renunciar a la otra y quedarte con esta. Antes de hacerlo, comparalo en pesos. Ojo con la diferencia respecto de la PUAM: la incompatibilidad de la PEA es con OTRO beneficio, no con trabajar.",
    });
  }

  const haber = haberPea(s.promedioRemuneraciones, aniosAportes, antes);
  const promedioUmbral = promedioParaSuperarElMinimo(aniosAportes, antes);

  if (haber.aniosPc === 0 && aniosAportes > 0) {
    observaciones.push({
      tono: "atencion",
      texto:
        "Todos tus años son posteriores a la puesta en marcha del SIJP, así que no hay prestación compensatoria: esa computa únicamente servicios con aportes anteriores a la entrada en vigencia del Libro I de la Ley 24.241 (arts. 23 inc. b y 24). Lo que te queda es el 70% de la PBU más la prestación adicional por permanencia.",
    });
  }

  if (haber.mandaElPiso) {
    observaciones.push({
      tono: "ok",
      texto:
        "Acá está lo que no publica ninguna nota: la cuenta del art. 34 bis te da menos que el haber mínimo, así que lo que cobrás NO es esa cuenta: es el mínimo garantizado. El art. 125 garantiza a los beneficiarios del Régimen Previsional Público el haber mínimo del art. 17, y la prestación por edad avanzada está en el art. 17 inc. f).",
    });
  }

  if (aniosAportes >= PEA.aniosServiciosConAportes && aniosAportes < PEA.aniosQueExigeEl82) {
    observaciones.push({
      tono: "atencion",
      texto: `No te alcanza la garantía del 82% del salario mínimo: el art. 125 bis la reserva a quienes acrediten ${PEA.aniosQueExigeEl82} años o más de servicios con aportes efectivos y sean titulares de la PBU. Se confunde seguido con el mínimo garantizado del art. 125, que es otra cosa y sí te cubre.`,
    });
  }

  if (!bloqueado) {
    observaciones.push({
      tono: "ok",
      texto:
        "Cumplís los requisitos que la ley escribe con un número. Lo que no se puede simular es la certificación de servicios: ANSES computa los años sobre tu historia laboral y los períodos con deuda de autónomo pueden no contar hasta regularizarlos.",
    });
  }

  return {
    haber,
    cumpleRequisitosObjetivos: !bloqueado,
    aniosParaLaEdad,
    promedioUmbral,
    observaciones,
  };
}

/** La pensión por fallecimiento que deja el titular: 70% de lo que le hubiera correspondido (ap. 5). */
export function pensionDerivada(haber: number): number {
  return r2(haber * PEA.proporcionPensionDerivada);
}

/** Reexportado para las páginas: el bono del mes, por si no hay decreto y hay que decirlo. */
export const BONO_DEL_MES = BONO_VIGENTE;
