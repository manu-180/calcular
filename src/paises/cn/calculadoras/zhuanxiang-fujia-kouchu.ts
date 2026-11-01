import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cn.zhuanxiang-fujia-kouchu",
  mercado: "cn",
  concepto: "propio",
  slug: "zhuanxiang-fujia-kouchu",
  estado: "publicado",
  requiere: {
    "cn.zhuanxiang-yiyang": "mapa",
    "cn.zhuanxiang-zhufang": "mapa",
  },
  campos: [
    { id: "zinv", tipo: "entero", etiqueta: "接受学前或学历教育的子女人数", min: 0, max: 10, porDefecto: 1 },
    { id: "yingyouer", tipo: "entero", etiqueta: "3岁以下婴幼儿人数", min: 0, max: 10, porDefecto: 0 },
    {
      id: "fumuBili",
      tipo: "opcion",
      etiqueta: "子女和婴幼儿的扣除方式",
      opciones: [
        { valor: "100", etiqueta: "由我一方按100%扣除" },
        { valor: "50", etiqueta: "父母双方各按50%扣除" },
      ],
      porDefecto: "100",
    },
    {
      id: "zhufang",
      tipo: "opcion",
      etiqueta: "住房",
      opciones: [
        { valor: "wu", etiqueta: "不扣除" },
        { valor: "daikuan", etiqueta: "首套住房贷款利息" },
        { valor: "zujin-yi", etiqueta: "住房租金：直辖市、省会、计划单列市等" },
        { valor: "zujin-er", etiqueta: "住房租金：市辖区户籍人口超过100万的城市" },
        { valor: "zujin-san", etiqueta: "住房租金：市辖区户籍人口不超过100万的城市" },
      ],
      porDefecto: "wu",
    },
    {
      id: "shanyang",
      tipo: "opcion",
      etiqueta: "赡养老人",
      opciones: [
        { valor: "wu", etiqueta: "不扣除" },
        { valor: "dusheng", etiqueta: "独生子女" },
        { valor: "fenshan", etiqueta: "非独生子女（与兄弟姐妹分摊）" },
      ],
      porDefecto: "wu",
    },
    { id: "fenshanE", tipo: "moneda", etiqueta: "每月分摊到的赡养老人扣除额", min: 0, porDefecto: 1500, visibleSi: { shanyang: ["fenshan"] } },
    { id: "jixuXueli", tipo: "si-no", etiqueta: "正在接受学历（学位）继续教育", porDefecto: false },
    { id: "jixuZhengshu", tipo: "si-no", etiqueta: "今年取得职业资格继续教育证书", porDefecto: false },
    { id: "dabing", tipo: "moneda", etiqueta: "全年医保目录内个人自付医药费", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    const y = v["cn.zhuanxiang-yiyang"];
    const z = v["cn.zhuanxiang-zhufang"];
    const bili = Number(e.fumuBili);
    const zinv = porcentaje(e.zinv * enMapa(y, "zinv"), bili);
    const yingyouer = porcentaje(e.yingyouer * enMapa(y, "yingyouer"), bili);
    const zhufang = e.zhufang === "wu" ? 0 : enMapa(z, e.zhufang);
    let shanyang = 0;
    if (e.shanyang === "dusheng") shanyang = enMapa(y, "shanyang-dusheng");
    if (e.shanyang === "fenshan") {
      const tope = enMapa(y, "shanyang-fenshan");
      const fen = e.fenshanE ?? 0;
      if (fen > tope) throw new ErrorEntrada(`非独生子女每人每月分摊的额度不能超过${tope}元。`, "fenshanE");
      shanyang = fen;
    }
    const jixu = e.jixuXueli ? enMapa(z, "jixu-xueli") : 0;
    const meiyue = redondear(zinv + yingyouer + zhufang + shanyang + jixu);
    const zhengshu = e.jixuZhengshu ? enMapa(z, "jixu-zhengshu") : 0;
    const dabing = Math.min(Math.max(0, e.dabing - enMapa(z, "dabing-qifu")), enMapa(z, "dabing-xiane"));
    return {
      nian: redondear(meiyue * 12 + zhengshu + dabing),
      meiyue,
      zinv: redondear(zinv),
      yingyouer: redondear(yingyouer),
      zhufang,
      shanyang,
      jixu: redondear(jixu * 12 + zhengshu),
      dabing: redondear(dabing),
    };
  },
  resultado: [
    { clave: "nian", etiqueta: "全年专项附加扣除合计", formato: "moneda", destacada: true },
    { clave: "meiyue", etiqueta: "每月可在工资中扣除", formato: "moneda" },
    { clave: "zinv", etiqueta: "子女教育（每月）", formato: "moneda", ocultarSiCero: true },
    { clave: "yingyouer", etiqueta: "3岁以下婴幼儿照护（每月）", formato: "moneda", ocultarSiCero: true },
    { clave: "zhufang", etiqueta: "住房贷款利息或住房租金（每月）", formato: "moneda", ocultarSiCero: true },
    { clave: "shanyang", etiqueta: "赡养老人（每月）", formato: "moneda", ocultarSiCero: true },
    { clave: "jixu", etiqueta: "继续教育（全年）", formato: "moneda", ocultarSiCero: true },
    { clave: "dabing", etiqueta: "大病医疗（年度汇算时扣除）", formato: "moneda", ocultarSiCero: true },
  ],
});
