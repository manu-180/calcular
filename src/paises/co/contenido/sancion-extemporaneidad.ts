import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.sancion-extemporaneidad",
  h1: "Calculadora de sanción por extemporaneidad",
  title: "Sanción por declarar renta tarde {{anio}}",
  description:
    "Calcula la sanción por presentar tarde una declaración: {{co.sancion-extemporaneidad[impuesto-mes]}} del impuesto por mes, con la sanción mínima de {{co.sancion-minima}} y las reducciones.",
  intro: [
    "Si presentas una declaración después del plazo, pagas una sanción por cada mes o fracción de mes de retraso. Si te pasas un día, ya cuenta como un mes.",
    "Cuando hay impuesto a cargo, la sanción sale del impuesto. Si no hay impuesto, sale de tus ingresos brutos. Nunca es menor a la sanción mínima.",
  ],
  comoSeCalcula: [
    "Con impuesto a cargo: {{co.sancion-extemporaneidad[impuesto-mes]}} del impuesto por cada mes de retraso, hasta el {{co.sancion-extemporaneidad[tope-impuesto]}} del impuesto.",
    "Sin impuesto a cargo: {{co.sancion-extemporaneidad[ingresos-mes]}} de los ingresos brutos por mes, hasta el menor entre el {{co.sancion-extemporaneidad[tope-ingresos]}} de los ingresos y el doble del saldo a favor (o {{co.sancion-tope-uvt}} si no hay saldo a favor).",
    "Reducción: si no cometiste la misma falta en los dos años anteriores, pagas el {{co.sancion-reduccion[dos-anios]}}; si no la cometiste en el año anterior, el {{co.sancion-reduccion[un-anio]}}.",
    "Sanción mínima: {{co.sancion-minima}}, aunque la sanción se haya reducido.",
  ],
  ejemplo: [
    "Si tu impuesto es de $20.000.000 y declaras con dos meses de retraso, la sanción es de $2.000.000. Si no habías declarado tarde en los dos años anteriores, pagas $1.000.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es la sanción mínima en 2026?",
      respuesta: "{{co.sancion-minima}}. Con la UVT de {{co.uvt}}, son $523.740.",
    },
    {
      pregunta: "¿Si me paso un solo día pago un mes entero?",
      respuesta: "Sí. La sanción se cuenta por mes o fracción de mes calendario de retraso.",
    },
    {
      pregunta: "¿Puedo pagar menos sanción?",
      respuesta: "Sí, si no habías cometido la misma falta antes y la DIAN no te ha enviado un emplazamiento ni un pliego de cargos. La sanción baja al 50 % o al 75 %.",
    },
    {
      pregunta: "¿Además de la sanción pago intereses?",
      respuesta: "Si hay impuesto por pagar, también se cobran intereses de mora sobre el impuesto, aparte de la sanción.",
    },
  ],
  glosario: [
    { termino: "Extemporaneidad", definicion: "Presentar una declaración después de la fecha límite." },
    { termino: "Saldo a favor", definicion: "Cuando lo que te retuvieron o anticipaste es más que el impuesto." },
  ],
});
