import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mn.tetgever-tootsooluur",
  mercado: "mn",
  concepto: "jubilacion",
  slug: "tetgever-tootsooluur",
  estado: "borrador",
  requiere: {
    "mn.tetgever-suuri": "numero",
    "mn.tetgever-nemelt": "numero",
    "mn.tetgever-khuvi-tentsuulekh": "numero",
  },
  campos: [
    { id: "dundaj", tipo: "moneda", etiqueta: "Сарын дундаж цалин", min: 0, porDefecto: 1500000 },
    { id: "sar", tipo: "entero", etiqueta: "Шимтгэл төлсөн сар", min: 1, porDefecto: 300 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dundaj <= 0) throw new ErrorEntrada("Сарын дундаж цалингаа оруулна уу.", "dundaj");
    const khuvi = e.sar >= 240 ? v["mn.tetgever-suuri"] + (e.sar - 240) * v["mn.tetgever-nemelt"] : e.sar * v["mn.tetgever-khuvi-tentsuulekh"];
    return { tetgever: redondear(porcentaje(e.dundaj, khuvi)), khuvi };
  },
  resultado: [
    { clave: "tetgever", etiqueta: "Сарын тэтгэвэр", formato: "moneda", destacada: true },
    { clave: "khuvi", etiqueta: "Цалингийн хувь", formato: "porcentaje", decimales: 2 },
  ],
});
