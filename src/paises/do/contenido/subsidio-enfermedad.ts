import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.subsidio-enfermedad",
  h1: "Calculadora del subsidio por enfermedad común",
  title: "Subsidio por enfermedad en RD: calcula tu licencia médica",
  description: "Calcula el subsidio por enfermedad común de la SISALRIL: {{do.enfermedad-ambulatoria}} de tu salario si el reposo es en casa o {{do.enfermedad-hospitalaria}} si estás hospitalizado.",
  intro: [
    "Cuando tienes una licencia médica de más de 3 días por enfermedad común o accidente no laboral, la Seguridad Social te paga un subsidio en lugar del salario.",
    "El monto depende de si la atención es ambulatoria o en el hospital.",
  ],
  comoSeCalcula: [
    "Se toma el promedio de tu salario cotizable de los últimos 6 meses, hasta el tope del Seguro Familiar de Salud ({{do.tope-sfs}}).",
    "Atención ambulatoria: {{do.enfermedad-ambulatoria}} de ese promedio.",
    "Hospitalización: {{do.enfermedad-hospitalaria}} de ese promedio.",
    "Se paga hasta {{do.enfermedad-semanas}} semanas.",
  ],
  ejemplo: [
    "Con un salario promedio de RD$30,000 y reposo en casa, el subsidio equivale a RD$18,000 por cada mes de licencia.",
  ],
  faq: [
    { pregunta: "¿Quién tiene derecho al subsidio por enfermedad?", respuesta: "Quien cotizó a la TSS los 12 meses seguidos anteriores a la incapacidad y tiene una licencia médica de más de 3 días." },
    { pregunta: "¿Por qué cobro menos que mi salario?", respuesta: "Porque el subsidio es un porcentaje del salario: {{do.enfermedad-ambulatoria}} en reposo y {{do.enfermedad-hospitalaria}} en hospitalización." },
    { pregunta: "¿Quién me paga?", respuesta: "Tu empleador te lo paga en la nómina y la SISALRIL se lo reembolsa." },
    { pregunta: "¿Cuánto tiempo tengo para reclamarlo?", respuesta: "Hasta 60 días después de terminar la incapacidad." },
  ],
  glosario: [
    { termino: "Enfermedad común", definicion: "Una enfermedad que no viene del trabajo." },
    { termino: "Atención ambulatoria", definicion: "Tratamiento con reposo en casa, sin internación." },
  ],
});
