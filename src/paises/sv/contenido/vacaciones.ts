import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.vacaciones",
  h1: "Calculadora de vacaciones en El Salvador",
  title: "Vacaciones en El Salvador: calcule su pago con el 30 %",
  description:
    "Calcule el pago de sus vacaciones: {{sv.vacaciones-dias}} de salario más un recargo del {{sv.vacaciones-recargo}}. También las proporcionales al terminar el contrato.",
  intro: [
    "Después de un año de trabajo continuo con el mismo patrono tiene derecho a vacaciones pagadas. Le pagan el salario de esos días y un recargo encima.",
    "Ponga su salario mensual. Si su contrato terminó antes del año, elija las proporcionales e indique los días trabajados.",
  ],
  comoSeCalcula: [
    "Se saca su salario diario: el salario mensual dividido por 30.",
    "Se multiplica por {{sv.vacaciones-dias}}. A eso se le suma un recargo del {{sv.vacaciones-recargo}}.",
    "Las proporcionales son la misma cuenta por los días trabajados desde su último aniversario, divididos por 365.",
  ],
  ejemplo: ["Con un salario de $600, su salario diario es $20. Los 15 días valen $300 y el recargo $90: recibe $390."],
  faq: [
    {
      pregunta: "¿Cuándo me pagan las vacaciones?",
      respuesta: "Justo antes de que empiecen. El patrono le tiene que avisar la fecha con al menos {{sv.vacaciones-aviso}} de anticipación.",
    },
    {
      pregunta: "¿Qué necesito para tener vacaciones?",
      respuesta: "Un año de trabajo continuo con el mismo patrono y al menos {{sv.vacaciones-dias-trabajados-minimos}} trabajados en ese año.",
    },
    {
      pregunta: "¿Me pagan vacaciones si me voy antes del año?",
      respuesta: "Sí, la parte proporcional, si lo despiden sin causa o si renuncia. Si ya había cumplido el año, le pagan las vacaciones completas aunque el contrato termine.",
    },
    {
      pregunta: "¿Los asuetos alargan las vacaciones?",
      respuesta: "No. Los días de asueto y de descanso semanal que caen dentro de las vacaciones no las alargan, pero las vacaciones no pueden empezar en esos días.",
    },
  ],
  glosario: [
    { termino: "Recargo de vacaciones", definicion: "El porcentaje extra que se suma al salario de los días de vacaciones." },
    { termino: "Vacaciones proporcionales", definicion: "La parte de las vacaciones que corresponde por el tiempo trabajado antes de cumplir el año." },
  ],
});
