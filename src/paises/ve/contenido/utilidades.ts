import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.utilidades",
  h1: "Calculadora de utilidades en Venezuela",
  title: "Utilidades 2026 en Venezuela: calcula cuánto cobras",
  description:
    "Calcula tus utilidades con la LOTTT: de {{ve.utilidades-dias-minimo}} a {{ve.utilidades-dias-maximo}} de salario al año, o las fraccionadas si no completaste el año. En bolívares o en dólares.",
  intro: [
    "En Venezuela las utilidades son entre {{ve.utilidades-dias-minimo}} y {{ve.utilidades-dias-maximo}} de salario al año, según lo que pague tu empresa. Si no trabajaste el año completo, cobras la parte de los meses completos: son las utilidades fraccionadas.",
    "Son tu parte de las ganancias de la empresa y se pagan casi siempre en diciembre. Se calculan con tu salario normal, sin el cestaticket ni otros bonos que no son salario.",
  ],
  comoSeCalcula: [
    "Salario diario: tu salario mensual entre {{ve.dias-mes-salario}}.",
    "Utilidades: salario diario por los días que paga tu empresa.",
    "Si no trabajaste el año completo, se multiplica por los meses completos y se divide entre 12.",
  ],
  ejemplo: ["Con $300 al mes y 30 días de utilidades, el año completo da $300. Con 8 meses, $200."],
  faq: [
    {
      pregunta: "¿Cuántos días de utilidades me tocan?",
      respuesta: "Lo mínimo de ley es {{ve.utilidades-dias-minimo}} de salario y lo máximo {{ve.utilidades-dias-maximo}}. Muchas empresas pagan más que el mínimo: revisa tu contrato.",
    },
    {
      pregunta: "¿Cómo se calculan las utilidades fraccionadas?",
      respuesta: "Multiplica tu salario diario por los días de utilidades de tu empresa, después por los meses completos trabajados, y divide entre 12. Con $300 al mes, 30 días y 8 meses, son $200.",
    },
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
