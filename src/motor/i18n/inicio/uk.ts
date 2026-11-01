import { GRAMATICA } from "../gramatica";
import { formaUk, pluralUk } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.uk;

// Ucraniano (ADR 0002, D15): «ви» con minúscula y las formas corteses; el país se declina con
// GRAMATICA.uk y los números con pluralUk (one/few/many).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Ви ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} з чинними офіційними значеннями.`,
    ultimoDato: "Останнє завантажене значення",
    ir: (pais) => `До калькуляторів ${g.para(pais)}`,
    otro: "Обрати іншу країну",
    argentina: "Ваші калькулятори на calcular.ar, з офіційними даними Аргентини.",
    argentinaIr: "Перейти на calcular.ar",
    neutroTitulo: (paises) => `${pluralUk(paises, "країна", "країни", "країн")}, у кожній свої закони і своя валюта`,
    neutroTexto: "Ми щодня перевіряємо офіційні джерела.",
    neutroIr: "Переглянути країни",
  },
  selector: {
    buscar: "Знайдіть країну",
    sinResultados: (q) => `Немає країни, що відповідає запиту «${q}»`,
    ubicacion: "Поточне місцезнаходження",
    mismaCalculadora: "Той самий калькулятор",
    paises: "Країни",
  },
  aviso: { mismaCalculadora: (pais) => `Розрахуйте з даними ${g.de(pais)}` },
  vivo: {
    titulo: "Офіційні дані, що оновлюються автоматично",
    vigilado: "Автоматичний процес щодня перевіряє офіційні джерела. Зміни правил зʼявляються після нашої перевірки.",
    sinVigilar: "Кожне значення має офіційне джерело і дату нашої перевірки.",
    verificado: "Остання перевірка правил",
    automatico: "Останнє автоматичне значення",
    fuentes: "Офіційні джерела",
    nFuentes: (n) => pluralUk(n, "офіційний документ", "офіційні документи", "офіційних документів"),
    verFuentes: "Переглянути джерела",
    verNovedades: "Переглянути оновлення",
    hoy: "сьогодні",
    ayer: "учора",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Дані звірено з офіційним джерелом ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: оновлено ${cuando}, останнє значення від установи ${organismo}.`,
    diario: "Ми щодня автоматично перевіряємо офіційні джерела.",
    actualizado: "Оновлено",
  },
  novedades: {
    pildora: "Оновлення",
    titulo: (pais) => `Що змінилося в офіційних даних ${g.para(pais)}`,
    acento: "у день зміни",
    bajada: "Тут записано кожне нове значення, яке потрапляє в калькулятори: що змінилося, коли набирає чинності і звідки взялося.",
    ultimoCambio: "Остання зміна",
    revision: "Перевірка джерел",
    diaria: "Щодня",
    porNorma: "З кожним новим правилом",
    siguiendo: "Джерела, за якими ми стежимо",
    masOrganismos: (n) => `і ще ${n}`,
    proximos: "Опубліковано, скоро набуде чинності",
    proximosTexto: "Офіційні значення, які вже завантажено і які почнуть діяти найближчими днями.",
    registro: "Журнал змін",
    rss: "Стежити через RSS",
    vacio: "Для цієї країни змін поки не записано.",
    etiqueta: { editorial: "Правило", dato: "Нове значення", proximo: "Незабаром", serie: "Автоматично", revision: "Перевірка" },
    rige: (fecha) => `Діє з ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Діє з ${desde} до ${hasta}`,
    antes: (valor, fecha) => `Раніше: ${valor} (${fecha})`,
    revisados: (n) => `Ми звірили з офіційним джерелом ${pluralUk(n, "значення", "значення", "значень")}`,
    revisadosTexto: (organismos) => `Чинні значення підтверджено за джерелами: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Переглянути значення" : `Переглянути ${pluralUk(n, "значення", "значення", "значень")}`),
    calculadoras: "Використовують",
    rango: (min, max, zonas) => `від ${min} до ${max} залежно від регіону (${pluralUk(zonas, "регіон", "регіони", "регіонів")})`,
    tabla: (filas) => `таблиця: ${pluralUk(filas, "діапазон", "діапазони", "діапазонів")}`,
    valores: (n) => `${n} ${formaUk(n, "значення", "значення", "значень")}`,
    pasosTitulo: "Як дані залишаються актуальними",
    pasos: [
      { titulo: "Установа публікує", texto: "В офіційному джерелі зʼявляється нормативний акт, індекс або курс валют." },
      { titulo: "Перевірка перед використанням", texto: "Індекси й курси надходять автоматично, з перевіркою меж. Правила ми вносимо, маючи перед собою офіційний документ." },
      { titulo: "Калькулятори оновлюються", texto: "Калькулятори переходять на нове значення, а зміна записується тут разом із джерелом." },
    ],
    feedTitulo: (pais) => `Оновлення ${g.para(pais)} на CalcularYa`,
    feedSubtitulo: (pais) => `Зміни офіційних даних, які використовують калькулятори ${g.para(pais)}, з датами набрання чинності й джерелами.`,
  },
};

export const uk: Diccionario<TextosInicio> = { base };
