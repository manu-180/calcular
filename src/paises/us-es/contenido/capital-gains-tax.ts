import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.capital-gains-tax",
  h1: "Calculadora del impuesto sobre ganancias de capital",
  title: "Impuesto sobre ganancias de capital 2026: 0%, 15% y 20%",
  description: "Calcula el impuesto federal por vender acciones, fondos o propiedades en 2026: tasas de 0%, 15% y 20%, corto plazo e impuesto de inversión de 3.8%.",
  intro: [
    "Cuando vendes una inversión por más de lo que pagaste, la ganancia es una ganancia de capital. Cómo se grava depende de cuánto tiempo la tuviste y del resto de tus ingresos.",
    "Escribe la ganancia, tus otros ingresos tributables y tu estado civil para ver el impuesto federal.",
  ],
  comoSeCalcula: [
    "Los bienes que tuviste más de un año pagan tasas de largo plazo. La ganancia se suma encima de tus otros ingresos tributables.",
    "La parte que cabe por debajo de {{us.cg-zero-max[single]}} de ingreso tributable total ({{us.cg-zero-max[mfj]}} en una declaración conjunta, {{us.cg-zero-max[hoh]}} para cabezas de familia) paga 0%.",
    "La parte hasta {{us.cg-15-max[single]}} ({{us.cg-15-max[mfj]}} en conjunto, {{us.cg-15-max[hoh]}} para cabezas de familia, {{us.cg-15-max[mfs]}} por separado) paga 15%. El resto paga 20%.",
    "Las ganancias a corto plazo pagan tus tasas normales: la calculadora compara el impuesto sobre tus ingresos con y sin la ganancia.",
    "Si tu AGI modificado pasa de {{us.niit-threshold[single]}} ({{us.niit-threshold[mfj]}} en conjunto), el impuesto sobre ingresos netos de inversión suma {{us.niit-rate}} sobre la ganancia o sobre el exceso de ingresos, lo que sea menor.",
  ],
  ejemplo: [
    "Una persona soltera con $40,000 de otros ingresos tributables vende acciones que tuvo tres años con una ganancia de $20,000. $9,450 caen en la franja de 0% y $10,550 pagan 15%. El impuesto es de $1,582.50.",
  ],
  faq: [
    { pregunta: "¿Cuáles son las tasas del impuesto sobre ganancias de capital en 2026?", respuesta: "0%, 15% o 20% para las ganancias a largo plazo, según tu ingreso tributable. Las ganancias a corto plazo pagan tus tasas normales, de 10% a 37%." },
    { pregunta: "¿Pago impuesto sobre ganancias de capital al vender mi casa?", respuesta: "Muchas veces no. Si fuiste dueño de la casa y viviste en ella dos de los últimos cinco años, se excluyen hasta $250,000 de ganancia, o $500,000 para matrimonios con declaración conjunta. Solo se grava lo que pase de eso." },
    { pregunta: "¿Las pérdidas pueden bajar mi impuesto?", respuesta: "Sí. Las pérdidas de capital compensan primero las ganancias. Si las pérdidas son mayores, hasta $3,000 al año ($1,500 si eres casado y declaras por separado) compensan otros ingresos y el resto pasa a años siguientes." },
  ],
  glosario: [
    { termino: "Base de costo", definicion: "Lo que pagaste por una inversión, más comisiones y mejoras. Tu ganancia es el precio de venta menos esto." },
    { termino: "Período de tenencia", definicion: "Cuánto tiempo fuiste dueño del bien. Más de un año hace que la ganancia sea a largo plazo." },
  ],
});
