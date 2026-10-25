import type { Idioma, Trato } from "../tipos";
import { resolver, type Diccionario, type Diccionarios } from "./resolver";

// «Con un sueldo real» dentro de «¿Cuántas horas de trabajo cuesta?». Mismas reglas que
// src/motor/i18n/horas.ts: texto plano con {marcas} (se rellena con rellenarHoras) e impersonal, salvo la
// tarjeta, que habla en primera persona porque la comparte quien la armó.
//
// Marcas: {en} el país como lugar («En México») · {producto} con artículo · {horas} con su unidad ·
// {x} veces el mínimo, ya formateado · {moneda} código ISO 4217.

export interface TextosHorasPropio {
  titulo: string;
  bajada: string;
  campo: string;
  ayuda: string;
  traido: string;
  invalido: string;
  vacio: string;
  antes: string;
  despues: string;
  despuesMes: string;
  minimo: string;
  veces: string;
  rankingTitulo: string;
  rankingBajada: string;
  tarjetaTitulo: string;
  tarjetaBajada: string;
  texto: string;
  og: { antes: string; producto: string; de: string; deMes: string; otros: string; cta: string };
}

const ZH_HANT: TextosHorasPropio = {
  titulo: "同樣的計算，換成真實薪資",
  bajada: "輸入每月稅前薪資，時數就以這份薪資計算，而不是最低工資。金額只留在這個瀏覽器：不會出現在連結或圖片裡。",
  campo: "每月稅前薪資",
  ayuda: "以 {moneda} 計，扣除前的金額。",
  traido: "已從薪資計算機帶入。",
  invalido: "需要大於零的金額。",
  vacio: "輸入薪資後就會顯示時數。",
  antes: "{en}，以這份薪資，{producto}要",
  despues: "的工作",
  despuesMes: "的工作，每個月",
  minimo: "以最低工資計算：{horas}。",
  veces: "最低工資的 {x} 倍",
  rankingTitulo: "在每個國家領同等水準的薪資",
  rankingBajada: "每個國家最低工資的 {x} 倍，換算成工作時數。",
  tarjetaTitulo: "我的工作時數卡",
  tarjetaBajada: "只顯示時數和國家，絕不顯示薪資。",
  texto: "{en}，{producto}要花我 {horas} 的工作。其他國家呢？",
  og: { antes: "{en}，以我的薪資，", producto: "{producto}要花我", de: "的工作", deMes: "的工作，每個月", otros: "同等薪資水準在其他國家", cta: "要工作幾小時？" },
};

const ZH_HANS: TextosHorasPropio = {
  titulo: "同样的计算，换成真实工资",
  bajada: "输入每月税前工资，小时数就按这份工资计算，而不是最低工资。金额只留在这个浏览器里：不会出现在链接或图片中。",
  campo: "每月税前工资",
  ayuda: "以 {moneda} 计，扣除前的金额。",
  traido: "已从工资计算器带入。",
  invalido: "需要大于零的金额。",
  vacio: "输入工资后就会显示小时数。",
  antes: "{en}，按这份工资，{producto}要",
  despues: "的工作",
  despuesMes: "的工作，每个月",
  minimo: "按最低工资计算：{horas}。",
  veces: "最低工资的 {x} 倍",
  rankingTitulo: "在每个国家拿同等水平的工资",
  rankingBajada: "每个国家最低工资的 {x} 倍，换算成工作小时数。",
  tarjetaTitulo: "我的工作小时卡",
  tarjetaBajada: "只显示小时数和国家，绝不显示工资。",
  texto: "{en}，{producto}要花我 {horas} 的工作。其他国家呢？",
  og: { antes: "{en}，按我的工资，", producto: "{producto}要花我", de: "的工作", deMes: "的工作，每个月", otros: "同等工资水平在其他国家", cta: "要工作几小时？" },
};

const base = (t: TextosHorasPropio): Diccionario<TextosHorasPropio> => ({ base: t });

export const DICCIONARIOS_HORAS_PROPIO: Diccionarios<TextosHorasPropio> = {
  es: base({
    titulo: "El mismo cálculo, con un sueldo real",
    bajada: "Con el sueldo bruto por mes, las horas salen de ese sueldo y no del mínimo. El monto queda en este navegador: no viaja en el link ni en la imagen.",
    campo: "Sueldo bruto por mes",
    ayuda: "En {moneda}, antes de descuentos.",
    traido: "Traído de la calculadora de sueldo.",
    invalido: "Hace falta un monto mayor a cero.",
    vacio: "Con un sueldo cargado aparecen las horas.",
    antes: "{en}, con este sueldo, {producto} cuesta",
    despues: "de trabajo",
    despuesMes: "de trabajo, cada mes",
    minimo: "Con el salario mínimo: {horas}.",
    veces: "{x} veces el salario mínimo",
    rankingTitulo: "El mismo nivel de sueldo en cada país",
    rankingBajada: "{x} veces el salario mínimo de cada país, pasado a horas de trabajo.",
    tarjetaTitulo: "Tarjeta con las horas propias",
    tarjetaBajada: "Muestra solo horas y países. Nunca el sueldo.",
    texto: "{en}, {producto} me cuesta {horas} de trabajo. ¿Y en otros países?",
    og: { antes: "{en}, con mi sueldo,", producto: "{producto} me cuesta", de: "de trabajo", deMes: "de trabajo por mes", otros: "Con el mismo nivel de sueldo en", cta: "¿Cuántas horas cuesta?" },
  }),
  pt: base({
    titulo: "A mesma conta, com um salário real",
    bajada: "Com o salário bruto mensal, as horas saem desse salário e não do mínimo. O valor fica neste navegador: não vai no link nem na imagem.",
    campo: "Salário bruto por mês",
    ayuda: "Em {moneda}, antes dos descontos.",
    traido: "Trazido da calculadora de salário.",
    invalido: "É preciso um valor maior que zero.",
    vacio: "Com um salário preenchido aparecem as horas.",
    antes: "{en}, com este salário, {producto} custa",
    despues: "de trabalho",
    despuesMes: "de trabalho, todo mês",
    minimo: "Com o salário mínimo: {horas}.",
    veces: "{x} vezes o salário mínimo",
    rankingTitulo: "O mesmo nível de salário em cada país",
    rankingBajada: "{x} vezes o salário mínimo de cada país, convertido em horas de trabalho.",
    tarjetaTitulo: "Card com as próprias horas",
    tarjetaBajada: "Mostra só horas e países. Nunca o salário.",
    texto: "{en}, {producto} me custa {horas} de trabalho. E em outros países?",
    og: { antes: "{en}, com o meu salário,", producto: "{producto} me custa", de: "de trabalho", deMes: "de trabalho por mês", otros: "Com o mesmo nível de salário em", cta: "Quantas horas custa?" },
  }),
  en: base({
    titulo: "The same math, with a real salary",
    bajada: "With a gross monthly salary, the hours come from that salary instead of the minimum wage. The amount stays in this browser: it never goes into the link or the image.",
    campo: "Gross salary per month",
    ayuda: "In {moneda}, before deductions.",
    traido: "Brought over from the salary calculator.",
    invalido: "An amount above zero is needed.",
    vacio: "Hours show up once a salary is entered.",
    antes: "{en}, on this salary, {producto} costs",
    despues: "of work",
    despuesMes: "of work, every month",
    minimo: "On the minimum wage: {horas}.",
    veces: "{x} times the minimum wage",
    rankingTitulo: "The same salary level in every country",
    rankingBajada: "{x} times each country's minimum wage, turned into hours of work.",
    tarjetaTitulo: "Card with my own hours",
    tarjetaBajada: "It shows hours and countries only. Never the salary.",
    texto: "{en}, {producto} costs me {horas} of work. What about other countries?",
    og: { antes: "{en}, on my salary,", producto: "{producto} costs me", de: "of work", deMes: "of work a month", otros: "Same salary level in", cta: "How many hours does it cost?" },
  }),
  fr: base({
    titulo: "Le même calcul, avec un vrai salaire",
    bajada: "Avec le salaire brut mensuel, les heures se calculent sur ce salaire et non sur le minimum. Le montant reste dans ce navigateur : il n’apparaît ni dans le lien ni dans l’image.",
    campo: "Salaire brut par mois",
    ayuda: "En {moneda}, avant retenues.",
    traido: "Repris du calculateur de salaire.",
    invalido: "Il faut un montant supérieur à zéro.",
    vacio: "Les heures s’affichent dès qu’un salaire est saisi.",
    antes: "{en}, avec ce salaire, {producto} coûte",
    despues: "de travail",
    despuesMes: "de travail, chaque mois",
    minimo: "Au salaire minimum : {horas}.",
    veces: "{x} fois le salaire minimum",
    rankingTitulo: "Le même niveau de salaire dans chaque pays",
    rankingBajada: "{x} fois le salaire minimum de chaque pays, converti en heures de travail.",
    tarjetaTitulo: "Carte avec mes propres heures",
    tarjetaBajada: "Elle montre seulement des heures et des pays. Jamais le salaire.",
    texto: "{en}, {producto} me coûte {horas} de travail. Et dans les autres pays ?",
    og: { antes: "{en}, avec mon salaire,", producto: "{producto} me coûte", de: "de travail", deMes: "de travail par mois", otros: "Même niveau de salaire en", cta: "Combien d’heures ça coûte ?" },
  }),
  de: base({
    titulo: "Dieselbe Rechnung mit einem echten Gehalt",
    bajada: "Mit dem Bruttomonatsgehalt ergeben sich die Stunden aus diesem Gehalt statt aus dem Mindestlohn. Der Betrag bleibt in diesem Browser: Er steht weder im Link noch im Bild.",
    campo: "Bruttogehalt pro Monat",
    ayuda: "In {moneda}, vor Abzügen.",
    traido: "Aus dem Gehaltsrechner übernommen.",
    invalido: "Nötig ist ein Betrag über null.",
    vacio: "Mit einem eingetragenen Gehalt erscheinen die Stunden.",
    antes: "{en} kostet {producto} mit diesem Gehalt",
    despues: "Arbeit",
    despuesMes: "Arbeit, jeden Monat",
    minimo: "Mit dem Mindestlohn: {horas}.",
    veces: "das {x}-Fache des Mindestlohns",
    rankingTitulo: "Dasselbe Gehaltsniveau in jedem Land",
    rankingBajada: "Das {x}-Fache des Mindestlohns jedes Landes, umgerechnet in Arbeitsstunden.",
    tarjetaTitulo: "Karte mit den eigenen Stunden",
    tarjetaBajada: "Sie zeigt nur Stunden und Länder. Nie das Gehalt.",
    texto: "{en} kostet mich {producto} {horas} Arbeit. Und in anderen Ländern?",
    og: { antes: "{en}, mit meinem Gehalt,", producto: "kostet mich {producto}", de: "Arbeit", deMes: "Arbeit pro Monat", otros: "Gleiches Gehaltsniveau in", cta: "Wie viele Stunden kostet es?" },
  }),
  it: base({
    titulo: "Lo stesso calcolo, con uno stipendio vero",
    bajada: "Con lo stipendio lordo mensile, le ore si calcolano su quello stipendio e non sul minimo. L’importo resta in questo browser: non finisce né nel link né nell’immagine.",
    campo: "Stipendio lordo al mese",
    ayuda: "In {moneda}, prima delle trattenute.",
    traido: "Ripreso dal calcolatore dello stipendio.",
    invalido: "Serve un importo maggiore di zero.",
    vacio: "Le ore compaiono quando c’è uno stipendio.",
    antes: "{en}, con questo stipendio, {producto} costa",
    despues: "di lavoro",
    despuesMes: "di lavoro, ogni mese",
    minimo: "Con il salario minimo: {horas}.",
    veces: "{x} volte il salario minimo",
    rankingTitulo: "Lo stesso livello di stipendio in ogni paese",
    rankingBajada: "{x} volte il salario minimo di ogni paese, convertito in ore di lavoro.",
    tarjetaTitulo: "Card con le mie ore",
    tarjetaBajada: "Mostra solo ore e paesi. Mai lo stipendio.",
    texto: "{en}, {producto} mi costa {horas} di lavoro. E negli altri paesi?",
    og: { antes: "{en}, con il mio stipendio,", producto: "{producto} mi costa", de: "di lavoro", deMes: "di lavoro al mese", otros: "Stesso livello di stipendio in", cta: "Quante ore costa?" },
  }),
  nl: base({
    titulo: "Dezelfde som, met een echt salaris",
    bajada: "Met het bruto maandsalaris komen de uren uit dat salaris en niet uit het minimumloon. Het bedrag blijft in deze browser: het staat niet in de link en niet in de afbeelding.",
    campo: "Brutosalaris per maand",
    ayuda: "In {moneda}, vóór inhoudingen.",
    traido: "Overgenomen uit de salarisrekenaar.",
    invalido: "Er is een bedrag boven nul nodig.",
    vacio: "Met een ingevuld salaris verschijnen de uren.",
    antes: "{en} kost {producto} met dit salaris",
    despues: "werk",
    despuesMes: "werk, elke maand",
    minimo: "Met het minimumloon: {horas}.",
    veces: "{x} keer het minimumloon",
    rankingTitulo: "Hetzelfde salarisniveau in elk land",
    rankingBajada: "{x} keer het minimumloon van elk land, omgerekend naar werkuren.",
    tarjetaTitulo: "Kaart met mijn eigen uren",
    tarjetaBajada: "Alleen uren en landen. Nooit het salaris.",
    texto: "{en} kost {producto} mij {horas} werk. En in andere landen?",
    og: { antes: "{en}, met mijn salaris,", producto: "kost {producto} mij", de: "werk", deMes: "werk per maand", otros: "Zelfde salarisniveau in", cta: "Hoeveel uur kost het?" },
  }),
  ja: base({
    titulo: "同じ計算を、実際の給料で",
    bajada: "月の額面給与を入れると、最低賃金ではなくその給料で時間を計算します。金額はこのブラウザの中だけに残り、リンクにも画像にも入りません。",
    campo: "月の額面給与",
    ayuda: "{moneda}で、控除前の金額。",
    traido: "給与計算機から引き継ぎました。",
    invalido: "0より大きい金額が必要です。",
    vacio: "給料を入れると時間が表示されます。",
    antes: "{en}この給料だと、{producto}は",
    despues: "の労働",
    despuesMes: "の労働（毎月）",
    minimo: "最低賃金なら{horas}。",
    veces: "最低賃金の{x}倍",
    rankingTitulo: "各国で同じ水準の給料なら",
    rankingBajada: "各国の最低賃金の{x}倍を、労働時間に換算。",
    tarjetaTitulo: "自分の労働時間カード",
    tarjetaBajada: "時間と国だけを表示し、給料は表示しません。",
    texto: "{en}、{producto}は私の給料で{horas}の労働。ほかの国では？",
    og: { antes: "{en}、私の給料だと", producto: "{producto}は", de: "の労働", deMes: "の労働（毎月）", otros: "同じ給料水準なら", cta: "何時間働けば買える？" },
  }),
  ko: base({
    titulo: "같은 계산, 실제 월급으로",
    bajada: "세전 월급을 넣으면 최저임금이 아니라 그 월급으로 시간을 계산해요. 금액은 이 브라우저에만 남고 링크나 이미지에는 들어가지 않아요.",
    campo: "세전 월급",
    ayuda: "{moneda} 기준, 공제 전 금액.",
    traido: "월급 계산기에서 가져왔어요.",
    invalido: "0보다 큰 금액이 필요해요.",
    vacio: "월급을 넣으면 시간이 나와요.",
    antes: "{en} 이 월급이면 {producto}에",
    despues: "의 노동",
    despuesMes: "의 노동, 매달",
    minimo: "최저임금이면 {horas}.",
    veces: "최저임금의 {x}배",
    rankingTitulo: "나라마다 같은 수준의 월급이라면",
    rankingBajada: "각 나라 최저임금의 {x}배를 노동 시간으로 환산.",
    tarjetaTitulo: "내 노동 시간 카드",
    tarjetaBajada: "시간과 나라만 보여 주고 월급은 절대 보여 주지 않아요.",
    texto: "{en} {producto}에 내 월급으로 {horas}의 노동이 들어요. 다른 나라는요?",
    og: { antes: "{en} 내 월급이면", producto: "{producto}에", de: "의 노동", deMes: "의 노동, 매달", otros: "같은 월급 수준이라면", cta: "몇 시간 일해야 할까?" },
  }),
  zh: { base: ZH_HANT, regional: { "zh-CN": ZH_HANS, "zh-SG": ZH_HANS } },
};

export function textosHorasPropio(idioma: Idioma, trato: Trato, locale?: string): TextosHorasPropio {
  return resolver(DICCIONARIOS_HORAS_PROPIO, idioma, trato, locale);
}
