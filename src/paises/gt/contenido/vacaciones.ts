import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.vacaciones",
  h1: "Cálculo de vacaciones en Guatemala",
  title: "Cálculo de vacaciones en Guatemala: días y pago proporcional",
  description:
    "Calcule cuánto valen sus {{gt.vacaciones-dias-habiles}} hábiles de vacaciones o la parte proporcional que le pagan al terminar la relación laboral. Gratis y al instante.",
  intro: [
    "En Guatemala le corresponden al menos {{gt.vacaciones-dias-habiles}} hábiles de vacaciones pagadas por cada año de trabajo con el mismo patrono.",
    "Las vacaciones se gozan, no se cambian por dinero. Solo se pagan en dinero cuando termina la relación laboral, y ahí se suma la parte proporcional del último año.",
  ],
  comoSeCalcula: [
    "Año completo: {{gt.vacaciones-dias-habiles}} hábiles.",
    "Vacaciones proporcionales: {{gt.vacaciones-dias-habiles}} × días trabajados desde su último aniversario / 365.",
    "Cada día vale el salario promedio del último año dividido entre 30. En empresas agrícolas o ganaderas se usa el promedio de los últimos tres meses.",
  ],
  ejemplo: ["Gana Q4,500 y deja de trabajar 200 días después de su aniversario: 15 × 200 / 365 = 8.22 días. Cada día vale Q150, así que le pagan Q1,233."],
  faq: [
    {
      pregunta: "¿Cuántos días de vacaciones me tocan en Guatemala?",
      respuesta: "Al menos {{gt.vacaciones-dias-habiles}} hábiles por cada año de trabajo continuo. Su contrato o un pacto colectivo pueden darle más.",
    },
    {
      pregunta: "¿Cómo se calculan las vacaciones proporcionales?",
      respuesta: "Multiplique {{gt.vacaciones-dias-habiles}} por los días trabajados desde su último aniversario y divida entre 365. Esos días se pagan a su salario diario promedio.",
    },
    {
      pregunta: "¿Cuándo me tienen que dar las vacaciones?",
      respuesta: "El patrono tiene que indicarle la fecha dentro de los sesenta días siguientes a que cumplió el año.",
    },
    {
      pregunta: "¿Me pueden pagar las vacaciones en vez de dármelas?",
      respuesta: "No mientras siga trabajando. Solo se pagan en dinero cuando termina la relación laboral, por la causa que sea.",
    },
    {
      pregunta: "¿Las faltas se descuentan de las vacaciones?",
      respuesta: "No, salvo que esos días se los hayan pagado.",
    },
  ],
  glosario: [
    { termino: "Días hábiles", definicion: "Días en que normalmente se trabaja. No cuentan los de descanso semanal ni los feriados." },
    { termino: "Vacaciones proporcionales", definicion: "La parte de las vacaciones que le corresponde cuando termina la relación antes de cumplir otro año." },
  ],
});
