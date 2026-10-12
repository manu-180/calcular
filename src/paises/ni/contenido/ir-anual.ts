import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.ir-anual",
  h1: "Calculadora del IR anual de actividades económicas en Nicaragua",
  title: "IR anual de tu negocio en Nicaragua: calculá cuánto pagás",
  description: "Calculá el IR anual de tu negocio en Nicaragua con la tarifa del artículo 52 o la alícuota del {{ni.ir-actividades-alicuota}}, y comparalo con el pago mínimo definitivo.",
  intro: [
    "Si tenés un negocio o trabajás por tu cuenta en el régimen general, pagás IR sobre la renta neta del año. Con ingresos de hasta {{ni.ir-actividades-umbral}}, el porcentaje depende de un estrato.",
    "El IR que pagás es el mayor entre ese cálculo y el pago mínimo definitivo, que sale de tus ingresos brutos.",
  ],
  comoSeCalcula: [
    "Renta neta: tus ingresos del año menos los costos y gastos que la ley deja deducir.",
    "Con ingresos de hasta {{ni.ir-actividades-umbral}}, el porcentaje del estrato donde cae tu renta neta se aplica sobre toda ella. Con más ingresos, el {{ni.ir-actividades-alicuota}}.",
    "Pago mínimo definitivo: {{ni.pago-minimo[demas]}} de los ingresos brutos ({{ni.pago-minimo[principales]}} para los principales contribuyentes y {{ni.pago-minimo[grandes]}} para los grandes).",
    "Pagás el mayor de los dos, menos los anticipos y retenciones del año.",
  ],
  ejemplo: ["Un negocio con C$1 millón de ingresos y C$300,000 de renta neta paga el 20 %: C$60,000 de IR. El pago mínimo sería C$10,000, así que paga C$60,000."],
  faq: [
    {
      pregunta: "¿Cuánto IR paga un negocio en Nicaragua?",
      respuesta: "Con ingresos de hasta {{ni.ir-actividades-umbral}}, un porcentaje de la renta neta que sube por estratos hasta el {{ni.ir-actividades-alicuota}}. Con más ingresos, directamente el {{ni.ir-actividades-alicuota}}.",
    },
    {
      pregunta: "¿Qué es el pago mínimo definitivo?",
      respuesta: "Un piso del IR calculado sobre tus ingresos brutos. Si el IR sobre la renta neta da menos, pagás el pago mínimo.",
    },
    {
      pregunta: "¿Cuándo se declara el IR anual?",
      respuesta: "Hasta el último día del segundo mes después del cierre del período fiscal, que va de enero a diciembre: a fines de febrero.",
    },
    {
      pregunta: "¿El porcentaje se aplica por tramos?",
      respuesta: "No. En esta tabla el porcentaje del estrato se aplica sobre toda la renta neta, no solo sobre el excedente.",
    },
  ],
  glosario: [
    { termino: "Renta neta", definicion: "Lo que ganaste en el año: ingresos menos costos y gastos deducibles." },
    { termino: "Pago mínimo definitivo", definicion: "El IR mínimo que se paga según tus ingresos brutos, aunque tengas poca ganancia." },
  ],
});
