import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.cuotas-igss",
  h1: "Calculadora de cuotas del IGSS",
  title: "Cuotas del IGSS 2026: laboral y patronal",
  description:
    "Calcule la cuota laboral del IGSS que le descuentan del salario y lo que paga su patrono al IGSS, al IRTRA y al INTECAP.",
  intro: [
    "Cada mes su patrono le descuenta del salario la cuota laboral del IGSS: {{gt.igss-laboral-ivs}} para invalidez, vejez y sobrevivencia más {{gt.igss-laboral-ema}} para enfermedad, maternidad y accidentes.",
    "El patrono, por su parte, paga su propia cuota al IGSS y los aportes al IRTRA y al INTECAP. Esos no se los descuentan a usted.",
  ],
  comoSeCalcula: [
    "Cuota laboral: salario × ({{gt.igss-laboral-ivs}} + {{gt.igss-laboral-ema}}).",
    "Cuota patronal: salario × ({{gt.igss-patronal-ivs}} + {{gt.igss-patronal-ema}}).",
    "IRTRA: salario × {{gt.irtra}}. INTECAP: salario × {{gt.intecap}}.",
    "El salario incluye horas extra y comisiones. La bonificación incentivo queda afuera.",
  ],
  ejemplo: ["Con un salario de Q10,000 le descuentan Q483 de IGSS. Su patrono paga Q1,067 al IGSS, Q100 al IRTRA y Q100 al INTECAP."],
  faq: [
    {
      pregunta: "¿Cuánto me descuentan de IGSS?",
      respuesta: "La suma de {{gt.igss-laboral-ivs}} y {{gt.igss-laboral-ema}} de su salario del mes. La bonificación incentivo no paga IGSS.",
    },
    {
      pregunta: "¿Las horas extra pagan IGSS?",
      respuesta: "Sí. Las horas extra, las comisiones y cualquier otro pago que sea salario entran en la base de la cuota.",
    },
    {
      pregunta: "¿El aguinaldo y el Bono 14 pagan IGSS?",
      respuesta: "No. Las leyes del aguinaldo y del Bono 14 los dejan libres de cuotas del IGSS.",
    },
    {
      pregunta: "¿Cómo sé si mi patrono paga mis cuotas?",
      respuesta: "Puede revisarlo en los servicios en línea del IGSS con su número de afiliación. Si le descuentan la cuota y no aparece, puede denunciarlo en el IGSS o en la Inspección General de Trabajo.",
    },
  ],
  glosario: [
    { termino: "IVS", definicion: "Programa de Invalidez, Vejez y Sobrevivencia del IGSS. De ahí sale la pensión." },
    { termino: "EMA", definicion: "Programa de Enfermedad, Maternidad y Accidentes del IGSS. Cubre la atención médica y los subsidios por suspensión." },
  ],
});
