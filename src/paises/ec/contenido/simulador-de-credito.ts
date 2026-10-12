import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.simulador-de-credito",
  h1: "Simulador de crédito: calcula tu cuota mensual",
  title: "Simulador de crédito Ecuador: cuota mensual y total",
  description: "Calcula la cuota mensual de un préstamo de consumo, vehicular o de vivienda con la tasa de tu banco. Cuota fija o decreciente, y total de intereses.",
  intro: [
    "Antes de pedir un crédito conviene saber cuánto vas a pagar cada mes y cuánto suman los intereses.",
    "Pon el monto, la tasa anual que te ofrecen y el plazo. Puedes comparar la cuota fija con la cuota decreciente.",
  ],
  comoSeCalcula: [
    "La tasa anual se divide para 12 para tener la tasa de cada mes.",
    "Con cuota fija (sistema francés), pagas lo mismo todos los meses. Al principio la cuota es casi toda interés.",
    "Con cuota decreciente (sistema alemán), pagas la misma parte de capital cada mes y los intereses bajan, así que la cuota baja.",
    "El total de intereses es lo que pagas por encima del monto prestado.",
  ],
  ejemplo: ["Un crédito de $10.000 a 12 meses al 12 % anual con cuota fija: pagas $888,49 al mes y $661,85 de intereses en total."],
  faq: [
    {
      pregunta: "¿Qué conviene más, cuota fija o decreciente?",
      respuesta: "La decreciente paga menos intereses en total, pero las primeras cuotas son más altas. La fija es más fácil de planificar.",
    },
    {
      pregunta: "¿Por qué mi cuota real es más alta?",
      respuesta: "Porque los bancos suman seguros, como el de desgravamen, y a veces otros cargos. Pide la tabla de amortización completa.",
    },
    {
      pregunta: "¿Qué tasa pongo?",
      respuesta: "La tasa nominal anual de tu oferta. La tasa efectiva incluye la capitalización y suele ser un poco mayor.",
    },
  ],
  glosario: [
    { termino: "Amortización", definicion: "La forma en que se devuelve el capital prestado en cada cuota." },
    { termino: "Tasa nominal", definicion: "La tasa anual que se divide para 12 para calcular el interés de cada mes." },
    { termino: "Seguro de desgravamen", definicion: "Un seguro que paga la deuda si la persona que debe fallece." },
  ],
});
