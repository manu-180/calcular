import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.prestacion-post-mortem",
  h1: "Calculadora de prestación post mortem en Guatemala",
  title: "Prestación post mortem en Guatemala: cuánto corresponde",
  description:
    "Calcule la prestación post mortem que el patrono paga a los familiares de un trabajador fallecido: un mes de salario por año trabajado, con tope.",
  intro: [
    "Cuando un trabajador fallece, el patrono tiene que pagar a sus familiares que dependían de él una prestación de {{gt.post-mortem-meses-por-anio}} de salario por cada año de servicio.",
    "El máximo depende del tamaño de la empresa: {{gt.post-mortem-tope-meses[20-o-mas]}} si tiene 20 trabajadores o más, y {{gt.post-mortem-tope-meses[menos-de-20]}} si tiene menos.",
  ],
  comoSeCalcula: [
    "Años completos de servicio, desde la fecha de ingreso hasta el fallecimiento.",
    "Meses de salario = años × {{gt.post-mortem-meses-por-anio}}, con el tope según la empresa.",
    "Prestación = salario mensual × meses.",
  ],
  ejemplo: ["Un trabajador con Q5,000 de salario y 3 años de servicio deja una prestación de Q15,000."],
  faq: [
    {
      pregunta: "¿Quién cobra la prestación post mortem?",
      respuesta: "Las personas que dependían económicamente del trabajador, como su cónyuge o conviviente y sus hijos. Lo demuestran ante un juzgado de trabajo con certificaciones del Registro Civil u otras pruebas.",
    },
    {
      pregunta: "¿Cómo se paga?",
      respuesta: "En mensualidades iguales al salario que ganaba el trabajador, hasta completar el total.",
    },
    {
      pregunta: "¿Qué pasa si el trabajador estaba en el IGSS?",
      respuesta: "Si sus familiares reciben pensión del IGSS, el patrono solo paga la diferencia cuando la pensión es menor que la prestación.",
    },
  ],
  glosario: [{ termino: "Post mortem", definicion: "Después de la muerte. Es la prestación que se paga a la familia del trabajador fallecido." }],
});
