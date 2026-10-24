import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ke.paye-penalty-calculator",
  mercado: "ke",
  concepto: "propio",
  slug: "paye-penalty-calculator",
  estado: "publicado",
  requiere: {
    "ke.paye-late-filing-rate": "numero",
    "ke.paye-late-filing-min": "numero",
    "ke.late-payment-penalty": "numero",
    "ke.late-payment-interest": "numero",
  },
  campos: [
    { id: "impuesto", tipo: "moneda", etiqueta: "PAYE due for the month", min: 0, porDefecto: 50000 },
    { id: "presentoTarde", tipo: "si-no", etiqueta: "The PAYE return was filed after the 9th" },
    { id: "pagoTarde", tipo: "si-no", etiqueta: "The PAYE was paid after the 9th", porDefecto: true },
    { id: "meses", tipo: "entero", etiqueta: "Months late, counting part of a month as a full month", min: 1, porDefecto: 1, visibleSi: { pagoTarde: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.impuesto <= 0) throw new ErrorEntrada("Enter the PAYE that was due.", "impuesto");
    const presentacion = e.presentoTarde ? redondear(Math.max(porcentaje(e.impuesto, v["ke.paye-late-filing-rate"]), v["ke.paye-late-filing-min"])) : 0;
    const meses = e.pagoTarde ? (e.meses ?? 1) : 0;
    if (e.pagoTarde && meses < 1) throw new ErrorEntrada("Enter at least one month.", "meses");
    const recargo = e.pagoTarde ? redondear(porcentaje(e.impuesto, v["ke.late-payment-penalty"])) : 0;
    const interes = e.pagoTarde ? redondear(porcentaje(e.impuesto, v["ke.late-payment-interest"]) * meses) : 0;
    const total = redondear(presentacion + recargo + interes);
    return { total, presentacion, recargo, interes, conImpuesto: redondear(e.impuesto + total) };
  },
  resultado: [
    { clave: "total", etiqueta: "Penalties and interest", formato: "moneda", destacada: true },
    { clave: "presentacion", etiqueta: "Late filing penalty", formato: "moneda" },
    { clave: "recargo", etiqueta: "Late payment penalty", formato: "moneda" },
    { clave: "interes", etiqueta: "Late payment interest", formato: "moneda" },
    { clave: "conImpuesto", etiqueta: "Total to pay with the PAYE", formato: "moneda" },
  ],
});
