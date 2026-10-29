import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.costo-empleador",
  h1: "Calculadora del costo de un empleado en Panamá",
  title: "Cuánto cuesta un empleado en Panamá: cuota patronal {{anio}}",
  description:
    "Calcula cuánto cuesta un empleado en Panamá: cuota patronal del {{pa.css-empleador}} a la CSS, {{pa.seguro-educativo-empleador}} de seguro educativo, riesgos profesionales y décimo.",
  intro: [
    "Un empleado en Panamá cuesta su salario más las cargas del empleador. Son la cuota patronal del {{pa.css-empleador}} a la Caja de Seguro Social, el {{pa.seguro-educativo-empleador}} de seguro educativo, los riesgos profesionales y el décimo tercer mes.",
    "Escribe el salario y, si la sabes, la tasa de riesgos profesionales de tu empresa. Te mostramos el costo de cada mes y del año.",
  ],
  comoSeCalcula: [
    "Cuota patronal a la CSS: {{pa.css-empleador}} del salario. Sube por etapas hasta 2029, según la Ley 462 de 2025.",
    "Seguro educativo patronal: {{pa.seguro-educativo-empleador}} del salario.",
    "Riesgos profesionales: la tasa que la CSS asigna a tu actividad.",
    "Décimo tercer mes: el salario dividido entre {{pa.decimo-divisor}}, más una contribución especial del {{pa.css-decimo-empleador}} sobre el décimo.",
  ],
  ejemplo: [
    "Con un salario de B/. 1,200 y sin contar riesgos profesionales: CSS B/. 159, seguro educativo B/. 18, décimo B/. 100 y su contribución B/. 10.75. Costo mensual B/. 1,487.75.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto cuesta un empleado que gana B/. 1,200?",
      respuesta: "Sin contar riesgos profesionales, B/. 1,487.75 al mes: el salario, B/. 159 de CSS, B/. 18 de seguro educativo, B/. 100 de décimo y B/. 10.75 de contribución sobre el décimo.",
    },
    {
      pregunta: "¿Cuánto paga el empleador a la CSS en 2026?",
      respuesta: "El {{pa.css-empleador}} de los sueldos. Pasa al 14.25% desde el 1 de marzo de 2027 y al 15.25% desde el 1 de marzo de 2029.",
    },
    {
      pregunta: "¿El empleador paga seguro educativo sobre el décimo?",
      respuesta: "No. El décimo solo lleva la contribución especial de Seguro Social del {{pa.css-decimo-empleador}}.",
    },
    {
      pregunta: "¿Qué otros costos tiene un trabajador?",
      respuesta: "Las vacaciones y el aporte trimestral al fondo de cesantía, que cubre la prima de antigüedad y parte de la indemnización.",
    },
  ],
  glosario: [
    { termino: "Cuota patronal", definicion: "La parte de la seguridad social que paga el empleador." },
    { termino: "Riesgos profesionales", definicion: "El seguro de accidentes de trabajo y enfermedades profesionales." },
  ],
});
