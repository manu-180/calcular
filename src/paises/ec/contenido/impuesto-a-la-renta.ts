import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.impuesto-a-la-renta",
  h1: "Calculadora del impuesto a la renta",
  title: "Impuesto a la renta 2026: calcula cuánto pagas",
  description: "Calcula tu impuesto a la renta con la tabla 2026 del SRI y la rebaja por gastos personales según tus cargas familiares. También la retención mensual.",
  intro: [
    "Si tus ingresos del año pasan la fracción exenta de la tabla del SRI, pagas impuesto a la renta. En relación de dependencia te lo retiene el empleador cada mes.",
    "La calculadora usa la tabla 2026 y descuenta la rebaja por gastos personales, que depende de tus gastos y de tus cargas familiares.",
  ],
  comoSeCalcula: [
    "Base imponible: tus ingresos gravados del año menos tu aporte personal al IESS ({{ec.aporte-personal-iess}}), si trabajas en relación de dependencia.",
    "Con esa base se aplica la tabla del SRI: un impuesto fijo por la fracción básica más un porcentaje sobre lo que la pasa.",
    "Rebaja por gastos personales: el {{ec.rebaja-gastos-personales}} de tus gastos, con un tope que depende de tus cargas. Sin cargas, el tope es {{ec.canastas-por-cargas[0]}} canastas básicas de {{ec.canasta-basica-enero}}.",
    "Con cargas familiares el tope sube: {{ec.canastas-por-cargas[1]}} canastas con una carga y hasta {{ec.canastas-por-cargas[5]}} con cinco o más. Con discapacidad o enfermedad catastrófica, rara o huérfana, el tope es de {{ec.canastas-catastroficas}} canastas.",
    "El impuesto del año menos la rebaja es lo que pagas. Si trabajas en relación de dependencia, el empleador lo divide para 11 y lo retiene de febrero a diciembre.",
  ],
  ejemplo: [
    "Ganas $2.000 al mes ($24.000 al año), sin gastos personales. Tu base es $21.732 y tu impuesto es $816,28 al año. Te retienen $74,21 por mes de febrero a diciembre.",
  ],
  faq: [
    {
      pregunta: "¿Desde cuánto se paga impuesto a la renta en 2026?",
      respuesta: "Desde que tu base imponible del año pasa la fracción exenta de la tabla 2026 del SRI. Con relación de dependencia, la base es lo que ganas menos el aporte al IESS.",
    },
    {
      pregunta: "¿Qué gastos personales puedo deducir?",
      respuesta: "Vivienda, alimentación, educación, salud (también la de tus mascotas), vestimenta, turismo nacional, arte y cultura, pensiones alimenticias e intereses de préstamos. Siempre sin IVA.",
    },
    {
      pregunta: "¿Quiénes cuentan como cargas familiares para el SRI?",
      respuesta: "Tus padres, tu cónyuge o pareja en unión de hecho y tus hijos hasta los 21 años, o con discapacidad de cualquier edad. Tienen que depender de ti y no tener ingresos gravados.",
    },
    {
      pregunta: "¿Qué pasa si la rebaja es mayor que mi impuesto?",
      respuesta: "Tu impuesto queda en cero. La diferencia no se devuelve.",
    },
    {
      pregunta: "¿Los décimos pagan impuesto a la renta?",
      respuesta: "No. El décimo tercero y el décimo cuarto no se suman a tus ingresos para este impuesto.",
    },
  ],
  glosario: [
    { termino: "Base imponible", definicion: "La parte de tus ingresos sobre la que se calcula el impuesto." },
    { termino: "Fracción básica", definicion: "El límite inferior de cada fila de la tabla del SRI." },
    { termino: "Canasta familiar básica", definicion: "El costo de la canasta que mide el INEC. Se usa la de enero del año que se declara." },
    { termino: "Proyección de gastos personales", definicion: "El formulario con el que le informas a tu empleador tus gastos estimados del año, para que retenga menos." },
  ],
});
