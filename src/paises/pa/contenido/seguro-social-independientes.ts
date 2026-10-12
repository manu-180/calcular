import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.seguro-social-independientes",
  h1: "Calculadora del Seguro Social para independientes en Panamá",
  title: "Seguro Social para independientes en Panamá: tu cuota",
  description:
    "Si trabajas por tu cuenta en Panamá, pagas {{pa.css-independiente[ivm]}} de tu ingreso a la CSS para tu pensión y, si quieres salud, {{pa.css-independiente[enfermedad-maternidad]}} más. Calcula tu cuota.",
  intro: [
    "Los trabajadores independientes cotizan a la Caja de Seguro Social sobre el ingreso que declaran. La cuota de invalidez, vejez y muerte es del {{pa.css-independiente[ivm]}}. La de enfermedad y maternidad, del {{pa.css-independiente[enfermedad-maternidad]}}, es voluntaria.",
    "Escribe tu ingreso mensual y te mostramos la cuota del mes y del año.",
  ],
  comoSeCalcula: [
    "Invalidez, vejez y muerte: {{pa.css-independiente[ivm]}} del ingreso que declaras.",
    "Enfermedad y maternidad (si la eliges): {{pa.css-independiente[enfermedad-maternidad]}} del mismo ingreso.",
    "Cuota anual: la mensual por 12.",
  ],
  ejemplo: ["Con un ingreso de B/. 1,000 al mes: B/. 93.60 para pensión y B/. 85 para salud. Total B/. 178.60 al mes."],
  faq: [
    {
      pregunta: "¿Cuánto paga un independiente al Seguro Social en Panamá?",
      respuesta: "El {{pa.css-independiente[ivm]}} de su ingreso cotizable para invalidez, vejez y muerte. Si quiere atención de salud, suma el {{pa.css-independiente[enfermedad-maternidad]}}.",
    },
    {
      pregunta: "¿Es obligatorio cotizar como independiente?",
      respuesta: "La reforma de 2025 incluye a los independientes como cotizantes de la Caja. La cuota de salud es voluntaria.",
    },
    {
      pregunta: "¿Qué ingreso declaro?",
      respuesta: "Tu ingreso cotizable: lo que ganas por tus honorarios o tu actividad. La Caja fija reglas y un mínimo para declararlo.",
    },
  ],
  glosario: [
    { termino: "Trabajador independiente", definicion: "Quien trabaja por su cuenta, sin estar subordinado a un empleador." },
    { termino: "Ingreso cotizable", definicion: "El ingreso que declara el independiente para pagar su cuota." },
  ],
});
