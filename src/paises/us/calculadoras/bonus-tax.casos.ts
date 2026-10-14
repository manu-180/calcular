import { definirCasos } from "@/motor/calculo";
import calculadora from "./bonus-tax";

export default definirCasos(calculadora, [
  {
    nombre: "$5,000 bonus with $60,000 already earned",
    origen: { tipo: "recalculado", url: "https://www.irs.gov/pub/irs-pdf/p15.pdf", detalle: "Pub. 15 section 7: withhold a flat 22%. 1100 federal, 310 Social Security, 72.50 Medicare, net 3517.50." },
    fecha: "2026-10-14",
    entrada: { bono: 5000, salariosPrevios: 60000, suplementariosPrevios: null },
    esperado: { federal: 1100, socialSecurity: 310, medicare: 72.5, neto: 3517.5, porcentajeNeto: 70.35 },
  },
  {
    nombre: "Bonus that crosses $1 million of supplemental pay",
    origen: {
      tipo: "recalculado",
      detalle: "200000 at 22% = 44000 and 300000 at 37% = 111000. No Social Security above the wage base. Medicare 7250 + 0.9% of 500000 = 11750. Net 333250.",
    },
    fecha: "2026-10-14",
    entrada: { bono: 500000, salariosPrevios: 900000, suplementariosPrevios: 800000 },
    esperado: { federal: 155000, socialSecurity: 0, medicare: 11750, neto: 333250 },
  },
  {
    nombre: "Bonus that reaches the Social Security wage base",
    origen: { tipo: "recalculado", detalle: "Room left under the wage base: 4500, and 6.2% of it is 279. Wages reach 190000, so no Additional Medicare. Medicare 145." },
    fecha: "2026-10-14",
    entrada: { bono: 10000, salariosPrevios: 180000, suplementariosPrevios: 0 },
    esperado: { federal: 2200, socialSecurity: 279, medicare: 145, neto: 7376 },
  },
]);
