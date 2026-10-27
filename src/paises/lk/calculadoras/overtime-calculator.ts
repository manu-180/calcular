import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: el recargo y el divisor del Shop and Office Employees Act no se pudieron leer en una
// fuente oficial (ver motivo en datos.json).
export default definirCalculadora({
  id: "lk.overtime-calculator",
  mercado: "lk",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "borrador",
  requiere: {
    "lk.overtime-factor": "numero",
    "lk.overtime-monthly-divisor": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 100000 },
    { id: "horas", tipo: "numero", etiqueta: "Overtime hours in the month", min: 0, max: 300, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your monthly salary.", "sueldo");
    const porHora = e.sueldo / v["lk.overtime-monthly-divisor"];
    const tarifa = redondear(porHora * v["lk.overtime-factor"]);
    return { pago: redondear(tarifa * e.horas), tarifa, porHora: redondear(porHora) };
  },
  resultado: [
    { clave: "pago", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "tarifa", etiqueta: "Overtime rate per hour", formato: "moneda" },
    { clave: "porHora", etiqueta: "Normal hourly rate", formato: "moneda" },
  ],
});
