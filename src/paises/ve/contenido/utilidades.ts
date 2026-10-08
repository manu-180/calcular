import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.utilidades",
  h1: "Calculadora de utilidades",
  title: "Utilidades en Venezuela: calcula cuánto cobras",
  description:
    "Calcula tus utilidades con la LOTTT: entre {{ve.utilidades-dias-minimo}} y {{ve.utilidades-dias-maximo}} de salario por año, proporcional a los meses trabajados. En bolívares o en dólares.",
  intro: [
    "Las utilidades son tu parte de las ganancias de la empresa. Se pagan una vez al año, casi siempre en diciembre.",
    "La ley fija un mínimo de {{ve.utilidades-dias-minimo}} y un máximo de {{ve.utilidades-dias-maximo}} de salario. Muchas empresas pagan más que el mínimo: revisa tu contrato.",
  ],
  comoSeCalcula: [
    "Salario diario: tu salario mensual entre {{ve.dias-mes-salario}}.",
    "Utilidades: salario diario por los días que paga tu empresa.",
    "Si no trabajaste el año completo, se multiplica por los meses completos y se divide entre 12.",
  ],
  ejemplo: ["Con $300 al mes y 30 días de utilidades, el año completo da $300. Con 8 meses, $200."],
  faq: [
    {
      pregunta: "¿Cuándo se pagan las utilidades?",
      respuesta: "Las empresas con fines de lucro tienen que adelantar al menos 30 días de salario en los primeros quince días de diciembre. El resto se paga al cerrar el ejercicio.",
    },
    {
      pregunta: "¿Me toca algo si entré a mitad de año?",
      respuesta: "Sí. Cobras la parte de los meses completos que trabajaste. Son las utilidades fraccionadas.",
    },
    {
      pregunta: "¿Con qué salario se calculan?",
      respuesta: "Con tu salario normal. Los bonos que no son salario, como el cestaticket, no cuentan.",
    },
  ],
  glosario: [
    { termino: "Utilidades", definicion: "Participación de los trabajadores en las ganancias de la empresa, artículo 131 de la LOTTT." },
    { termino: "Salario normal", definicion: "Lo que cobras de forma regular y permanente por tu trabajo." },
  ],
});
