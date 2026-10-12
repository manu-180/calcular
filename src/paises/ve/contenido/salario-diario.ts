import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.salario-diario",
  h1: "Calculadora de salario diario y por hora en Venezuela",
  title: "Salario diario y por hora en Venezuela",
  description:
    "Pasa tu salario mensual a diario, por hora, semanal y quincenal. El diario es el mensual entre {{ve.dias-mes-salario}} y la hora depende de tu jornada.",
  intro: [
    "En Venezuela el salario diario es el mensual dividido entre {{ve.dias-mes-salario}}. Es la base para calcular vacaciones, utilidades, bono vacacional y horas extra.",
    "La hora sale de dividir el diario entre las horas de tu jornada: {{ve.jornada-diurna-horas}} la diurna, {{ve.jornada-mixta-horas}} la mixta y {{ve.jornada-nocturna-horas}} la nocturna.",
  ],
  comoSeCalcula: [
    "Salario diario: salario mensual entre {{ve.dias-mes-salario}}.",
    "Valor de la hora: salario diario entre las horas de tu jornada.",
    "Semana: salario diario por 7. Quincena: la mitad del mensual.",
  ],
  ejemplo: ["Con $240 al mes en jornada diurna: $8 diarios, $1 la hora, $56 la semana y $120 la quincena."],
  faq: [
    {
      pregunta: "¿Cómo saco mi salario diario?",
      respuesta: "Divide tu salario mensual entre {{ve.dias-mes-salario}}, aunque el mes tenga 31 o 28 días. Así lo cuenta la norma del salario mínimo.",
    },
    {
      pregunta: "¿Cuántas horas tiene la jornada en Venezuela?",
      respuesta: "La diurna, hasta {{ve.jornada-diurna-horas}} diarias y 40 semanales. La mixta, hasta {{ve.jornada-mixta-horas}}. La nocturna, hasta {{ve.jornada-nocturna-horas}}. Trabajas cinco días y tienes dos de descanso.",
    },
    {
      pregunta: "¿El cestaticket entra en el salario diario?",
      respuesta: "No. El cestaticket y el bono de guerra económica no son salario. Calcula con la parte salarial de lo que cobras.",
    },
  ],
  glosario: [
    { termino: "Salario diario", definicion: "El salario mensual dividido entre 30." },
    { termino: "Jornada", definicion: "Las horas de trabajo de un día. Puede ser diurna, mixta o nocturna (art. 173 de la LOTTT)." },
  ],
});
