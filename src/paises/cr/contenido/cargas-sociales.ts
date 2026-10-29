import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.cargas-sociales",
  h1: "Calculadora de cargas sociales en Costa Rica",
  title: "Cargas sociales {{anio}} Costa Rica: CCSS obrera y patronal",
  description:
    "Calcule las cargas sociales de un salario: lo que se rebaja al trabajador y lo que paga el patrono a la CCSS, Banco Popular, Fodesaf, IMAS, INA, FCL y ROP.",
  intro: [
    "Las cargas sociales son los aportes que se calculan sobre cada salario. Una parte se rebaja al trabajador y otra la paga el patrono encima del salario.",
    "Escriba el salario bruto y le mostramos cada aporte, con el porcentaje de ley vigente hoy.",
  ],
  comoSeCalcula: [
    "Trabajador: {{cr.ccss-sem-trabajador}} al Seguro de Salud, {{cr.ccss-ivm-trabajador}} al IVM y {{cr.banco-popular-trabajador}} al Banco Popular.",
    "Patrono a la CCSS: {{cr.ccss-sem-patrono}} al Seguro de Salud y {{cr.ccss-ivm-patrono}} al IVM.",
    "Patrono a otras instituciones: {{cr.banco-popular-patrono}} al Banco Popular, {{cr.asignaciones-familiares}} a Asignaciones Familiares, {{cr.imas}} al IMAS y {{cr.ina}} al INA (solo con cinco o más trabajadores).",
    "Ley de Protección al Trabajador: {{cr.fcl}} al Fondo de Capitalización Laboral y {{cr.rop-patrono}} a la pensión complementaria (ROP).",
  ],
  ejemplo: [
    "Con un salario de ₡1.000.000, al trabajador se le rebajan ₡108.300 y el patrono paga ₡268.300 más. En total, ₡376.600 de cargas sociales.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el porcentaje de cargas sociales del patrono en 2026?",
      respuesta: "Con INA, el patrono paga 26,83 % del salario. El IVM patronal subió a {{cr.ccss-ivm-patrono}} el 1 de enero de 2026. Sin INA son 25,33 %.",
    },
    {
      pregunta: "¿Cuánto le rebajan al trabajador?",
      respuesta: "{{cr.ccss-sem-trabajador}} para salud, {{cr.ccss-ivm-trabajador}} para pensión y {{cr.banco-popular-trabajador}} para el Banco Popular. En total, 10,83 %.",
    },
    {
      pregunta: "¿La póliza de riesgos del trabajo está incluida?",
      respuesta: "No. La paga el patrono al INS y su tarifa cambia según la actividad. Hay que sumarla aparte.",
    },
    {
      pregunta: "¿Las cargas se calculan sobre el aguinaldo?",
      respuesta: "No. El aguinaldo no paga cargas sociales. Sí las pagan las horas extra, las comisiones y el salario en especie.",
    },
  ],
  glosario: [
    { termino: "CCSS", definicion: "Caja Costarricense de Seguro Social. La gente le dice la Caja." },
    { termino: "FCL", definicion: "Fondo de Capitalización Laboral: ahorro a nombre del trabajador que se retira cada cinco años o al terminar el contrato." },
    { termino: "ROP", definicion: "Régimen Obligatorio de Pensiones Complementarias: una pensión adicional a la de la Caja." },
  ],
});
