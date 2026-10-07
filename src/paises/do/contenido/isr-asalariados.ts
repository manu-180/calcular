import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.isr-asalariados",
  h1: "Calculadora de ISR para asalariados",
  title: "ISR asalariados 2026: calcula tu retención mensual",
  description: "Calcula cuánto ISR te retienen cada mes con la escala 2026 de la DGII. Puedes partir del salario bruto o del salario ya sin AFP ni SFS.",
  intro: [
    "Si trabajas en relación de dependencia, tu empleador te retiene el impuesto sobre la renta (ISR) cada mes y lo paga a la DGII.",
    "Aquí ves cuánto es, en qué tramo estás y cuánto sería en todo el año.",
  ],
  comoSeCalcula: [
    "Primero se restan los aportes a la TSS: SFS de {{do.sfs-trabajador}} y AFP de {{do.afp-trabajador}}.",
    "Lo que queda se multiplica por 12 para tener la renta anual.",
    "A esa renta se le aplica la escala del artículo 296 del Código Tributario. La primera parte está exenta y el resto paga 15 %, 20 % o 25 % según el tramo.",
    "El impuesto anual se divide entre 12. Esa es la retención de cada mes.",
  ],
  ejemplo: [
    "Si tu salario sin AFP ni SFS es RD$60,000, tu renta anual es RD$720,000. Te retienen RD$4,195.85 por mes, igual que en la tabla de la DGII.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el monto exento del ISR en 2026?",
      respuesta: "RD$416,220 al año, unos RD$34,685 por mes, después de restar SFS y AFP. La calculadora lo muestra con el valor vigente.",
    },
    {
      pregunta: "¿Qué cambia con la Ley 30-26?",
      respuesta: "Desde 2027 el monto exento sube a RD$480,000 al año y se agrega un tramo de 27 % para rentas muy altas. En 2026 todavía rige la escala actual.",
    },
    {
      pregunta: "¿Las horas extra pagan ISR?",
      respuesta: "Sí. Se suman a tu salario del mes. La regalía pascual, en cambio, no paga ISR.",
    },
    {
      pregunta: "¿Qué pasa si trabajo en dos empresas?",
      respuesta: "Tienes que elegir una sola como agente de retención y avisarlo con el formulario IR-10 de la DGII.",
    },
  ],
  glosario: [
    { termino: "Retención", definicion: "Parte del salario que el empleador descuenta y paga a la DGII a tu nombre." },
    { termino: "Renta neta gravable", definicion: "Lo que ganas en el año menos lo que la ley permite restar, como los aportes a la TSS." },
    { termino: "Tramo", definicion: "Cada escalón de la escala. Más renta, más alta la tasa de ese escalón." },
  ],
});
