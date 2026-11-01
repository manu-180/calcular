import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mn.ovchnii-tetgemj",
  mercado: "mn",
  concepto: "propio",
  slug: "ovchnii-tetgemj",
  estado: "publicado",
  requiere: {
    "mn.ovchnii-khuvi": "mapa",
    "mn.ovchnii-ajil-olgogch-odor": "numero",
    "mn.ovchnii-deed-odor": "numero",
    "mn.ovchnii-jiliin-odor": "numero",
    "mn.tetgemj-huvaagch": "numero",
    "mn.hhdh-sar": "numero",
    "mn.ndsh-dahin": "numero",
  },
  campos: [
    { id: "dundaj", tipo: "moneda", etiqueta: "Сүүлийн 3 сарын дундаж цалин", min: 0, porDefecto: 1050000 },
    { id: "sar", tipo: "entero", etiqueta: "Тэтгэмжийн даатгалын шимтгэл төлсөн сар", min: 0, porDefecto: 70 },
    { id: "odor", tipo: "entero", etiqueta: "Өвчтэй байсан ажлын өдөр", min: 1, max: 132, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dundaj <= 0) throw new ErrorEntrada("Сүүлийн 3 сарын дундаж цалингаа оруулна уу.", "dundaj");
    if (e.sar < 3) throw new ErrorEntrada("3.1 хэсгээр дараалсан гурван сар шимтгэл төлсөн байх шаардлагатай.", "sar");
    const m = v["mn.ovchnii-khuvi"];
    const khuvi = e.sar >= 180 ? m.s180 : e.sar >= 120 ? m.s120 : e.sar >= 60 ? m.s60 : m.s3;
    const suuri = Math.min(e.dundaj, v["mn.hhdh-sar"] * v["mn.ndsh-dahin"]);
    const odriin = porcentaje(suuri / v["mn.tetgemj-huvaagch"], khuvi);
    const olgogchOdor = Math.min(e.odor, v["mn.ovchnii-ajil-olgogch-odor"]);
    const observaciones: string[] = [];
    if (e.odor > v["mn.ovchnii-deed-odor"]) observaciones.push("Нэг удаагийн дээд хугацаа давсан. Онцгой оноштой тохиолдолд л 5.4 хэсгээр 132 өдөр хүртэл олгоно.");
    return {
      niit: redondear(odriin * e.odor),
      khuvi,
      odriin: redondear(odriin),
      ajilOlgogch: redondear(odriin * olgogchOdor),
      san: redondear(odriin * (e.odor - olgogchOdor)),
      observaciones,
    };
  },
  resultado: [
    { clave: "niit", etiqueta: "Нийт тэтгэмж", formato: "moneda", destacada: true },
    { clave: "khuvi", etiqueta: "Тэтгэмж бодох хувь", formato: "porcentaje", decimales: 0 },
    { clave: "odriin", etiqueta: "Нэг өдрийн тэтгэмж", formato: "moneda" },
    { clave: "ajilOlgogch", etiqueta: "Ажил олгогчоос", formato: "moneda" },
    { clave: "san", etiqueta: "Тэтгэмжийн даатгалын сангаас", formato: "moneda", ocultarSiCero: true },
  ],
});
