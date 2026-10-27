import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lk.fixed-deposit-calculator",
  mercado: "lk",
  concepto: "plazo-fijo",
  slug: "fixed-deposit-calculator",
  estado: "publicado",
  requiere: {
    "lk.wht-interest": "numero",
  },
  campos: [
    { id: "deposito", tipo: "moneda", etiqueta: "Amount you deposit", min: 0, porDefecto: 1000000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Annual interest rate offered by the bank", min: 0, max: 100, porDefecto: 8 },
    { id: "meses", tipo: "entero", etiqueta: "Term in months", min: 1, max: 120, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.deposito <= 0) throw new ErrorEntrada("Enter the amount you deposit.", "deposito");
    const interes = redondear(porcentaje(e.deposito, e.tasa) * (e.meses / 12));
    const retencion = redondear(porcentaje(interes, v["lk.wht-interest"]));
    const neto = redondear(interes - retencion);
    return {
      neto,
      interes,
      retencion,
      alVencimiento: redondear(e.deposito + neto),
      netoMensual: redondear(neto / e.meses),
      tasaNeta: e.tasa * (1 - v["lk.wht-interest"] / 100),
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Interest after tax", formato: "moneda", destacada: true },
    { clave: "interes", etiqueta: "Interest before tax", formato: "moneda" },
    { clave: "retencion", etiqueta: "Advance income tax withheld", formato: "moneda" },
    { clave: "alVencimiento", etiqueta: "Paid back at maturity", formato: "moneda" },
    { clave: "netoMensual", etiqueta: "Interest after tax per month", formato: "moneda" },
    { clave: "tasaNeta", etiqueta: "Annual rate after tax", formato: "porcentaje", decimales: 2 },
  ],
});
