import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.suspension-igss",
  h1: "Calculadora de suspensión del IGSS",
  title: "Suspensión del IGSS: cuánto le pagan por enfermedad",
  description:
    "Calcule el subsidio que le paga el IGSS cuando lo suspende por enfermedad o accidente: pago por día, días cubiertos y total.",
  intro: [
    "Cuando el IGSS lo suspende por enfermedad o accidente, deja de recibir salario y el IGSS le paga un subsidio de dos tercios de su salario diario ({{gt.igss-subsidio-enfermedad}}).",
    "Los primeros días no los cubre el IGSS. En una enfermedad, el subsidio empieza al cumplirse {{gt.igss-subsidio-dia-inicio[enfermedad]}} de suspensión. En un accidente, al cumplirse {{gt.igss-subsidio-dia-inicio[accidente]}}.",
  ],
  comoSeCalcula: [
    "Salario diario = salario mensual / 30.",
    "Subsidio diario = salario diario × {{gt.igss-subsidio-enfermedad}}, con un mínimo de {{gt.igss-subsidio-minimo}} y un máximo de {{gt.igss-subsidio-maximo}} por día.",
    "Total = subsidio diario × días que cubre el IGSS.",
  ],
  ejemplo: ["Con Q4,500 de salario y 10 días de suspensión por enfermedad, el IGSS paga 7 días de Q100: Q700."],
  faq: [
    {
      pregunta: "¿Quién paga los primeros días de suspensión?",
      respuesta: "El IGSS no cubre los primeros días de una enfermedad. Pregunte en su trabajo si se los pagan. En un accidente, el día del accidente lo paga completo su patrono.",
    },
    {
      pregunta: "¿Cuándo me paga el IGSS la suspensión?",
      respuesta: "Cuando el IGSS tiene la documentación de la suspensión, incluido el certificado de trabajo que llena su patrono con su salario y sus cuotas. La forma de pago se la indica su unidad del IGSS.",
    },
    {
      pregunta: "¿Me pueden despedir mientras estoy suspendido?",
      respuesta: "Durante la suspensión su contrato sigue vigente, aunque no trabaje ni cobre salario. Si lo despiden sin causa justificada, le corresponde la indemnización como en cualquier despido.",
    },
  ],
  glosario: [
    { termino: "Suspensión", definicion: "Orden del IGSS para que no trabaje mientras se recupera. Durante ese tiempo recibe un subsidio." },
    { termino: "Subsidio", definicion: "Lo que paga el IGSS en lugar del salario mientras está suspendido." },
  ],
});
