import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.bonificacion-incentivo",
  h1: "Calculadora de bonificación incentivo en Guatemala",
  title: "Bonificación incentivo en Guatemala: cálculo por días",
  description: "Calcule la bonificación incentivo que le corresponde en el mes, completa o según los días trabajados. Se paga junto con el salario.",
  intro: [
    "La bonificación incentivo en Guatemala es un pago mensual obligatorio de {{gt.bonificacion-incentivo}} que se suma al salario de los trabajadores del sector privado.",
    "Si no trabajó el mes completo, le corresponde la parte proporcional a los días trabajados.",
  ],
  comoSeCalcula: ["Mes completo: {{gt.bonificacion-incentivo}}.", "Mes incompleto: {{gt.bonificacion-incentivo}} / 30 × días trabajados."],
  ejemplo: ["Si trabajó 15 días del mes, le corresponden Q125."],
  faq: [
    {
      pregunta: "¿Cuánto es la bonificación incentivo?",
      respuesta: "{{gt.bonificacion-incentivo}} al mes. Es el mínimo de ley: su patrono puede pagarle más.",
    },
    {
      pregunta: "¿La bonificación incentivo paga IGSS?",
      respuesta: "No. Tampoco paga IRTRA ni INTECAP. Sí cuenta como ingreso para el ISR.",
    },
    {
      pregunta: "¿Entra en el aguinaldo, el Bono 14 o la indemnización?",
      respuesta: "No. Esas prestaciones se calculan con el salario, sin la bonificación incentivo.",
    },
    {
      pregunta: "¿El salario mínimo incluye la bonificación incentivo?",
      respuesta: "No. La bonificación se paga aparte, encima del salario mínimo.",
    },
  ],
  glosario: [{ termino: "Bonificación incentivo", definicion: "Pago mensual obligatorio de los Decretos 78-89 y 37-2001, aparte del salario." }],
});
