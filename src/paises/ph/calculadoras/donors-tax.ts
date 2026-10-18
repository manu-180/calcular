import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ph.donors-tax",
  mercado: "ph",
  concepto: "propio",
  slug: "donors-tax",
  estado: "publicado",
  requiere: {
    "ph.donors-tax-rate": "numero",
    "ph.donors-tax-exemption": "numero",
  },
  campos: [
    { id: "regalo", tipo: "moneda", etiqueta: "Value of this gift", min: 0, porDefecto: 500000 },
    { id: "previos", tipo: "moneda", etiqueta: "Gifts you already made this calendar year", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.regalo <= 0) throw new ErrorEntrada("Enter the value of the gift.", "regalo");
    const exento = v["ph.donors-tax-exemption"];
    const tasa = v["ph.donors-tax-rate"];
    const total = entrada.previos + entrada.regalo;
    const impuestoTotal = porcentaje(Math.max(0, total - exento), tasa);
    const impuestoPrevio = porcentaje(Math.max(0, entrada.previos - exento), tasa);
    const impuesto = redondear(impuestoTotal - impuestoPrevio);
    return {
      impuesto,
      acumulado: redondear(total),
      gravado: redondear(Math.max(0, total - exento)),
      exentoRestante: redondear(Math.max(0, exento - total)),
      impuestoAnual: redondear(impuestoTotal),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Donor's tax on this gift", formato: "moneda", destacada: true },
    { clave: "acumulado", etiqueta: "Total gifts this year", formato: "moneda" },
    { clave: "gravado", etiqueta: "Gifts above the yearly exemption", formato: "moneda" },
    { clave: "exentoRestante", etiqueta: "Exemption left this year", formato: "moneda", ocultarSiCero: true },
    { clave: "impuestoAnual", etiqueta: "Donor's tax for the year so far", formato: "moneda" },
  ],
});
