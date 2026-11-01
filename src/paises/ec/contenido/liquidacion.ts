import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.liquidacion",
  h1: "Calculadora de liquidación laboral en Ecuador",
  title: "Liquidación Ecuador {{anio}}: calcula por renuncia o despido",
  description: "Calcula tu liquidación por renuncia o despido intempestivo: desahucio del {{ec.desahucio}} por año, indemnización, décimos y vacaciones. Gratis y paso a paso.",
  intro: [
    "La liquidación laboral en Ecuador suma lo que te deben al terminar el trabajo: desahucio, indemnización por despido intempestivo si te despidieron, décimos proporcionales y vacaciones. Lo que entra depende de cómo terminó la relación laboral.",
    "Pon tus fechas, tu última remuneración y el motivo de salida. La calculadora suma desahucio, despido, décimos y vacaciones.",
  ],
  comoSeCalcula: [
    "Bonificación por desahucio: el {{ec.desahucio}} de tu última remuneración por cada año completo de servicio. Se paga si renuncias con aviso escrito, si terminan por acuerdo y también si te despiden.",
    "Despido intempestivo: con hasta {{ec.despido-anios-base}} de servicio, {{ec.despido-meses-minimo}} de remuneración. Con más, un mes por año (la fracción de año cuenta como año completo), hasta {{ec.despido-meses-maximo}}.",
    "Décimos: si los cobrabas acumulados, te pagan la parte proporcional del décimo tercero y del décimo cuarto. Si los cobrabas cada mes, no queda nada pendiente.",
    "Vacaciones: la parte proporcional desde tu último aniversario, más los días de años anteriores que no tomaste.",
  ],
  ejemplo: [
    "Te despiden después de 5 años y 6 meses con un sueldo de $1.000. Te corresponden $1.250 de desahucio, $6.000 de despido (6 meses) y $290,37 de vacaciones. En total, $7.540,37.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me corresponde de liquidación si renuncio?",
      respuesta: "Si renuncias con desahucio (aviso escrito), te pagan el {{ec.desahucio}} de tu última remuneración por cada año completo, más los décimos proporcionales y las vacaciones pendientes. No hay indemnización por despido.",
    },
    {
      pregunta: "¿Qué es el desahucio?",
      respuesta: "Es el aviso por escrito con el que le dices a tu empleador que dejas el trabajo, con al menos quince días de anticipación. Te da derecho a la bonificación del {{ec.desahucio}} por año.",
    },
    {
      pregunta: "¿Cuánto me pagan si me despiden sin causa?",
      respuesta: "{{ec.despido-meses-minimo}} de remuneración si trabajaste hasta {{ec.despido-anios-base}}. Si trabajaste más, un mes por cada año, con un máximo de {{ec.despido-meses-maximo}}. Además cobras la bonificación por desahucio.",
    },
    {
      pregunta: "¿Qué remuneración se usa para el despido?",
      respuesta: "La que estabas cobrando al momento del despido. Si el mes anterior cobraste más, se usa la mejor de las dos.",
    },
    {
      pregunta: "¿En cuánto tiempo me tienen que pagar?",
      respuesta: "Si renunciaste con desahucio, el empleador tiene quince días desde el aviso para liquidar tus valores.",
    },
    {
      pregunta: "¿Y si el empleador terminó el contrato por visto bueno?",
      respuesta: "Si el inspector del trabajo aprobó el visto bueno, no hay bonificación por desahucio ni indemnización por despido. Igual te pagan los décimos y las vacaciones pendientes.",
    },
  ],
  glosario: [
    { termino: "Despido intempestivo", definicion: "Cuando el empleador te despide sin una causa legal." },
    { termino: "Desahucio", definicion: "El aviso escrito con el que la persona trabajadora termina el contrato." },
    { termino: "Visto bueno", definicion: "El trámite ante el inspector del trabajo para terminar el contrato por una causa legal." },
    { termino: "Liquidación", definicion: "Todo lo que te deben pagar al terminar la relación laboral." },
  ],
});
