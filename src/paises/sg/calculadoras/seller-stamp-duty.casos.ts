import { definirCasos } from "@/motor/calculo";
import calculadora from "./seller-stamp-duty";

const IRAS = "https://www.iras.gov.sg/taxes/stamp-duty/for-property/selling-or-disposing-property/seller's-stamp-duty-(ssd)-for-residential-property";

export default definirCasos(calculadora, [
  {
    nombre: "Bought after 4 Jul 2025, sold within 1 year",
    origen: { tipo: "oficial", url: IRAS, detalle: "IRAS example 3: holding period less than 1 year, 16% of the selling price. 16% × 1,200,000 = 192,000." },
    fecha: "2026-10-14",
    entrada: { precio: 1200000, compra: "2025-08-01", venta: "2026-06-30" },
    esperado: { ssd: 192000, tasa: 16, anio: 1 },
  },
  {
    nombre: "Bought after 4 Jul 2025, sold in the second year",
    origen: { tipo: "recalculado", url: IRAS, detalle: "More than 1 and up to 2 years: 12% × 1,200,000 = 144,000." },
    fecha: "2026-10-14",
    entrada: { precio: 1200000, compra: "2025-08-01", venta: "2026-10-14" },
    esperado: { ssd: 144000, tasa: 12, anio: 2 },
  },
  {
    nombre: "Bought in January 2024, sold in the third year",
    origen: { tipo: "recalculado", url: IRAS, detalle: "Bought between 11 Mar 2017 and 3 Jul 2025: more than 2 and up to 3 years is 4%. 4% × 900,000 = 36,000." },
    fecha: "2026-10-14",
    entrada: { precio: 900000, compra: "2024-01-15", venta: "2026-10-14" },
    esperado: { ssd: 36000, tasa: 4, anio: 3 },
  },
  {
    nombre: "Bought in 2022, past the 3-year holding period",
    origen: { tipo: "recalculado", detalle: "Sold more than 3 years after buying: no SSD." },
    fecha: "2026-10-14",
    entrada: { precio: 900000, compra: "2022-05-01", venta: "2026-10-14" },
    esperado: { ssd: 0, tasa: 0, anio: null },
  },
  {
    nombre: "Exactly on the first anniversary",
    origen: { tipo: "recalculado", detalle: "Selling on the first anniversary is still within 1 year: 16% × 1,000,000 = 160,000." },
    fecha: "2026-10-14",
    entrada: { precio: 1000000, compra: "2025-08-01", venta: "2026-08-01" },
    esperado: { ssd: 160000, anio: 1 },
  },
  {
    nombre: "Bought before 11 Mar 2017",
    origen: { tipo: "recalculado", detalle: "Outside the schedules this calculator covers." },
    fecha: "2026-10-14",
    entrada: { precio: 900000, compra: "2016-05-01", venta: "2026-10-14" },
    esperaError: true,
  },
]);
