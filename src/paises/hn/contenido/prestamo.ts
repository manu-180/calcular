import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.prestamo",
  h1: "Calculadora de préstamos en Honduras",
  title: "Calculadora de préstamos: cuota mensual e intereses",
  description: "Calcule la cuota mensual de un préstamo personal, de vehículo o de vivienda en lempiras, el total de intereses y lo que paga al final.",
  intro: [
    "Antes de firmar un préstamo en un banco o una cooperativa, conviene saber cuánto va a pagar por mes y cuánto le cuesta en intereses.",
    "Escriba el monto, la tasa anual y el plazo. Le mostramos la cuota fija y el total a pagar.",
  ],
  comoSeCalcula: [
    "Tasa mensual = tasa anual / 12.",
    "Cuota fija = monto × tasa mensual / (1 − (1 + tasa mensual) elevado a menos el número de cuotas).",
    "Total de intereses = suma de todas las cuotas − monto prestado.",
  ],
  ejemplo: ["Un préstamo de L100,000 al 18 % anual a 36 meses tiene una cuota de L3,615.24 y paga L30,148.64 de intereses."],
  faq: [
    {
      pregunta: "¿La cuota incluye los seguros?",
      respuesta: "No. Los bancos suelen sumar seguros de vida, de daños o de desempleo. Pida el detalle de la cuota total antes de firmar.",
    },
    {
      pregunta: "¿Conviene un plazo más largo?",
      respuesta: "La cuota baja, pero paga mucho más de intereses en total. Compare los dos números antes de decidir.",
    },
    {
      pregunta: "¿Qué es la cuota fija?",
      respuesta: "Una cuota que no cambia mientras la tasa sea la misma. Al principio paga más intereses y al final más capital.",
    },
  ],
  glosario: [
    { termino: "Tasa anual", definicion: "El interés que cobra la entidad por año, antes de pasarlo a meses." },
    { termino: "Capital", definicion: "La parte de la cuota que devuelve el dinero prestado, sin los intereses." },
  ],
});
