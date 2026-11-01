import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.danak-varhu-nedvizhimi-imoti",
  mercado: "bg",
  concepto: "propio",
  slug: "danak-varhu-nedvizhimi-imoti",
  estado: "borrador",
  requiere: { "bg.danak-nedvizhimi-sofia": "numero" },
  campos: [{ id: "otsenka", tipo: "moneda", etiqueta: "Данъчна оценка", min: 0, porDefecto: 50000 }],
  calcular(e, v, { redondear }) {
    if (e.otsenka <= 0) throw new ErrorEntrada("Въведете оценка над нула.", "otsenka");
    const danak = redondear((e.otsenka * v["bg.danak-nedvizhimi-sofia"]) / 1000);
    return { danak, vnoska: redondear(danak / 2) };
  },
  resultado: [
    { clave: "danak", etiqueta: "Годишен данък", formato: "moneda", destacada: true },
    { clave: "vnoska", etiqueta: "Всяка от двете вноски", formato: "moneda" },
  ],
});
