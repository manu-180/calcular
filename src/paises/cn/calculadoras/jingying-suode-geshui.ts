import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoPorTramos } from "../lib/geshui";

export default definirCalculadora({
  id: "cn.jingying-suode-geshui",
  mercado: "cn",
  concepto: "regimen-simplificado",
  slug: "jingying-suode-geshui",
  estado: "publicado",
  requiere: {
    "cn.jingying-suode-shuilv": "escala",
  },
  campos: [
    { id: "shouru", tipo: "moneda", etiqueta: "全年收入总额", min: 0, porDefecto: 300000 },
    { id: "chengben", tipo: "moneda", etiqueta: "全年成本、费用以及损失", min: 0, porDefecto: 200000 },
    { id: "qita", tipo: "moneda", etiqueta: "其他可以减除的金额（可不填）", min: 0, porDefecto: 0, ayuda: "例如依法可以扣除的公益慈善捐赠。没有就填0。" },
  ],
  calcular(e, v, { redondear }) {
    if (e.shouru <= 0) throw new ErrorEntrada("请填写全年收入总额。", "shouru");
    const suode = Math.max(0, redondear(e.shouru - e.chengben - e.qita));
    const t = impuestoPorTramos(v["cn.jingying-suode-shuilv"], suode);
    const yingna = redondear(t.impuesto);
    return {
      yingna,
      suode,
      tasa: t.tasa,
      kouchu: t.kouchu,
      shuihou: redondear(suode - yingna),
      shuifu: suode > 0 ? redondear((yingna / suode) * 100) : 0,
    };
  },
  resultado: [
    { clave: "yingna", etiqueta: "经营所得应纳个人所得税", formato: "moneda", destacada: true },
    { clave: "suode", etiqueta: "全年应纳税所得额", formato: "moneda" },
    { clave: "tasa", etiqueta: "适用税率", formato: "porcentaje", decimales: 0 },
    { clave: "kouchu", etiqueta: "速算扣除数", formato: "moneda" },
    { clave: "shuihou", etiqueta: "税后经营所得", formato: "moneda" },
    { clave: "shuifu", etiqueta: "实际税负（占应纳税所得额）", formato: "porcentaje" },
  ],
});
