import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { libras, personalAllowance } from "../lib/impuestos";

function enTramo(desde: number, hasta: number, inicio: number, fin: number): number {
  return Math.max(0, Math.min(fin, hasta) - Math.max(inicio, desde));
}

export default definirCalculadora({
  id: "gb.dividend-tax",
  mercado: "gb",
  concepto: "propio",
  slug: "dividend-tax",
  estado: "publicado",
  requiere: {
    "gb.personal-allowance": "numero",
    "gb.personal-allowance-taper": "numero",
    "gb.basic-rate-band": "numero",
    "gb.additional-rate-threshold": "numero",
    "gb.dividend-allowance": "numero",
    "gb.dividend-rates": "mapa",
  },
  campos: [
    { id: "dividendos", tipo: "moneda", etiqueta: "Dividends received in the tax year", min: 0, porDefecto: 10000 },
    { id: "otros", tipo: "moneda", etiqueta: "Other taxable income (salary, pension, rent profit)", min: 0, porDefecto: 30000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.dividendos <= 0) throw new ErrorEntrada("Enter the dividends you received.", "dividendos");
    const total = entrada.dividendos + entrada.otros;
    const pa = personalAllowance(total, v["gb.personal-allowance"], v["gb.personal-allowance-taper"]);
    const inicio = Math.max(0, entrada.otros - pa);
    const gravables = Math.max(0, entrada.dividendos - Math.max(0, pa - entrada.otros));
    const exentos = Math.min(gravables, v["gb.dividend-allowance"]);
    const desde = inicio + exentos;
    const fin = inicio + gravables;
    const basica = v["gb.basic-rate-band"];
    const adicional = v["gb.additional-rate-threshold"];
    const tasas = v["gb.dividend-rates"];
    const enBasica = enTramo(0, basica, desde, fin);
    const enAlta = enTramo(basica, adicional, desde, fin);
    const enAdicional = enTramo(adicional, Infinity, desde, fin);
    const impuesto = redondear((enBasica * tasas.basic + enAlta * tasas.higher + enAdicional * tasas.additional) / 100);
    const observaciones: string[] = [];
    if (enBasica > 0) observaciones.push(`${libras(redondear(enBasica))} of dividends taxed at ${tasas.basic}%.`);
    if (enAlta > 0) observaciones.push(`${libras(redondear(enAlta))} of dividends taxed at ${tasas.higher}%.`);
    if (enAdicional > 0) observaciones.push(`${libras(redondear(enAdicional))} of dividends taxed at ${tasas.additional}%.`);
    observaciones.push("Scottish taxpayers pay the same dividend rates and use the same bands as the rest of the UK.");
    return {
      impuesto,
      exentos: redondear(exentos + Math.min(entrada.dividendos, Math.max(0, pa - entrada.otros))),
      efectiva: (impuesto / entrada.dividendos) * 100,
      neto: redondear(entrada.dividendos - impuesto),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Dividend tax to pay", formato: "moneda", destacada: true },
    { clave: "exentos", etiqueta: "Dividends taxed at 0%", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Tax as a share of your dividends", formato: "porcentaje", decimales: 2 },
    { clave: "neto", etiqueta: "Dividends after tax", formato: "moneda" },
  ],
});
