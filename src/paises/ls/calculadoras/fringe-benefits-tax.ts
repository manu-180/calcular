import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { diasDelAnioFiscal, maloti } from "../lib/comun";

export default definirCalculadora({
  id: "ls.fringe-benefits-tax",
  mercado: "ls",
  concepto: "propio",
  slug: "fringe-benefits-tax",
  estado: "publicado",
  requiere: {
    "ls.fbt-rate": "numero",
    "ls.car-benefit-rate": "numero",
    "ls.housing-benefit-cap": "numero",
  },
  campos: [
    { id: "remuneracion", tipo: "moneda", etiqueta: "Employee's yearly remuneration", min: 0, porDefecto: 360000 },
    { id: "auto", tipo: "moneda", etiqueta: "Market value of the company car (when first provided)", min: 0, porDefecto: 0 },
    { id: "dias", tipo: "entero", etiqueta: "Days the car was available for private use this tax year", min: 0, max: 366, porDefecto: 365 },
    { id: "pagoAuto", tipo: "moneda", etiqueta: "What the employee paid for the car benefit", min: 0, porDefecto: 0 },
    { id: "alquiler", tipo: "moneda", etiqueta: "Open market rent of housing provided, for the year", min: 0, porDefecto: 0 },
    { id: "pagoVivienda", tipo: "moneda", etiqueta: "What the employee paid towards the housing", min: 0, porDefecto: 0 },
    {
      id: "otros",
      tipo: "moneda",
      etiqueta: "Other fringe benefits for the year",
      min: 0,
      porDefecto: 0,
      ayuda: "Utilities paid for the employee, domestic help, debt waived, meals that are not exempt, and similar. Enter the value less anything the employee paid.",
    },
  ],
  calcular(entrada, v, { redondear, fecha }) {
    const diasAnio = diasDelAnioFiscal(fecha);
    if (entrada.dias > diasAnio) throw new ErrorEntrada(`This tax year has ${diasAnio} days.`, "dias");
    const autoBruto = (porcentaje(entrada.auto, v["ls.car-benefit-rate"]) * entrada.dias) / diasAnio;
    const auto = redondear(Math.max(0, autoBruto - entrada.pagoAuto));
    const tope = porcentaje(entrada.remuneracion, v["ls.housing-benefit-cap"]);
    const viviendaSinTope = Math.max(0, entrada.alquiler - entrada.pagoVivienda);
    const vivienda = redondear(Math.min(viviendaSinTope, tope));
    const total = redondear(auto + vivienda + entrada.otros);
    if (total === 0) throw new ErrorEntrada("Enter at least one fringe benefit.", "auto");
    const tasa = v["ls.fbt-rate"];
    const imponible = redondear(total / (1 - tasa / 100));
    const fbt = redondear(porcentaje(imponible, tasa));
    const observaciones: string[] = [];
    if (viviendaSinTope > tope) observaciones.push(`The housing benefit is capped at ${v["ls.housing-benefit-cap"]}% of remuneration, so it counts as ${maloti(vivienda)}.`);
    return { fbt, auto, vivienda, otros: entrada.otros, total, imponible, mensual: redondear(fbt / 12), observaciones };
  },
  resultado: [
    { clave: "fbt", etiqueta: "Fringe benefits tax for the year", formato: "moneda", destacada: true },
    { clave: "auto", etiqueta: "Taxable value of the car", formato: "moneda", ocultarSiCero: true },
    { clave: "vivienda", etiqueta: "Taxable value of the housing", formato: "moneda", ocultarSiCero: true },
    { clave: "otros", etiqueta: "Other benefits", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total taxable value", formato: "moneda" },
    { clave: "imponible", etiqueta: "Fringe benefits taxable amount (grossed up)", formato: "moneda" },
    { clave: "mensual", etiqueta: "Fringe benefits tax a month on average", formato: "moneda" },
  ],
});
