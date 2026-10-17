import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "nz.public-holiday-pay",
  mercado: "nz",
  concepto: "propio",
  slug: "public-holiday-pay",
  estado: "publicado",
  requiere: {
    "nz.public-holiday-pay-factor": "numero",
    "nz.public-holidays-max": "numero",
  },
  campos: [
    { id: "tarifa", tipo: "moneda", etiqueta: "Your hourly rate", min: 0, porDefecto: 30 },
    { id: "horas", tipo: "numero", etiqueta: "Hours you work on the public holiday", min: 0, max: 24, porDefecto: 8 },
    { id: "diaLaboral", tipo: "si-no", etiqueta: "It's a day you would normally work", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.tarifa <= 0) throw new ErrorEntrada("Enter your hourly rate.", "tarifa");
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter the hours you work on the day.", "horas");
    const factor = v["nz.public-holiday-pay-factor"];
    const normal = redondear(entrada.tarifa * entrada.horas);
    const pago = redondear(entrada.tarifa * entrada.horas * factor);
    return {
      pago,
      normal,
      extra: redondear(pago - normal),
      factor,
      alternativo: entrada.diaLaboral ? "Yes, one paid day off later" : "No",
      observaciones: entrada.diaLaboral
        ? ["You also get an alternative holiday (a day in lieu) because the public holiday fell on a day you would normally work."]
        : [],
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Minimum pay for the hours you work", formato: "moneda", destacada: true },
    { clave: "normal", etiqueta: "Your normal pay for those hours", formato: "moneda" },
    { clave: "extra", etiqueta: "Extra for working the public holiday", formato: "moneda" },
    { clave: "factor", etiqueta: "Rate", formato: "numero", decimales: 1, ayuda: "Times your normal rate." },
    { clave: "alternativo", etiqueta: "Alternative holiday", formato: "texto" },
  ],
});
