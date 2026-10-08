import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.vacaciones",
  h1: "Calculadora de vacaciones en República Dominicana",
  title: "Vacaciones en RD: cuántos días te tocan y cuánto cobras",
  description:
    "Calcula tus días de vacaciones en RD ({{do.vacaciones-dias[uno-a-cinco-anios]}} o {{do.vacaciones-dias[cinco-anios-o-mas]}} según tu antigüedad) y cuánto te pagan, también si aún no cumples un año.",
  intro: [
    "En República Dominicana te tocan {{do.vacaciones-dias[uno-a-cinco-anios]}} laborables de vacaciones por año de 1 a 5 años de trabajo, y {{do.vacaciones-dias[cinco-anios-o-mas]}} desde los 5 años. Cada día se paga con tu salario mensual dividido entre {{do.divisor-salario-diario}}.",
    "Si todavía no cumples un año, igual te tocan vacaciones proporcionales desde los 5 meses.",
  ],
  comoSeCalcula: [
    "De 1 a 5 años de trabajo: {{do.vacaciones-dias[uno-a-cinco-anios]}} laborables por año.",
    "Desde los 5 años: {{do.vacaciones-dias[cinco-anios-o-mas]}} laborables por año.",
    "Con menos de un año: {{do.vacaciones-proporcionales[5]}} con más de 5 meses, y un día más por cada mes, hasta {{do.vacaciones-proporcionales[11]}} con más de 11 meses.",
    "Cada día se paga con tu salario mensual dividido entre {{do.divisor-salario-diario}}.",
  ],
  ejemplo: [
    "Con 3 años en la empresa y RD$35,000 al mes te tocan 14 días. Cada día vale RD$1,468.74, así que cobras RD$20,562.36.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de vacaciones me tocan en RD?",
      respuesta: "{{do.vacaciones-dias[uno-a-cinco-anios]}} laborables por año hasta los 5 años de trabajo y {{do.vacaciones-dias[cinco-anios-o-mas]}} desde los 5. Con menos de un año, desde {{do.vacaciones-proporcionales[5]}} si pasaste los 5 meses.",
    },
    {
      pregunta: "¿Cómo se calcula el pago de las vacaciones?",
      respuesta: "Divides tu salario mensual entre {{do.divisor-salario-diario}} y lo multiplicas por tus días de vacaciones. Con RD$35,000 y 14 días, cobras RD$20,562.36.",
    },
    {
      pregunta: "¿Cuándo me tienen que pagar las vacaciones?",
      respuesta: "El día antes de que empiecen, junto con el salario que hayas ganado hasta esa fecha.",
    },
    {
      pregunta: "¿Puedo dividir mis vacaciones?",
      respuesta: "Sí, si lo acuerdas con tu empleador. Igual tienes que tomar por lo menos una semana seguida. Los menores de edad no pueden dividirlas.",
    },
    {
      pregunta: "¿Me pagan las vacaciones si me voy de la empresa?",
      respuesta: "Sí. Las que no tomaste se pagan en dinero cuando termina el contrato. Inclúyelas en la calculadora de prestaciones laborales.",
    },
    {
      pregunta: "¿Puedo cambiar mis vacaciones por dinero y seguir trabajando?",
      respuesta: "No. Mientras sigues en la empresa, las vacaciones se toman. Solo se pagan en dinero al terminar el contrato.",
    },
  ],
  glosario: [
    { termino: "Días laborables", definicion: "Los días en que normalmente trabajas. No cuentan los de descanso." },
    { termino: "Vacaciones proporcionales", definicion: "Las que corresponden por el tiempo trabajado cuando todavía no cumples un año." },
  ],
});
