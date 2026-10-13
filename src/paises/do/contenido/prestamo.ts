import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.prestamo",
  h1: "Calculadora de préstamos en República Dominicana",
  title: "Préstamos en República Dominicana: cuota e intereses",
  description: "Calcula la cuota mensual de un préstamo personal, de vehículo o hipotecario con cuota fija, y cuánto pagas de intereses en total.",
  intro: [
    "Antes de pedir un préstamo conviene saber cuánto vas a pagar cada mes y cuánto te cuesta en intereses.",
    "Pon el monto, la tasa anual y el plazo. La cuenta es la de cuota fija que usan bancos, asociaciones y cooperativas.",
  ],
  comoSeCalcula: [
    "La tasa anual se divide entre 12 para tener la tasa mensual.",
    "La cuota fija sale de la fórmula de amortización: monto por tasa mensual, dividido entre 1 menos (1 + tasa mensual) elevado al número de meses en negativo.",
    "Los intereses totales son la suma de las cuotas menos el monto prestado.",
  ],
  ejemplo: [
    "Un préstamo de RD$500,000 al 18 % anual a 36 meses tiene una cuota de RD$18,076.20. Pagas RD$150,743.12 de intereses.",
  ],
  faq: [
    { pregunta: "¿Cómo se calcula la cuota de un préstamo?", respuesta: "Con la fórmula de cuota fija: cada cuota paga los intereses del mes sobre lo que debes y una parte del capital." },
    { pregunta: "¿La cuota incluye seguros?", respuesta: "No. Los seguros de vida o de vehículo y las comisiones se suman aparte." },
    { pregunta: "¿Me conviene un plazo más largo?", respuesta: "La cuota baja, pero pagas más intereses en total. Compara el total a pagar." },
  ],
  glosario: [
    { termino: "Cuota fija", definicion: "El mismo pago todos los meses durante el préstamo." },
    { termino: "Amortización", definicion: "La parte de cada cuota que baja lo que debes." },
  ],
});
