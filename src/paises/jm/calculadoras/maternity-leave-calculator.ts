import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jm.maternity-leave-calculator",
  mercado: "jm",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "jm.maternity-leave-weeks": "numero",
    "jm.maternity-paid-weeks": "numero",
    "jm.maternity-qualifying-weeks": "numero",
    "jm.maternity-paid-times": "numero",
    "jm.maternity-extension-weeks": "numero",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Your normal pay for a week", min: 0, porDefecto: 40000 },
    { id: "semanas", tipo: "entero", etiqueta: "Weeks you have worked for this employer without a break", min: 0, max: 3000, porDefecto: 80 },
    { id: "veces", tipo: "entero", etiqueta: "Times you have already had paid maternity leave from this employer", min: 0, max: 10, porDefecto: 0 },
    { id: "domestica", tipo: "si-no", etiqueta: "You are a household (domestic) worker", porDefecto: false },
    { id: "menor", tipo: "si-no", etiqueta: "You are under 18", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.semanal < 0) throw new ErrorEntrada("Weekly pay cannot be negative.", "semanal");
    const motivos: string[] = [];
    if (e.semanas < v["jm.maternity-qualifying-weeks"]) motivos.push(`You need ${v["jm.maternity-qualifying-weeks"]} weeks of continuous employment with this employer for paid leave.`);
    if (e.veces >= v["jm.maternity-paid-times"]) motivos.push(`Paid maternity leave can be taken ${v["jm.maternity-paid-times"]} times with the same employer.`);
    if (e.domestica) motivos.push("Household workers are not paid by the employer. They can claim maternity benefit from the National Insurance Scheme.");
    if (e.menor) motivos.push("Workers under 18 are not entitled to paid maternity leave.");
    const pagadas = motivos.length ? 0 : v["jm.maternity-paid-weeks"];
    return {
      pago: redondear(pagadas * e.semanal),
      licencia: v["jm.maternity-leave-weeks"],
      pagadas,
      sinPago: v["jm.maternity-leave-weeks"] - pagadas,
      extension: v["jm.maternity-extension-weeks"],
      observaciones: motivos,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Maternity pay from your employer", formato: "moneda", destacada: true },
    { clave: "licencia", etiqueta: "Maternity leave", formato: "semanas" },
    { clave: "pagadas", etiqueta: "Paid weeks", formato: "semanas" },
    { clave: "sinPago", etiqueta: "Unpaid weeks", formato: "semanas" },
    { clave: "extension", etiqueta: "Unpaid extension on medical grounds, at most", formato: "semanas" },
  ],
});
