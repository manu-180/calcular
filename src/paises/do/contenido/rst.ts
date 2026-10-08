import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.rst",
  h1: "Calculadora del RST basado en ingresos",
  title: "RST 2026 en RD: calcula el impuesto del régimen simplificado",
  description:
    "Calcula cuánto pagas en el Régimen Simplificado de Tributación (RST) basado en ingresos, como persona física o como empresa, con el tope vigente de la DGII.",
  intro: [
    "El Régimen Simplificado de Tributación (RST) es una forma más sencilla de pagar impuestos para profesionales, oficios y pequeñas empresas. En la modalidad basada en ingresos, el impuesto sale de lo que facturaste en el año.",
    "Elige si declaras como persona física o como empresa y escribe tus ingresos brutos del año. Te mostramos el impuesto y el tope de ingresos para poder estar en el régimen ({{do.rst-tope-ingresos}} en el año).",
  ],
  comoSeCalcula: [
    "Persona física: a los ingresos del año se les resta {{do.rst-reduccion-ingresos}}. Lo que queda es la renta neta imponible.",
    "A esa renta se le aplica la escala anual del ISR. La primera parte está exenta (es la exención contributiva) y el resto paga 15 %, 20 % o 25 % según el tramo.",
    "Persona jurídica: se paga {{do.rst-tasa-juridicas}} de los ingresos brutos del año. Ese pago cubre el ISR y el ITBIS juntos.",
    "Si tus ingresos superan el tope, no puedes acogerte ni seguir en el RST basado en ingresos.",
  ],
  ejemplo: [
    "Una profesional que facturó RD$2,000,000 tiene una renta neta de RD$1,200,000 y paga RD$162,995.25 de ISR en el año. Una empresa con los mismos ingresos paga RD$140,000 de ISR e ITBIS.",
  ],
  faq: [
    {
      pregunta: "¿Quién puede usar el RST basado en ingresos?",
      respuesta:
        "Personas físicas que viven de servicios profesionales u oficios independientes (exentos de ITBIS o con el ITBIS retenido completo) y empresas que prestan servicios o producen bienes, siempre que no pasen el tope de ingresos del año.",
    },
    {
      pregunta: "¿Qué pasa si además tengo un empleo?",
      respuesta:
        "Tu salario no se suma a la renta del RST, pero cuenta para el tope de ingresos. Si en tu empleo ya usaste la exención contributiva, la DGII solo te deja la parte que te queda. Este cálculo supone que no cobras salario.",
    },
    {
      pregunta: "¿Cuándo se paga?",
      respuesta: "Se declara una vez al año. La DGII divide el pago en cuotas: dos para personas físicas y cuatro para empresas.",
    },
    {
      pregunta: "¿Cambia algo con la Ley 30-26?",
      respuesta:
        "Sí. La Ley 30-26 crea un nuevo RST, que empieza a aplicarse cuando la DGII emita su reglamento. Hasta entonces rige el régimen del Decreto 265-19, que es el que usa este cálculo.",
    },
    {
      pregunta: "¿Y el RST basado en compras?",
      respuesta: "Es para comercios que venden bienes. El impuesto sale de un margen sobre las compras que depende de la actividad. Esta calculadora no lo cubre.",
    },
  ],
  glosario: [
    { termino: "RST", definicion: "Régimen Simplificado de Tributación de la DGII." },
    { termino: "Exención contributiva", definicion: "Parte de la renta anual de una persona física que no paga ISR." },
    { termino: "Renta neta imponible", definicion: "La parte de los ingresos sobre la que se calcula el impuesto." },
  ],
});
