import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.feriados",
  h1: "Feriados nacionales de Nicaragua y su pago",
  title: "Feriados en Nicaragua: fechas y cuánto te pagan si trabajás",
  description: "Los feriados nacionales de Nicaragua del año que elijas, con Semana Santa calculada, y cuánto te pagan si trabajás un feriado: recargo del {{ni.recargo-horas-extra}}.",
  intro: [
    "Nicaragua tiene nueve feriados nacionales obligatorios. Se descansan con salario.",
    "Elegí el año para ver las fechas. Si trabajaste algún feriado, poné tu salario y cuántos fueron: te decimos cuánto te tienen que pagar.",
  ],
  comoSeCalcula: [
    "Las fechas fijas salen del artículo 66 del Código del Trabajo. Jueves y Viernes Santo dependen de la Pascua de cada año.",
    "Trabajar un feriado es trabajo extraordinario: se paga tu salario diario más el {{ni.recargo-horas-extra}}.",
    "El salario diario es el mensual dividido entre 30.",
  ],
  ejemplo: ["En 2026, Jueves y Viernes Santo caen el 2 y el 3 de abril. Con un salario de C$9,000, cada feriado trabajado se paga C$600."],
  faq: [
    {
      pregunta: "¿Cuáles son los feriados nacionales en Nicaragua?",
      respuesta: "1 de enero, Jueves y Viernes Santo, 1 de mayo, 19 de julio, 14 y 15 de septiembre, 8 y 25 de diciembre.",
    },
    {
      pregunta: "¿Cómo se paga un feriado trabajado en Nicaragua?",
      respuesta: "Con tu salario de un día más el {{ni.recargo-horas-extra}}, aparte de tu salario del mes.",
    },
    {
      pregunta: "¿Qué pasa si el feriado cae en mi día de descanso?",
      respuesta: "Se compensa. Si lo trabajás, se paga como día extraordinario.",
    },
    {
      pregunta: "¿Los asuetos que decreta el gobierno se pagan?",
      respuesta: "El gobierno puede declarar asuetos con goce de salario o a cuenta de vacaciones. Depende de lo que diga cada decreto.",
    },
    {
      pregunta: "¿Pueden obligarme a trabajar un feriado?",
      respuesta: "Solo en los trabajos que no se pueden interrumpir, como farmacias de turno, servicios esenciales o comercios de alimentos. Se pagan con el recargo.",
    },
  ],
  glosario: [
    { termino: "Feriado nacional", definicion: "Día de descanso obligatorio y pagado para todo el país." },
    { termino: "Asueto", definicion: "Día libre que decreta el gobierno o la costumbre local, como las fiestas de cada municipio." },
  ],
});
