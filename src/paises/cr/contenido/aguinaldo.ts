import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.aguinaldo",
  h1: "Calculadora de aguinaldo en Costa Rica",
  title: "Calculadora de aguinaldo Costa Rica 2026: cuánto le toca",
  description:
    "Calcule su aguinaldo 2026: sume lo ganado de diciembre a noviembre y divídalo entre 12. Con horas extra, comisiones y proporcional. Gratis y al instante.",
  intro: [
    "El aguinaldo en Costa Rica es la suma de todo lo que usted ganó del 1 de diciembre al 30 de noviembre, dividida entre 12. El patrono lo paga a más tardar el 20 de diciembre.",
    "Escriba su salario, los meses trabajados y, si tuvo, las horas extra o comisiones. Le mostramos cuánto aguinaldo le toca, completo o proporcional.",
  ],
  comoSeCalcula: [
    "Sume todos los salarios ordinarios y extraordinarios del 1 de diciembre del año anterior al 30 de noviembre: salario base, horas extra, comisiones y bonos.",
    "Divida ese total entre 12. El resultado es su aguinaldo.",
    "Si trabajó menos de un año, recibe el aguinaldo proporcional, siempre que haya trabajado al menos un mes.",
    "El aguinaldo no paga renta ni cuotas de la Caja, y no se usa para calcular otras prestaciones.",
  ],
  ejemplo: [
    "Con un salario de ₡600.000 durante siete meses y medio, más ₡120.000 de horas extra, el total ganado es ₡4.620.000. Dividido entre 12, el aguinaldo es ₡385.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo se paga el aguinaldo en Costa Rica?",
      respuesta: "Hasta el 20 de diciembre. La Ley 2412 dice que se paga dentro de los primeros veinte días de diciembre.",
    },
    {
      pregunta: "¿Cómo se calcula el aguinaldo proporcional?",
      respuesta: "Igual que el completo: se suma lo que ganó en los meses trabajados dentro del período y se divide entre 12. Hace falta al menos un mes de trabajo.",
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
    { termino: "Aguinaldo proporcional", definicion: "La parte del aguinaldo que corresponde cuando no se trabajó el período completo." },
  ],
});
