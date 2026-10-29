import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.severance-pay",
  mercado: "gm",
  concepto: "indemnizacion-despido",
  slug: "severance-pay",
  estado: "publicado",
  requiere: {
    "gm.severance-months-per-year": "numero",
    "gm.fixed-term-gratuity-rate": "numero",
  },
  campos: [
    {
      id: "caso",
      tipo: "opcion",
      etiqueta: "How the job ended",
      opciones: [
        { valor: "terminacion", etiqueta: "Contract terminated by the employer" },
        { valor: "insolvencia", etiqueta: "Insolvency or winding up of the business" },
        { valor: "transferencia", etiqueta: "Transfer of the business or sale of shares" },
        { valor: "fallecimiento", etiqueta: "Death in service" },
        { valor: "plazo", etiqueta: "Fixed-term contract ended or terminated" },
      ],
      porDefecto: "terminacion",
    },
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic pay", min: 0, porDefecto: 10000, visibleSi: { caso: ["terminacion", "insolvencia", "transferencia", "fallecimiento"] } },
    { id: "anios", tipo: "entero", etiqueta: "Completed years served", min: 0, max: 60, porDefecto: 5, visibleSi: { caso: ["terminacion", "insolvencia", "transferencia", "fallecimiento"] } },
    { id: "ganado", tipo: "moneda", etiqueta: "Basic pay earned during the contract", min: 0, porDefecto: 240000, visibleSi: { caso: ["plazo"] } },
  ],
  calcular(entrada, v, { redondear }) {
    const observaciones = ["Severance pay is not due to casual employees or to employees still on probation."];
    if (entrada.caso === "plazo") {
      const ganado = entrada.ganado ?? 0;
      if (ganado <= 0) throw new ErrorEntrada("Enter the basic pay earned during the contract.", "ganado");
      observaciones.push("Instead of this gratuity, the employee may receive the retirement benefits of the social security scheme they belong to.");
      return { indemnizacion: redondear(porcentaje(ganado, v["gm.fixed-term-gratuity-rate"])), mesesPorAnio: null, observaciones };
    }
    const basico = entrada.basico ?? 0;
    if (basico <= 0) throw new ErrorEntrada("Enter the monthly basic pay.", "basico");
    const anios = entrada.anios ?? 0;
    if (entrada.caso === "fallecimiento") observaciones.push("On death in service the severance pay goes to the employee's estate.");
    return {
      indemnizacion: redondear(basico * v["gm.severance-months-per-year"] * anios),
      mesesPorAnio: v["gm.severance-months-per-year"],
      observaciones,
    };
  },
  resultado: [
    { clave: "indemnizacion", etiqueta: "Severance pay", formato: "moneda", destacada: true },
    { clave: "mesesPorAnio", etiqueta: "Months of basic pay for each year", formato: "meses" },
  ],
});
