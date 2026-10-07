// LA ART DEL PERSONAL DE CASAS PARTICULARES — lo que el art. 74 de la Ley 26.844 delegó.
//
// POR QUÉ ESTE ARCHIVO EXISTE (7/9/2026, s109). El art. 74 de la Ley 26.844 tiene once renglones y
// no dice nada liquidable: incorpora al personal de casas particulares «al régimen de las leyes
// 24.557 y 26.773 en el modo y condiciones que se establezcan por vía reglamentaria» y remite al
// PEN para las alícuotas. Es la regla de s103 en estado puro — la ley da el derecho, el reglamento
// escribe el contenido entero—: el art. 74 del Decreto 467/2014 tiene cinco incisos y CADA UNO
// decide un caso real que ninguna nota publica.
//
// EL HALLAZGO GRANDE — inc. d): LA PRESTACIÓN NO SE LIQUIDA SOBRE EL SUELDO QUE COBRA.
//   «Para establecer la prestación dineraria mensual en concepto de Incapacidad Laboral
//   Temporaria, como así también para establecer el Valor Mensual del Ingreso Base conforme lo
//   previsto en el artículo 12 de la Ley Nº 24.557, se deberá considerar la remuneración mensual
//   mínima fijada por el MINISTERIO DE TRABAJO […] o por los mecanismos implementados por la Ley
//   Nº 26.844 para el Personal de Casas Particulares y para la categoría correspondiente.»
// O sea: el ingreso base del art. 12 —el número del que cuelga TODA la indemnización— no es el
// promedio de lo que la persona cobró, como en cualquier otro trabajador. Es el MÍNIMO MENSUAL de
// la escala de la CNTCP para su categoría y modalidad. Quien cobra por encima del mínimo, cobra la
// prestación como si cobrara el mínimo.
//
// LA CONSECUENCIA ARITMÉTICA, QUE ES LA NOTICIA. Con una base tan chica, la fórmula del art. 14
// ap. 2 (53 × ingreso base × % de incapacidad × 65/edad) queda por debajo del piso que la SRT
// actualiza por RIPTE, y lo que se cobra es el PISO — que NO depende de la categoría ni del
// sueldo. Una calculadora que aplique la fórmula sin comparar contra el piso le informa a una
// trabajadora de casas particulares una fracción de lo que le corresponde.
//
// Y ACÁ VA EL LÍMITE EXACTO, PORQUE «SIEMPRE» ERA FALSO — y el primer barrido, hecho con pocas
// edades, casi lo deja pasar. Barriendo de 16 a 70 años las 5 categorías y las dos modalidades
// hay una edad desde la que el piso manda en todas, sin excepción, y por debajo la fórmula gana
// hasta más tarde cuanto más alta es la base de la categoría, porque el coeficiente 65/edad es
// máximo. Esas edades NO se escriben acá: las calcula `cortesDelPiso()` en
// `lib/art-casas-particulares.ts` con la escala vigente. El 7/9/2026 el corte general era 19; el
// 1/10/2026, con la escala de octubre y el mismo piso, pasó a 20. Y un detalle que cae solo del
// barrido: **cuál de los dos manda no depende del porcentaje de incapacidad**, porque los dos
// lados de la comparación se multiplican por él. Depende sólo de la categoría, la modalidad y la
// edad.
//
// LOS OTROS CUATRO INCISOS, cada uno con su caso:
//   a) La ART «no podrá rechazar la afiliación de ningún empleador incluido en su ámbito de
//      actuación». No hay selección de riesgo: la aseguradora la elige el empleador.
//   b) EL QUE PAGA SIN ELEGIR NO ESTÁ CUBIERTO TODAVÍA. Al empleador que registra pagos de cuota
//      pero no contrató una ART se le asigna una «en forma sistemática», y —la letra chica— tendrá
//      cobertura «a partir de la fecha en que se notifique a la Aseguradora la asignación de
//      oficio realizada», no desde el pago. Y la asignación de oficio no corre si el empleador está
//      en el registro de contratos extinguidos por falta de pago.
//   c) La cuota «integra y se adiciona» a los aportes del art. 21 de la Ley 25.239, tiene carácter
//      de PAGO ANTICIPADO y se declara e ingresa «durante el mes en que se brinden las
//      prestaciones». Por eso la ART es el único concepto del régimen que NO va a mes vencido —
//      exactamente lo que ya dice `data/aportes-casas-particulares.ts`.
//   e) Las notificaciones por la ventanilla electrónica para empleadores son válidas y
//      fehacientes.
//
// LA CONDICIÓN SUSPENSIVA, Y POR QUÉ ESTÁ CUMPLIDA. El inc. a) dice que «la obligación de
// asegurarse no entrará en vigencia hasta tanto la SRT, la SSN y la AFIP dicten la normativa
// necesaria». No se afirma acá que se dictó tal o cual resolución: se afirma lo que se puede
// probar con fuente oficial en la mano — ARCA publica todos los meses la tabla de «Aportes,
// contribuciones y ART» de casas particulares con una cuota de ART obligatoria en las nueve filas
// (la tabla que este sitio ya carga y verifica en `data/aportes-casas-particulares.ts`). El
// régimen opera; el importe sale de esa tabla, no de una estimación.
//
// FUENTES leídas el 7/9/2026, texto ACTUALIZADO de InfoLEG:
//   · Ley 26.844 (id 210489), art. 74.
//   · Decreto 467/2014 (id 228927), reglamentación del art. 74, incisos a) a e).
// Los importes de cuota salen de la tabla mensual de ARCA que ya vive en el repo, y los pisos de
// la Res. SRT vigente que ya vive en `data/riesgos-trabajo.ts`. Este archivo no duplica ninguno.

import { EDAD_PISO_SIEMPRE } from "@/lib/art-casas-particulares";

export const ART_CASAS_VIGENCIA = {
  consultadoEl: "7 de septiembre de 2026",
  norma: "Ley 26.844 art. 74 · Decreto 467/2014, reglamentación del art. 74",
} as const;

/** Citas textuales. No se parafrasean: la página las muestra entre comillas. */
export const ART_CASAS_TEXTOS = {
  ley74:
    "Las trabajadoras/es comprendidas en la presente ley serán incorporadas al régimen de las leyes 24.557 y 26.773 en el modo y condiciones que se establezcan por vía reglamentaria, para alcanzar en forma gradual y progresiva las prestaciones contempladas en dicha normativa, en función de las particularidades propias del presente estatuto. El Poder Ejecutivo fijará, en su caso, las alícuotas que deberán cotizar los empleadores, así como las demás condiciones necesarias para acceder a los beneficios respectivos.",
  noRechazo:
    "La ASEGURADORA DE RIESGOS DEL TRABAJO (ART) no podrá rechazar la afiliación de ningún empleador incluido en su ámbito de actuación.",
  asignacionDeOficio:
    "El empleador que registre pagos de cuotas al Sistema de Riesgos del Trabajo pero que no haya tomado cobertura con una ASEGURADORA DE RIESGOS DEL TRABAJO (ART) determinada, será asignado a una ASEGURADORA DE RIESGOS DEL TRABAJO (ART) autorizada por la SUPERINTENDENCIA DE RIESGOS DEL TRABAJO (SRT) en forma sistemática y conforme la normativa que oportunamente dicte la misma, siempre y cuando no se encuentre ingresado en el registro de contratos extinguidos por falta de pago. En estos casos, el empleador tendrá cobertura de riesgos del trabajo, a partir de la fecha en que se notifique a la Aseguradora la asignación de oficio realizada.",
  pagoAnticipado:
    "La cuota que se destina al pago de la cobertura del Sistema de Riesgos del Trabajo integra y se adiciona a los aportes y contribuciones obligatorios establecidos por el artículo 21 de la Ley Nº 25.239. La cuota tiene carácter de pago anticipado y deberá ser declarada e ingresada por el empleador durante el mes en que se brinden las prestaciones, con las mismas modalidades, plazos y condiciones fijados para los citados aportes y contribuciones obligatorios.",
  baseDeCalculo:
    "Para establecer la prestación dineraria mensual en concepto de Incapacidad Laboral Temporaria, como así también para establecer el Valor Mensual del Ingreso Base conforme lo previsto en el artículo 12 de la Ley Nº 24.557, se deberá considerar la remuneración mensual mínima fijada por el MINISTERIO DE TRABAJO, EMPLEO Y SEGURIDAD SOCIAL o por los mecanismos implementados por la Ley Nº 26.844 para el Personal de Casas Particulares y para la categoría correspondiente.",
  ventanilla:
    "Se considerarán válidas y fehacientes todas las comunicaciones y notificaciones que se efectúen a través de la ventanilla electrónica para empleadores.",
} as const;

export type ReglaArtCasas = { id: string; titulo: string; texto: string; norma: string };

export const REGLAS_ART_CASAS: ReglaArtCasas[] = [
  {
    id: "base-minima",
    titulo: "La prestación no se liquida sobre el sueldo real, sino sobre el mínimo de la categoría",
    texto:
      "Es la diferencia más grande con cualquier otro trabajador. El ingreso base del art. 12 de la Ley 24.557 (el número del que depende toda la indemnización) no es el promedio de lo que la persona cobró. El reglamento manda tomar «la remuneración mensual mínima» de la escala de la CNTCP para su categoría. Si cobra más que el mínimo, igual recibe la prestación como si cobrara el mínimo.",
    norma: "Decreto 467/2014, reglamentación del art. 74, inc. d)",
  },
  {
    id: "manda-el-piso",
    titulo: "Por eso, salvo en las edades más jóvenes, lo que se cobra es el piso de la SRT",
    texto: `Con una base tan baja, la fórmula del art. 14 ap. 2 (53 × ingreso base × % de incapacidad × 65/edad) queda por debajo del piso que la SRT actualiza por RIPTE cada seis meses, y se cobra el mayor de los dos. El piso no depende de la categoría ni del sueldo: es el mismo para todos, y por eso protege más a quien menos base tiene. Con la escala vigente, desde los ${EDAD_PISO_SIEMPRE} años el piso manda en todas las categorías y modalidades, sin excepción; por debajo de esa edad la fórmula puede ganar, y gana hasta más tarde cuanto más alta es la base de la categoría, porque el coeficiente 65/edad es máximo. Y cuál de los dos manda no depende del porcentaje de incapacidad, porque los dos lados se multiplican por él.`,
    norma: "Decreto 1694/2009, arts. 2 a 4 · Res. SRT vigente (art. 17 bis de la Ley 26.773)",
  },
  {
    id: "no-rechazo",
    titulo: "Ninguna ART puede rechazar a un empleador de casa particular",
    texto:
      "La aseguradora la elige libremente el empleador entre las autorizadas a operar en la jurisdicción de su domicilio, y la ART «no podrá rechazar la afiliación». No hay selección de riesgo posible en este régimen.",
    norma: "Decreto 467/2014, reglamentación del art. 74, inc. a)",
  },
  {
    id: "asignacion-oficio",
    titulo: "Pagar la cuota sin elegir ART no equivale a estar cubierto desde el pago",
    texto:
      "Al empleador que registra pagos pero no contrató una aseguradora se le asigna una de oficio, en forma sistemática. Pero la cobertura arranca «a partir de la fecha en que se notifique a la Aseguradora la asignación de oficio», no desde el primer pago. Y la asignación no procede si el empleador figura en el registro de contratos extinguidos por falta de pago.",
    norma: "Decreto 467/2014, reglamentación del art. 74, inc. b)",
  },
  {
    id: "pago-anticipado",
    titulo: "La ART es el único concepto del régimen que se paga por adelantado",
    texto:
      "Los aportes y contribuciones de casas particulares van a mes vencido. La cuota de la ART no: tiene «carácter de pago anticipado» y se declara e ingresa durante el mes en que se prestan los servicios, con el mismo formulario y vencimiento que el resto.",
    norma: "Decreto 467/2014, reglamentación del art. 74, inc. c) · art. 21 de la Ley 25.239",
  },
  {
    id: "la-paga-el-empleador",
    titulo: "La cuota la paga el empleador: no se le descuenta al trabajador",
    texto:
      "La cuota se adiciona a los aportes y contribuciones obligatorios que ingresa la parte empleadora. Es la parte más cara de la boleta mensual del régimen, y no es un descuento del sueldo.",
    norma: "Decreto 467/2014, reglamentación del art. 74, inc. c)",
  },
  {
    id: "ventanilla",
    titulo: "Las notificaciones por la ventanilla electrónica son fehacientes",
    texto:
      "Todo lo que la SRT o la ART comuniquen al empleador por la ventanilla electrónica se considera válido y fehaciente. No hace falta una carta documento para que un plazo empiece a correr.",
    norma: "Decreto 467/2014, reglamentación del art. 74, inc. e)",
  },
  {
    id: "instancia-previa",
    titulo: "El reclamo pasa por la misma comisión médica que el resto del sistema",
    texto:
      "La incorporación es al régimen de las leyes 24.557 y 26.773 sin un procedimiento propio: rige la instancia administrativa previa y obligatoria ante las comisiones médicas de la Ley 27.348, con sus 60 días hábiles perentorios y con el patrocinio letrado a cargo de la aseguradora.",
    norma: "Ley 26.844, art. 74 · Ley 27.348, arts. 1 a 3",
  },
];

export const ART_CASAS_FUENTES = {
  consultadoEl: ART_CASAS_VIGENCIA.consultadoEl,
  principal: {
    nombre: "Decreto 467/2014, texto actualizado (InfoLEG)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=228927",
  },
  lista: [
    {
      nombre: "Ley 26.844, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/210000-214999/210489/texact.htm",
      detalle:
        "Régimen Especial de Contrato de Trabajo para el Personal de Casas Particulares. El art. 74 incorpora al personal a las leyes 24.557 y 26.773 «en el modo y condiciones que se establezcan por vía reglamentaria».",
    },
    {
      nombre: "Decreto 467/2014: reglamentación de la Ley 26.844 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=228927",
      detalle:
        "La reglamentación del art. 74, incisos a) a e): elección y no rechazo de la ART, asignación de oficio, cuota como pago anticipado, base de cálculo de la ILT y del ingreso base, y ventanilla electrónica.",
    },
    {
      nombre: "ARCA: aportes, contribuciones y ART de casas particulares",
      url: "https://www.arca.gob.ar/casasparticulares/aportes-contribuciones-ART/documentos.asp",
      detalle:
        "La tabla mensual oficial con la cuota de ART por rango de horas y condición del trabajador. Es la prueba de que el régimen opera y la fuente del importe que se paga.",
    },
  ],
} as const;
