import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cn.jingji-buchangjin",
  mercado: "cn",
  concepto: "indemnizacion-despido",
  slug: "jingji-buchangjin",
  estado: "publicado",
  requiere: {
    "cn.jingji-buchang": "mapa",
    "cn.peichangjin-beishu": "numero",
  },
  campos: [
    { id: "nian", tipo: "entero", etiqueta: "在本单位工作满几年", min: 0, max: 60, porDefecto: 5 },
    { id: "yue", tipo: "entero", etiqueta: "另外还工作了几个月（不满一年的部分）", min: 0, max: 11, porDefecto: 3 },
    { id: "yuegongzi", tipo: "moneda", etiqueta: "解除或终止前十二个月的平均月工资", min: 0, porDefecto: 10000 },
    {
      id: "pingjun",
      tipo: "moneda",
      etiqueta: "当地上年度职工月平均工资（可不填）",
      min: 0,
      requerido: false,
      ayuda: "由直辖市或设区的市级人民政府公布。月工资超过它的三倍时，经济补偿按三倍封顶，年限最多算十二年。",
    },
    { id: "weifa", tipo: "si-no", etiqueta: "单位违法解除或终止劳动合同（按赔偿金计算）", porDefecto: false },
    { id: "daitongzhi", tipo: "si-no", etiqueta: "单位按第四十条解除，没有提前三十日书面通知（N＋1）", porDefecto: false },
    { id: "shangyue", tipo: "moneda", etiqueta: "上一个月的工资（可不填，默认按平均月工资）", min: 0, requerido: false, visibleSi: { daitongzhi: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.yuegongzi <= 0) throw new ErrorEntrada("请填写月工资。", "yuegongzi");
    if (e.nian === 0 && e.yue === 0) throw new ErrorEntrada("请填写工作年限。", "nian");
    const g = v["cn.jingji-buchang"];
    let n = e.nian + (e.yue >= 6 ? 1 : e.yue > 0 ? enMapa(g, "bannian") : 0);
    let jishu = e.yuegongzi;
    let fengding = false;
    if (e.pingjun !== null && e.pingjun > 0 && e.yuegongzi > e.pingjun * enMapa(g, "beishu")) {
      jishu = e.pingjun * enMapa(g, "beishu");
      n = Math.min(n, enMapa(g, "nianxian"));
      fengding = true;
    }
    const buchang = redondear(jishu * n);
    const beishu = e.weifa ? v["cn.peichangjin-beishu"] : 1;
    const observaciones: string[] = fengding ? ["月工资超过当地上年度职工月平均工资三倍，按三倍封顶，年限最多算十二年。"] : [];
    if (e.weifa) observaciones.push("违法解除支付了赔偿金的，不再支付经济补偿。");
    const ewai = e.daitongzhi && !e.weifa ? redondear(e.shangyue ?? e.yuegongzi) : 0;
    if (e.daitongzhi && e.weifa) observaciones.push("选择了违法解除时，计算器按第八十七条的赔偿金计算，没有再计入额外一个月工资。");
    return {
      zonge: redondear(buchang * beishu + ewai),
      ewai,
      n,
      jishu: redondear(jishu),
      buchang,
      observaciones,
    };
  },
  resultado: [
    { clave: "zonge", etiqueta: "应得金额", formato: "moneda", destacada: true },
    { clave: "n", etiqueta: "计算月数（N）", formato: "numero", decimales: 1 },
    { clave: "jishu", etiqueta: "计算基数（月工资）", formato: "moneda" },
    { clave: "buchang", etiqueta: "经济补偿（N）", formato: "moneda" },
    { clave: "ewai", etiqueta: "额外支付的一个月工资（＋1）", formato: "moneda", ocultarSiCero: true },
  ],
});
