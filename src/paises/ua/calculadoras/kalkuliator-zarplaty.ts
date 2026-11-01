import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { utrymannia } from "../lib/zarplata";

export default definirCalculadora({
  id: "ua.kalkuliator-zarplaty",
  mercado: "ua",
  concepto: "sueldo-neto",
  slug: "kalkuliator-zarplaty",
  estado: "publicado",
  requiere: {
    "ua.pdfo": "numero",
    "ua.viiskovyi-zbir": "numero",
    "ua.yesv": "numero",
    "ua.minimalna-zarplata": "numero",
    "ua.maks-baza-yesv": "numero",
    "ua.psp": "mapa",
    "ua.limit-psp": "numero",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Зарплата брутто за місяць (нарахована)", min: 0, porDefecto: 25000 },
    {
      id: "psp",
      tipo: "opcion",
      etiqueta: "Податкова соціальна пільга",
      opciones: [
        { valor: "ni", etiqueta: "Не застосовується" },
        { valor: "zvychaina", etiqueta: "Звичайна (100 %)" },
        { valor: "pidvyshchena", etiqueta: "Підвищена (150 %)" },
        { valor: "podviina", etiqueta: "Подвійна (200 %)" },
      ],
      porDefecto: "ni",
      ayuda: "Пільгу надають лише тоді, коли зарплата не перевищує граничного розміру, і лише за одним місцем роботи за вашою заявою.",
    },
    { id: "osnovne", tipo: "si-no", etiqueta: "Це основне місце роботи", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.brutto <= 0) throw new ErrorEntrada("Введіть зарплату брутто, більшу за нуль.", "brutto");
    const observaciones: string[] = [];
    let psp = 0;
    if (e.psp !== "ni") {
      if (e.brutto <= v["ua.limit-psp"]) psp = enMapa(v["ua.psp"], e.psp);
      else observaciones.push("Зарплата перевищує граничний розмір доходу для податкової соціальної пільги, тому пільгу не враховано.");
    }
    const mzp = v["ua.minimalna-zarplata"];
    const r = utrymannia(
      e.brutto,
      psp,
      { pdfo: v["ua.pdfo"], vz: v["ua.viiskovyi-zbir"], yesv: v["ua.yesv"], mzp, maksBaza: v["ua.maks-baza-yesv"] },
      e.osnovne,
      redondear,
    );
    if (e.osnovne && e.brutto < mzp) {
      observaciones.push("Зарплата менша за мінімальну. За основним місцем роботи роботодавець нараховує ЄСВ не менше ніж з мінімальної зарплати.");
    }
    if (r.bazaYesv < e.brutto) observaciones.push("Зарплата перевищує максимальну базу, тому ЄСВ нараховано лише з її межі.");
    return {
      naRuky: r.naRuky,
      pdfo: r.pdfo,
      vz: r.vz,
      psp: psp > 0 ? psp : null,
      utrymano: redondear(r.pdfo + r.vz),
      yesv: r.yesv,
      vytraty: r.vytraty,
      naRukyRik: redondear(r.naRuky * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "naRuky", etiqueta: "На руки за місяць", formato: "moneda", destacada: true },
    { clave: "pdfo", etiqueta: "ПДФО", formato: "moneda" },
    { clave: "vz", etiqueta: "Військовий збір", formato: "moneda" },
    { clave: "psp", etiqueta: "Податкова соціальна пільга", formato: "moneda" },
    { clave: "utrymano", etiqueta: "Усього утримано із зарплати", formato: "moneda" },
    { clave: "yesv", etiqueta: "ЄСВ, який сплачує роботодавець", formato: "moneda" },
    { clave: "vytraty", etiqueta: "Вартість працівника для роботодавця", formato: "moneda" },
    { clave: "naRukyRik", etiqueta: "На руки за рік", formato: "moneda" },
  ],
  mundo: { bruto: "brutto", periodoBruto: "mes", neto: "naRuky", periodoNeto: "mes", entrada: { psp: "ni", osnovne: true } },
});
