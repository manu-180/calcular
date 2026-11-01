import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.nssf-midterm-access-calculator",
  h1: "NSSF midterm access calculator Uganda",
  title: "NSSF midterm access calculator: how much can I get?",
  description: "Check if you qualify for NSSF midterm access in Uganda and how much you can claim: {{ug.nssf-midterm-share}} of your savings, or {{ug.nssf-midterm-share-disability}} for members with a disability.",
  intro: [
    "Midterm access lets you take part of your NSSF savings before retirement.",
    "Enter your balance, age and years of contributions to see if you qualify and the amount you can claim.",
  ],
  comoSeCalcula: [
    "You qualify at {{ug.nssf-midterm-age}} or older with at least {{ug.nssf-midterm-years}} of contributions. You can take up to {{ug.nssf-midterm-share}} of your accrued benefits.",
    "A member with a disability qualifies at {{ug.nssf-midterm-age-disability}} or older, also with {{ug.nssf-midterm-years}} of contributions, and can take {{ug.nssf-midterm-share-disability}}.",
    "The rest stays in the Fund until you claim your age benefit.",
  ],
  ejemplo: ["At 45, with 10 years of contributions and Ushs 40,000,000 saved, you can claim up to Ushs 8,000,000."],
  faq: [
    {
      pregunta: "What documents do I need?",
      respuesta: "A current passport photo, a valid ID such as your National ID, and proof of your bank account. Bring the originals to compare with the copies.",
    },
    {
      pregunta: "Can I take my whole balance?",
      respuesta: "Not as midterm access. The full balance is paid as the age benefit at 55, or as a withdrawal benefit at 50 after a year out of work.",
    },
    {
      pregunta: "What if I have a disability?",
      respuesta: "You can apply from {{ug.nssf-midterm-age-disability}} and take {{ug.nssf-midterm-share-disability}}. Add a letter from the National Council for Persons with Disabilities to your claim.",
    },
  ],
  glosario: [
    { termino: "Midterm access", definicion: "Early payment of part of your NSSF savings before retirement age." },
    { termino: "Accrued benefits", definicion: "Your contributions plus the interest NSSF has credited to them." },
  ],
});
