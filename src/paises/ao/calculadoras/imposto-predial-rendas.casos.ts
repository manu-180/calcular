import { definirCasos } from "@/motor/calculo";
import impostoPredialRendas from "./imposto-predial-rendas";

const AGT = "https://portaldocontribuinte.minfin.gov.ao/impostos-e-taxas/imposto-predial-urbano";

export default definirCasos(impostoPredialRendas, [
  {
    nombre: "Renda de 500 000 Kz",
    origen: { tipo: "recalculado", url: AGT, detalle: "Dedução de 40 %: 200 000. Colectável 300 000. Imposto 25 % = 75 000. Líquido 425 000." },
    fecha: "2026-10-24",
    entrada: { renda: 500000 },
    esperado: { deducao: 200000, colectavel: 300000, imposto: 75000, liquido: 425000, efectiva: 15 },
  },
  {
    nombre: "Renda anual de 3 milhões",
    origen: { tipo: "recalculado", url: AGT, detalle: "3 000 000 × 60 % × 25 % = 450 000." },
    fecha: "2026-10-24",
    entrada: { renda: 3000000 },
    esperado: { imposto: 450000 },
  },
]);
