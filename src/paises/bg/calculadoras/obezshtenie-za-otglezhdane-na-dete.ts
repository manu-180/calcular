import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.obezshtenie-za-otglezhdane-na-dete",
  mercado: "bg",
  concepto: "propio",
  slug: "obezshtenie-za-otglezhdane-na-dete",
  estado: "publicado",
  requiere: { "bg.otglezhdane-dete": "numero" },
  campos: [{ id: "mesetsi", tipo: "entero", etiqueta: "Месеци отпуск за отглеждане на дете", min: 1, max: 24, porDefecto: 12 }],
  calcular(e, v, { redondear }) {
    if (e.mesetsi <= 0) throw new ErrorEntrada("Въведете поне един месец.", "mesetsi");
    return { mesechno: v["bg.otglezhdane-dete"], obshto: redondear(v["bg.otglezhdane-dete"] * e.mesetsi) };
  },
  resultado: [
    { clave: "obshto", etiqueta: "Общо за периода", formato: "moneda", destacada: true },
    { clave: "mesechno", etiqueta: "На месец", formato: "moneda" },
  ],
});
