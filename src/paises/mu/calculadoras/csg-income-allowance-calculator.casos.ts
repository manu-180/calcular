import { definirCasos } from "@/motor/calculo";
import calculadora from "./csg-income-allowance-calculator";

const ACT = "https://www.mra.mu/download/SocialContributionAndSocialBenefitsAct2021.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Rs 22,000, not on the Social Register, 2026-27",
    origen: { tipo: "oficial", url: ACT, detalle: "Seventh Schedule Part I: above 20,000 up to 25,000, July 2026 to June 2027: 833. On the Register: 2,500." },
    fecha: "2026-10-24",
    entrada: { ingreso: 22000, registro: false },
    esperado: { subsidio: 833, conRegistro: 2500, anual: 9996 },
  },
  {
    nombre: "Rs 18,000 on the Social Register",
    origen: { tipo: "oficial", url: ACT, detalle: "Not exceeding 20,000: 3,000." },
    fecha: "2026-10-24",
    entrada: { ingreso: 18000, registro: true },
    esperado: { subsidio: 3000 },
  },
  {
    nombre: "Rs 35,000, not on the Register, in 2025-26",
    origen: { tipo: "oficial", url: ACT, detalle: "Above 30,000 up to 50,000, July 2025 to June 2026: 1,000." },
    fecha: "2026-03-15",
    entrada: { ingreso: 35000, registro: false },
    esperado: { subsidio: 1000 },
  },
  {
    nombre: "Exactly Rs 20,000",
    origen: { tipo: "oficial", url: ACT, detalle: "Not exceeding 20,000, not on the Register, 2026-27: 1,000." },
    fecha: "2026-10-24",
    entrada: { ingreso: 20000, registro: false },
    esperado: { subsidio: 1000 },
  },
  {
    nombre: "Above Rs 50,000",
    origen: { tipo: "oficial", url: ACT, detalle: "No allowance above 50,000." },
    fecha: "2026-10-24",
    entrada: { ingreso: 50001, registro: true },
    esperado: { subsidio: 0 },
  },
  {
    nombre: "July 2027, not on the Register",
    origen: { tipo: "oficial", url: ACT, detalle: "Section 30B(3)(b): paid only for July 2025 to June 2027." },
    fecha: "2027-07-15",
    entrada: { ingreso: 22000, registro: false },
    esperado: { subsidio: 0, conRegistro: 2500 },
  },
]);
