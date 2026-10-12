import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.semana-corrida",
  h1: "Calculadora de semana corrida",
  title: "Semana corrida: calcula el pago de domingos y festivos",
  description: "Calcula tu semana corrida: el pago de domingos y festivos si ganas comisiones, tratos o por día. Con la fórmula del artículo 45 del Código del Trabajo.",
  intro: [
    "Si parte de tu sueldo es variable (comisiones, tratos o pago por día), tienes derecho a que te paguen los domingos y festivos. Eso se llama semana corrida.",
    "Escribe lo variable que ganaste en el período, los días que debías trabajar y los domingos y festivos. Te decimos cuánto te corresponde.",
  ],
  comoSeCalcula: [
    "Se suma lo variable que ganaste en el período de pago. No entran el sueldo base, la gratificación ni los bonos ocasionales.",
    "Se divide por los días que debías trabajar según tu jornada. Ese es tu promedio diario.",
    "El promedio diario se multiplica por los domingos y festivos del período.",
  ],
  ejemplo: ["Ganaste $440.000 en comisiones en un mes con 22 días de trabajo y 4 domingos. Tu promedio diario es $20.000, así que la semana corrida es $80.000."],
  faq: [
    {
      pregunta: "¿Quién tiene derecho a semana corrida?",
      respuesta: "Quien gana solo por día, y quien tiene sueldo mensual más una parte variable (comisiones o tratos). En ese caso se calcula solo sobre lo variable.",
    },
    {
      pregunta: "¿Se paga aunque falte un día?",
      respuesta: "El promedio se calcula sobre los días que debías trabajar según la ley, no sobre los que trabajaste. Si faltaste, tu variable baja y el promedio también.",
    },
    {
      pregunta: "¿Qué pasa si mi jornada es de 6 días?",
      respuesta: "Pones los días que debías trabajar con esa jornada. El cálculo es el mismo.",
    },
    {
      pregunta: "¿La semana corrida es imponible?",
      respuesta: "Sí. Es remuneración, así que paga cotizaciones e impuesto como el resto del sueldo.",
    },
  ],
  glosario: [
    { termino: "Semana corrida", definicion: "Pago de domingos y festivos para quien gana por día o con una parte variable." },
    { termino: "Remuneración variable", definicion: "Lo que cambia de un mes a otro según ventas o producción, como comisiones o tratos." },
  ],
});
