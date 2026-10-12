import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.cesantia-por-pension",
  h1: "Cesantía al pensionarse en Costa Rica",
  title: "Cesantía por pensión en Costa Rica: cuánto le pagan",
  description:
    "Calcule la cesantía, las vacaciones y el aguinaldo que le paga su patrono cuando deja el trabajo para pensionarse por la CCSS u otro régimen.",
  intro: [
    "Si deja su trabajo para acogerse a la pensión, el contrato termina sin responsabilidad para usted y conserva sus derechos. El patrono le debe la cesantía, como en un despido sin justa causa.",
    "Escriba su salario promedio y las fechas para ver el monto.",
  ],
  comoSeCalcula: [
    "Salario diario: el promedio de los últimos seis meses entre {{cr.dias-mes-planilla}}.",
    "Cesantía: los días de la tabla del artículo 29 según su antigüedad, con un máximo de {{cr.cesantia-tope-anios}}.",
    "Vacaciones pendientes y aguinaldo proporcional, como en cualquier liquidación.",
  ],
  ejemplo: ["Con un salario de ₡1.200.000 y 26 años en la empresa, la cesantía es de 160 días: ₡6.400.000."],
  faq: [
    {
      pregunta: "¿Me pagan cesantía si me pensiono?",
      respuesta: "Sí. El artículo 85 del Código de Trabajo dice que pensionarse termina el contrato sin perder las prestaciones.",
    },
    {
      pregunta: "¿Tengo que dar preaviso para pensionarme?",
      respuesta: "La ley no lo pide en este caso. Igual conviene avisar al patrono con tiempo para coordinar la salida.",
    },
    {
      pregunta: "¿Por qué solo se pagan ocho años de cesantía?",
      respuesta: "El artículo 29 pone ese tope. Aunque haya trabajado 30 años, se pagan como máximo {{cr.cesantia-tope-anios}}.",
    },
  ],
  glosario: [
    { termino: "Cesantía", definicion: "Indemnización por los años trabajados, según la tabla del artículo 29." },
    { termino: "IVM", definicion: "El régimen de pensiones de la CCSS: Invalidez, Vejez y Muerte." },
  ],
});
