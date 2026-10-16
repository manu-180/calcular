import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "za.notice-period",
  mercado: "za",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "za.notice-weeks": "mapa",
    "za.weeks-per-month": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months with your employer", min: 0, max: 600, porDefecto: 8 },
    { id: "domestico", tipo: "si-no", etiqueta: "You are a farm or domestic worker", porDefecto: false },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary (optional, for pay instead of notice)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.meses < 0) throw new ErrorEntrada("Months cannot be negative.", "meses");
    const m = v["za.notice-weeks"];
    let clave = "up-to-6-months";
    if (entrada.meses >= 12) clave = "1-year-or-more";
    else if (entrada.meses > 6) clave = entrada.domestico ? "farm-domestic-over-6-months" : "6-to-12-months";
    const semanas = enMapa(m, clave);
    const pago = entrada.salario === null ? null : redondear((entrada.salario / v["za.weeks-per-month"]) * semanas);
    return {
      semanas,
      pago,
      observaciones: ["This is the legal minimum. Your contract can give a longer notice period, but you cannot be required to give more notice than your employer must give you."],
    };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Minimum notice (weeks)", formato: "numero", decimales: 0, destacada: true },
    { clave: "pago", etiqueta: "Pay instead of notice", formato: "moneda" },
  ],
});
