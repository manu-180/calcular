import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { dolares } from "../lib/impuestos";

function valorPresente(cuota: number, tasaAnual: number, meses: number): number {
  const r = tasaAnual / 1200;
  return r === 0 ? cuota * meses : (cuota * (1 - Math.pow(1 + r, -meses))) / r;
}

export default definirCalculadora({
  id: "sg.tdsr-calculator",
  mercado: "sg",
  concepto: "propio",
  slug: "tdsr-calculator",
  estado: "publicado",
  requiere: {
    "sg.tdsr": "numero",
    "sg.msr": "numero",
    "sg.tdsr-tasa-piso": "mapa",
    "sg.tdsr-descuento-variable": "numero",
    "sg.plazo-maximo-prestamo": "mapa",
  },
  campos: [
    { id: "fijo", tipo: "moneda", etiqueta: "Gross fixed monthly income", min: 0, porDefecto: 8000 },
    { id: "variable", tipo: "moneda", etiqueta: "Average monthly variable income (bonus, commission)", min: 0, porDefecto: 0, ayuda: "The average of the last 12 months." },
    { id: "alquiler", tipo: "moneda", etiqueta: "Monthly rental income", min: 0, porDefecto: 0 },
    { id: "deudasPropiedad", tipo: "moneda", etiqueta: "Monthly instalments on your other property loans", min: 0, porDefecto: 0 },
    { id: "deudasOtras", tipo: "moneda", etiqueta: "Other monthly debt repayments (car, cards, personal loans)", min: 0, porDefecto: 0 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Property you are buying",
      opciones: [
        { valor: "hdb", etiqueta: "HDB flat, or EC within its minimum occupation period" },
        { valor: "privado", etiqueta: "Private home (condo, landed)" },
        { valor: "no-residencial", etiqueta: "Non-residential property" },
      ],
      porDefecto: "privado",
    },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Highest interest rate in the loan offer", min: 0, max: 20, porDefecto: 3, ayuda: "The rate after any lock-in period, usually shown as the thereafter rate." },
    { id: "plazo", tipo: "entero", etiqueta: "Loan tenure in years", min: 1, max: 35, porDefecto: 25 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.fijo + entrada.variable + entrada.alquiler <= 0) throw new ErrorEntrada("Enter your monthly income.", "fijo");
    const plazoMax = enMapa(v["sg.plazo-maximo-prestamo"], entrada.tipo === "hdb" ? "hdb" : "otros");
    if (entrada.plazo > plazoMax) throw new ErrorEntrada(`The longest bank loan tenure for this property is ${plazoMax} years.`, "plazo");
    const descuento = v["sg.tdsr-descuento-variable"];
    const ingreso = redondear(entrada.fijo + ((entrada.variable + entrada.alquiler) * (100 - descuento)) / 100);
    const porTdsr = (ingreso * v["sg.tdsr"]) / 100 - entrada.deudasPropiedad - entrada.deudasOtras;
    const porMsr = entrada.tipo === "hdb" ? (ingreso * v["sg.msr"]) / 100 - entrada.deudasPropiedad : Infinity;
    const cuota = redondear(Math.max(0, Math.min(porTdsr, porMsr)));
    const piso = enMapa(v["sg.tdsr-tasa-piso"], entrada.tipo === "no-residencial" ? "no-residencial" : "residencial");
    const tasaUsada = Math.max(piso, entrada.tasa);
    const prestamo = redondear(valorPresente(cuota, tasaUsada, entrada.plazo * 12));
    const limite = porMsr < porTdsr ? `Mortgage Servicing Ratio (${v["sg.msr"]}%)` : `Total Debt Servicing Ratio (${v["sg.tdsr"]}%)`;
    const observaciones = [
      `Banks test your loan at ${tasaUsada}% a year: the higher of the ${piso}% floor and the highest rate in your loan offer.`,
      `Variable and rental income count at ${100 - descuento}% of their value.`,
      "The bank also applies loan-to-value limits, so the loan you get can be lower than this.",
    ];
    if (cuota === 0) observaciones.unshift(`Your current debts already use up the limit, so the bank cannot lend more. The limit is ${dolares(Math.max(0, Math.min(porTdsr, porMsr)))} a month.`);
    return { prestamo, cuota, ingreso, tasaUsada, limite, observaciones };
  },
  resultado: [
    { clave: "prestamo", etiqueta: "Largest loan you could get", formato: "moneda", destacada: true },
    { clave: "cuota", etiqueta: "Largest monthly instalment allowed", formato: "moneda" },
    { clave: "ingreso", etiqueta: "Income the bank counts", formato: "moneda" },
    { clave: "tasaUsada", etiqueta: "Interest rate used for the test", formato: "porcentaje", decimales: 2 },
    { clave: "limite", etiqueta: "Limit that applies", formato: "texto" },
  ],
});
