import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.vacaciones",
  h1: "Calculadora de días de vacaciones",
  title: "Días de vacaciones: cuántos te corresponden y su importe",
  description:
    "Calcula los días de vacaciones que llevas generados este año, los que te quedan y cuánto te tienen que pagar si terminas el contrato sin disfrutarlos.",
  intro: [
    "En España tienes derecho a {{es.vacaciones-dias}} al año como mínimo, aunque tu convenio puede darte más. Se generan poco a poco a lo largo del año.",
    "Si empiezas o dejas la empresa a mitad de año, te corresponde la parte proporcional. Esta calculadora te dice cuántos días llevas y cuánto valen.",
  ],
  comoSeCalcula: [
    "Cuenta los días del periodo trabajado este año, incluidos el primero y el último.",
    "Multiplica los días de vacaciones anuales ({{es.vacaciones-dias}} como mínimo) por esos días y divide entre los días del año.",
    "Resta los días que ya disfrutaste. Lo que queda son tus días pendientes.",
    "Si el contrato termina, cada día pendiente se paga a tu salario mensual dividido entre 30.",
  ],
  ejemplo: [
    "Si trabajas del 1 de enero al 30 de junio de 2026 llevas 14,88 días generados. Con 5 disfrutados te quedan 9,88.",
    "Con 25.000 euros brutos en 14 pagas, cada día vale 59,52 euros y te tendrían que pagar 588,06 euros si te vas ese día.",
  ],
  faq: [
    {
      pregunta: "¿Son 30 días naturales o 22 laborables?",
      respuesta: "La ley habla de {{es.vacaciones-dias}}. Muchos convenios los pasan a días laborables, que suelen ser 22 o 23 hábiles. Lo importante es que el total no sea menor que el mínimo legal.",
    },
    {
      pregunta: "¿Me pueden pagar las vacaciones en vez de disfrutarlas?",
      respuesta: "No. Las vacaciones no se pueden cambiar por dinero mientras sigues en la empresa. Solo se pagan las que te quedan cuando termina el contrato, en el finiquito.",
    },
    {
      pregunta: "¿Se generan vacaciones estando de baja?",
      respuesta: "Sí. El tiempo de baja por incapacidad temporal cuenta para generar vacaciones.",
    },
  ],
  glosario: [
    { termino: "Días naturales", definicion: "Todos los días del calendario, incluidos fines de semana y festivos." },
    { termino: "Finiquito", definicion: "Documento con lo que te deben al terminar el contrato, incluidas las vacaciones no disfrutadas." },
  ],
});
