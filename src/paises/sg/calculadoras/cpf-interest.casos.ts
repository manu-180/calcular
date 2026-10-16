import { definirCasos } from "@/motor/calculo";
import calculadora from "./cpf-interest";

const CPF = "https://www.cpf.gov.sg/member/infohub/news/news-releases/government-extends-4-per-cent-interest-rate-floor-on-special-medisave-and-retirement-account-monies-until-31-december-2027";

export default definirCasos(calculadora, [
  {
    nombre: "Below 55 with $75,000 in total",
    origen: { tipo: "recalculado", url: CPF, detalle: "OA 40,000 × 2.5% = 1,000. SA + MA 35,000 × 4% = 1,400. Extra 1% on min(60,000, 20,000 + 35,000) = 550. Total 2,950." },
    fecha: "2026-10-15",
    entrada: { oa: 40000, sa: 20000, ma: 15000, mayor55: false },
    esperado: { total: 2950, interesOa: 1000, interesSma: 1400, extra: 550, base: 55000 },
  },
  {
    nombre: "Aged 55 and above with $130,000",
    origen: { tipo: "recalculado", url: CPF, detalle: "OA 10,000 × 2.5% = 250. RA + MA 120,000 × 4% = 4,800. Extra 2% on first 30,000 = 600 and 1% on next 30,000 = 300. Total 5,950." },
    fecha: "2026-10-15",
    entrada: { oa: 10000, sa: 100000, ma: 20000, mayor55: true },
    esperado: { total: 5950, extra: 900, base: 60000 },
  },
  {
    nombre: "OA only, below 55",
    origen: { tipo: "recalculado", url: CPF, detalle: "OA 5,000 × 2.5% = 125 plus extra 1% × 5,000 = 50. Total 175." },
    fecha: "2026-10-15",
    entrada: { oa: 5000, sa: 0, ma: 0, mayor55: false },
    esperado: { total: 175 },
  },
]);
