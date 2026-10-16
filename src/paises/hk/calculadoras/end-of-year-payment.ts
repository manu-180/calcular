import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hk.end-of-year-payment",
  mercado: "hk",
  concepto: "propio",
  slug: "end-of-year-payment",
  estado: "publicado",
  requiere: {},
  campos: [
    {
      id: "importe",
      tipo: "moneda",
      etiqueta: "End of year payment set in your contract",
      ayuda: "Enter 0 if the contract gives one but doesn't say how much: then it's your average monthly wages.",
      min: 0,
      porDefecto: 0,
    },
    { id: "salarioMensual", tipo: "moneda", etiqueta: "Average monthly wages in the last 12 months", min: 0, porDefecto: 18000 },
    {
      id: "situacion",
      tipo: "opcion",
      etiqueta: "Your situation in the payment period",
      opciones: [
        { valor: "whole", etiqueta: "Worked the whole payment period" },
        { valor: "joined", etiqueta: "Joined during the period and still employed at its end" },
        { valor: "dismissed", etiqueta: "Dismissed before the end (not for serious misconduct)" },
        { valor: "resigned", etiqueta: "Resigned before the end" },
        { valor: "summary", etiqueta: "Summarily dismissed for serious misconduct" },
      ],
      porDefecto: "whole",
    },
    {
      id: "meses",
      tipo: "numero",
      etiqueta: "Months worked in the payment period, not counting up to 3 months of probation",
      min: 0,
      max: 12,
      porDefecto: 6,
      visibleSi: { situacion: ["joined", "dismissed"] },
    },
    {
      id: "mesesTotales",
      tipo: "numero",
      etiqueta: "Months worked in the payment period, probation included",
      min: 0,
      max: 12,
      porDefecto: 6,
      visibleSi: { situacion: ["joined", "dismissed"] },
    },
  ],
  calcular(entrada, _v, { redondear }) {
    const anual = entrada.importe > 0 ? entrada.importe : entrada.salarioMensual;
    if (anual <= 0) throw new ErrorEntrada("Enter the amount in your contract or your average monthly wages.", "salarioMensual");
    const observaciones: string[] = [];
    let pago = 0;
    if (entrada.situacion === "whole") pago = anual;
    else if (entrada.situacion === "joined" || entrada.situacion === "dismissed") {
      const califica = entrada.meses ?? 0;
      const total = entrada.mesesTotales ?? 0;
      if (total < califica) throw new ErrorEntrada("The months with probation can't be fewer than without it.", "mesesTotales");
      if (califica < 3) observaciones.push("Pro rata payment needs at least 3 months in the payment period, not counting probation.");
      else {
        pago = (anual * Math.min(12, total)) / 12;
        observaciones.push("Once you qualify, the whole period worked counts for the pro rata amount, probation included.");
      }
    } else {
      observaciones.push(
        entrada.situacion === "resigned"
          ? "If you resign before the payment period ends, the law doesn't give a pro rata payment."
          : "A summary dismissal for serious misconduct gives no pro rata payment.",
      );
    }
    observaciones.push("This only applies if your contract gives an end of year payment. A bonus paid at the employer's discretion isn't covered.");
    return { pago: redondear(pago), anual: redondear(anual), observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "End of year payment due", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Full end of year payment", formato: "moneda" },
  ],
});
