import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.dashain-bonus-calculator",
  mercado: "np",
  concepto: "bono-semestral",
  slug: "dashain-bonus-calculator",
  estado: "publicado",
  requiere: { "np.festival-allowance-months": "numero" },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 30000, ayuda: "The pay you were getting at the time. Allowances are not counted." },
    { id: "meses", tipo: "numero", etiqueta: "Months of service in the year", min: 0, max: 12, porDefecto: 12, ayuda: "Use fewer than 12 if you joined during the year." },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic pay for the month.", "basico");
    const completo = redondear(e.basico * v["np.festival-allowance-months"]);
    const proporcion = e.meses / 12;
    return {
      festival: redondear(completo * proporcion),
      completo,
      proporcion: proporcion * 100,
      mensual: redondear(completo / 12),
    };
  },
  resultado: [
    { clave: "festival", etiqueta: "Festival allowance for the year", formato: "moneda", destacada: true },
    { clave: "completo", etiqueta: "Allowance for a full year of service", formato: "moneda" },
    { clave: "proporcion", etiqueta: "Share of the year you served", formato: "porcentaje", decimales: 1 },
    { clave: "mensual", etiqueta: "Set aside per month of service", formato: "moneda" },
  ],
});
