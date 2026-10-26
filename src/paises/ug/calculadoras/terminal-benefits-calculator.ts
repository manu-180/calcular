import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.terminal-benefits-calculator",
  mercado: "ug",
  concepto: "liquidacion-final",
  slug: "terminal-benefits-calculator",
  estado: "publicado",
  requiere: {
    "ug.severance-months-per-year": "numero",
    "ug.severance-min-months": "numero",
    "ug.notice-weeks-under-1y": "numero",
    "ug.notice-months-1-5y": "numero",
    "ug.notice-months-5-10y": "numero",
    "ug.notice-months-10y": "numero",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Full years worked", min: 0, max: 60, porDefecto: 4 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months worked", min: 0, max: 11, porDefecto: 0 },
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 1000000 },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Why the job ended",
      opciones: [
        { valor: "unfair", etiqueta: "Unfair dismissal" },
        { valor: "redundancy", etiqueta: "Position declared redundant" },
        { valor: "incapacity", etiqueta: "Physical incapacity" },
        { valor: "termination", etiqueta: "Termination with notice, no severance case" },
        { valor: "resignation", etiqueta: "Resignation" },
      ],
      porDefecto: "redundancy",
    },
    { id: "preaviso", tipo: "si-no", etiqueta: "You worked out the notice period", porDefecto: false, ayuda: "Leave unticked if the employer ends the job at once and owes pay in lieu." },
    { id: "vacaciones", tipo: "numero", etiqueta: "Annual leave days not taken", min: 0, porDefecto: 0 },
    { id: "diasSueldo", tipo: "numero", etiqueta: "Days worked in the last month not yet paid", min: 0, max: 31, porDefecto: 0 },
    {
      id: "semana",
      tipo: "opcion",
      etiqueta: "Working days a week",
      opciones: [
        { valor: "5", etiqueta: "5 days" },
        { valor: "6", etiqueta: "6 days" },
      ],
      porDefecto: "5",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual <= 0) throw new ErrorEntrada("Enter your monthly salary.", "mensual");
    const total = e.anios * 12 + e.meses;
    const diario = (e.mensual * 12) / (52 * Number(e.semana));
    const observaciones: string[] = [];

    const conSeverance = e.motivo === "unfair" || e.motivo === "redundancy" || e.motivo === "incapacity";
    const severance = conSeverance && total >= v["ug.severance-min-months"] ? redondear(e.mensual * v["ug.severance-months-per-year"] * e.anios) : 0;

    let preaviso = 0;
    if (!e.preaviso && e.motivo !== "resignation") {
      if (total > 6 && total < 12) preaviso = ((e.mensual * 12) / 52) * v["ug.notice-weeks-under-1y"];
      else if (total >= 12 && total < 60) preaviso = e.mensual * v["ug.notice-months-1-5y"];
      else if (total >= 60 && total < 120) preaviso = e.mensual * v["ug.notice-months-5-10y"];
      else if (total >= 120) preaviso = e.mensual * v["ug.notice-months-10y"];
    }
    if (e.motivo === "resignation") observaciones.push("When you resign, you owe the employer notice. No pay in lieu is added.");

    const licencia = redondear(e.vacaciones * diario);
    const sueldo = redondear(e.diasSueldo * diario);
    const pagoPreaviso = redondear(preaviso);
    observaciones.push("Daily pay assumes your monthly salary covers 52 weeks a year.");
    return {
      total: redondear(severance + pagoPreaviso + licencia + sueldo),
      severance,
      preaviso: pagoPreaviso,
      licencia,
      sueldo,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total terminal benefits", formato: "moneda", destacada: true },
    { clave: "severance", etiqueta: "Severance allowance", formato: "moneda" },
    { clave: "preaviso", etiqueta: "Pay in lieu of notice", formato: "moneda" },
    { clave: "licencia", etiqueta: "Pay for leave not taken", formato: "moneda" },
    { clave: "sueldo", etiqueta: "Salary for days worked", formato: "moneda" },
  ],
});
