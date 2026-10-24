import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.severance-pay-calculator",
  mercado: "ug",
  concepto: "indemnizacion-despido",
  slug: "severance-pay-calculator",
  estado: "publicado",
  requiere: {
    "ug.severance-months-per-year": "numero",
    "ug.severance-min-months": "numero",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Full years worked", min: 0, max: 60, porDefecto: 5 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months worked", min: 0, max: 11, porDefecto: 0 },
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 1000000 },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Why the job ended",
      opciones: [
        { valor: "unfair", etiqueta: "Unfair dismissal" },
        { valor: "redundancy", etiqueta: "Position declared redundant" },
        { valor: "incapacity", etiqueta: "Physical incapacity (ended by you or the employer)" },
        { valor: "death", etiqueta: "Death of the employee in service" },
        { valor: "other", etiqueta: "Resignation, summary dismissal, retirement or end of contract" },
      ],
      porDefecto: "unfair",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual < 0) throw new ErrorEntrada("Salary cannot be negative.", "mensual");
    const total = e.anios * 12 + e.meses;
    const observaciones: string[] = [];
    let severance = 0;
    if (e.motivo === "other") {
      observaciones.push("Severance allowance is not due in these cases. Summary dismissal rules it out expressly.");
    } else if (total < v["ug.severance-min-months"]) {
      observaciones.push("Severance needs at least six months of continuous service.");
    } else {
      severance = redondear(e.mensual * v["ug.severance-months-per-year"] * e.anios);
      if (e.meses > 0 || e.anios === 0) {
        observaciones.push("Only full years are counted here, since the Act pays one month's salary for each year worked. Ask a labour officer how a part year is treated.");
      }
    }
    return { severance, anios: e.anios, observaciones };
  },
  resultado: [
    { clave: "severance", etiqueta: "Severance allowance", formato: "moneda", destacada: true },
    { clave: "anios", etiqueta: "Years counted", formato: "anios" },
  ],
});
