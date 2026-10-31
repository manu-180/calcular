import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cn.weiqian-hetong-shuangbei-gongzi",
  mercado: "cn",
  concepto: "propio",
  slug: "weiqian-hetong-shuangbei-gongzi",
  estado: "publicado",
  requiere: {
    "cn.shuangbei-gongzi": "numero",
  },
  campos: [
    { id: "yuegongzi", tipo: "moneda", etiqueta: "月工资", min: 0, porDefecto: 8000 },
    { id: "yueshu", tipo: "entero", etiqueta: "自用工之日起，没签书面劳动合同的月数", min: 0, max: 120, porDefecto: 6 },
  ],
  calcular(e, v, { redondear }) {
    if (e.yuegongzi <= 0) throw new ErrorEntrada("请填写月工资。", "yuegongzi");
    // Corre desde el día siguiente al primer mes completo hasta el día anterior al año (reglamento, art. 7): 11 meses como máximo.
    const yueshu = Math.min(Math.max(e.yueshu - 1, 0), 11);
    const ewai = redondear(e.yuegongzi * (v["cn.shuangbei-gongzi"] - 1) * yueshu);
    const observaciones: string[] = [];
    if (e.yueshu >= 12) observaciones.push("用工满一年仍未订立书面劳动合同的，视为自用工之日起满一年的当日已经订立无固定期限劳动合同，二倍工资最多计算11个月。");
    return { ewai, yueshu, observaciones };
  },
  resultado: [
    { clave: "ewai", etiqueta: "应额外支付的工资（二倍工资差额）", formato: "moneda", destacada: true },
    { clave: "yueshu", etiqueta: "计算二倍工资的月数", formato: "meses" },
  ],
});
