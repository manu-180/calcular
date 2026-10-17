import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPOS_PROMEDIO, salarioDiarioPromedio } from "../lib/salarios";

export default definirCalculadora({
  id: "hk.holiday-pay",
  mercado: "hk",
  concepto: "propio",
  slug: "holiday-pay",
  estado: "publicado",
  requiere: {
    "hk.statutory-holidays": "numero",
  },
  campos: [
    { id: "feriados", tipo: "entero", etiqueta: "Statutory holidays to work out", min: 1, max: 20, porDefecto: 1 },
    ...CAMPOS_PROMEDIO,
    { id: "tresMeses", tipo: "si-no", etiqueta: "You've been on a continuous contract for at least 3 months before the holiday", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.feriados < 1) throw new ErrorEntrada("Enter at least one holiday.", "feriados");
    const diario = salarioDiarioPromedio(entrada);
    const observaciones: string[] = [];
    if (!entrada.tresMeses) observaciones.push("You still get the day off, but holiday pay starts after 3 months on a continuous contract.");
    const porDia = entrada.tresMeses ? redondear(diario) : 0;
    return {
      porDia,
      total: redondear(entrada.tresMeses ? diario * entrada.feriados : 0),
      diario: redondear(diario),
      anio: v["hk.statutory-holidays"],
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Holiday pay", formato: "moneda", destacada: true },
    { clave: "porDia", etiqueta: "Pay for each holiday", formato: "moneda" },
    { clave: "diario", etiqueta: "Average daily wages", formato: "moneda" },
    { clave: "anio", etiqueta: "Statutory holidays this year", formato: "dias" },
  ],
});
