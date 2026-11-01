import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { filaDe, susuanKouchu } from "../lib/geshui";

export default definirCalculadora({
  id: "cn.nianzhongjiang-geshui",
  mercado: "cn",
  concepto: "propio",
  slug: "nianzhongjiang-geshui",
  estado: "publicado",
  requiere: {
    "cn.yuedu-shuilv": "escala",
    "cn.zonghe-suode-shuilv": "escala",
  },
  campos: [
    { id: "jiangjin", tipo: "moneda", etiqueta: "全年一次性奖金（年终奖）", min: 0, porDefecto: 30000 },
    {
      id: "qitaSuode",
      tipo: "moneda",
      etiqueta: "不含奖金的全年综合所得应纳税所得额（用于比较并入计税）",
      min: 0,
      porDefecto: 0,
      ayuda: "全年收入减去每年的减除费用、专项扣除、专项附加扣除后的余额；为负数时填0。",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.jiangjin <= 0) throw new ErrorEntrada("请填写年终奖金额。", "jiangjin");
    const yuedu = v["cn.yuedu-shuilv"];
    const pingjun = e.jiangjin / 12;
    const tasa = filaDe(yuedu, pingjun).tasa;
    const kouchu = susuanKouchu(yuedu, pingjun);
    const dandu = redondear((e.jiangjin * tasa) / 100 - kouchu);
    const zonghe = v["cn.zonghe-suode-shuilv"];
    const bingru = redondear(aplicarEscalaMarginal(zonghe, e.qitaSuode + e.jiangjin) - aplicarEscalaMarginal(zonghe, e.qitaSuode));
    const jianyi = dandu < bingru ? "单独计税更省" : dandu > bingru ? "并入综合所得更省" : "两种方式税额相同";
    return {
      dandu,
      shuihou: redondear(e.jiangjin - dandu),
      pingjun: redondear(pingjun),
      tasa,
      kouchu,
      bingru,
      jianyi,
      observaciones: ["年终奖单独计税的政策执行至2027年12月31日。"],
    };
  },
  resultado: [
    { clave: "dandu", etiqueta: "单独计税应纳个税", formato: "moneda", destacada: true },
    { clave: "shuihou", etiqueta: "税后年终奖（单独计税）", formato: "moneda" },
    { clave: "pingjun", etiqueta: "奖金除以12个月", formato: "moneda" },
    { clave: "tasa", etiqueta: "适用税率", formato: "porcentaje", decimales: 0 },
    { clave: "kouchu", etiqueta: "速算扣除数", formato: "moneda" },
    { clave: "bingru", etiqueta: "并入综合所得多缴的个税", formato: "moneda" },
    { clave: "jianyi", etiqueta: "比较结果", formato: "texto" },
  ],
});
