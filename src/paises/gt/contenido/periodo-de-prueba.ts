import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.periodo-de-prueba",
  h1: "Calculadora del período de prueba en Guatemala",
  title: "Período de prueba en Guatemala: cuándo termina",
  description:
    "Calcule cuándo termina su período de prueba y cuántos días le faltan. Mientras dura, el contrato se puede terminar sin aviso ni indemnización.",
  intro: [
    "En los contratos por tiempo indefinido, los primeros {{gt.periodo-prueba-meses}} son de prueba, salvo que se pacte un período más corto.",
    "Durante ese tiempo usted o su patrono pueden terminar el contrato sin dar aviso y sin pagar indemnización.",
  ],
  comoSeCalcula: [
    "Fin del período de prueba = fecha de ingreso + {{gt.periodo-prueba-meses}}, menos un día.",
    "Días que faltan = desde hoy hasta ese día, contando los dos.",
  ],
  ejemplo: ["Si empezó el 12 de octubre de 2026, su período de prueba termina el 11 de diciembre de 2026."],
  faq: [
    {
      pregunta: "¿Cuánto dura el período de prueba en Guatemala?",
      respuesta: "Hasta {{gt.periodo-prueba-meses}}. Se puede pactar uno más corto, pero no uno más largo.",
    },
    {
      pregunta: "¿Si me despiden en el período de prueba, me pagan algo?",
      respuesta: "No le toca indemnización, pero sí el salario de los días trabajados y la parte proporcional de aguinaldo, Bono 14 y vacaciones.",
    },
    {
      pregunta: "¿El período de prueba paga IGSS?",
      respuesta: "Sí. Desde el primer día es una relación de trabajo con todas las obligaciones, incluida la afiliación al IGSS.",
    },
  ],
  glosario: [{ termino: "Período de prueba", definicion: "Los primeros meses de un contrato indefinido, en los que cualquiera de las partes lo puede terminar sin responsabilidad." }],
});
