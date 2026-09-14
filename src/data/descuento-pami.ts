// EL DESCUENTO DE OBRA SOCIAL SOBRE EL HABER JUBILATORIO — el 3%/6% de la Ley 19.032.
//
// POR QUÉ ESTE ARCHIVO EXISTE (14/9/2026, s114, Turno de Madrugada). La veta se abrió el 11/9 al
// leer el art. 20 de la Ley 23.660: a los beneficiarios de los incisos b) y c) de su art. 8
// —jubilados, pensionados y titulares de prestaciones no contributivas— el aporte de obra social
// **se les deduce del haber**. Pero el número NO está ahí: el art. 16 inc. c) de la misma ley
// remite («mantendrán su vigencia los aportes de los jubilados y pensionados … determinados por
// leyes, decretos, convenciones colectivas u otras disposiciones particulares»). La alícuota vive
// en la Ley 19.032, art. 8, y es **progresiva**, cosa que casi ninguna nota publica:
//
//     inc. a) — beneficiarios de ANSeS / SIJP (ex relación de dependencia):
//              3% HASTA el importe del haber mínimo + 6% SOBRE LO QUE EXCEDE ese monto.
//     inc. b) — beneficiarios ex Caja de Autónomos / SIJP ex autónomos:
//              6% liso sobre todo el haber, tengan o no grupo familiar.
//
// Las tres consecuencias que decide un caso real y que no están publicadas en ningún lado:
//
//   1. **El escalón se mueve todos los meses.** El punto de quiebre es el haber mínimo
//      garantizado, que ANSES redetermina por resolución mensual (movilidad del Dec. 274/2024).
//      O sea que la alícuota efectiva de una misma persona cambia mes a mes sin que cambie su
//      haber. Por eso acá no se copia ningún monto: el mínimo sale de PRESTACIONES_VIGENTES.
//   2. **El aguinaldo también aporta.** Los dos incisos dicen «calculado sobre los haberes de las
//      prestaciones, INCLUIDO EL HABER COMPLEMENTARIO». El haber complementario es el aguinaldo
//      previsional: no está exento.
//   3. **El bono extraordinario NO aporta**, porque los decretos que lo fijan lo declaran no
//      remunerativo y no sujeto a descuentos (hoy, Decreto 824/2026 arts. 3 y 4 — ya verificado en
//      src/data/prestaciones.ts). Es la diferencia que más confunde a quien mira su recibo.
//
// EL HALLAZGO MÁS FUERTE, y es un NO: **irse del PAMI a una obra social sindical no baja el
// descuento ni un peso.** La pregunta circula mucho y la respuesta está en el Decreto 292/95: el
// art. 11 da la libertad de elección, pero el art. 13 dice que lo que ANSeS transfiere al agente
// elegido es una CÁPITA, y la toma «de los recursos que legalmente le corresponda percibir al
// INSSJP». El aporte que se le deduce a la persona sigue siendo el mismo art. 8 de la Ley 19.032:
// lo que cambia es a dónde va la plata, no cuánta sale del haber. (Y la opción se ejerce una vez
// por año ante ANSeS, con vigencia desde el primer día del TERCER mes posterior: art. 12.)
//
// LAS PNC SON UN CASO DISTINTO Y NO SE LES INVENTA UNA ALÍCUOTA. El art. 20 de la Ley 23.660
// menciona las prestaciones no contributivas, pero ninguna norma verificada fija un porcentaje
// para ellas, y el propio Decreto 292/95 resolvió su salud por otra vía: el art. 17 transfirió las
// PNC a la Secretaría de Desarrollo Social y los arts. 19 y 20 pusieron su cobertura médica a
// cargo del Estado, contratada por licitación pública —hoy el Programa Federal «Incluir Salud»—,
// con una sola excepción nombrada en la norma: la Ley 23.848 (veteranos de Malvinas), que
// permanecen en el INSSJP. Por eso esta página no publica un descuento para PNC: publica que su
// cobertura no se financia con un aporte deducido del haber.
//
// FUENTES leídas el 14/9/2026, todas en InfoLEG (texto ACTUALIZADO, no el original):
//   · Ley 19.032 (id 16081) — art. 8 (sustituido por art. 6 de la Ley 25.615, B.O. 23/7/2002) y art. 9.
//   · Ley 23.660 (id 62) — arts. 8 (sust. por art. 277 del Dec. 70/2023), 16 inc. c) y 20.
//   · Decreto 292/95 (id 25621) — arts. 11, 12, 13, 17, 19 y 20.

import { PRESTACIONES_VIGENTES } from "@/data/prestaciones";

export const VIGENCIA_PAMI = {
  consultadoEl: "14 de septiembre de 2026",
  /** La norma que dio al art. 8 su redacción vigente. */
  normaAlicuotas: "Ley 19.032, art. 8 (texto según art. 6 de la Ley 25.615, B.O. 23/7/2002)",
} as const;

/** Alícuota del tramo que no supera el haber mínimo, para beneficios del inc. a). */
export const ALICUOTA_HASTA_MINIMO = 0.03;
/** Alícuota del excedente por encima del haber mínimo (inc. a) y del total en el inc. b). */
export const ALICUOTA_EXCEDENTE = 0.06;

/** Meses de espera de la opción de cambio: rige el 1º día del TERCER mes posterior (Dec. 292/95, art. 12). */
export const MESES_VIGENCIA_OPCION = 3;
/** Veces por año que se puede ejercer la opción (Dec. 292/95, art. 12). */
export const OPCIONES_POR_ANIO = 1;

export type RegimenPami = {
  id: "dependencia" | "autonomos" | "pnc";
  etiqueta: string;
  /** Descripción corta de quién entra en este régimen. */
  quien: string;
  norma: string;
  /** null en el régimen que no aporta. */
  tramos: { hastaMinimo: number; excedente: number } | null;
  /** La frase que resume el caso, para el veredicto de la calculadora. */
  resumen: string;
};

export const REGIMENES: RegimenPami[] = [
  {
    id: "dependencia",
    etiqueta: "Jubilación o pensión de ANSeS / SIJP (trabajé en relación de dependencia)",
    quien:
      "Beneficiarios de la Administración Nacional de la Seguridad Social y del Sistema Integrado de Jubilaciones y Pensiones, tengan o no grupo familiar.",
    norma: "Ley 19.032, art. 8 inc. a)",
    tramos: { hastaMinimo: ALICUOTA_HASTA_MINIMO, excedente: ALICUOTA_EXCEDENTE },
    resumen:
      "3% sobre la parte del haber que no supera el haber mínimo garantizado y 6% sobre lo que lo excede.",
  },
  {
    id: "autonomos",
    etiqueta: "Jubilación o pensión por aportes como autónomo (ex Caja de Autónomos)",
    quien:
      "Beneficiarios de ANSeS (Ex Caja de Jubilaciones para Trabajadores Autónomos) y del SIJP (Ex Trabajadores Autónomos), tengan o no grupo familiar.",
    norma: "Ley 19.032, art. 8 inc. b)",
    tramos: { hastaMinimo: ALICUOTA_EXCEDENTE, excedente: ALICUOTA_EXCEDENTE },
    resumen: "6% sobre todo el haber, sin escalón: el inciso b) no distingue tramos.",
  },
  {
    id: "pnc",
    etiqueta: "Pensión no contributiva nacional (invalidez, vejez, madre de 7 hijos)",
    quien:
      "Titulares de las prestaciones no contributivas transferidas por el art. 17 del Decreto 292/95.",
    norma: "Decreto 292/95, arts. 17, 19 y 20",
    tramos: null,
    resumen:
      "No hay alícuota fijada: la cobertura médica quedó a cargo del Estado y se contrata por licitación pública, no se financia con un descuento del haber.",
  },
];

// El punto de quiebre del inciso a): el haber mínimo garantizado vigente. El `: number` es
// necesario — PRESTACIONES_VIGENTES es `as const`, y sin anotar, TS infiere el tipo LITERAL del
// monto del mes y rechaza cualquier otro haber mínimo pasado como parámetro (el build falla en
// el motor, no acá).
export const HABER_MINIMO_VIGENTE: number = PRESTACIONES_VIGENTES.haberMinimo;

export const PAMI_TEXTOS = {
  ley19032Art8IncA:
    "El aporte de los beneficiarios de la Administración Nacional de la Seguridad Social y del Sistema Integrado de Jubilaciones y Pensiones (SIJP), tengan o no grupo familiar calculado sobre los haberes de las prestaciones, incluido el haber complementario, equivalente al tres por ciento (3%) hasta el importe del haber mínimo y al seis por ciento (6%) sobre lo que excede dicho monto.",
  ley19032Art8IncB:
    "El aporte de los beneficiarios de la Administración Nacional de la Seguridad Social (Ex Caja de Jubilaciones para Trabajadores Autónomos), y SIJP (Ex Trabajadores Autónomos), tengan o no grupo familiar, del seis por ciento (6%) calculado sobre los haberes de las prestaciones, incluido el haber complementario.",
  ley19032Art9:
    "Los aportes establecidos en los incisos a) y b) del artículo anterior, serán deducidos por la Administración Nacional de la Seguridad Social de los haberes de los beneficiarios y serán transferidos al Instituto en forma directa y automática.",
  ley23660Art20:
    "Los aportes a cargo de los beneficiarios mencionados en los incisos b) y c) del artículo 8 serán deducidos de los haberes jubilatorios de pensión o de prestaciones no contributivas que les corresponda percibir, por los organismos que tengan a su cargo la liquidación de dichas prestaciones, debiendo transferirse a la orden de la respectiva obra social en la forma y plazo que establezca la reglamentación.",
  ley23660Art16IncC:
    "Asimismo, mantendrán su vigencia los aportes de los jubilados y pensionados y los recursos de distinta naturaleza destinados al sostenimiento de las obras sociales determinados por leyes, decretos, convenciones colectivas u otras disposiciones particulares.",
  decreto292Art11:
    "Los beneficiarios a que hace referencia el artículo anterior, podrán optar por afiliarse al Instituto Nacional de Servicios Sociales para Jubilados y Pensionados o a cualquier otro agente del Sistema Nacional del Seguro de Salud inscripto en el registro. Los Agentes del Sistema Nacional del Seguro de Salud registrados quedarán obligados a recibir a los beneficiarios que opten por ellos, a sus respectivos grupos familiares y adherentes, no pudiendo en ningún caso condicionar su ingreso por patología médica o ninguna otra causa.",
  decreto292Art12:
    "Las opciones a las que se refiere el artículo 11 del presente decreto sólo podrán ser ejercidas por los beneficiarios una vez por año, mediante presentación ante la Administración Nacional de la Seguridad Social y tendrán vigencia efectiva a partir del primer día del tercer mes posterior a dicha presentación.",
  decreto292Art13:
    "Transitoriamente y a los fines de garantizar el financiamiento de los beneficiarios que optaren por afiliarse a un Agente inscripto en el Registro, la Administración Nacional de la Seguridad Social transferirá a dicho Agente, de los recursos que legalmente le corresponda al INSTITUTO NACIONAL DE SERVICIOS SOCIALES PARA JUBILADOS Y PENSIONADOS, una cápita por cada beneficiario.",
  decreto292Art19:
    "La cobertura médica de los beneficiarios a los que se refiere el artículo 17 excepto lo previsto en la Ley Nº 23.848 estará a cargo de la SECRETARIA DE DESARROLLO SOCIAL.",
} as const;

export const PAMI_FUENTES = {
  consultadoEl: VIGENCIA_PAMI.consultadoEl,
  principal: {
    nombre: "Ley 19.032, art. 8 — texto actualizado en InfoLEG",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/15000-19999/16081/texact.htm",
  },
  lista: [
    {
      nombre: "Ley 19.032 (INSSJP / PAMI) — texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/15000-19999/16081/texact.htm",
      detalle:
        "Art. 8 inc. a) y b) — las alícuotas del aporte sobre el haber, «incluido el haber complementario», con el escalón en el haber mínimo (texto según el art. 6 de la Ley 25.615) — y art. 9, que manda deducirlo de los haberes y transferirlo al Instituto en forma directa y automática.",
    },
    {
      nombre: "Ley 23.660 (obras sociales) — texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/62/texact.htm",
      detalle:
        "Art. 8 incs. b) y c) — jubilados, pensionados y titulares de PNC como beneficiarios obligatorios (texto según el art. 277 del Decreto 70/2023) — art. 16 inc. c), que remite el monto a otras normas, y art. 20, que ordena deducir el aporte del haber.",
    },
    {
      nombre: "Decreto 292/95 — libertad de elección y cobertura de las PNC",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25621/texact.htm",
      detalle:
        "Arts. 11 a 13 — la opción de obra social, su periodicidad anual, la vigencia al tercer mes y la cápita que ANSeS transfiere de los recursos del INSSJP; arts. 17, 19 y 20 — el traspaso de las PNC y su cobertura médica a cargo del Estado, salvo la Ley 23.848.",
    },
    {
      nombre: "Resolución ANSES 257/2026 — haber mínimo garantizado vigente",
      url: PRESTACIONES_VIGENTES.resolucionUrl,
      detalle:
        "Fija el haber mínimo del mes, que es el punto exacto donde el aporte del inciso a) pasa del 3% al 6%. Se redetermina todos los meses por la movilidad del Decreto 274/2024.",
    },
  ],
} as const;
