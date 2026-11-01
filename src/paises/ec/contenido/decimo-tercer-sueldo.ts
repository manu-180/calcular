import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.decimo-tercer-sueldo",
  h1: "Calculadora del décimo tercer sueldo {{anio}}",
  title: "Décimo tercer sueldo {{anio}} Ecuador: calcula tu bono navideño",
  description: "Calcula tu décimo tercero: la doceava parte de lo ganado del 1 de diciembre al 30 de noviembre, acumulado o mensual. Se paga hasta el 24 de diciembre.",
  intro: [
    "El décimo tercer sueldo (o bono navideño) es la doceava parte de todo lo que ganaste del 1 de diciembre al 30 de noviembre. Si lo cobras acumulado, te lo pagan hasta el 24 de diciembre.",
    "Pon tu sueldo, los meses que trabajaste y lo que sumaste por horas extra o comisiones. La calculadora hace el resto.",
  ],
  comoSeCalcula: [
    "Se suma todo lo que ganaste del 1 de diciembre del año anterior al 30 de noviembre: sueldo, horas extra, comisiones y bonos habituales.",
    "Ese total se divide para 12. El resultado es tu décimo tercero.",
    "No entran los décimos, las utilidades, el fondo de reserva ni los viáticos ocasionales.",
    "Si lo cobras cada mes, recibes en tu rol de pagos la doceava parte de lo que ganas ese mes.",
  ],
  ejemplo: [
    "Ganas $800 al mes y trabajaste todo el período, sin horas extra. Tu décimo tercero es $800, o $66,67 cada mes si lo cobras mensualizado.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula el décimo tercero?",
      respuesta: "Suma todo lo que ganaste en el período (sueldo, horas extra y comisiones) y divídelo para 12. Con sueldo fijo y el año completo, es un sueldo entero.",
    },
    {
      pregunta: "¿Qué diferencia hay entre el décimo tercero y el décimo cuarto?",
      respuesta: "El décimo tercero depende de lo que ganas: es la doceava parte de tus ingresos del año. El décimo cuarto es igual para todos: un salario básico de {{ec.sbu}}.",
    },
    {
      pregunta: "¿Hasta cuándo se paga el décimo tercero?",
      respuesta: "Hasta el 24 de diciembre, si lo cobras acumulado. Si lo cobras cada mes, ya te llega en el rol de pagos.",
    },
    {
      pregunta: "¿Qué período cubre?",
      respuesta: "Del 1 de diciembre del año anterior al 30 de noviembre del año en que se paga.",
    },
    {
      pregunta: "¿Paga aportes al IESS o impuesto a la renta?",
      respuesta: "No. El décimo tercero no cuenta para los aportes al IESS, el fondo de reserva, las indemnizaciones ni el impuesto a la renta.",
    },
    {
      pregunta: "Trabajé solo unos meses, ¿me corresponde?",
      respuesta: "Sí. Cobras la doceava parte de lo que ganaste en los meses que trabajaste. Si te vas, te lo pagan en la liquidación.",
    },
  ],
  glosario: [
    { termino: "Décimo tercero", definicion: "Pago adicional de la doceava parte de lo ganado en el año (en la ley, decimotercera remuneración o bono navideño)." },
    { termino: "Rol de pagos", definicion: "El detalle mensual de lo que cobras y de los descuentos de tu sueldo." },
  ],
});
