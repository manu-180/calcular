import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { leijiYukou, susuanKouchu } from "../lib/geshui";

export default definirCalculadora({
  id: "cn.gongzi-geshui-yukou",
  mercado: "cn",
  concepto: "propio",
  slug: "gongzi-geshui-yukou",
  estado: "publicado",
  requiere: {
    "cn.zonghe-suode-shuilv": "escala",
    "cn.jianchu-feiyong-yue": "numero",
  },
  campos: [
    { id: "yuexin", tipo: "moneda", etiqueta: "每月工资薪金收入（税前）", min: 0, porDefecto: 20000 },
    { id: "zhuanxiang", tipo: "moneda", etiqueta: "每月专项扣除（个人缴纳的社保和公积金）", min: 0, porDefecto: 0 },
    { id: "fujia", tipo: "moneda", etiqueta: "每月专项附加扣除", min: 0, porDefecto: 0 },
    { id: "yuefen", tipo: "entero", etiqueta: "计算第几个月（在本单位任职的第几个月）", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.yuexin <= 0) throw new ErrorEntrada("请填写每月工资。", "yuexin");
    if (e.yuefen < 1 || e.yuefen > 12) throw new ErrorEntrada("月份要在1到12之间。", "yuefen");
    const escala = v["cn.zonghe-suode-shuilv"];
    const m = { shouru: e.yuexin, zhuanxiang: e.zhuanxiang, fujia: e.fujia, qita: 0 };
    const r = leijiYukou(escala, m, v["cn.jianchu-feiyong-yue"], e.yuefen);
    const yijiao = redondear(leijiYukou(escala, m, v["cn.jianchu-feiyong-yue"], e.yuefen - 1).yingna);
    return {
      benyue: redondear(r.benyue),
      leijiSuode: redondear(r.leijiSuode),
      leijiShui: redondear(r.yingna),
      yijiao,
      tasa: r.tasa,
      kouchu: r.leijiSuode > 0 ? susuanKouchu(escala, r.leijiSuode) : 0,
    };
  },
  resultado: [
    { clave: "benyue", etiqueta: "本月应预扣预缴税额", formato: "moneda", destacada: true },
    { clave: "leijiSuode", etiqueta: "累计预扣预缴应纳税所得额", formato: "moneda" },
    { clave: "tasa", etiqueta: "预扣率", formato: "porcentaje", decimales: 0 },
    { clave: "kouchu", etiqueta: "速算扣除数", formato: "moneda" },
    { clave: "leijiShui", etiqueta: "累计应预扣预缴税额", formato: "moneda" },
    { clave: "yijiao", etiqueta: "此前月份累计已预扣税额", formato: "moneda" },
  ],
});
