import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.ventajas-economicas",
  h1: "Calculadora de ventajas económicas en Guatemala",
  title: "Ventajas económicas en Guatemala: su salario total",
  description:
    "Calcule el valor de las ventajas económicas (vivienda, comida, vehículo) que forman parte de su salario y su salario total para la indemnización.",
  intro: [
    "Las ventajas económicas son los beneficios que le da el patrono por su trabajo además del dinero: vivienda, comida, vehículo, teléfono y otros.",
    "Si no se pactó cuánto valen, el Código de Trabajo dice que son el {{gt.ventajas-economicas}} del salario total. Ese salario total es el que cuenta para la indemnización.",
  ],
  comoSeCalcula: [
    "Salario total = salario en dinero / (1 menos {{gt.ventajas-economicas}}).",
    "Ventajas económicas = salario total menos salario en dinero.",
  ],
  ejemplo: ["Si recibe Q7,000 en dinero y además vivienda y comida, su salario total es de Q10,000 y las ventajas valen Q3,000."],
  faq: [
    {
      pregunta: "¿Qué cuenta como ventaja económica?",
      respuesta: "Todo beneficio que recibe por su trabajo y que tiene valor en dinero: vivienda, alimentación, vehículo, combustible o teléfono, entre otros.",
    },
    {
      pregunta: "¿Para qué sirve saber el salario total?",
      respuesta: "La indemnización por despido se calcula con el salario total, incluidas las ventajas económicas. Si no las cuenta, la indemnización sale más baja.",
    },
    {
      pregunta: "¿Qué pasa si en el contrato se fijó otro valor?",
      respuesta: "Vale lo que se pactó. El {{gt.ventajas-economicas}} se usa solo cuando no hay pacto.",
    },
  ],
  glosario: [{ termino: "Ventajas económicas", definicion: "Beneficios con valor en dinero que el patrono da por el trabajo, además del salario en efectivo." }],
});
