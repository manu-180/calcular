import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.salary-calculator",
  h1: "Salary calculator Trinidad and Tobago",
  title: "Salary calculator Trinidad 2026: net pay after PAYE and NIS",
  description:
    "Work out your take-home pay after PAYE, NIS and Health Surcharge. Uses the {{tt.personal-allowance}} personal allowance and the 2026 NIS table.",
  intro: [
    "Put in your gross monthly salary and see what lands in your account on payday. Each statutory deduction shows on its own line, the way it appears on your payslip.",
    "The figures follow the rules of the Inland Revenue Division (IRD) and the National Insurance Board (NIBTT) in force today.",
  ],
  comoSeCalcula: [
    "NIS: your monthly pay puts you in one of 16 earnings classes. You pay the weekly amount for your class once for every Monday in the month. In the top class it is {{tt.nis-employee-monthly[-1].cuotaFija}} a week.",
    "Health Surcharge: {{tt.health-surcharge-high}} a week if you earn more than {{tt.health-surcharge-threshold-monthly}} a month, {{tt.health-surcharge-low}} a week if you earn less.",
    "Chargeable income: a year of salary less the personal allowance of {{tt.personal-allowance}} and {{tt.nis-deductible-share}} of your NIS plus pension contributions, up to {{tt.pension-nis-deduction-cap}} for both.",
    "PAYE: {{tt.income-tax-rate}} of chargeable income up to {{tt.income-tax-higher-band}} and {{tt.income-tax-higher-rate}} above that, spread over 12 months.",
  ],
  ejemplo: [
    "On TT$15,000 a month in a month with four Mondays you pay NIS of TT$678, Health Surcharge of TT$33 and PAYE of TT$1,746.46. You take home TT$12,542.54.",
  ],
  faq: [
    {
      pregunta: "How much can I earn before paying income tax?",
      respuesta:
        "The personal allowance is {{tt.personal-allowance}} a year, so one twelfth of it is tax-free each month. Because part of your NIS is deductible too, PAYE starts a little above that.",
    },
    {
      pregunta: "Why is my NIS higher in some months?",
      respuesta: "NIS is a weekly contribution. Your employer deducts one for each Monday in the pay month, so a month with five Mondays has one extra week of NIS.",
    },
    {
      pregunta: "Who does not pay Health Surcharge?",
      respuesta: "It is not deducted from employees under 16, people aged 60 and over, or anyone whose only income is a pension.",
    },
    {
      pregunta: "Why is my payslip different?",
      respuesta:
        "Your employer may also deduct union dues, credit union savings, loans or group health insurance. If you claimed other deductions on your TD1, such as tertiary education or a first home, your PAYE will be lower.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn. Income tax your employer takes from each pay and sends to the Board of Inland Revenue." },
    { termino: "NIS", definicion: "National Insurance. It pays retirement pensions, sickness, maternity and other benefits." },
    { termino: "Health Surcharge", definicion: "A fixed weekly charge on employment income that helps fund public health care." },
    { termino: "TD1", definicion: "The form you give your employer so PAYE takes your allowances and deductions into account." },
  ],
});
