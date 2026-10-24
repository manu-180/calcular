import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gh.ssnit-contribution",
  mercado: "gh",
  concepto: "aportes-seguridad-social",
  slug: "ssnit-contribution",
  estado: "publicado",
  requiere: {
    "gh.ssnit-employee-rate": "numero",
    "gh.ssnit-employer-rate": "numero",
    "gh.ssnit-tier1-rate": "numero",
    "gh.ssnit-tier2-rate": "numero",
  },
  campos: [{ id: "basico", tipo: "moneda", etiqueta: "Basic salary a month", min: 0, porDefecto: 5000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter the basic salary.", "basico");
    const empleado = redondear(porcentaje(entrada.basico, v["gh.ssnit-employee-rate"]));
    const empleador = redondear(porcentaje(entrada.basico, v["gh.ssnit-employer-rate"]));
    return {
      empleado,
      empleador,
      total: redondear(empleado + empleador),
      tier1: redondear(porcentaje(entrada.basico, v["gh.ssnit-tier1-rate"])),
      tier2: redondear(porcentaje(entrada.basico, v["gh.ssnit-tier2-rate"])),
      anual: redondear((empleado + empleador) * 12),
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Deducted from the worker", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Added by the employer", formato: "moneda" },
    { clave: "total", etiqueta: "Total contribution", formato: "moneda" },
    { clave: "tier1", etiqueta: "Remitted to SSNIT (Tier 1)", formato: "moneda" },
    { clave: "tier2", etiqueta: "Remitted to Tier 2", formato: "moneda" },
    { clave: "anual", etiqueta: "Total for the year", formato: "moneda" },
  ],
});
