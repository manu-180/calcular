import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { validarIngreso } from "../lib/impuestos";

export default definirCalculadora({
  id: "ca.employer-payroll-cost",
  mercado: "ca",
  concepto: "costo-empleador",
  slug: "employer-payroll-cost",
  estado: "publicado",
  requiere: {
    "ca.cpp": "mapa",
    "ca.cpp-rates": "mapa",
    "ca.qpp": "mapa",
    "ca.ei-maximum": "numero",
    "ca.ei-rates": "mapa",
    "ca.qpip-maximum": "numero",
    "ca.qpip-rates": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Employee's annual salary", min: 0, porDefecto: 60000 },
    {
      id: "lugar",
      tipo: "opcion",
      etiqueta: "Where the employee works",
      opciones: [
        { valor: "canada", etiqueta: "Outside Quebec" },
        { valor: "qc", etiqueta: "Quebec" },
      ],
      porDefecto: "canada",
    },
  ],
  calcular(entrada, v, { redondear }) {
    validarIngreso(entrada.salario, "salario");
    const c = v["ca.cpp"];
    const quebec = entrada.lugar === "qc";
    const tasas = quebec ? v["ca.qpp"] : v["ca.cpp-rates"];
    const contributivo = Math.max(0, Math.min(entrada.salario, c.ympe) - c.exemption);
    const segundo = Math.max(0, Math.min(entrada.salario, c.yampe) - c.ympe);
    const pension = redondear(porcentaje(contributivo, tasas.base + tasas.first) + porcentaje(segundo, tasas.second));
    const ei = v["ca.ei-rates"];
    const seguro = redondear(porcentaje(Math.min(entrada.salario, v["ca.ei-maximum"]), quebec ? ei["employer-qc"] : ei.employer));
    const qpip = quebec ? redondear(porcentaje(Math.min(entrada.salario, v["ca.qpip-maximum"]), v["ca.qpip-rates"].employer)) : 0;
    const cargas = redondear(pension + seguro + qpip);
    const total = redondear(entrada.salario + cargas);
    return {
      total,
      mensual: redondear(total / 12),
      cargas,
      pension,
      seguro,
      qpip,
      porcentajeCargas: entrada.salario > 0 ? (cargas / entrada.salario) * 100 : 0,
      observaciones: ["Provincial employer health taxes, workers' compensation premiums and benefits plans are not included."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total yearly cost of this salary", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Cost a month", formato: "moneda" },
    { clave: "cargas", etiqueta: "Employer payroll contributions", formato: "moneda" },
    { clave: "pension", etiqueta: "Employer CPP or QPP contributions", formato: "moneda" },
    { clave: "seguro", etiqueta: "Employer EI premiums", formato: "moneda" },
    { clave: "qpip", etiqueta: "Employer QPIP premiums", formato: "moneda", ocultarSiCero: true },
    { clave: "porcentajeCargas", etiqueta: "Contributions as a share of salary", formato: "porcentaje", decimales: 2 },
  ],
});
