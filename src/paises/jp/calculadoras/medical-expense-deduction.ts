import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "jp.medical-expense-deduction",
  mercado: "jp",
  concepto: "propio",
  slug: "medical-expense-deduction",
  estado: "publicado",
  requiere: {
    "jp.medical-deduction": "mapa",
    "jp.medical-deduction-income-rate": "numero",
    "jp.income-tax-brackets": "escala",
    "jp.income-surtax-rate": "numero",
    "jp.resident-tax-rate": "numero",
  },
  campos: [
    { id: "gastos", tipo: "moneda", etiqueta: "1年間に支払った医療費", min: 0, porDefecto: 300000 },
    { id: "reintegro", tipo: "moneda", etiqueta: "保険金などで補てんされる額（高額療養費、出産育児一時金など）", min: 0, porDefecto: 0 },
    { id: "ingresos", tipo: "moneda", etiqueta: "総所得金額等（給与所得控除後の金額など）", min: 0, porDefecto: 3500000 },
    { id: "kazei", tipo: "moneda", etiqueta: "課税される所得金額（源泉徴収票や確定申告書の金額）", min: 0, porDefecto: 2000000 },
  ],
  calcular(entrada, v) {
    if (entrada.gastos <= 0) throw new ErrorEntrada("支払った医療費を入力してください。", "gastos");
    const m = v["jp.medical-deduction"];
    const umbral = entrada.ingresos < m["income-limit"] ? Math.min(m.threshold, (entrada.ingresos * v["jp.medical-deduction-income-rate"]) / 100) : m.threshold;
    const deduccion = Math.floor(Math.min(m.cap, Math.max(0, entrada.gastos - entrada.reintegro - umbral)));
    const tasa = tasaMarginal(v["jp.income-tax-brackets"], entrada.kazei);
    const renta = Math.floor((deduccion * tasa * (100 + v["jp.income-surtax-rate"])) / 10000 + 1e-6);
    const residente = Math.floor((deduccion * v["jp.resident-tax-rate"]) / 100);
    return { deduccion, umbral, tasa, renta, residente, total: renta + residente };
  },
  resultado: [
    { clave: "deduccion", etiqueta: "医療費控除の額", formato: "moneda", destacada: true },
    { clave: "renta", etiqueta: "所得税の減る額（目安）", formato: "moneda" },
    { clave: "residente", etiqueta: "住民税の減る額（目安）", formato: "moneda" },
    { clave: "total", etiqueta: "税金の減る額の合計（目安）", formato: "moneda" },
    { clave: "umbral", etiqueta: "医療費から差し引く額", formato: "moneda" },
    { clave: "tasa", etiqueta: "所得税の税率", formato: "porcentaje", decimales: 0 },
  ],
});
