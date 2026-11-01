import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { utrymannia } from "../lib/zarplata";

export default definirCalculadora({
  id: "ua.vytraty-robotodavtsia",
  mercado: "ua",
  concepto: "costo-empleador",
  slug: "vytraty-robotodavtsia",
  estado: "publicado",
  requiere: {
    "ua.pdfo": "numero",
    "ua.viiskovyi-zbir": "numero",
    "ua.yesv": "numero",
    "ua.minimalna-zarplata": "numero",
    "ua.maks-baza-yesv": "numero",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Зарплата працівника брутто за місяць", min: 0, porDefecto: 25000 },
    { id: "pratsivnykiv", tipo: "entero", etiqueta: "Кількість працівників з такою зарплатою", min: 1, max: 10000, porDefecto: 1 },
    { id: "osnovne", tipo: "si-no", etiqueta: "Для працівника це основне місце роботи", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.brutto <= 0) throw new ErrorEntrada("Введіть зарплату, більшу за нуль.", "brutto");
    if (e.pratsivnykiv < 1) throw new ErrorEntrada("Має бути щонайменше один працівник.", "pratsivnykiv");
    const r = utrymannia(
      e.brutto,
      0,
      { pdfo: v["ua.pdfo"], vz: v["ua.viiskovyi-zbir"], yesv: v["ua.yesv"], mzp: v["ua.minimalna-zarplata"], maksBaza: v["ua.maks-baza-yesv"] },
      e.osnovne,
      redondear,
    );
    const n = e.pratsivnykiv;
    return {
      vytratyMis: redondear(r.vytraty * n),
      yesv: redondear(r.yesv * n),
      podatkyAgent: redondear((r.pdfo + r.vz) * n),
      doBiudzhetu: redondear((r.pdfo + r.vz + r.yesv) * n),
      naRuky: redondear(r.naRuky * n),
      vytratyRik: redondear(r.vytraty * n * 12),
      chastka: (r.yesv / e.brutto) * 100,
    };
  },
  resultado: [
    { clave: "vytratyMis", etiqueta: "Витрати роботодавця за місяць", formato: "moneda", destacada: true },
    { clave: "yesv", etiqueta: "ЄСВ роботодавця", formato: "moneda" },
    { clave: "podatkyAgent", etiqueta: "ПДФО і військовий збір, які роботодавець утримує і сплачує", formato: "moneda" },
    { clave: "doBiudzhetu", etiqueta: "Усього податків і внесків за місяць", formato: "moneda" },
    { clave: "naRuky", etiqueta: "Працівники отримають на руки", formato: "moneda" },
    { clave: "vytratyRik", etiqueta: "Витрати роботодавця за рік", formato: "moneda" },
    { clave: "chastka", etiqueta: "ЄСВ у відсотках від зарплати", formato: "porcentaje", decimales: 2 },
  ],
});
