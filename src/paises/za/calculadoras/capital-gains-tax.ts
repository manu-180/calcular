import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoNeto, OPCIONES_EDAD } from "../lib/impuestos";

export default definirCalculadora({
  id: "za.capital-gains-tax",
  mercado: "za",
  concepto: "propio",
  slug: "capital-gains-tax",
  estado: "publicado",
  requiere: {
    "za.income-tax-bands": "escala",
    "za.tax-rebates": "mapa",
    "za.cgt-inclusion-rate": "numero",
    "za.cgt-annual-exclusion": "numero",
    "za.cgt-primary-residence-exclusion": "numero",
    "za.cgt-death-exclusion": "numero",
  },
  campos: [
    { id: "ganancia", tipo: "moneda", etiqueta: "Capital gain (proceeds less base cost)", min: 0, porDefecto: 300000 },
    { id: "residencia", tipo: "si-no", etiqueta: "The gain is on your primary residence", porDefecto: false },
    { id: "otrasGanancias", tipo: "moneda", etiqueta: "Other net capital gains this tax year (optional)", min: 0, requerido: false },
    { id: "ingreso", tipo: "moneda", etiqueta: "Your other taxable income for the year", min: 0, porDefecto: 500000 },
    { id: "edad", tipo: "opcion", etiqueta: "Your age", opciones: OPCIONES_EDAD, porDefecto: "under-65" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ganancia <= 0) throw new ErrorEntrada("Enter the capital gain.", "ganancia");
    const exclusionVivienda = entrada.residencia ? Math.min(entrada.ganancia, v["za.cgt-primary-residence-exclusion"]) : 0;
    const total = entrada.ganancia - exclusionVivienda + (entrada.otrasGanancias ?? 0);
    const neta = Math.max(0, total - v["za.cgt-annual-exclusion"]);
    const gravable = redondear((neta * v["za.cgt-inclusion-rate"]) / 100);
    const escala = v["za.income-tax-bands"];
    const sin = impuestoNeto(escala, v["za.tax-rebates"], entrada.edad, entrada.ingreso);
    const con = impuestoNeto(escala, v["za.tax-rebates"], entrada.edad, entrada.ingreso + gravable);
    const impuesto = redondear(con - sin);
    return {
      impuesto,
      exclusionVivienda,
      neta: redondear(neta),
      gravable,
      efectiva: (impuesto / entrada.ganancia) * 100,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Extra tax because of the gain", formato: "moneda", destacada: true },
    { clave: "exclusionVivienda", etiqueta: "Primary residence exclusion used", formato: "moneda", ocultarSiCero: true },
    { clave: "neta", etiqueta: "Net capital gain after the annual exclusion", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable capital gain added to your income", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Tax as a share of the gain", formato: "porcentaje", decimales: 2 },
  ],
});
