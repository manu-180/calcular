import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.tiempo-parcial",
  h1: "Calculadora de salario a tiempo parcial",
  title: "Salario a tiempo parcial en Paraguay: calculá tu mes",
  description: "Calculá tu salario a tiempo parcial ({{py.tiempo-parcial-horas[minimo]}} a {{py.tiempo-parcial-horas[maximo]}} semanales) con la hora mínima de {{py.minimos[hora-parcial]}} y el descuento del IPS.",
  intro: [
    "Un contrato a tiempo parcial es de {{py.tiempo-parcial-horas[minimo]}} a {{py.tiempo-parcial-horas[maximo]}} por semana. Se paga por hora trabajada, nunca por debajo de la hora mínima.",
    "La hora mínima a tiempo parcial es {{py.minimos[hora-parcial]}} de día y {{py.minimos[hora-parcial-nocturna]}} de noche.",
  ],
  comoSeCalcula: [
    "Tu hora es el salario mensual dividido {{py.divisor-jornal}} y dividido por las horas de la jornada ({{py.horas-jornada-diurna}} de día, {{py.horas-jornada-nocturna}} de noche).",
    "Si no pactaste un salario mayor, se usa la hora mínima.",
    "Se multiplica por las horas que trabajaste en el mes.",
    "Del bruto se descuenta el {{py.ips-trabajador}} de aporte al IPS.",
  ],
  ejemplo: ["Con 80 horas en el mes a la hora mínima diurna, cobrás Gs. 1.170.800 brutos. Después del IPS, Gs. 1.065.428."],
  faq: [
    {
      pregunta: "¿Cuánto es la hora mínima a tiempo parcial?",
      respuesta: "{{py.minimos[hora-parcial]}} de día y {{py.minimos[hora-parcial-nocturna]}} de noche, desde el {{py.minimos#desde}}.",
    },
    {
      pregunta: "¿Cuántas horas puede tener un contrato a tiempo parcial?",
      respuesta: "De {{py.tiempo-parcial-horas[minimo]}} a {{py.tiempo-parcial-horas[maximo]}} por semana. Si pasa del máximo, es un contrato de tiempo completo.",
    },
    {
      pregunta: "¿A tiempo parcial tengo aguinaldo, vacaciones e IPS?",
      respuesta: "Sí. Tenés los mismos derechos que a tiempo completo, incluida la bonificación familiar. El IPS se paga sobre lo que cobrás.",
    },
    {
      pregunta: "¿Puedo tener dos trabajos a tiempo parcial?",
      respuesta: "Sí. La ley no permite pactar exclusividad, y cada empleador aporta al IPS por su parte.",
    },
  ],
  glosario: [
    { termino: "Tiempo parcial", definicion: "Contrato de {{py.tiempo-parcial-horas[minimo]}} a {{py.tiempo-parcial-horas[maximo]}} semanales (Ley 6339/2019)." },
    { termino: "Hora mínima", definicion: "El valor más bajo que se puede pagar por hora, que fija el Ministerio de Trabajo cada año." },
  ],
});
