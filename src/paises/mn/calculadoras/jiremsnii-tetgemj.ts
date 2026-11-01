import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mn.jiremsnii-tetgemj",
  mercado: "mn",
  concepto: "propio",
  slug: "jiremsnii-tetgemj",
  estado: "publicado",
  requiere: {
    "mn.jiremsnii-khuvi": "numero",
    "mn.jiremsnii-khonog": "numero",
    "mn.jiremsnii-ikher-khonog": "numero",
    "mn.jiremsnii-shimtgel-sar": "numero",
    "mn.tetgemj-huvaagch": "numero",
    "mn.hhdh-sar": "numero",
    "mn.ndsh-dahin": "numero",
  },
  campos: [
    { id: "dundaj", tipo: "moneda", etiqueta: "Сүүлийн 12 сарын дундаж цалин", min: 0, porDefecto: 1050000 },
    { id: "ikher", tipo: "si-no", etiqueta: "Ихэр хүүхэд", porDefecto: false },
    { id: "ajlynOdor", tipo: "entero", etiqueta: "Хугацаанд таарах ажлын өдөр (мэдэхгүй бол хоосон)", min: 1, max: 140, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dundaj <= 0) throw new ErrorEntrada("Сүүлийн 12 сарын дундаж цалингаа оруулна уу.", "dundaj");
    const khonog = e.ikher ? v["mn.jiremsnii-ikher-khonog"] : v["mn.jiremsnii-khonog"];
    const odor = e.ajlynOdor ?? Math.round((khonog * 5) / 7);
    const suuri = Math.min(e.dundaj, v["mn.hhdh-sar"] * v["mn.ndsh-dahin"]);
    const odriin = porcentaje(suuri / v["mn.tetgemj-huvaagch"], v["mn.jiremsnii-khuvi"]);
    return {
      niit: redondear(odriin * odor),
      odriin: redondear(odriin),
      odor,
      khonog,
      observaciones: e.ajlynOdor === null ? ["Ажлын өдрийг хоногийн тавны долоогоор ойролцоогоор бодов. Яг өдрийг нийгмийн даатгалын байцаагчаас лавлана уу."] : [],
    };
  },
  resultado: [
    { clave: "niit", etiqueta: "Жирэмсний болон амаржсаны тэтгэмж", formato: "moneda", destacada: true },
    { clave: "odriin", etiqueta: "Нэг өдрийн тэтгэмж", formato: "moneda" },
    { clave: "odor", etiqueta: "Тооцсон ажлын өдөр", formato: "dias" },
    { clave: "khonog", etiqueta: "Амралтын хоног", formato: "dias" },
  ],
});
