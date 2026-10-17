import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hk.minimum-wage",
  mercado: "hk",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "hk.minimum-wage": "numero",
    "hk.smw-record-cap": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Wages for the wage period", min: 0, porDefecto: 9000 },
    { id: "horas", tipo: "numero", etiqueta: "Hours worked in the wage period", min: 0, max: 744, porDefecto: 208 },
    { id: "mensual", tipo: "si-no", etiqueta: "The wage period is a month", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter the hours you worked.", "horas");
    const minimo = redondear(entrada.horas * v["hk.minimum-wage"]);
    const faltante = redondear(Math.max(0, minimo - entrada.salario));
    const observaciones: string[] = [];
    observaciones.push(faltante > 0 ? "Your wages are below the minimum wage for the hours worked. The employer has to pay the difference." : "Your wages meet the statutory minimum wage for the hours worked.");
    if (entrada.mensual) {
      observaciones.push(
        entrada.salario < v["hk.smw-record-cap"]
          ? "Because the monthly wages are below the record-keeping cap, the employer must keep a record of the hours you worked."
          : "Because the monthly wages are at or above the record-keeping cap, the employer doesn't have to record your hours. The minimum wage still applies.",
      );
    }
    return {
      minimo,
      faltante,
      porHora: redondear(entrada.salario / entrada.horas),
      tarifa: v["hk.minimum-wage"],
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Minimum wages for those hours", formato: "moneda", destacada: true },
    { clave: "faltante", etiqueta: "Amount below the minimum", formato: "moneda" },
    { clave: "porHora", etiqueta: "What you earn per hour", formato: "moneda" },
    { clave: "tarifa", etiqueta: "Statutory minimum wage per hour", formato: "moneda" },
  ],
});
