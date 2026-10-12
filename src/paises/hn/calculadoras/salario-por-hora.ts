import { definirCalculadora, enMapa } from "@/motor/calculo";
import { DIAS_MES, salarioDiario } from "../reglas";

const DIAS_SEMANA = 7;

export default definirCalculadora({
  id: "hn.salario-por-hora",
  mercado: "hn",
  concepto: "propio",
  slug: "salario-por-hora",
  estado: "publicado",
  requiere: {
    "hn.jornada-horas": "mapa",
    "hn.recargo-horas-extra": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Su jornada",
      opciones: [
        { valor: "diurna", etiqueta: "De día (entre las 5:00 a. m. y las 7:00 p. m.)" },
        { valor: "mixta", etiqueta: "Mixta (con menos de 3 horas de noche)" },
        { valor: "nocturna", etiqueta: "De noche (entre las 7:00 p. m. y las 5:00 a. m.)" },
      ],
      porDefecto: "diurna",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const horas = enMapa(valores["hn.jornada-horas"], entrada.jornada);
    const diario = salarioDiario(entrada.salario);
    return {
      horasJornada: horas,
      diario: redondear(diario),
      semanal: redondear(diario * DIAS_SEMANA),
      quincenal: redondear((entrada.salario * 15) / DIAS_MES),
      hora: redondear(diario / horas),
      observaciones: [
        "El salario diario es el mensual entre 30, como en el acuerdo de salario mínimo.",
        "La semana de 44 horas de día se paga como 48. Por eso la hora se saca del salario diario entre la jornada.",
      ],
    };
  },
  resultado: [
    { clave: "horasJornada", etiqueta: "Horas de su jornada diaria", formato: "horas" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "semanal", etiqueta: "Salario semanal (7 días)", formato: "moneda" },
    { clave: "quincenal", etiqueta: "Salario quincenal", formato: "moneda" },
    { clave: "hora", etiqueta: "Valor de la hora ordinaria", formato: "moneda", destacada: true },
  ],
});
