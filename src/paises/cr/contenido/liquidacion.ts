import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.liquidacion",
  h1: "Calculadora de liquidación laboral en Costa Rica",
  title: "Calculadora de liquidación laboral en Costa Rica {{anio}}",
  description:
    "Calcule su liquidación laboral: preaviso, cesantía, vacaciones y aguinaldo proporcional, por despido o por renuncia. Según el Código de Trabajo, gratis.",
  intro: [
    "La liquidación laboral en Costa Rica incluye las vacaciones pendientes y el aguinaldo proporcional. Si lo despidieron sin justa causa, se suman el preaviso y la cesantía.",
    "Escriba su salario promedio, sus fechas y cómo terminó la relación. Le mostramos cada rubro de sus prestaciones y el total a cobrar.",
  ],
  comoSeCalcula: [
    "Salario diario: su salario promedio de los últimos seis meses dividido entre {{cr.dias-mes-planilla}}.",
    "Preaviso: {{cr.preaviso-dias[3-a-6-meses]}} de salario con 3 a 6 meses de trabajo, {{cr.preaviso-dias[6-a-12-meses]}} hasta un año y {{cr.preaviso-dias[mas-de-un-anio]}} con más de un año. Solo se paga si el patrono no le avisó con esa anticipación.",
    "Cesantía: {{cr.cesantia-dias-menos-de-un-anio[3-a-6-meses]}} con 3 a 6 meses, {{cr.cesantia-dias-menos-de-un-anio[6-a-12-meses]}} con menos de un año, y desde el año, los días de la tabla del artículo 29 por cada año, con un máximo de {{cr.cesantia-tope-anios}}.",
    "Vacaciones: los días que no disfrutó, por su salario diario.",
    "Aguinaldo: lo ganado desde el 1 de diciembre dividido entre 12.",
  ],
  ejemplo: [
    "Con un salario promedio de ₡600.000, ingreso el 1 de marzo de 2021 y despido sin preaviso el 30 de septiembre de 2026: preaviso ₡600.000, cesantía de 129 días ₡2.580.000, 10 días de vacaciones ₡200.000 y aguinaldo ₡500.000. Total ₡3.880.000.",
  ],
  faq: [
    {
      pregunta: "¿Qué incluye la liquidación si me despiden?",
      respuesta: "Si el despido es sin justa causa: preaviso (si no se lo dieron), cesantía, vacaciones pendientes y aguinaldo proporcional. Si hubo justa causa, solo vacaciones y aguinaldo.",
    },
    {
      pregunta: "¿Si renuncio me pagan cesantía?",
      respuesta: "No. La cesantía se paga cuando el despido es sin justa causa o por otra causa ajena a su voluntad. Al renunciar recibe las vacaciones pendientes y el aguinaldo proporcional.",
    },
    {
      pregunta: "¿Qué pasa si renuncio sin dar preaviso?",
      respuesta: "El preaviso también lo debe dar quien renuncia. Si no lo dio, el patrono puede rebajar ese monto de la liquidación.",
    },
    {
      pregunta: "¿Con qué salario se calcula la liquidación?",
      respuesta: "Con el promedio de los salarios de los últimos seis meses, incluyendo horas extra y comisiones (artículo 30 del Código de Trabajo).",
    },
    {
      pregunta: "¿La liquidación paga renta?",
      respuesta: "El aguinaldo y las indemnizaciones del Código de Trabajo, como el preaviso y la cesantía, no pagan impuesto sobre la renta (Ley 7092, artículo 35).",
    },
  ],
  glosario: [
    { termino: "Prestaciones laborales", definicion: "Lo que se paga al terminar el contrato: preaviso, cesantía, vacaciones y aguinaldo, según el caso." },
    { termino: "Preaviso", definicion: "Aviso anticipado del fin del contrato. Si no se da, se paga en dinero." },
    { termino: "Cesantía", definicion: "Indemnización por los años trabajados cuando el despido es sin justa causa." },
    { termino: "Responsabilidad patronal", definicion: "Cuando el patrono termina el contrato sin una causa justa y debe pagar preaviso y cesantía." },
  ],
});
