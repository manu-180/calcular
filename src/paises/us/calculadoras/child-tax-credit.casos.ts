import { definirCasos } from "@/motor/calculo";
import calculadora from "./child-tax-credit";

const S8812 = "https://www.irs.gov/pub/irs-pdf/f1040s8.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Two children and a small tax bill",
    origen: { tipo: "recalculado", url: S8812, detalle: "2 x 2200 = 4400. 3000 cuts the tax. Refundable: lesser of 1400 left, 2 x 1700 and 15% of (80000 - 2500). Total 4400." },
    fecha: "2026-10-14",
    entrada: { estado: "mfj", ninos: 2, otros: 0, magi: 80000, impuesto: 3000, ganado: 80000 },
    esperado: { maximo: 4400, reduccion: 0, credito: 4400, noReembolsable: 3000, reembolsable: 1400, total: 4400 },
  },
  {
    nombre: "One child, refundable part capped",
    origen: { tipo: "recalculado", url: S8812, detalle: "2200 credit, 500 against tax, 1700 left, capped at 1700 per child." },
    fecha: "2026-10-14",
    entrada: { estado: "hoh", ninos: 1, otros: 0, magi: 30000, impuesto: 500, ganado: 30000 },
    esperado: { noReembolsable: 500, reembolsable: 1700, total: 2200 },
  },
  {
    nombre: "Low earnings limit the refund",
    origen: { tipo: "recalculado", url: S8812, detalle: "No tax. 15% of (12000 - 2500) = 1425, under 3 x 1700." },
    fecha: "2026-10-14",
    entrada: { estado: "hoh", ninos: 3, otros: 0, magi: 20000, impuesto: 0, ganado: 12000 },
    esperado: { credito: 6600, noReembolsable: 0, reembolsable: 1425, total: 1425 },
  },
  {
    nombre: "Joint return just over the threshold",
    origen: { tipo: "recalculado", url: S8812, detalle: "10500 over 400000 rounds up to 11000. 5% = 550. 4400 - 550 = 3850." },
    fecha: "2026-10-14",
    entrada: { estado: "mfj", ninos: 2, otros: 0, magi: 410500, impuesto: 50000, ganado: 410500 },
    esperado: { reduccion: 550, credito: 3850, noReembolsable: 3850, reembolsable: 0, total: 3850 },
  },
  {
    nombre: "Credit for other dependents",
    origen: { tipo: "recalculado", url: "https://www.irs.gov/credits-deductions/individuals/child-tax-credit", detalle: "1 child 2200 + 1 other dependent 500 = 2700, all against tax." },
    fecha: "2026-10-14",
    entrada: { estado: "single", ninos: 1, otros: 1, magi: 60000, impuesto: 4000, ganado: 60000 },
    esperado: { maximo: 2700, noReembolsable: 2700, total: 2700 },
  },
]);
