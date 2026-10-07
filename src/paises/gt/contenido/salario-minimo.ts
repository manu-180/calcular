import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.salario-minimo",
  h1: "Salario mínimo en Guatemala",
  title: "Salario mínimo 2026 en Guatemala por actividad",
  description:
    "Salario mínimo no agrícola de {{gt.salario-minimo-mensual[no-agricola]@ce1}} al mes en el departamento de Guatemala. Vea el agrícola y el de maquila en cada región.",
  intro: [
    "Guatemala tiene seis salarios mínimos: tres actividades (agrícola, no agrícola y exportadora y de maquila) en dos circunscripciones económicas.",
    "La circunscripción 1 es el departamento de Guatemala. La 2 es el resto del país. Manda el lugar donde está su centro de trabajo.",
  ],
  comoSeCalcula: [
    "No agrícola: {{gt.salario-minimo-mensual[no-agricola]@ce1}} al mes en la circunscripción 1 y {{gt.salario-minimo-mensual[no-agricola]@ce2}} en la 2.",
    "Agrícola: {{gt.salario-minimo-mensual[agricola]@ce1}} y {{gt.salario-minimo-mensual[agricola]@ce2}}.",
    "Exportadora y de maquila: {{gt.salario-minimo-mensual[exportadora-maquila]@ce1}} y {{gt.salario-minimo-mensual[exportadora-maquila]@ce2}}.",
    "Por hora se paga la parte que corresponde según su jornada. En jornada diurna, el salario diario dividido entre {{gt.jornada-horas[diurna]}}.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es el salario mínimo 2026 en Guatemala?",
      respuesta:
        "Para actividades no agrícolas, {{gt.salario-minimo-diario[no-agricola]@ce1}} diarios ({{gt.salario-minimo-mensual[no-agricola]@ce1}} al mes) en el departamento de Guatemala y {{gt.salario-minimo-diario[no-agricola]@ce2}} diarios en el resto del país. Rige desde el {{gt.salario-minimo-mensual#desde}}.",
    },
    {
      pregunta: "¿El salario mínimo incluye la bonificación incentivo?",
      respuesta: "No. La bonificación incentivo se paga además del salario mínimo, completa y sin dividirla.",
    },
    {
      pregunta: "¿Qué actividades son agrícolas?",
      respuesta: "Las de la sección A de la clasificación internacional de actividades (agricultura, ganadería, silvicultura y pesca). Todas las demás del sector privado son no agrícolas, salvo la exportadora y de maquila, que tiene su propio mínimo.",
    },
    {
      pregunta: "¿Qué pasa si me pagan menos del mínimo?",
      respuesta: "Es una falta laboral y la Inspección General de Trabajo puede sancionar al patrono. Igual le tienen que pagar lo que le deben.",
    },
    {
      pregunta: "¿Cuándo cambia el salario mínimo?",
      respuesta: "Se fija cada año por acuerdo gubernativo, por lo general en diciembre, y rige desde el 1 de enero.",
    },
  ],
  glosario: [
    { termino: "Circunscripción económica", definicion: "Zona del país con su propio salario mínimo. La 1 es el departamento de Guatemala y la 2, el resto." },
    { termino: "Bonificación incentivo", definicion: "Pago mensual obligatorio además del salario, del Decreto 78-89 y sus reformas." },
  ],
});
