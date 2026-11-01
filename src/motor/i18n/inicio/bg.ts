import { GRAMATICA } from "../gramatica";
import { formaBg, pluralBg } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.bg;

// Búlgaro (ADR 0002, D24): 2.ª del plural con «Вие» en mayúscula; el país va con GRAMATICA.bg y los
// números con pluralBg (forma numérica de los masculinos: «3 документа»).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Вие сте ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} с действащи официални стойности.`,
    ultimoDato: "Последна заредена стойност",
    ir: (pais) => `Към калкулаторите ${g.para(pais)}`,
    otro: "Изберете друга държава",
    argentina: "Вашите калкулатори са на calcular.ar, с официалните данни на Аржентина.",
    argentinaIr: "Към calcular.ar",
    neutroTitulo: (paises) => `${pluralBg(paises, "държава", "държави")}, всяка със свои закони и своя валута`,
    neutroTexto: "Всеки ден проверяваме официалните източници.",
    neutroIr: "Вижте държавите",
  },
  selector: {
    buscar: "Намерете държава",
    sinResultados: (q) => `Няма държава, която да отговаря на „${q}“`,
    ubicacion: "Текущо местоположение",
    mismaCalculadora: "Същият калкулатор",
    paises: "Държави",
  },
  aviso: { mismaCalculadora: (pais) => `Изчислете с данните ${g.para(pais)}` },
  vivo: {
    titulo: "Официални данни, които се обновяват автоматично",
    vigilado: "Автоматичен процес проверява официалните източници всеки ден. Промените в правилата се появяват след нашата проверка.",
    sinVigilar: "Всяка стойност има официален източник и дата на нашата проверка.",
    verificado: "Последна проверка на правилата",
    automatico: "Последна автоматична стойност",
    fuentes: "Официални източници",
    nFuentes: (n) => pluralBg(n, "официален документ", "официални документа"),
    verFuentes: "Вижте източниците",
    verNovedades: "Вижте актуализациите",
    hoy: "днес",
    ayer: "вчера",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Данните са сверени с официалния източник на ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: актуализирано ${cuando}, последна стойност от: ${organismo}.`,
    diario: "Всеки ден проверяваме автоматично официалните източници.",
    actualizado: "Актуализирано",
  },
  novedades: {
    pildora: "Актуализации",
    titulo: (pais) => `Какво се промени в официалните данни ${g.para(pais)}`,
    acento: "в деня на промяната",
    bajada: "Тук е записана всяка нова стойност, която влиза в калкулаторите: какво се е променило, от кога важи и откъде идва.",
    ultimoCambio: "Последна промяна",
    revision: "Проверка на източниците",
    diaria: "Всеки ден",
    porNorma: "При всяко ново правило",
    siguiendo: "Източници, които следим",
    masOrganismos: (n) => `и още ${n}`,
    proximos: "Публикувано, скоро влиза в сила",
    proximosTexto: "Официални стойности, които вече са заредени и започват да важат през следващите дни.",
    registro: "Дневник на промените",
    rss: "Следете чрез RSS",
    vacio: "Засега няма записани промени за тази държава.",
    etiqueta: { editorial: "Правило", dato: "Нова стойност", proximo: "Скоро", serie: "Автоматично", revision: "Проверка" },
    rige: (fecha) => `В сила от ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `В сила от ${desde} до ${hasta}`,
    antes: (valor, fecha) => `Преди: ${valor} (${fecha})`,
    revisados: (n) => `Сверихме с официалния източник: ${pluralBg(n, "стойност", "стойности")}`,
    revisadosTexto: (organismos) => `Действащите стойности са потвърдени по източниците: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Вижте стойността" : `Вижте ${pluralBg(n, "стойност", "стойности")}`),
    calculadoras: "Използват се в",
    rango: (min, max, zonas) => `от ${min} до ${max} според областта (${pluralBg(zonas, "област", "области")})`,
    tabla: (filas) => `таблица: ${pluralBg(filas, "диапазон", "диапазона")}`,
    valores: (n) => `${n} ${formaBg(n, "стойност", "стойности")}`,
    pasosTitulo: "Как данните остават актуални",
    pasos: [
      { titulo: "Институцията публикува", texto: "В официалния източник се появява нормативен акт, индекс или валутен курс." },
      { titulo: "Проверка преди употреба", texto: "Индексите и курсовете идват автоматично, с проверка на границите. Правилата въвеждаме с официалния документ пред нас." },
      { titulo: "Калкулаторите се обновяват", texto: "Калкулаторите преминават към новата стойност, а промяната се записва тук заедно с източника." },
    ],
    feedTitulo: (pais) => `Актуализации ${g.para(pais)} в CalcularYa`,
    feedSubtitulo: (pais) => `Промени в официалните данни, които калкулаторите ${g.para(pais)} използват, с датите на влизане в сила и източниците.`,
  },
};

export const bg: Diccionario<TextosInicio> = { base };
