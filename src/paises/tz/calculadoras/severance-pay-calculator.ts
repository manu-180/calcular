import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.severance-pay-calculator",
  mercado: "tz",
  concepto: "indemnizacion-despido",
  slug: "severance-pay-calculator",
  estado: "publicado",
  requiere: {
    "tz.severance-days": "numero",
    "tz.severance-max-years": "numero",
  },
  campos: [
    { id: "diario", tipo: "moneda", etiqueta: "Your basic wage for one day", min: 0, porDefecto: 40000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of continuous service", min: 0, porDefecto: 5 },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Why the job ended",
      opciones: [
        { valor: "employer", etiqueta: "The employer ended it (not for misconduct)" },
        { valor: "misconduct", etiqueta: "Fair dismissal for misconduct" },
        { valor: "refused", etiqueta: "You refused reasonable alternative employment" },
      ],
      porDefecto: "employer",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.diario <= 0) throw new ErrorEntrada("Enter your basic wage for one day.", "diario");
    const contados = Math.min(e.anios, v["tz.severance-max-years"]);
    const aplica = e.motivo === "employer" && e.anios >= 1;
    const severance = aplica ? redondear(e.diario * v["tz.severance-days"] * contados) : 0;
    const observaciones: string[] = [];
    if (e.anios < 1) observaciones.push("Severance pay needs at least 12 months of continuous service.");
    if (e.motivo !== "employer") observaciones.push("No severance pay is due in this case.");
    if (e.anios > v["tz.severance-max-years"]) observaciones.push("Only the first ten years of service count.");
    return { severance, contados: aplica ? contados : 0, observaciones };
  },
  resultado: [
    { clave: "severance", etiqueta: "Severance pay", formato: "moneda", destacada: true },
    { clave: "contados", etiqueta: "Years counted", formato: "anios" },
  ],
});
