import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ca.ei-benefits-calculator",
  mercado: "ca",
  concepto: "propio",
  slug: "ei-benefits-calculator",
  estado: "publicado",
  requiere: {
    "ca.ei-benefit-rate": "numero",
    "ca.ei-max-weekly-benefit": "numero",
  },
  campos: [
    {
      id: "semanal",
      tipo: "moneda",
      etiqueta: "Average weekly insurable earnings",
      min: 0,
      porDefecto: 1000,
      ayuda: "Your gross insurable pay in your best weeks, divided by the number of those weeks.",
    },
    { id: "semanas", tipo: "entero", etiqueta: "Weeks of benefits you expect", min: 1, max: 52, porDefecto: 20 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter your average weekly earnings.", "semanal");
    const tasa = v["ca.ei-benefit-rate"];
    const maximoSemanal = v["ca.ei-max-weekly-benefit"];
    const calculado = porcentaje(entrada.semanal, tasa);
    const semanal = redondear(Math.min(calculado, maximoSemanal));
    return {
      semanal,
      quincenal: redondear(semanal * 2),
      total: redondear(semanal * entrada.semanas),
      tasa,
      maximoSemanal,
      observaciones: calculado > maximoSemanal ? ["Your earnings are above the insurable maximum, so you get the weekly maximum."] : [],
    };
  },
  resultado: [
    { clave: "semanal", etiqueta: "Weekly EI benefit before tax", formato: "moneda", destacada: true },
    { clave: "quincenal", etiqueta: "Two weeks of benefits", formato: "moneda" },
    { clave: "total", etiqueta: "Total for the weeks you entered", formato: "moneda" },
    { clave: "tasa", etiqueta: "Benefit rate", formato: "porcentaje", decimales: 0 },
    { clave: "maximoSemanal", etiqueta: "Weekly maximum in 2026", formato: "moneda" },
  ],
});
