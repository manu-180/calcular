import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { impuestoBasico, piso, truncar10 } from "../lib/impuestos";

export default definirCalculadora({
  id: "kr.gift-tax",
  mercado: "kr",
  concepto: "propio",
  slug: "gift-tax",
  estado: "publicado",
  requiere: {
    "kr.gift-inheritance-tax-brackets": "escala",
    "kr.gift-deductions": "mapa",
    "kr.gift-inheritance-minimum": "numero",
    "kr.filing-tax-credit": "numero",
  },
  campos: [
    { id: "gaek", tipo: "moneda", etiqueta: "증여받는 재산 가액", min: 0, porDefecto: 100000000 },
    { id: "gwangye", tipo: "opcion-dato", dato: "kr.gift-deductions", etiqueta: "증여하는 사람", porDefecto: "lineal" },
    { id: "ijeon", tipo: "moneda", etiqueta: "최근 10년간 같은 관계에서 이미 받은 공제액", min: 0, porDefecto: 0, ayuda: "예를 들어 부모님께 받은 증여로 이미 공제받은 금액이에요." },
    { id: "singo", tipo: "si-no", etiqueta: "기한 안에 신고해요(신고세액공제)", porDefecto: true },
  ],
  calcular(e, v) {
    if (e.gaek <= 0) throw new ErrorEntrada("증여재산 가액을 입력하세요.", "gaek");
    const limite = enMapa(v["kr.gift-deductions"], e.gwangye);
    const deduccion = Math.min(e.gaek, Math.max(0, limite - e.ijeon));
    const base = e.gaek - deduccion;
    const minimo = base < v["kr.gift-inheritance-minimum"];
    const calculado = minimo ? 0 : impuestoBasico(base, v["kr.gift-inheritance-tax-brackets"]);
    const credito = e.singo ? piso((calculado * v["kr.filing-tax-credit"]) / 100) : 0;
    const impuesto = truncar10(calculado - credito);
    const observaciones: string[] = [];
    if (minimo && base > 0) observaciones.push("과세표준이 과세최저한보다 적어서 증여세가 없어요.");
    observaciones.push("증여받은 날이 속하는 달의 말일부터 3개월 안에 신고해야 신고세액공제를 받아요.");
    return { impuesto, deduccion, base, calculado, credito, efectiva: (impuesto / e.gaek) * 100, observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "납부할 증여세", formato: "moneda", destacada: true },
    { clave: "deduccion", etiqueta: "증여재산 공제", formato: "moneda" },
    { clave: "base", etiqueta: "과세표준", formato: "moneda" },
    { clave: "calculado", etiqueta: "산출세액", formato: "moneda" },
    { clave: "credito", etiqueta: "신고세액공제", formato: "moneda" },
    { clave: "efectiva", etiqueta: "실효세율", formato: "porcentaje", decimales: 2 },
  ],
});
