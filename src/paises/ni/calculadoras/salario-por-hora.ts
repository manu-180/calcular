import { definirCalculadora, enMapa } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

// Días que se trabajan por semana con una jornada ordinaria completa: seis, más el séptimo de descanso.
const DIAS_SEMANA_LABORAL = 6;

export default definirCalculadora({
  id: "ni.salario-por-hora",
  mercado: "ni",
  concepto: "propio",
  slug: "salario-por-hora",
  estado: "publicado",
  requiere: {
    "ni.jornada-diaria": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "jornada", tipo: "opcion-dato", dato: "ni.jornada-diaria", etiqueta: "Tu jornada", porDefecto: "diurna" },
  ],
  calcular(entrada, valores, { redondear }) {
    const horas = enMapa(valores["ni.jornada-diaria"], entrada.jornada);
    const diario = redondear(entrada.salario / DIAS_MES);
    return {
      horas,
      horasSemana: horas * DIAS_SEMANA_LABORAL,
      diario,
      semanal: redondear(diario * 7),
      porHora: redondear(entrada.salario / DIAS_MES / horas),
      observaciones: [
        "El salario diario es el mensual dividido entre 30, como se usa en las planillas. El séptimo día ya está pagado dentro del mes.",
        "La hora sale de dividir el salario diario entre las horas máximas de tu jornada.",
      ],
    };
  },
  resultado: [
    { clave: "horas", etiqueta: "Horas de tu jornada por día", formato: "horas" },
    { clave: "horasSemana", etiqueta: "Horas máximas por semana", formato: "horas" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "semanal", etiqueta: "Salario semanal", formato: "moneda" },
    { clave: "porHora", etiqueta: "Salario por hora", formato: "moneda", destacada: true },
  ],
});
