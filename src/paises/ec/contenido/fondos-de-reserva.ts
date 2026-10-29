import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.fondos-de-reserva",
  h1: "Calculadora de fondos de reserva del IESS",
  title: "Fondos de reserva IESS {{anio}}: calcula tu {{ec.fondo-reserva}} mensual",
  description: "Calcula tus fondos de reserva: el {{ec.fondo-reserva}} de tu remuneración desde que cumples un año con el mismo empleador, mensualizado o acumulado en el IESS.",
  intro: [
    "El fondo de reserva es el {{ec.fondo-reserva}} de tu remuneración de cada mes, o sea, un sueldo por año. Te corresponde desde que cumples un año con el mismo empleador.",
    "Puedes cobrarlo cada mes junto con tu sueldo o pedir que se deposite en el IESS para ahorrarlo.",
  ],
  comoSeCalcula: [
    "Cada mes se calcula el {{ec.fondo-reserva}} de tu remuneración de aportación (sueldo, horas extra y comisiones).",
    "Se paga a partir del mes en que cumples un año con el mismo empleador. El primer año no se paga.",
    "Si lo cobras con el sueldo, el empleador te lo entrega cada mes. Si pediste acumularlo, lo deposita en el IESS con la planilla de aportes.",
  ],
  ejemplo: ["Ganas $1.000 al mes y llevas dos años en la empresa. Tu fondo de reserva es $83,30 al mes, $999,60 en un año."],
  faq: [
    {
      pregunta: "¿Desde cuándo tengo derecho al fondo de reserva?",
      respuesta: "Desde que cumples un año de trabajo con el mismo empleador. Si te vas antes y vuelves con el mismo empleador, se suma el tiempo anterior.",
    },
    {
      pregunta: "¿Cuánto es el fondo de reserva?",
      respuesta: "El {{ec.fondo-reserva}} de tu remuneración de aportación cada mes. En un año equivale a un sueldo.",
    },
    {
      pregunta: "¿Cómo se calculan los fondos de reserva mensualizados?",
      respuesta: "Multiplica tu remuneración del mes (sueldo, horas extra y comisiones) por {{ec.fondo-reserva}}. Con $1.000 al mes, son $83,30 que te pagan junto con el sueldo.",
    },
    {
      pregunta: "¿Cómo pido que lo acumule el IESS?",
      respuesta: "Desde la página del IESS, en la opción de fondos de reserva, con la solicitud de acumulación mensual. Desde ahí el empleador lo deposita en el IESS.",
    },
    {
      pregunta: "¿Cuándo puedo retirar los fondos acumulados en el IESS?",
      respuesta: "Con 36 aportaciones mensuales de fondo de reserva o más, puedes pedir la devolución total o parcial.",
    },
  ],
  glosario: [
    { termino: "Remuneración de aportación", definicion: "Lo que ganas en el mes y sobre lo que se calculan los aportes al IESS." },
    { termino: "IESS", definicion: "Instituto Ecuatoriano de Seguridad Social." },
  ],
});
