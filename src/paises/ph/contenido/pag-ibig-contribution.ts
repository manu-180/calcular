import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.pag-ibig-contribution",
  h1: "Pag-IBIG contribution calculator",
  title: "Pag-IBIG contribution calculator: employee and employer",
  description:
    "See your Pag-IBIG monthly savings and your employer's counterpart, with the {{ph.pagibig-max-fund-salary}} maximum fund salary in force since February 2024.",
  intro: [
    "Enter your monthly compensation and see how much goes to your Pag-IBIG savings each month.",
    "Since February 2024 the maximum fund salary is {{ph.pagibig-max-fund-salary}}, set by Pag-IBIG Fund Circular No. 460.",
  ],
  comoSeCalcula: [
    "Your fund salary is your monthly compensation, up to {{ph.pagibig-max-fund-salary}}.",
    "If it is {{ph.pagibig-low-salary-limit}} or less, you save {{ph.pagibig-rates[employee-low]}}. Above that, {{ph.pagibig-rates[employee]}}.",
    "Your employer adds {{ph.pagibig-rates[employer]}} of the same fund salary.",
  ],
  ejemplo: ["On ₱25,000 a month the fund salary is ₱10,000. You save ₱200 and your employer adds ₱200, so ₱400 a month goes to your account."],
  faq: [
    {
      pregunta: "What is the maximum Pag-IBIG contribution?",
      respuesta: "₱200 a month from you and ₱200 from your employer, reached at a fund salary of {{ph.pagibig-max-fund-salary}}.",
    },
    {
      pregunta: "When did the Pag-IBIG contribution go up?",
      respuesta: "In February 2024 the maximum fund salary went from ₱5,000 to {{ph.pagibig-max-fund-salary}}. The rates stayed the same; the base they apply to doubled.",
    },
    {
      pregunta: "Why do I pay only 1%?",
      respuesta: "Members with a fund salary of {{ph.pagibig-low-salary-limit}} or less save {{ph.pagibig-rates[employee-low]}}. The employer still adds {{ph.pagibig-rates[employer]}}.",
    },
  ],
  glosario: [
    { termino: "Fund salary", definicion: "The monthly compensation Pag-IBIG uses to compute your savings, up to the maximum fund salary." },
    { termino: "Monthly membership savings", definicion: "The amount credited to your Pag-IBIG account each month, from you and your employer." },
  ],
});
