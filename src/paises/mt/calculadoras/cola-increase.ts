import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { euros } from "../lib/malta";

export default definirCalculadora({
  id: "mt.cola-increase",
  mercado: "mt",
  concepto: "propio",
  slug: "cola-increase",
  estado: "publicado",
  requiere: {
    "mt.cola": "numero",
    "mt.minimum-wage": "mapa",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "You work",
      opciones: [
        { valor: "whole-time", etiqueta: "Whole-time (weekly wage)" },
        { valor: "part-time", etiqueta: "Part-time (hourly rate)" },
      ],
      porDefecto: "whole-time",
    },
    { id: "semanal", tipo: "moneda", etiqueta: "Your basic weekly wage last year", min: 0, porDefecto: 400, visibleSi: { tipo: ["whole-time"] } },
    { id: "hora", tipo: "moneda", etiqueta: "Your hourly rate last year", min: 0, porDefecto: 8, visibleSi: { tipo: ["part-time"] } },
    { id: "edad", tipo: "opcion-dato", dato: "mt.minimum-wage", etiqueta: "Your age", porDefecto: "age-18-plus" },
  ],
  calcular(entrada, v, { redondear }) {
    const cola = v["mt.cola"];
    const minimo = enMapa(v["mt.minimum-wage"], entrada.edad);
    const observaciones: string[] = [];
    if (entrada.tipo === "whole-time") {
      const antes = entrada.semanal ?? 0;
      if (antes <= 0) throw new ErrorEntrada("Enter your weekly wage.", "semanal");
      const conCola = redondear(antes + cola);
      const nuevo = Math.max(conCola, minimo);
      if (nuevo > conCola) observaciones.push(`With the increase you would still be under the minimum wage, so your wage goes up to ${euros(minimo)} a week.`);
      return { nuevo, aumento: redondear(nuevo - antes), unidad: "a week", observaciones };
    }
    const antes = entrada.hora ?? 0;
    if (antes <= 0) throw new ErrorEntrada("Enter your hourly rate.", "hora");
    const conCola = redondear(antes + cola / 40);
    const minimoHora = redondear(minimo / 40);
    const nuevo = Math.max(conCola, minimoHora);
    observaciones.push("This uses one fortieth of the weekly increase. If a comparable whole-time colleague or a Wage Regulation Order exists, your increase follows theirs.");
    if (nuevo > conCola) observaciones.push(`With the increase you would still be under the minimum hourly rate, so your rate goes up to ${euros(minimoHora)}.`);
    return { nuevo, aumento: redondear(nuevo - antes), unidad: "an hour", observaciones };
  },
  resultado: [
    { clave: "nuevo", etiqueta: "Your new basic pay", formato: "moneda", destacada: true },
    { clave: "aumento", etiqueta: "Increase", formato: "moneda" },
    { clave: "unidad", etiqueta: "Paid", formato: "texto" },
  ],
});
