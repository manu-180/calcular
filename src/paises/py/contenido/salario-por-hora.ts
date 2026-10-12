import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.salario-por-hora",
  h1: "Calculadora de salario por hora y por día",
  title: "Salario por hora y por día en Paraguay: calculalo",
  description: "Pasá tu salario mensual a salario diario, jornal y valor de la hora, con las reglas del Ministerio de Trabajo (divisores {{py.divisor-salario-diario}} y {{py.divisor-jornal}}).",
  intro: [
    "Para saber cuánto vale tu hora o tu día, el salario mensual se divide según cómo cobrás: por mes (mensualero) o por día trabajado (jornalero).",
    "Con estos valores se calculan las horas extra, las vacaciones y la indemnización.",
  ],
  comoSeCalcula: [
    "Si cobrás por mes, tu salario diario es el mensual dividido {{py.divisor-salario-diario}}. Incluye los días de descanso.",
    "Si cobrás por jornal, el jornal es el mensual dividido {{py.divisor-jornal}}. Son solo los días trabajados.",
    "La hora es el diario dividido {{py.horas-jornada-diurna}} si trabajás de día, o {{py.horas-jornada-nocturna}} si trabajás de noche.",
  ],
  ejemplo: ["Con el salario mínimo, el diario del mensualero es {{py.minimos[diario]}}, la hora {{py.minimos[hora]}} y el jornal {{py.minimos[jornal]}}."],
  faq: [
    {
      pregunta: "¿Por qué se divide por 30 y no por 26?",
      respuesta: "El mensualero cobra también los domingos y feriados, así que su salario se reparte en {{py.divisor-salario-diario}}. El jornalero cobra solo los días que trabaja, y su jornal sale de dividir por {{py.divisor-jornal}}.",
    },
    {
      pregunta: "¿Cuánto vale la hora con el salario mínimo?",
      respuesta: "{{py.minimos[hora]}} de día y {{py.minimos[hora-nocturna]}} de noche, para quien cobra por mes.",
    },
    {
      pregunta: "¿Cuántas horas tiene la jornada?",
      respuesta: "La diurna, {{py.horas-jornada-diurna}} por día y 48 por semana. La nocturna, {{py.horas-jornada-nocturna}} por día y 42 por semana.",
    },
  ],
  glosario: [
    { termino: "Mensualero", definicion: "Quien cobra un salario por mes." },
    { termino: "Jornalero", definicion: "Quien cobra por cada día trabajado (jornal)." },
  ],
});
