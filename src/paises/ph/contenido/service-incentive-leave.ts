import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.service-incentive-leave",
  h1: "Service incentive leave calculator",
  title: "Service incentive leave (SIL) cash conversion calculator",
  description: "Check your {{ph.service-incentive-leave}} days of service incentive leave and the cash value of the days you did not use, under the Labor Code.",
  intro: [
    "Every employee with at least one year of service earns {{ph.service-incentive-leave}} days of leave with pay each year, called service incentive leave (SIL).",
    "Days you do not use by the end of the year are converted to cash. Enter your daily wage to see how much they are worth.",
  ],
  comoSeCalcula: [
    "You are entitled to {{ph.service-incentive-leave}} days a year once you have 12 months of service, continuous or broken.",
    "Unused days are commutable to their money equivalent at the end of the year.",
    "Each day is worth your regular daily wage.",
  ],
  ejemplo: ["With a daily wage of ₱755 and 2 unused days, the cash conversion is ₱1,510."],
  faq: [
    {
      pregunta: "Who is entitled to service incentive leave?",
      respuesta:
        "Employees with at least one year of service. It does not apply to government employees, domestic workers, managerial employees, unsupervised field personnel, those already enjoying 5 days of paid vacation leave, or establishments regularly employing less than ten employees.",
    },
    {
      pregunta: "What counts as one year of service?",
      respuesta: "At least 12 months, continuous or broken, counted from your first day and including authorized absences and paid regular holidays.",
    },
    {
      pregunta: "Can unused leave be converted to cash?",
      respuesta: "Yes. Service incentive leave not used by the end of the year is commutable to its money equivalent.",
    },
  ],
  glosario: [
    { termino: "Service incentive leave", definicion: "Five days of paid leave a year for employees with at least one year of service, under Article 95 of the Labor Code." },
    { termino: "Commutable", definicion: "Can be exchanged for its value in cash." },
  ],
});
