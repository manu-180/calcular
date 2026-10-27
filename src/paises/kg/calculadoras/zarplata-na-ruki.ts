import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bruttoIzNetto, parametry, TREBUET_RABOTNIK, tyiyny, uderzhaniya } from "../lib/zarplata";

export default definirCalculadora({
  id: "kg.zarplata-na-ruki",
  mercado: "kg",
  concepto: "propio",
  slug: "zarplata-na-ruki",
  estado: "publicado",
  requiere: TREBUET_RABOTNIK,
  campos: [
    { id: "naRuki", tipo: "moneda", etiqueta: "Сколько вы хотите получать на руки в месяц", min: 0, porDefecto: 40000 },
    { id: "izhdiventsy", tipo: "entero", etiqueta: "Иждивенцев", min: 0, max: 20, porDefecto: 0 },
    { id: "vychet", tipo: "si-no", etiqueta: "Это основное место работы (применяются стандартные вычеты)", porDefecto: true },
  ],
  calcular(e, v) {
    if (e.naRuki <= 0) throw new ErrorEntrada("Введите сумму на руки больше нуля.", "naRuki");
    const p = parametry(v, e.izhdiventsy, e.vychet);
    const m = uderzhaniya(bruttoIzNetto(e.naRuki, p), p);
    return { brutto: m.brutto, sf: m.sf, pn: m.pn, uderzhano: tyiyny(m.sf + m.pn), netto: m.netto };
  },
  resultado: [
    { clave: "brutto", etiqueta: "Начисленная зарплата (до удержаний)", formato: "moneda", destacada: true },
    { clave: "sf", etiqueta: "Страховые взносы работника", formato: "moneda" },
    { clave: "pn", etiqueta: "Подоходный налог", formato: "moneda" },
    { clave: "uderzhano", etiqueta: "Всего удержано", formato: "moneda" },
    { clave: "netto", etiqueta: "На руки", formato: "moneda" },
  ],
});
