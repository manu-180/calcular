import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.thirteenth-month-pay-calculator",
  mercado: "sc",
  concepto: "bono-semestral",
  slug: "thirteenth-month-pay-calculator",
  estado: "publicado",
  requiere: { "sc.thirteenth-limit": "numero" },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic monthly salary", min: 0, porDefecto: 25000, ayuda: "Basic salary without allowances or other money benefits." },
    { id: "meses", tipo: "entero", etiqueta: "Months of service in the year", min: 1, max: 12, porDefecto: 12, ayuda: "Count the probation period too." },
    { id: "seychellois", tipo: "si-no", etiqueta: "You are a Seychellois worker", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter the basic monthly salary.", "basico");
    const limite = v["sc.thirteenth-limit"];
    const observaciones = ["The payment falls due on 31 December and must be made on or before 31 January of the next year."];
    let pago = 0;
    if (!e.seychellois) observaciones.push("Non-Seychellois workers are not eligible for thirteenth month pay.");
    else if (e.basico > limite) observaciones.push("A basic salary above the limit is not eligible for thirteenth month pay.");
    else pago = redondear((e.basico * e.meses) / 12);
    return { pago, limite, observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "Thirteenth month pay", formato: "moneda", destacada: true },
    { clave: "limite", etiqueta: "Basic salary limit for eligibility", formato: "moneda" },
  ],
});
