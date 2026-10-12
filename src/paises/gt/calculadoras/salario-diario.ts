import { definirCalculadora, enMapa } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "gt.salario-diario",
  mercado: "gt",
  concepto: "propio",
  slug: "salario-diario",
  estado: "publicado",
  requiere: {
    "gt.jornada-horas": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "jornada", tipo: "opcion-dato", dato: "gt.jornada-horas", etiqueta: "Su jornada", porDefecto: "diurna" },
  ],
  calcular(entrada, valores, { redondear }) {
    const horas = enMapa(valores["gt.jornada-horas"], entrada.jornada);
    const diario = redondear(entrada.salario / DIAS_MES);
    return {
      quincenal: redondear(entrada.salario / 2),
      semanal: redondear(diario * 7),
      diario,
      hora: redondear(entrada.salario / DIAS_MES / horas),
      horas,
      observaciones: ["El salario diario sale de dividir el mensual entre 30, que es como se calcula en las liquidaciones."],
    };
  },
  resultado: [
    { clave: "quincenal", etiqueta: "Por quincena", formato: "moneda" },
    { clave: "semanal", etiqueta: "Por semana", formato: "moneda" },
    { clave: "diario", etiqueta: "Por día", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Por hora", formato: "moneda" },
    { clave: "horas", etiqueta: "Horas de su jornada", formato: "horas" },
  ],
});
