import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mn.ul-khodlokh-khorongiin-tatvar",
  mercado: "mn",
  concepto: "propio",
  slug: "ul-khodlokh-khorongiin-tatvar",
  estado: "borrador",
  requiere: {
    "mn.ul-khodlokh-khuvi-dood": "numero",
    "mn.ul-khodlokh-khuvi-deed": "numero",
  },
  campos: [
    { id: "unelgee", tipo: "moneda", etiqueta: "Хөрөнгийн улсын бүртгэлийн үнэлгээ", min: 0, porDefecto: 100000000 },
    { id: "khuvi", tipo: "porcentaje", etiqueta: "Аймаг, нийслэлийн хурлаас тогтоосон хувь", min: 0, porDefecto: 0.6 },
  ],
  calcular(e, v, { redondear }) {
    if (e.khuvi < v["mn.ul-khodlokh-khuvi-dood"] || e.khuvi > v["mn.ul-khodlokh-khuvi-deed"]) throw new ErrorEntrada("Хувь нь хуульд заасан хязгаарт багтах ёстой.", "khuvi");
    return { tatvar: redondear(porcentaje(e.unelgee, e.khuvi)) };
  },
  resultado: [{ clave: "tatvar", etiqueta: "Жилийн албан татвар", formato: "moneda", destacada: true }],
});
