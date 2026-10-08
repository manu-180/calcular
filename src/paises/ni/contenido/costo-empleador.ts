import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.costo-empleador",
  h1: "Cuánto cuesta un trabajador en Nicaragua",
  title: "Costo de un trabajador en Nicaragua: INSS patronal e INATEC",
  description: "Calculá cuánto le cuesta a tu empresa un salario en Nicaragua: INSS patronal del {{ni.inss-patronal[integral-menos-50]}} o más, {{ni.inatec}} de INATEC y la reserva del aguinaldo.",
  intro: [
    "Un trabajador le cuesta a la empresa su salario más las cargas del empleador: el INSS patronal, el aporte al INATEC y la reserva para pagar el aguinaldo en diciembre.",
    "Poné el salario bruto, el régimen del INSS y cuántos trabajadores tiene la empresa. Te mostramos el costo de cada mes y del año.",
  ],
  comoSeCalcula: [
    "INSS patronal en el régimen integral: {{ni.inss-patronal[integral-menos-50]}} del salario si la empresa tiene menos de 50 trabajadores y {{ni.inss-patronal[integral-50-o-mas]}} si tiene 50 o más.",
    "En el régimen IVM (sin enfermedad y maternidad) es {{ni.inss-patronal[ivm-menos-50]}} o {{ni.inss-patronal[ivm-50-o-mas]}}.",
    "Aporte al INATEC: {{ni.inatec}} del salario.",
    "Aguinaldo: {{ni.aguinaldo-meses}} de salario por año, que se reserva de a un doceavo por mes.",
    "No hay techo: el INSS se paga sobre todo el salario.",
  ],
  ejemplo: [
    "Con un salario de C$20,000 en el régimen integral y menos de 50 trabajadores: INSS patronal C$4,300, INATEC C$400 y aguinaldo C$1,666.67. El trabajador cuesta C$26,366.67 por mes.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto paga el empleador al INSS?",
      respuesta: "En el régimen integral, el {{ni.inss-patronal[integral-menos-50]}} del salario si la empresa tiene menos de 50 trabajadores y el {{ni.inss-patronal[integral-50-o-mas]}} si tiene 50 o más. Lo fija el artículo 11 del Reglamento de la Ley de Seguridad Social, reformado en 2019.",
    },
    {
      pregunta: "¿Qué diferencia hay entre el régimen integral y el IVM?",
      respuesta: "El integral suma la cobertura de enfermedad y maternidad. El IVM cubre invalidez, vejez, muerte y riesgos profesionales, y es más barato para el empleador.",
    },
    {
      pregunta: "¿Qué es el aporte al INATEC?",
      respuesta: "Es el {{ni.inatec}} de la planilla que paga cada empleador al Instituto Nacional Tecnológico para financiar la formación técnica.",
    },
    {
      pregunta: "¿Hay un salario máximo para el INSS?",
      respuesta: "No. Desde febrero de 2019 se cotiza sobre todo el salario, sin techo.",
    },
    {
      pregunta: "¿Por qué no aparecen las vacaciones?",
      respuesta: "Porque los días de vacaciones se pagan con el salario de siempre: no son un pago aparte mientras el trabajador las tome.",
    },
  ],
  glosario: [
    { termino: "INSS", definicion: "Instituto Nicaragüense de Seguridad Social." },
    { termino: "INATEC", definicion: "Instituto Nacional Tecnológico, que recibe el aporte de las empresas para la formación técnica." },
    { termino: "IVM", definicion: "Invalidez, vejez y muerte: el régimen del INSS sin la rama de enfermedad y maternidad." },
  ],
});
