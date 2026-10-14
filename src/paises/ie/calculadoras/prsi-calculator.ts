import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { prsiSemanal } from "../lib/impuestos";

export default definirCalculadora({
  id: "ie.prsi-calculator",
  mercado: "ie",
  concepto: "aportes-seguridad-social",
  slug: "prsi-calculator",
  estado: "publicado",
  requiere: {
    "ie.prsi-employee-rate": "numero",
    "ie.prsi-weekly-thresholds": "mapa",
    "ie.prsi-credit-max": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Gross pay", min: 0, porDefecto: 800 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "That pay is for",
      opciones: [
        { valor: "week", etiqueta: "A week" },
        { valor: "month", etiqueta: "A month" },
        { valor: "year", etiqueta: "A year" },
      ],
      porDefecto: "week",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("Enter your pay before tax.", "importe");
    const semanal = entrada.periodo === "week" ? entrada.importe : entrada.periodo === "month" ? (entrada.importe * 12) / 52 : entrada.importe / 52;
    const u = v["ie.prsi-weekly-thresholds"];
    const r = prsiSemanal(semanal, { tasa: v["ie.prsi-employee-rate"], desde: u["employee-starts"], finCredito: u["credit-ends"], creditoMaximo: v["ie.prsi-credit-max"] }, redondear);
    const observaciones: string[] = [];
    if (r.prsi === 0 && r.bruto === 0) observaciones.push("At this level of weekly pay no employee PRSI is due, although your employer still pays its share.");
    if (r.credito > 0) observaciones.push("Your weekly pay is in the band where the PRSI Credit applies, so your PRSI is reduced.");
    if (entrada.periodo !== "week") observaciones.push("PRSI is worked out on weekly pay, so the amount is turned into a weekly figure first.");
    return {
      semana: r.prsi,
      mes: redondear((r.prsi * 52) / 12),
      anio: redondear(r.prsi * 52),
      semanal: redondear(semanal),
      bruto: r.bruto,
      credito: r.credito,
      tasa: v["ie.prsi-employee-rate"],
      observaciones,
    };
  },
  resultado: [
    { clave: "semana", etiqueta: "Employee PRSI a week", formato: "moneda", destacada: true },
    { clave: "mes", etiqueta: "PRSI a month", formato: "moneda" },
    { clave: "anio", etiqueta: "PRSI a year", formato: "moneda" },
    { clave: "semanal", etiqueta: "Weekly pay used", formato: "moneda" },
    { clave: "bruto", etiqueta: "PRSI before the credit", formato: "moneda" },
    { clave: "credito", etiqueta: "PRSI Credit", formato: "moneda", ocultarSiCero: true },
    { clave: "tasa", etiqueta: "Employee PRSI rate", formato: "porcentaje", decimales: 2 },
  ],
});
