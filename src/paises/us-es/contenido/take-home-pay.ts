import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.take-home-pay",
  h1: "Calculadora de cheque de pago",
  title: "Calculadora de cheque de pago 2026: sueldo neto",
  description: "Mira cuánto te queda en cada cheque de pago después del impuesto federal, el Seguro Social y Medicare de 2026, con 401(k) y seguro médico.",
  intro: [
    "Escribe tu salario y cada cuánto te pagan para ver lo que llega a tu cuenta después de los impuestos federales.",
    "El resultado usa los tramos de 2026, la deducción estándar de tu estado civil y la base salarial actual del Seguro Social de {{us.social-security-wage-base}}.",
  ],
  comoSeCalcula: [
    "Primero se descuentan las primas de salud antes de impuestos. Reducen tanto el impuesto sobre el ingreso como el FICA.",
    "Después se descuenta tu aporte al 401(k) tradicional, hasta el límite anual de {{us.401k-limit}}. Reduce el impuesto sobre el ingreso pero no el FICA.",
    "El impuesto federal se calcula sobre el salario anual que queda después de esos descuentos y de la deducción estándar de {{us.standard-deduction[single]}} para solteros o {{us.standard-deduction[mfj]}} para matrimonios con declaración conjunta.",
    "El Seguro Social toma {{us.social-security-rate}} de los salarios hasta {{us.social-security-wage-base}}. Medicare toma {{us.medicare-rate}} de todo el salario, más {{us.additional-medicare-rate}} sobre {{us.additional-medicare-threshold[single]}} para solteros ({{us.additional-medicare-threshold[mfj]}} en una declaración conjunta).",
    "Cada monto anual se divide entre la cantidad de cheques.",
  ],
  ejemplo: [
    "Una persona soltera que gana $60,000 al año, cobra cada dos semanas y ahorra 5% en un 401(k) recibe unos $1,836.54 por cheque. Cada cheque lleva $179.23 de impuesto federal, $143.08 de Seguro Social y $33.46 de Medicare.",
  ],
  faq: [
    { pregunta: "¿Por qué mi cheque real es un poco distinto?", respuesta: "Los empleadores retienen con el método de porcentaje del IRS de la Publicación 15-T y tu Formulario W-4, que reparte el impuesto en todo el año. Esta calculadora muestra tu impuesto federal anual dividido entre tus cheques, así que los dos números quedan cerca." },
    { pregunta: "¿Incluye los impuestos estatales?", respuesta: "No. Los impuestos estatales y locales sobre el ingreso dependen de dónde vives y trabajas. Nueve estados no cobran impuesto sobre los salarios y otros cobran varios puntos más." },
    { pregunta: "¿Cuándo deja de descontarse el Seguro Social?", respuesta: "Cuando tus salarios del año pasan de {{us.social-security-wage-base}}, ya no se descuenta Seguro Social. El impuesto de Medicare no tiene tope." },
    { pregunta: "¿Un Roth 401(k) baja mis impuestos?", respuesta: "No. Los aportes Roth se descuentan después de impuestos. En el campo del 401(k) pon solo aportes tradicionales (antes de impuestos)." },
  ],
  glosario: [
    { termino: "FICA", definicion: "Los impuestos del Seguro Social y Medicare que se descuentan de cada cheque." },
    { termino: "Pago bruto", definicion: "Tu pago antes de cualquier impuesto o descuento." },
    { termino: "Descuento antes de impuestos", definicion: "Dinero que se toma de tu pago antes de calcular los impuestos, como los aportes al 401(k) tradicional." },
  ],
});
