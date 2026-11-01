import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.private-provident-fund-calculator",
  mercado: "bt",
  concepto: "aportes-seguridad-social",
  slug: "private-provident-fund-calculator",
  estado: "publicado",
  requiere: {
    "bt.pf-private-employee-min": "numero",
    "bt.pf-private-self-employed-min": "numero",
    "bt.pf-remit-day": "numero",
  },
  campos: [
    {
      id: "perfil",
      tipo: "opcion",
      etiqueta: "You are",
      opciones: [
        { valor: "employee", etiqueta: "An employee of a private agency" },
        { valor: "self", etiqueta: "Self-employed, an owner or a partner" },
      ],
      porDefecto: "employee",
    },
    { id: "base", tipo: "moneda", etiqueta: "Monthly basic salary (employee) or income (self-employed)", min: 0, porDefecto: 25000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Your contribution rate, in %", min: 0, max: 100, porDefecto: 5, ayuda: "Your contract or the company rules may set a higher rate than the minimum." },
    { id: "meses", tipo: "entero", etiqueta: "Months of contributions", min: 1, max: 600, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.base <= 0) throw new ErrorEntrada("Enter your monthly basic salary or income.", "base");
    const empleado = e.perfil === "employee";
    const minimo = empleado ? v["bt.pf-private-employee-min"] : v["bt.pf-private-self-employed-min"];
    if (e.tasa < minimo) throw new ErrorEntrada(`The rate cannot be below the minimum of ${minimo}%.`, "tasa");
    const propio = redondear(e.base * (e.tasa / 100));
    const empleador = empleado ? propio : 0;
    const mensual = redondear(propio + empleador);
    return {
      propio,
      empleador,
      mensual,
      total: redondear(mensual * e.meses),
      minimo,
      dia: v["bt.pf-remit-day"],
      observaciones: empleado
        ? ["The employing agency makes a matching contribution on your behalf. Contributions are paid into your account at the NPPF."]
        : ["A self-employed member pays the whole contribution. There is no employer share."],
    };
  },
  resultado: [
    { clave: "propio", etiqueta: "Your contribution each month", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer matching contribution each month", formato: "moneda", ocultarSiCero: true },
    { clave: "mensual", etiqueta: "Paid into your account each month", formato: "moneda" },
    { clave: "total", etiqueta: "Paid in over the months entered", formato: "moneda" },
    { clave: "minimo", etiqueta: "Lowest rate the guidelines allow", formato: "porcentaje" },
    { clave: "dia", etiqueta: "Pay in by this day of the following month", formato: "numero" },
  ],
});
