import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gb.employer-ni-calculator",
  mercado: "gb",
  concepto: "costo-empleador",
  slug: "employer-ni-calculator",
  estado: "publicado",
  requiere: {
    "gb.ni-secondary-threshold": "numero",
    "gb.ni-employer-rate": "numero",
    "gb.employment-allowance": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Employee's annual salary", min: 0, porDefecto: 30000 },
    { id: "pension", tipo: "porcentaje", etiqueta: "Employer pension contribution (% of salary)", min: 0, max: 100, porDefecto: 3 },
    { id: "allowance", tipo: "si-no", etiqueta: "Use Employment Allowance against this salary", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario < 0) throw new ErrorEntrada("Salary cannot be negative.", "salario");
    const niBruto = redondear((Math.max(0, entrada.salario - v["gb.ni-secondary-threshold"]) * v["gb.ni-employer-rate"]) / 100);
    const descuento = entrada.allowance ? Math.min(niBruto, v["gb.employment-allowance"]) : 0;
    const ni = redondear(niBruto - descuento);
    const pension = redondear((entrada.salario * entrada.pension) / 100);
    const total = redondear(entrada.salario + ni + pension);
    const observaciones: string[] = [];
    if (entrada.allowance) {
      observaciones.push("Employment Allowance is a yearly amount per business, not per employee. If you use it here, it is not available for your other staff.");
    }
    return {
      total,
      mensual: redondear(total / 12),
      ni,
      descuento: redondear(descuento),
      pension,
      extra: entrada.salario > 0 ? ((total - entrada.salario) / entrada.salario) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total yearly cost of the employee", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Cost a month", formato: "moneda" },
    { clave: "ni", etiqueta: "Employer National Insurance", formato: "moneda" },
    { clave: "descuento", etiqueta: "Employment Allowance used", formato: "moneda", ocultarSiCero: true },
    { clave: "pension", etiqueta: "Employer pension contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "extra", etiqueta: "Cost on top of the salary", formato: "porcentaje", decimales: 1 },
  ],
});
