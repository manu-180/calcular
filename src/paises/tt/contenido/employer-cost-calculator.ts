import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.employer-cost-calculator",
  h1: "Employer cost calculator Trinidad and Tobago",
  title: "Cost of an employee in Trinidad and Tobago {{anio}}",
  description: "Add the employer's share of NIS to a salary and see the real monthly and yearly cost of hiring in Trinidad and Tobago.",
  intro: [
    "Before you make a job offer, check what the salary really costs your business. On top of the gross pay you owe the employer's share of National Insurance.",
    "The figures use the 2026 NIBTT table, where the employer pays two thirds of each contribution.",
  ],
  comoSeCalcula: [
    "The monthly salary sets the NIS earnings class.",
    "The employer's weekly amount for that class is paid once for every Monday in the month. In the top class it is {{tt.nis-employer-monthly[-1].cuotaFija}} a week.",
    "The cost is the gross salary plus the employer's NIS. PAYE, Health Surcharge and the employee's NIS come out of the salary.",
  ],
  ejemplo: ["A TT$10,000 salary costs TT$11,057.33 in an average month, and TT$132,688 over a full year."],
  faq: [
    {
      pregunta: "How much NIS does an employer pay in Trinidad?",
      respuesta: "Twice the employee's share in every class. In the top class the employer pays {{tt.nis-employer-monthly[-1].cuotaFija}} a week against {{tt.nis-employee-monthly[-1].cuotaFija}} from the employee.",
    },
    {
      pregunta: "Does the employer pay Health Surcharge?",
      respuesta: "No. Health Surcharge is deducted from the employee's pay. The employer only collects it and pays it over with PAYE.",
    },
    {
      pregunta: "What else can add to the cost?",
      respuesta: "Group health plans, a company pension plan, vacation cover, bonuses and uniforms are common extras. They depend on the contract or collective agreement, so they are not included here.",
    },
  ],
  glosario: [{ termino: "Employer's contribution", definicion: "The part of each weekly NIS contribution paid by the employer, on top of the salary." }],
});
