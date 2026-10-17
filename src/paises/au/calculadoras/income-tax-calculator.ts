import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dolares, leerLito, rentaResidente } from "../lib/impuestos";

export default definirCalculadora({
  id: "au.income-tax-calculator",
  mercado: "au",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "au.escala-renta-2026-27": "escala",
    "au.escala-renta-2025-26": "escala",
    "au.lito": "mapa",
    "au.lito-tasas": "mapa",
    "au.medicare-levy": "numero",
    "au.medicare-umbrales": "mapa",
    "au.medicare-tasa-reduccion": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Taxable income for the year", min: 0, porDefecto: 85000 },
    {
      id: "anio",
      tipo: "opcion",
      etiqueta: "Income year",
      opciones: [
        { valor: "2026-27", etiqueta: "2026-27 (1 July 2026 to 30 June 2027)" },
        { valor: "2025-26", etiqueta: "2025-26 (the tax return you lodge now)" },
      ],
      porDefecto: "2026-27",
    },
    { id: "medicare", tipo: "si-no", etiqueta: "Include the Medicare levy", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso < 0) throw new ErrorEntrada("Enter an income of zero or more.", "ingreso");
    const escala = entrada.anio === "2025-26" ? v["au.escala-renta-2025-26"] : v["au.escala-renta-2026-27"];
    const umbrales = v["au.medicare-umbrales"];
    const r = rentaResidente(
      entrada.ingreso,
      escala,
      leerLito(v["au.lito"], v["au.lito-tasas"]),
      { tasa: v["au.medicare-levy"], umbral: umbrales.umbral, limite: umbrales.limite, tasaReduccion: v["au.medicare-tasa-reduccion"] },
      entrada.medicare,
    );
    const total = redondear(r.total);
    const observaciones: string[] = [];
    if (entrada.medicare && entrada.ingreso > umbrales.umbral && entrada.ingreso <= umbrales.limite) {
      observaciones.push(`Your income is between ${dolares(umbrales.umbral)} and ${dolares(umbrales.limite)}, so you pay a reduced Medicare levy.`);
    }
    if (entrada.anio === "2026-27" && entrada.medicare && entrada.ingreso <= umbrales.limite) {
      observaciones.push("The Medicare levy low-income thresholds for 2026-27 have not been set yet, so the current ones are used.");
    }
    return {
      bruto: redondear(r.bruto),
      offset: redondear(r.offset),
      impuesto: redondear(r.impuesto),
      medicareLevy: redondear(r.medicare),
      total,
      neto: redondear(entrada.ingreso - total),
      efectiva: entrada.ingreso > 0 ? (r.total / entrada.ingreso) * 100 : 0,
      marginal: r.marginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Tax on taxable income", formato: "moneda" },
    { clave: "offset", etiqueta: "Low income tax offset", formato: "moneda", ocultarSiCero: true },
    { clave: "impuesto", etiqueta: "Income tax after offset", formato: "moneda" },
    { clave: "medicareLevy", etiqueta: "Medicare levy", formato: "moneda" },
    { clave: "total", etiqueta: "Total tax", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Income after tax", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Average tax rate", formato: "porcentaje", decimales: 1 },
    { clave: "marginal", etiqueta: "Marginal tax rate (before Medicare)", formato: "porcentaje", decimales: 0 },
  ],
});
