import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.salario-diario",
  h1: "Calculadora de salario diario y por hora",
  title: "Salario diario y por hora en Guatemala: calculadora",
  description:
    "Convierta su salario mensual en salario por quincena, por semana, por día y por hora según su jornada diurna, mixta o nocturna.",
  intro: [
    "El salario diario es la base de muchas cuentas: vacaciones, horas extra, permisos y liquidaciones. Se obtiene dividiendo el salario mensual entre 30.",
    "El salario por hora depende de su jornada: {{gt.jornada-horas[diurna]}} en la diurna, {{gt.jornada-horas[mixta]}} en la mixta y {{gt.jornada-horas[nocturna]}} en la nocturna.",
  ],
  comoSeCalcula: [
    "Por día = salario mensual / 30.",
    "Por semana = salario diario × 7. Por quincena = salario mensual / 2.",
    "Por hora = salario diario / horas de su jornada.",
  ],
  ejemplo: ["Con Q4,500 al mes en jornada diurna: Q150 por día y Q18.75 por hora."],
  faq: [
    {
      pregunta: "¿Por qué se divide entre 30 y no entre los días hábiles?",
      respuesta: "Porque el salario mensual ya incluye los días de descanso y de asueto. En las liquidaciones se usa el divisor 30.",
    },
    {
      pregunta: "¿La bonificación incentivo entra en el salario diario?",
      respuesta: "No. La bonificación incentivo no es salario para estas cuentas. Escriba solo su salario.",
    },
    {
      pregunta: "¿Cuál es la jornada diurna, mixta y nocturna?",
      respuesta: "La diurna es entre las 6 y las 18 horas. La nocturna, entre las 18 y las 6 horas. La mixta abarca horas de las dos, pero si tiene cuatro horas o más de noche se considera nocturna.",
    },
  ],
  glosario: [{ termino: "Jornada", definicion: "El tiempo que trabaja en un día. Su duración máxima cambia si es diurna, mixta o nocturna." }],
});
