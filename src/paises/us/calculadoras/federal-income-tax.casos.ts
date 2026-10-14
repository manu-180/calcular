import { definirCasos } from "@/motor/calculo";
import calculadora from "./federal-income-tax";

const RP = "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Single filer with $75,000 of AGI in 2026",
    origen: { tipo: "recalculado", url: RP, detalle: "75000 - 16100 = 58900 taxable. Table 3: 5800 + 22% of (58900 - 50400) = 5800 + 1870 = 7670." },
    fecha: "2026-10-14",
    entrada: { estado: "single", ingreso: 75000, itemizadas: null, mayores: 0, ciegos: 0, retenido: null },
    esperado: { deduccion: 16100, gravable: 58900, impuesto: 7670, marginal: 22, efectiva: 10.23, reembolso: null },
  },
  {
    nombre: "Married couple, both 65 or older, with withholding",
    origen: {
      tipo: "recalculado",
      detalle: "Standard 32200 + 2 x 1650 = 35500. Senior deduction 2 x 6000 (MAGI under 150000). Taxable 120000 - 35500 - 12000 = 72500. Tax 2480 + 12% of 47700 = 8204. Refund 9000 - 8204 = 796.",
    },
    fecha: "2026-10-14",
    entrada: { estado: "mfj", ingreso: 120000, itemizadas: null, mayores: 2, ciegos: 0, retenido: 9000 },
    esperado: { deduccion: 35500, senior: 12000, gravable: 72500, impuesto: 8204, reembolso: 796, aPagar: 0 },
  },
  {
    nombre: "Single senior above the senior deduction threshold",
    origen: {
      tipo: "recalculado",
      detalle: "Standard 16100 + 2050 = 18150. Senior: 6000 - 6% of (100000 - 75000) = 4500. Taxable 77350. Tax 5800 + 22% of 26950 = 11729.",
    },
    fecha: "2026-10-14",
    entrada: { estado: "single", ingreso: 100000, itemizadas: null, mayores: 1, ciegos: 0, retenido: null },
    esperado: { deduccion: 18150, senior: 4500, gravable: 77350, impuesto: 11729 },
  },
  {
    nombre: "Head of household who itemizes",
    origen: { tipo: "recalculado", detalle: "Itemized 30000 beats 24150. Taxable 220000. Table 2: 39207 + 32% of (220000 - 201750) = 45047." },
    fecha: "2026-10-14",
    entrada: { estado: "hoh", ingreso: 250000, itemizadas: 30000, mayores: 0, ciegos: 0, retenido: 50000 },
    esperado: { deduccion: 30000, tipoDeduccion: "Itemized", gravable: 220000, impuesto: 45047, marginal: 32, reembolso: 4953, aPagar: 0 },
  },
  {
    nombre: "Married filing separately in the top bracket",
    origen: { tipo: "recalculado", detalle: "500000 - 16100 = 483900. Table 4: 103291.75 + 37% of (483900 - 384350) = 140125.25." },
    fecha: "2026-10-14",
    entrada: { estado: "mfs", ingreso: 500000, itemizadas: null, mayores: 0, ciegos: 0, retenido: null },
    esperado: { gravable: 483900, impuesto: 140125.25, marginal: 37 },
  },
  {
    nombre: "A single return cannot count two seniors",
    origen: { tipo: "recalculado", detalle: "Only a joint return has two people." },
    fecha: "2026-10-14",
    entrada: { estado: "single", ingreso: 50000, itemizadas: null, mayores: 2, ciegos: 0, retenido: null },
    esperaError: true,
  },
]);
