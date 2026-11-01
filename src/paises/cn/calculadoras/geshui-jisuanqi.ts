import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoPorTramos } from "../lib/geshui";

export default definirCalculadora({
  id: "cn.geshui-jisuanqi",
  mercado: "cn",
  concepto: "impuesto-renta",
  slug: "geshui-jisuanqi",
  estado: "publicado",
  requiere: {
    "cn.zonghe-suode-shuilv": "escala",
    "cn.jianchu-feiyong-nian": "numero",
    "cn.laowu-feiyong-bili": "numero",
    "cn.gaochou-jianan-bili": "numero",
  },
  campos: [
    { id: "gongzi", tipo: "moneda", etiqueta: "全年工资、薪金收入（税前）", min: 0, porDefecto: 180000 },
    { id: "laowu", tipo: "moneda", etiqueta: "全年劳务报酬收入", min: 0, porDefecto: 0 },
    { id: "gaochou", tipo: "moneda", etiqueta: "全年稿酬收入", min: 0, porDefecto: 0 },
    { id: "texu", tipo: "moneda", etiqueta: "全年特许权使用费收入", min: 0, porDefecto: 0 },
    { id: "zhuanxiang", tipo: "moneda", etiqueta: "专项扣除（个人缴纳的社保和住房公积金，全年）", min: 0, porDefecto: 0 },
    { id: "fujia", tipo: "moneda", etiqueta: "专项附加扣除（全年合计）", min: 0, porDefecto: 0 },
    { id: "qita", tipo: "moneda", etiqueta: "依法确定的其他扣除（全年）", min: 0, porDefecto: 0 },
    { id: "yijiao", tipo: "moneda", etiqueta: "全年已预扣预缴的税额", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    const feiyong = 100 - v["cn.laowu-feiyong-bili"];
    const shouru = redondear(
      e.gongzi + porcentaje(e.laowu, feiyong) + porcentaje(porcentaje(e.gaochou, feiyong), v["cn.gaochou-jianan-bili"]) + porcentaje(e.texu, feiyong),
    );
    if (shouru <= 0) throw new ErrorEntrada("请至少填写一项全年收入。", "gongzi");
    const suode = Math.max(0, redondear(shouru - v["cn.jianchu-feiyong-nian"] - e.zhuanxiang - e.fujia - e.qita));
    const t = impuestoPorTramos(v["cn.zonghe-suode-shuilv"], suode);
    const yingna = redondear(t.impuesto);
    const cha = redondear(yingna - e.yijiao);
    return {
      yingna,
      shouru,
      suode,
      tasa: t.tasa,
      kouchu: t.kouchu,
      yingbu: cha > 0 ? cha : 0,
      yingtui: cha < 0 ? -cha : 0,
      shuifu: redondear((yingna / shouru) * 100),
    };
  },
  resultado: [
    { clave: "yingna", etiqueta: "全年应纳个人所得税", formato: "moneda", destacada: true },
    { clave: "yingbu", etiqueta: "年度汇算应补税额", formato: "moneda", ocultarSiCero: true },
    { clave: "yingtui", etiqueta: "年度汇算应退税额", formato: "moneda", ocultarSiCero: true },
    { clave: "shouru", etiqueta: "综合所得收入额", formato: "moneda" },
    { clave: "suode", etiqueta: "全年应纳税所得额", formato: "moneda" },
    { clave: "tasa", etiqueta: "适用税率", formato: "porcentaje", decimales: 0 },
    { clave: "kouchu", etiqueta: "速算扣除数", formato: "moneda" },
    { clave: "shuifu", etiqueta: "实际税负（占收入额）", formato: "porcentaje" },
  ],
});
