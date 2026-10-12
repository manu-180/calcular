import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "cr.licencia-de-paternidad",
  mercado: "cr",
  concepto: "propio",
  slug: "licencia-de-paternidad",
  estado: "publicado",
  requiere: {
    "cr.paternidad-dias-semana": "numero",
    "cr.paternidad-semanas": "numero",
  },
  campos: [{ id: "fechaNacimiento", tipo: "fecha", etiqueta: "Fecha de nacimiento", porDefecto: "hoy" }],
  calcular(entrada, valores) {
    const semanas = valores["cr.paternidad-semanas"];
    return {
      diasPorSemana: valores["cr.paternidad-dias-semana"],
      semanas,
      totalDias: valores["cr.paternidad-dias-semana"] * semanas,
      inicio: entrada.fechaNacimiento,
      fin: sumarDias(entrada.fechaNacimiento, semanas * 7 - 1),
      observaciones: [
        "También le corresponde a la madre no gestante en una familia de dos madres (Sala Constitucional, resolución 2790 de 2025).",
      ],
    };
  },
  resultado: [
    { clave: "diasPorSemana", etiqueta: "Días libres por semana", formato: "dias" },
    { clave: "semanas", etiqueta: "Semanas con licencia", formato: "numero" },
    { clave: "totalDias", etiqueta: "Total de días de licencia", formato: "dias", destacada: true },
    { clave: "inicio", etiqueta: "Desde", formato: "fecha" },
    { clave: "fin", etiqueta: "Hasta", formato: "fecha" },
  ],
});
