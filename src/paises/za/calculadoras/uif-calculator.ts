import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { rand } from "../lib/impuestos";

export default definirCalculadora({
  id: "za.uif-calculator",
  mercado: "za",
  concepto: "aportes-seguridad-social",
  slug: "uif-calculator",
  estado: "publicado",
  requiere: {
    "za.uif-employee-rate": "numero",
    "za.uif-employer-rate": "numero",
    "za.uif-ceiling-monthly": "numero",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "Gross pay a month", min: 0, porDefecto: 15000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly pay.", "salario");
    const tope = v["za.uif-ceiling-monthly"];
    const base = Math.min(entrada.salario, tope);
    const empleado = redondear((base * v["za.uif-employee-rate"]) / 100);
    const empleador = redondear((base * v["za.uif-employer-rate"]) / 100);
    const observaciones = entrada.salario > tope ? [`Pay above ${rand(tope)} a month does not count for UIF, so the contribution stops growing there.`] : [];
    return { empleado, empleador, total: redondear(empleado + empleador), anual: redondear((empleado + empleador) * 12), base, observaciones };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your UIF a month", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Your employer's UIF a month", formato: "moneda" },
    { clave: "total", etiqueta: "Total paid to the UIF a month", formato: "moneda" },
    { clave: "anual", etiqueta: "Total for the year", formato: "moneda" },
    { clave: "base", etiqueta: "Pay the contribution is based on", formato: "moneda" },
  ],
});
