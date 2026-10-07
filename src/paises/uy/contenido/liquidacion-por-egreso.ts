import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.liquidacion-por-egreso",
  h1: "Calculadora de liquidación por egreso",
  title: "Liquidación por egreso: cuánto cobrás al irte",
  description:
    "Calculá tu liquidación por egreso con aguinaldo, licencia no gozada, salario vacacional y despido si corresponde. Con las tasas del BPS y la BPC de {{uy.bpc}}.",
  intro: [
    "Cuando termina un trabajo, por renuncia o por despido, se cobra una liquidación final. Siempre incluye el aguinaldo proporcional, la licencia no gozada y su salario vacacional.",
    "Si fue despido, además se suma la indemnización. Poné tus fechas y tu sueldo, y te mostramos cada partida.",
  ],
  comoSeCalcula: [
    "Aguinaldo: medio sueldo por semestre, en proporción a los días trabajados desde el 1 de diciembre o el 1 de junio.",
    "Licencia: los días generados en el año del egreso ({{uy.licencia-dias}} por año completo, más los de antigüedad) en proporción a los días trabajados, más lo que te quedó de años anteriores. Cada día vale el sueldo dividido 30.",
    "Salario vacacional: el {{uy.salario-vacacional}} del jornal líquido (sueldo menos aportes e IRPF, dividido 30) por los mismos días.",
    "Despido: un sueldo por año o fracción, hasta {{uy.despido-tope-meses}}, sobre el sueldo más la parte de aguinaldo y licencia.",
  ],
  ejemplo: [
    "Con $ 60.000 de sueldo, ingreso el 1/3/2023 y renuncia el 7/10/2026, cobrás $ 21.147,54 de aguinaldo, $ 30.680 de licencia (15,34 días) y $ 24.666,72 de salario vacacional: $ 76.494,26 en total.",
  ],
  faq: [
    {
      pregunta: "¿Si renuncio cobro algo?",
      respuesta: "Sí. La renuncia no te hace perder el aguinaldo proporcional, la licencia no gozada ni el salario vacacional. Lo único que no cobrás es la indemnización por despido.",
    },
    {
      pregunta: "¿Qué pasa si me despiden por notoria mala conducta?",
      respuesta: "La ley te quita la indemnización y el aguinaldo proporcional. La mala conducta la tiene que probar el empleador.",
    },
    {
      pregunta: "¿La liquidación paga aportes e IRPF?",
      respuesta: "El aguinaldo y la licencia pagan aportes e IRPF, y el salario vacacional paga IRPF. La indemnización legal por despido no paga ninguno de los dos.",
    },
    {
      pregunta: "¿Y la licencia del año pasado que no me tomé?",
      respuesta: "También se paga. Escribí esos días en el campo de licencia pendiente y los sumamos a los del año del egreso.",
    },
  ],
  glosario: [
    { termino: "Egreso", definicion: "El fin de la relación laboral, por renuncia, despido u otra causa." },
    { termino: "Licencia no gozada", definicion: "Días de licencia generados que no te tomaste. Al irte se pagan en dinero." },
  ],
});
