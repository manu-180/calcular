import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bn.stamp-duty-penalty-calculator",
  mercado: "bn",
  concepto: "propio",
  slug: "stamp-duty-penalty-calculator",
  estado: "publicado",
  requiere: {
    "bn.stamp-early-factor": "numero",
    "bn.stamp-early-minimum": "numero",
    "bn.stamp-late-factor": "numero",
    "bn.stamp-late-minimum": "numero",
    "bn.stamp-grace-days": "numero",
    "bn.stamp-window-months": "numero",
    "bn.stamp-first-home-loan": "numero",
    "bn.stamp-tenancy-rent": "numero",
  },
  campos: [
    { id: "duty", tipo: "moneda", etiqueta: "Stamp duty still unpaid on the instrument", min: 0, porDefecto: 400, ayuda: "The duty the Revenue Division assesses from the First Schedule of the Stamp Act." },
    {
      id: "retraso",
      tipo: "opcion",
      etiqueta: "When you present the instrument for stamping",
      porDefecto: "early",
      opciones: [
        { valor: "ontime", etiqueta: "Within 14 days of signing or of first receipt in Brunei" },
        { valor: "early", etiqueta: "After 14 days and within 3 months" },
        { valor: "late", etiqueta: "After 3 months" },
      ],
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.duty <= 0) throw new ErrorEntrada("Enter the stamp duty that is due.", "duty");
    let penalizacion = 0;
    if (e.retraso === "early") penalizacion = Math.max(e.duty * v["bn.stamp-early-factor"], v["bn.stamp-early-minimum"]);
    if (e.retraso === "late") penalizacion = Math.max(e.duty * v["bn.stamp-late-factor"], v["bn.stamp-late-minimum"]);
    const p = redondear(penalizacion);
    return { penalizacion: p, duty: redondear(e.duty), total: redondear(e.duty + p) };
  },
  resultado: [
    { clave: "penalizacion", etiqueta: "Late stamping penalty", formato: "moneda", destacada: true },
    { clave: "duty", etiqueta: "Stamp duty", formato: "moneda" },
    { clave: "total", etiqueta: "Total to pay", formato: "moneda" },
  ],
});
