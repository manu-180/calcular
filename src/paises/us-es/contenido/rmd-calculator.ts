import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.rmd-calculator",
  h1: "Calculadora de distribución mínima requerida (RMD)",
  title: "Calculadora RMD {{anio}}: distribución mínima requerida",
  description: "Calcula la distribución mínima requerida de tu IRA o 401(k) con la Tabla Uniforme de Vida del IRS. Las RMD empiezan a los {{us.rmd-age}} años.",
  intro: [
    "Cuando llegas a los {{us.rmd-age}} años, el IRS te exige retirar cada año un monto mínimo de tus IRA tradicionales y planes de jubilación del trabajo.",
    "Escribe tu edad y el saldo al cierre del año pasado para ver la RMD de este año.",
  ],
  comoSeCalcula: [
    "Se toma el saldo de la cuenta al 31 de diciembre del año pasado.",
    "Se busca el período de distribución para la edad que cumples este año en la Tabla Uniforme de Vida. A los 73 es {{us.rmd-uniform-table[73]}}, a los 80 es {{us.rmd-uniform-table[80]}} y a los 90 es {{us.rmd-uniform-table[90]}}.",
    "Se divide el saldo entre ese número. El resultado es lo mínimo que debes retirar antes del 31 de diciembre.",
  ],
  ejemplo: [
    "A los 75 años con $500,000 en una IRA, el período de distribución es 24.6, así que la RMD es de $20,325.20, alrededor de 4.1% del saldo.",
  ],
  faq: [
    { pregunta: "¿Cuándo tengo que hacer mi primera RMD?", respuesta: "En el año en que cumples {{us.rmd-age}}. Puedes retrasar esa primera hasta el 1 de abril del año siguiente, pero entonces haces dos RMD en ese año." },
    { pregunta: "¿Qué pasa si no hago una RMD?", respuesta: "Debes un impuesto de 25% sobre el monto que no retiraste, que baja a 10% si lo corriges a tiempo. Presenta el Formulario 5329 para declararlo o pedir una exención." },
    { pregunta: "¿Las Roth IRA tienen RMD?", respuesta: "No mientras viva el dueño original. Los herederos de una Roth IRA sí tienen reglas de distribución." },
    { pregunta: "Tengo varias IRA. ¿Hago una RMD de cada una?", respuesta: "Calculas una RMD para cada IRA, las sumas y puedes retirar el total de una o más de tus IRA. Los planes del trabajo siguen sus propias reglas, así que consulta cada plan." },
  ],
  glosario: [
    { termino: "Período de distribución", definicion: "El número de la tabla del IRS entre el que se divide tu saldo." },
    { termino: "Tabla Uniforme de Vida", definicion: "La Tabla III de la Publicación 590-B del IRS, que usan la mayoría de los dueños de IRA." },
  ],
});
