import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { cedis } from "../lib/impuestos";

export default definirCalculadora({
  id: "gh.overtime-tax",
  mercado: "gh",
  concepto: "propio",
  slug: "overtime-tax",
  estado: "publicado",
  requiere: {
    "gh.overtime-tax": "mapa",
    "gh.overtime-half-limit": "numero",
    "gh.overtime-income-limit": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 2000 },
    { id: "extra", tipo: "moneda", etiqueta: "Overtime pay this month", min: 0, porDefecto: 1500 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter your monthly basic salary.", "basico");
    if (entrada.extra <= 0) throw new ErrorEntrada("Enter the overtime pay.", "extra");
    const tope = porcentaje(entrada.basico, v["gh.overtime-half-limit"]);
    const bajo = Math.min(entrada.extra, tope);
    const alto = entrada.extra - bajo;
    const impuestoBajo = redondear(porcentaje(bajo, v["gh.overtime-tax"]["up-to-half"]));
    const impuestoAlto = redondear(porcentaje(alto, v["gh.overtime-tax"]["above-half"]));
    const impuesto = redondear(impuestoBajo + impuestoAlto);
    return {
      impuesto,
      neto: redondear(entrada.extra - impuesto),
      impuestoBajo,
      impuestoAlto,
      tope: redondear(tope),
      observaciones: [`These rates apply to junior staff whose qualifying employment income is not more than ${cedis(v["gh.overtime-income-limit"])}.`],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax on your overtime", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Overtime after tax", formato: "moneda" },
    { clave: "impuestoBajo", etiqueta: "Tax on overtime up to half of basic", formato: "moneda" },
    { clave: "impuestoAlto", etiqueta: "Tax on overtime above half of basic", formato: "moneda", ocultarSiCero: true },
    { clave: "tope", etiqueta: "Half of your basic salary", formato: "moneda" },
  ],
});
