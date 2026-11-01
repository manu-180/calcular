import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.severance-pay-calculator",
  h1: "Barbados severance pay calculator {{anio}}",
  title: "Severance pay calculator {{anio}}: weeks per year of service",
  description:
    "Work out severance pay in Barbados under the Severance Payments Act: {{bb.severance-weeks[up-to-10]}} of pay for each of the first 10 years, more after that, up to {{bb.severance-max-years}}.",
  intro: [
    "If you are made redundant in Barbados after at least {{bb.severance-min-weeks}} weeks of continuous employment, the Severance Payments Act, Cap. 355A entitles you to a payment based on your years of service. The first 10 years earn {{bb.severance-weeks[up-to-10]}} weeks of pay each.",
    "Enter your average weekly basic pay and your complete years of service. The calculator adds up the weeks and multiplies them by your weekly pay.",
  ],
  comoSeCalcula: [
    "Weeks owed: {{bb.severance-weeks[up-to-10]}} weeks for each of the first 10 years, {{bb.severance-weeks[11-20]}} weeks for each year from 11 to 20, and {{bb.severance-weeks[21-33]}} weeks for each year from 21 to {{bb.severance-max-years}}.",
    "Years beyond {{bb.severance-max-years}} do not add anything.",
    "Weekly basic pay is your total basic pay in the last 104 weeks divided by 104. The Act defines basic pay by reference to insurable earnings under the National Insurance regulations, so this calculator limits weekly pay to the NIS weekly ceiling of {{bb.nis-ceiling-weekly}}.",
    "Severance pay is the weeks owed multiplied by the weekly pay.",
  ],
  ejemplo: [
    "A supervisor with 12 complete years and an average basic pay of Bds$900 a week is made redundant. Ten years at 2.5 weeks give 25 weeks, and two more years at 3 weeks give 6 weeks. That is 31 weeks, so severance is 31 × Bds$900 = Bds$27,900.00.",
  ],
  faq: [
    {
      pregunta: "How much severance pay do I get in Barbados?",
      respuesta:
        "The First Schedule of the Severance Payments Act, Cap. 355A gives {{bb.severance-weeks[up-to-10]}} weeks of pay per year for the first 10 years, {{bb.severance-weeks[11-20]}} weeks for years 11 to 20 and {{bb.severance-weeks[21-33]}} weeks for years 21 to {{bb.severance-max-years}}.",
    },
    {
      pregunta: "How long must I have worked to qualify?",
      respuesta: "Section 3 and the First Schedule require {{bb.severance-min-weeks}} weeks of continuous employment, so two years.",
    },
    {
      pregunta: "How is a week of basic pay worked out?",
      respuesta: "The First Schedule divides total basic pay in the last 104 weeks by 104. Basic pay follows insurable earnings under the National Insurance regulations.",
    },
    {
      pregunta: "Is there a maximum number of years?",
      respuesta: "Yes. The Schedule counts at most {{bb.severance-max-years}} years of service.",
    },
  ],
  glosario: [
    { termino: "Severance pay", definicion: "A payment owed by the employer when a worker is made redundant after enough service." },
    { termino: "Basic pay", definicion: "The pay used to value a week of severance, tied to insurable earnings." },
    { termino: "Continuous employment", definicion: "Service with one employer without a break." },
    { termino: "Redundancy", definicion: "Loss of a job because the employer no longer needs the work done." },
  ],
});
