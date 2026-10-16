import { definirCasos } from "@/motor/calculo";
import calculadora from "./hdb-loan";

const CPF = "https://www.cpf.gov.sg/member/infohub/news/news-releases/government-extends-4-per-cent-interest-rate-floor-on-special-medisave-and-retirement-account-monies-until-31-december-2027";

export default definirCasos(calculadora, [
  {
    nombre: "$400,000 over 25 years at 2.6%",
    origen: { tipo: "recalculado", url: CPF, detalle: "r = 2.6% / 12. Instalment = 400,000 × r / (1 − (1 + r)^−300) = 1,814.68. Total 544,404, interest 144,404." },
    fecha: "2026-10-15",
    entrada: { monto: 400000, plazo: 25 },
    esperado: { cuota: 1814.68, total: 544404, intereses: 144404, primerInteres: 866.67 },
  },
  {
    nombre: "$300,000 over 20 years at 2.6%",
    origen: { tipo: "recalculado", url: CPF, detalle: "Instalment 1,604.36 over 240 months. Total 385,046.40, interest 85,046.40." },
    fecha: "2026-10-15",
    entrada: { monto: 300000, plazo: 20 },
    esperado: { cuota: 1604.36, intereses: 85046.4 },
  },
  {
    nombre: "Zero loan amount",
    origen: { tipo: "recalculado", detalle: "A loan needs an amount above zero." },
    fecha: "2026-10-15",
    entrada: { monto: 0, plazo: 25 },
    esperaError: true,
  },
]);
