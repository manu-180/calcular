import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { personalAllowance } from "../lib/impuestos";

export default definirCalculadora({
  id: "gb.capital-gains-tax",
  mercado: "gb",
  concepto: "propio",
  slug: "capital-gains-tax",
  estado: "publicado",
  requiere: {
    "gb.personal-allowance": "numero",
    "gb.personal-allowance-taper": "numero",
    "gb.basic-rate-band": "numero",
    "gb.cgt-annual-exempt-amount": "numero",
    "gb.cgt-rates": "mapa",
  },
  campos: [
    { id: "ganancia", tipo: "moneda", etiqueta: "Total gains in the tax year (after allowable losses)", min: 0, porDefecto: 20000 },
    { id: "ingreso", tipo: "moneda", etiqueta: "Your income for the year before tax", min: 0, porDefecto: 40000, ayuda: "Salary, pension, self-employed profit, rent and other taxable income." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ganancia <= 0) throw new ErrorEntrada("Enter your gains for the year.", "ganancia");
    const pa = personalAllowance(entrada.ingreso, v["gb.personal-allowance"], v["gb.personal-allowance-taper"]);
    const gravableIngreso = Math.max(0, entrada.ingreso - pa);
    const gravable = Math.max(0, entrada.ganancia - v["gb.cgt-annual-exempt-amount"]);
    const libre = Math.max(0, v["gb.basic-rate-band"] - gravableIngreso);
    const aTasaBaja = Math.min(gravable, libre);
    const aTasaAlta = gravable - aTasaBaja;
    const tasas = v["gb.cgt-rates"];
    const impuesto = redondear((aTasaBaja * tasas.basic + aTasaAlta * tasas.higher) / 100);
    return {
      impuesto,
      gravable: redondear(gravable),
      aTasaBaja: redondear(aTasaBaja),
      aTasaAlta: redondear(aTasaAlta),
      efectiva: (impuesto / entrada.ganancia) * 100,
      observaciones: ["The same rates apply to residential property and other assets. You do not usually pay Capital Gains Tax when you sell your main home."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Capital Gains Tax to pay", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "Taxable gains after the annual exempt amount", formato: "moneda" },
    { clave: "aTasaBaja", etiqueta: "Gains taxed at the lower rate", formato: "moneda" },
    { clave: "aTasaAlta", etiqueta: "Gains taxed at the higher rate", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Tax as a share of your gains", formato: "porcentaje", decimales: 2 },
  ],
});
