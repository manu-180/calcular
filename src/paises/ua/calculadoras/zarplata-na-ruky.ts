import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { utrymannia } from "../lib/zarplata";

export default definirCalculadora({
  id: "ua.zarplata-na-ruky",
  mercado: "ua",
  concepto: "propio",
  slug: "zarplata-na-ruky",
  estado: "publicado",
  requiere: {
    "ua.pdfo": "numero",
    "ua.viiskovyi-zbir": "numero",
    "ua.yesv": "numero",
    "ua.minimalna-zarplata": "numero",
    "ua.maks-baza-yesv": "numero",
  },
  campos: [
    { id: "naRuky", tipo: "moneda", etiqueta: "Скільки ви хочете отримувати на руки за місяць", min: 0, porDefecto: 20000 },
    { id: "osnovne", tipo: "si-no", etiqueta: "Це основне місце роботи", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.naRuky <= 0) throw new ErrorEntrada("Введіть суму на руки, більшу за нуль.", "naRuky");
    const p = { pdfo: v["ua.pdfo"], vz: v["ua.viiskovyi-zbir"], yesv: v["ua.yesv"], mzp: v["ua.minimalna-zarplata"], maksBaza: v["ua.maks-baza-yesv"] };
    let brutto = redondear((e.naRuky * 100) / (100 - p.pdfo - p.vz));
    // Через округлення до копійки брутто може дати на копійку менше або більше: підбираємо.
    for (let i = 0; i < 5; i++) {
      const r = utrymannia(brutto, 0, p, e.osnovne, redondear);
      if (r.naRuky < e.naRuky) brutto = redondear(brutto + 0.01);
      else if (r.naRuky > e.naRuky && utrymannia(redondear(brutto - 0.01), 0, p, e.osnovne, redondear).naRuky >= e.naRuky) brutto = redondear(brutto - 0.01);
      else break;
    }
    const r = utrymannia(brutto, 0, p, e.osnovne, redondear);
    const observaciones: string[] = [];
    if (e.osnovne && brutto < p.mzp) observaciones.push("Таке брутто менше за мінімальну зарплату. За повний робочий час роботодавець не може платити менше мінімальної.");
    return {
      brutto,
      pdfo: r.pdfo,
      vz: r.vz,
      otrymaete: r.naRuky,
      yesv: r.yesv,
      vytraty: r.vytraty,
      observaciones,
    };
  },
  resultado: [
    { clave: "brutto", etiqueta: "Потрібна зарплата брутто", formato: "moneda", destacada: true },
    { clave: "pdfo", etiqueta: "ПДФО", formato: "moneda" },
    { clave: "vz", etiqueta: "Військовий збір", formato: "moneda" },
    { clave: "otrymaete", etiqueta: "На руки після утримань", formato: "moneda" },
    { clave: "yesv", etiqueta: "ЄСВ роботодавця", formato: "moneda" },
    { clave: "vytraty", etiqueta: "Вартість працівника для роботодавця", formato: "moneda" },
  ],
});
