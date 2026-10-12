import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.periodo-de-prueba",
  h1: "Calculadora del periodo de prueba",
  title: "Periodo de prueba en Colombia: cuánto dura tu contrato",
  description:
    "Calcula hasta cuándo va tu periodo de prueba: máximo {{co.periodo-prueba-maximo}} y, en contratos fijos de menos de un año, la quinta parte del término.",
  intro: [
    "El periodo de prueba es el tiempo al comienzo del contrato en el que la empresa y tú pueden terminarlo sin indemnización. Tiene que pactarse por escrito.",
    "Nunca puede pasar de {{co.periodo-prueba-maximo}}. En un contrato a término fijo de menos de un año, tampoco puede pasar de la quinta parte de lo pactado.",
  ],
  comoSeCalcula: [
    "Contratos indefinidos, por obra o fijos de un año o más: {{co.periodo-prueba-maximo}} desde el inicio.",
    "Contratos fijos de menos de un año: el {{co.periodo-prueba-fraccion}} del término pactado (la quinta parte), sin pasar de {{co.periodo-prueba-maximo}}.",
  ],
  ejemplo: ["En un contrato fijo de 6 meses que empieza el 15 de octubre de 2026, el periodo de prueba es de 36 días y termina el 19 de noviembre."],
  faq: [
    {
      pregunta: "¿Cuánto dura el periodo de prueba?",
      respuesta: "Como máximo {{co.periodo-prueba-maximo}}. En contratos fijos de menos de un año, la quinta parte del término, si es menos.",
    },
    {
      pregunta: "¿Me pueden poner periodo de prueba en un segundo contrato?",
      respuesta: "No. Si firmas contratos seguidos con la misma empresa, el periodo de prueba solo vale en el primero.",
    },
    {
      pregunta: "¿En el periodo de prueba tengo prestaciones?",
      respuesta: "Sí. Tienes salario, aportes a seguridad social y todas las prestaciones, como en cualquier contrato.",
    },
  ],
  glosario: [
    { termino: "Periodo de prueba", definicion: "El tiempo inicial del contrato para que las dos partes vean si siguen." },
  ],
});
