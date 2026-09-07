// RIFL - Regimen de Incentivo a la Formalizacion Laboral (Ley 27.802, Titulo XX, arts. 156-164).
//
// POR QUE ESTE ARCHIVO EXISTE (21/8/2026, s90). El RIFL baja las contribuciones patronales de
// los cuatro subsistemas del art. 19 de la Ley 27.541 -SIPA, Fondo Nacional de Empleo,
// Asignaciones Familiares e INSSJP- del 18% o 20,40% a un total del 5% (2% + 3%) por 48 meses,
// por cada nueva incorporacion. Es el numero mas grande de toda la reforma para un empleador y
// casi nadie lo publica como cuenta: se publica como noticia.
//
// LOS DOS RELOJES QUE NADIE SEPARA, y son lo que hace util a la pagina:
//   1. LA VENTANA PARA ENTRAR cierra. El art. 156 le da al regimen "una vigencia de un (1) ano
//      contado desde el primer dia del segundo mes inmediato siguiente al de la entrada en
//      vigencia de la presente ley". La ley entro en vigencia el 6/3/2026 (art. 217), asi que la
//      ventana abrio el 1/5/2026 y cierra el 30/4/2027. Ese par de fechas se DERIVA de la fecha
//      de publicacion (ver lib/rifl.ts), no se escribe a mano: asi la pagina no envejece.
//   2. EL BENEFICIO DURA 48 MESES POR CADA ALTA, contados "a partir del mes de inicio de la nueva
//      relacion laboral" (art. 159 incs. a y b). Una contratacion hecha el ultimo dia de la
//      ventana conserva la alicuota reducida hasta 2031. Confundir los dos relojes -y se
//      confunden todo el tiempo- cambia la decision de contratar.
//
// LA BASE NO CAMBIA, SOLO LAS ALICUOTAS. El art. 159 dice que el empleador "debera ingresar las
// alicuotas previstas para el regimen general de contribuciones patronales, tomando en cuenta
// las siguientes adecuaciones": lo unico que reemplaza son los porcentajes. La detraccion del
// art. 22 de la Ley 27.541 ($ 7.003,68 por trabajador y por mes, un importe fijo de 2019 que la
// ley no actualiza) se aplica igual en los dos escenarios, asi que NO cambia el ahorro -aunque
// si cambia cada importe por separado, y por eso la calculadora la muestra en vez de esconderla.
//
// FUENTES leidas el 21/8/2026, texto oficial en InfoLEG:
//   - Ley 27.802 (id 423680, norma.htm), Titulo XX, arts. 156 a 164, y art. 217 (vigencia).
//   - Ley 27.541 texto ACTUALIZADO (id 333564, texact.htm), arts. 19 (alicuotas 20,40% y 18%),
//     22 (detraccion de $ 7.003,68 y la de $ 17.509,20 sin actualizacion) y 23 (detraccion
//     adicional de $ 10.000 para nominas de hasta 25 empleados, sobre la base TOTAL).

/** B.O. de la Ley 27.802: el reloj del art. 156 se cuenta desde aca (art. 217). */
export const LEY_PUBLICADA_ISO = "2026-03-06";
export const LEY_PUBLICADA = "6 de marzo de 2026";

/** Art. 159 inc. a): SIPA + Fondo Nacional de Empleo + Asignaciones Familiares, todo junto. */
export const ALICUOTA_RIFL_SIPA_FNE_AAFF = 0.02;

/** Art. 159 inc. b): INSSJP (ley 19.032). */
export const ALICUOTA_RIFL_INSSJP = 0.03;

/** Lo que termina pagando el empleador por los cuatro subsistemas: 2% + 3%. */
export const ALICUOTA_RIFL_TOTAL = ALICUOTA_RIFL_SIPA_FNE_AAFF + ALICUOTA_RIFL_INSSJP;

/** Art. 159: los 48 meses corren "a partir del mes de inicio de la nueva relacion laboral". */
export const MESES_BENEFICIO = 48;

/** Art. 156: la ventana para entrar al regimen dura un ano. */
export const ANIOS_VENTANA = 1;

/**
 * Art. 19 de la Ley 27.541 (texto actualizado). Son las alicuotas del regimen general para los
 * MISMOS cuatro subsistemas que adecua el art. 159: no incluyen obra social (Ley 23.660) ni ART
 * (Ley 24.557), que el RIFL no toca y que por eso quedan fuera de la comparacion.
 */
export const ALICUOTAS_GENERALES = [
  {
    inciso: "a",
    valor: 0.204,
    etiqueta: "20,40%",
    detalle:
      "Empleadores del sector privado cuya actividad principal encuadre en \u00abServicios\u00bb o \u00abComercio\u00bb seg\u00fan la Res. SEPyME 220/2019, siempre que sus ventas totales anuales superen los l\u00edmites de la categor\u00eda mediana tramo 2. Quedan afuera los comprendidos en las leyes 23.551, 23.660 y 23.661.",
  },
  {
    inciso: "b",
    valor: 0.18,
    etiqueta: "18%",
    detalle:
      "Todos los dem\u00e1s empleadores del sector privado. Tambi\u00e9n se aplica a las entidades y organismos del sector p\u00fablico comprendidos en el art. 1\u00b0 de la ley 22.016.",
  },
] as const;

/** Art. 22 de la Ley 27.541: detraccion mensual por trabajador, importe fijo de 2019. */
export const DETRACCION_ART22 = 7003.68;

/** Mismo art. 22: la detraccion mayor, para los empleadores que enumera. "No sufrira actualizacion alguna". */
export const DETRACCION_ART22_ESPECIAL = 17509.2;

/** Art. 23: detraccion ADICIONAL de nomina de hasta 25 empleados, sobre la base TOTAL (no por trabajador). */
export const DETRACCION_ART23_NOMINA_CHICA = 10000;
export const DETRACCION_ART23_TOPE_EMPLEADOS = 25;

/**
 * Textos oficiales del Titulo XX, verbatim: son el ancla contra la que `check_rifl.ts` verifica
 * que la pagina no derive hacia un resumen, y son lo que casi ninguna publicacion reproduce.
 */
export const RIFL_TEXTOS = {
  art156:
    "Créase el Régimen de Incentivo a la Formalización Laboral (RIFL), con una vigencia de un (1) año contado desde el primer día del segundo mes inmediato siguiente al de la entrada en vigencia de la presente ley, destinado a todos aquellos empleadores a quienes les resulten de aplicación las disposiciones del Capítulo 3 del Título IV de la Ley de Solidaridad Social y Reactivación Productiva en el Marco de la Emergencia Pública N° 27.541 y sus modificatorias, de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, de la ley N° 22.250 y su modificatoria y de la Ley del Régimen de Trabajo Agrario N° 26.727 y sus modificatorias, y en tanto se cumplimenten los requisitos establecidos en el presente Título.",
  art157:
    "Los empleadores comprendidos en el presente régimen gozarán de los beneficios previstos en este Título, por cada nueva incorporación de trabajadores, en tanto cada trabajador incorporado: a) No haya contado con una relación laboral registrada al 10 de diciembre de 2025; o b) Previo al mes de alta laboral, hubiera estado desempleado en los últimos seis (6) meses; o c) Hubiera estado inscripto en el Régimen Simplificado para Pequeños Contribuyentes; o d) Su último empleo haya sido bajo relación de dependencia en el sector público nacional, provincial, municipal o de la Ciudad Autónoma de Buenos Aires.",
  art158:
    "Aquellos que adquieran el carácter de empleador a partir del 10 de diciembre de 2025, inclusive, podrán aplicar las condiciones del presente régimen, hasta el máximo de trabajadores que determine la reglamentación, el que no podrá ser superior al ochenta por ciento (80%) de la nómina de trabajadores.",
  art159:
    "Por las nuevas relaciones laborales dadas de alta en el marco del presente régimen, el empleador deberá ingresar las alícuotas previstas para el régimen general de contribuciones patronales, tomando en cuenta las siguientes adecuaciones para los subsistemas que se mencionan seguidamente, independientemente de que el empleador encuadre en el inciso a) o b) del artículo 19 de la Ley de Solidaridad Social y Reactivación Productiva en el Marco de la Emergencia Pública N° 27.541 y sus modificatorias: a) Una alícuota del dos por ciento (2%) total en concepto de contribuciones patronales con destino al Sistema Integrado Previsional Argentino (SIPA), al Fondo Nacional de Empleo y al Régimen de Asignaciones Familiares, correspondientes a los primeros cuarenta y ocho (48) meses contados a partir del mes de inicio de la nueva relación laboral, inclusive; b) Una alícuota del tres por ciento (3%) con destino al Subsistema de Seguridad Social regido por la ley 19.032 (INSSJP), correspondiente a los primeros cuarenta y ocho (48) meses contados a partir del mes de inicio de la nueva relación laboral, inclusive. Quedan excluidas del tratamiento previsto en la presente norma las alícuotas adicionales previstas en regímenes previsionales diferenciales y/o especiales de la seguridad social.",
  art160:
    "El empleador no podrá hacer uso del beneficio previsto en este Título, con relación a los trabajadores que hayan sido declarados en el Régimen General de la Seguridad Social y luego de producido el distracto laboral, cualquiera fuese su causa, sean reincorporados por el mismo empleador dentro de los doce (12) meses, contados a partir de la fecha de la desvinculación. Quedan excluidos del beneficio dispuesto en este Título los empleadores que: a) Figuren en el Registro Público de Empleadores con Sanciones Laborales (REPSAL), creado por la Ley de Promoción del Trabajo Registrado y Prevención del Fraude Laboral N° 26.940 y sus modificaciones, por el tiempo que permanezcan en ese registro; y/o b) Incurran en prácticas de uso abusivo del beneficio establecido por el presente Título. Se entiende por prácticas de uso abusivo el hecho de producir sustituciones de personal bajo cualquier figura o el cese como empleador y la constitución de una nueva figura como tal, ya sea a través de las mismas o distintas personas humanas o jurídicas, así como también cualquier otro supuesto que establezca la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía. La exclusión se producirá en forma automática desde el momento en que ocurra cualquiera de las causales indicadas en los incisos a) y b) de este artículo.",
  art161:
    "El incumplimiento de las obligaciones previstas en este Título o el acaecimiento de las situaciones indicadas en el artículo anterior, producirá el decaimiento de los beneficios, debiendo el empleador, por las alícuotas diferenciales de contribuciones patronales del artículo 159, ingresar las contribuciones con destino a la seguridad social no abonadas por haberse acogido al régimen, más los intereses y sanciones que pudieran corresponder, en los términos y condiciones que, a esos efectos, establezca la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía.",
  art162:
    "El beneficio establecido en este Título es optativo para el empleador, por lo que la falta de ejercicio de dicha opción, a partir del inicio de la nueva relación laboral, obstará a que pueda hacer uso retroactivo del beneficio por el o los períodos en que no lo hubiese gozado.",
  art163:
    "El tratamiento especial establecido en este Título operará de forma automática al momento de darse de alta la nueva relación laboral, en los términos y condiciones que a esos efectos establezca la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía.",
  art164:
    "Las personas que sean contratadas a partir de la entrada en vigencia de la presente ley, y se encuentren gozando de planes y/o programas de empleo y/o de asistencia social -contributivas y no contributivas- instrumentados por el Ministerio de Capital Humano, continuarán percibiendo dichas prestaciones, en la medida que cumplan con los requisitos aplicables a los mismos, por el plazo máximo de hasta un (1) año desde la registración de la relación laboral, en carácter de subsidio a su nueva ocupación y formalidad laboral.",
  ley27541Art19:
    "Establ\u00e9cense las al\u00edcuotas que se describen a continuaci\u00f3n, correspondientes a las contribuciones patronales sobre la n\u00f3mina salarial con destino a los subsistemas de Seguridad Social regidos por las leyes 19.032 (INSSJP), 24.013 (Fondo Nacional de Empleo), 24.241 (Sistema Integrado Previsional Argentino) y 24.714 (R\u00e9gimen de Asignaciones Familiares), a saber: a) Veinte con cuarenta cent\u00e9simos (20,40%) para los empleadores pertenecientes al sector privado cuya actividad principal encuadre en el sector \u00abServicios\u00bb o en el sector \u00abComercio\u00bb, de acuerdo con lo dispuesto en la resoluci\u00f3n de la Secretar\u00eda de Emprendedores y de la Peque\u00f1a y Mediana Empresa N\u00b0 220 del 12 de abril de 2019 y su modificatoria, o la que en el futuro la reemplace, siempre que sus ventas totales anuales superen, en todos los casos, los l\u00edmites para la categorizaci\u00f3n como empresa mediana tramo 2, efectuado por el \u00f3rgano de aplicaci\u00f3n pertinente, con excepci\u00f3n de los comprendidos en las leyes 23.551, 23.660 y 23.661; b) Dieciocho por ciento (18%) para los restantes empleadores pertenecientes al sector privado no incluidos en el inciso anterior.",
  ley27541Art22:
    "De la base imponible sobre la que corresponda aplicar la al\u00edcuota prevista en el primer p\u00e1rrafo del art\u00edculo 19, se detraer\u00e1 mensualmente, por cada uno de los trabajadores, un importe de pesos siete mil tres con sesenta y ocho centavos ($ 7.003,68) en concepto de remuneraci\u00f3n bruta.",
  ley27541Art23:
    "Adicionalmente a la detracci\u00f3n indicada en el art\u00edculo anterior, los empleadores que tengan una n\u00f3mina de hasta veinticinco (25) empleados gozar\u00e1n de una detracci\u00f3n de pesos diez mil ($ 10.000) mensual, aplicable sobre la totalidad de la base imponible precedentemente indicada.",
  art217Vigencia:
    "Salvo disposici\u00f3n en contrario los art\u00edculos de la presente ley entrar\u00e1n en vigencia a partir de su publicaci\u00f3n en el Bolet\u00edn Oficial.",
};

/** Art. 157: las cuatro puertas de entrada. Alcanza con UNA (la norma las une con \u00abo\u00bb). */
export type PuertaRifl = { inciso: string; texto: string };

export const PUERTAS_ART157: PuertaRifl[] = [
  {
    inciso: "a)",
    texto:
      "No haber contado con una relaci\u00f3n laboral registrada al 10 de diciembre de 2025.",
  },
  {
    inciso: "b)",
    texto:
      "Haber estado desempleado en los \u00faltimos seis (6) meses previos al mes del alta laboral.",
  },
  {
    inciso: "c)",
    texto:
      "Haber estado inscripto en el R\u00e9gimen Simplificado para Peque\u00f1os Contribuyentes (monotributo).",
  },
  {
    inciso: "d)",
    texto:
      "Que su \u00faltimo empleo haya sido en relaci\u00f3n de dependencia en el sector p\u00fablico nacional, provincial, municipal o de la Ciudad Aut\u00f3noma de Buenos Aires.",
  },
];

/** Art. 160: los portazos. Cada uno tumba el beneficio, y el segundo lo hace en forma autom\u00e1tica. */
export const EXCLUSIONES_ART160: string[] = [
  "El trabajador fue declarado en el R\u00e9gimen General, se produjo el distracto y el MISMO empleador lo reincorpora dentro de los doce (12) meses de la desvinculaci\u00f3n.",
  "El empleador figura en el REPSAL (Ley 26.940), por todo el tiempo que permanezca en ese registro.",
  "El empleador incurre en uso abusivo del beneficio: sustituir personal bajo cualquier figura, o cesar como empleador y constituir una figura nueva. La exclusi\u00f3n \u00abse producir\u00e1 en forma autom\u00e1tica\u00bb.",
];

export type FuenteRifl = { nombre: string; url: string; detalle: string };

export const RIFL_FUENTES: { consultadoEl: string; lista: FuenteRifl[] } = {
  consultadoEl: "2026-08-21",
  lista: [
    {
      nombre: "Ley 27.802 \u2014 Ley de Modernizaci\u00f3n Laboral (B.O. 6/3/2026), texto oficial en InfoLEG",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "T\u00edtulo XX \u00abR\u00e9gimen de Incentivo a la Formalizaci\u00f3n Laboral (RIFL)\u00bb, arts. 156 a 164: la ventana de un a\u00f1o del art. 156, las cuatro puertas del art. 157, las al\u00edcuotas del 2% y 3% por 48 meses del art. 159, las exclusiones del art. 160 y el car\u00e1cter optativo y no retroactivo del art. 162. El art. 217 fija la vigencia de la ley.",
    },
    {
      nombre: "Ley 27.541 \u2014 texto ACTUALIZADO (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/333564/texact.htm",
      detalle:
        "Art. 19: las al\u00edcuotas del r\u00e9gimen general para los cuatro subsistemas que el RIFL adecua (20,40% inc. a y 18% inc. b). Art. 22: la detracci\u00f3n mensual de $ 7.003,68 por trabajador y la de $ 17.509,20 que \u00abno sufrir\u00e1 actualizaci\u00f3n alguna\u00bb. Art. 23: la detracci\u00f3n adicional de $ 10.000 para n\u00f3minas de hasta 25 empleados, aplicable sobre la base TOTAL.",
    },
  ],
};
