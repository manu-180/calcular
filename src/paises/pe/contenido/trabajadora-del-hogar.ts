import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.trabajadora-del-hogar",
  h1: "Calculadora de trabajadora del hogar: sueldo y beneficios",
  title: "Trabajadora del hogar: sueldo, CTS y gratificación",
  description:
    "Calcula cuánto recibe una trabajadora del hogar y cuánto te cuesta: EsSalud, ONP o AFP, gratificaciones con bonificación, CTS y vacaciones (Ley 31047).",
  intro: [
    "Si contratas a una trabajadora del hogar, aquí ves su remuneración neta y el costo real para ti: aportes y beneficios de la Ley 31047.",
    "Con jornada completa la remuneración no puede ser menor que la remuneración mínima vital: {{pe.rmv}}. La alimentación y el alojamiento no son parte de la remuneración y no se descuentan.",
  ],
  comoSeCalcula: [
    "De su remuneración se retiene la pensión: {{pe.aporte-onp}} si está en la ONP, o el aporte, la prima y la comisión si está en una AFP.",
    "Tú pagas EsSalud aparte: {{pe.aporte-essalud}} de la remuneración. Si gana la mínima vital o menos (por ejemplo, a tiempo parcial), se calcula sobre la remuneración mínima vital.",
    "En julio y en diciembre le pagas una gratificación igual a una remuneración, más la bonificación extraordinaria: {{pe.bonificacion-extraordinaria[essalud]}} con EsSalud o {{pe.bonificacion-extraordinaria[eps]}} con EPS.",
    "En mayo y noviembre depositas la CTS: la remuneración más un sexto de la gratificación, por los meses trabajados, entre 12. Con menos de 24 horas a la semana no corresponde.",
    "Tiene {{pe.vacaciones-hogar[completo]}} de vacaciones pagadas al año ({{pe.vacaciones-hogar[parcial]}} como mínimo a tiempo parcial).",
  ],
  ejemplo: [
    "Con S/ 1,500 al mes a tiempo completo, EsSalud y ONP, recibe S/ 1,305 netos. Cada gratificación es de S/ 1,500 más S/ 135 de bonificación, y cada depósito de CTS de S/ 875. En promedio te cuesta S/ 2,053.33 al mes.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el sueldo mínimo de una trabajadora del hogar?",
      respuesta: "La remuneración mínima vital, {{pe.rmv}}, por jornada completa de 8 horas diarias o 48 semanales. Si trabaja por horas, recibe la parte proporcional.",
    },
    {
      pregunta: "¿Le corresponde gratificación completa?",
      respuesta: "Sí. Desde la Ley 31047 cada gratificación equivale a una remuneración completa, sin importar las horas que trabaje. Si no completó el semestre, se paga por los meses completos trabajados.",
    },
    {
      pregunta: "¿Quién paga EsSalud?",
      respuesta: "Tú, como persona empleadora. No se descuenta de su remuneración. Lo declaras y pagas cada mes ante la SUNAT.",
    },
    {
      pregunta: "¿Tengo que registrarla en algún lado?",
      respuesta: "Sí. El contrato va por escrito y se registra en el Registro del Trabajo del Hogar del Ministerio de Trabajo, donde también emites las boletas de pago.",
    },
  ],
  glosario: [
    { termino: "CTS", definicion: "Compensación por tiempo de servicios. Un depósito que haces en mayo y noviembre en la cuenta que ella elija, para cuando termine el trabajo." },
    { termino: "Bonificación extraordinaria", definicion: "Monto que se suma a cada gratificación. Es lo que el empleador no paga a EsSalud por ella." },
  ],
});
