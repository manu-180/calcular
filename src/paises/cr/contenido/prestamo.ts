import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.prestamo",
  h1: "Calculadora de préstamos en Costa Rica",
  title: "Préstamos en Costa Rica: cuota mensual e intereses",
  description:
    "Calcule la cuota mensual de un préstamo personal, de carro o de vivienda, el total de intereses y lo que paga al final. Con la tasa básica pasiva del día.",
  intro: [
    "Antes de firmar un préstamo conviene saber cuánto va a pagar por mes y cuánto le cuesta en intereses.",
    "Escriba el monto, la tasa anual y el plazo. Le mostramos la cuota fija y, como referencia, la tasa básica pasiva del Banco Central.",
  ],
  comoSeCalcula: [
    "Tasa mensual: la tasa anual dividida entre 12.",
    "Cuota fija: monto × tasa mensual / (1 − (1 + tasa mensual) elevado a menos el número de cuotas).",
    "Total de intereses: la suma de todas las cuotas menos el monto prestado.",
  ],
  ejemplo: ["Un préstamo de ₡10.000.000 al 12 % anual a 60 meses tiene una cuota de ₡222.444,48 y paga ₡3.346.668,80 de intereses."],
  faq: [
    {
      pregunta: "¿La cuota incluye los seguros?",
      respuesta: "No. Las entidades suelen sumar seguros de vida, de desempleo o de la propiedad. Pida el detalle de la cuota total.",
    },
    {
      pregunta: "¿Qué es la tasa básica pasiva y por qué importa?",
      respuesta: "Es una tasa de referencia del Banco Central. Muchos préstamos en colones tienen tasa variable atada a ella: si sube, sube su cuota.",
    },
    {
      pregunta: "¿Conviene un plazo más largo?",
      respuesta: "La cuota baja, pero paga mucho más de intereses en total. Compare los dos números antes de decidir.",
    },
  ],
  glosario: [
    { termino: "Cuota fija", definicion: "Una cuota que no cambia mientras la tasa sea la misma: al inicio paga más intereses y al final más capital." },
    { termino: "Tasa variable", definicion: "Una tasa que se ajusta según una referencia, como la tasa básica pasiva." },
  ],
});
