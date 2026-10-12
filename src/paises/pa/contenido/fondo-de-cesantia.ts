import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.fondo-de-cesantia",
  h1: "Calculadora del fondo de cesantía en Panamá",
  title: "Fondo de cesantía en Panamá: calcula el aporte trimestral",
  description:
    "Calcula cuánto deposita el empleador cada trimestre en el fondo de cesantía en Panamá: la prima de antigüedad y el {{pa.fondo-cesantia-indemnizacion}} de la indemnización.",
  intro: [
    "En los contratos por tiempo indefinido, el empleador tiene que ir guardando en un fondo de cesantía la prima de antigüedad y una parte de la posible indemnización. Lo deposita cada trimestre en una administradora autorizada.",
    "Escribe el salario mensual (o el total de la planilla) y te mostramos el aporte del trimestre y del año.",
  ],
  comoSeCalcula: [
    "Prima: {{pa.prima-antiguedad-semanas}} semana de salario por año. En un trimestre, los salarios del trimestre divididos entre 52.",
    "Indemnización: el {{pa.fondo-cesantia-indemnizacion}} de la parte que corresponde a {{pa.indemnizacion-semanas[primeros-10-anios]}} semanas por año ({{pa.indemnizacion-semanas[desde-anio-11]}} semana desde el año 11).",
    "Aporte trimestral: la suma de las dos partes.",
  ],
  ejemplo: [
    "Con un salario de B/. 1,000: en el trimestre son B/. 3,000. Prima B/. 57.69 e indemnización B/. 9.81. Aporte B/. 67.50, el 2.25% de los salarios.",
  ],
  faq: [
    {
      pregunta: "¿Qué es el fondo de cesantía en Panamá?",
      respuesta: "Un fondo que el empleador arma durante la relación para pagar la prima de antigüedad y la indemnización cuando corresponda.",
    },
    {
      pregunta: "¿Cuánto aporta el empleador?",
      respuesta: "Toda la prima de antigüedad del período y el {{pa.fondo-cesantia-indemnizacion}} de la parte mensual de la indemnización. En los primeros diez años da cerca del 2.25% de los salarios.",
    },
    {
      pregunta: "¿Cuándo recibo ese dinero?",
      respuesta: "Lo de la prima, al terminar la relación por cualquier causa. Lo de la indemnización, si te despiden sin causa, si renuncias con causa justificada o si lo pactan por mutuo acuerdo.",
    },
    {
      pregunta: "¿Se le descuenta al trabajador?",
      respuesta: "No. Lo paga el empleador. El trabajador puede hacer aportes voluntarios si quiere.",
    },
  ],
  glosario: [
    { termino: "Fideicomiso", definicion: "La forma en que se guarda el fondo: lo administra una entidad autorizada, separada de la empresa." },
    { termino: "Trimestre", definicion: "Período de tres meses. El aporte se hace cada trimestre." },
  ],
});
