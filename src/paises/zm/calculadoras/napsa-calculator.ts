import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { napsa } from "../lib/nomina";

export default definirCalculadora({
  id: "zm.napsa-calculator",
  mercado: "zm",
  concepto: "aportes-seguridad-social",
  slug: "napsa-calculator",
  // El techo de NAPSA de 2026 no se pudo leer en napsa.co.zm (ver datos.json).
  estado: "borrador",
  requiere: {
    "zm.napsa-rate": "numero",
    "zm.napsa-ceiling": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 10000, ayuda: "Basic pay plus allowances." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const techo = v["zm.napsa-ceiling"];
    const empleado = redondear(napsa(e.bruto, v["zm.napsa-rate"], techo));
    const observaciones: string[] = [];
    if (e.bruto > techo) observaciones.push("Your pay is above the earnings ceiling, so you pay the maximum contribution.");
    return { empleado, empleador: empleado, total: redondear(empleado * 2), base: Math.min(e.bruto, techo), observaciones };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your NAPSA contribution", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Your employer's contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Total paid to NAPSA", formato: "moneda" },
    { clave: "base", etiqueta: "Pay the contribution is worked out on", formato: "moneda" },
  ],
});
