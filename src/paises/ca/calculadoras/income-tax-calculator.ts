import { definirCalculadora } from "@/motor/calculo";
import { aportesEmpleado, impuestoAnual, PROVINCIAS, REQUIERE_RENTA, tasaMarginal, validarIngreso } from "../lib/impuestos";

export default definirCalculadora({
  id: "ca.income-tax-calculator",
  mercado: "ca",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: REQUIERE_RENTA,
  campos: [
    { id: "provincia", tipo: "opcion", etiqueta: "Province or territory where you live on December 31", opciones: PROVINCIAS, porDefecto: "on" },
    { id: "empleo", tipo: "moneda", etiqueta: "Employment income for 2026", min: 0, porDefecto: 70000 },
    { id: "otros", tipo: "moneda", etiqueta: "Other taxable income (interest, rent, pension)", min: 0, porDefecto: 0 },
    { id: "rrsp", tipo: "moneda", etiqueta: "RRSP and pension plan deductions", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    validarIngreso(entrada.empleo, "empleo");
    validarIngreso(entrada.otros, "otros");
    validarIngreso(entrada.rrsp, "rrsp");
    const aportes = aportesEmpleado(entrada.empleo, v);
    const base = { provincia: entrada.provincia, empleo: entrada.empleo, otros: entrada.otros, deducciones: entrada.rrsp, aportes };
    const r = impuestoAnual(base, v);
    const federal = redondear(r.federal);
    const provincial = redondear(r.provincial);
    const total = redondear(federal + provincial);
    const ingreso = entrada.empleo + entrada.otros;
    const observaciones: string[] = [];
    if (entrada.provincia === "on") observaciones.push("The Ontario amount includes the Ontario surtax and the Ontario Health Premium, less the basic Ontario tax reduction.");
    if (entrada.provincia === "bc") observaciones.push("The BC amount already takes off the BC tax reduction for lower incomes.");
    return {
      total,
      federal,
      provincial,
      gravable: redondear(r.gravable),
      despues: redondear(ingreso - total),
      promedio: ingreso > 0 ? redondear((total / ingreso) * 100) : 0,
      marginal: redondear(tasaMarginal(base, v)),
      cpp: redondear(aportes.cpp + aportes.cpp2),
      ei: redondear(aportes.ei),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total income tax for 2026", formato: "moneda", destacada: true },
    { clave: "federal", etiqueta: "Federal tax", formato: "moneda" },
    { clave: "provincial", etiqueta: "Provincial or territorial tax", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable income", formato: "moneda" },
    { clave: "despues", etiqueta: "Income after tax (before CPP and EI)", formato: "moneda" },
    { clave: "promedio", etiqueta: "Average tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Marginal tax rate on your next dollar", formato: "porcentaje", decimales: 2 },
    { clave: "cpp", etiqueta: "CPP contributions on your pay", formato: "moneda", ocultarSiCero: true },
    { clave: "ei", etiqueta: "EI premiums on your pay", formato: "moneda", ocultarSiCero: true },
  ],
});
