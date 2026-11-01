import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.overtime-calculator",
  h1: "Seychelles overtime calculator {{anio}}",
  title: "Seychelles overtime pay {{anio}}: {{sc.overtime-weekday-factor}} times on week-days",
  description: "Overtime pays {{sc.overtime-weekday-factor}} hours for each hour on a week-day and {{sc.overtime-holiday-factor}} on a holiday. Add your hours to see the pay.",
  intro: [
    "The Conditions of Employment Regulations set what an employer owes for extra hours. Each week-day hour pays {{sc.overtime-weekday-factor}} hours of normal pay. The rate depends on the day and on whether you are a standard worker or a shift worker.",
    "Choose how you are paid, enter the overtime hours and the calculator gives the total and the pay for each hour.",
  ],
  comoSeCalcula: [
    "On a week-day each overtime hour pays {{sc.overtime-weekday-factor}} hours of normal pay, for both standard and shift workers.",
    "A standard worker gets {{sc.overtime-holiday-factor}} hours of pay for each hour on a Sunday or public holiday. A shift worker gets the week-day rate on Sunday and {{sc.overtime-shift-public-holiday-factor}} hours of pay on a public holiday.",
    "A worker can be asked for up to {{sc.overtime-monthly-cap}} additional hours a month, and overtime is paid on top of normal wages. The wage in the Act does not include overtime.",
  ],
  ejemplo: [
    "A standard worker who earns SCR 100 an hour and works 10 overtime hours on week-days is owed 100 × 1.5 × 10, which is SCR 1,500. Four hours on a Sunday at the double rate add SCR 800.",
  ],
  faq: [
    {
      pregunta: "Can my employer give time off instead of money?",
      respuesta: "Yes, up to two thirds of the hours worked, unless you and your employer agree to turn some or all of the overtime into cash.",
    },
    {
      pregunta: "How is the hourly rate found for a monthly wage?",
      respuesta: "The Employment Act says wages are worked out on an hourly basis but does not fix a divisor. The calculator uses the monthly wage times 12 divided by 52 weeks of your normal hours.",
    },
    {
      pregunta: "What is the legal limit on overtime?",
      respuesta: "Regulation 6 lets a worker do up to 60 additional hours a month or an aggregate of 15 hours in a day. Regulation 3 caps the working week at 60 hours or the day at 12 hours, whichever is less.",
    },
  ],
  glosario: [
    { termino: "Shift worker", definicion: "A worker in a job that by its nature needs staff present at all times." },
    { termino: "Holiday", definicion: "In the regulations, a Sunday or a public holiday. A public holiday does not include a Sunday." },
    { termino: "Time off in lieu", definicion: "Paid rest given instead of overtime pay." },
  ],
});
