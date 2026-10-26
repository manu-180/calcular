import { aplicarEscala, aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.local-service-tax-calculator",
  mercado: "ug",
  concepto: "propio",
  slug: "local-service-tax-calculator",
  estado: "publicado",
  requiere: {
    "ug.lst-bands": "escala",
    "ug.paye-bands": "escala",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly gross pay", min: 0, porDefecto: 1500000 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "Pay used to find your band",
      opciones: [
        { valor: "after-paye", etiqueta: "Pay after PAYE (as the Act defines take-home pay)" },
        { valor: "gross", etiqueta: "Gross pay (as KCCA applies it)" },
      ],
      porDefecto: "after-paye",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual <= 0) throw new ErrorEntrada("Enter your monthly gross pay.", "mensual");
    const paye = redondear(aplicarEscalaMarginal(v["ug.paye-bands"], e.mensual));
    const base = e.base === "gross" ? e.mensual : redondear(e.mensual - paye);
    const anual = redondear(aplicarEscala(v["ug.lst-bands"], base));
    const observaciones: string[] = [];
    if (anual === 0) observaciones.push("Monthly pay of Ushs 100,000 or less pays no local service tax.");
    return {
      anual,
      cuota: redondear(anual / 4),
      base,
      observaciones,
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Local service tax for the year", formato: "moneda", destacada: true },
    { clave: "cuota", etiqueta: "Each of the four instalments (July to October)", formato: "moneda" },
    { clave: "base", etiqueta: "Monthly pay used for the band", formato: "moneda" },
  ],
});
