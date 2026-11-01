import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.fringe-benefit-tax-calculator",
  mercado: "mw",
  concepto: "propio",
  slug: "fringe-benefit-tax-calculator",
  estado: "publicado",
  requiere: {
    "mw.fbt-rate": "numero",
    "mw.fbt-vehicle": "numero",
    "mw.fbt-school-fees": "numero",
    "mw.fbt-housing-owned": "numero",
    "mw.fbt-housing-unfurnished": "numero",
    "mw.fbt-housing-furnished": "numero",
  },
  campos: [
    {
      id: "beneficio",
      tipo: "opcion",
      etiqueta: "Benefit you provide",
      opciones: [
        { valor: "vehicle", etiqueta: "Motor vehicle" },
        { valor: "school-direct", etiqueta: "School fees paid to the school" },
        { valor: "school-employee", etiqueta: "School fees paid to the employee" },
        { valor: "house-owned", etiqueta: "Housing in a property you own" },
        { valor: "house-rented", etiqueta: "Housing in a property you rent" },
        { valor: "other", etiqueta: "Utilities, household items, travel or domestic services" },
      ],
      porDefecto: "vehicle",
    },
    {
      id: "monto",
      tipo: "moneda",
      etiqueta: "Cost for the year",
      min: 0,
      porDefecto: 30000000,
      ayuda: "For a vehicle, its original cost. For owned housing, the open market rent for a year. For rented housing, the rent you pay for a year.",
    },
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Employee's salary for the year",
      min: 0,
      porDefecto: 12000000,
      visibleSi: { beneficio: ["house-owned", "house-rented"] },
    },
    {
      id: "amueblada",
      tipo: "si-no",
      etiqueta: "The housing is furnished",
      porDefecto: false,
      visibleSi: { beneficio: ["house-owned", "house-rented"] },
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter the cost for the year.", "monto");
    let valor: number;
    if (e.beneficio === "vehicle") valor = porcentaje(e.monto, v["mw.fbt-vehicle"]);
    else if (e.beneficio === "school-direct") valor = porcentaje(e.monto, v["mw.fbt-school-fees"]);
    else if (e.beneficio === "house-owned" || e.beneficio === "house-rented") {
      const tasaSalario = e.amueblada ? v["mw.fbt-housing-furnished"] : v["mw.fbt-housing-unfurnished"];
      const mayor = Math.max(e.monto, porcentaje(e.salario ?? 0, tasaSalario));
      valor = e.beneficio === "house-owned" ? porcentaje(mayor, v["mw.fbt-housing-owned"]) : mayor;
    } else valor = e.monto;
    const valorImponible = redondear(valor);
    const fbt = redondear(porcentaje(valorImponible, v["mw.fbt-rate"]));
    return { fbt, valorImponible, trimestral: redondear(fbt / 4) };
  },
  resultado: [
    { clave: "fbt", etiqueta: "Fringe benefit tax for the year", formato: "moneda", destacada: true },
    { clave: "valorImponible", etiqueta: "Taxable value of the benefit", formato: "moneda" },
    { clave: "trimestral", etiqueta: "Fringe benefit tax each quarter", formato: "moneda" },
  ],
});
