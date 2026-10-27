import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { chislo, parametry, TREBUET_RABOTNIK, tyiyny, uderzhaniya } from "../lib/zarplata";

export default definirCalculadora({
  id: "kg.kalkulyator-zarplaty",
  mercado: "kg",
  concepto: "sueldo-neto",
  slug: "kalkulyator-zarplaty",
  estado: "publicado",
  requiere: { ...TREBUET_RABOTNIK, "kg.mzp": "numero" },
  campos: [
    { id: "oklad", tipo: "moneda", etiqueta: "Начисленная зарплата в месяц (до удержаний)", min: 0, porDefecto: 50000 },
    { id: "izhdiventsy", tipo: "entero", etiqueta: "Иждивенцев (дети и другие лица на вашем содержании)", min: 0, max: 20, porDefecto: 0 },
    { id: "vychet", tipo: "si-no", etiqueta: "Это основное место работы (применяются стандартные вычеты)", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.oklad <= 0) throw new ErrorEntrada("Введите зарплату больше нуля.", "oklad");
    const m = uderzhaniya(e.oklad, parametry(v, e.izhdiventsy, e.vychet));
    const observaciones: string[] = [];
    if (e.oklad > v["kg.sf-predelnaya-baza"]) {
      observaciones.push(`Страховые взносы считаются только с ${chislo(v["kg.sf-predelnaya-baza"])} сомов в месяц: это предельная база на текущий год.`);
    }
    if (e.oklad < v["kg.mzp"]) observaciones.push(`Зарплата ниже минимальной (${chislo(v["kg.mzp"])} сомов) при полностью отработанной норме времени нарушает закон.`);
    if (!e.vychet) observaciones.push("По совместительству вычитаются только страховые взносы, без персонального вычета и вычета на иждивенцев.");
    return {
      netto: m.netto,
      sf: m.sf,
      vychet: m.vychet,
      baza: m.baza,
      pn: m.pn,
      uderzhano: tyiyny(m.sf + m.pn),
      nettoZaGod: redondear(m.netto * 12),
      pnZaGod: redondear(m.pn * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "На руки в месяц", formato: "moneda", destacada: true },
    { clave: "sf", etiqueta: "Страховые взносы работника", formato: "moneda" },
    { clave: "vychet", etiqueta: "Стандартные вычеты", formato: "moneda", ocultarSiCero: true },
    { clave: "baza", etiqueta: "Облагаемый доход", formato: "moneda" },
    { clave: "pn", etiqueta: "Подоходный налог", formato: "moneda" },
    { clave: "uderzhano", etiqueta: "Всего удержано", formato: "moneda" },
    { clave: "nettoZaGod", etiqueta: "На руки за год", formato: "moneda" },
    { clave: "pnZaGod", etiqueta: "Подоходный налог за год", formato: "moneda" },
  ],
  mundo: { bruto: "oklad", periodoBruto: "mes", neto: "netto", periodoNeto: "mes", entrada: { izhdiventsy: 0, vychet: true } },
});
