// Pensión Universal para el Adulto Mayor (PUAM) — Título II, Capítulo Único de la Ley 27.260.
//
// POR QUÉ ESTE ARCHIVO EXISTE: la PUAM no tiene monto propio. Es el 80% del haber mínimo
// garantizado del SIPA (art. 14), que ya vive en `prestaciones.ts` y se rota todos los meses con
// la resolución de ANSES. Acá no hay ni un importe escrito a mano: hay reglas con su artículo.
// Por eso una nota que dice «la PUAM es $X» vale treinta días y esta página no.
//
// TEXTO VIGENTE VERIFICADO EL 12/8/2026 contra el texto actualizado de la Ley 27.260 en InfoLEG
// (id 263691, `texact.htm`), artículos 13 a 18 leídos uno por uno. Y ahí aparece lo que casi toda
// la web publica al revés, porque cita el texto ORIGINAL de 2016:
//
//   1. **La PUAM es INCOMPATIBLE con trabajar.** El art. 16 original decía que el goce «es
//      compatible con el desempeño de cualquier actividad en relación de dependencia o por cuenta
//      propia». El art. 38 de la Ley 27.467 (B.O. 4/12/2018) lo SUSTITUYÓ y dice exactamente lo
//      contrario: es **incompatible**, con una sola excepción — los monotributistas inscriptos en
//      el Registro Nacional de Efectores de Desarrollo Local y Economía Social. Es la diferencia
//      más grande con la pensión por discapacidad, que desde la Ley 27.793 sí es compatible con el
//      trabajo hasta dos salarios mínimos.
//   2. **Sí hay evaluación socioeconómica y patrimonial.** El último párrafo del art. 13 —también
//      incorporado por la Ley 27.467 (art. 37)— manda que ANSES la haga ANTES de otorgar, «a fin
//      de asegurar el acceso a las personas que presenten mayor vulnerabilidad». La idea de que la
//      PUAM «solo pide la edad» quedó vieja en 2018.
//   3. **No genera derecho a pensión** (art. 15 inc. a): es personalísima. Cuando el titular
//      fallece, el cónyuge o conviviente NO hereda el beneficio, a diferencia de lo que pasa con
//      una jubilación. Es la letra chica más cara de todas y casi nunca se enuncia.
//
// Lo que sí está a favor y tampoco se publica: PAMI garantizado por ley (art. 17), asignaciones
// familiares del subsistema no contributivo (art. 18, que sustituyó el art. 1 inc. b de la Ley
// 24.714), carácter vitalicio (art. 15 inc. b) e inembargabilidad salvo cuotas por alimentos y
// hasta el 20% del haber (art. 15 inc. d).
//
// CÓMO SE ROTA: no se rota. Se mueve solo cuando se actualiza `prestaciones.ts` (haber mínimo del
// mes y decreto del bono). Si aparece una norma que toque los arts. 13 a 18, se relee el `texact`.

/** Parámetros numéricos de la PUAM, cada uno con el artículo del que sale. */
export const PUAM = {
  /** Edad mínima para pedirla, sin distinción de género (art. 13). */
  edadMinima: 65,
  /** Proporción del haber mínimo garantizado del SIPA (art. 14). */
  proporcionHaberMinimo: 0.8,
  /** Residencia legal mínima que se le exige al argentino naturalizado (art. 13 inc. 1). */
  residenciaNaturalizadoAnios: 10,
  /** Residencia legal mínima acreditada que se le exige al extranjero (art. 13 inc. 1). */
  residenciaExtranjeroAnios: 20,
  /** De esos 20 años, los que deben ser inmediatamente anteriores a la solicitud (art. 13 inc. 1). */
  residenciaExtranjeroInmediatosAnios: 10,
  /** Tope de embargo por cuotas alimentarias sobre el haber mensual (art. 15 inc. d). */
  embargoMaximoPorAlimentos: 0.2,
  /**
   * Días corridos de ausencia del país a partir de los cuales se deja de cumplir el requisito
   * de residencia. NO está en la Ley 27.260: sale de la Res. ANSES 918/24 y lo publica la
   * cartilla oficial del organismo. Es el número que convierte «mantener la residencia» —una
   * frase— en una regla que se puede perder por un viaje. (Regla de s81: la cartilla del
   * organismo tiene requisitos propios; aplicada acá el 15/8/2026.)
   */
  diasAusenciaQuePierdenLaResidencia: 90,
} as const;

/** Requisitos del art. 13, en el orden en que los enumera la ley. */
export const PUAM_REQUISITOS: { texto: string; norma: string }[] = [
  {
    texto:
      "Tener 65 años o más, cualquiera sea el género. No hace falta ningún año de aportes: la PUAM es no contributiva y vitalicia.",
    norma: "Ley 27.260, art. 13",
  },
  {
    texto:
      "Ser argentino nativo, por opción o naturalizado. Al naturalizado se le exigen 10 años de residencia legal anteriores a la solicitud; al extranjero, 20 años de residencia legal acreditada, de los cuales 10 deben ser inmediatamente anteriores.",
    norma: "Ley 27.260, art. 13 inc. 1",
  },
  {
    texto:
      "No ser beneficiario de jubilación, pensión o retiro, de carácter contributivo o no contributivo.",
    norma: "Ley 27.260, art. 13 inc. 2",
  },
  {
    texto: "No estar percibiendo la prestación por desempleo de la Ley 24.013.",
    norma: "Ley 27.260, art. 13 inc. 3",
  },
  {
    texto:
      "Si ya se percibe una única prestación, se puede optar por la PUAM en su lugar. Los titulares de la pensión no contributiva a la vejez pueden hacer esa opción si cumplen la totalidad de los requisitos.",
    norma: "Ley 27.260, art. 13 inc. 4 y penúltimo párrafo",
  },
  {
    texto: "Mantener la residencia en el país mientras se cobra el beneficio.",
    norma: "Ley 27.260, art. 13 inc. 5",
  },
  {
    texto:
      "Y ese requisito tiene un plazo concreto que la ley no enuncia: se considera que NO se cumple cuando la persona se ausenta del territorio argentino por más de 90 días corridos. Está en la cartilla oficial de ANSES, no en la Ley 27.260, y es la clase de letra chica que voltea un beneficio por un viaje largo a ver a los hijos.",
    norma: "Res. ANSES 918/24, citada por la cartilla PUAM de ANSES (act. octubre 2025)",
  },
  {
    texto:
      "Aprobar la evaluación socioeconómica y patrimonial que ANSES realiza en forma previa al otorgamiento, con criterios objetivos, para asegurar el acceso de quienes presenten mayor vulnerabilidad.",
    norma: "Ley 27.260, art. 13, último párrafo (incorporado por el art. 37 de la Ley 27.467)",
  },
];

/** Los caracteres del art. 15 y los derechos de los arts. 17 y 18, con su signo. */
export const PUAM_CARACTERES: { signo: "a favor" | "en contra"; texto: string; norma: string }[] = [
  {
    signo: "en contra",
    texto:
      "Es personalísima y NO genera derecho a pensión: al fallecer el titular, el cónyuge o conviviente no hereda el beneficio. Es la diferencia más cara respecto de una jubilación, que sí deja pensión derivada.",
    norma: "Ley 27.260, art. 15 inc. a",
  },
  {
    signo: "a favor",
    texto:
      "Aunque no deje pensión, el fallecimiento del titular sí da derecho al Subsidio de Contención Familiar (el subsidio de sepelio de ANSES). Lo aclara la cartilla oficial del organismo, no la ley: es lo único que queda para la familia y por eso conviene saber que existe.",
    norma: "Cartilla PUAM de ANSES (act. octubre 2025)",
  },
  {
    signo: "en contra",
    texto:
      "Es incompatible con cualquier actividad en relación de dependencia o por cuenta propia. La única excepción son los monotributistas inscriptos en el Registro Nacional de Efectores de Desarrollo Local y Economía Social.",
    norma: "Ley 27.260, art. 16 (sustituido por el art. 38 de la Ley 27.467, B.O. 4/12/2018)",
  },
  {
    signo: "a favor",
    texto: "Es vitalicia: una vez otorgada, no se pide de nuevo ni tiene plazo de vencimiento.",
    norma: "Ley 27.260, art. 15 inc. b",
  },
  {
    signo: "a favor",
    texto:
      "Es inembargable. La única excepción son las cuotas por alimentos, y hasta el 20% del haber mensual.",
    norma: "Ley 27.260, art. 15 inc. d",
  },
  {
    signo: "a favor",
    texto:
      "Da derecho a las prestaciones del PAMI (INSSJP) por la ley, no por trámite aparte: el Tesoro ingresa por cada titular lo mismo que aportaría un jubilado de la mínima.",
    norma: "Ley 27.260, art. 17",
  },
  {
    signo: "a favor",
    texto:
      "Da derecho a las asignaciones familiares del subsistema no contributivo, igual que un jubilado del SIPA.",
    norma: "Ley 27.260, art. 18 (sustituyó el art. 1 inc. b de la Ley 24.714)",
  },
];

export type FuentePuam = { nombre: string; url: string; detalle: string };

export const PUAM_FUENTES: { consultadoEl: string; lista: FuentePuam[] } = {
  consultadoEl: "2026-08-15",
  lista: [
    {
      nombre: "Ley 27.260 (texto actualizado) — Pensión Universal para el Adulto Mayor",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/260000-264999/263691/texact.htm",
      detalle:
        "Art. 13 (requisitos y evaluación socioeconómica), art. 14 (el 80% del haber mínimo del art. 125 de la Ley 24.241 y su movilidad), art. 15 (caracteres: personalísima, sin derecho a pensión, vitalicia e inembargable), art. 16 (incompatibilidad con el trabajo, sustituido en 2018), art. 17 (PAMI) y art. 18 (asignaciones familiares).",
    },
    {
      nombre: "Ley 27.467 (texto actualizado) — la que dio vuelta el art. 16",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/315000-319999/316974/texact.htm",
      detalle:
        "B.O. 4/12/2018 — su art. 38 sustituyó el art. 16 de la Ley 27.260: el goce de la PUAM pasó de compatible a INCOMPATIBLE con el trabajo en relación de dependencia o por cuenta propia. Su art. 37 incorporó la evaluación socioeconómica y patrimonial previa al otorgamiento.",
    },
    {
      nombre: "Cartilla oficial de ANSES — Pensión Universal para el Adulto Mayor",
      url: "https://www.anses.gob.ar/sites/default/files/cartilla/2025-10/Cartilla-PUAM.pdf",
      detalle:
        "Actualizada a octubre de 2025. Es la fuente de dos cosas que la Ley 27.260 no dice: que la residencia se pierde por ausentarse más de 90 días corridos del país (Res. ANSES 918/24) y que, aunque la PUAM no genere pensión, el fallecimiento del titular sí da derecho al Subsidio de Contención Familiar.",
    },
    {
      nombre: "Resolución ANSES 257/2026 — haber mínimo garantizado",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346683/20260901",
      detalle:
        "B.O. 1/9/2026 — el haber mínimo del que se deriva el 80% de la PUAM, y el monto de la propia PUAM en su art. 5.",
    },
    {
      nombre: "Decreto 824/2026 — bono extraordinario previsional",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346555/20260831",
      detalle:
        "B.O. 31/8/2026 — alcanza expresamente a la PUAM. Arts. 3 y 4: monto y forma de liquidación. Es discrecional: lo fija un decreto mes a mes y puede no existir.",
    },
    {
      nombre: "Decreto 274/2024 — movilidad mensual por IPC",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/305905/20240322",
      detalle:
        "El haber mínimo —y con él la PUAM— se actualiza todos los meses por el IPC de dos meses antes, redondeado a dos decimales.",
    },
  ],
};
