import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.impuesto-de-inmueble",
  h1: "Calculadora de impuesto de inmueble en Panamá",
  title: "Impuesto de inmueble en Panamá: calcula cuánto pagas",
  description:
    "Calcula el impuesto de inmueble en Panamá según el valor catastral, para tu vivienda principal u otros inmuebles. Con el descuento del {{pa.inmueble-descuento-pronto-pago}} si pagas en febrero.",
  intro: [
    "El impuesto de inmueble se paga cada año sobre el valor catastral (terreno y mejoras). La tarifa es progresiva: cada tramo del valor paga su propio porcentaje.",
    "Si es tu vivienda principal o patrimonio familiar tributario, la parte exenta es más alta. Escribe el valor y el uso del inmueble.",
  ],
  comoSeCalcula: [
    "Vivienda principal: 0% hasta B/. 120,000; 0.5% del excedente hasta B/. 700,000; 0.7% de lo que pase de B/. 700,000.",
    "Otros inmuebles (otras viviendas, comercios, terrenos): 0% hasta B/. 30,000; 0.6% hasta B/. 250,000; 0.8% hasta B/. 500,000; 1% de lo que pase.",
    "Se paga en tres partidas: hasta el 30 de abril, el 31 de agosto y el 31 de diciembre.",
    "Si pagas todo el año hasta el último día de febrero, tienes un {{pa.inmueble-descuento-pronto-pago}} de descuento.",
  ],
  ejemplo: [
    "Una vivienda principal con valor catastral de B/. 200,000 paga 0.5% sobre B/. 80,000: B/. 400 al año. Si pagas todo en febrero, B/. 360.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se paga de impuesto de inmueble en Panamá?",
      respuesta: "Depende del valor catastral y del uso. Una vivienda principal no paga hasta B/. 120,000 y después paga 0.5% del excedente. Otros inmuebles pagan desde B/. 30,000.",
    },
    {
      pregunta: "¿Cómo registro mi casa como vivienda principal?",
      respuesta: "Con una solicitud ante la Dirección General de Ingresos. La tarifa reducida se aplica desde que la aprueban.",
    },
    {
      pregunta: "¿Hay descuento por pagar por adelantado?",
      respuesta: "Sí. Si pagas todo el impuesto del año hasta el último día de febrero, tienes un {{pa.inmueble-descuento-pronto-pago}} de descuento.",
    },
    {
      pregunta: "¿Qué pasa si pago tarde?",
      respuesta: "La partida vencida lleva un recargo. Conviene pagar a tiempo o todo en febrero.",
    },
  ],
  glosario: [
    { termino: "Valor catastral", definicion: "El valor oficial de la finca (terreno y mejoras) que usa la Dirección General de Ingresos." },
    { termino: "Patrimonio familiar tributario", definicion: "Régimen que protege la vivienda de la familia y le da la tarifa reducida." },
  ],
});
