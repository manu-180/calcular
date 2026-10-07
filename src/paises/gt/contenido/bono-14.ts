import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.bono-14",
  h1: "Calculadora del Bono 14",
  title: "Calcular Bono 14 en Guatemala: cuánto le toca en julio",
  description:
    "Calcule su Bono 14 con las fechas exactas del período (1 de julio al 30 de junio) o la parte que le toca si dejó de trabajar. Según el Decreto 42-92.",
  intro: [
    "El Bono 14 es un salario extra que se paga cada año en la primera quincena de julio. Es aparte del aguinaldo.",
    "Si trabajó el año completo, del 1 de julio al 30 de junio, recibe un salario ordinario entero. Si trabajó menos, recibe la parte que corresponde a los días trabajados.",
  ],
  comoSeCalcula: [
    "Se toma el promedio de su salario ordinario mensual del período.",
    "Se cuentan los días trabajados entre el 1 de julio y el 30 de junio (o hasta su último día, si dejó de trabajar).",
    "Bono 14 = salario promedio × {{gt.bono-14}} × días trabajados / 365.",
  ],
  ejemplo: [
    "Entró a trabajar el 1 de enero de 2026 y gana Q3,600. Para el pago de julio de 2026 cuentan 181 días: 3,600 × 181 / 365 = Q1,785.21.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo se paga el Bono 14?",
      respuesta: "En la primera quincena de julio de cada año. Cubre el período del 1 de julio del año anterior al 30 de junio.",
    },
    {
      pregunta: "¿Me toca Bono 14 si renuncio o me despiden?",
      respuesta: "Sí. Sin importar la causa, el patrono tiene que pagarle la parte proporcional desde el 1 de julio anterior hasta su último día.",
    },
    {
      pregunta: "¿La bonificación incentivo entra en el cálculo?",
      respuesta: "No. El Bono 14 se calcula sobre el salario ordinario. La bonificación incentivo y las horas extra no se suman.",
    },
    {
      pregunta: "¿El Bono 14 paga ISR?",
      respuesta: "No, hasta el equivalente a un salario ordinario mensual. Así lo dice la Ley de Actualización Tributaria.",
    },
    {
      pregunta: "¿Es lo mismo que el aguinaldo?",
      respuesta: "No. Son dos prestaciones distintas y se pagan las dos: el Bono 14 en julio y el aguinaldo en diciembre y enero.",
    },
  ],
  glosario: [
    { termino: "Bono 14", definicion: "Bonificación anual obligatoria del Decreto 42-92, equivalente a un salario ordinario por año trabajado." },
    { termino: "Salario ordinario", definicion: "Lo que gana por su jornada normal, sin horas extra ni bonificación incentivo." },
  ],
});
