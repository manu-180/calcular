import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.despido-injustificado",
  h1: "Calculadora de despido injustificado en República Dominicana",
  title: "Despido injustificado en RD: calcula lo que te toca",
  description: "Calcula preaviso, cesantía y salarios caídos de hasta {{do.salarios-caidos-meses}} de salario cuando el tribunal declara injustificado tu despido (artículo 95).",
  intro: [
    "Si te despiden alegando una causa y el empleador no la prueba ante el tribunal, el despido es injustificado. Entonces te toca lo mismo que en un desahucio, más los salarios caídos.",
    "Los salarios caídos son los salarios desde la demanda hasta la sentencia, con un máximo de {{do.salarios-caidos-meses}} de salario.",
  ],
  comoSeCalcula: [
    "Preaviso: {{do.preaviso-dias[un-anio-o-mas]}} de salario si trabajaste más de un año (menos si trabajaste menos).",
    "Cesantía: {{do.cesantia-dias[uno-a-cinco-anios]}} por año hasta 5 años y {{do.cesantia-dias[cinco-anios-o-mas]}} por año desde 5 años.",
    "Salarios caídos: tu salario mensual por los meses del juicio, con tope de {{do.salarios-caidos-meses}}.",
    "El salario diario es el promedio del último año entre {{do.divisor-salario-diario}}.",
  ],
  ejemplo: [
    "Con 2 años y 7 meses de trabajo, RD$50,000 de salario y un juicio de 8 meses, te tocan RD$58,749.60 de preaviso, RD$115,401 de cesantía y RD$300,000 de salarios caídos (el tope). En total, RD$474,150.60.",
  ],
  faq: [
    { pregunta: "¿Qué es un despido injustificado?", respuesta: "Es un despido en el que el empleador no prueba ante el tribunal la causa que alegó. El contrato se da por terminado por culpa del empleador." },
    { pregunta: "¿Cuánto son los salarios caídos?", respuesta: "Los salarios desde que demandas hasta la sentencia final, con un máximo de {{do.salarios-caidos-meses}} de salario." },
    { pregunta: "¿Cuánto tiempo tengo para demandar?", respuesta: "Revisa los plazos con el Ministerio de Trabajo o un abogado laboral lo antes posible. Son cortos." },
    { pregunta: "¿Me pagan también vacaciones y regalía?", respuesta: "Sí. Las vacaciones no tomadas y la regalía proporcional te tocan siempre, aparte de este cálculo." },
  ],
  glosario: [
    { termino: "Despido injustificado", definicion: "Despido cuya causa el empleador no prueba ante el tribunal." },
    { termino: "Salarios caídos", definicion: "Los salarios que el tribunal manda pagar por el tiempo del juicio." },
    { termino: "Dimisión", definicion: "Terminar tú el contrato por una falta del empleador. Si es justificada, se paga igual que un despido injustificado." },
  ],
});
