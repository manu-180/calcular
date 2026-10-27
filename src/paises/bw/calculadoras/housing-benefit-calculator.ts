import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuesto } from "../lib/impuestos";

// Housing Benefit Table de BURS: de P48 100 a P58 600 el porcentaje sube 0,25 punto cada P100
// (1,25 % en P48 100, 27,5 % en P58 600); por encima de P58 600 es el tope del dato.
const TABLA_DESDE = 48100;
const TABLA_HASTA = 58600;

function porcentajeRelevante(ingreso: number, tope: number): number | null {
  if (ingreso < TABLA_DESDE) return null;
  if (ingreso > TABLA_HASTA) return tope;
  return 1 + (Math.floor(ingreso / 100) * 100 - 48000) / 400;
}

export default definirCalculadora({
  id: "bw.housing-benefit-calculator",
  mercado: "bw",
  concepto: "propio",
  slug: "housing-benefit-calculator",
  estado: "publicado",
  requiere: {
    "bw.paye-resident": "escala",
    "bw.housing-benefit-rates": "mapa",
    "bw.housing-capital-factor": "numero",
    "bw.housing-benefit-cap": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "How does your employer provide the house?",
      opciones: [
        { valor: "leased", etiqueta: "It rents it for me" },
        { valor: "rateable", etiqueta: "It owns it and it has a rateable value" },
        { valor: "not-rateable", etiqueta: "It owns it and it has no rateable value" },
      ],
      porDefecto: "leased",
    },
    { id: "alquiler", tipo: "moneda", etiqueta: "Rent your employer pays a month", min: 0, porDefecto: 6000, visibleSi: { tipo: ["leased"] } },
    { id: "valorFiscal", tipo: "moneda", etiqueta: "Rateable value on the council valuation roll", min: 0, porDefecto: 800000, visibleSi: { tipo: ["rateable"] } },
    { id: "superficie", tipo: "numero", etiqueta: "Floor area in square metres", min: 0, porDefecto: 120, visibleSi: { tipo: ["not-rateable"] } },
    { id: "ingreso", tipo: "moneda", etiqueta: "Your employment income a year, without the house", min: 0, porDefecto: 300000 },
    { id: "pago", tipo: "moneda", etiqueta: "What you pay your employer for the house a month", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter your employment income.", "ingreso");
    let valor: number;
    if (entrada.tipo === "leased") valor = (entrada.alquiler ?? 0) * 12;
    else if (entrada.tipo === "rateable") valor = porcentaje(entrada.valorFiscal ?? 0, enMapa(v["bw.housing-benefit-rates"], "rateable"));
    else valor = porcentaje((entrada.superficie ?? 0) * v["bw.housing-capital-factor"], enMapa(v["bw.housing-benefit-rates"], "not-rateable"));
    if (valor <= 0) throw new ErrorEntrada("Enter the rent, the rateable value or the floor area of the house.");

    const relevante = porcentajeRelevante(entrada.ingreso, v["bw.housing-benefit-cap"]);
    const observaciones: string[] = [];
    let tope: number | null = null;
    if (relevante === null) {
      observaciones.push("The BURS housing benefit table starts at an income of P48 100, so no cap is applied here. Check with BURS.");
    } else {
      tope = Math.max(0, porcentaje(entrada.ingreso, relevante) - entrada.pago * 12);
    }
    const beneficio = tope === null ? valor : Math.min(valor, tope);
    const extra = impuesto(v["bw.paye-resident"], entrada.ingreso + beneficio) - impuesto(v["bw.paye-resident"], entrada.ingreso);
    return {
      payeExtra: redondear(extra / 12),
      beneficio: redondear(beneficio / 12),
      valor: redondear(valor),
      tope: tope === null ? null : redondear(tope),
      beneficioAnual: redondear(beneficio),
      payeExtraAnual: redondear(extra),
      observaciones,
    };
  },
  resultado: [
    { clave: "payeExtra", etiqueta: "Extra PAYE a month", formato: "moneda", destacada: true },
    { clave: "beneficio", etiqueta: "Housing benefit added to your pay a month", formato: "moneda" },
    { clave: "valor", etiqueta: "Value of the house a year", formato: "moneda" },
    { clave: "tope", etiqueta: "Cap from the BURS table, a year", formato: "moneda" },
    { clave: "beneficioAnual", etiqueta: "Taxable housing benefit a year", formato: "moneda" },
    { clave: "payeExtraAnual", etiqueta: "Extra PAYE a year", formato: "moneda" },
  ],
});
