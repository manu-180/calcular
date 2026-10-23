import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ca.quebec-overtime",
  mercado: "ca",
  concepto: "propio",
  slug: "quebec-overtime",
  estado: "borrador",
  requiere: {
    "ca.qc-overtime": "mapa",
  },
  campos: [
    { id: "tasaHora", tipo: "moneda", etiqueta: "Your usual hourly wage", min: 0, porDefecto: 25 },
    { id: "horas", tipo: "numero", etiqueta: "Hours worked in the week", min: 0, max: 100, porDefecto: 45 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.tasaHora <= 0) throw new ErrorEntrada("Enter your hourly wage.", "tasaHora");
    const reglas = v["ca.qc-overtime"];
    const extra = Math.max(0, entrada.horas - reglas.hours);
    const normales = entrada.horas - extra;
    const tasaExtra = entrada.tasaHora + porcentaje(entrada.tasaHora, reglas.premium);
    const pagoNormal = redondear(normales * entrada.tasaHora);
    const pagoExtra = redondear(extra * tasaExtra);
    return {
      total: redondear(pagoNormal + pagoExtra),
      pagoNormal,
      pagoExtra,
      extra,
      tasaExtra: redondear(tasaExtra),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Pay for the week", formato: "moneda", destacada: true },
    { clave: "pagoNormal", etiqueta: "Pay for the regular hours", formato: "moneda" },
    { clave: "pagoExtra", etiqueta: "Overtime pay", formato: "moneda" },
    { clave: "extra", etiqueta: "Overtime hours", formato: "horas" },
    { clave: "tasaExtra", etiqueta: "Overtime hourly rate", formato: "moneda" },
  ],
});
