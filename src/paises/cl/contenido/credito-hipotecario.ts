import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.credito-hipotecario",
  h1: "Simulador de crédito hipotecario en UF",
  title: "Simulador de crédito hipotecario: calcula tu dividendo",
  description: "Calcula el dividendo de tu crédito hipotecario en UF y en pesos con la UF de hoy: valor de la propiedad, pie, tasa y plazo. Sin seguros.",
  intro: [
    "En Chile los créditos hipotecarios se pactan en UF. Tu dividendo es fijo en UF y en pesos sube un poco cada mes con la inflación.",
    "Escribe el valor de la propiedad, el pie, la tasa y el plazo. Te mostramos el dividendo y cuánto pagas en intereses.",
  ],
  comoSeCalcula: [
    "El crédito es el valor de la propiedad menos el pie.",
    "Se usa una cuota fija mensual con la tasa anual dividida por 12.",
    "El dividendo en UF se pasa a pesos con la UF del día. No incluye los seguros de desgravamen e incendio, que se suman aparte.",
  ],
  ejemplo: ["Un departamento de 3.000 UF con 20 % de pie, tasa de 4,5 % y 25 años da un dividendo de 13,34 UF, unos $548.467 con la UF del 7 de octubre de 2026, sin seguros."],
  faq: [
    {
      pregunta: "¿Cuánto pie necesito?",
      respuesta: "Lo define cada banco. Lo común es entre 10 % y 20 % del valor de la propiedad.",
    },
    {
      pregunta: "¿Cuánto tengo que ganar para que me den el crédito?",
      respuesta: "Muchos bancos piden que el dividendo no pase de un 25 % de la renta líquida. Por eso te mostramos la renta que cumple esa relación.",
    },
    {
      pregunta: "¿Por qué mi dividendo en pesos sube?",
      respuesta: "Porque está en UF y la UF sube con la inflación. El monto en UF se mantiene igual todo el crédito.",
    },
    {
      pregunta: "¿Qué es la CAE?",
      respuesta: "La carga anual equivalente. Suma la tasa, los seguros y los gastos del crédito. Úsala para comparar ofertas de distintos bancos.",
    },
  ],
  glosario: [
    { termino: "Dividendo", definicion: "Cuota mensual de un crédito hipotecario." },
    { termino: "Pie", definicion: "Parte del precio que pagas al contado." },
    { termino: "UF", definicion: "Unidad de Fomento. Sube con la inflación y es la unidad de los créditos hipotecarios." },
  ],
});
