import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { leerLito, rentaResidente, type Medicare } from "../lib/impuestos";

export default definirCalculadora({
  id: "au.capital-gains-tax-calculator",
  mercado: "au",
  concepto: "propio",
  slug: "capital-gains-tax-calculator",
  estado: "publicado",
  requiere: {
    "au.cgt-descuento": "numero",
    "au.escala-renta-2026-27": "escala",
    "au.lito": "mapa",
    "au.lito-tasas": "mapa",
    "au.medicare-levy": "numero",
    "au.medicare-umbrales": "mapa",
    "au.medicare-tasa-reduccion": "numero",
  },
  campos: [
    { id: "costo", tipo: "moneda", etiqueta: "Cost base (what the asset cost you)", min: 0, porDefecto: 300000 },
    { id: "venta", tipo: "moneda", etiqueta: "Sale price", min: 0, porDefecto: 400000 },
    { id: "doceMeses", tipo: "si-no", etiqueta: "You owned it for at least 12 months", porDefecto: true },
    { id: "ingreso", tipo: "moneda", etiqueta: "Your other taxable income in 2026-27", min: 0, porDefecto: 85000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.costo < 0 || entrada.venta < 0) throw new ErrorEntrada("Enter amounts of zero or more.", "costo");
    if (entrada.ingreso < 0) throw new ErrorEntrada("Enter an income of zero or more.", "ingreso");
    const ganancia = redondear(entrada.venta - entrada.costo);
    const u = v["au.medicare-umbrales"];
    const m: Medicare = { tasa: v["au.medicare-levy"], umbral: u.umbral, limite: u.limite, tasaReduccion: v["au.medicare-tasa-reduccion"] };
    const l = leerLito(v["au.lito"], v["au.lito-tasas"]);
    const escala = v["au.escala-renta-2026-27"];
    if (ganancia <= 0) {
      return {
        ganancia,
        descuento: 0,
        neta: 0,
        impuesto: 0,
        tasaEfectiva: 0,
        observaciones: ganancia < 0 ? ["You made a capital loss. You can use it to reduce capital gains this year or carry it forward to future years."] : [],
      };
    }
    const descuento = entrada.doceMeses ? redondear(porcentaje(ganancia, v["au.cgt-descuento"])) : 0;
    const neta = redondear(ganancia - descuento);
    const sin = rentaResidente(entrada.ingreso, escala, l, m);
    const con = rentaResidente(entrada.ingreso + neta, escala, l, m);
    const impuesto = redondear(con.total - sin.total);
    return {
      ganancia,
      descuento,
      neta,
      impuesto,
      tasaEfectiva: (impuesto / ganancia) * 100,
      observaciones: entrada.doceMeses ? [] : ["You owned the asset for less than 12 months, so the CGT discount does not apply."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Extra tax because of the gain (including Medicare levy)", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Capital gain", formato: "moneda" },
    { clave: "descuento", etiqueta: "CGT discount", formato: "moneda", ocultarSiCero: true },
    { clave: "neta", etiqueta: "Net capital gain added to your income", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Tax as a share of the gain", formato: "porcentaje", decimales: 1 },
  ],
});
