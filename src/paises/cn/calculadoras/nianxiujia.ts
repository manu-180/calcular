import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cn.nianxiujia",
  mercado: "cn",
  concepto: "vacaciones",
  slug: "nianxiujia",
  estado: "publicado",
  requiere: {
    "cn.nianxiujia": "mapa",
    "cn.nianxiujia-beilv": "numero",
    "cn.jixin-tianshu": "numero",
  },
  campos: [
    { id: "nianxian", tipo: "numero", etiqueta: "累计工作年限（年，可含以前的单位）", min: 0, max: 60, porDefecto: 3 },
    { id: "yuexin", tipo: "moneda", etiqueta: "月工资", min: 0, porDefecto: 8700 },
    { id: "weixiu", tipo: "entero", etiqueta: "今年应休未休的年休假天数", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    const m = v["cn.nianxiujia"];
    const tianshu = e.nianxian < 1 ? 0 : e.nianxian < 10 ? enMapa(m, "yi") : e.nianxian < 20 ? enMapa(m, "shi") : enMapa(m, "ershi");
    if (e.weixiu > tianshu) throw new ErrorEntrada(`未休天数不能超过应休的${tianshu}天。`, "weixiu");
    const rigongzi = e.yuexin > 0 ? e.yuexin / v["cn.jixin-tianshu"] : 0;
    const baochou = redondear(porcentaje(rigongzi * e.weixiu, v["cn.nianxiujia-beilv"]));
    const observaciones = tianshu === 0 ? ["职工连续工作1年以上才享受带薪年休假。"] : [];
    return { tianshu, rigongzi: redondear(rigongzi), baochou, observaciones };
  },
  resultado: [
    { clave: "tianshu", etiqueta: "每年带薪年休假", formato: "dias", destacada: true },
    { clave: "rigongzi", etiqueta: "日工资", formato: "moneda", ocultarSiCero: true },
    { clave: "baochou", etiqueta: "应休未休年休假工资报酬", formato: "moneda", ocultarSiCero: true },
  ],
});
