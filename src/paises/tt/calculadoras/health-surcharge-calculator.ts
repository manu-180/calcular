import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_LUNES, REQUIERE_SURCHARGE, semanasDelMes, surchargeSemanal } from "../lib/nomina";

export default definirCalculadora({
  id: "tt.health-surcharge-calculator",
  mercado: "tt",
  concepto: "propio",
  slug: "health-surcharge-calculator",
  estado: "publicado",
  requiere: REQUIERE_SURCHARGE,
  campos: [
    {
      id: "frecuencia",
      tipo: "opcion",
      etiqueta: "How often are you paid?",
      opciones: [
        { valor: "mensual", etiqueta: "Monthly" },
        { valor: "semanal", etiqueta: "Weekly" },
      ],
      porDefecto: "mensual",
    },
    { id: "pago", tipo: "moneda", etiqueta: "Gross pay for the period", min: 0, porDefecto: 8000 },
    { id: "lunes", tipo: "opcion", etiqueta: "Mondays in the pay month", opciones: OPCIONES_LUNES, porDefecto: "4", visibleSi: { frecuencia: ["mensual"] } },
    { id: "exento", tipo: "si-no", etiqueta: "I am under 16, 60 or older, or my only income is a pension", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.pago <= 0) throw new ErrorEntrada("Enter your gross pay.", "pago");
    const mensual = e.frecuencia === "mensual";
    const semana = e.exento ? 0 : surchargeSemanal(e.pago, mensual, v);
    const semanas = mensual ? semanasDelMes(e.lunes ?? "4") : 1;
    const observaciones = e.exento ? ["Health Surcharge is not deducted in your case."] : [];
    return {
      periodo: redondear(semana * semanas),
      semana,
      anual: redondear(semana * 52),
      umbral: mensual ? v["tt.health-surcharge-threshold-monthly"] : v["tt.health-surcharge-threshold-weekly"],
      observaciones,
    };
  },
  resultado: [
    { clave: "periodo", etiqueta: "Health Surcharge for the period", formato: "moneda", destacada: true },
    { clave: "semana", etiqueta: "Weekly rate that applies to you", formato: "moneda" },
    { clave: "anual", etiqueta: "Health Surcharge over 52 weeks", formato: "moneda" },
    { clave: "umbral", etiqueta: "Pay above which the higher rate applies", formato: "moneda" },
  ],
});
