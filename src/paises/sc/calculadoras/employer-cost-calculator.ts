import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.employer-cost-calculator",
  mercado: "sc",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: { "sc.spf-employer-rate": "numero", "sc.thirteenth-limit": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 25000, ayuda: "Basic salary. Add allowances only if they are paid every month." },
    { id: "seychellois", tipo: "si-no", etiqueta: "The worker is Seychellois", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross monthly salary.", "bruto");
    const salarioAnual = redondear(e.bruto * 12);
    const spfAnual = redondear(porcentaje(salarioAnual, v["sc.spf-employer-rate"]));
    const elegible = e.seychellois && e.bruto <= v["sc.thirteenth-limit"];
    const treceavo = elegible ? redondear(e.bruto) : 0;
    const costoAnual = redondear(salarioAnual + spfAnual + treceavo);
    return {
      costoAnual,
      costoMensual: redondear(costoAnual / 12),
      salarioAnual,
      spfAnual,
      treceavo,
      recargo: (redondear(costoAnual - salarioAnual) / salarioAnual) * 100,
      observaciones: [
        "Only the pension contribution and the thirteenth month pay are counted. Medical insurance, training levies and fringe benefits depend on the contract and are not included.",
      ],
    };
  },
  resultado: [
    { clave: "costoMensual", etiqueta: "Average monthly cost to the employer", formato: "moneda", destacada: true },
    { clave: "costoAnual", etiqueta: "Cost over 12 months", formato: "moneda" },
    { clave: "salarioAnual", etiqueta: "Salary over 12 months", formato: "moneda" },
    { clave: "spfAnual", etiqueta: "Employer SPF contribution", formato: "moneda" },
    { clave: "treceavo", etiqueta: "Thirteenth month pay", formato: "moneda", ocultarSiCero: true },
    { clave: "recargo", etiqueta: "Cost on top of salary", formato: "porcentaje", decimales: 1 },
  ],
});
