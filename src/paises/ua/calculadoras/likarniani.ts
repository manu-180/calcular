import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { podatkyIzSumy, serednodenna } from "../lib/serednia";

export default definirCalculadora({
  id: "ua.likarniani",
  mercado: "ua",
  concepto: "propio",
  slug: "likarniani",
  estado: "publicado",
  requiere: {
    "ua.likarniani": "mapa",
    "ua.dni-robotodavtsia": "numero",
    "ua.serednia-kilkist-dniv": "numero",
    "ua.minimalna-zarplata": "numero",
    "ua.maks-baza-yesv": "numero",
    "ua.pdfo": "numero",
    "ua.viiskovyi-zbir": "numero",
  },
  campos: [
    { id: "zarobitok", tipo: "moneda", etiqueta: "Заробіток за 12 місяців перед хворобою", min: 0, porDefecto: 300000, ayuda: "Зарплата, з якої сплачено ЄСВ, за 12 календарних місяців перед місяцем, у якому відкрили лікарняний." },
    { id: "dni", tipo: "entero", etiqueta: "Календарних днів зайнятості в цих 12 місяцях", min: 1, max: 366, porDefecto: 365, ayuda: "Не враховуйте дні попередніх лікарняних, декретної відпустки та відпустки без збереження зарплати." },
    { id: "stazh", tipo: "opcion-dato", dato: "ua.likarniani", etiqueta: "Ваш страховий стаж", porDefecto: "ponad-8" },
    { id: "dniHvoroby", tipo: "entero", etiqueta: "Календарних днів лікарняного", min: 1, max: 366, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dniHvoroby <= 0) throw new ErrorEntrada("Введіть кількість днів лікарняного.", "dniHvoroby");
    let sd = serednodenna(e.zarobitok, e.dni, redondear, { zarobitok: "zarobitok", dni: "dni" });
    const maksDen = redondear((v["ua.minimalna-zarplata"] * v["ua.maks-baza-yesv"]) / v["ua.serednia-kilkist-dniv"]);
    const observaciones: string[] = [];
    if (sd > maksDen) {
      sd = maksDen;
      observaciones.push("Середньоденна зарплата перевищує максимальну базу ЄСВ у розрахунку на день, тому взято межу.");
    }
    const vidsotok = enMapa(v["ua.likarniani"], e.stazh);
    const denna = redondear(porcentaje(sd, vidsotok));
    const suma = redondear(denna * e.dniHvoroby);
    const robotodavets = redondear(denna * Math.min(e.dniHvoroby, v["ua.dni-robotodavtsia"]));
    const p = podatkyIzSumy(suma, v["ua.pdfo"], v["ua.viiskovyi-zbir"], redondear);
    return {
      suma,
      denna,
      serednodenna: sd,
      vidsotok,
      robotodavets,
      pfu: redondear(suma - robotodavets),
      pdfo: p.pdfo,
      vz: p.vz,
      naRuky: p.naRuky,
      observaciones,
    };
  },
  resultado: [
    { clave: "suma", etiqueta: "Лікарняні (нараховано)", formato: "moneda", destacada: true },
    { clave: "denna", etiqueta: "Виплата за день", formato: "moneda" },
    { clave: "serednodenna", etiqueta: "Середньоденна зарплата", formato: "moneda" },
    { clave: "vidsotok", etiqueta: "Відсоток від середньої зарплати", formato: "porcentaje", decimales: 0 },
    { clave: "robotodavets", etiqueta: "Оплачує роботодавець (перші дні)", formato: "moneda" },
    { clave: "pfu", etiqueta: "Оплачує Пенсійний фонд", formato: "moneda" },
    { clave: "pdfo", etiqueta: "ПДФО", formato: "moneda" },
    { clave: "vz", etiqueta: "Військовий збір", formato: "moneda" },
    { clave: "naRuky", etiqueta: "Лікарняні на руки", formato: "moneda" },
  ],
});
