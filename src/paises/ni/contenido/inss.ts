import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.inss",
  h1: "Calculadora del INSS laboral y patronal",
  title: "INSS en Nicaragua: calculá el aporte laboral y patronal",
  description: "Calculá cuánto se paga de INSS en Nicaragua: {{ni.inss-laboral[integral]}} del trabajador y {{ni.inss-patronal[integral-menos-50]}} o {{ni.inss-patronal[integral-50-o-mas]}} del empleador, más el {{ni.inatec}} del INATEC.",
  intro: [
    "Cada mes se paga al INSS una parte que se descuenta de tu salario (INSS laboral) y otra que pone el empleador (INSS patronal). El empleador paga además el {{ni.inatec}} al INATEC.",
    "Poné el salario bruto, el régimen y el tamaño de la empresa. Te mostramos cada aporte.",
  ],
  comoSeCalcula: [
    "INSS laboral: {{ni.inss-laboral[integral]}} en el régimen integral y {{ni.inss-laboral[ivm]}} en el régimen IVM.",
    "INSS patronal en el régimen integral: {{ni.inss-patronal[integral-menos-50]}} con menos de 50 trabajadores y {{ni.inss-patronal[integral-50-o-mas]}} con 50 o más.",
    "INSS patronal en el régimen IVM: {{ni.inss-patronal[ivm-menos-50]}} o {{ni.inss-patronal[ivm-50-o-mas]}}.",
    "INATEC: {{ni.inatec}} del salario, a cargo del empleador.",
  ],
  ejemplo: ["Con un salario de C$15,000 en el régimen integral y una empresa de menos de 50 trabajadores: C$1,050 de INSS laboral, C$3,225 de INSS patronal y C$300 de INATEC."],
  faq: [
    {
      pregunta: "¿Cuánto es el INSS laboral en Nicaragua?",
      respuesta: "{{ni.inss-laboral[integral]}} de tu salario bruto en el régimen integral. En el régimen IVM, {{ni.inss-laboral[ivm]}}.",
    },
    {
      pregunta: "¿Cuánto paga el empleador de INSS patronal?",
      respuesta: "En el régimen integral, {{ni.inss-patronal[integral-menos-50]}} si tiene menos de 50 trabajadores y {{ni.inss-patronal[integral-50-o-mas]}} si tiene 50 o más.",
    },
    {
      pregunta: "¿Hay un salario máximo para cotizar?",
      respuesta: "No. Desde el 1 de febrero de 2019 se cotiza sobre todo el salario, sin techo.",
    },
    {
      pregunta: "¿Qué diferencia hay entre el régimen integral y el IVM?",
      respuesta: "El integral cubre salud, maternidad, pensiones y riesgos profesionales. El IVM cubre invalidez, vejez, muerte y riesgos profesionales, sin la atención de salud.",
    },
    {
      pregunta: "¿El aguinaldo paga INSS?",
      respuesta: "No. El décimo tercer mes está exento de todo descuento.",
    },
  ],
  glosario: [
    { termino: "INSS", definicion: "Instituto Nicaragüense de Seguridad Social." },
    { termino: "INATEC", definicion: "Instituto Nacional Tecnológico. Recibe un aporte de las empresas para la formación técnica." },
    { termino: "IVM", definicion: "Invalidez, vejez y muerte: la parte del seguro social que paga las pensiones." },
  ],
});
