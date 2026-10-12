import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.seguro-facultativo",
  h1: "Calculadora del seguro facultativo del INSS",
  title: "Seguro facultativo del INSS: calculá tu cuota mensual",
  description: "Si trabajás por tu cuenta en Nicaragua, podés cotizar al INSS: {{ni.inss-facultativo[integral]}} en el facultativo integral y {{ni.inss-facultativo[ivm]}} en el IVM. Calculá tu cuota.",
  intro: [
    "El seguro facultativo es para quien no tiene empleador: trabajadores por cuenta propia o quienes dejaron de cotizar y quieren seguir sumando semanas para la pensión.",
    "Poné el ingreso por el que querés cotizar y la modalidad. Te mostramos la cuota mensual.",
  ],
  comoSeCalcula: [
    "Facultativo integral (salud y pensiones): {{ni.inss-facultativo[integral]}} del ingreso declarado.",
    "Facultativo IVM (solo pensiones de invalidez, vejez y muerte): {{ni.inss-facultativo[ivm]}}.",
    "El INSS aplica la tasa a la categoría de su tabla que corresponde a tu ingreso.",
  ],
  ejemplo: ["Con un ingreso de C$10,000 en el facultativo integral, la cuota es de C$2,225 al mes."],
  faq: [
    {
      pregunta: "¿Cuánto cuesta el seguro facultativo del INSS?",
      respuesta: "{{ni.inss-facultativo[integral]}} de tu ingreso declarado en el integral y {{ni.inss-facultativo[ivm]}} en el IVM.",
    },
    {
      pregunta: "¿Qué cubre el seguro facultativo integral?",
      respuesta: "Atención de salud, maternidad y las pensiones de invalidez, vejez y muerte. No cubre riesgos profesionales.",
    },
    {
      pregunta: "¿Sirve para completar las semanas de la jubilación?",
      respuesta: "Sí. Las cuotas del facultativo cuentan como semanas cotizadas para la pensión de vejez.",
    },
    {
      pregunta: "¿Tengo subsidio por enfermedad desde el primer mes?",
      respuesta: "No. Durante el primer año de inscripción no hay subsidios por enfermedad ni maternidad.",
    },
  ],
  glosario: [
    { termino: "Seguro facultativo", definicion: "La afiliación voluntaria al INSS de quien no tiene un empleador que lo inscriba." },
    { termino: "Categoría", definicion: "El tramo de ingreso de la tabla del INSS sobre el que se calcula la cuota." },
  ],
});
