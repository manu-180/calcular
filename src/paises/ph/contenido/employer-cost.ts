import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.employer-cost",
  h1: "Employer cost calculator",
  title: "Employer cost of an employee in the Philippines",
  description:
    "See what an employee really costs each month: salary plus the employer share of SSS with EC, PhilHealth and Pag-IBIG, for one or several employees.",
  intro: [
    "Hiring someone costs more than the salary. Employers also pay their share of three mandatory contributions every month.",
    "Enter the monthly basic salary to see the full cost for one employee or for a whole team on the same pay.",
  ],
  comoSeCalcula: [
    "SSS: {{ph.sss-employer-rate}} of the monthly salary credit, plus the Employees' Compensation contribution of {{ph.sss-ec[below-15000]}} or {{ph.sss-ec[from-15000]}}.",
    "PhilHealth: the employer pays the other half of the {{ph.philhealth-rate}} premium, on income from {{ph.philhealth-floor}} up to {{ph.philhealth-ceiling}}.",
    "Pag-IBIG: {{ph.pagibig-rates[employer]}} of the fund salary, up to {{ph.pagibig-max-fund-salary}}.",
  ],
  ejemplo: ["For a ₱25,000 salary the employer pays ₱2,530 to SSS, ₱625 to PhilHealth and ₱200 to Pag-IBIG. The monthly cost is ₱28,355."],
  faq: [
    {
      pregunta: "How much does an employer pay for SSS?",
      respuesta: "{{ph.sss-employer-rate}} of the monthly salary credit, which can go up to {{ph.sss-msc-maximum}}, plus EC. At the top bracket that is ₱3,530 a month.",
    },
    {
      pregunta: "Is the 13th month pay included?",
      respuesta: "No. The figure is the regular monthly cost. Add the 13th month pay and any other benefits you give on top.",
    },
    {
      pregunta: "Who pays the EC contribution?",
      respuesta: "Only the employer. It is {{ph.sss-ec[below-15000]}} a month for salary credits below ₱15,000 and {{ph.sss-ec[from-15000]}} from ₱15,000 up.",
    },
  ],
  glosario: [
    { termino: "Employer counterpart", definicion: "The part of a contribution the employer pays on top of the employee's salary." },
    { termino: "EC", definicion: "Employees' Compensation, a contribution to the Employees' Compensation Program paid only by the employer." },
  ],
});
