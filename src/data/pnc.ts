// Pensiones no contributivas (PNC) — las reglas de las que cuelgan los montos.
//
// POR QUÉ ESTE ARCHIVO EXISTE: ninguna de estas prestaciones tiene un monto propio publicado.
// Todas se DERIVAN del haber mínimo garantizado del SIPA, que ya vive en `prestaciones.ts` y se
// rota todos los meses con la resolución de ANSES:
//   · Pensión no Contributiva por Discapacidad para Protección Social → 70% del haber mínimo
//   · Pensión no contributiva a la vejez (70 años o más)              → 70% del haber mínimo
//   · Pensión vitalicia para madres de 7 hijos o más                  → 100% del haber mínimo
//   · PUAM (Pensión Universal para el Adulto Mayor)                   →  80% del haber mínimo
// Por eso acá no hay un solo importe escrito a mano: hay porcentajes con su norma. Las notas de
// medios publican el número del mes y quedan viejas a los treinta días; una regla no.
//
// LO QUE CAMBIÓ Y CASI NADIE ACTUALIZÓ (verificado 9/8/2026):
//   1. La Ley 27.793 (B.O. 22/9/2025) sustituyó el art. 9 de la Ley 13.478: la vieja «pensión por
//      invalidez» pasó a llamarse Pensión no Contributiva por Discapacidad para Protección Social,
//      exige CUD, y por primera vez el 70% quedó escrito EN UNA LEY (art. 6), no en una práctica.
//   2. Esa misma ley (art. 7) rompió la incompatibilidad histórica con el trabajo: se puede
//      trabajar registrado y seguir cobrando mientras los ingresos NETOS no lleguen a DOS salarios
//      mínimos vitales y móviles. Antes, cualquier vínculo formal la daba de baja.
//   3. El Decreto 84/2026 (B.O. 4/2/2026) reglamentó todo eso y aclaró el reparto: la PNC a la
//      vejez y la PNC por invalidez laboral siguen bajo el Decreto 432/97 (Anexo I, art. 5), y la
//      nueva pensión por discapacidad se rige por la Ley 27.793 y el Anexo II.
//   4. El Decreto 843/2024 (B.O. 23/9/2024) ya había bajado el piso de incapacidad del 76% al
//      66% para la pensión por invalidez laboral. Media web sigue publicando 76%.
//   5. (15/8/2026) La pensión de madres de 7 hijos se citaba SIEMPRE por la Ley 23.746, que tiene
//      dos artículos de requisitos y nada más. Los requisitos que deciden el trámite están en su
//      REGLAMENTO, el Decreto 2360/90: residencia (1 año argentinas / 15 años extranjeras),
//      incompatibilidad con cualquier PNC —no sólo con un régimen de previsión—, parientes
//      obligados a prestar alimentos, y sobre todo la letra chica que ninguna nota publica:
//      salir del país más de 60 días por año calendario EXTINGUE el derecho (art. 12 inc. d),
//      se paga desde el mes siguiente al acto de otorgamiento y no desde la solicitud (art. 10
//      inc. a), y al fallecer la beneficiaria la pensión pasa al viudo incapacitado y a los hijos
//      menores de 18 (art. 3). Aplicación de la regla de s79: si todas las notas publican el mismo
//      número oficial, el tema está copiado — el hueco es lo que ese número no contesta.
//
// VERIFICACIÓN CRUZADA (1/9/2026): con el haber mínimo de septiembre 2026 ($428.633,20 — Res.
// ANSES 257/2026) la derivación da $300.043,24 para el 70% y $428.633,20 para el 100%. Sumado el
// bono de $70.000 del Decreto 824/2026 quedan $370.043,24 y $498.633,20, que es exactamente lo
// que se liquida este mes. `check_pnc.ts` reproduce ese cruce para que no se rompa en silencio.
//
// CÓMO SE ROTA: no se rota. Se mueve solo cuando se actualiza `prestaciones.ts` (haber mínimo y
// bono) y `desempleo.ts` (escala del SMVM, de la que sale el tope de compatibilidad laboral).

/** Clave estable de cada prestación no contributiva que muestra la página. */
export type ClavePnc = "discapacidad" | "vejez" | "madre7hijos" | "puam";

export type PrestacionPnc = {
  clave: ClavePnc;
  /** Nombre oficial vigente. */
  nombre: string;
  /** Nombre con el que la busca la gente, cuando difiere del oficial. */
  alias?: string;
  /** Proporción del haber mínimo garantizado del SIPA. */
  proporcionHaberMinimo: number;
  /** La norma que fija ese porcentaje. */
  norma: string;
  /** Organismo que otorga el beneficio (no siempre es el que lo paga). */
  otorga: string;
  /** Quién liquida y deposita. */
  paga: string;
  /** Resumen de a quién le corresponde, en una línea. */
  paraQuien: string;
  /** Requisitos vigentes, cada uno con su norma. */
  requisitos: string[];
  /**
   * Tope de ingresos por trabajo compatible con la prestación, en cantidad de SMVM.
   * `null` = la prestación es incompatible con cualquier ingreso que permita la subsistencia
   * (criterio de la encuesta socioeconómica), sin un número publicado.
   */
  topeIngresosEnSmvm: number | null;
  /**
   * Reglas del decreto reglamentario que deciden si el beneficio se mantiene, se suspende o se
   * pierde, y que casi nunca aparecen en las notas: son las que contestan la pregunta que el
   * monto del mes no contesta.
   */
  letraChica?: { titulo: string; detalle: string }[];
};

export const PRESTACIONES_PNC: PrestacionPnc[] = [
  {
    clave: "discapacidad",
    nombre: "Pensión no Contributiva por Discapacidad para Protección Social",
    alias: "pensión por invalidez",
    proporcionHaberMinimo: 0.7,
    norma: "Ley 27.793, art. 6",
    otorga: "Agencia Nacional de Discapacidad",
    paga: "ANSES",
    paraQuien: "Personas con discapacidad que cuenten con el Certificado Único de Discapacidad.",
    requisitos: [
      "Acreditar el Certificado Único de Discapacidad (CUD) — Ley 27.793, art. 6 inc. a.",
      "Acreditar identidad, edad y nacionalidad con el DNI (inc. b).",
      "Ser argentino nativo o naturalizado (inc. c); los extranjeros, 5 años continuados de residencia legal (inc. d).",
      "No percibir ingresos netos iguales o superiores a dos salarios mínimos vitales y móviles (inc. e).",
      "No estar amparado por un régimen de previsión contributivo ni no contributivo (inc. f).",
      "Aprobar la evaluación socioeconómica; si es propietario, acreditar vivienda única familiar (inc. g).",
    ],
    topeIngresosEnSmvm: 2,
  },
  {
    clave: "vejez",
    nombre: "Pensión no contributiva a la vejez",
    proporcionHaberMinimo: 0.7,
    norma: "Ley 13.478, art. 9 — reglamentada por el Decreto 432/97",
    otorga: "Ministerio de Capital Humano",
    paga: "ANSES",
    paraQuien: "Personas de 70 años o más sin recursos ni cobertura previsional.",
    requisitos: [
      "Tener 70 años o más a la fecha de inicio del trámite — Decreto 432/97, Anexo I, punto 1 inc. a.",
      "Ser argentino nativo o naturalizado con 5 años de residencia continuada (inc. c); los extranjeros, 40 años de residencia (inc. d).",
      "Que ni el solicitante ni su cónyuge estén amparados por un régimen de previsión, retiro o prestación no contributiva (inc. f).",
      "No tener parientes obligados a prestar alimentos, o que estén impedidos de hacerlo (inc. g).",
      "No poseer bienes, ingresos ni recursos que permitan la subsistencia (inc. h).",
      "No encontrarse detenido a disposición de la Justicia (inc. i).",
    ],
    topeIngresosEnSmvm: null,
  },
  {
    clave: "madre7hijos",
    nombre: "Pensión vitalicia para madres de 7 hijos o más",
    proporcionHaberMinimo: 1,
    norma: "Ley 23.746, art. 1",
    otorga: "Ministerio de Capital Humano",
    paga: "ANSES",
    paraQuien: "Madres de siete o más hijos, cualquiera sea su edad y estado civil.",
    requisitos: [
      "Ser o haber sido madre de 7 o más hijos nacidos con vida, propios o adoptados (adopción plena o simple), cualquiera sea la edad, el estado civil o la nacionalidad de los hijos — Decreto 2360/90, art. 2 inc. a.",
      "Ser argentina o naturalizada con 1 año de residencia continuada inmediatamente anterior al pedido (inc. b); las extranjeras, 15 años de residencia continuada (inc. c).",
      "No gozar de jubilación, pensión, retiro NI prestación no contributiva alguna — inc. d (la Ley 23.746, art. 2 inc. a, sólo habla de «régimen de previsión o retiro»).",
      "No poseer bienes, ingresos ni recursos que permitan la subsistencia propia y del grupo familiar conviviente, NI parientes obligados a prestar alimentos con capacidad económica suficiente para darlos por un importe igual o mayor al de la pensión — inc. e.",
      "Acreditar identidad en legal forma (inc. f) y aprobar la encuesta económico-social del art. 6.",
      "Es vitalicia e inembargable, y se cobra aunque los hijos ya sean mayores de edad (Ley 23.746, art. 1).",
    ],
    topeIngresosEnSmvm: null,
    letraChica: [
      {
        titulo: "Salir del país más de 60 días al año extingue el derecho",
        detalle:
          "El art. 12 inc. d del Decreto 2360/90 extingue la pensión por «ausencia definitiva del país», y define ausencia definitiva como la que excede los 60 días continuos O DISCONTINUOS en cada año calendario. No son 60 días de un viaje: es la suma del año. La Subsecretaría de Seguridad Social puede autorizar excepciones por resolución fundada. (En la PUAM el equivalente son 90 días — no es el mismo número.)",
      },
      {
        titulo: "Se paga desde el mes siguiente al otorgamiento, no desde que se pidió",
        detalle:
          "El art. 10 inc. a del Decreto 2360/90 dispone que la pensión se abona a partir del primer día del mes siguiente al que se dicte el acto que la otorga. Circula que se cobra retroactivo a la fecha de solicitud: para la titular, el reglamento dice lo contrario. El retroactivo sí existe en la pensión derivada del art. 3, si se pide dentro de los 3 meses del fallecimiento.",
      },
      {
        titulo: "El pago se suspende si se deja de cobrar 5 meses seguidos",
        detalle:
          "Art. 11 del Decreto 2360/90: el pago se suspende por no presentar los informes o pruebas que pida el organismo en plazo, por comprobarse falsedad en las declaraciones juradas, y cuando la beneficiaria deja de percibir la pensión durante 5 meses continuos, hasta que acredite una causa justificada.",
      },
      {
        titulo: "Al fallecer la beneficiaria, la pensión pasa al viudo incapacitado y a los hijos",
        detalle:
          "Art. 3 del Decreto 2360/90 (reglamentando el art. 3 de la Ley 23.746): tienen derecho el viudo incapacitado para el trabajo y a cargo de la causante, en concurrencia con los hijos menores de 18 años (sin límite de edad si están incapacitados). La mitad va al viudo y la otra mitad se reparte entre los hijos; si no hay hijos, el viudo cobra todo. No le corresponde al cónyuge divorciado o separado —legalmente o de hecho— por su culpa o culpa de ambos (art. 4).",
      },
    ],
  },
  {
    clave: "puam",
    nombre: "Pensión Universal para el Adulto Mayor (PUAM)",
    proporcionHaberMinimo: 0.8,
    norma: "Ley 27.260, art. 13",
    otorga: "ANSES",
    paga: "ANSES",
    paraQuien: "Personas de 65 años o más que no llegan a los 30 años de aportes para jubilarse.",
    requisitos: [
      "Tener 65 años o más, cualquiera sea el género, y sin exigencia de años de aportes — Ley 27.260, art. 13.",
      "Ser argentino nativo, por opción o naturalizado; al naturalizado se le exigen 10 años de residencia legal anteriores a la solicitud, y al extranjero 20 años, de los cuales 10 deben ser inmediatamente anteriores (art. 13 inc. 1).",
      "No ser beneficiario de jubilación, pensión o retiro, contributivo o no contributivo (inc. 2); si se percibe una única prestación, se puede optar por la PUAM en su lugar (inc. 4).",
      "No estar percibiendo la prestación por desempleo de la Ley 24.013 (inc. 3), y mantener la residencia en el país (inc. 5).",
      "Aprobar la evaluación socioeconómica y patrimonial que ANSES realiza antes de otorgarla (art. 13, último párrafo, incorporado por el art. 37 de la Ley 27.467). La idea de que «solo pide la edad» corresponde al texto anterior a 2018.",
      "Es incompatible con trabajar en relación de dependencia o por cuenta propia, salvo los monotributistas inscriptos en el Registro Nacional de Efectores (art. 16, sustituido por el art. 38 de la Ley 27.467).",
    ],
    topeIngresosEnSmvm: null,
  },
];

/** El umbral de incapacidad de la pensión por invalidez laboral, que casi nadie actualizó. */
export const INCAPACIDAD_MINIMA_INVALIDEZ_LABORAL = 0.66;

export type FuentePnc = { nombre: string; url: string; detalle: string };

export const PNC_FUENTES: {
  consultadoEl: string;
  lista: FuentePnc[];
} = {
  consultadoEl: "2026-08-15",
  lista: [
    {
      nombre: "Ley 27.793 — Emergencia Nacional en Discapacidad",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/331706/20250922",
      detalle:
        "B.O. 22/9/2025 — art. 5 (nueva denominación y CUD), art. 6 (requisitos y el 70% del haber mínimo), art. 7 (compatibilidad con el trabajo hasta 2 SMVM) y art. 9 (conversión de oficio de las pensiones anteriores).",
    },
    {
      nombre: "Decreto 84/2026 — reglamentación de la Ley 27.793",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/338137/20260204",
      detalle:
        "B.O. 4/2/2026 — Anexo I art. 5: la PNC a la vejez y la de invalidez laboral siguen bajo el Decreto 432/97. Anexo II: liquidación a cargo de ANSES, suspensión, caducidad y rehabilitación.",
    },
    {
      nombre: "Decreto 432/1997 (texto actualizado) — pensiones a la vejez y por invalidez",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/40000-44999/43325/texact.htm",
      detalle:
        "Requisitos de la pensión a la vejez (Anexo I) y de la pensión por invalidez laboral, estos últimos sustituidos por el Decreto 843/2024 (B.O. 23/9/2024), que bajó el piso de incapacidad del 76% al 66%.",
    },
    {
      nombre: "Ley 23.746 — pensión vitalicia para madres de 7 hijos o más",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/147/norma.htm",
      detalle:
        "B.O. 24/10/1989 — art. 1: el monto es igual al de la pensión mínima; art. 2: requisitos de carencia de recursos y de cobertura previsional.",
    },
    {
      nombre: "Decreto 2360/1990 (texto actualizado) — reglamento de la Ley 23.746",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/4818/texact.htm",
      detalle:
        "B.O. 8/11/1990 — art. 2: los requisitos reales del trámite (residencia de 1 año para argentinas y 15 para extranjeras, incompatibilidad con cualquier PNC, parientes obligados a prestar alimentos). Art. 3 y 4: pensión derivada al viudo incapacitado y a los hijos. Art. 10: se paga desde el mes siguiente al acto de otorgamiento. Art. 11: causales de suspensión. Art. 12 inc. d: ausencia del país mayor a 60 días por año calendario extingue el derecho.",
    },
    {
      nombre: "Ley 13.478, art. 9 (texto actualizado)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/30000-34999/32032/texact.htm",
      detalle:
        "La norma madre de las pensiones no contributivas, con el artículo 9 sustituido por el art. 5 de la Ley 27.793.",
    },
    {
      nombre: "Resolución ANSES 257/2026 — haber mínimo garantizado",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346683/20260901",
      detalle:
        "B.O. 1/9/2026 — el haber mínimo del que se derivan todos los montos de esta página.",
    },
    {
      nombre: "Decreto 824/2026 — bono extraordinario previsional",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346555/20260831",
      detalle:
        "B.O. 31/8/2026 — art. 2 inc. c: alcanza expresamente a las pensiones no contributivas por vejez, invalidez, madres de 7 hijos o más y a la PUAM. Arts. 3 y 4: monto y forma de liquidación.",
    },
  ],
};
