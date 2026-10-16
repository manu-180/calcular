import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { rand } from "../lib/impuestos";

export default definirCalculadora({
  id: "za.minimum-wage",
  mercado: "za",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "za.minimum-wage": "mapa",
    "za.minimum-wage-contract-cleaning": "mapa",
    "za.weeks-per-month": "numero",
  },
  campos: [
    {
      id: "categoria",
      tipo: "opcion",
      etiqueta: "Type of work",
      opciones: [
        { valor: "general", etiqueta: "Most workers" },
        { valor: "domestic", etiqueta: "Domestic worker" },
        { valor: "farm", etiqueta: "Farm worker" },
        { valor: "epwp", etiqueta: "Expanded Public Works Programme" },
        { valor: "area-a", etiqueta: "Contract cleaning, Area A (main metros)" },
        { valor: "area-c", etiqueta: "Contract cleaning, rest of the country (not KZN)" },
      ],
      porDefecto: "general",
    },
    { id: "horas", tipo: "numero", etiqueta: "Ordinary hours a week", min: 1, max: 45, porDefecto: 45 },
    { id: "pago", tipo: "moneda", etiqueta: "What you are paid an hour (optional)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0 || entrada.horas > 45) throw new ErrorEntrada("Ordinary hours are between 1 and 45 a week.", "horas");
    const limpieza = entrada.categoria === "area-a" || entrada.categoria === "area-c";
    const hora = limpieza ? enMapa(v["za.minimum-wage-contract-cleaning"], entrada.categoria) : enMapa(v["za.minimum-wage"], entrada.categoria);
    const semana = redondear(hora * entrada.horas);
    const mes = redondear(semana * v["za.weeks-per-month"]);
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (entrada.pago !== null) {
      diferencia = redondear(Math.max(0, hora - entrada.pago));
      observaciones.push(
        entrada.pago >= hora
          ? `Your pay of ${rand(entrada.pago)} an hour meets the minimum.`
          : `Your pay is ${rand(diferencia)} an hour below the minimum, about ${rand(redondear(diferencia * entrada.horas * v["za.weeks-per-month"]))} a month.`,
      );
    }
    return { hora, semana, mes, diferencia, observaciones };
  },
  resultado: [
    { clave: "hora", etiqueta: "Minimum wage an hour", formato: "moneda", destacada: true },
    { clave: "semana", etiqueta: "Minimum for a week", formato: "moneda" },
    { clave: "mes", etiqueta: "Minimum for a month", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Shortfall an hour", formato: "moneda" },
  ],
});
