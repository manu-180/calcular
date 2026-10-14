import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { validarIngreso } from "../lib/impuestos";

export default definirCalculadora({
  id: "ca.ei-premium-calculator",
  mercado: "ca",
  concepto: "propio",
  slug: "ei-premium-calculator",
  estado: "publicado",
  requiere: {
    "ca.ei-maximum": "numero",
    "ca.ei-rates": "mapa",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Insurable earnings for 2026", min: 0, porDefecto: 60000 },
    {
      id: "lugar",
      tipo: "opcion",
      etiqueta: "Where you work",
      opciones: [
        { valor: "canada", etiqueta: "Outside Quebec" },
        { valor: "qc", etiqueta: "Quebec" },
      ],
      porDefecto: "canada",
    },
  ],
  calcular(entrada, v, { redondear }) {
    validarIngreso(entrada.ingreso, "ingreso");
    const ei = v["ca.ei-rates"];
    const maximo = v["ca.ei-maximum"];
    const quebec = entrada.lugar === "qc";
    const asegurable = Math.min(entrada.ingreso, maximo);
    const tasa = quebec ? ei["employee-qc"] : ei.employee;
    const tasaEmpleador = quebec ? ei["employer-qc"] : ei.employer;
    const empleado = redondear(porcentaje(asegurable, tasa));
    const empleador = redondear(porcentaje(asegurable, tasaEmpleador));
    return {
      empleado,
      empleador,
      total: redondear(empleado + empleador),
      asegurable: redondear(asegurable),
      tasa,
      maximo: redondear(porcentaje(maximo, tasa)),
      observaciones: entrada.ingreso > maximo ? ["Your earnings are above the maximum insurable earnings, so you pay the yearly maximum."] : [],
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your EI premiums for 2026", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer premiums", formato: "moneda" },
    { clave: "total", etiqueta: "Total premiums", formato: "moneda" },
    { clave: "asegurable", etiqueta: "Earnings that count for EI", formato: "moneda" },
    { clave: "tasa", etiqueta: "Your premium rate", formato: "porcentaje", decimales: 2 },
    { clave: "maximo", etiqueta: "Maximum yearly premium at this rate", formato: "moneda" },
  ],
});
