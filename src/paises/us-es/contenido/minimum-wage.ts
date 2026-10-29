import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.minimum-wage",
  h1: "Salario mínimo por estado",
  title: "Salario mínimo por estado {{anio}}: California, Florida y más",
  description: "Consulta el salario mínimo de {{anio}} en tu estado y cuánto suma por semana, mes y año. El mínimo federal es de {{us.min-wage-federal}} por hora.",
  intro: [
    "Elige tu estado para ver su salario mínimo, el mínimo federal y el que tu empleador te tiene que pagar.",
    "Escribe tus horas por semana para convertir la tarifa por hora en pago semanal, mensual y anual.",
  ],
  comoSeCalcula: [
    "El salario mínimo federal es de {{us.min-wage-federal}} por hora para los empleos cubiertos por la Ley de Normas Justas de Trabajo (FLSA).",
    "Cuando un estado fija una tasa más alta, los trabajadores reciben la más alta. En California es de {{us.min-wage-state[california]}}, en la ciudad de Nueva York {{us.min-wage-state[new-york-city-area]}} y en Florida {{us.min-wage-state[florida]}}.",
    "El pago semanal es la tarifa por hora por tus horas. Un año cuenta 52 semanas y un mes es la doceava parte.",
  ],
  ejemplo: [
    "En California, una persona a tiempo completo que gana el mínimo recibe $676 por semana, unos $2,929 al mes o $35,152 al año.",
  ],
  faq: [
    { pregunta: "¿Cuál es el salario mínimo en California en 2026?", respuesta: "{{us.min-wage-state[california]}} por hora. Es el mínimo general del estado: algunos sectores, como la comida rápida, tienen uno más alto, y varias ciudades, como Los Ángeles, San Francisco y San José, fijan un mínimo local por encima." },
    { pregunta: "¿Cuál es el salario mínimo federal en 2026?", respuesta: "{{us.min-wage-federal}} por hora. No cambia desde el 24 de julio de 2009." },
    { pregunta: "¿Qué estados pagan solo el mínimo federal?", respuesta: "Estados como Texas, Pennsylvania, Carolina del Norte e Indiana usan {{us.min-wage-federal}}. Alabama, Louisiana, Mississippi, Carolina del Sur y Tennessee no tienen ley de salario mínimo estatal, así que se aplica la tasa federal a los empleos cubiertos." },
    { pregunta: "Mi ciudad paga más que el estado. ¿Cuál vale?", respuesta: "El más alto. Ciudades y condados como Seattle, Denver y muchos de California fijan su propio salario mínimo por encima del estatal." },
    { pregunta: "¿Cuándo cambian los salarios mínimos?", respuesta: "La mayoría de los estados los suben el 1 de enero. Algunos, como Oregon y el Distrito de Columbia, los ajustan el 1 de julio, y el aumento de Florida llegó el 30 de septiembre." },
  ],
  glosario: [
    { termino: "Ley de Normas Justas de Trabajo (FLSA)", definicion: "La ley federal que fija el salario mínimo y las reglas de horas extras para la mayoría de los empleos." },
    { termino: "Salario mínimo con propinas", definicion: "Un salario en efectivo más bajo que algunos estados permiten para quienes reciben propinas, siempre que las propinas los lleven al mínimo completo." },
  ],
});
