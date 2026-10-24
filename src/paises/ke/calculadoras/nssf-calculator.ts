import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nssf } from "../lib/nomina";

export default definirCalculadora({
  id: "ke.nssf-calculator",
  mercado: "ke",
  concepto: "aportes-seguridad-social",
  slug: "nssf-calculator",
  estado: "publicado",
  requiere: {
    "ke.nssf-rate": "numero",
    "ke.nssf-lel": "numero",
    "ke.nssf-uel": "numero",
  },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 50000 }],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const n = nssf(e.bruto, { tasa: v["ke.nssf-rate"], lel: v["ke.nssf-lel"], uel: v["ke.nssf-uel"] });
    const tier1 = redondear(n.tier1);
    const tier2 = redondear(n.tier2);
    const empleado = redondear(tier1 + tier2);
    const observaciones: string[] = [];
    if (e.bruto >= v["ke.nssf-uel"]) observaciones.push("Your pay is at or above the upper earnings limit, so you pay the maximum contribution.");
    return {
      empleado,
      tier1,
      tier2,
      empleador: empleado,
      total: redondear(empleado * 2),
      anual: redondear(empleado * 2 * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your NSSF deduction", formato: "moneda", destacada: true },
    { clave: "tier1", etiqueta: "Tier I", formato: "moneda" },
    { clave: "tier2", etiqueta: "Tier II", formato: "moneda" },
    { clave: "empleador", etiqueta: "Employer's matching contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Total paid into NSSF this month", formato: "moneda" },
    { clave: "anual", etiqueta: "Total paid in over 12 months", formato: "moneda" },
  ],
});
