import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.nhf-calculator",
  mercado: "ng",
  concepto: "propio",
  slug: "nhf-calculator",
  estado: "publicado",
  requiere: {
    "ng.nhf-rate": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary a month", min: 0, porDefecto: 250000 },
    { id: "anios", tipo: "entero", etiqueta: "Years of contributions", min: 1, max: 40, porDefecto: 5 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter your basic salary.", "basico");
    const mensual = redondear(porcentaje(entrada.basico, v["ng.nhf-rate"]));
    return { mensual, anual: redondear(mensual * 12), total: redondear(mensual * 12 * entrada.anios) };
  },
  resultado: [
    { clave: "mensual", etiqueta: "NHF contribution a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "A year", formato: "moneda" },
    { clave: "total", etiqueta: "Over the years entered (before interest)", formato: "moneda" },
  ],
});
