import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { costosDubai } from "../lib/inmuebles";

export default definirCalculadora({
  id: "ae.rental-yield-calculator",
  mercado: "ae",
  concepto: "propio",
  slug: "rental-yield-calculator",
  estado: "publicado",
  requiere: {
    "ae.dld-transfer-fee": "numero",
    "ae.dld-registrar-fee": "mapa",
    "ae.dld-mortgage-fee": "numero",
    "ae.dld-title-deed": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Purchase price", min: 0, porDefecto: 1500000 },
    { id: "renta", tipo: "moneda", etiqueta: "Yearly rent", min: 0, porDefecto: 100000 },
    { id: "servicios", tipo: "moneda", etiqueta: "Yearly service charges", min: 0, porDefecto: 15000 },
    { id: "otros", tipo: "moneda", etiqueta: "Other yearly costs (maintenance, insurance, agency)", min: 0, porDefecto: 5000 },
    { id: "vacio", tipo: "numero", etiqueta: "Months empty a year", min: 0, max: 12, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the purchase price.", "precio");
    if (entrada.renta <= 0) throw new ErrorEntrada("Enter the yearly rent.", "renta");
    const compra = costosDubai(entrada.precio, 0, {
      tasa: v["ae.dld-transfer-fee"],
      registros: v["ae.dld-registrar-fee"],
      tasaHipoteca: v["ae.dld-mortgage-fee"],
      titulo: v["ae.dld-title-deed"],
    }).total;
    const ingreso = (entrada.renta * (12 - entrada.vacio)) / 12;
    const neto = ingreso - entrada.servicios - entrada.otros;
    const inversion = entrada.precio + compra;
    return {
      bruta: (entrada.renta / entrada.precio) * 100,
      neta: (neto / inversion) * 100,
      neto: redondear(neto),
      compra: redondear(compra),
      inversion: redondear(inversion),
      observaciones: ["The net yield includes the Dubai Land Department costs of buying, but not mortgage interest or agency fees on the purchase."],
    };
  },
  resultado: [
    { clave: "neta", etiqueta: "Net rental yield", formato: "porcentaje", decimales: 2, destacada: true },
    { clave: "bruta", etiqueta: "Gross rental yield", formato: "porcentaje", decimales: 2 },
    { clave: "neto", etiqueta: "Net yearly income", formato: "moneda" },
    { clave: "compra", etiqueta: "Dubai Land Department costs of buying", formato: "moneda" },
    { clave: "inversion", etiqueta: "Total invested", formato: "moneda" },
  ],
});
