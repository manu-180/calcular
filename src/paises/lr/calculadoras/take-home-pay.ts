import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoAnual, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "lr.take-home-pay",
  mercado: "lr",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "lr.pit-bands": "escala",
    "lr.non-cash-exemption": "numero",
    "lr.nasscorp-employee": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross salary a month", min: 0, porDefecto: 40000 },
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
      id: "beneficios",
      tipo: "moneda",
      etiqueta: "Non-cash benefits a month (housing, vehicle, fuel), market value",
      min: 0,
      porDefecto: 0,
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
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your gross salary.", "salario");
    const enUsd = entrada.divisa === "usd";
    const tasa = enUsd ? (entrada.tipoCambio ?? 0) : 1;
    if (tasa <= 0) throw new ErrorEntrada("Enter the exchange rate in Liberian dollars per US dollar.", "tipoCambio");
    const salario = entrada.salario * tasa;
    const beneficiosAnuales = entrada.beneficios * 12 * tasa;
    const beneficiosGravados = Math.max(0, beneficiosAnuales - v["lr.non-cash-exemption"]);
    const gravableAnual = salario * 12 + beneficiosGravados;
    const nasscorp = redondear(porcentaje(salario, v["lr.nasscorp-employee"]));
    const pit = redondear(impuestoAnual(v["lr.pit-bands"], gravableAnual) / 12);
    const neto = redondear(salario - nasscorp - pit);
    return {
      neto,
      netoUsd: enUsd ? redondear(neto / tasa) : null,
      nasscorp,
      pit,
      gravable: redondear(gravableAnual),
      anual: redondear(neto * 12),
      marginal: tasaMarginal(v["lr.pit-bands"], gravableAnual),
      tasa: enUsd ? tasa : null,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "netoUsd", etiqueta: "Take-home pay a month in US dollars", formato: "moneda", moneda: "USD" },
    { clave: "nasscorp", etiqueta: "NASSCORP pension contribution", formato: "moneda" },
    { clave: "pit", etiqueta: "Personal income tax (PIT)", formato: "moneda" },
    { clave: "gravable", etiqueta: "Gross taxable income for the year", formato: "moneda" },
    { clave: "anual", etiqueta: "Take-home pay a year", formato: "moneda" },
    { clave: "marginal", etiqueta: "Your top band rate", formato: "porcentaje", decimales: 0 },
    { clave: "tasa", etiqueta: "Exchange rate used (L$ per US$1)", formato: "numero", decimales: 4 },
  ],
  mundo: { bruto: "salario", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { divisa: "lrd", beneficios: 0 } },
});
