import { definirCasos } from "@/motor/calculo";
import kalkulatorZaBoleduvanje from "./kalkulator-za-boleduvanje";

const KD = "https://portal.mdt.gov.mk/post-body-files/socijalno-partnerstvo-file-kXFT.pdf";

export default definirCasos(kalkulatorZaBoleduvanje, [
  {
    nombre: "7 дена: 70 %",
    origen: { tipo: "recalculado", url: KD, detalle: "Член 19: 60.000 / 30 × 7 = 14.000; × 70 % = 9.800." },
    fecha: "2026-11-01",
    entrada: { osnovica: 60000, denovi: 7, rabotni: 30 },
    esperado: { nadomest: 9800, procent: 70 },
  },
  {
    nombre: "15 дена: 80 %",
    origen: { tipo: "recalculado", url: KD, detalle: "Член 19: 60.000 / 30 × 15 = 30.000; × 80 % = 24.000." },
    fecha: "2026-11-01",
    entrada: { osnovica: 60000, denovi: 15, rabotni: 30 },
    esperado: { nadomest: 24000, procent: 80 },
  },
  {
    nombre: "20 дена: 90 %",
    origen: { tipo: "recalculado", url: KD, detalle: "Член 19: 60.000 / 30 × 20 = 40.000; × 90 % = 36.000." },
    fecha: "2026-11-01",
    entrada: { osnovica: 60000, denovi: 20, rabotni: 30 },
    esperado: { nadomest: 36000, procent: 90 },
  },
]);
