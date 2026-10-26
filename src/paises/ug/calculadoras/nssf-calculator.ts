import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.nssf-calculator",
  mercado: "ug",
  concepto: "aportes-seguridad-social",
  slug: "nssf-calculator",
  estado: "publicado",
  requiere: {
    "ug.nssf-employee": "numero",
    "ug.nssf-employer": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly wage", min: 0, porDefecto: 1500000 },
    { id: "anios", tipo: "entero", etiqueta: "Years of contributions (optional)", min: 1, max: 50, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("Enter the gross monthly wage.", "bruto");
    const tuyo = redondear(porcentaje(entrada.bruto, v["ug.nssf-employee"]));
    const empleador = redondear(porcentaje(entrada.bruto, v["ug.nssf-employer"]));
    return { total: tuyo + empleador, tuyo, empleador, anual: (tuyo + empleador) * 12, acumulado: (tuyo + empleador) * 12 * entrada.anios };
  },
  resultado: [
    { clave: "total", etiqueta: "Total NSSF a month", formato: "moneda", destacada: true },
    { clave: "tuyo", etiqueta: "Deducted from you (5%)", formato: "moneda" },
    { clave: "empleador", etiqueta: "Paid by your employer (10%)", formato: "moneda" },
    { clave: "anual", etiqueta: "Total a year", formato: "moneda" },
    { clave: "acumulado", etiqueta: "Paid in over the years entered (before interest)", formato: "moneda" },
  ],
});
