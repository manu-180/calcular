import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.take-home-pay",
  h1: "Take-home pay calculator Philippines",
  title: "Take-home pay calculator: salary after tax, SSS, PhilHealth",
  description:
    "See your net pay after withholding tax, SSS, PhilHealth and Pag-IBIG, with the 2025 SSS table and the TRAIN tax rates in force since 2023.",
  intro: [
    "Enter your monthly basic salary and see what you actually receive after the three mandatory contributions and withholding tax.",
    "It uses the SSS schedule in force since January 2025, the PhilHealth premium of {{ph.philhealth-rate}} and the Pag-IBIG rates from Circular No. 460.",
  ],
  comoSeCalcula: [
    "SSS: your salary is matched to a monthly salary credit between {{ph.sss-msc-minimum}} and {{ph.sss-msc-maximum}}, and you pay {{ph.sss-employee-rate}} of it.",
    "PhilHealth: {{ph.philhealth-rate}} of your basic salary, counted from {{ph.philhealth-floor}} up to {{ph.philhealth-ceiling}}. You pay half and your employer pays the other half.",
    "Pag-IBIG: {{ph.pagibig-rates[employee]}} of your salary up to {{ph.pagibig-max-fund-salary}}, so the most you pay is ₱200 a month.",
    "Withholding tax: your three contributions come off first. The rest is taxed with the graduated rates of the Tax Code, worked out for the year and divided by 12.",
  ],
  ejemplo: [
    "On ₱30,000 a month you pay ₱1,500 to SSS, ₱750 to PhilHealth and ₱200 to Pag-IBIG. Withholding tax is ₱1,007.50, so your take-home pay is ₱26,542.50.",
  ],
  faq: [
    {
      pregunta: "Are SSS, PhilHealth and Pag-IBIG taken off before tax?",
      respuesta:
        "Yes. Your share of the three contributions is not taxable, so withholding tax is computed on your pay after them. This is set in Revenue Regulations No. 8-2018.",
    },
    {
      pregunta: "Do minimum wage earners pay income tax?",
      respuesta:
        "No. The statutory minimum wage is exempt from income tax, and so are the holiday pay, overtime pay, night shift differential and hazard pay of a minimum wage earner.",
    },
    {
      pregunta: "Why is my SSS deduction higher than 5% of my salary?",
      respuesta:
        "SSS does not use your exact salary. It uses the monthly salary credit of your bracket, which can be up to ₱249.99 above your pay. Above ₱20,000 of credit, the extra goes to your MySSS Pension Booster account.",
    },
    {
      pregunta: "Is the 13th month pay included?",
      respuesta:
        "No. This shows a regular month. Your 13th month pay and other benefits are tax-free up to {{ph.thirteenth-month-exemption}} a year in total.",
    },
  ],
  glosario: [
    { termino: "Monthly salary credit (MSC)", definicion: "The amount SSS uses to compute your contribution and benefits, set by the bracket your pay falls in." },
    { termino: "Withholding tax", definicion: "The income tax your employer deducts from each payslip and pays to the BIR for you." },
    { termino: "MPF", definicion: "Mandatory Provident Fund, now called MySSS Pension Booster. It receives the contributions on salary credits above ₱20,000." },
  ],
});
