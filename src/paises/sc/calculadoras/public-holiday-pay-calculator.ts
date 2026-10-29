import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.public-holiday-pay-calculator",
  mercado: "sc",
  concepto: "propio",
  slug: "public-holiday-pay-calculator",
  estado: "publicado",
  requiere: { "sc.holiday-pay-factor": "numero" },
  campos: [
    { id: "pagaDia", tipo: "moneda", etiqueta: "Your pay for one normal working day", min: 0, porDefecto: 800 },
    { id: "dias", tipo: "entero", etiqueta: "Holidays you worked", min: 1, max: 31, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.pagaDia <= 0) throw new ErrorEntrada("Enter your pay for one normal working day.", "pagaDia");
    const factor = v["sc.holiday-pay-factor"];
    const total = redondear(e.pagaDia * factor * e.dias);
    return {
      total,
      extra: redondear(total - e.pagaDia * e.dias),
      observaciones: ["Your employer can give you an alternative holiday instead of double pay. The choice is the employer's."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Pay due for the holidays you worked", formato: "moneda", destacada: true },
    { clave: "extra", etiqueta: "Amount above a normal day's pay", formato: "moneda" },
  ],
});
