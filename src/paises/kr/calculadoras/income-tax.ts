import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoBasico, tasaMarginal, truncar10 } from "../lib/impuestos";

export default definirCalculadora({
  id: "kr.income-tax",
  mercado: "kr",
  concepto: "impuesto-renta",
  slug: "income-tax",
  estado: "publicado",
  requiere: {
    "kr.income-tax-brackets": "escala",
    "kr.local-income-tax-rate": "numero",
    "kr.basic-deduction": "numero",
  },
  campos: [
    { id: "sodeuk", tipo: "moneda", etiqueta: "종합소득금액(수입에서 필요경비를 뺀 금액)", min: 0, porDefecto: 50000000 },
    { id: "gongje", tipo: "moneda", etiqueta: "소득공제 합계(기본공제 포함)", min: 0, porDefecto: 1500000, ayuda: "본인과 부양가족의 기본공제, 국민연금 보험료 등을 더한 금액이에요." },
    { id: "seaekGongje", tipo: "moneda", etiqueta: "세액공제·감면 합계", min: 0, porDefecto: 0 },
    { id: "ginabbu", tipo: "moneda", etiqueta: "이미 낸 소득세(중간예납, 원천징수)", min: 0, porDefecto: 0 },
  ],
  calcular(e, v) {
    if (e.sodeuk <= 0) throw new ErrorEntrada("종합소득금액을 입력하세요.", "sodeuk");
    const base = Math.max(0, e.sodeuk - e.gongje);
    const calculado = impuestoBasico(base, v["kr.income-tax-brackets"]);
    const determinado = truncar10(Math.max(0, calculado - e.seaekGongje));
    const local = truncar10((determinado * v["kr.local-income-tax-rate"]) / 100);
    const pagar = determinado - e.ginabbu;
    const observaciones: string[] = [];
    if (e.gongje < v["kr.basic-deduction"]) observaciones.push("소득공제에 본인 기본공제가 들어갔는지 확인하세요.");
    if (pagar < 0) observaciones.push("이미 낸 세금이 결정세액보다 많아서 차액을 돌려받아요.");
    return {
      pagar,
      base,
      calculado,
      determinado,
      local,
      total: determinado + local,
      marginal: tasaMarginal(v["kr.income-tax-brackets"], base),
      efectiva: (determinado / e.sodeuk) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "pagar", etiqueta: "추가로 낼 소득세(마이너스면 환급)", formato: "moneda", destacada: true },
    { clave: "determinado", etiqueta: "결정세액(소득세)", formato: "moneda" },
    { clave: "local", etiqueta: "지방소득세", formato: "moneda" },
    { clave: "total", etiqueta: "소득세와 지방소득세 합계", formato: "moneda" },
    { clave: "base", etiqueta: "과세표준", formato: "moneda" },
    { clave: "calculado", etiqueta: "산출세액", formato: "moneda" },
    { clave: "marginal", etiqueta: "적용 최고 세율", formato: "porcentaje", decimales: 0 },
    { clave: "efectiva", etiqueta: "실효세율(소득금액 대비)", formato: "porcentaje", decimales: 2 },
  ],
});
