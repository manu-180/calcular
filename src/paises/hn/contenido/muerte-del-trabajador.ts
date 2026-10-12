import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.muerte-del-trabajador",
  h1: "Prestaciones por muerte del trabajador en Honduras",
  title: "Muerte del trabajador en Honduras: qué cobra la familia",
  description: "Calcule lo que cobran los beneficiarios si el trabajador muere por causa natural: el {{hn.cesantia-fallecimiento-porcentaje}} de la cesantía y los décimos proporcionales.",
  intro: [
    "Si un trabajador muere por causa natural después de {{hn.cesantia-fallecimiento-meses}} de trabajo, sus beneficiarios cobran el {{hn.cesantia-fallecimiento-porcentaje}} de la cesantía que le hubiera tocado.",
    "También les corresponde lo ya ganado: el décimo tercer y cuarto mes proporcionales y las vacaciones pendientes.",
  ],
  comoSeCalcula: [
    "Cesantía completa: un mes de salario por año trabajado y la fracción en proporción, con tope de {{hn.cesantia-tope-meses[general]}}.",
    "Para los beneficiarios: cesantía completa × {{hn.cesantia-fallecimiento-porcentaje}}.",
    "Décimos: salario × días trabajados desde el 1 de enero (y desde el 1 de julio) / 365.",
  ],
  ejemplo: ["Ganaba L18,000 y falleció después de 4 años y 7 meses. Su familia cobra L61,875 de cesantía y L18,000 de décimos: L79,875."],
  faq: [
    {
      pregunta: "¿Qué le pagan a la familia si muere un trabajador?",
      respuesta: "El {{hn.cesantia-fallecimiento-porcentaje}} de la cesantía si trabajó más de {{hn.cesantia-fallecimiento-meses}}, más los décimos proporcionales y las vacaciones que no tomó.",
    },
    {
      pregunta: "¿Y si murió por un accidente de trabajo?",
      respuesta: "Entonces es un riesgo profesional, con su propia indemnización para el funeral y los dependientes. Calcúlela con la calculadora de accidente de trabajo.",
    },
    {
      pregunta: "¿En qué casos no se paga esta cesantía?",
      respuesta: "En una microempresa, o si el trabajador estaba cubierto contra el riesgo de muerte en el IHSS o en otro sistema donde aporta el patrono.",
    },
  ],
  glosario: [
    { termino: "Beneficiarios", definicion: "Las personas que cobran por el trabajador fallecido." },
    { termino: "Auxilio de cesantía", definicion: "La indemnización por años de servicio del artículo 120 del Código del Trabajo." },
  ],
});
