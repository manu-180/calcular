import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.bono-de-antiguedad",
  h1: "Calculadora del bono de antigüedad 2026",
  title: "Bono de antigüedad Bolivia 2026: tabla y calculadora",
  description: "Calcule su bono de antigüedad 2026 con la escala del D.S. 21060 y el salario mínimo de {{bo.salario-minimo}}. Del 5 % con 2 años al 50 % con 25 años o más.",
  intro: [
    "El bono de antigüedad en Bolivia va del 5 % (con 2 años) al 50 % (con 25 años o más) y se calcula sobre el salario mínimo de {{bo.salario-minimo}}, no sobre su sueldo. Es un pago mensual que crece con los años de trabajo en el mismo lugar.",
    "Escriba su fecha de ingreso y elija el tipo de empleador.",
  ],
  comoSeCalcula: [
    "Primero se ven los años cumplidos y el porcentaje de la escala: de 2 a 4 años, 5 %; de 5 a 7, 11 %; de 8 a 10, 18 %; de 11 a 14, 26 %; de 15 a 19, 34 %; de 20 a 24, 42 %; de 25 en adelante, 50 %.",
    "La base son {{bo.bono-antiguedad-base-productiva}} salarios mínimos en las empresas productivas (D.S. 23474) y {{bo.bono-antiguedad-base-general}} salario mínimo en los demás casos, salvo que un convenio diga otra cosa.",
    "El bono es la base por el porcentaje. Con el salario mínimo de {{bo.salario-minimo}}, cada vez que el mínimo sube, el bono sube.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es la tabla del bono de antigüedad?",
      respuesta: "De 2 a 4 años, 5 %; de 5 a 7, 11 %; de 8 a 10, 18 %; de 11 a 14, 26 %; de 15 a 19, 34 %; de 20 a 24, 42 %; de 25 en adelante, 50 %.",
    },
    {
      pregunta: "¿Cómo se calcula el bono de antigüedad?",
      respuesta: "Se multiplica la base por el porcentaje de la tabla que le toca según sus años. La base es {{bo.bono-antiguedad-base-productiva}} salarios mínimos en empresas productivas y {{bo.bono-antiguedad-base-general}} salario mínimo en los demás casos.",
    },
    {
      pregunta: "¿Desde cuándo se cobra el bono de antigüedad?",
      respuesta: "Desde que cumple 2 años de trabajo continuo con el mismo empleador.",
    },
    {
      pregunta: "¿Sobre cuántos salarios mínimos se calcula?",
      respuesta: "En empresas productivas, sobre {{bo.bono-antiguedad-base-productiva}}. La guía del Ministerio de Trabajo habla de un salario mínimo en general. Si su empresa da servicios y no está seguro, consulte en la Jefatura de Trabajo o revise su convenio.",
    },
    {
      pregunta: "¿El bono de antigüedad subió en 2026?",
      respuesta: "Sí, porque el salario mínimo subió a {{bo.salario-minimo}} desde el {{bo.salario-minimo#desde}}. El empleador tenía que ajustarlo y pagar la diferencia desde enero.",
    },
  ],
  glosario: [
    { termino: "Bono de antigüedad", definicion: "Pago mensual por los años de trabajo continuo, calculado sobre el salario mínimo." },
    { termino: "Empresa productiva", definicion: "La que produce bienes, como una fábrica, una mina o una empresa agroindustrial." },
  ],
});
