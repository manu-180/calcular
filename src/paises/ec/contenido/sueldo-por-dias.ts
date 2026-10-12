import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.sueldo-por-dias",
  h1: "Calculadora de sueldo por días trabajados en Ecuador",
  title: "Sueldo por días trabajados en Ecuador: cálculo rápido",
  description: "Calcula cuánto te pagan por los días trabajados de un mes: el día vale tu sueldo dividido para 30. Útil si entraste o saliste a mitad de mes.",
  intro: [
    "Si empezaste o dejaste un trabajo a mitad de mes, te pagan solo los días trabajados. En Ecuador cada día vale la treintava parte del sueldo, tenga el mes 28 o 31 días.",
    "Pon tu sueldo mensual y los días que trabajaste.",
  ],
  comoSeCalcula: [
    "El valor del día es el sueldo mensual dividido para 30.",
    "Se multiplica por los días trabajados.",
    "Un mes completo siempre se paga entero, aunque tenga 31 días.",
  ],
  ejemplo: ["Con un sueldo de $600 y 10 días trabajados, cobras $200."],
  faq: [
    {
      pregunta: "¿Por qué se divide para 30 y no para los días del mes?",
      respuesta: "Porque el sueldo mensual paga 30 días, incluido el descanso semanal. Así cada día vale lo mismo en cualquier mes.",
    },
    {
      pregunta: "¿Cuánto vale un día con el salario básico?",
      respuesta: "El salario básico de {{ec.sbu}} dividido para 30. Da unos $16,07 por día.",
    },
    {
      pregunta: "¿Los días trabajados suman para los décimos?",
      respuesta: "Sí. Los décimos y las vacaciones se calculan en proporción al tiempo trabajado.",
    },
  ],
  glosario: [
    { termino: "Valor del día", definicion: "Tu sueldo mensual dividido para 30." },
    { termino: "Mes comercial", definicion: "El mes de 30 días que se usa para pagar sueldos." },
  ],
});
