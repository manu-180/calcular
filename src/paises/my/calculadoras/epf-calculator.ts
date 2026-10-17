import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "my.epf-calculator",
  mercado: "my",
  concepto: "propio",
  slug: "epf-calculator",
  estado: "borrador",
  requiere: {
    "my.epf-employee-rate": "numero",
    "my.epf-employer-rate": "mapa",
  },
  campos: [{ id: "sueldo", tipo: "moneda", etiqueta: "Monthly wages", min: 0, porDefecto: 4000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter the monthly wages.", "sueldo");
    const empleado = redondear(porcentaje(entrada.sueldo, v["my.epf-employee-rate"]));
    const empleador = redondear(porcentaje(entrada.sueldo, enMapa(v["my.epf-employer-rate"], entrada.sueldo > 5000 ? "above-5000" : "up-to-5000")));
    return { empleado, empleador, total: redondear(empleado + empleador) };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your EPF contribution", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer EPF contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Total into your EPF account", formato: "moneda" },
  ],
});
