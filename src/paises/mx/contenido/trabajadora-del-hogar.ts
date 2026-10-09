import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.trabajadora-del-hogar",
  h1: "Calculadora para personas trabajadoras del hogar: sueldo y prestaciones",
  title: "Trabajadora del hogar 2026: mínimo, aguinaldo y vacaciones",
  description:
    "Calcula el aguinaldo, las vacaciones y la prima vacacional de una persona trabajadora del hogar, y revisa el salario mínimo profesional del hogar en tu zona.",
  intro: [
    "Si contratas a una persona trabajadora del hogar, tiene los mismos derechos básicos que cualquier trabajador: aguinaldo, vacaciones con prima vacacional, descansos y seguro social.",
    "Su salario mínimo profesional en 2026 es de {{mx.salario-minimo-hogar@general}} diarios, y de {{mx.salario-minimo-hogar@frontera-norte}} en la Zona Libre de la Frontera Norte.",
  ],
  comoSeCalcula: [
    "El salario diario es el sueldo semanal entre 7, el quincenal entre 15 o el mensual entre 30.",
    "Aguinaldo: {{mx.dias-aguinaldo}} de salario, a más tardar el 20 de diciembre.",
    "Vacaciones: {{mx.vacaciones-primer-anio}} al cumplir el primer año, dos más por año hasta llegar a 20, y desde el sexto año dos más por cada cinco años.",
    "Prima vacacional: {{mx.prima-vacacional}} de lo que cobra por sus días de vacaciones.",
    "El costo anual suma 365 días de salario, el aguinaldo y la prima vacacional. Las cuotas del IMSS van aparte.",
  ],
  ejemplo: [
    "Con 2,800 pesos a la semana (400 diarios) y un año de antigüedad, le corresponden 6,000 pesos de aguinaldo, 12 días de vacaciones y 1,200 pesos de prima vacacional.",
  ],
  faq: [
    {
      pregunta: "¿Es obligatorio inscribirla en el IMSS?",
      respuesta: "Sí. La Ley Federal del Trabajo obliga a inscribirla y a pagar sus cuotas. Lo haces en el portal del IMSS para personas trabajadoras del hogar, que calcula la cuota con su salario y los días que trabaja.",
    },
    {
      pregunta: "¿Cuántos días de descanso tiene?",
      respuesta: "Un día y medio a la semana, de preferencia sábado y domingo, además de los días de descanso obligatorio de la ley.",
    },
    {
      pregunta: "¿Puedo descontarle la comida o el cuarto?",
      respuesta: "No. Siempre le debes dar alimentos, y habitación si vive en tu casa. El salario mínimo profesional es lo mínimo que debe recibir en efectivo.",
    },
    {
      pregunta: "¿Cuánto dura su jornada?",
      respuesta: "Si vive en tu casa, la jornada diurna no pasa de 8 horas, con 9 horas seguidas de descanso nocturno y 3 horas entre la mañana y la tarde. El tiempo extra se paga como horas extra.",
    },
  ],
  glosario: [
    { termino: "Salario mínimo profesional", definicion: "Mínimo que fija la CONASAMI para algunos oficios. El de las personas trabajadoras del hogar es más alto que el general en el resto del país." },
    { termino: "Prima vacacional", definicion: "Pago extra sobre el salario de los días de vacaciones." },
  ],
});
