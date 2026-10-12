import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.trabajadoras-de-casa-particular",
  h1: "Calculadora para trabajadoras de casa particular",
  title: "Trabajadora de casa particular: IGSS, aguinaldo y Bono 14",
  description:
    "Calcule las cuotas del IGSS (PRECAPI) de una trabajadora de casa particular y su aguinaldo y Bono 14 del año.",
  intro: [
    "Las trabajadoras de casa particular tienen derecho a aguinaldo, Bono 14, vacaciones e indemnización, igual que cualquier trabajador. Además se pueden afiliar al IGSS con el programa especial PRECAPI.",
    "En el PRECAPI, el empleador paga {{gt.precapi-empleador}} y la trabajadora {{gt.precapi-trabajadora}}, calculados sobre el salario mínimo no agrícola.",
  ],
  comoSeCalcula: [
    "Base de las cuotas: salario mínimo no agrícola de la circunscripción donde está la casa.",
    "Cuota del empleador = base × {{gt.precapi-empleador}}. Cuota de la trabajadora = base × {{gt.precapi-trabajadora}}.",
    "Aguinaldo y Bono 14: un salario en dinero completo por año cada uno.",
  ],
  ejemplo: ["En el departamento de Guatemala, la base es {{gt.salario-minimo-mensual[no-agricola]@ce1}}. El empleador paga Q101.22 al mes y la trabajadora Q50.61."],
  faq: [
    {
      pregunta: "¿Qué cubre el PRECAPI del IGSS?",
      respuesta: "Maternidad, accidentes y control del niño sano para la trabajadora. Es un programa especial con menos coberturas que el régimen general.",
    },
    {
      pregunta: "¿Cuánto descanso le corresponde?",
      respuesta: "Por lo menos diez horas al día, de las cuales ocho de noche y seguidas, y dos para comer. Los domingos y feriados tiene seis horas más de descanso pagado.",
    },
    {
      pregunta: "¿La comida y la habitación cuentan como salario?",
      respuesta: "Sí, salvo que se pacte otra cosa. Para calcular el aguinaldo y el Bono 14 aquí se usa solo el salario en dinero.",
    },
    {
      pregunta: "¿Si la despiden le toca indemnización?",
      respuesta: "Sí. Si la despiden sin causa justificada le corresponde un salario por cada año trabajado, más lo proporcional de aguinaldo, Bono 14 y vacaciones.",
    },
  ],
  glosario: [
    { termino: "PRECAPI", definicion: "Programa Especial de Protección para Trabajadoras de Casa Particular del IGSS." },
    { termino: "Trabajadora de casa particular", definicion: "Quien hace labores de aseo, cuidado y demás propias de un hogar, de forma habitual, sin que generen negocio para el patrono." },
  ],
});
