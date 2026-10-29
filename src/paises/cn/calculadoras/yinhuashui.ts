import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cn.yinhuashui",
  mercado: "cn",
  concepto: "propio",
  slug: "yinhuashui",
  estado: "publicado",
  requiere: {
    "cn.yinhuashui": "mapa",
  },
  campos: [
    { id: "shuimu", tipo: "opcion-dato", etiqueta: "税目（计税依据）", dato: "cn.yinhuashui", porDefecto: "maimai" },
    { id: "jine", tipo: "moneda", etiqueta: "计税金额（合同或书据列明的金额，不含增值税）", min: 0, porDefecto: 100000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.jine <= 0) throw new ErrorEntrada("请填写计税金额。", "jine");
    const tasa = enMapa(v["cn.yinhuashui"], e.shuimu);
    return { shui: redondear(porcentaje(e.jine, tasa)), qianfenlv: tasa * 10, wanfenlv: tasa * 100 };
  },
  resultado: [
    { clave: "shui", etiqueta: "应纳印花税（每一方）", formato: "moneda", destacada: true },
    { clave: "wanfenlv", etiqueta: "税率（万分之）", formato: "numero", decimales: 1 },
    { clave: "qianfenlv", etiqueta: "税率（千分之）", formato: "numero", decimales: 2 },
  ],
});
