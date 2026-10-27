import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.aguinaldo",
  h1: "Calculadora de aguinaldo {{anio}}",
  title: "Calculadora de aguinaldo {{anio}}: cuánto te toca y el ISR",
  description:
    "Calcula tu aguinaldo {{anio}} completo o proporcional: mínimo {{mx.dias-aguinaldo}} de salario, la parte exenta y el ISR estimado. Pon tu sueldo y listo.",
  intro: [
    "El aguinaldo es de al menos {{mx.dias-aguinaldo}} de salario y te lo tienen que pagar antes del 20 de diciembre. Si no trabajaste el año completo, te toca la parte proporcional.",
    "Escribe tu sueldo y los días que trabajaste este año. Te mostramos el aguinaldo bruto, la parte que no paga ISR y lo que recibes.",
  ],
  comoSeCalcula: [
    "Se saca tu salario diario. Si te pagan al mes, se divide entre 30; si te pagan a la quincena, entre 15; si te pagan a la semana, entre 7.",
    "Ese salario diario se multiplica por los días de aguinaldo ({{mx.dias-aguinaldo}} como mínimo).",
    "Si trabajaste menos de un año, el resultado se multiplica por los días trabajados y se divide entre 365.",
    "Hasta {{mx.exencion-aguinaldo}} no paga ISR. Hoy una UMA vale {{mx.uma-diaria}}.",
    "Lo que pasa ese límite paga ISR. Lo estimamos sumándolo a tu sueldo del mes con la tarifa mensual del SAT.",
  ],
  ejemplo: [
    "Con un sueldo de 12,000 pesos al mes, tu salario diario es de 400 pesos. Por el año completo, con el mínimo de {{mx.dias-aguinaldo}}, son 6,000 pesos de aguinaldo bruto.",
    "Si entraste a mitad de año y llevas 180 días trabajados, te tocan 400 × 15 × 180 ÷ 365 = 2,958.90 pesos.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo me tienen que pagar el aguinaldo?",
      respuesta: "Antes del 20 de diciembre. Si lo pagan después, la empresa no cumple con la Ley Federal del Trabajo y puedes pedir ayuda gratis en la Procuraduría Federal de la Defensa del Trabajo (PROFEDET).",
    },
    {
      pregunta: "¿Cómo se calcula el aguinaldo proporcional?",
      respuesta: "Salario diario por los días de aguinaldo, por los días que trabajaste en el año, entre 365. Así se calcula si entraste o saliste a mitad de año.",
    },
    {
      pregunta: "¿Me toca aguinaldo si renuncié o me despidieron?",
      respuesta: "Sí. Te toca la parte proporcional a los días que trabajaste en el año, y se paga en tu finiquito.",
    },
    {
      pregunta: "¿Cuánto de mi aguinaldo no paga impuestos?",
      respuesta: "Hasta {{mx.exencion-aguinaldo}}. Con la UMA de hoy son {{mx.uma-diaria}} por cada UMA. Si ganas el salario mínimo, tu aguinaldo de ley no paga ISR.",
    },
    {
      pregunta: "¿Subió el aguinaldo a 30 días?",
      respuesta: "No. Hay propuestas en el Congreso, pero la ley vigente sigue pidiendo {{mx.dias-aguinaldo}} como mínimo. Si tu empresa da más, escribe tus días en la calculadora.",
    },
    {
      pregunta: "¿Se calcula con el sueldo bruto o con el neto?",
      respuesta: "Con el bruto, antes de descuentos. Se usa tu salario diario ordinario, sin horas extra ni bonos.",
    },
  ],
  glosario: [
    { termino: "Aguinaldo", definicion: "Pago anual obligatorio de al menos {{mx.dias-aguinaldo}} de salario (artículo 87 de la Ley Federal del Trabajo)." },
    { termino: "UMA", definicion: "Unidad de Medida y Actualización. La publica el INEGI y sirve para fijar límites de impuestos y multas." },
    { termino: "ISR", definicion: "Impuesto sobre la Renta. Tu empresa lo retiene de lo que te paga." },
  ],
});
