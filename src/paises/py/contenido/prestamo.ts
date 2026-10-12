import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.prestamo",
  h1: "Calculadora de cuota de préstamo",
  title: "Calculadora de préstamos en Paraguay: tu cuota mensual",
  description: "Calculá la cuota mensual de un préstamo en guaraníes, el total que vas a devolver y cuánto pagás de intereses. Con el sistema francés de cuota fija.",
  intro: [
    "Antes de pedir un préstamo conviene saber cuánto vas a pagar por mes y cuánto de intereses en total.",
    "Poné el monto, la tasa anual y el plazo. Calculamos la cuota fija del sistema francés, el que usan casi todos los bancos y financieras.",
  ],
  comoSeCalcula: [
    "La tasa anual se pasa a mensual dividiéndola por 12.",
    "La cuota fija sale de la fórmula del sistema francés: incluye una parte de capital y una de interés.",
    "Al principio pagás más interés y menos capital. Hacia el final, al revés.",
  ],
  ejemplo: ["Un préstamo de Gs. 10.000.000 al 24 % anual en 12 meses tiene una cuota de Gs. 945.596. Devolvés Gs. 11.347.152 en total."],
  faq: [
    {
      pregunta: "¿Cómo se calcula la cuota de un préstamo?",
      respuesta: "Con el sistema francés: una cuota fija que depende del monto, la tasa mensual y la cantidad de cuotas.",
    },
    {
      pregunta: "¿Qué tasa tengo que poner?",
      respuesta: "La tasa nominal anual que figura en la oferta. Si el banco te da la tasa mensual, multiplicala por 12.",
    },
    {
      pregunta: "¿La cuota del banco me va a dar igual?",
      respuesta: "Puede ser un poco mayor, porque suele sumar seguros y gastos. Pedí siempre el costo total del préstamo.",
    },
  ],
  glosario: [
    { termino: "Sistema francés", definicion: "Forma de pago con cuota fija durante todo el préstamo." },
    { termino: "Interés", definicion: "Lo que pagás por usar la plata prestada." },
  ],
});
