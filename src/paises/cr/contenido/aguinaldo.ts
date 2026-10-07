import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.aguinaldo",
  h1: "Calculadora de aguinaldo en Costa Rica",
  title: "Aguinaldo 2026 en Costa Rica: calcule cuánto le toca",
  description:
    "Calcule su aguinaldo con la regla de la Ley 2412: la suma de lo ganado de diciembre a noviembre dividida entre 12. Con proporcional y horas extra.",
  intro: [
    "El aguinaldo es un salario extra que todo patrono privado tiene que pagar cada diciembre. Equivale a la doceava parte de lo que usted ganó en el año.",
    "Escriba su salario, los meses trabajados y, si tuvo, las horas extra o comisiones. Le mostramos el monto a recibir.",
  ],
  comoSeCalcula: [
    "Se suman todos los salarios ordinarios y extraordinarios del 1 de diciembre del año anterior al 30 de noviembre: salario base, horas extra, comisiones y bonos.",
    "Ese total se divide entre 12.",
    "Si trabajó menos de un año, recibe la parte proporcional, siempre que haya trabajado al menos un mes.",
    "El aguinaldo no paga renta ni cuotas de la Caja, y no se usa para calcular otras prestaciones.",
  ],
  ejemplo: [
    "Con un salario de ₡600.000 durante siete meses y medio, más ₡120.000 de horas extra, el total ganado es ₡4.620.000. Dividido entre 12, el aguinaldo es ₡385.000.",
  ],
  faq: [
    {
      pregunta: "¿Hasta cuándo tiene el patrono para pagar el aguinaldo?",
      respuesta: "Hasta el 20 de diciembre. La Ley 2412 dice que se paga dentro de los primeros veinte días de diciembre.",
    },
    {
      pregunta: "¿Las horas extra cuentan para el aguinaldo?",
      respuesta: "Sí. Entran los salarios ordinarios y los extraordinarios: horas extra, comisiones y bonos que formen parte del salario.",
    },
    {
      pregunta: "Me fui de la empresa en agosto. ¿Me pagan aguinaldo?",
      respuesta: "Sí, el proporcional. Se suma lo que ganó desde el 1 de diciembre hasta su salida y se divide entre 12. Se paga con la liquidación.",
    },
    {
      pregunta: "¿Al aguinaldo le rebajan la Caja o la renta?",
      respuesta: "No. La ley lo deja libre de impuesto sobre la renta y de cuotas de la CCSS, así que se recibe completo.",
    },
  ],
  glosario: [
    { termino: "Aguinaldo", definicion: "Pago anual equivalente a un mes de salario promedio, que se entrega en diciembre." },
    { termino: "Salario extraordinario", definicion: "Lo que se paga aparte del salario base, como horas extra o comisiones." },
  ],
});
