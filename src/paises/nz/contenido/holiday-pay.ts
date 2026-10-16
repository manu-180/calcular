import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.holiday-pay",
  h1: "Holiday pay calculator NZ",
  title: "Holiday pay calculator NZ: annual leave and 8%",
  description:
    "Work out your annual holiday pay in New Zealand: the greater of ordinary weekly pay and average weekly earnings, or {{nz.holiday-pay-payg-rate}} holiday pay.",
  intro: [
    "After 12 months of continuous employment you're entitled to {{nz.annual-holidays-weeks}} weeks of paid annual holidays.",
    "When you take them, you're paid at least the greater of your ordinary weekly pay and your average weekly earnings. If you're paid holiday pay as you go, or you leave before your first year is up, it's {{nz.holiday-pay-payg-rate}} of your gross earnings.",
  ],
  comoSeCalcula: [
    "Average weekly earnings are your gross earnings for the last 12 months divided by 52. If you've worked less than a year, divide by the weeks you've worked.",
    "Your ordinary weekly pay is what you usually get for a normal week.",
    "Your holiday pay for each week off is the higher of the two. For pay-as-you-go or when you leave in your first year, it's {{nz.holiday-pay-payg-rate}} of your gross earnings.",
  ],
  ejemplo: ["You earned $57,200 in the last year and your normal week pays $1,000. Your average weekly earnings are $1,100, so two weeks off pays $2,200."],
  faq: [
    {
      pregunta: "Who can get 8% holiday pay with each pay?",
      respuesta:
        "Your employer can agree to it if you're on a fixed-term agreement of less than 12 months, or your work is so irregular that it's not practical to give you 4 weeks off in the normal way.",
    },
    {
      pregunta: "What happens to my holiday pay when I leave?",
      respuesta:
        "Unused holidays you're already entitled to are paid out. If you haven't reached your first anniversary, or for the part-year since your last one, you get {{nz.holiday-pay-payg-rate}} of your gross earnings, less anything already paid for holidays.",
    },
    {
      pregunta: "Is holiday pay worked out again each time I take leave?",
      respuesta: "Yes. Each time, your employer compares your ordinary weekly pay at the start of the holiday with your average weekly earnings and pays the higher one.",
    },
  ],
  glosario: [
    { termino: "Ordinary weekly pay", definicion: "What your employment agreement pays you for a normal working week, including regular allowances and regular overtime." },
    { termino: "Average weekly earnings", definicion: "Your gross earnings for the last 12 months divided by 52." },
  ],
});
