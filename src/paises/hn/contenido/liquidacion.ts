import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.liquidacion",
  h1: "Cálculo de liquidación laboral en Honduras",
  title: "Liquidación laboral en Honduras: calcule todo lo que le toca",
  description: "Calcule su liquidación completa: preaviso, cesantía, vacaciones y décimo tercer y cuarto mes proporcionales, según cómo terminó el trabajo.",
  intro: [
    "Cuando termina un trabajo, el patrono tiene que pagarle una liquidación. Lo que incluye depende de cómo terminó: despido sin causa, renuncia o despido justificado.",
    "Esta calculadora suma todo en un solo número: preaviso, auxilio de cesantía, vacaciones y los décimos proporcionales.",
  ],
  comoSeCalcula: [
    "Salario diario = salario promedio de los últimos seis meses / 30.",
    "Despido sin causa: preaviso (si no se lo dieron), cesantía de un mes por año con tope de {{hn.cesantia-tope-meses[general]}} y vacaciones proporcionales del año en curso.",
    "Renuncia: sin preaviso ni cesantía, salvo con {{hn.cesantia-renuncia-anios}} o más, que cobra el {{hn.cesantia-renuncia-porcentaje}} de la cesantía.",
    "Siempre: vacaciones ganadas sin tomar y décimo tercer y cuarto mes proporcionales ({{hn.decimo-tercero}} del salario por año, en proporción a los días).",
  ],
  ejemplo: [
    "Gana L18,000 y lo despiden sin causa después de 4 años y 7 meses. Preaviso L36,000, cesantía L82,500, vacaciones proporcionales L7,038 y décimos L18,000. Total: L143,538.",
  ],
  faq: [
    {
      pregunta: "¿Qué me tienen que pagar si me despiden?",
      respuesta: "Si el despido es sin causa justificada: preaviso, auxilio de cesantía, vacaciones (las ganadas y la parte del año en curso) y los décimos proporcionales.",
    },
    {
      pregunta: "¿Qué me toca si renuncio?",
      respuesta: "Las vacaciones ganadas que no tomó y el décimo tercer y cuarto mes proporcionales. La cesantía solo si tiene {{hn.cesantia-renuncia-anios}} o más, y en ese caso el {{hn.cesantia-renuncia-porcentaje}}.",
    },
    {
      pregunta: "¿Y si me despiden con causa?",
      respuesta: "Pierde el preaviso y la cesantía, pero el patrono igual le debe lo ya ganado: vacaciones pendientes y décimos proporcionales.",
    },
    {
      pregunta: "¿En cuánto tiempo me tienen que pagar?",
      respuesta: "El pago se hace al terminar la relación. Si no le pagan, puede acudir a la Secretaría de Trabajo, que también tiene su propia calculadora.",
    },
    {
      pregunta: "¿La liquidación paga ISR?",
      respuesta: "No. Las prestaciones laborales no forman parte de la renta gravable.",
    },
  ],
  glosario: [
    { termino: "Liquidación", definicion: "El pago de todo lo que se le debe al trabajador cuando termina el contrato." },
    { termino: "Auxilio de cesantía", definicion: "La indemnización por años de servicio que se paga con un despido sin causa justificada." },
  ],
});
