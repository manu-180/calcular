import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jp.withholding-tax",
  mercado: "jp",
  concepto: "retencion-honorarios",
  slug: "withholding-tax",
  estado: "publicado",
  requiere: {
    "jp.withholding-fee": "escala",
    "jp.consumption-tax-standard": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "報酬の額（税抜き）", min: 0, porDefecto: 100000 },
    { id: "iva", tipo: "si-no", etiqueta: "消費税を上乗せして請求します（請求書で区分）", porDefecto: true },
  ],
  calcular(entrada, v) {
    if (entrada.monto <= 0) throw new ErrorEntrada("報酬の額を入力してください。", "monto");
    const shohizei = entrada.iva ? Math.floor((entrada.monto * v["jp.consumption-tax-standard"]) / 100) : 0;
    const retencion = Math.floor(aplicarEscalaMarginal(v["jp.withholding-fee"], entrada.monto) + 1e-6);
    return {
      cobro: entrada.monto + shohizei - retencion,
      retencion,
      shohizei,
      factura: entrada.monto + shohizei,
    };
  },
  resultado: [
    { clave: "cobro", etiqueta: "実際に振り込まれる額", formato: "moneda", destacada: true },
    { clave: "retencion", etiqueta: "源泉徴収税額（所得税と復興特別所得税）", formato: "moneda" },
    { clave: "shohizei", etiqueta: "消費税", formato: "moneda", ocultarSiCero: true },
    { clave: "factura", etiqueta: "請求額（税込み）", formato: "moneda" },
  ],
});
