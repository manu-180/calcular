import { definirCasos } from "@/motor/calculo";
import calculadora from "./zakat-calculator";

const KZH = "https://www.zakathouse.org.kw/calculate.aspx";

export default definirCasos(calculadora, [
  {
    nombre: "KD 5,000 in cash",
    origen: { tipo: "oficial", url: KZH, detalle: "Kuwait Zakat House, 18/10/2026: nisab KD 3,536.85 (85 g × 41.61). 5,000 × 2.5% = 125." },
    fecha: "2026-10-18",
    entrada: { efectivo: 5000, inversiones: 0, deudas: 0, pasivos: 0 },
    esperado: { zakat: 125, nisab: 3536.85, oro: 41.61 },
  },
  {
    nombre: "KD 3,000 is below the nisab",
    origen: { tipo: "oficial", url: KZH, detalle: "3,000 < 3,536.85: no zakat." },
    fecha: "2026-10-18",
    entrada: { efectivo: 3000, inversiones: 0, deudas: 0, pasivos: 0 },
    esperado: { zakat: 0 },
  },
  {
    nombre: "Cash, shares and a debt due",
    origen: { tipo: "recalculado", detalle: "4,000 + 2,000 + 500 − 1,500 = 5,000. 2.5% = 125." },
    fecha: "2026-10-18",
    entrada: { efectivo: 4000, inversiones: 2000, deudas: 500, pasivos: 1500 },
    esperado: { zakat: 125, patrimonio: 5000 },
  },
]);
