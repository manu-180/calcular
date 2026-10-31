import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cn.zengzhishui",
  mercado: "cn",
  concepto: "iva",
  slug: "zengzhishui",
  estado: "publicado",
  requiere: {
    "cn.zengzhishui": "mapa",
  },
  campos: [
    {
      id: "fangxiang",
      tipo: "opcion",
      etiqueta: "计算方式",
      opciones: [
        { valor: "buhan", etiqueta: "已知不含税价，算含税价" },
        { valor: "han", etiqueta: "已知含税价，价税分离" },
      ],
      porDefecto: "han",
    },
    { id: "jine", tipo: "moneda", etiqueta: "金额", min: 0, porDefecto: 11300 },
    { id: "shuilv", tipo: "opcion-dato", etiqueta: "税率或征收率", dato: "cn.zengzhishui", porDefecto: "huowu" },
  ],
  calcular(e, v, { redondear }) {
    if (e.jine <= 0) throw new ErrorEntrada("请填写金额。", "jine");
    const tasa = enMapa(v["cn.zengzhishui"], e.shuilv);
    const buhan = e.fangxiang === "buhan" ? e.jine : redondear(e.jine / (1 + tasa / 100));
    const shui = e.fangxiang === "buhan" ? redondear(porcentaje(buhan, tasa)) : redondear(e.jine - buhan);
    return { shui, buhan: redondear(buhan), hanshui: redondear(buhan + shui), tasa };
  },
  resultado: [
    { clave: "shui", etiqueta: "增值税额", formato: "moneda", destacada: true },
    { clave: "buhan", etiqueta: "不含税金额", formato: "moneda" },
    { clave: "hanshui", etiqueta: "价税合计", formato: "moneda" },
    { clave: "tasa", etiqueta: "适用税率", formato: "porcentaje", decimales: 0 },
  ],
});
