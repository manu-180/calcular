import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "pa.jornada-nocturna",
  mercado: "pa",
  concepto: "propio",
  slug: "jornada-nocturna",
  estado: "publicado",
  requiere: {
    "pa.jornada-diaria": "mapa",
    "pa.jornada-semanal": "mapa",
  },
  campos: [
    {
      id: "tarifaHora",
      tipo: "moneda",
      etiqueta: "Salario por hora de día",
      ayuda: "La tarifa por hora pactada o el salario mínimo por hora de tu actividad.",
      min: 0,
    },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Tu jornada",
      opciones: [
        { valor: "nocturna", etiqueta: "Nocturna (más de tres horas entre las 6 p. m. y las 6 a. m.)" },
        { valor: "mixta", etiqueta: "Mixta (de día y hasta tres horas de noche)" },
      ],
      porDefecto: "nocturna",
    },
    { id: "dias", tipo: "entero", etiqueta: "Jornadas que trabajas por semana", min: 1, max: 6, porDefecto: 6 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias > 6) throw new ErrorEntrada("La semana tiene como máximo seis jornadas: el séptimo día es de descanso.", "dias");
    const horasDiurnas = enMapa(valores["pa.jornada-diaria"], "diurna");
    const horasJornada = enMapa(valores["pa.jornada-diaria"], entrada.jornada);
    const jornada = entrada.tarifaHora * horasDiurnas;
    return {
      horasJornada,
      jornada: redondear(jornada),
      horaEfectiva: redondear(jornada / horasJornada),
      semanal: redondear(jornada * entrada.dias),
      horasSemana: redondear(horasJornada * entrada.dias),
      observaciones: [
        `Por ley, tus ${horasJornada} horas se pagan como ${horasDiurnas} horas de día. Por eso cada hora trabajada vale más que la hora diurna.`,
        "Si trabajas más horas que tu jornada, esas son horas extra con su recargo.",
      ],
    };
  },
  resultado: [
    { clave: "horasJornada", etiqueta: "Horas de tu jornada", formato: "horas" },
    { clave: "jornada", etiqueta: "Pago por jornada", formato: "moneda", destacada: true },
    { clave: "horaEfectiva", etiqueta: "Valor de cada hora que trabajas", formato: "moneda" },
    { clave: "horasSemana", etiqueta: "Horas trabajadas en la semana", formato: "horas" },
    { clave: "semanal", etiqueta: "Pago por semana", formato: "moneda" },
  ],
});
