import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.salario-integral",
  h1: "Calculadora de salario integral 2026",
  title: "Salario integral 2026: mínimo, aportes y neto",
  description:
    "Mira si tu salario integral cumple el mínimo legal y cuánto te descuentan: los aportes se pagan sobre el {{co.salario-integral-base}} del salario.",
  intro: [
    "El salario integral es un pago mensual que ya incluye las prestaciones: prima, cesantías, intereses y recargos. Por eso no se liquidan aparte. Las vacaciones sí se siguen pagando.",
    "Solo se puede pactar por escrito y si el salario supera {{co.salario-integral-minimo}}, más un factor prestacional de al menos el {{co.salario-integral-factor}}. Escribe tu salario y te mostramos si cumple y cuánto recibes.",
  ],
  comoSeCalcula: [
    "Mínimo legal: {{co.salario-integral-minimo}} más el {{co.salario-integral-factor}} de factor prestacional. Con el salario mínimo de {{co.smmlv}}, son 13 salarios mínimos.",
    "Aportes: salud y pensión se calculan sobre el {{co.salario-integral-base}} del salario integral, con tope de {{co.tope-ibc}}.",
    "Retención en la fuente: se restan los aportes y la renta exenta del {{co.renta-exenta-trabajo}}, y se aplica la tabla del artículo 383 del Estatuto Tributario.",
  ],
  ejemplo: [
    "Con un salario integral de $25.000.000 en 2026, los aportes se calculan sobre $17.500.000. Pagas $700.000 de salud, $700.000 de pensión y $175.000 al Fondo de Solidaridad. Con la retención, recibes cerca de $19.440.800.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es el salario integral mínimo en 2026?",
      respuesta: "Es {{co.salario-integral-minimo}} más el {{co.salario-integral-factor}} de factor prestacional. Con el salario mínimo de {{co.smmlv}}, el mínimo integral es de 13 salarios mínimos al mes.",
    },
    {
      pregunta: "¿El salario integral tiene prima y cesantías?",
      respuesta: "No. El factor prestacional ya paga la prima, las cesantías, sus intereses y los recargos. Lo único que se sigue pagando aparte son las vacaciones.",
    },
    {
      pregunta: "¿Sobre cuánto se pagan salud y pensión?",
      respuesta: "Sobre el {{co.salario-integral-base}} del salario integral. Los aportes al SENA, el ICBF y la caja de compensación también bajan en la misma proporción.",
    },
    {
      pregunta: "¿Me pueden pasar a salario integral sin mi firma?",
      respuesta: "No. El salario integral tiene que pactarse por escrito. Si aceptas el cambio, te liquidan las cesantías y prestaciones causadas hasta ese día, sin que se termine el contrato.",
    },
  ],
  glosario: [
    { termino: "Factor prestacional", definicion: "La parte del salario integral que reemplaza la prima, las cesantías y los demás beneficios." },
    { termino: "Salario integral", definicion: "Un salario alto que ya incluye las prestaciones sociales, pactado por escrito." },
  ],
});
