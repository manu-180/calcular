import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.renuncia",
  h1: "Calculadora de liquidación por renuncia en República Dominicana",
  title: "Renuncia en RD: calcula cuánto te toca cobrar",
  description: "Calcula lo que cobras al renunciar en República Dominicana: vacaciones no tomadas y salario de Navidad proporcional. También el preaviso que debes dar.",
  intro: [
    "Si renuncias, no te tocan preaviso ni cesantía. Sí cobras las vacaciones que no tomaste y la parte proporcional del salario de Navidad.",
    "También tienes que avisar con los mismos días de preaviso que daría el empleador. Si no avisas, te pueden reclamar esos días.",
  ],
  comoSeCalcula: [
    "Tu salario diario es el mensual entre {{do.divisor-salario-diario}}.",
    "Vacaciones: las vencidas que no tomaste, más las del último año incompleto según el tiempo trabajado.",
    "Salario de Navidad: tu salario por los meses trabajados en el año, dividido entre 12, con tope de {{do.tope-regalia}} salarios mínimos.",
    "Preaviso: {{do.preaviso-dias[tres-a-seis-meses]}}, {{do.preaviso-dias[seis-a-doce-meses]}} o {{do.preaviso-dias[un-anio-o-mas]}} según tu antigüedad.",
  ],
  ejemplo: [
    "Si entraste el 15 de enero de 2026 con RD$25,000 y renuncias el 20 de septiembre, te tocan 9 días de vacaciones (RD$9,441.90) y RD$17,083.33 de regalía. Total, RD$26,525.23.",
  ],
  faq: [
    { pregunta: "¿Qué me toca si renuncio?", respuesta: "Las vacaciones no tomadas y el salario de Navidad proporcional. Preaviso y cesantía no." },
    { pregunta: "¿Tengo que dar preaviso si renuncio?", respuesta: "Sí. Con más de un año de trabajo son {{do.preaviso-dias[un-anio-o-mas]}}. Si no lo das, el empleador puede reclamarte el salario de esos días." },
    { pregunta: "¿Y si renuncio por una falta del empleador?", respuesta: "Eso es una dimisión. Si el tribunal la declara justificada, te toca lo mismo que en un despido injustificado." },
    { pregunta: "¿Cuándo me tienen que pagar?", respuesta: "Las vacaciones y la regalía se pagan al terminar el contrato. La regalía, a más tardar el 20 de diciembre." },
  ],
  glosario: [
    { termino: "Renuncia", definicion: "Terminar tú el contrato sin alegar una falta del empleador. En el Código se llama desahucio del trabajador." },
    { termino: "Salario de Navidad", definicion: "La regalía pascual: la duodécima parte de lo que ganaste en el año." },
  ],
});
