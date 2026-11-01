import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

function tramo(anios: number): string {
  if (anios < 5) return "under-5";
  if (anios < 10) return "5-to-10";
  if (anios < 15) return "10-to-15";
  if (anios < 20) return "15-to-20";
  if (anios <= 25) return "20-to-25";
  return "over-25";
}

export default definirCalculadora({
  id: "rw.terminal-benefits-calculator",
  mercado: "rw",
  concepto: "indemnizacion-despido",
  slug: "terminal-benefits-calculator",
  estado: "publicado",
  requiere: {
    "rw.terminal-benefits": "mapa",
    "rw.terminal-min-months": "numero",
  },
  campos: [
    { id: "anios", tipo: "numero", etiqueta: "Years of service with the enterprise", min: 0, porDefecto: 6 },
    {
      id: "total12",
      tipo: "moneda",
      etiqueta: "Total salary received in the last 12 months",
      min: 0,
      porDefecto: 3600000,
      ayuda: "Leave out allowances paid to let you do the job, such as a transport or communication allowance.",
    },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Reason the contract ends",
      opciones: [
        { valor: "economic", etiqueta: "Economic reasons or technological change" },
        { valor: "sickness", etiqueta: "Sickness (unable to return after 6 months)" },
        { valor: "retirement", etiqueta: "Retirement" },
      ],
      porDefecto: "economic",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.anios < 0) throw new ErrorEntrada("Years of service cannot be negative.", "anios");
    if (e.total12 <= 0) throw new ErrorEntrada("Enter the salary received in the last 12 months.", "total12");
    const promedio = redondear(e.total12 / 12);
    const observaciones: string[] = [];
    if (e.motivo !== "retirement" && e.anios * 12 < v["rw.terminal-min-months"]) {
      observaciones.push("Terminal benefits are due only after 12 consecutive months with the enterprise.");
      return { monto: 0, meses: 0, promedio, observaciones };
    }
    const meses = enMapa(v["rw.terminal-benefits"], tramo(e.anios));
    observaciones.push("This is the legal minimum. A collective agreement or your contract can give more. It must be paid within seven working days.");
    if (e.motivo === "retirement") observaciones.push("Retirement benefits are not paid on top of terminal benefits: you get one or the other.");
    return { monto: redondear(promedio * meses), meses, promedio, observaciones };
  },
  resultado: [
    { clave: "monto", etiqueta: "Minimum terminal benefits", formato: "moneda", destacada: true },
    { clave: "meses", etiqueta: "Months of average salary", formato: "numero", decimales: 0 },
    { clave: "promedio", etiqueta: "Average monthly salary", formato: "moneda" },
  ],
});
