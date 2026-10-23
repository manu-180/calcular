import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Precio por cada KSh 100 = 100 / (1 + tasa × días / 36500), base 365 como en el ejemplo de la
// FAQ del CBK. La retención se cobra sobre el descuento y se suma a lo que paga el inversor.
export default definirCalculadora({
  id: "ke.treasury-bill-calculator",
  mercado: "ke",
  concepto: "plazo-fijo",
  slug: "treasury-bill-calculator",
  estado: "publicado",
  requiere: {
    "ke.tbill-wht": "numero",
  },
  campos: [
    { id: "nominal", tipo: "moneda", etiqueta: "Face value you want at maturity", min: 0, porDefecto: 100000 },
    {
      id: "dias",
      tipo: "opcion",
      etiqueta: "Tenor",
      opciones: [
        { valor: "91", etiqueta: "91 days" },
        { valor: "182", etiqueta: "182 days" },
        { valor: "364", etiqueta: "364 days" },
      ],
      porDefecto: "91",
    },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Interest rate (average rate of the last auction)", min: 0, max: 50, porDefecto: 9 },
    { id: "exento", tipo: "si-no", etiqueta: "You have a tax exemption certificate from KRA" },
  ],
  calcular(e, v, { redondear }) {
    if (e.nominal <= 0) throw new ErrorEntrada("Enter the face value.", "nominal");
    if (e.tasa <= 0) throw new ErrorEntrada("Enter an interest rate greater than zero.", "tasa");
    const dias = Number(e.dias);
    const precio100 = 100 / (1 + (e.tasa * dias) / 36500);
    const costo = redondear((e.nominal * precio100) / 100);
    const descuento = redondear(e.nominal - costo);
    const impuesto = e.exento ? 0 : redondear(porcentaje(descuento, v["ke.tbill-wht"]));
    const pago = redondear(costo + impuesto);
    const ganancia = redondear(descuento - impuesto);
    return {
      pago,
      ganancia,
      precio100,
      costo,
      descuento,
      impuesto,
      rendimientoNeto: (ganancia / pago) * (365 / dias) * 100,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Amount you pay CBK", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Your return after tax", formato: "moneda" },
    { clave: "precio100", etiqueta: "Price per KSh 100", formato: "numero", decimales: 4 },
    { clave: "costo", etiqueta: "Price of the bill", formato: "moneda" },
    { clave: "descuento", etiqueta: "Interest (discount) before tax", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Withholding tax", formato: "moneda" },
    { clave: "rendimientoNeto", etiqueta: "Yearly return after tax", formato: "porcentaje", decimales: 2 },
  ],
});
