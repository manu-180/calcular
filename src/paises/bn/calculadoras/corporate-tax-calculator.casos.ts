import { definirCasos } from "@/motor/calculo";
import calculadora from "./corporate-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Official example, rate of 22%",
    origen: { tipo: "oficial", url: "https://www.mof.gov.bn/div_revenue_typesoftaxes_incometax/", detalle: "Revenue Division example for chargeable income of 500,000 at 22%: 5,500 + 16,500 + 55,000 = 77,000." },
    fecha: "2026-10-29",
    valores: { "bn.corporate-tax-rate": 22 },
    entrada: { ingreso: 500000, tipo: "existing" },
    esperado: { impuesto: 77000, tramo1: 5500, tramo2: 16500, tramo3: 55000 },
  },
  {
    nombre: "Official example, rate of 20%",
    origen: { tipo: "oficial", url: "https://www.mof.gov.bn/div_revenue_typesoftaxes_incometax/", detalle: "Revenue Division example for chargeable income of 500,000 at 20%: 5,000 + 15,000 + 50,000 = 70,000." },
    fecha: "2026-10-29",
    valores: { "bn.corporate-tax-rate": 20 },
    entrada: { ingreso: 500000, tipo: "existing" },
    esperado: { impuesto: 70000, tramo1: 5000, tramo2: 15000, tramo3: 50000 },
  },
  {
    nombre: "BND 500,000 today",
    origen: { tipo: "recalculado", detalle: "18.5%: 100,000 x 25% x 18.5% = 4,625. 150,000 x 50% x 18.5% = 13,875. 250,000 x 18.5% = 46,250. Total 64,750." },
    fecha: "2026-10-29",
    entrada: { ingreso: 500000, tipo: "existing" },
    esperado: { impuesto: 64750, tramo1: 4625, tramo2: 13875, tramo3: 46250, despues: 435250, completo: 92500 },
  },
  {
    nombre: "New company, BND 500,000",
    origen: { tipo: "recalculado", detalle: "First 100,000 exempt. Next 150,000 x 50% x 18.5% = 13,875. Last 250,000 x 18.5% = 46,250. Total 60,125." },
    fecha: "2026-10-29",
    entrada: { ingreso: 500000, tipo: "new" },
    esperado: { impuesto: 60125, exento: 100000, tramo2: 13875, tramo3: 46250 },
  },
  {
    nombre: "Small existing company, BND 80,000",
    origen: { tipo: "recalculado", detalle: "80,000 x 25% x 18.5% = 3,700." },
    fecha: "2026-10-29",
    entrada: { ingreso: 80000, tipo: "existing" },
    esperado: { impuesto: 3700, tramo1: 3700 },
  },
  {
    nombre: "New company under the exemption",
    origen: { tipo: "recalculado", detalle: "80,000 is below the exempt 100,000, so no tax." },
    fecha: "2026-10-29",
    entrada: { ingreso: 80000, tipo: "new" },
    esperado: { impuesto: 0, exento: 80000 },
  },
]);
