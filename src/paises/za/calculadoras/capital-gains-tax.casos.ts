import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax";

export default definirCasos(calculadora, [
  {
    nombre: "R300 000 gain on shares, R500 000 other income",
    origen: {
      tipo: "recalculado",
      detalle: "300 000 − 50 000 exclusion = 250 000 × 40% = 100 000 taxable. Tax on 600 000 = 132 907, on 500 000 = 98 417 (after the primary rebate). Extra tax 34 490.",
    },
    fecha: "2026-10-14",
    entrada: { ganancia: 300000, residencia: false, otrasGanancias: null, ingreso: 500000, edad: "under-65" },
    esperado: { neta: 250000, gravable: 100000, impuesto: 34490 },
  },
  {
    nombre: "R3 500 000 gain on a primary residence",
    origen: {
      tipo: "recalculado",
      detalle: "3 000 000 residence exclusion leaves 500 000, less 50 000 = 450 000 × 40% = 180 000. Tax on 680 000 = 161 707, less 98 417 = 63 290.",
    },
    fecha: "2026-10-14",
    entrada: { ganancia: 3500000, residencia: true, otrasGanancias: null, ingreso: 500000, edad: "under-65" },
    esperado: { exclusionVivienda: 3000000, gravable: 180000, impuesto: 63290 },
  },
  {
    nombre: "Gain under the annual exclusion",
    origen: { tipo: "recalculado", detalle: "40 000 is below the 50 000 annual exclusion, so no tax." },
    fecha: "2026-10-14",
    entrada: { ganancia: 40000, residencia: false, otrasGanancias: null, ingreso: 300000, edad: "under-65" },
    esperado: { neta: 0, impuesto: 0 },
  },
]);
