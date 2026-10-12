import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.desahucio",
  h1: "Calculadora de desahucio en Ecuador",
  title: "Desahucio Ecuador 2026: bonificación y plazos al renunciar",
  description: "Calcula la bonificación por desahucio ({{ec.desahucio}} de tu sueldo por año), tu último día con el aviso de {{ec.desahucio-aviso-dias}} y hasta cuándo te deben liquidar.",
  intro: [
    "El desahucio es el aviso por escrito con el que le dices a tu empleador que dejas el trabajo. Te da derecho a una bonificación por cada año que trabajaste.",
    "Pon la fecha en que empezaste, la del aviso y tu última remuneración. Te mostramos la bonificación, tu último día y la fecha límite para que te paguen.",
  ],
  comoSeCalcula: [
    "El aviso se entrega con al menos {{ec.desahucio-aviso-dias}} de anticipación. Se puede hacer por medios electrónicos.",
    "La bonificación es el {{ec.desahucio}} de tu última remuneración mensual por cada año completo de servicio.",
    "Los años se cuentan hasta tu último día de trabajo.",
    "El empleador tiene {{ec.desahucio-plazo-pago-dias}} desde el aviso para liquidarte la bonificación y lo demás que te debe.",
  ],
  ejemplo: [
    "Trabajaste 4 años y medio con un sueldo de $900. Cada año vale $225, así que la bonificación es $900.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me pagan de desahucio?",
      respuesta: "El {{ec.desahucio}} de tu última remuneración por cada año completo de trabajo con el mismo empleador.",
    },
    {
      pregunta: "¿Con cuánta anticipación tengo que avisar?",
      respuesta: "Con al menos {{ec.desahucio-aviso-dias}}. Si el empleador acepta, puedes salir antes.",
    },
    {
      pregunta: "¿Me pagan desahucio si tengo menos de un año?",
      respuesta: "No, porque no tienes un año completo. Igual te pagan los décimos y las vacaciones proporcionales.",
    },
    {
      pregunta: "¿Y si termino el contrato por acuerdo con mi empleador?",
      respuesta: "También te corresponde la misma bonificación del {{ec.desahucio}} por año.",
    },
    {
      pregunta: "¿Qué más me tienen que pagar al renunciar?",
      respuesta: "Los décimos que no cobraste y las vacaciones pendientes. La calculadora de liquidación suma todo.",
    },
  ],
  glosario: [
    { termino: "Desahucio", definicion: "El aviso escrito con el que la persona trabajadora termina el contrato." },
    { termino: "Bonificación por desahucio", definicion: "El pago del {{ec.desahucio}} de la última remuneración por año de servicio." },
  ],
});
