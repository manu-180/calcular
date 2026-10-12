import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.renuncia",
  h1: "Cuánto me pagan si renuncio en Costa Rica",
  title: "Liquidación por renuncia en Costa Rica: cálculo 2026",
  description:
    "Calcule lo que le corresponde si renuncia: vacaciones pendientes y aguinaldo proporcional. Vea también cuánto preaviso debe dar según su antigüedad.",
  intro: [
    "Si usted renuncia, el patrono le debe pagar las vacaciones que no disfrutó y el aguinaldo proporcional. No le corresponde cesantía.",
    "También le mostramos cuántos días de preaviso tiene que dar. Si no avisa a tiempo, el patrono le puede cobrar esos días.",
  ],
  comoSeCalcula: [
    "Salario diario: su salario promedio de los últimos seis meses dividido entre {{cr.dias-mes-planilla}}.",
    "Vacaciones: el salario diario por los días que no disfrutó.",
    "Aguinaldo: la suma de salarios desde el 1 de diciembre dividida entre 12.",
    "Preaviso que debe dar: {{cr.preaviso-dias[3-a-6-meses]}} con 3 a 6 meses de trabajo, {{cr.preaviso-dias[6-a-12-meses]}} hasta un año y {{cr.preaviso-dias[mas-de-un-anio]}} con más de un año.",
  ],
  ejemplo: [
    "Con un salario de ₡600.000, 2 años y 8 meses de trabajo y 5 días de vacaciones pendientes, recibe ₡100.000 de vacaciones y ₡550.000 de aguinaldo: ₡650.000.",
  ],
  faq: [
    {
      pregunta: "¿Si renuncio me pagan cesantía?",
      respuesta: "No. La cesantía se paga cuando el contrato termina sin culpa suya, por ejemplo un despido sin justa causa. Lo que sí retira es el FCL, en su operadora de pensiones.",
    },
    {
      pregunta: "¿Cuánto preaviso tengo que dar si renuncio?",
      respuesta: "Una semana con 3 a 6 meses de trabajo, 15 días hasta un año y un mes después del año. Se da por escrito.",
    },
    {
      pregunta: "¿Qué pasa si no doy el preaviso?",
      respuesta: "El patrono le puede cobrar el salario de esos días. Tiene 30 días desde su salida para reclamarlo; si no lo hace, pierde ese derecho.",
    },
    {
      pregunta: "¿Pierdo el aguinaldo si renuncio?",
      respuesta: "No. El aguinaldo proporcional se paga siempre, sin importar cómo termine la relación laboral.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "Aviso por escrito de que se termina el contrato, con la anticipación que fija el artículo 28." },
    { termino: "FCL", definicion: "Fondo de Capitalización Laboral: un ahorro que se retira al terminar cualquier relación laboral." },
  ],
});
