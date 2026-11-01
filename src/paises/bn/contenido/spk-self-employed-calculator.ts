import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bn.spk-self-employed-calculator",
  h1: "SPK self-employed calculator {{anio}}: Match-Up",
  title: "SPK self-employed {{anio}}: Government Match-Up",
  description:
    "Pay {{bn.se-minimum}} to {{bn.se-maximum}} a month into SPK as a verified self-employed member and the Government adds {{bn.se-matchup}}. See where your money goes.",
  intro: [
    "If you work for yourself in Brunei Darussalam you can save for retirement in the Skim Persaraan Kebangsaan (SPK), the scheme run by the Employees Trust Fund (TAP). Verified self-employed members get a fixed Government Match-Up of {{bn.se-matchup}} when they pay in at least {{bn.se-minimum}} in a month.",
    "Enter what you pay in and your status with TAP. The calculator shows how much reaches the SPK Retirement Account, which pays a lifetime annuity, and how much stays in the Member Account, where you can withdraw under the scheme rules.",
  ],
  comoSeCalcula: [
    "Verified members: contributions from {{bn.se-minimum}} to {{bn.se-maximum}} go to the Retirement Account, and the Government adds {{bn.se-matchup}}. Anything above {{bn.se-maximum}} goes to the Member Account as voluntary savings.",
    "Contributions below {{bn.se-minimum}} get no Match-Up and are credited to the Member Account.",
    "Unverified members get no Match-Up. Any amount is a voluntary contribution to the Member Account, up to {{bn.se-unverified-cap}} a month.",
  ],
  ejemplo: [
    "A verified member who pays BND 50 sees BND 40.00 go to the Retirement Account, a Match-Up of BND 17.50 on top, and BND 10.00 land in the Member Account. At BND 40 a month the Retirement Account grows by BND 57.50 a month, BND 690.00 a year.",
  ],
  faq: [
    {
      pregunta: "Who can register as self-employed?",
      respuesta: "Citizens and permanent residents of Brunei Darussalam under 60 who meet TAP's conditions and provide documents that verify their self-employment. TAP publishes the registration steps and the documents it needs.",
    },
    {
      pregunta: "Can I withdraw my money early?",
      respuesta: "Money in the Member Account can be withdrawn for pre-retirement purposes, subject to eligibility. The Retirement Account pays an annuity.",
    },
    {
      pregunta: "Is there a minimum for unverified members?",
      respuesta: "No. TAP states there is no minimum voluntary contribution for the Member Account, and the maximum is {{bn.se-unverified-cap}} a month.",
    },
  ],
  glosario: [
    { termino: "Government Match-Up", definicion: "A fixed amount the Government adds to a verified self-employed member's contribution." },
    { termino: "Retirement Account", definicion: "The SPK pooled account that pays a lifetime monthly annuity." },
    { termino: "Member Account", definicion: "The SPK account that holds your voluntary money and can be withdrawn under the rules." },
  ],
});
