import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.vacaciones",
  h1: "Cálculo de vacaciones en Honduras",
  title: "Cálculo de vacaciones en Honduras: días por año y pago",
  description:
    "Calcule cuántos días de vacaciones le tocan según sus años de trabajo ({{hn.vacaciones-dias[1]}} a {{hn.vacaciones-dias[4]}}) y cuánto le deben pagar, con su salario promedio. Gratis.",
  intro: [
    "Las vacaciones en Honduras son de {{hn.vacaciones-dias[1]}} después del primer año, {{hn.vacaciones-dias[2]}} después del segundo, {{hn.vacaciones-dias[3]}} después del tercero y {{hn.vacaciones-dias[4]}} desde el cuarto.",
    "Son días laborables y consecutivos: no cuentan los domingos ni los feriados. Escriba su salario y su fecha de ingreso para ver los días y el pago.",
  ],
  comoSeCalcula: [
    "Después del primer año: {{hn.vacaciones-dias[1]}}. Después del segundo: {{hn.vacaciones-dias[2]}}. Después del tercero: {{hn.vacaciones-dias[3]}}. Desde el cuarto: {{hn.vacaciones-dias[4]}}.",
    "El pago sale del promedio de su salario ordinario de los últimos seis meses, dividido entre 30, por los días de vacaciones.",
    "Si el contrato termina antes del aniversario por causa del patrono, se paga la parte proporcional del año en curso.",
  ],
  ejemplo: [
    "Trabaja desde marzo de 2022 y gana L15,000. Ya cumplió 4 años: le tocan {{hn.vacaciones-dias[4]}}, que se pagan L500 × 20 = L10,000.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de vacaciones me tocan en Honduras?",
      respuesta: "{{hn.vacaciones-dias[1]}} con un año de trabajo, {{hn.vacaciones-dias[2]}} con dos, {{hn.vacaciones-dias[3]}} con tres y {{hn.vacaciones-dias[4]}} desde el cuarto año.",
    },
    {
      pregunta: "¿Cuándo me tienen que dar las vacaciones?",
      respuesta: "El patrono fija la fecha dentro de los tres meses siguientes a cumplir el año. Le avisa con 10 días de anticipación.",
    },
    {
      pregunta: "¿Cuándo me pagan las vacaciones?",
      respuesta: "Tres días antes de que empiecen.",
    },
    {
      pregunta: "¿Me pueden pagar las vacaciones en lugar de darlas?",
      respuesta: "No. La ley prohíbe cambiar las vacaciones por dinero, salvo casos especiales que autoriza la Secretaría de Trabajo. Si deja el trabajo con vacaciones pendientes, sí se las pagan.",
    },
    {
      pregunta: "¿Puedo acumular vacaciones?",
      respuesta: "En general no. Solo en cargos técnicos, de dirección o de confianza se pueden acumular, hasta dos años.",
    },
    {
      pregunta: "¿Trabajo por temporada. Tengo vacaciones?",
      respuesta: "Sí, si trabajó al menos 200 días en el año. Con eso se cuenta como trabajo continuo.",
    },
  ],
  glosario: [{ termino: "Días laborables", definicion: "Los días en que se trabaja. No incluyen el día de descanso semanal ni los feriados." }],
});
