import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { netoOtBruto, REQ_ZAPLATA } from "../lib/zaplata";

export default definirCalculadora({
  id: "bg.kalkulator-zaplata-bruto-neto",
  mercado: "bg",
  concepto: "sueldo-neto",
  slug: "kalkulator-zaplata-bruto-neto",
  estado: "publicado",
  requiere: { ...REQ_ZAPLATA, "bg.minimalna-zaplata": "numero" },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Брутна месечна заплата", min: 0, porDefecto: 1500 }],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Въведете брутна заплата над нула.", "bruto");
    const f = netoOtBruto(e.bruto, { rabotnik: v["bg.vnoski-rabotnik"], zdravna: v["bg.zdravna-vnoska"], danak: v["bg.danak-dohodi"], maks: v["bg.maks-osig-dohod"] }, redondear);
    const observaciones: string[] = [];
    if (e.bruto > v["bg.maks-osig-dohod"]) observaciones.push("Заплатата е над максималния осигурителен доход: вноските се смятат само до тавана, а данъкът върху цялата сума без вноските.");
    if (e.bruto < v["bg.minimalna-zaplata"]) observaciones.push("Сумата е под минималната заплата за пълно работно време. Осигурителната основа може да е по-висока, ако за дейността има минимален осигурителен доход.");
    return {
      neto: f.neto,
      pensii: f.pensii,
      ozm: f.ozm,
      bezrabotitsa: f.bezrabotitsa,
      dzpo: f.dzpo,
      zdravno: f.zdravno,
      vnoski: f.vnoski,
      danachnaOsnova: f.danachnaOsnova,
      danak: f.danak,
      netoGodishno: redondear(f.neto * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Нетна заплата на месец", formato: "moneda", destacada: true },
    { clave: "vnoski", etiqueta: "Осигуровки за Ваша сметка", formato: "moneda" },
    { clave: "danak", etiqueta: "Данък върху доходите", formato: "moneda" },
    { clave: "pensii", etiqueta: "Фонд „Пенсии“", formato: "moneda" },
    { clave: "ozm", etiqueta: "Общо заболяване и майчинство", formato: "moneda" },
    { clave: "bezrabotitsa", etiqueta: "Фонд „Безработица“", formato: "moneda" },
    { clave: "dzpo", etiqueta: "Допълнителна задължителна пенсия", formato: "moneda" },
    { clave: "zdravno", etiqueta: "Здравна вноска", formato: "moneda" },
    { clave: "danachnaOsnova", etiqueta: "Данъчна основа", formato: "moneda" },
    { clave: "netoGodishno", etiqueta: "Нето за 12 месеца", formato: "moneda" },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
});
