// Ganancias para jubilados y pensionados: la deducción específica del art. 30 LIG (t.o. 2019).
//
// Los montos NO se copian acá: el haber mínimo sale de HABER_MINIMO_SERIE (generada y verificada
// contra ANSES por gen_jubilaciones.ts) y las deducciones personales de data/ganancias.ts. Si se
// transcribe un número acá, la página envejece un mes después sin que ningún check lo vea.
//
// LO QUE DECIDE EL CÁLCULO (leído en el texto actualizado de InfoLEG y en la RG 4003):
//   · La específica REEMPLAZA a los incisos a) y c) (no imponible + especial), no a todo el art. 30:
//     las cargas de familia del inciso b) se siguen restando encima.
//   · Rige sólo si supera a la suma de a) y c). Si no, quedan a) + c) apdo. 2 + la doceava parte.
//   · Se pierde con otros ingresos (de otra naturaleza) mayores a la ganancia no imponible anual, o
//     si hay que pagar Bienes Personales por algo más que la vivienda única.
//   · "La suma de los haberes mínimos" es mes a mes: el agente de retención suma el haber mínimo
//     vigente en cada mes transcurrido y lo multiplica por ocho (ISSyS, agente de retención oficial).
//     El aguinaldo SÍ tributa y la ley no suma un decimotercer haber mínimo: por eso en el año el
//     umbral cae un poco por debajo de 8 haberes mensuales. Eso es derivación nuestra y la página lo
//     dice así, no como texto de la norma.

import { HABER_MINIMO_SERIE } from "@/data/jubilaciones";

export const ANIO_JUBILADOS = 2026;

export const MULTIPLICADOR_ESPECIFICA = 8;

/** Haberes mínimos del año publicados hasta hoy, en orden. */
export function haberesMinimosDelAnio(anio = ANIO_JUBILADOS) {
  return HABER_MINIMO_SERIE.filter((m) => m.periodo.startsWith(`${anio}-`));
}

export const JUBILADOS_TEXTOS = {
  especifica:
    "Respecto de las rentas mencionadas en el inciso c) del artículo 82 de la presente, las deducciones previstas en los incisos a) y c) de este artículo, serán reemplazadas por una deducción específica equivalente a ocho (8) veces la suma de los haberes mínimos garantizados, definidos en el artículo 125 de la ley 24.241 y sus modificatorias y complementarias, siempre que esta última suma resulte superior a la suma de las deducciones antedichas.",
  otrosIngresos:
    "Lo dispuesto en el párrafo anterior no será de aplicación respecto de aquellos sujetos que perciban y/u obtengan ingresos de distinta naturaleza a los allí previstos superiores al monto previsto en el inciso a) de este artículo.",
  bienesPersonales:
    "Tampoco corresponderá esa deducción para quienes se encuentren obligados a tributar el Impuesto sobre los Bienes Personales, siempre y cuando esta obligación no surja exclusivamente de la tenencia de un inmueble para vivienda única.",
  apartado2: "Tres coma ocho (3,8) veces, cuando se trate de ganancias netas comprendidas en los incisos a), b) y c) del artículo 82 citado.",
  doceava:
    "Cuando corresponda la aplicación de la deducción especial indicada en el inciso c), apartado 2, de este artículo, se añadirá como deducción especial la doceava parte del total de deducciones resultantes de la suma de los incisos a), b) y c), apartado 2, de este artículo.",
  rg4003:
    "la deducción específica regulada en el quinto párrafo del artículo 30 de la ley del gravamen, equivalente a OCHO (8) veces la suma de haberes mínimos garantizados, procederá cuando los beneficiarios de las rentas mencionadas en el inciso c) del artículo 82 de la ley del gravamen no hubieran obtenido en el período fiscal que se liquida ingresos distintos a los allí previstos superiores a la ganancia no imponible anual",
  issysMensual:
    "cada mes se deben sumar los importes de los haberes mínimos garantizados que estuvieron vigentes en cada uno de los períodos mensuales transcurridos desde el inicio del año y multiplicarlos por ocho.",
  rg4003Sac:
    "Los agentes de retención deberán adicionar a la ganancia bruta de cada mes calendario, determinada conforme el Apartado A, y, en su caso, a las retribuciones no habituales previstas en el Apartado B, una doceava parte de la suma de tales ganancias en concepto de Sueldo Anual Complementario",
};

export const JUBILADOS_FUENTES = {
  consultadoEl: "22 de septiembre de 2026",
  lista: [
    {
      nombre: "Ley de Impuesto a las Ganancias (t.o. Decreto 824/2019), art. 30, texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
      detalle:
        "la deducción específica de ocho haberes mínimos, a qué deducciones reemplaza, cuándo se pierde y la doceava parte del apartado 2 (texto de la Ley 27.743).",
    },
    {
      nombre: "Resolución General AFIP 4003, texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/270000-274999/272231/texact.htm",
      detalle:
        "Anexo II, apartado E: las condiciones de la específica en el régimen de retención; apartado C: la doceava parte del aguinaldo que se suma cada mes.",
    },
    {
      nombre: "ISSyS (Chubut), agente de retención: Preguntas frecuentes sobre retenciones de Ganancias",
      url: "https://www.issys.gov.ar/wp-content/uploads/2024/08/Preguntas-Frecuentes-2024.pdf",
      detalle: "cómo acumula mes a mes la suma de los haberes mínimos un agente de retención previsional.",
    },
    {
      nombre: "ARCA: Deducciones personales art. 30 LIG (julio a diciembre 2026)",
      url: "https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/deducciones/documentos/Deducciones-personales-art-30-jul-dic-2026.pdf",
      detalle: "ganancia no imponible, cargas de familia y deducción especial del apartado 2.",
    },
    {
      nombre: "ANSES: serie oficial del haber mínimo garantizado (datos.gob.ar)",
      url: "https://apis.datos.gob.ar/series/api/series/?ids=58.1_MP_0_M_24&format=json&limit=5000&start_date=2024-01-01",
      detalle: "el haber mínimo de cada mes, que es la unidad de la deducción específica.",
    },
  ],
};
