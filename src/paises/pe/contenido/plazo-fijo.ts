import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.plazo-fijo",
  h1: "Calculadora de depósito a plazo fijo",
  title: "Plazo fijo en Perú 2026: calcula tus intereses con la TEA",
  description:
    "Calcula cuánto ganas en un depósito a plazo fijo con la TEA que te ofrece tu banco o caja. Incluye la cobertura del Fondo de Seguro de Depósitos ({{pe.fsd-cobertura}}).",
  intro: [
    "Un depósito a plazo fijo te paga intereses por dejar tu plata quieta un tiempo. En Perú los bancos y cajas te informan la tasa como TEA (tasa efectiva anual).",
    "Pon el monto, la TEA y el plazo en días. Te decimos cuánto ganas y si tu depósito queda cubierto por el Fondo de Seguro de Depósitos.",
  ],
  comoSeCalcula: [
    "La TEA se convierte al plazo de tu depósito con un año de 360 días: (1 + TEA) elevado a días entre 360.",
    "Al resultado se le resta 1 y se multiplica por el monto depositado: esos son tus intereses.",
    "El Fondo de Seguro de Depósitos cubre hasta {{pe.fsd-cobertura}} por persona en cada entidad que es miembro.",
  ],
  ejemplo: ["Depositas S/ 10,000 a 360 días con una TEA de 5 %. Al vencimiento recibes S/ 10,500: ganas S/ 500."],
  faq: [
    {
      pregunta: "¿Qué es la TEA?",
      respuesta: "La tasa efectiva anual: lo que gana tu depósito en un año, con los intereses ya capitalizados. Es la tasa que tienes que comparar entre bancos.",
    },
    {
      pregunta: "¿Mi plazo fijo está asegurado?",
      respuesta: "Si la entidad es miembro del Fondo de Seguro de Depósitos, tus depósitos están cubiertos hasta {{pe.fsd-cobertura}} por entidad. El monto se actualiza cada tres meses.",
    },
    {
      pregunta: "¿Qué pasa si retiro antes del plazo?",
      respuesta: "Depende del contrato. Lo común es que te paguen una tasa menor o pierdas parte de los intereses. Revisa la cartilla de información de tu banco.",
    },
  ],
  glosario: [
    { termino: "TEA", definicion: "Tasa efectiva anual: rendimiento de un año con capitalización incluida." },
    { termino: "FSD", definicion: "Fondo de Seguro de Depósitos: protege los depósitos de las personas si una entidad financiera quiebra." },
  ],
});
