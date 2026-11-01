import { GRAMATICA } from "./gramatica";
import { pluralBg } from "./plural";
import type { Diccionario } from "./resolver";
import type { TextosSitio } from "./tipos";

const g = GRAMATICA.bg;
const MUNDO = "Международно издание";

// Búlgaro: un solo registro para la web, el de los bancos y los servicios (ДСК, НАП). Cortesía con la
// 2.ª del plural y «Вие», «Ви», «Вашата» con mayúscula, como «Банкиране за Вашия бизнес» en dskbank.bg.
// Nunca «ти». Los botones van en imperativo cortés o con el sustantivo («Изчислете», «Изберете
// държава»). Comillas „ “, sin ы, э ni ё. Los mercados van con trato "usted" y el diccionario se
// escribe en base (ADR 0002, D24). El nombre del país pasa por GRAMATICA.bg (artículo pospuesto,
// «в», «във» y «на»); los sustantivos masculinos detrás de un número van en forma numérica
// («2 калкулатора»).
const base: TextosSitio = {
  marca: { nombre: "CalcularYa", lema: "Калкулатори с официални данни" },
  saltar: "Към съдържанието",
  header: {
    inicio: "Начало",
    elegirPais: "Изберете държава",
    paisActual: (pais) => `Държава: ${pais}`,
    cerrar: "Затваряне",
    todos: "Всички държави",
    latinoamerica: MUNDO,
  },
  footer: {
    paises: "Държави",
    sitio: "CalcularYa",
    fuentes: "Официални източници",
    novedades: "Актуализации",
    privacidad: "Поверителност",
    terminos: "Условия за ползване",
    contacto: "Контакти",
    sobre: "За нас",
    argentina: "В Аржентина ли сте? Вашите калкулатори са на calcular.ar",
    descargo: "Резултатите са ориентировъчни. Преди важно решение ги проверете в съответната институция или при специалист.",
    derechos: (anio) => `© ${anio} CalcularYa`,
  },
  sello: {
    titulo: "Актуални официални данни",
    verificado: (organismos, fecha) => `Данните са сверени с източниците: ${organismos}. Актуализирано на ${fecha}.`,
    serie: (nombre, organismo, fecha) => `${nombre} се обновява автоматично по данни от: ${organismo}. Последна стойност: ${fecha}.`,
    verTodas: "Вижте всички източници",
  },
  calculadora: {
    comoSeCalcula: "Как се изчислява",
    ejemplo: "Пример",
    faq: "Често задавани въпроси",
    glosario: "Термини",
    relacionadas: "Други калкулатори",
    otrosPaises: "Същото изчисление в други държави",
  },
  global: {
    eyebrow: "Официални данни за всяка държава",
    titulo: "Калкулатори за работа, пари и всекидневни сметки с данните на Вашата държава",
    bajada: "Заплата, кредити, данъци, дати и още много. Когато резултатът зависи от правило, числото идва от официален източник, с дата и връзка, за да можете да го проверите.",
    elegir: "Изберете своята държава",
    calculadoras: (n) => pluralBg(n, "калкулатор", "калкулатора"),
    vacio: "Добавяме нови държави. Заповядайте отново след малко.",
    promesaTitulo: "Как работим",
    promesas: [
      { titulo: "Официални числа с източник", texto: "До всяка стойност стоят институцията, която я публикува, връзка към нея и датата на нашата проверка." },
      { titulo: "Винаги актуално", texto: "Когато една стойност се промени, калкулаторът се променя с нея. Всяка промяна е записана в актуализациите." },
      { titulo: "Безплатно и без регистрация", texto: "Изчислението се извършва във Вашия браузър. Не искаме лични данни." },
    ],
  },
  pais: {
    eyebrow: "Актуални официални данни",
    titulo: (pais) => `Калкулатори ${g.para(pais)}`,
    bajada: (pais) => `Със стойностите, които важат ${g.en(pais)}, източника на всяка от тях и датата на нашата проверка.`,
    novedades: "Последни актуализации",
    verNovedades: "Вижте всички актуализации",
    sinCalculadoras: "Засега няма калкулатори за тази държава.",
    descripcion: (pais) => `Калкулатори за заплата, данъци, кредити, спестявания, здраве, дати и дом ${g.en(pais)}, с действащата официална стойност и нейния източник.`,
    irASeccion: "Към раздела",
  },
  fuentes: {
    titulo: (pais) => `Източници и данни ${g.para(pais)}`,
    bajada: "Всяка стойност, която калкулаторите използват, с датите на действие и връзка към официалния източник.",
    vigente: "Действаща стойност",
    desde: "От",
    hasta: "До",
    fuente: "Източник",
    verificado: "Проверено",
    region: "Област",
    series: "Стойности, които се обновяват автоматично",
    ultimoDato: "Последна стойност",
    proximo: (valor, fecha) => `Вече е публикувана стойност от ${fecha}: ${valor}.`,
    sinVerificar: "Към днешна дата няма проверена стойност",
    tramos: (n) => `Таблица: ${pluralBg(n, "диапазон", "диапазона")}`,
    description: (pais) => `Официалните данни ${g.para(pais)}, които калкулаторите използват: действаща стойност, дата на влизане в сила, източник и дата на проверка.`,
  },
  novedades: {
    titulo: (pais) => `Актуализации ${g.para(pais)}`,
    bajada: "Промените в правилата, които калкулаторите използват, с датата на влизане в сила.",
    vigenteDesde: (fecha) => `В сила от ${fecha}`,
    vacio: "Засега няма актуализации за тази държава.",
    description: (pais) => `Промени в минималната заплата, осигуровките и други правила ${g.en(pais)}, с датата на влизане в сила и официалния източник.`,
  },
  avisoPais: {
    texto: (pais) => `Изглежда, че сте ${g.en(pais)}.`,
    ir: (pais) => `Вижте калкулаторите ${g.para(pais)}`,
    cerrar: "Затваряне на съобщението",
  },
  noEncontrada: {
    titulo: "Не намерихме тази страница",
    texto: "Възможно е адресът да е сгрешен или страницата вече да не съществува.",
    volver: "Към началната страница",
    paises: "Или изберете държава",
  },
  categorias: {
    sueldo: "Заплата и плащания",
    fin: "Прекратяване на договор",
    impuestos: "Осигуровки и данъци",
    dinero: "Пари и индекси",
    finanzas: "Кредити, спестявания и инвестиции",
    negocio: "Бизнес и самостоятелна заетост",
    calculos: "Бързи сметки",
    fechas: "Дати и възраст",
    salud: "Здраве и форма",
    hogar: "Дом, автомобил и ремонт",
    familia: "Семейство и бит",
    otras: "Други калкулатори",
  },
  migas: { inicio: "Начало", etiqueta: "Вие сте тук" },
  seo: {
    tituloGlobal: "CalcularYa: безплатни калкулатори с официални данни",
    descripcionGlobal: "Безплатни калкулатори за заплата, кредити, данъци и още много за всяка държава, с действащата официална стойност и нейния източник.",
    tituloPais: (pais, anio) => [
      `Калкулатори за заплата и данъци ${g.en(pais)} ${anio}`,
      `Калкулатори ${g.para(pais)} ${anio}`,
      `Калкулатори ${g.para(pais)}`,
    ],
    tituloFuentes: (pais) => [`Действащи официални данни ${g.para(pais)}: източници и дати`, `Източници и данни ${g.para(pais)}`],
    tituloNovedades: (pais, anio) => [
      `Промени в заплатите и данъците ${g.en(pais)} ${anio}`,
      `Актуализации ${g.para(pais)} ${anio}`,
      `Актуализации ${g.para(pais)}`,
    ],
  },
  og: {
    datosOficiales: "Официални данни с източници",
    actualizado: (fecha) => `Актуализирано на ${fecha}`,
    gratis: "Безплатно и без регистрация",
    paises: (n) => pluralBg(n, "държава", "държави"),
  },
  shell: {
    irAlInicio: "към началото",
    menu: { trabajo: "Заплата и работа", impuestos: "Данъци", dinero: "Пари и индекси", vida: "Всекидневие", novedades: "Актуализации", planillas: "Таблици в Excel" },
    encabezado: {
      principal: "Главно меню",
      buscar: "Търсене",
      buscarCalculadora: "Намерете калкулатор",
      abrirMenu: "Отваряне на менюто",
      cerrarMenu: "Затваряне на менюто",
      menu: "Меню",
      todas: "Всички калкулатори",
      pieCajon: "Данни от официални източници · Направено в Аржентина",
    },
    buscador: {
      dialogo: "Търсене в CalcularYa",
      pregunta: "Какво искате да изчислите?",
      recientes: "Продължете оттам, докъдето стигнахте",
      masUsado: "Най-използвани",
      sinResultados: "Няма резултати за „{q}“",
      sugerencia: "Опитайте с друга дума, например „заплата“, „кредит“ или „данък“.",
      verTodas: "Вижте всички калкулатори",
      borrar: "Изчистване на търсенето",
      cerrar: "Затваряне",
      cerrarBuscador: "Затваряне на търсенето",
      moverte: "за придвижване",
      abrir: "за отваряне",
      desdeCualquier: "от всяка страница",
      resultados: "Резултати",
      resultado: "резултат",
      resultadosPlural: "резултата",
    },
    paises: { titulo: "Държава", cambiar: "Смяна на държавата" },
    pie: {
      bajada: (lugar) =>
        `Ясни калкулатори ${lugar === MUNDO ? "за всяка държава" : g.para(lugar)}. Всяко число идва от официалния документ, който го определя, и носи датата на нашата проверка.`,
      todas: "Всички калкулатори",
      cuenta: "Вашият профил",
      cuentaNota: "Не е задължителен. С него можете да запазвате изчисленията си и да ги имате подръка.",
      hecho: "Направено в Аржентина",
      escrito: "Написано и проверено от",
    },
  },
};

export const bg: Diccionario<TextosSitio> = { base };
