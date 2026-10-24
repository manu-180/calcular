import { GRAMATICA } from "../gramatica";
import { formaRu, pluralRu } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.ru;

// Ruso (ADR 0002, D17): «вы» con minúscula y el imperativo cortés; el país se declina con
// GRAMATICA.ru y los números con pluralRu (one/few/many).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Вы ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} с действующими официальными значениями.`,
    ultimoDato: "Последнее загруженное значение",
    ir: (pais) => `К калькуляторам ${g.para(pais)}`,
    otro: "Выбрать другую страну",
    argentina: "Ваши калькуляторы на calcular.ar, с официальными данными Аргентины.",
    argentinaIr: "Перейти на calcular.ar",
    neutroTitulo: (paises) => `${pluralRu(paises, "страна", "страны", "стран")}, в каждой свои законы и своя валюта`,
    neutroTexto: "Мы каждый день проверяем официальные источники.",
    neutroIr: "Посмотреть страны",
  },
  selector: {
    buscar: "Найдите страну",
    sinResultados: (q) => `Нет страны, которая подходит под запрос «${q}»`,
    ubicacion: "Текущее местоположение",
    mismaCalculadora: "Тот же калькулятор",
    paises: "Страны",
  },
  aviso: { mismaCalculadora: (pais) => `Рассчитайте с данными ${g.de(pais)}` },
  vivo: {
    titulo: "Официальные данные, которые обновляются автоматически",
    vigilado: "Автоматический процесс каждый день проверяет официальные источники. Изменения правил появляются после нашей проверки.",
    sinVigilar: "У каждого значения есть официальный источник и дата нашей проверки.",
    verificado: "Последняя проверка правил",
    automatico: "Последнее автоматическое значение",
    fuentes: "Официальные источники",
    nFuentes: (n) => pluralRu(n, "официальный документ", "официальных документа", "официальных документов"),
    verFuentes: "Посмотреть источники",
    verNovedades: "Посмотреть обновления",
    hoy: "сегодня",
    ayer: "вчера",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Данные сверены с официальным источником ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: обновлено ${cuando}, последнее значение от ведомства ${organismo}.`,
    diario: "Мы каждый день автоматически проверяем официальные источники.",
    actualizado: "Обновлено",
  },
  novedades: {
    pildora: "Обновления",
    titulo: (pais) => `Что изменилось в официальных данных ${g.para(pais)}`,
    acento: "в день изменения",
    bajada: "Здесь записано каждое новое значение, которое попадает в калькуляторы: что изменилось, когда вступает в силу и откуда взялось.",
    ultimoCambio: "Последнее изменение",
    revision: "Проверка источников",
    diaria: "Ежедневно",
    porNorma: "С каждым новым правилом",
    siguiendo: "Источники, за которыми мы следим",
    masOrganismos: (n) => `и еще ${n}`,
    proximos: "Опубликовано, скоро вступит в силу",
    proximosTexto: "Официальные значения, которые уже загружены и начнут действовать в ближайшие дни.",
    registro: "Журнал изменений",
    rss: "Следить через RSS",
    vacio: "Для этой страны изменений пока не записано.",
    etiqueta: { editorial: "Правило", dato: "Новое значение", proximo: "Скоро", serie: "Автоматически", revision: "Проверка" },
    rige: (fecha) => `Действует с ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Действует с ${desde} по ${hasta}`,
    antes: (valor, fecha) => `Раньше: ${valor} (${fecha})`,
    revisados: (n) => `Мы сверили с официальным источником ${pluralRu(n, "значение", "значения", "значений")}`,
    revisadosTexto: (organismos) => `Действующие значения подтверждены по источникам: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Посмотреть значение" : `Посмотреть ${pluralRu(n, "значение", "значения", "значений")}`),
    calculadoras: "Используют",
    rango: (min, max, zonas) => `от ${min} до ${max} в зависимости от региона (${pluralRu(zonas, "регион", "региона", "регионов")})`,
    tabla: (filas) => `таблица: ${pluralRu(filas, "диапазон", "диапазона", "диапазонов")}`,
    valores: (n) => `${n} ${formaRu(n, "значение", "значения", "значений")}`,
    pasosTitulo: "Как данные остаются актуальными",
    pasos: [
      { titulo: "Ведомство публикует", texto: "В официальном источнике появляется нормативный акт, индекс или курс валют." },
      { titulo: "Проверка перед использованием", texto: "Индексы и курсы поступают автоматически, с проверкой границ. Правила мы вносим, имея перед собой официальный документ." },
      { titulo: "Калькуляторы обновляются", texto: "Калькуляторы переходят на новое значение, а изменение записывается здесь вместе с источником." },
    ],
    feedTitulo: (pais) => `Обновления ${g.para(pais)} на CalcularYa`,
    feedSubtitulo: (pais) => `Изменения официальных данных, которые используют калькуляторы ${g.para(pais)}, с датами вступления в силу и источниками.`,
  },
};

export const ru: Diccionario<TextosInicio> = { base };
