// HASTA CUÁNDO SIGUE LA OBRA SOCIAL cuando se corta la relación de trabajo o el sueldo.
// Ley 23.660, art. 10 (texto vigente, con las modificaciones de los arts. 279 y 280 del Decreto
// 70/2023) · LCT arts. 208 y 211 · Ley 23.660 art. 16 (lo que cuesta seguir).
//
// POR QUÉ ESTE ARCHIVO EXISTE (5/9/2026, s107). «Después del despido te quedan tres meses de obra
// social» es de las frases más repetidas de internet, y está incompleta en los dos extremos:
//
//   1. **Los tres meses tienen un requisito de entrada que casi nadie menciona.** El inciso a) del
//      art. 10 los da a «los trabajadores que se hubieran desempeñado en forma continuada durante
//      más de TRES (3) meses». Quien se va —o a quien echan— antes de cumplir ese piso no tiene los
//      tres meses de cobertura. Es exactamente el caso de más angustia (contrato corto, período de
//      prueba) y es donde la respuesta popular falla.
//
//   2. **El art. 10 tiene OCHO supuestos, no uno.** Enfermedad inculpable, suspensión sin goce de
//      sueldo, licencia sin goce por razones particulares, trabajo de temporada, excedencia y
//      muerte del trabajador tienen cada uno su regla, su plazo y —esto es lo que decide— su
//      respuesta distinta a «¿tengo que pagar algo?». En cuatro de los ocho la cobertura sigue
//      «sin obligación de efectuar aportes»; en los otros cuatro sólo continúa si el trabajador se
//      hace cargo del aporte suyo Y de la contribución que pagaba el empleador: nueve puntos, no
//      tres. La ley no fija base de cálculo para ese caso, y acá no se inventa una.
//
//   3. **El caso de enfermedad no se cuenta en meses sueltos: se deriva.** El inciso b) no da un
//      plazo propio: dice que la cobertura dura «el plazo de conservación del empleo sin percepción
//      de remuneración». Ese plazo es el del art. 211 de la LCT —un año— y arranca recién cuando se
//      agotó la licencia paga del art. 208, que es de 3, 6 o 12 meses según antigüedad y cargas de
//      familia. Publicar «un año» a secas se queda corto entre tres meses y un año entero.
//
//   4. **La muerte del trabajador remite al inciso a), incluido su requisito.** El inciso h) le da
//      al grupo familiar primario «el plazo y las condiciones del inciso a)»: los mismos tres
//      meses, y también el mismo piso de más de tres meses de desempeño continuado.
//
// El Decreto 70/2023 tocó dos incisos: sustituyó el e) (trabajadores de temporada, sin cambio de
// fondo) y derogó el f), que mantenía la cobertura durante el servicio militar obligatorio por
// llamado ordinario. No se lo destaca como pérdida de derechos porque el servicio militar
// obligatorio no existe desde 1994: el decreto limpió texto muerto.
//
// FUENTES leídas el 5/9/2026, todas en InfoLEG:
//   · Ley 23.660 texto actualizado (id 62) — art. 10 completo, incisos a) a h), y art. 16.
//   · Ley 23.660 captura del 1/12/2023 (id 62 vía Internet Archive) — el inciso f) derogado.
//   · LCT texto actualizado (id 25552) — arts. 208 (licencia paga) y 211 (conservación del empleo).

/** Los tres meses del inciso a), y el piso de desempeño continuado que los habilita. */
export const EXTINCION = {
  mesesCobertura: 3,
  mesesDesempenoMinimo: 3,
  articulo: "Ley 23.660, art. 10 inc. a)",
} as const;

/** Inciso c): la suspensión sin goce de sueldo cubre tres meses gratis y después se paga. */
export const SUSPENSION_MESES_SIN_APORTE = 3;

export type Costo = "sin-aporte" | "aporte-y-contribucion";

export type Supuesto = {
  id: string;
  titulo: string;
  inciso: string;
  /** Qué dura la cobertura, en palabras de la norma. */
  duracion: string;
  costo: Costo;
  /** El texto del inciso, literal. No se parafrasea: se cita. */
  texto: string;
};

export const SUPUESTOS: Supuesto[] = [
  {
    id: "extincion",
    titulo: "Se extinguió el contrato (despido, renuncia o fin de contrato)",
    inciso: "art. 10 inc. a)",
    duracion: "3 meses desde el distracto, si venías con más de 3 meses continuados",
    costo: "sin-aporte",
    texto:
      "En caso de extinción del contrato de trabajo, los trabajadores que se hubieran desempeñado en forma continuada durante más de tres (3) meses mantendrán su calidad de beneficiarios durante un período de tres (3) meses, contados de su distracto, sin obligación de efectuar aportes.",
  },
  {
    id: "enfermedad",
    titulo: "Accidente o enfermedad inculpable",
    inciso: "art. 10 inc. b)",
    duracion: "todo el plazo de conservación del empleo (art. 211 LCT), después de la licencia paga",
    costo: "sin-aporte",
    texto:
      "En caso de interrupción del trabajo por causa de accidente o enfermedad inculpable, el trabajador mantendrá su calidad de beneficiario durante el plazo de conservación del empleo sin percepción de remuneración, sin obligación de efectuar aportes.",
  },
  {
    id: "suspension",
    titulo: "Suspensión sin goce de remuneración",
    inciso: "art. 10 inc. c)",
    duracion: "3 meses gratis; después, sólo si pagás aporte y contribución",
    costo: "sin-aporte",
    texto:
      "En caso de suspensión del trabajador sin goce de remuneración, éste mantendrá su carácter de beneficiario durante un período de tres (3) meses. Si la suspensión se prolongare más allá de dicho plazo, podrá optar por continuar manteniendo ese carácter, cumpliendo con las obligaciones del aporte a su cargo y de la contribución a cargo del empleador.",
  },
  {
    id: "licencia",
    titulo: "Licencia sin goce de sueldo por razones particulares",
    inciso: "art. 10 inc. d)",
    duracion: "todo el lapso de la licencia, pero desde el día uno se paga",
    costo: "aporte-y-contribucion",
    texto:
      "En caso de licencia sin goce de remuneración por razones particulares del trabajador, éste podrá optar por mantener durante el lapso de la licencia la calidad de beneficiario cumpliendo con las obligaciones de aportes a su cargo y contribución a cargo del empleador.",
  },
  {
    id: "temporada",
    titulo: "Trabajador de temporada, en el período de inactividad",
    inciso: "art. 10 inc. e)",
    duracion: "mientras subsista el contrato de trabajo, pagando",
    costo: "aporte-y-contribucion",
    texto:
      "Los trabajadores de temporada podrán optar por mantener el carácter de beneficiarios durante el período de inactividad y mientras subsista el contrato de trabajo cumpliendo durante ese período con las obligaciones del aporte a su cargo y de la contribución a cargo del empleador que establece la presente ley. Este derecho cesará a partir del momento en que, en razón de otro contrato de trabajo, pasen a ser beneficiarios titulares en los términos previstos en el artículo 8 de la presente ley.",
  },
  {
    id: "excedencia",
    titulo: "Excedencia después de la licencia por maternidad",
    inciso: "art. 10 inc. g)",
    duracion: "todo el período de excedencia, pagando",
    costo: "aporte-y-contribucion",
    texto:
      "La mujer que quedare en situación de excedencia podrá optar por mantener su calidad de beneficiaria durante el período de la misma, cumpliendo con las obligaciones del aporte a su cargo y de la contribución a cargo del empleador que establece la presente ley.",
  },
  {
    id: "fallecimiento",
    titulo: "Murió el trabajador (cobertura del grupo familiar)",
    inciso: "art. 10 inc. h)",
    duracion: "3 meses en las condiciones del inciso a); después, opción pagando",
    costo: "sin-aporte",
    texto:
      "En caso de muerte del trabajador, los integrantes de su grupo familiar primario mantendrán el carácter de beneficiarios, por el plazo y en las condiciones del inciso a) de este artículo. Una vez vencido dicho plazo podrán optar por continuar en ese carácter, cumpliendo con los aportes y contribuciones que hubieren correspondido al beneficiario titular.",
  },
];

export const CONTINUIDAD_TEXTOS = {
  encabezado:
    "El carácter de beneficiario otorgado en el inciso a) del artículo 8 y en los incisos a) y b) del artículo 9 de esta ley subsistirá mientras se mantenga el contrato de trabajo o la relación de empleo público y el trabajador o empleado reciba remuneración del empleador, con las siguientes salvedades:",
  incisoFDerogado:
    "En caso que el trabajador deba prestar servicio militar obligatorio por llamado ordinario, movilización o convocatorias especiales, durante el período que aquél no perciba remuneración por esta causa mantendrá la calidad de beneficiario titular, sin obligación de efectuar aportes;",
  art211:
    "Vencidos los plazos de interrupción del trabajo por causa de accidente o enfermedad inculpable, si el trabajador no estuviera en condiciones de volver a su empleo, el empleador deberá conservárselo durante el plazo de un (1) año contado desde el vencimiento de aquéllos. Vencido dicho plazo, la relación de empleo subsistirá hasta tanto alguna de las partes decida y notifique a la otra su voluntad de rescindirla.",
} as const;

export const CONTINUIDAD_FUENTES = {
  consultadoEl: "5 de septiembre de 2026",
  principal: {
    nombre: "Ley 23.660, art. 10 — texto actualizado en InfoLEG",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/62/texact.htm",
  },
  lista: [
    {
      nombre: "Ley 23.660 — texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/62/texact.htm",
      detalle:
        "Art. 10 completo (los ocho supuestos, con el inciso e) sustituido y el f) derogado por el Decreto 70/2023) y art. 16, que fija el aporte y la contribución que hay que cubrir para seguir.",
    },
    {
      nombre: "Ley de Contrato de Trabajo — texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 208 (licencia paga de 3, 6 o 12 meses según antigüedad y cargas de familia) y art. 211 (el año de conservación del empleo al que remite el inciso b).",
    },
  ],
} as const;
