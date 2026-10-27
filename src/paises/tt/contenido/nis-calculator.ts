import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.nis-calculator",
  h1: "NIS calculator Trinidad and Tobago",
  title: "NIS calculator 2026: contributions by earnings class",
  description: "Find your NIS earnings class and see what you and your employer pay each week and each month under the 2026 NIBTT table.",
  intro: [
    "National Insurance in Trinidad and Tobago is not a straight percentage. Your pay places you in one of 16 earnings classes, and each class has a fixed weekly contribution.",
    "Enter your pay to see your class, your share and your employer's share, using the table the National Insurance Board (NIBTT) applies from {{tt.nis-employee-weekly#desde}}.",
  ],
  comoSeCalcula: [
    "Weekly pay is matched to the weekly earnings column; monthly pay to the monthly column.",
    "Each class has a weekly amount for the employee and one for the employer. The employer pays twice what you pay.",
    "If you are paid monthly or fortnightly, one contribution is due for every Monday in the period.",
    "The lowest class starts at {{tt.nis-employee-weekly[0].desde}} a week. The top class starts at {{tt.nis-employee-weekly[-1].desde}} a week or {{tt.nis-employee-monthly[-1].desde}} a month, where your share is {{tt.nis-employee-weekly[-1].cuotaFija}} a week.",
  ],
  ejemplo: ["On TT$10,000 a month you are in class XII. In a month with four Mondays you pay TT$488 and your employer pays TT$976."],
  faq: [
    {
      pregunta: "How much is NIS in Trinidad in 2026?",
      respuesta:
        "The 2026 table is based on a contribution rate of 16.2% of the average earnings of each class. In the top class you pay {{tt.nis-employee-weekly[-1].cuotaFija}} a week and your employer pays {{tt.nis-employer-weekly[-1].cuotaFija}}.",
    },
    {
      pregunta: "Why does the number of Mondays matter?",
      respuesta: "NIS is counted in weeks. For monthly and fortnightly pay, the NIBTT counts one week for each Monday in the period, so some months have five contributions.",
    },
    {
      pregunta: "Do I pay NIS while on sick or maternity leave?",
      respuesta: "No contributions are due while you receive sickness, maternity or injury benefit from the NIBTT. The Board covers the contributions for those weeks.",
    },
    {
      pregunta: "When must my employer pay the contributions?",
      respuesta: "By the last day of the month they relate to, with a grace period up to the 15th of the next month.",
    },
  ],
  glosario: [
    { termino: "Earnings class", definicion: "One of the 16 pay bands in the NIBTT table. Each has a fixed weekly contribution." },
    { termino: "NIBTT", definicion: "National Insurance Board of Trinidad and Tobago, which collects contributions and pays benefits." },
  ],
});
