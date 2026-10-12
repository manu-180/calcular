import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.retiro-por-desempleo",
  h1: "Calculadora de retiro por desempleo de la Afore",
  title: "Retiro por desempleo de la Afore: cuánto puedes sacar",
  description: "Calcula cuánto puedes retirar de tu Afore por desempleo según la antigüedad de tu cuenta y tu salario base de cotización.",
  intro: [
    "Si llevas al menos 46 días sin empleo, puedes retirar una parte de tu subcuenta de retiro, cesantía y vejez.",
    "Retirar reduce tus semanas cotizadas, aunque puedes reintegrar el dinero después.",
  ],
  comoSeCalcula: [
    "Cuenta de 3 años o más: {{mx.retiro-desempleo[dias-a]}} días de tu último salario base de cotización, con un tope.",
    "Cuenta de 5 años o más: lo menor entre {{mx.retiro-desempleo[dias-b]}} días de tu salario promedio y el {{mx.retiro-desempleo[porcentaje-b]}} % de tu saldo.",
  ],
  ejemplo: [],
  faq: [],
  glosario: [],
});
