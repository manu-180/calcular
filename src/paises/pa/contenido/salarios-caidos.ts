import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.salarios-caidos",
  h1: "Calculadora de salarios caídos por despido injustificado en Panamá",
  title: "Salarios caídos en Panamá: lo que paga una sentencia",
  description:
    "Si ganas el juicio por despido injustificado en Panamá, te pagan salarios caídos (hasta {{pa.salarios-caidos-meses[desde-ley-44]}}), la indemnización y a veces un recargo. Calcula el total.",
  intro: [
    "Cuando un juez o una junta de conciliación decide que tu despido fue injustificado, puedes pedir volver a tu puesto o cobrar la indemnización. En los dos casos te pagan los salarios caídos desde el despido, con un tope.",
    "Si ordenan tu reintegro pero el empleador prefiere pagarte, a la indemnización se le puede sumar un recargo. Escribe tus datos y te mostramos cada parte.",
  ],
  comoSeCalcula: [
    "Salarios caídos: tu salario por los meses entre el despido y la sentencia, hasta {{pa.salarios-caidos-meses[desde-ley-44]}} si entraste desde la Ley 44 de 1995 o {{pa.salarios-caidos-meses[antes-ley-44]}} si ya trabajabas antes.",
    "Indemnización: la del artículo 225 según cuándo empezaste ({{pa.indemnizacion-semanas[primeros-10-anios]}} semanas por año en los diez primeros años, o la escala anterior si empezaste antes de 1995).",
    "Recargo si el empleador no te reintegra: {{pa.recargo-no-reintegro[antes-ley-44]}} si ya trabajabas antes de la Ley 44, o {{pa.recargo-no-reintegro[desde-ley-44-sin-fondo]}} si entraste después y el empleador no está al día en el fondo de cesantía.",
  ],
  ejemplo: [
    "Con B/. 1,300 al mes, 8 años de trabajo desde 2016 y una sentencia a los ocho meses: salarios caídos B/. 3,900 (tope de tres meses), indemnización B/. 8,160 y, si el empleador no reintegra y no está al día en el fondo, recargo de B/. 2,040.",
  ],
  faq: [
    {
      pregunta: "¿Qué son los salarios caídos?",
      respuesta: "Los salarios que dejaste de cobrar desde el despido hasta la sentencia, cuando el despido resulta injustificado. Tienen un tope de meses.",
    },
    {
      pregunta: "¿Cuántos meses de salarios caídos me pagan?",
      respuesta: "Hasta {{pa.salarios-caidos-meses[desde-ley-44]}} si entraste a trabajar desde la Ley 44 de 1995, y hasta {{pa.salarios-caidos-meses[antes-ley-44]}} si ya trabajabas antes.",
    },
    {
      pregunta: "¿Cuándo hay recargo sobre la indemnización?",
      respuesta: "Cuando la sentencia ordena tu reintegro y el empleador prefiere terminar la relación pagando. El recargo depende de cuándo entraste y de si el empleador está al día en el fondo de cesantía.",
    },
    {
      pregunta: "¿En cuánto tiempo tienen que pagar?",
      respuesta: "El empleador tiene un mes desde que la sentencia queda ejecutoriada para reintegrarte o pagarte.",
    },
  ],
  glosario: [
    { termino: "Reintegro", definicion: "Volver a tu puesto en las mismas condiciones que tenías antes del despido." },
    { termino: "Sentencia ejecutoriada", definicion: "La decisión del juez que ya no se puede apelar." },
  ],
});
