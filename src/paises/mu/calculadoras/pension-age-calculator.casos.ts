import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-age-calculator";

const NPA = "https://www.mra.mu/download/TheNationalPensionsAct1976.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Turns 60 in March 2027",
    origen: { tipo: "oficial", url: NPA, detalle: "Tenth Schedule: 60 in March 2027, pension age 62 in March 2029. Section 3A(1)(b): can claim from 60. Eleventh Schedule: Rs 15,555." },
    fecha: "2026-10-24",
    entrada: { nacimiento: "1967-03-15", inicio: null },
    esperado: { mensual: 15555, edad: 62, fechaPension: "2029-03-15", primera: "2027-03-15", sesenta: "2027-03-15", ajuste: 0 },
  },
  {
    nombre: "Same person starting at 60",
    origen: { tipo: "recalculado", url: NPA, detalle: "Section 3A(2)(a): 24 months early × 0.5% = 12% less. 15,555 × 0.88 = 13,688.40." },
    fecha: "2026-10-24",
    entrada: { nacimiento: "1967-03-15", inicio: "2027-03-01" },
    esperado: { mensual: 13688.4, ajuste: -12 },
  },
  {
    nombre: "Same person deferring to 64",
    origen: { tipo: "recalculado", url: NPA, detalle: "Section 3A(2)(b): 24 months after pension age × 0.5% = 12% more. 15,555 × 1.12 = 17,421.60." },
    fecha: "2026-10-24",
    entrada: { nacimiento: "1967-03-15", inicio: "2031-03-01" },
    esperado: { mensual: 17421.6, ajuste: 12 },
  },
  {
    nombre: "Turns 60 in 2035, starts at 66",
    origen: { tipo: "recalculado", url: NPA, detalle: "Section 3B: pension age 65, basis Rs 16,555. 12 months after 65 × 0.75% = 9%. 16,555 × 1.09 = 18,044.95." },
    fecha: "2026-10-24",
    entrada: { nacimiento: "1975-06-10", inicio: "2041-06-01" },
    esperado: { mensual: 18044.95, edad: 65, fechaPension: "2040-06-10", base: 16555 },
  },
  {
    nombre: "Already 60 before September 2025",
    origen: { tipo: "oficial", url: NPA, detalle: "Section 3(1)(a) and Second Schedule: basic retirement pension Rs 15,555 under 90." },
    fecha: "2026-10-24",
    entrada: { nacimiento: "1960-05-01", inicio: null },
    esperado: { mensual: 15555, edad: 60 },
  },
  {
    nombre: "Turns 60 in October 2025",
    origen: { tipo: "oficial", url: NPA, detalle: "Tenth Schedule: pension age 61 in October 2026 (section 3(1)(b))." },
    fecha: "2026-10-24",
    entrada: { nacimiento: "1965-10-05", inicio: null },
    esperado: { edad: 61, fechaPension: "2026-10-05", primera: "2026-10-05" },
  },
  {
    nombre: "Claim before January 2027 for someone turning 60 in 2026",
    origen: { tipo: "oficial", url: NPA, detalle: "Section 3A(1)(a): eligible from 1 January 2027." },
    fecha: "2026-10-24",
    entrada: { nacimiento: "1966-02-20", inicio: "2026-12-01" },
    esperaError: true,
  },
]);
