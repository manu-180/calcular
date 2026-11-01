import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "lr.income-tax-calculator",
  mercado: "lr",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "lr.pit-bands": "escala",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Gross taxable income", min: 0, porDefecto: 400000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "Income is",
      opciones: [
        { valor: "anual", etiqueta: "For the year" },
        { valor: "mensual", etiqueta: "For one month" },
      ],
      porDefecto: "anual",
    },
    {
      id: "divisa",
      tipo: "opcion",
      etiqueta: "Paid in",
      opciones: [
        { valor: "lrd", etiqueta: "Liberian dollars" },
        { valor: "usd", etiqueta: "US dollars" },
      ],
      porDefecto: "lrd",
    },
    {
      id: "tipoCambio",
      tipo: "numero",
      etiqueta: "Exchange rate (L$ per US$1)",
      ayuda: "Use the rate your employer applies. Our exchange rate calculator shows the Central Bank of Liberia rate of the day.",
      min: 0,
      visibleSi: { divisa: ["usd"] },
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter your gross taxable income.", "ingreso");
    const enUsd = entrada.divisa === "usd";
    const tasa = enUsd ? (entrada.tipoCambio ?? 0) : 1;
    if (tasa <= 0) throw new ErrorEntrada("Enter the exchange rate in Liberian dollars per US dollar.", "tipoCambio");
    const meses = entrada.periodo === "mensual" ? 12 : 1;
    const anualLrd = entrada.ingreso * meses * tasa;
    const anual = redondear(impuestoAnual(v["lr.pit-bands"], anualLrd));
    const mensual = redondear(anual / 12);
    return {
      anualLrd: redondear(anualLrd),
      anual,
      mensual,
      mensualUsd: enUsd ? redondear(mensual / tasa) : null,
      efectiva: anualLrd > 0 ? (anual / anualLrd) * 100 : 0,
      marginal: tasaMarginal(v["lr.pit-bands"], anualLrd),
      tasa: enUsd ? tasa : null,
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Income tax a month", formato: "moneda" },
    { clave: "mensualUsd", etiqueta: "Income tax a month in US dollars", formato: "moneda", moneda: "USD" },
    { clave: "anualLrd", etiqueta: "Annual gross taxable income in Liberian dollars", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Your top band rate", formato: "porcentaje", decimales: 0 },
    { clave: "tasa", etiqueta: "Exchange rate used (L$ per US$1)", formato: "numero", decimales: 4 },
  ],
});
