import { GRAMATICA } from "../gramatica";
import { formaMk, pluralMk } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.mk;

// Macedonio (ADR 0002, D36): 2.ª del plural con «вие» en minúscula; el país va con GRAMATICA.mk y los
// números con pluralMk (forma numérica de los masculinos: «3 документа»).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Вие сте ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} со важечки официјални вредности.`,
    ultimoDato: "Последна внесена вредност",
    ir: (pais) => `Кон калкулаторите ${g.para(pais)}`,
    otro: "Изберете друга држава",
    argentina: "Вашите калкулатори се на calcular.ar, со официјалните податоци на Аргентина.",
    argentinaIr: "Кон calcular.ar",
    neutroTitulo: (paises) => `${pluralMk(paises, "држава", "држави")}, секоја со свои закони и своја валута`,
    neutroTexto: "Секој ден ги проверуваме официјалните извори.",
    neutroIr: "Видете ги државите",
  },
  selector: {
    buscar: "Најдете држава",
    sinResultados: (q) => `Нема држава што одговара на „${q}“`,
    ubicacion: "Моментална локација",
    mismaCalculadora: "Истиот калкулатор",
    paises: "Држави",
  },
  aviso: { mismaCalculadora: (pais) => `Пресметајте со податоците ${g.para(pais)}` },
  vivo: {
    titulo: "Официјални податоци што се ажурираат автоматски",
    vigilado: "Автоматски процес секој ден ги проверува официјалните извори. Промените во правилата се појавуваат по нашата проверка.",
    sinVigilar: "Секоја вредност има официјален извор и датум на нашата проверка.",
    verificado: "Последна проверка на правилата",
    automatico: "Последна автоматска вредност",
    fuentes: "Официјални извори",
    nFuentes: (n) => pluralMk(n, "официјален документ", "официјални документа"),
    verFuentes: "Видете ги изворите",
    verNovedades: "Видете ги ажурирањата",
    hoy: "денес",
    ayer: "вчера",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Податоците се проверени со официјалниот извор на ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: ажурирано ${cuando}, последна вредност од: ${organismo}.`,
    diario: "Секој ден автоматски ги проверуваме официјалните извори.",
    actualizado: "Ажурирано",
  },
  novedades: {
    pildora: "Ажурирања",
    titulo: (pais) => `Што се промени во официјалните податоци ${g.para(pais)}`,
    acento: "на денот на промената",
    bajada: "Овде е запишана секоја нова вредност што влегува во калкулаторите: што се променило, од кога важи и од каде доаѓа.",
    ultimoCambio: "Последна промена",
    revision: "Проверка на изворите",
    diaria: "Секој ден",
    porNorma: "При секое ново правило",
    siguiendo: "Извори што ги следиме",
    masOrganismos: (n) => `и уште ${n}`,
    proximos: "Објавено, наскоро влегува во сила",
    proximosTexto: "Официјални вредности што се веќе внесени и почнуваат да важат во следните денови.",
    registro: "Дневник на промените",
    rss: "Следете преку RSS",
    vacio: "Засега нема запишани промени за оваа држава.",
    etiqueta: { editorial: "Правило", dato: "Нова вредност", proximo: "Наскоро", serie: "Автоматски", revision: "Проверка" },
    rige: (fecha) => `Во сила од ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Во сила од ${desde} до ${hasta}`,
    antes: (valor, fecha) => `Претходно: ${valor} (${fecha})`,
    revisados: (n) => `Проверивме со официјалниот извор: ${pluralMk(n, "вредност", "вредности")}`,
    revisadosTexto: (organismos) => `Важечките вредности се потврдени според изворите: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Видете ја вредноста" : `Видете ${pluralMk(n, "вредност", "вредности")}`),
    calculadoras: "Се користат во",
    rango: (min, max, zonas) => `од ${min} до ${max} според регионот (${pluralMk(zonas, "регион", "региона")})`,
    tabla: (filas) => `табела: ${pluralMk(filas, "опсег", "опсега")}`,
    valores: (n) => `${n} ${formaMk(n, "вредност", "вредности")}`,
    pasosTitulo: "Како податоците остануваат ажурни",
    pasos: [
      { titulo: "Институцијата објавува", texto: "Во официјалниот извор се појавува пропис, индекс или девизен курс." },
      { titulo: "Проверка пред употреба", texto: "Индексите и курсевите доаѓаат автоматски, со проверка на границите. Правилата ги внесуваме со официјалниот документ пред нас." },
      { titulo: "Калкулаторите се ажурираат", texto: "Калкулаторите преминуваат на новата вредност, а промената се запишува овде заедно со изворот." },
    ],
    feedTitulo: (pais) => `Ажурирања ${g.para(pais)} во CalcularYa`,
    feedSubtitulo: (pais) => `Промени во официјалните податоци што ги користат калкулаторите ${g.para(pais)}, со датумите на влегување во сила и изворите.`,
  },
};

export const mk: Diccionario<TextosInicio> = { base };
