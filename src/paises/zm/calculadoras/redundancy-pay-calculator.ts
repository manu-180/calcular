import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "zm.redundancy-pay-calculator",
  mercado: "zm",
  concepto: "indemnizacion-despido",
  slug: "redundancy-pay-calculator",
  estado: "publicado",
  requiere: {
    "zm.redundancy-months": "numero",
    "zm.medical-discharge-months": "numero",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Why the employment ended",
      opciones: [
        { valor: "redundancy", etiqueta: "Redundancy" },
        { valor: "death", etiqueta: "Death in service" },
        { valor: "medical", etiqueta: "Medical discharge" },
      ],
      porDefecto: "redundancy",
    },
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay a month", min: 0, porDefecto: 6000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, max: 60, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter the basic pay a month.", "basico");
    if (e.anios < 1) throw new ErrorEntrada("The payment builds up per year of service. Enter at least one year.", "anios");
    const meses = e.motivo === "medical" ? v["zm.medical-discharge-months"] : v["zm.redundancy-months"];
    const observaciones =
      e.motivo === "medical"
        ? ["On medical discharge this lump sum comes on top of any other accrued benefits."]
        : e.motivo === "death"
          ? ["If the employee dies before receiving it, the severance pay goes to the estate."]
          : ["Redundancy pay is due no later than the last day of duty. If it is late, the employer keeps paying full wages until it is paid."];
    return { pago: redondear(e.basico * meses * e.anios), mesesPorAnio: meses, mesesTotales: meses * e.anios, observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "Minimum payment", formato: "moneda", destacada: true },
    { clave: "mesesPorAnio", etiqueta: "Months of basic pay per year", formato: "meses" },
    { clave: "mesesTotales", etiqueta: "Months of basic pay in total", formato: "meses" },
  ],
});
