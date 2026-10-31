import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { leijiYukou } from "../lib/geshui";

export default definirCalculadora({
  id: "cn.shuihou-gongzi",
  mercado: "cn",
  concepto: "sueldo-neto",
  slug: "shuihou-gongzi",
  estado: "publicado",
  requiere: {
    "cn.zonghe-suode-shuilv": "escala",
    "cn.jianchu-feiyong-yue": "numero",
    "cn.yanglao-geren": "numero",
    "cn.yiliao-geren": "numero",
    "cn.gongjijin-xiaxian": "numero",
  },
  campos: [
    { id: "yuexin", tipo: "moneda", etiqueta: "税前月薪", min: 0, porDefecto: 10000 },
    {
      id: "jishu",
      tipo: "moneda",
      etiqueta: "社保和公积金缴费基数（每月，可不填）",
      min: 0,
      requerido: false,
      ayuda: "不填就按税前月薪计算。各地有缴费基数上下限，以单位或当地社保、公积金中心核定的基数为准。",
    },
    { id: "shiye", tipo: "porcentaje", etiqueta: "失业保险个人费率（%）", min: 0, max: 5, porDefecto: 0, ayuda: "失业保险个人费率由各地规定，请按工资条或当地规定填写。" },
    { id: "gongjijin", tipo: "porcentaje", etiqueta: "住房公积金个人缴存比例（%）", min: 0, max: 20, porDefecto: 5 },
    { id: "fujia", tipo: "moneda", etiqueta: "每月专项附加扣除合计", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.yuexin <= 0) throw new ErrorEntrada("请填写税前月薪。", "yuexin");
    const base = e.jishu ?? e.yuexin;
    const yanglao = redondear(porcentaje(base, v["cn.yanglao-geren"]));
    const yiliao = redondear(porcentaje(base, v["cn.yiliao-geren"]));
    const shiye = redondear(porcentaje(base, e.shiye));
    const gongjijin = redondear(porcentaje(base, e.gongjijin));
    const zhuanxiang = redondear(yanglao + yiliao + shiye + gongjijin);
    const mensual = { shouru: e.yuexin, zhuanxiang, fujia: e.fujia, qita: 0 };
    const jianchu = v["cn.jianchu-feiyong-yue"];
    const escala = v["cn.zonghe-suode-shuilv"];
    const nian = leijiYukou(escala, mensual, jianchu, 12);
    const geshuiNian = redondear(nian.yingna);
    const shuihouNian = redondear(12 * (e.yuexin - zhuanxiang) - geshuiNian);
    const observaciones: string[] = [];
    if (e.gongjijin > 0 && e.gongjijin < v["cn.gongjijin-xiaxian"]) {
      observaciones.push(`住房公积金管理条例规定缴存比例不得低于${v["cn.gongjijin-xiaxian"]}%，请核对您填写的比例。`);
    }
    if (nian.tasa > 3) {
      observaciones.push("按累计预扣法，年初几个月预扣的个税较少，累计所得升档后每月预扣会变多，所以每月到手金额并不完全相同。");
    }
    return {
      shuihou: redondear(shuihouNian / 12),
      shuihouNian,
      yanglao,
      yiliao,
      shiye,
      gongjijin,
      zhuanxiang,
      geshuiYue1: redondear(leijiYukou(escala, mensual, jianchu, 1).benyue),
      geshuiYue12: redondear(leijiYukou(escala, mensual, jianchu, 12).benyue),
      geshuiNian,
      tasa: nian.tasa,
      observaciones,
    };
  },
  resultado: [
    { clave: "shuihou", etiqueta: "月均税后工资（到手）", formato: "moneda", destacada: true },
    { clave: "shuihouNian", etiqueta: "全年税后收入", formato: "moneda" },
    { clave: "yanglao", etiqueta: "养老保险（个人）", formato: "moneda" },
    { clave: "yiliao", etiqueta: "医疗保险（个人）", formato: "moneda" },
    { clave: "shiye", etiqueta: "失业保险（个人）", formato: "moneda", ocultarSiCero: true },
    { clave: "gongjijin", etiqueta: "住房公积金（个人）", formato: "moneda", ocultarSiCero: true },
    { clave: "zhuanxiang", etiqueta: "每月个人缴纳合计", formato: "moneda" },
    { clave: "geshuiYue1", etiqueta: "1月预扣个税", formato: "moneda" },
    { clave: "geshuiYue12", etiqueta: "12月预扣个税", formato: "moneda" },
    { clave: "geshuiNian", etiqueta: "全年个税", formato: "moneda" },
    { clave: "tasa", etiqueta: "全年最高适用税率", formato: "porcentaje", decimales: 0 },
  ],
  mundo: { bruto: "yuexin", periodoBruto: "mes", neto: "shuihou", periodoNeto: "mes" },
});
