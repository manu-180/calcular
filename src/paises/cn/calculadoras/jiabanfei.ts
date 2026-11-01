import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cn.jiabanfei",
  mercado: "cn",
  concepto: "horas-extra",
  slug: "jiabanfei",
  estado: "publicado",
  requiere: {
    "cn.jiaban-beilv": "mapa",
    "cn.jixin-tianshu": "numero",
  },
  campos: [
    { id: "yuexin", tipo: "moneda", etiqueta: "月工资（加班费计算基数）", min: 0, porDefecto: 8700 },
    { id: "gongzuori", tipo: "numero", etiqueta: "工作日延长工作时间（小时）", min: 0, max: 300, porDefecto: 10 },
    { id: "xiuxiri", tipo: "numero", etiqueta: "休息日加班且没有补休（小时）", min: 0, max: 300, porDefecto: 8 },
    { id: "jiejiari", tipo: "numero", etiqueta: "法定休假日加班（小时）", min: 0, max: 300, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.yuexin <= 0) throw new ErrorEntrada("请填写月工资。", "yuexin");
    const b = v["cn.jiaban-beilv"];
    const rigongzi = e.yuexin / v["cn.jixin-tianshu"];
    const xiaoshi = rigongzi / 8;
    const gongzuori = redondear(porcentaje(e.gongzuori * xiaoshi, enMapa(b, "yanchang")));
    const xiuxiri = redondear(porcentaje(e.xiuxiri * xiaoshi, enMapa(b, "xiuxi")));
    const jiejiari = redondear(porcentaje(e.jiejiari * xiaoshi, enMapa(b, "fading")));
    return {
      heji: redondear(gongzuori + xiuxiri + jiejiari),
      gongzuori,
      xiuxiri,
      jiejiari,
      rigongzi: redondear(rigongzi),
      xiaoshi: redondear(xiaoshi),
    };
  },
  resultado: [
    { clave: "heji", etiqueta: "加班费合计", formato: "moneda", destacada: true },
    { clave: "gongzuori", etiqueta: "工作日延时加班费", formato: "moneda", ocultarSiCero: true },
    { clave: "xiuxiri", etiqueta: "休息日加班费", formato: "moneda", ocultarSiCero: true },
    { clave: "jiejiari", etiqueta: "法定休假日加班费", formato: "moneda", ocultarSiCero: true },
    { clave: "rigongzi", etiqueta: "日工资", formato: "moneda" },
    { clave: "xiaoshi", etiqueta: "小时工资", formato: "moneda" },
  ],
});
