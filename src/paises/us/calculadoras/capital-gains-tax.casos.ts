import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax";

const RP = "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Single, long-term gain straddling the 0% limit",
    origen: { tipo: "recalculado", url: RP, detalle: "0% up to 49450: 9450 of the gain. The other 10550 at 15% = 1582.50." },
    fecha: "2026-10-14",
    entrada: { estado: "single", ganancia: 20000, plazo: "largo", ordinario: 40000, magi: null },
    esperado: { al0: 9450, al15: 10550, al20: 0, impuesto: 1582.5, niit: 0, pagar: 1582.5, efectiva: 7.91, neto: 18417.5 },
  },
  {
    nombre: "Married couple in the 20% band with the net investment income tax",
    origen: {
      tipo: "recalculado",
      url: RP,
      detalle: "15% from 600000 to 613700: 13700 = 2055. 20% on 86300 = 17260. NIIT 3.8% of the lesser of 100000 and 720000 - 250000 = 3800. Total 23115.",
    },
    fecha: "2026-10-14",
    entrada: { estado: "mfj", ganancia: 100000, plazo: "largo", ordinario: 600000, magi: 720000 },
    esperado: { al15: 13700, al20: 86300, impuesto: 19315, niit: 3800, pagar: 23115 },
  },
  {
    nombre: "Short-term gain taxed as ordinary income",
    origen: { tipo: "recalculado", url: RP, detalle: "Tax on 60000 = 7912, tax on 40000 = 4552. Difference 3360." },
    fecha: "2026-10-14",
    entrada: { estado: "single", ganancia: 20000, plazo: "corto", ordinario: 40000, magi: null },
    esperado: { impuesto: 3360, pagar: 3360, al0: 0 },
  },
  {
    nombre: "Head of household fully in the 0% band",
    origen: { tipo: "recalculado", url: RP, detalle: "30000 + 30000 = 60000 is under 66200: no tax." },
    fecha: "2026-10-14",
    entrada: { estado: "hoh", ganancia: 30000, plazo: "largo", ordinario: 30000, magi: null },
    esperado: { al0: 30000, impuesto: 0, pagar: 0 },
  },
]);
