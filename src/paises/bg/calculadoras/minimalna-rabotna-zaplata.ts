import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { netoOtBruto, REQ_ZAPLATA } from "../lib/zaplata";

export default definirCalculadora({
  id: "bg.minimalna-rabotna-zaplata",
  mercado: "bg",
  concepto: "salario-minimo",
  slug: "minimalna-rabotna-zaplata",
  estado: "publicado",
  requiere: { ...REQ_ZAPLATA, "bg.minimalna-zaplata": "numero" },
  campos: [{ id: "chasove", tipo: "numero", etiqueta: "Работни часове на ден", min: 1, max: 8, porDefecto: 8, ayuda: "Пълно работно време е 8 часа. При непълно време сумата е пропорционална." }],
  calcular(e, v, { redondear }) {
    if (e.chasove <= 0 || e.chasove > 8) throw new ErrorEntrada("Въведете от 1 до 8 часа.", "chasove");
    const bruto = redondear((v["bg.minimalna-zaplata"] * e.chasove) / 8);
    const f = netoOtBruto(bruto, { rabotnik: v["bg.vnoski-rabotnik"], zdravna: v["bg.zdravna-vnoska"], danak: v["bg.danak-dohodi"], maks: v["bg.maks-osig-dohod"] }, redondear);
    return { bruto, neto: f.neto, vnoski: f.vnoski, danak: f.danak, brutoGodishno: redondear(bruto * 12) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Минимална брутна заплата", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Нето на месец", formato: "moneda" },
    { clave: "vnoski", etiqueta: "Осигуровки за сметка на работника", formato: "moneda" },
    { clave: "danak", etiqueta: "Данък върху доходите", formato: "moneda" },
    { clave: "brutoGodishno", etiqueta: "Бруто за 12 месеца", formato: "moneda" },
  ],
});
