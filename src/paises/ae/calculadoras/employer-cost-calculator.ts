import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aportesGpssa } from "../lib/aportes";

export default definirCalculadora({
  id: "ae.employer-cost-calculator",
  mercado: "ae",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "ae.gpssa": "mapa",
    "ae.gratuity": "mapa",
  },
  campos: [
    { id: "total", tipo: "moneda", etiqueta: "Monthly salary (basic plus allowances)", min: 0, porDefecto: 15000 },
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 9000 },
    { id: "emirati", tipo: "si-no", etiqueta: "The employee is a UAE national", porDefecto: false },
    { id: "anios", tipo: "numero", etiqueta: "Years the employee has already worked for you", min: 0, max: 60, porDefecto: 0, visibleSi: { emirati: [false] } },
    { id: "otros", tipo: "moneda", etiqueta: "Other yearly costs (visa, insurance, flights)", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.total <= 0) throw new ErrorEntrada("Enter the monthly salary.", "total");
    if (entrada.basico > entrada.total) throw new ErrorEntrada("The basic salary can't be more than the total salary.", "basico");
    const sueldos = entrada.total * 12;
    let pension = 0;
    let gratuidad = 0;
    const observaciones: string[] = [];
    if (entrada.emirati) pension = aportesGpssa(entrada.total, v["ae.gpssa"]).empleador * 12;
    else {
      const t = v["ae.gratuity"];
      const dias = (entrada.anios ?? 0) >= 5 ? enMapa(t, "after-5-years") : enMapa(t, "first-5-years");
      gratuidad = (entrada.basico / 30) * dias;
      observaciones.push("The gratuity is a provision for the year, worked out on the basic salary ÷ 30. It's paid when the job ends, after at least one year.");
    }
    return {
      total: redondear(sueldos + pension + gratuidad + entrada.otros),
      sueldos: redondear(sueldos),
      pension: redondear(pension),
      gratuidad: redondear(gratuidad),
      mensual: redondear((sueldos + pension + gratuidad + entrada.otros) / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total yearly cost", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Average monthly cost", formato: "moneda" },
    { clave: "sueldos", etiqueta: "Salary for the year", formato: "moneda" },
    { clave: "pension", etiqueta: "Employer GPSSA contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "gratuidad", etiqueta: "Gratuity provision for the year", formato: "moneda", ocultarSiCero: true },
  ],
});
