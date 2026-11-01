import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.reforma-de-pensiones",
  h1: "Cotización del empleador por la reforma de pensiones",
  title: "Reforma de pensiones: cuánto paga el empleador en {{anio}}",
  description:
    "Calcula la cotización del empleador de la Ley 21.735: hoy {{cl.cotizacion-empleador-pensiones}} del sueldo imponible, con tope de {{cl.tope-imponible}}. Sube cada agosto.",
  intro: [
    "Con la reforma de pensiones (Ley 21.735), el empleador paga una cotización nueva sobre el sueldo imponible. No sale del sueldo de la persona: es un costo extra para la empresa.",
    "La tasa empezó en 1 % en agosto de 2025, es de {{cl.cotizacion-empleador-pensiones}} desde agosto de 2026 y sigue subiendo cada agosto.",
  ],
  comoSeCalcula: [
    "Se toma el sueldo imponible, con tope de {{cl.tope-imponible}} al mes.",
    "Se multiplica por la tasa vigente: {{cl.cotizacion-empleador-pensiones}}.",
    "Te mostramos también la próxima alza que ya está fija en la ley y cuánto sería con el mismo sueldo.",
  ],
  ejemplo: ["Por un sueldo de $1.000.000, en octubre de 2026 el empleador paga $35.000 al mes. Desde agosto de 2027 la tasa sube a 4,25 % y serán $42.500."],
  faq: [
    {
      pregunta: "¿La cotización de la reforma se descuenta de mi sueldo?",
      respuesta: "No. La paga el empleador encima de tu sueldo. Tu líquido no cambia.",
    },
    {
      pregunta: "¿A dónde va esa plata?",
      respuesta: "Una parte va a tu cuenta en la AFP, otra a una cotización con rentabilidad protegida y otra al Seguro Social, que también paga el seguro de invalidez y sobrevivencia (SIS).",
    },
    {
      pregunta: "¿Hasta cuánto sube?",
      respuesta: "La ley la sube cada agosto hasta 8,5 %. Desde agosto de 2029 el ritmo puede ser más lento si una evaluación externa de la recaudación lo indica.",
    },
    {
      pregunta: "¿Se paga también por trabajadoras de casa particular?",
      respuesta: "Sí. Rige para todos los trabajadores dependientes afiliados al sistema de AFP.",
    },
  ],
  glosario: [
    { termino: "Ley 21.735", definicion: "Reforma de pensiones de 2025. Crea la cotización del empleador y el Seguro Social." },
    { termino: "SIS", definicion: "Seguro de invalidez y sobrevivencia. Desde agosto de 2026 se financia dentro de esta cotización." },
  ],
});
