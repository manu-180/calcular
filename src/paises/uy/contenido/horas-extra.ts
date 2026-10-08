import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.horas-extra",
  h1: "Calculadora de horas extras en Uruguay",
  title: "Horas extras en Uruguay 2026: calculá cuánto te pagan",
  description:
    "Calculá tus horas extras con el recargo legal: {{uy.recargo-he-habil}} en días hábiles y {{uy.recargo-he-descanso}} en feriados o descanso. Para mensuales y jornaleros, gratis.",
  intro: [
    "En Uruguay la hora extra se paga con {{uy.recargo-he-habil}} de recargo en días hábiles (vale el doble) y con {{uy.recargo-he-descanso}} en feriados o en tu día de descanso (dos veces y media).",
    "Poné tu sueldo o el valor de tu hora y las horas que hiciste. Te mostramos cuánto vale cada una y el total.",
  ],
  comoSeCalcula: [
    "Si sos mensual, el valor de tu hora sale de dividir el sueldo entre las horas del mes. El decreto del salario mínimo usa 200 (25 jornales de 8 horas); tu laudo puede usar otro divisor.",
    "En día hábil se suma un {{uy.recargo-he-habil}} de recargo al valor de la hora.",
    "En feriado o día de descanso el recargo es de {{uy.recargo-he-descanso}}, siempre sobre el valor hora de los días comunes.",
    "Las fracciones de menos de media hora se pagan como media hora, y las de más, como una hora.",
  ],
  ejemplo: ["Con $ 50.000 por mes y divisor 200, tu hora vale $ 250. Una hora extra en día hábil vale $ 500 y en feriado, $ 625."],
  faq: [
    {
      pregunta: "¿Cómo se calcula el valor de la hora extra?",
      respuesta: "Dividís tu sueldo mensual entre las horas del mes (200 en el decreto del salario mínimo) y le sumás el recargo. Con $ 50.000, la hora vale $ 250 y la extra en día hábil, $ 500.",
    },
    {
      pregunta: "¿Las horas extras pagan aportes e IRPF?",
      respuesta: "Sí. Son salario, así que se suman al nominal del mes y pagan aportes e IRPF como el resto del sueldo.",
    },
    {
      pregunta: "¿Cuántas horas extra me pueden pedir?",
      respuesta: "Hasta 8 por semana, y solo si estás de acuerdo. El Ministerio de Trabajo puede autorizar excepciones.",
    },
    {
      pregunta: "¿Las horas extra cuentan para la licencia y el aguinaldo?",
      respuesta: "Sí. Tienen carácter salarial: suman para el aguinaldo y su promedio del año cuenta para la licencia y el salario vacacional.",
    },
    {
      pregunta: "¿Qué divisor uso si soy de comercio?",
      respuesta: "Depende de tu laudo y de tu jornada. Fijate en tu recibo o en el convenio de tu grupo del Consejo de Salarios cuál usan.",
    },
    {
      pregunta: "¿Trabajar un feriado pago es hora extra?",
      respuesta: "Las horas de tu jornada normal en un feriado pago se pagan con un recargo propio. Las que pasan esa jornada son horas extra con recargo de {{uy.recargo-he-descanso}}.",
    },
  ],
  glosario: [
    { termino: "Valor hora", definicion: "Lo que cobrás por una hora común de trabajo." },
    { termino: "Recargo", definicion: "Porcentaje que se suma al valor de la hora por ser extra." },
  ],
});
