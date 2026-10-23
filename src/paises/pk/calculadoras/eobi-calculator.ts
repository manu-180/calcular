import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pk.eobi-calculator",
  mercado: "pk",
  concepto: "aportes-seguridad-social",
  slug: "eobi-calculator",
  estado: "publicado",
  requiere: {
    "pk.eobi-employer": "numero",
    "pk.eobi-employee": "numero",
    "pk.minimum-wage": "numero",
  },
  campos: [
    { id: "base", tipo: "moneda", etiqueta: "Minimum wage in your province (optional)", requerido: false, min: 0, ayuda: "Leave empty to use the federal minimum wage." },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees", min: 1, max: 100000, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    const base = entrada.base ?? v["pk.minimum-wage"];
    if (base <= 0) throw new ErrorEntrada("Enter a minimum wage above zero.", "base");
    const empleador = redondear(porcentaje(base, v["pk.eobi-employer"]));
    const empleado = redondear(porcentaje(base, v["pk.eobi-employee"]));
    return {
      total: redondear(empleador + empleado),
      empleador,
      empleado,
      mensualTodos: redondear((empleador + empleado) * entrada.empleados),
      anualTodos: redondear((empleador + empleado) * entrada.empleados * 12),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "EOBI a month per worker", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer's share", formato: "moneda" },
    { clave: "empleado", etiqueta: "Worker's share", formato: "moneda" },
    { clave: "mensualTodos", etiqueta: "A month for all workers", formato: "moneda" },
    { clave: "anualTodos", etiqueta: "A year for all workers", formato: "moneda" },
  ],
});
