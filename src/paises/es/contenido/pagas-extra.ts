import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.pagas-extra",
  h1: "Calculadora de pagas extra",
  title: "Pagas extra: cuánto cobras y cómo se prorratean",
  description:
    "Calcula el importe de tu paga extra de verano o de Navidad, la parte proporcional si no trabajaste el periodo entero y cuánto suma al mes si van prorrateadas.",
  intro: [
    "Por ley tienes derecho a {{es.pagas-extra-minimo}} gratificaciones extraordinarias al año: una en Navidad y otra cuando diga tu convenio, normalmente en verano.",
    "Tu convenio puede repartirlas en las doce nóminas (prorrateadas). Al año cobras lo mismo; solo cambia cuándo.",
  ],
  comoSeCalcula: [
    "Divide tu sueldo bruto anual entre el número total de pagas (12 mensualidades más las extra). Eso es cada paga.",
    "Si no trabajaste todo el periodo en el que se genera la paga, cobras la parte proporcional: paga por meses trabajados entre los meses del periodo.",
    "Si las tienes prorrateadas, cada nómina lleva una parte: el importe de las pagas extra del año dividido entre 12.",
  ],
  ejemplo: [
    "Con 25.000 euros brutos al año en 14 pagas, cada paga extra es de 1.785,71 euros. Si las prorrateas, cada nómina sube a 2.083,33 euros.",
    "Si entraste a mitad del semestre y llevas 4 meses de 6, la paga que te toca es de 1.190,47 euros.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo se cobran las pagas extra?",
      respuesta: "Una con ocasión de la Navidad y la otra en el mes que fije tu convenio, normalmente en junio o julio.",
    },
    {
      pregunta: "¿Las pagas extra pagan IRPF y Seguridad Social?",
      respuesta: "IRPF sí, con el mismo tipo que el resto de tu sueldo. La Seguridad Social se cotiza cada mes por la parte proporcional, así que en la paga extra no se descuenta.",
    },
    {
      pregunta: "¿Qué pasa con las pagas extra si dejo la empresa?",
      respuesta: "Te pagan en el finiquito la parte proporcional que llevas generada y no cobraste.",
    },
  ],
  glosario: [
    { termino: "Gratificación extraordinaria", definicion: "El nombre legal de la paga extra." },
    { termino: "Prorrateo", definicion: "Repartir el importe de las pagas extra entre las 12 nóminas del año." },
    { termino: "Devengo", definicion: "Periodo durante el que se va generando el derecho a cobrar la paga." },
  ],
});
