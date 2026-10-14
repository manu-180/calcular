import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { validarIngreso } from "../lib/impuestos";

export default definirCalculadora({
  id: "ca.cpp-calculator",
  mercado: "ca",
  concepto: "aportes-seguridad-social",
  slug: "cpp-calculator",
  estado: "publicado",
  requiere: {
    "ca.cpp": "mapa",
    "ca.cpp-rates": "mapa",
    "ca.qpp": "mapa",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Pensionable earnings for 2026", min: 0, porDefecto: 70000, ayuda: "Your salary and taxable benefits, or your net self-employment income." },
    {
      id: "situacion",
      tipo: "opcion",
      etiqueta: "How you earn it",
      opciones: [
        { valor: "employee", etiqueta: "As an employee" },
        { valor: "self-employed", etiqueta: "Self-employed" },
      ],
      porDefecto: "employee",
    },
    {
      id: "plan",
      tipo: "opcion",
      etiqueta: "Where you work",
      opciones: [
        { valor: "cpp", etiqueta: "Outside Quebec (CPP)" },
        { valor: "qpp", etiqueta: "Quebec (QPP)" },
      ],
      porDefecto: "cpp",
    },
  ],
  calcular(entrada, v, { redondear }) {
    validarIngreso(entrada.ingreso, "ingreso");
    const c = v["ca.cpp"];
    const tasas = entrada.plan === "qpp" ? v["ca.qpp"] : v["ca.cpp-rates"];
    const factor = entrada.situacion === "self-employed" ? 2 : 1;
    const contributivo = Math.max(0, Math.min(entrada.ingreso, c.ympe) - c.exemption);
    const segundo = Math.max(0, Math.min(entrada.ingreso, c.yampe) - c.ympe);
    const base = redondear(porcentaje(contributivo, tasas.base) * factor);
    const primera = redondear(porcentaje(contributivo, tasas.first) * factor);
    const segunda = redondear(porcentaje(segundo, tasas.second) * factor);
    const total = redondear(base + primera + segunda);
    const empleador = entrada.situacion === "employee" ? total : 0;
    const observaciones: string[] = [];
    if (entrada.ingreso > c.yampe) observaciones.push("You reach the yearly maximum, so nothing more is deducted after that point in the year.");
    if (entrada.situacion === "self-employed") observaciones.push("Self-employed people pay both the employee and the employer share, so the amounts are doubled.");
    return {
      total,
      base,
      primera,
      segunda,
      empleador,
      mensual: redondear(total / 12),
      deducible: entrada.situacion === "employee" ? redondear(primera + segunda) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Your total contributions for 2026", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Base contributions", formato: "moneda" },
    { clave: "primera", etiqueta: "First additional contributions", formato: "moneda" },
    { clave: "segunda", etiqueta: "Second additional contributions (CPP2 or QPP2)", formato: "moneda", ocultarSiCero: true },
    { clave: "mensual", etiqueta: "Average a month", formato: "moneda" },
    { clave: "empleador", etiqueta: "What your employer adds", formato: "moneda", ocultarSiCero: true },
    { clave: "deducible", etiqueta: "Additional contributions you deduct from income", formato: "moneda" },
  ],
});
