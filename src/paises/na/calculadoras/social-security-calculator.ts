import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { baseSsc, nad } from "../lib/nomina";

export default definirCalculadora({
  id: "na.social-security-calculator",
  mercado: "na",
  concepto: "aportes-seguridad-social",
  slug: "social-security-calculator",
  estado: "publicado",
  requiere: {
    "na.ssc-employee-rate": "numero",
    "na.ssc-employer-rate": "numero",
    "na.ssc-ceiling": "numero",
    "na.ssc-floor": "numero",
  },
  campos: [{ id: "basico", tipo: "moneda", etiqueta: "Basic wage a month", min: 0, porDefecto: 9000 }],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic wage.", "basico");
    const base = baseSsc(e.basico, v["na.ssc-floor"], v["na.ssc-ceiling"]);
    const empleado = redondear(porcentaje(base, v["na.ssc-employee-rate"]));
    const empleador = redondear(porcentaje(base, v["na.ssc-employer-rate"]));
    const observaciones: string[] = [];
    if (e.basico > v["na.ssc-ceiling"]) observaciones.push(`Your basic wage is above the ceiling, so contributions are worked out on ${nad(v["na.ssc-ceiling"])}.`);
    if (e.basico < v["na.ssc-floor"]) observaciones.push(`The law counts a basic wage of at least ${nad(v["na.ssc-floor"])} a month.`);
    return {
      empleado,
      empleador,
      total: redondear(empleado + empleador),
      base,
      anualEmpleado: redondear(empleado * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "You pay a month", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Your employer pays a month", formato: "moneda" },
    { clave: "total", etiqueta: "Total paid to the SSC a month", formato: "moneda" },
    { clave: "base", etiqueta: "Basic wage used", formato: "moneda" },
    { clave: "anualEmpleado", etiqueta: "You pay over 12 months", formato: "moneda" },
  ],
});
