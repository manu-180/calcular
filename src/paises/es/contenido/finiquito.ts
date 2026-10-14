import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.finiquito",
  h1: "Calculadora de finiquito",
  title: "Calcular el finiquito: vacaciones, pagas extra y salario",
  description:
    "Calcula tu finiquito al dejar la empresa: días de salario pendientes, vacaciones no disfrutadas, parte proporcional de la paga extra y fin de contrato temporal.",
  intro: [
    "El finiquito es lo que la empresa te debe el día que termina tu contrato, sea cual sea el motivo: te vas tú, te despiden o se acaba un contrato temporal.",
    "Incluye el salario de los días que aún no cobraste, las vacaciones que no llegaste a disfrutar y la parte de la paga extra que llevas generada.",
  ],
  comoSeCalcula: [
    "Salario pendiente: tu sueldo mensual entre 30, por los días del último mes que no te pagaron.",
    "Vacaciones: {{es.vacaciones-dias}} al año, en proporción a los días trabajados este año, menos las que ya disfrutaste. Cada día vale tu sueldo mensual entre 30.",
    "Pagas extra: si no las tienes prorrateadas, la parte de la paga del semestre en curso que llevas generada.",
    "Fin de contrato temporal: además, {{es.fin-contrato-dias}} de salario por año trabajado, en proporción al tiempo del contrato.",
  ],
  ejemplo: [
    "Si dejas la empresa el 15 de octubre de 2026, cobras 25.000 euros en 14 pagas, te deben 15 días y disfrutaste 10 de vacaciones, el finiquito es de 2.744,98 euros brutos.",
    "Son 892,86 euros de salario, 813,69 de vacaciones y 1.038,43 de la paga de Navidad.",
  ],
  faq: [
    {
      pregunta: "¿El finiquito incluye la indemnización por despido?",
      respuesta: "No. La indemnización se calcula aparte y se suma al finiquito en el mismo documento, pero son conceptos distintos.",
    },
    {
      pregunta: "¿Me corresponde finiquito si me voy voluntariamente?",
      respuesta: "Sí. Siempre te tienen que pagar lo que llevas generado. Si no respetas el preaviso de tu convenio, la empresa puede descontarte esos días.",
    },
    {
      pregunta: "¿El finiquito paga IRPF?",
      respuesta: "Sí. El salario, las vacaciones y las pagas extra tributan como el resto de tu sueldo. La indemnización obligatoria por despido está exenta dentro de los límites de la ley.",
    },
    {
      pregunta: "¿Tengo que firmar el finiquito?",
      respuesta: "Puedes firmarlo como «no conforme» si no estás de acuerdo con las cantidades. Así conservas el derecho a reclamar.",
    },
  ],
  glosario: [
    { termino: "Finiquito", definicion: "Documento que liquida todo lo que la empresa te debe al terminar la relación laboral." },
    { termino: "Preaviso", definicion: "Días de antelación con que tienes que avisar de que te vas, según tu convenio." },
  ],
});
