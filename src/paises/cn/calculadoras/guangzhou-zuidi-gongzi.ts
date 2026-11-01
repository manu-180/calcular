import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cn.guangzhou-zuidi-gongzi",
  mercado: "cn",
  concepto: "salario-minimo",
  slug: "guangzhou-zuidi-gongzi",
  estado: "publicado",
  requiere: {
    "cn.guangzhou-zuidi-yue": "numero",
    "cn.guangzhou-zuidi-xiaoshi": "numero",
  },
  campos: [
    {
      id: "leixing",
      tipo: "opcion",
      etiqueta: "就业形式",
      opciones: [
        { valor: "quanrizhi", etiqueta: "全日制（按月）" },
        { valor: "feiquanrizhi", etiqueta: "非全日制（按小时）" },
      ],
      porDefecto: "quanrizhi",
    },
    { id: "gongzi", tipo: "moneda", etiqueta: "实际工资（全日制填月工资，非全日制填小时工资）", min: 0, porDefecto: 2800 },
    { id: "xiaoshi", tipo: "numero", etiqueta: "本月工作小时数", min: 0, max: 400, porDefecto: 80, visibleSi: { leixing: ["feiquanrizhi"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.gongzi <= 0) throw new ErrorEntrada("请填写工资。", "gongzi");
    const quanrizhi = e.leixing === "quanrizhi";
    const biaozhun = quanrizhi ? v["cn.guangzhou-zuidi-yue"] : v["cn.guangzhou-zuidi-xiaoshi"];
    const cha = redondear(biaozhun - e.gongzi);
    const xiaoshi = e.xiaoshi ?? 0;
    return {
      biaozhun,
      dabiao: cha <= 0 ? "达到最低工资标准" : "低于最低工资标准",
      chae: cha > 0 ? cha : 0,
      yuedi: quanrizhi ? null : redondear(biaozhun * xiaoshi),
    };
  },
  resultado: [
    { clave: "dabiao", etiqueta: "是否达标", formato: "texto", destacada: true },
    { clave: "biaozhun", etiqueta: "广州市最低工资标准", formato: "moneda" },
    { clave: "chae", etiqueta: "低于标准的差额", formato: "moneda", ocultarSiCero: true },
    { clave: "yuedi", etiqueta: "按小时标准计算的本月最低报酬", formato: "moneda" },
  ],
});
