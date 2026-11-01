import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mu.end-of-year-bonus-calculator",
  mercado: "mu",
  concepto: "bono-semestral",
  slug: "end-of-year-bonus-calculator",
  estado: "publicado",
  requiere: {
    "mu.bonus-first-share": "numero",
    "mu.bonus-wage-ceiling": "numero",
    "mu.bonus-resign-months": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly basic wage", min: 0, porDefecto: 30000 },
    { id: "meses", tipo: "entero", etiqueta: "Months worked with the employer this calendar year", min: 1, max: 12, porDefecto: 12 },
    { id: "extras", tipo: "moneda", etiqueta: "Other earnings in the year", min: 0, porDefecto: 0, ayuda: "Overtime, commissions and other pay you received this year." },
    {
      id: "situacion",
      tipo: "opcion",
      etiqueta: "Your situation",
      opciones: [
        { valor: "employed", etiqueta: "Still with the employer on 31 December" },
        { valor: "left", etiqueta: "Dismissed, contract ended or retired during the year" },
        { valor: "resigned", etiqueta: "Resigned during the year" },
      ],
      porDefecto: "employed",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your monthly basic wage.", "sueldo");
    const ganancias = e.sueldo * e.meses + e.extras;
    const minimoRenuncia = v["mu.bonus-resign-months"];
    const sinBono = e.situacion === "resigned" && e.meses < minimoRenuncia;
    const bono = sinBono ? 0 : redondear(ganancias / 12);
    const primera = e.situacion === "employed" ? redondear(porcentaje(bono, v["mu.bonus-first-share"])) : null;
    const saldo = primera === null ? null : redondear(bono - primera);
    const observaciones: string[] = [];
    if (sinBono) observaciones.push(`After resigning, the bonus is due only if you worked at least ${minimoRenuncia} months in the year.`);
    if (e.sueldo > v["mu.bonus-wage-ceiling"]) {
      observaciones.push(`Section 54 covers a basic wage up to Rs ${v["mu.bonus-wage-ceiling"].toLocaleString("en-MU")} a month. Above that, a bonus depends on your contract.`);
    }
    if (e.situacion !== "employed" && !sinBono) observaciones.push("It is due by the last working day of the month in which you leave.");
    return {
      bono,
      ganancias: redondear(ganancias),
      primera,
      saldo,
      observaciones,
    };
  },
  resultado: [
    { clave: "bono", etiqueta: "End of year bonus", formato: "moneda", destacada: true },
    { clave: "ganancias", etiqueta: "Earnings for the year", formato: "moneda" },
    { clave: "primera", etiqueta: "First payment, 5 clear working days before 25 December", formato: "moneda" },
    { clave: "saldo", etiqueta: "Balance, by the last working day of the year", formato: "moneda" },
  ],
});
