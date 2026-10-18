import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.heslb-loan-repayment",
  mercado: "tz",
  concepto: "propio",
  slug: "heslb-loan-repayment",
  estado: "publicado",
  requiere: {
    "tz.heslb-rate": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic monthly salary", min: 0, porDefecto: 1200000 },
    { id: "saldo", tipo: "moneda", etiqueta: "Loan balance still to repay (optional)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic monthly salary.", "basico");
    const mensual = redondear(porcentaje(e.basico, v["tz.heslb-rate"]));
    const meses = e.saldo !== null && e.saldo > 0 ? Math.ceil(e.saldo / mensual) : null;
    return { mensual, anual: redondear(mensual * 12), meses };
  },
  resultado: [
    { clave: "mensual", etiqueta: "HESLB deduction a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Repaid over 12 months", formato: "moneda" },
    { clave: "meses", etiqueta: "Months to clear the balance at this rate", formato: "meses" },
  ],
});
