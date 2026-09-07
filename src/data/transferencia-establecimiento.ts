// TRANSFERENCIA DEL ESTABLECIMIENTO — Título XI de la Ley de Contrato de Trabajo 20.744
// (arts. 225 a 230, t.o. Dec. 390/1976), leídos el 26/8/2026 en el texto actualizado de InfoLEG
// (id 25552).
//
// POR QUÉ ESTE ARCHIVO EXISTE (26/8/2026, s95): la Ley 27.802 sustituyó dos artículos del título
// —el 225 por su art. 46 y el 228 por su art. 47— y con ellos cambió QUIÉN RESPONDE cuando la
// empresa cambia de dueño. Lo que NO cambió es lo que más se pregunta (la antigüedad se conserva),
// y eso también hay que decirlo, porque es la mitad de la respuesta.
//
// ⚠️ MINA DE MAPEO (s95, para el próximo que use `tools/ley-mapa-reformas.ts`): esa herramienta
// atribuyó el art. 47 de la Ley 27.802 al **art. 227** de la LCT. Es falso: el art. 227 está
// INTACTO. La nota de sustitución que la herramienta ubicó cuelga del **art. 228**, que es largo y
// arranca después del 227 — el matcher se queda con el último encabezado que vio antes de la nota.
// Se verificó abriendo el `texact` y leyendo los dos artículos completos: el 227 no lleva nota, el
// 228 sí. Regla: **la nota pertenece al artículo cuyo TEXTO la precede, no al encabezado más
// cercano hacia arriba en la lista.** Antes de cosechar un artículo del inventario, confirmar la
// nota contra el texto del artículo, no contra la fila del inventario.
//
// LO QUE CAMBIÓ (y es todo lo mismo, leído en dos artículos):
//   · **Art. 225.** El texto anterior decía que en caso de transferencia «pasarán al sucesor o
//     adquirente TODAS las obligaciones emergentes del contrato de trabajo (…) aun aquéllas que se
//     originen con motivo de la misma», punto. El vigente le agrega cuatro palabras que lo cambian
//     todo: «**en los términos de lo estipulado por el artículo 228 de la presente ley**». El pase
//     de obligaciones dejó de ser incondicional y quedó atado a lo que diga el 228.
//   · **Art. 228.** Ahí está el fondo. El texto anterior hacía solidarios al transmitente y al
//     adquirente por las obligaciones «existentes a la época de la transmisión y que afectaren a
//     aquél» — sin excepciones. El vigente agrega dos: la deuda tiene que ser una «que debió o pudo
//     haber conocido a ese momento», y —textual— «**toda información oculta o viciada que no fuera
//     de conocimiento del adquirente luego de realizar los actos de DEBIDA DILIGENCIA para ello, lo
//     exime de responsabilidad solidaria alguna**». Es una defensa de due diligence dentro de la
//     LCT, que antes no existía.
//
// LO QUE ESO SIGNIFICA PARA EL TRABAJADOR, DICHO SIN EXAGERAR: el crédito no se extingue. Lo que
// puede desaparecer es **un deudor**. Si el adquirente prueba la debida diligencia y que la deuda
// estaba oculta, responde el transmitente — el mismo que vendió y puede ya no tener con qué. Para
// eso existía la solidaridad. Decir «ahora no cobrás» sería falso; decir «no cambió nada» también.
//
// LO QUE NO CAMBIÓ (tres artículos intactos, ninguno lleva nota de sustitución):
//   · **Art. 225, segunda oración:** «el trabajador conservará la antigüedad adquirida con el
//     transmitente y los derechos que de ella se deriven». Es la respuesta a la pregunta más
//     frecuente del tema, y la reforma no la tocó. Un «ingreso nuevo» a la fecha de la
//     transferencia no borra los años anteriores.
//   · **Art. 226:** el trabajador puede considerar extinguido el contrato si la transferencia le
//     causa un perjuicio apreciado con el criterio del art. 242, y el artículo enumera los casos a
//     ponderar (cambio del objeto de la explotación, alteración de funciones o cargo, separación
//     entre secciones o sucursales con disminución de la responsabilidad patrimonial).
//   · **Arts. 227 y 229:** el arrendamiento o cesión transitoria (con la obligación del propietario
//     al recuperar el establecimiento) y la cesión de personal sin establecimiento, que exige
//     aceptación expresa y por escrito del trabajador y mantiene la solidaridad de cedente y
//     cesionario.
//
// FUENTES: texto actualizado de la LCT en InfoLEG (id 25552) para los arts. 225 a 230; captura del
// Internet Archive del 15/12/2025 del MISMO texact para los textos anteriores de los arts. 225 y
// 228; texto oficial de la Ley 27.802 (id 423680) para sus arts. 46 y 47. Nunca una nota de prensa.

/** Fecha desde la que rigen los textos nuevos (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";

/** ISO de esa misma fecha. */
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la Ley 27.802 que sustituyó el art. 225 de la LCT. */
export const ARTICULO_SUSTITUYENTE_225 = 46;

/** Artículo de la Ley 27.802 que sustituyó el art. 228 de la LCT (NO el 227: ver la mina de arriba). */
export const ARTICULO_SUSTITUYENTE_228 = 47;

/** Los artículos del Título XI que la reforma NO tocó. */
export const ARTICULOS_INTACTOS = [226, 227, 229, 230] as const;

export const TRANSFERENCIA_TEXTOS = {
  art225Vigente:
    "Transferencia del establecimiento. En caso de transferencia por cualquier título del establecimiento, pasarán al sucesor o adquirente todas las obligaciones emergentes del contrato de trabajo que el transmitente tuviera con el trabajador al tiempo de la transferencia, aun aquéllas que se originen con motivo de la misma, en los términos de lo estipulado por el artículo 228 de la presente ley. El contrato de trabajo, en tales casos, continuará con el sucesor o adquirente, y el trabajador conservará la antigüedad adquirida con el transmitente y los derechos que de ella se deriven.",
  art225Anterior:
    "Transferencia del establecimiento. En caso de transferencia por cualquier título del establecimiento, pasarán al sucesor o adquirente todas las obligaciones emergentes del contrato de trabajo que el transmitente tuviera con el trabajador al tiempo de la transferencia, aun aquéllas que se originen con motivo de la misma. El contrato de trabajo, en tales casos, continuará con el sucesor o adquirente, y el trabajador conservará la antigüedad adquirida con el transmitente y los derechos que de ella se deriven.",
  art225Nota:
    "(Artículo sustituido por art. 46 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art226:
    "Situación de despido. El trabajador podrá considerar extinguido el contrato de trabajo si, con motivo de la transferencia del establecimiento, se le infiriese un perjuicio que, apreciado con el criterio del artículo 242, justificare el acto de denuncia. A tal objeto se ponderarán especialmente los casos en que, por razón de la transferencia, se cambia el objeto de la explotación, se alteran las funciones, cargo o empleo, o si mediare una separación entre diversas secciones, dependencia o sucursales de la empresa, de modo que se derive de ello disminución de la responsabilidad patrimonial del empleador.",
  art227:
    "Arrendamiento o cesión transitoria del establecimiento. Las disposiciones de los artículos 225 y 226 se aplican en caso de arrendamiento o cesión transitoria del establecimiento. Al vencimiento de los plazos de éstos, el propietario del establecimiento, con relación al arrendatario y en todos los demás casos de cesión transitoria, el cedente, con relación al cesionario, asumirá las mismas obligaciones del artículo 225, cuando recupere el establecimiento cedido precariamente.",
  art228Vigente:
    "Solidaridad. El transmitente y el adquirente de un establecimiento serán solidariamente responsables por las obligaciones laborales derivadas del contrato de trabajo existentes al momento de la transmisión y que afectaren al establecimiento que se transmite, que debió o pudo haber conocido a ese momento. Por cuanto, toda información oculta o viciada que no fuera de conocimiento del adquirente luego de realizar los actos de debida diligencia para ello, lo exime de responsabilidad solidaria alguna. Lo establecido precedentemente resulta aplicable ya sea que la transmisión se haya efectuado para surtir efectos en forma permanente o en forma transitoria. A los efectos previstos en esta norma se considerará adquirente a todo aquel que pasare a ser titular del establecimiento aun cuando lo fuese como arrendatario o como usufructuario o como tenedor a título precario o por cualquier otro modo. Lo establecido en el primer párrafo resulta aplicable con relación a las obligaciones emergentes del contrato de trabajo existente al tiempo de la restitución del establecimiento cuando la transmisión no estuviere destinada a surtir efectos permanentes y fuese de aplicación lo dispuesto en la última parte del artículo 227. De igual manera, será también de aplicación cuando el cambio de empleador fuese motivado por la transferencia de un contrato de locación de obra, de explotación u otro análogo, cualquiera sea la naturaleza y el carácter de los mismos.",
  art228Anterior:
    "Solidaridad. El transmitente y el adquirente de un establecimiento serán solidariamente responsables respecto de las obligaciones emergentes del contrato de trabajo existentes a la época de la transmisión y que afectaren a aquél. Esta solidaridad operará ya sea que la transmisión se haya efectuado para surtir efectos en forma permanente o en forma transitoria. A los efectos previstos en esta norma se considerará adquirente a toda aquel que pasare a ser titular del establecimiento aun cuando lo fuese como arrendatario o como usufructuario o como tenedor a título precario o por cualquier otro modo. La solidaridad, por su parte, también operará con relación a las obligaciones emergentes del contrato de trabajo existente al tiempo de la restitución del establecimiento cuando la transmisión no estuviere destinada a surtir efectos permanentes y fuese de aplicación lo dispuesto en la última parte del artículo 227. La responsabilidad solidaria consagrada por este artículo será también de aplicación cuando el cambio de empleador fuese motivado por la transferencia de un contrato de locación de obra, de explotación u otro análogo, cualquiera sea la naturaleza y el carácter de los mismos.",
  art228Nota:
    "(Artículo sustituido por art. 47 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art229:
    "Cesión del personal. La cesión del personal sin que comprenda el establecimiento, requiere la aceptación expresa y por escrito del trabajador. Aun cuando mediare tal conformidad, cedente y cesionario responden solidariamente por todas las obligaciones resultantes de la relación de trabajo cedida.",
  art230:
    "Transferencia a favor del Estado. Lo dispuesto en este título no rige cuando la cesión o transferencia se opere a favor del Estado.",
  /** La oración del art. 225 que la reforma NO tocó: la que contesta la pregunta más frecuente. */
  antiguedadQueSeConserva:
    "el trabajador conservará la antigüedad adquirida con el transmitente y los derechos que de ella se deriven",
  /** Las cuatro palabras que ataron el art. 225 al 228. */
  remisionNueva: "en los términos de lo estipulado por el artículo 228 de la presente ley",
  /** La defensa nueva del adquirente. */
  defensaDeDebidaDiligencia:
    "toda información oculta o viciada que no fuera de conocimiento del adquirente luego de realizar los actos de debida diligencia para ello, lo exime de responsabilidad solidaria alguna",
  /** La solidaridad tal como estaba escrita antes: sin excepciones. */
  solidaridadAnterior:
    "El transmitente y el adquirente de un establecimiento serán solidariamente responsables respecto de las obligaciones emergentes del contrato de trabajo existentes a la época de la transmisión y que afectaren a aquél.",
} as const;

/** Las tres formas en que puede cambiar el empleador dentro del Título XI. */
export type TipoOperacion = {
  id: "definitiva" | "transitoria" | "cesion-personal";
  etiqueta: string;
  articulo: number;
  conservaAntiguedad: boolean;
  nota: string;
};

export const TIPOS_OPERACION: TipoOperacion[] = [
  {
    id: "definitiva",
    etiqueta: "Transferencia definitiva del establecimiento (venta, fusión, sucesión)",
    articulo: 225,
    conservaAntiguedad: true,
    nota: "El contrato continúa con el adquirente y la antigüedad se conserva entera. El art. 228 hace solidarios al que vendió y al que compró, con la excepción de debida diligencia que la reforma agregó.",
  },
  {
    id: "transitoria",
    etiqueta: "Arrendamiento o cesión transitoria del establecimiento",
    articulo: 227,
    conservaAntiguedad: true,
    nota: "El art. 227 aplica las mismas reglas de los arts. 225 y 226, y agrega una que casi nadie recuerda: cuando el propietario o el cedente recupera el establecimiento, asume las obligaciones del art. 225 respecto del arrendatario o cesionario. El art. 227 no fue tocado por la reforma.",
  },
  {
    id: "cesion-personal",
    etiqueta: "Cesión del personal sin el establecimiento",
    articulo: 229,
    conservaAntiguedad: true,
    nota: "Es el único caso que requiere tu aceptación expresa y por escrito (art. 229). Y aunque la des, cedente y cesionario siguen respondiendo solidariamente por todas las obligaciones de la relación cedida: ese artículo tampoco fue tocado por la reforma.",
  },
];

export type FuenteTransferencia = { nombre: string; url: string; detalle: string };

export const TRANSFERENCIA_FUENTES: { consultadoEl: string; lista: FuenteTransferencia[] } = {
  consultadoEl: "2026-08-26",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Título XI completo (arts. 225 a 230). Los arts. 225 y 228 llevan nota de sustitución por los arts. 46 y 47 de la Ley 27.802; los arts. 226, 227, 229 y 230 no llevan ninguna: están intactos.",
    },
    {
      nombre:
        "Los arts. 225 y 228 antes de la sustitución — captura del texto oficial (Internet Archive)",
      url: "https://web.archive.org/web/20251215041122/https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "La misma página de InfoLEG capturada el 15 de diciembre de 2025, antes de la reforma. De ahí sale la solidaridad sin excepciones del art. 228 anterior y el art. 225 sin la remisión al 228.",
    },
    {
      nombre: "Ley 27.802 — texto oficial (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Sus arts. 46 y 47 son los que sustituyen los arts. 225 y 228 de la LCT. Las notas fijan la vigencia «a partir de su publicación en el Boletín Oficial».",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia. Una transferencia anterior a esa fecha se rige por el art. 228 viejo, con la solidaridad sin excepciones.",
    },
  ],
};
