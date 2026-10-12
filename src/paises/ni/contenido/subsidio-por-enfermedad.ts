import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.subsidio-por-enfermedad",
  h1: "Calculadora del subsidio por enfermedad del INSS",
  title: "Subsidio por enfermedad del INSS: calculá cuánto cobrás",
  description: "Si estás de reposo en Nicaragua, el INSS paga el {{ni.subsidio-enfermedad}} de tu salario desde el cuarto día. Calculá tu subsidio por enfermedad o accidente.",
  intro: [
    "Cuando un médico te da reposo, el INSS te paga un subsidio del {{ni.subsidio-enfermedad}} de tu salario promedio.",
    "Por enfermedad común se paga desde el cuarto día. Si te hospitalizan o es un accidente, desde el primero.",
  ],
  comoSeCalcula: [
    "Subsidio diario: el {{ni.subsidio-enfermedad}} de tu salario mensual dividido entre 30.",
    "Se restan los primeros {{ni.subsidio-enfermedad-dias-espera}} de reposo, salvo hospitalización o accidente.",
    "Se multiplica por los días que quedan. El subsidio dura hasta {{ni.subsidio-enfermedad-semanas-maximas}} semanas.",
  ],
  ejemplo: ["Con un salario de C$9,000 y una semana de reposo, el INSS paga 4 días a C$180: C$720."],
  faq: [
    {
      pregunta: "¿Cuánto paga el INSS por un reposo médico?",
      respuesta: "El {{ni.subsidio-enfermedad}} del promedio de tus últimas ocho cotizaciones semanales, dentro de las 22 semanas anteriores.",
    },
    {
      pregunta: "¿Desde qué día paga el INSS?",
      respuesta: "Desde el cuarto día de incapacidad. Si te hospitalizan o es un accidente, desde el primer día.",
    },
    {
      pregunta: "¿Cuánto tiempo puedo cobrar el subsidio?",
      respuesta: "Mientras dure la incapacidad, hasta {{ni.subsidio-enfermedad-semanas-maximas}} semanas. Cada orden de reposo es de 30 días como máximo.",
    },
    {
      pregunta: "¿Pierdo vacaciones o aguinaldo por estar de reposo?",
      respuesta: "No. La enfermedad no corta los días que suman para vacaciones y el subsidio cuenta como tiempo trabajado para el aguinaldo.",
    },
    {
      pregunta: "¿En cuánto tiempo tengo que cobrarlo?",
      respuesta: "El derecho a cobrar el subsidio prescribe a los seis meses de otorgado.",
    },
  ],
  glosario: [
    { termino: "Orden de reposo", definicion: "El documento del médico que dice cuántos días no podés trabajar." },
    { termino: "Subsidio", definicion: "Lo que paga el INSS mientras no podés trabajar." },
  ],
});
