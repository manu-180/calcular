import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cn.shiyongqi-gongzi",
  mercado: "cn",
  concepto: "propio",
  slug: "shiyongqi-gongzi",
  estado: "publicado",
  requiere: {
    "cn.shiyongqi": "mapa",
    "cn.shiyongqi-gongzi": "numero",
  },
  campos: [
    {
      id: "qixian",
      tipo: "opcion",
      etiqueta: "劳动合同期限",
      opciones: [
        { valor: "wu", etiqueta: "不满三个月，或以完成一定工作任务为期限" },
        { valor: "duan", etiqueta: "三个月以上不满一年" },
        { valor: "zhong", etiqueta: "一年以上不满三年" },
        { valor: "chang", etiqueta: "三年以上固定期限或无固定期限" },
      ],
      porDefecto: "chang",
    },
    { id: "yueding", tipo: "moneda", etiqueta: "劳动合同约定的月工资", min: 0, porDefecto: 10000 },
    { id: "zuidi", tipo: "moneda", etiqueta: "当地月最低工资标准（可不填）", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.yueding <= 0) throw new ErrorEntrada("请填写约定的月工资。", "yueding");
    const shangxian = e.qixian === "wu" ? 0 : enMapa(v["cn.shiyongqi"], e.qixian);
    const bashi = redondear(porcentaje(e.yueding, v["cn.shiyongqi-gongzi"]));
    const zuidi = e.zuidi ?? 0;
    const observaciones: string[] = [];
    if (shangxian === 0) observaciones.push("这类劳动合同不得约定试用期。");
    if (zuidi > bashi) observaciones.push(`约定工资的${v["cn.shiyongqi-gongzi"]}%低于当地最低工资标准，试用期工资不得低于最低工资标准。`);
    observaciones.push("试用期工资还不得低于本单位相同岗位最低档工资。");
    return { shangxian, zuidiGongzi: Math.max(bashi, zuidi), bashi, observaciones };
  },
  resultado: [
    { clave: "zuidiGongzi", etiqueta: "试用期月工资不得低于", formato: "moneda", destacada: true },
    { clave: "shangxian", etiqueta: "试用期最长", formato: "meses" },
    { clave: "bashi", etiqueta: "按约定工资比例计算的下限", formato: "moneda" },
  ],
});
