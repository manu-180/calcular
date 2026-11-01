import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.paye-calculator",
  mercado: "ug",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: {
    "ug.paye-bands": "escala",
    "ug.paye-bands-non-resident": "escala",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly gross pay", min: 0, porDefecto: 1500000, ayuda: "Salary plus allowances and other payments for the month." },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Tax residence",
      opciones: [
        { valor: "resident", etiqueta: "Resident in Uganda" },
        { valor: "non-resident", etiqueta: "Non-resident" },
      ],
      porDefecto: "resident",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual <= 0) throw new ErrorEntrada("Enter your monthly gross pay.", "mensual");
    const escala = e.residencia === "resident" ? v["ug.paye-bands"] : v["ug.paye-bands-non-resident"];
    const paye = redondear(aplicarEscalaMarginal(escala, e.mensual));
    let marginal = 0;
    for (const f of escala) if (e.mensual > f.desde) marginal = f.tasa;
    const observaciones: string[] = [];
    if (paye === 0) observaciones.push("Your pay is below the PAYE threshold, so no PAYE is due this month.");
    if (e.mensual > 10000000) observaciones.push("Pay above Ushs 10,000,000 a month pays an extra 10% on the amount above that level.");
    return {
      paye,
      anual: redondear(paye * 12),
      neto: redondear(e.mensual - paye),
      efectiva: (paye / e.mensual) * 100,
      marginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "paye", etiqueta: "PAYE for the month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "PAYE for a full year at this pay", formato: "moneda" },
    { clave: "neto", etiqueta: "Pay after PAYE (before NSSF)", formato: "moneda" },
    { clave: "efectiva", etiqueta: "PAYE as a share of gross pay", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Rate on your last shilling", formato: "porcentaje", decimales: 0 },
  ],
});
