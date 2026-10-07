import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.aportes-tss",
  h1: "Calculadora de aportes a la TSS",
  title: "Aportes a la TSS 2026: trabajador y empleador",
  description: "Calcula los aportes a la TSS de un salario: SFS, AFP y riesgos laborales, lo que paga el trabajador, lo que paga el empleador y los topes vigentes.",
  intro: [
    "Cada mes, trabajador y empleador pagan a la Tesorería de la Seguridad Social (TSS) por la salud, la pensión y los riesgos laborales.",
    "Esta calculadora separa lo que se descuenta del salario y lo que paga la empresa. Sirve para saber el costo real de un empleado.",
  ],
  comoSeCalcula: [
    "Seguro Familiar de Salud: {{do.sfs-trabajador}} el trabajador y {{do.sfs-empleador}} el empleador, hasta un salario de {{do.tope-sfs}}.",
    "Pensión (AFP): {{do.afp-trabajador}} el trabajador y {{do.afp-empleador}} el empleador, hasta {{do.tope-afp}}.",
    "Riesgos laborales: solo lo paga el empleador. Es {{do.srl-fijo}} fijo más un porcentaje según el riesgo de la empresa, hasta {{do.tope-srl}}.",
  ],
  ejemplo: [
    "Por un salario de RD$50,000 se descuentan RD$2,955 al trabajador. El empleador aporta RD$7,645 (con riesgo de 0.10 %). A la TSS van RD$10,600 en total.",
  ],
  faq: [
    {
      pregunta: "¿Quién paga los riesgos laborales?",
      respuesta: "Solo el empleador. Al trabajador no se le descuenta nada por ese seguro.",
    },
    {
      pregunta: "¿De dónde sale el porcentaje variable de riesgo?",
      respuesta: "Lo asigna el IDOPPRIL según la actividad de la empresa. Va de 0.10 % a 0.30 %.",
    },
    {
      pregunta: "¿Qué pasa si el salario pasa el tope?",
      respuesta: "Ese seguro se calcula solo hasta el tope. Cada seguro tiene su propio tope.",
    },
    {
      pregunta: "¿Este es todo el costo de un empleado?",
      respuesta: "No del todo. Faltan el aporte al INFOTEP, la regalía pascual, las vacaciones y la bonificación.",
    },
  ],
  glosario: [
    { termino: "TSS", definicion: "Tesorería de la Seguridad Social. Recauda los aportes del sistema." },
    { termino: "SRL", definicion: "Seguro de Riesgos Laborales. Cubre accidentes y enfermedades del trabajo." },
    { termino: "IDOPPRIL", definicion: "Instituto que administra el seguro de riesgos laborales." },
  ],
});
