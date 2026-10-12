import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.licencia-medica",
  h1: "Calculadora de licencia médica: cuánto te pagan",
  title: "Licencia médica 2026: calcula cuánto te pagan",
  description:
    "Calcula el subsidio de tu licencia médica: tu remuneración neta dividida por 30 por día pagado. Las licencias de {{cl.licencia-dias-sin-carencia}} o menos no pagan los primeros días.",
  intro: [
    "Durante una licencia médica no recibes sueldo: recibes un subsidio que paga Fonasa (a través de la caja de compensación) o tu Isapre.",
    "El subsidio por día es tu remuneración neta promedio dividida por 30. Si la licencia es corta, los primeros días no se pagan.",
  ],
  comoSeCalcula: [
    "Se toma el promedio de tu sueldo imponible de los tres meses antes de la licencia y se le restan tus cotizaciones (AFP, salud, seguro de cesantía) y el impuesto. Eso es la remuneración neta.",
    "El subsidio diario es la remuneración neta dividida por 30. Nunca es menos de la trigésima parte del {{cl.subsidio-minimo}} del ingreso mínimo ({{cl.imm}}).",
    "Si la licencia dura más de {{cl.licencia-dias-sin-carencia}}, se pagan todos los días. Si dura eso o menos, se pagan desde el cuarto día ({{cl.licencia-dias-carencia}} sin pago).",
  ],
  ejemplo: ["Con un sueldo imponible de $1.500.000 (AFP Uno), tu remuneración neta es $1.218.898 y el subsidio diario $40.630. Una licencia de 15 días te paga $609.449; una de 7 días, $162.520."],
  faq: [
    {
      pregunta: "¿Por qué no me pagan los primeros 3 días?",
      respuesta: "La ley dice que las licencias de 10 días o menos se pagan desde el cuarto día. Si la licencia dura 11 días o más, se pagan desde el primero.",
    },
    {
      pregunta: "¿Quién paga la licencia médica?",
      respuesta: "Si estás en Fonasa, la paga la caja de compensación de tu empleador o el sistema público de salud. Si estás en Isapre, la paga tu Isapre.",
    },
    {
      pregunta: "¿Pierdo mis cotizaciones durante la licencia?",
      respuesta: "No. Durante la licencia se siguen pagando tus cotizaciones de pensión y salud, calculadas sobre tu última remuneración imponible.",
    },
    {
      pregunta: "¿Y si uso Isapre con un plan más caro que el 7 %?",
      respuesta: "La calculadora usa la cotización legal de salud. Si tu plan cuesta más, tu remuneración neta real y el subsidio pueden ser algo menores.",
    },
  ],
  glosario: [
    { termino: "Subsidio por incapacidad laboral", definicion: "Pago que reemplaza tu sueldo durante una licencia médica." },
    { termino: "Remuneración neta", definicion: "Sueldo imponible menos tus cotizaciones y el impuesto." },
  ],
});
