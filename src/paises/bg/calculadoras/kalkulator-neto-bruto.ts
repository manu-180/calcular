import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoOtNeto, REQ_ZAPLATA } from "../lib/zaplata";

export default definirCalculadora({
  id: "bg.kalkulator-neto-bruto",
  mercado: "bg",
  concepto: "propio",
  slug: "kalkulator-neto-bruto",
  estado: "publicado",
  requiere: REQ_ZAPLATA,
  campos: [{ id: "neto", tipo: "moneda", etiqueta: "Желана нетна заплата на месец", min: 0, porDefecto: 1000 }],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Въведете нетна заплата над нула.", "neto");
    const f = brutoOtNeto(e.neto, { rabotnik: v["bg.vnoski-rabotnik"], zdravna: v["bg.zdravna-vnoska"], danak: v["bg.danak-dohodi"], maks: v["bg.maks-osig-dohod"] }, redondear);
    return { bruto: f.bruto, vnoski: f.vnoski, danak: f.danak, netoTochno: f.neto };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Нужна брутна заплата", formato: "moneda", destacada: true },
    { clave: "vnoski", etiqueta: "Осигуровки за сметка на работника", formato: "moneda" },
    { clave: "danak", etiqueta: "Данък върху доходите", formato: "moneda" },
    { clave: "netoTochno", etiqueta: "Нето при тази заплата", formato: "moneda" },
  ],
});
