import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const MINGCHENG = { usd: "美元（USD）", eur: "欧元（EUR）", jpy100: "日元（JPY）", hkd: "港元（HKD）" } as const;
// El 中间价 del yen se publica por 100 yenes; el resto, por una unidad.
const DANWEI = { usd: 1, eur: 1, jpy100: 100, hkd: 1 } as const;

export default definirCalculadora({
  id: "cn.renminbi-huilv",
  mercado: "cn",
  concepto: "tipo-de-cambio",
  slug: "renminbi-huilv",
  estado: "publicado",
  requiere: {
    "cn.usd": "serie",
    "cn.eur": "serie",
    "cn.jpy100": "serie",
    "cn.hkd": "serie",
  },
  campos: [
    {
      id: "bizhong",
      tipo: "opcion",
      etiqueta: "外币",
      opciones: [
        { valor: "usd", etiqueta: "美元（USD）" },
        { valor: "eur", etiqueta: "欧元（EUR）" },
        { valor: "jpy100", etiqueta: "日元（JPY）" },
        { valor: "hkd", etiqueta: "港元（HKD）" },
      ],
      porDefecto: "usd",
    },
    {
      id: "fangxiang",
      tipo: "opcion",
      etiqueta: "换算方向",
      opciones: [
        { valor: "dao-rmb", etiqueta: "外币换人民币" },
        { valor: "cong-rmb", etiqueta: "人民币换外币" },
      ],
      porDefecto: "dao-rmb",
    },
    { id: "jine", tipo: "numero", etiqueta: "金额", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.jine <= 0) throw new ErrorEntrada("请输入大于0的金额。", "jine");
    const { valor, fecha } = v[`cn.${e.bizhong}`];
    const danjia = valor / DANWEI[e.bizhong];
    const daoRmb = e.fangxiang === "dao-rmb";
    return {
      jieguo: redondear(daoRmb ? e.jine * danjia : e.jine / danjia),
      bizhongJieguo: daoRmb ? "人民币（CNY）" : MINGCHENG[e.bizhong],
      zhongjianjia: valor,
      fanxiang: 1 / danjia,
      fecha,
      observaciones: [
        e.bizhong === "jpy100" ? "日元中间价按100日元折合人民币公布。" : "这是中国外汇交易中心根据中国人民银行授权发布的人民币汇率中间价。",
        "银行买卖外汇使用各自的现汇、现钞买入价和卖出价，和中间价不同。",
      ],
    };
  },
  resultado: [
    { clave: "jieguo", etiqueta: "换算结果", formato: "numero", decimales: 2, destacada: true },
    { clave: "bizhongJieguo", etiqueta: "结果币种", formato: "texto" },
    { clave: "zhongjianjia", etiqueta: "人民币汇率中间价", formato: "numero", decimales: 4 },
    { clave: "fanxiang", etiqueta: "1元人民币可换外币", formato: "numero", decimales: 6 },
    { clave: "fecha", etiqueta: "中间价日期", formato: "fecha" },
  ],
});
