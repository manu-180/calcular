import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "es.salario-minimo",
  mercado: "es",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "es.smi-mensual": "numero",
    "es.smi-diario": "numero",
    "es.smi-anual": "numero",
    "es.smi-hora-hogar": "numero",
    "es.smi-eventuales": "numero",
    "es.jornada-maxima-semanal": "numero",
  },
  campos: [
    {
      id: "horas",
      tipo: "numero",
      etiqueta: "Horas de trabajo a la semana",
      min: 0,
      porDefecto: 40,
      ayuda: "Si trabajas a tiempo parcial, el mínimo se cobra en proporción a tu jornada.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const completa = valores["es.jornada-maxima-semanal"];
    if (entrada.horas > completa) throw new ErrorEntrada(`La jornada ordinaria no puede pasar de ${completa} horas semanales de promedio.`, "horas");
    const proporcion = entrada.horas / completa;
    const anual = redondear(valores["es.smi-anual"] * proporcion);
    return {
      mensual14: redondear(valores["es.smi-mensual"] * proporcion),
      mensual12: redondear(anual / 12),
      anual,
      diario: redondear(valores["es.smi-diario"] * proporcion),
      proporcion: redondear(proporcion * 100),
      eventuales: valores["es.smi-eventuales"],
      horaHogar: valores["es.smi-hora-hogar"],
    };
  },
  resultado: [
    { clave: "mensual14", etiqueta: "Salario mínimo al mes (14 pagas)", formato: "moneda", destacada: true },
    { clave: "mensual12", etiqueta: "Al mes con las pagas extra prorrateadas (12 pagas)", formato: "moneda" },
    { clave: "anual", etiqueta: "Salario mínimo al año", formato: "moneda" },
    { clave: "diario", etiqueta: "Salario mínimo diario", formato: "moneda" },
    { clave: "proporcion", etiqueta: "Tu jornada sobre la completa", formato: "porcentaje" },
    { clave: "eventuales", etiqueta: "Eventuales y temporeros de menos de 120 días, por jornada", formato: "moneda" },
    { clave: "horaHogar", etiqueta: "Empleadas de hogar por horas, por hora trabajada", formato: "moneda" },
  ],
});
