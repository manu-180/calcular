import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.prestaciones-laborales",
  h1: "Calculadora de prestaciones laborales en República Dominicana",
  title: "Prestaciones laborales en RD 2026: cesantía y preaviso",
  description:
    "Calcula tus prestaciones laborales en RD: preaviso, cesantía, vacaciones y regalía proporcional. Por desahucio, despido o renuncia, según el Código de Trabajo.",
  intro: [
    "Las prestaciones laborales en República Dominicana son el preaviso, el auxilio de cesantía, las vacaciones no tomadas y la regalía proporcional. Cuáles te tocan depende de cómo terminó tu contrato.",
    "Si te desahuciaron o te despidieron sin causa justa, te tocan preaviso y cesantía. Si renunciaste, cobras vacaciones y regalía proporcional.",
  ],
  comoSeCalcula: [
    "Tu salario diario es el promedio mensual del último año dividido entre {{do.divisor-salario-diario}}.",
    "Preaviso: {{do.preaviso-dias[tres-a-seis-meses]}} de 3 a 6 meses, {{do.preaviso-dias[seis-a-doce-meses]}} hasta un año y {{do.preaviso-dias[un-anio-o-mas]}} después del primer año. Si te avisaron a tiempo, no se paga.",
    "Cesantía: {{do.cesantia-dias[tres-a-seis-meses]}} de 3 a 6 meses y {{do.cesantia-dias[seis-a-doce-meses]}} de 6 meses a un año.",
    "Desde el primer año son {{do.cesantia-dias[uno-a-cinco-anios]}} por año trabajado. Con 5 años o más, {{do.cesantia-dias[cinco-anios-o-mas]}} por año. Si el último año pasa de 3 meses, se suma esa fracción.",
    "Vacaciones: las vencidas que no tomaste, más las del último año incompleto según la escala del artículo 180.",
    "Salario de Navidad: la parte proporcional al tiempo trabajado en el año.",
  ],
  ejemplo: [
    "Si trabajaste del 1 de marzo de 2021 al 30 de septiembre de 2026 con RD$40,000 al mes y te desahuciaron sin preaviso, te tocan 28 días de preaviso, 128 de cesantía, 7 de vacaciones y RD$30,000 de regalía. En total, RD$303,605.28.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calculan las prestaciones laborales?",
      respuesta: "Divides tu salario promedio del último año entre {{do.divisor-salario-diario}} y lo multiplicas por los días de preaviso y cesantía que te tocan según tu antigüedad. A eso se suman las vacaciones pendientes y la regalía proporcional.",
    },
    {
      pregunta: "¿Me toca cesantía si renuncio?",
      respuesta: "No. La cesantía se paga cuando el empleador termina el contrato sin causa justa. Al renunciar cobras vacaciones y salario de Navidad proporcional.",
    },
    {
      pregunta: "¿En cuánto tiempo me tienen que pagar las prestaciones?",
      respuesta: "En 10 días desde que termina el contrato. Si se atrasan, el empleador debe sumar un día de salario por cada día de retraso.",
    },
    {
      pregunta: "¿Las prestaciones pagan ISR?",
      respuesta: "El preaviso y la cesantía no pagan impuesto sobre la renta. La regalía tampoco.",
    },
    {
      pregunta: "¿Qué es la dimisión?",
      respuesta: "Es cuando tú terminas el contrato por una falta del empleador. Si un tribunal la declara justificada, te corresponde lo mismo que en un despido injustificado.",
    },
    {
      pregunta: "¿Por qué mi cálculo da distinto al del Ministerio de Trabajo?",
      respuesta: "Revisa el salario promedio y las fechas. También puede cambiar la forma de contar las vacaciones del último año. Ante una diferencia, consulta en el Ministerio de Trabajo.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "Aviso anticipado del fin del contrato. Si no se da, se paga en dinero." },
    { termino: "Auxilio de cesantía", definicion: "Pago por los años trabajados cuando el empleador termina el contrato sin causa justa." },
    { termino: "Desahucio", definicion: "Terminar el contrato sin alegar una causa. Si lo hace el empleador, debe pagar preaviso y cesantía." },
    { termino: "Dimisión", definicion: "Terminar el contrato tú, por una falta del empleador." },
  ],
});
