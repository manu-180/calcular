import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.riesgos-del-trabajo",
  h1: "Incapacidad del INS por riesgo del trabajo",
  title: "Incapacidad INS 2026: subsidio por accidente de trabajo",
  description:
    "Calcule el subsidio del INS por un accidente o enfermedad de trabajo: {{cr.riesgos-subsidio-inicial}} del salario los primeros {{cr.riesgos-dias-iniciales}} días, con el piso del salario mínimo.",
  intro: [
    "Si se accidenta o se enferma por su trabajo, la incapacidad la paga el INS con la póliza de riesgos del trabajo, no la Caja.",
    "Los primeros {{cr.riesgos-dias-iniciales}} días el INS paga el {{cr.riesgos-subsidio-inicial}} de su salario diario. Con jornada completa, nunca menos que el salario mínimo diario.",
  ],
  comoSeCalcula: [
    "Salario diario: el promedio de los tres meses anteriores al accidente, entre {{cr.dias-mes-planilla}}.",
    "Subsidio diario: {{cr.riesgos-subsidio-inicial}} del salario diario durante los primeros {{cr.riesgos-dias-iniciales}} días.",
    "Con jornada completa, el subsidio no baja de {{cr.salario-minimo-jornada[no-calificado]}} por día (salario mínimo de ocupación no calificada).",
    "Desde el día 46 el INS paga el 100 % hasta un tope reglamentario y el 67 % del exceso. Ese tramo no lo calculamos.",
  ],
  ejemplo: ["Con un salario de ₡1.500.000 y 60 días de incapacidad, el INS paga ₡30.000 por día los primeros 45 días: ₡1.350.000."],
  faq: [
    {
      pregunta: "¿Cuánto paga el INS en una incapacidad?",
      respuesta: "El {{cr.riesgos-subsidio-inicial}} del salario diario durante los primeros {{cr.riesgos-dias-iniciales}} días. Después sube: el 100 % hasta un tope y el 67 % del resto.",
    },
    {
      pregunta: "¿Desde qué día paga el INS?",
      respuesta: "Si su salario es mensual, quincenal o semanal en comercio, desde el día del accidente y hasta el alta médica.",
    },
    {
      pregunta: "¿Qué pasa si el patrono no tiene la póliza?",
      respuesta: "El INS igual lo atiende y le paga, y después le cobra al patrono todo lo que gastó.",
    },
  ],
  glosario: [
    { termino: "Riesgo del trabajo", definicion: "Un accidente o una enfermedad que ocurre por el trabajo o durante el trayecto." },
    { termino: "INS", definicion: "Instituto Nacional de Seguros, que administra la póliza de riesgos del trabajo." },
  ],
});
