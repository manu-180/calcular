import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.preaviso",
  h1: "Calculadora de preaviso por renuncia en Guatemala",
  title: "Preaviso de renuncia en Guatemala: cuántos días dar",
  description:
    "Calcule cuántos días de aviso tiene que dar si renuncia a un contrato por tiempo indefinido y desde qué fecha puede dejar de trabajar.",
  intro: [
    "Si renuncia a un contrato por tiempo indefinido, tiene que avisarle por escrito a su patrono con anticipación. El plazo depende de cuánto tiempo lleva trabajando.",
    "Durante el período de prueba no hace falta aviso.",
  ],
  comoSeCalcula: [
    "Menos de seis meses: {{gt.preaviso-dias[menos-6-meses]}}.",
    "De seis meses a menos de un año: {{gt.preaviso-dias[6-meses-a-1-anio]}}.",
    "De uno a menos de cinco años: {{gt.preaviso-dias[1-a-5-anios]}}.",
    "Cinco años o más: {{gt.preaviso-meses-5-anios}}.",
  ],
  ejemplo: ["Si lleva tres años y entrega el aviso el 12 de octubre, puede dejar de trabajar desde el 26 de octubre."],
  faq: [
    {
      pregunta: "¿Tengo que dar preaviso si renuncio?",
      respuesta: "Sí, si su contrato es por tiempo indefinido y ya pasó el período de prueba. El aviso se da por escrito.",
    },
    {
      pregunta: "¿Qué pasa si no doy el preaviso?",
      respuesta: "Su patrono puede reclamarle el salario de los días de aviso que no dio. Igual no pierde su aguinaldo, Bono 14 ni vacaciones proporcionales.",
    },
    {
      pregunta: "¿Me pagan algo por renunciar?",
      respuesta: "No le toca indemnización, pero sí el salario pendiente y la parte proporcional de aguinaldo, Bono 14 y vacaciones.",
    },
  ],
  glosario: [{ termino: "Preaviso", definicion: "Aviso por escrito que da quien renuncia, con anticipación, para que el patrono pueda organizarse." }],
});
