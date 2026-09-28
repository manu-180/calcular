// Prestación por Edad Avanzada (PEA) — art. 34 bis de la Ley 24.241.
//
// POR QUÉ ESTE ARCHIVO EXISTE: la PEA no tiene monto propio. Toda la web publica «es el 70% de la
// PBU» y ahí se detiene. Ese número existe —está en el art. 34 bis ap. 3— pero NO es lo que se
// cobra: el art. 125 garantiza a los beneficiarios del SIPA el haber mínimo, y el 70% de la PBU
// está muy por debajo. O sea que el dato que repite la SERP es cierto como cita y falso como
// respuesta a «¿cuánto cobro?». Acá no hay ni un importe escrito a mano: hay reglas con su
// artículo, y los pesos salen de `prestaciones.ts`, que se rota todos los meses con la resolución
// de ANSES.
//
// TEXTO VIGENTE VERIFICADO EL 15/8/2026 contra el texto ACTUALIZADO de la Ley 24.241 en InfoLEG
// (id 639, `texact.htm`), leído artículo por artículo con `tools/infoleg.ts`:
//
//   1. **Art. 34 bis** (incorporado por art. 3º de la Ley 24.347, B.O. 28/6/1994) — requisitos
//      (ap. 2), haber (ap. 3), incompatibilidad (ap. 4) e invalidez después de los 65 (ap. 5).
//   2. **Art. 125** (incorporado por art. 11 de la Ley 26.222) — el Estado garantiza a los
//      beneficiarios del Régimen Previsional Público el haber mínimo del art. 17. La PEA está en
//      el art. 17 inc. f) → **el piso es el haber mínimo**.
//   3. **Art. 125 bis** — la garantía del 82% del SMVM exige 30 años de aportes y ser titular de
//      la PBU: **NO alcanza a la PEA**, que se pide con 10. Se confunde seguido.
//   4. **Art. 30 inc. b)** (sustituido por art. 2° de la Ley 26.222, B.O. 8/3/2007) — la PAP se
//      determina computando **1,5% por cada año de servicios con aportes** al Régimen Previsional
//      Público, «en igual forma y metodología que la establecida para la Prestación
//      Compensatoria». Esta era la pieza que faltaba verificar antes de publicar cualquier número.
//   5. **Arts. 23 y 24** — la PC exige servicios con aportes prestados **hasta la entrada en
//      vigencia del Libro I** (o sea, anteriores al SIJP) y paga 1,5% por año, tope 35 años, sobre
//      el promedio de las remuneraciones actualizadas de los últimos 10 años. Consecuencia que casi
//      nadie escribe: **quien junta sus 10 años después de 1994 no tiene PC**.
//   6. **Art. 129** — la fecha exacta de entrada en vigencia del Libro I la fijó el Poder
//      Ejecutivo (la ley solo puso una ventana de 9 a 18 meses desde su promulgación). Por eso acá
//      se habla de «la puesta en marcha del SIJP, a mediados de 1994» y no de un día calendario:
//      el corte concreto lo aplica ANSES en la certificación de servicios.
//
// CONTROL CRUZADO CONTRA ANSES (regla del imperio: una derivación se ancla contra un organismo que
// publique el dato por su cuenta). La cartilla oficial de la PEA reproduce los cuatro requisitos
// del art. 34 bis ap. 2 **y agrega uno que no está en la ley**: «No acreditar tareas en calidad de
// servicio doméstico». Está en la cartilla, no en el texto legal, y cambia la respuesta para una
// persona entera: la que juntó sus años en casas particulares.
//
// CÓMO SE ROTA: no se rota. Se mueve solo cuando se actualiza `prestaciones.ts`. Si aparece una
// norma que toque los arts. 30, 34 bis, 24 o 125, se relee el `texact`.

import { BONO_VIGENTE, PRESTACIONES_VIGENTES } from "./prestaciones";

/** Parámetros numéricos de la PEA, cada uno con el artículo del que sale. */
export const PEA = {
  /** Edad mínima, «cualquiera fuera su sexo» (art. 34 bis ap. 2 inc. a). */
  edadMinima: 70,
  /** Años de servicios con aportes computables (art. 34 bis ap. 2 inc. b). */
  aniosServiciosConAportes: 10,
  /** De esos años, los que deben caer dentro de la ventana previa al cese (art. 34 bis ap. 2 inc. b). */
  aniosDentroDeLaVentana: 5,
  /** Largo de esa ventana, contada hacia atrás desde el cese (art. 34 bis ap. 2 inc. b). */
  ventanaAniosAnteriores: 8,
  /** Antigüedad en la afiliación que se le exige además al autónomo (art. 34 bis ap. 2 inc. c). */
  antiguedadAfiliacionAutonomoAnios: 5,
  /** Proporción de la PBU que integra el haber (art. 34 bis ap. 3). NO es el 70% del haber total. */
  proporcionPbu: 0.7,
  /** Porcentaje por año de servicios con aportes, común a la PC (art. 24) y a la PAP (art. 30 inc. b). */
  porcentajePorAnio: 0.015,
  /** Tope de años computables de la PC (art. 24). */
  topeAniosPc: 35,
  /** Años del promedio de remuneraciones actualizadas sobre el que se calculan PC y PAP (art. 24). */
  aniosDelPromedio: 10,
  /** Proporción de lo que le hubiera correspondido, para la pensión por fallecimiento (art. 34 bis ap. 5). */
  proporcionPensionDerivada: 0.7,
  /** Años de aportes que exige la garantía del 82% del SMVM, que NO alcanza a la PEA (art. 125 bis). */
  aniosQueExigeEl82: 30,
} as const;

/** Requisitos, en el orden en que los enumera la ley. El del servicio doméstico sale de ANSES. */
export const PEA_REQUISITOS: { texto: string; norma: string }[] = [
  {
    texto:
      "Tener 70 años cumplidos, «cualquiera fuera su sexo». A diferencia de la jubilación ordinaria, acá no hay edad distinta por género ni escala de transición.",
    norma: "Ley 24.241, art. 34 bis ap. 2 inc. a",
  },
  {
    texto:
      "Acreditar 10 años de servicios con aportes computables en uno o más regímenes del sistema de reciprocidad, en relación de dependencia, como autónomo o monotributista, o combinando ambos.",
    norma: "Ley 24.241, art. 34 bis ap. 2 inc. b",
  },
  {
    texto:
      "De esos 10 años, al menos 5 tienen que haber sido trabajados durante los 8 años inmediatamente anteriores al cese de la actividad. Es el requisito que más solicitudes voltea: tener los años sueltos no alcanza, tienen que estar cerca del final.",
    norma: "Ley 24.241, art. 34 bis ap. 2 inc. b",
  },
  {
    texto:
      "El trabajador autónomo debe acreditar, además, una antigüedad en la afiliación no inferior a 5 años.",
    norma: "Ley 24.241, art. 34 bis ap. 2 inc. c",
  },
  {
    texto:
      "No acreditar tareas en calidad de servicio doméstico. Este requisito NO está en el texto de la ley: lo agrega la cartilla oficial de ANSES para la prestación por edad avanzada. Si tus años son de casas particulares, consultá en ANSES antes de iniciar el trámite.",
    norma: "ANSES — cartilla oficial de la Prestación por Edad Avanzada",
  },
  {
    texto:
      "No percibir ninguna otra jubilación, pensión o retiro civil o militar, nacional, provincial o municipal. Es incompatible, pero con derecho a optar: se puede renunciar a la otra prestación y quedarse con esta.",
    norma: "Ley 24.241, art. 34 bis ap. 4",
  },
];

/** Lo que la PEA da y lo que resigna, con su artículo y su signo. */
export const PEA_CARACTERES: { signo: "a favor" | "en contra"; texto: string; norma: string }[] = [
  {
    signo: "a favor",
    texto:
      "El Estado garantiza el haber mínimo. La PEA es una prestación del art. 17 y el art. 125 garantiza a los beneficiarios del Régimen Previsional Público el haber mínimo: por eso, aunque la cuenta del art. 34 bis dé menos, lo que se cobra no baja de la mínima.",
    norma: "Ley 24.241, art. 125 (incorporado por el art. 11 de la Ley 26.222)",
  },
  {
    signo: "a favor",
    texto:
      "Es compatible con seguir trabajando. La ley la declara incompatible con OTRA jubilación, pensión o retiro, no con la actividad. Es la diferencia grande con la PUAM, que desde 2018 sí es incompatible con trabajar en blanco.",
    norma: "Ley 24.241, art. 34 bis ap. 4",
  },
  {
    signo: "a favor",
    texto:
      "Deja pensión por fallecimiento. Los causahabientes cobran el 70% de lo que le hubiera correspondido al titular, según las pautas de los arts. 28 y 98. La PUAM, en cambio, es personalísima y no genera derecho a pensión.",
    norma: "Ley 24.241, art. 34 bis ap. 5",
  },
  {
    signo: "en contra",
    texto:
      "El componente propio es chico: 70% de la PBU, no del haber total. Con la PBU vigente eso queda muy por debajo del haber mínimo, así que en la enorme mayoría de los casos lo que decide el monto no es la fórmula sino el piso garantizado.",
    norma: "Ley 24.241, art. 34 bis ap. 3",
  },
  {
    signo: "en contra",
    texto:
      "No llega la garantía del 82% del salario mínimo: esa exige 30 años o más de servicios con aportes efectivos y ser titular de la PBU. Quien entra por la PEA lo hace con 10, así que queda afuera por definición.",
    norma: "Ley 24.241, art. 125 bis",
  },
  {
    signo: "en contra",
    texto:
      "Si los 10 años son todos posteriores a la puesta en marcha del SIJP, no hay prestación compensatoria: la PC computa únicamente servicios con aportes anteriores a la entrada en vigencia del Libro I. Lo que queda es 70% de la PBU más la prestación adicional por permanencia.",
    norma: "Ley 24.241, arts. 23 inc. b y 24",
  },
  {
    signo: "en contra",
    texto:
      "Quien se incapacita después de los 65 no accede al retiro por invalidez: accede a esta prestación. Es una puerta que se cierra por la edad, no por el estado de salud.",
    norma: "Ley 24.241, art. 34 bis ap. 5",
  },
];

export type FuentePea = { nombre: string; url: string; detalle: string };

export const PEA_FUENTES: { consultadoEl: string; lista: FuentePea[] } = {
  consultadoEl: "2026-09-01",
  lista: [
    {
      nombre: "Ley 24.241 (texto actualizado) — Sistema Integrado de Jubilaciones y Pensiones",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm",
      detalle:
        "Art. 17 inc. f) (la PEA es una prestación del SIPA), art. 34 bis (requisitos, haber, incompatibilidad e invalidez después de los 65), arts. 23 y 24 (prestación compensatoria: servicios anteriores al SIJP, 1,5% por año con tope de 35 y promedio de los últimos 10 años), art. 30 inc. b) (prestación adicional por permanencia: 1,5% por año, misma forma y metodología que la PC), art. 125 (garantía del haber mínimo) y art. 125 bis (la garantía del 82% del SMVM, que exige 30 años).",
    },
    {
      nombre: "ANSES — cartilla oficial de la Prestación por Edad Avanzada",
      url: "https://www.anses.gob.ar/sites/default/files/cartilla/2020-07/cartilla%20prestacion%20por%20edad%20avanzada.pdf",
      detalle:
        "Reproduce los requisitos del art. 34 bis ap. 2 y agrega uno que no está en la ley: «No acreditar tareas en calidad de servicio doméstico». También detalla la documentación del trámite (formularios PS.6.284, PS.6.2, SICAM para autónomos).",
    },
    {
      nombre: "ANSES — página oficial de la Prestación por Edad Avanzada",
      url: "https://www.anses.gob.ar/jubilaciones-y-pensiones/regimenes-jubilatorios/prestacion-por-edad-avanzada-0/prestacion-por-edad-avanzada",
      detalle:
        "Ficha del trámite. Tiene además dos variantes con requisitos propios: prestación por edad avanzada para trabajadores rurales y por invalidez.",
    },
    {
      nombre: `${PRESTACIONES_VIGENTES.resolucion} — haber mínimo, haber máximo y PBU`,
      url: PRESTACIONES_VIGENTES.resolucionUrl,
      detalle:
        `${PRESTACIONES_VIGENTES.resolucionBO} — de acá salen los tres números que decide la cuenta: el haber mínimo garantizado (el piso del art. 125), el haber máximo (el techo del art. 17) y la PBU sobre la que se calcula el 70%.`,
    },
    {
      nombre: `${BONO_VIGENTE.norma} — bono extraordinario previsional`,
      url: BONO_VIGENTE.normaUrl,
      detalle:
        `${BONO_VIGENTE.normaBO} — arts. 3 y 4: bono completo para quien cobra hasta el mínimo y parcial hasta mínimo + bono. Es discrecional: lo fija un decreto mes a mes y puede no salir.`,
    },
    {
      nombre: "Decreto 274/2024 — movilidad mensual por IPC",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/305905/20240322",
      detalle:
        "El haber mínimo y la PBU se actualizan todos los meses por el IPC de dos meses antes: por eso la PEA cambia de monto sin que se anuncie ningún aumento propio.",
    },
  ],
};
