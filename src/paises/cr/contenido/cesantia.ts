import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.cesantia",
  h1: "Cálculo de cesantía en Costa Rica",
  title: "Cálculo de cesantía en Costa Rica {{anio}}: tabla por años",
  description:
    "Calcule su cesantía con la tabla del artículo 29: días por año trabajado, tope de {{cr.cesantia-tope-anios}} y salario promedio de 6 meses. Vea el monto exacto.",
  intro: [
    "La cesantía en Costa Rica se paga con {{cr.cesantia-dias-menos-de-un-anio[3-a-6-meses]}} de salario desde los 3 meses de trabajo y, desde el primer año, con los días por año de la tabla del artículo 29, hasta un máximo de {{cr.cesantia-tope-anios}}.",
    "Le toca si lo despiden sin justa causa. Escriba su salario promedio y sus fechas: le mostramos cuántos días le corresponden y el monto del auxilio de cesantía.",
  ],
  comoSeCalcula: [
    "Con 3 a 6 meses de trabajo: {{cr.cesantia-dias-menos-de-un-anio[3-a-6-meses]}} de salario. Con más de 6 meses y menos de un año: {{cr.cesantia-dias-menos-de-un-anio[6-a-12-meses]}}.",
    "Desde un año, cada año trabajado o fracción mayor de seis meses cuenta como un año.",
    "Según esos años, la tabla de cesantía da los días por año: {{cr.cesantia-dias-por-anio[1]}} el primer año, {{cr.cesantia-dias-por-anio[5]}} con cinco años, {{cr.cesantia-dias-por-anio[8]}} con ocho y {{cr.cesantia-dias-por-anio[13]}} desde el año trece.",
    "Los días por año se multiplican por los años, con un máximo de {{cr.cesantia-tope-anios}}.",
    "El resultado se multiplica por su salario diario: el promedio de los últimos seis meses dividido entre {{cr.dias-mes-planilla}}.",
  ],
  ejemplo: [
    "Con 5 años y 7 meses trabajados y un salario promedio de ₡600.000, cuentan 6 años. La tabla da 21,5 días por año: 129 días. A ₡20.000 por día, la cesantía es ₡2.580.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de cesantía me tocan por año?",
      respuesta: "Depende de su antigüedad: {{cr.cesantia-dias-por-anio[1]}} por año con un año, {{cr.cesantia-dias-por-anio[5]}} con cinco y {{cr.cesantia-dias-por-anio[8]}} con ocho. La calculadora busca su fila en la tabla.",
    },
    {
      pregunta: "¿Por qué con más de ocho años no sube la cesantía?",
      respuesta: "Porque el artículo 29 solo indemniza los últimos ocho años de la relación laboral. Lo que cambia con más antigüedad son los días por año de la tabla.",
    },
    {
      pregunta: "¿Qué pasa con los meses que sobran del último año?",
      respuesta: "Si pasan de seis meses, cuentan como un año completo. Si son seis meses o menos, el texto del artículo 29 no les da días extra.",
    },
    {
      pregunta: "¿Si renuncio me pagan cesantía?",
      respuesta: "No. La cesantía se paga cuando el despido es sin justa causa o por otra causa ajena a su voluntad. Al renunciar recibe las vacaciones y el aguinaldo proporcional.",
    },
    {
      pregunta: "¿Me pagan cesantía si me pensiono?",
      respuesta: "El artículo 29 la reconoce también cuando el contrato termina por una causa ajena a la voluntad de la persona trabajadora. Si es su caso, consulte en el Ministerio de Trabajo.",
    },
  ],
  glosario: [
    { termino: "Auxilio de cesantía", definicion: "Nombre legal de la indemnización por despido sin justa causa." },
    { termino: "Salario promedio", definicion: "El promedio de lo ganado en los últimos seis meses, con horas extra y comisiones." },
  ],
});
