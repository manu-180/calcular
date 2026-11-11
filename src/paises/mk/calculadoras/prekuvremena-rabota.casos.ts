import { definirCasos } from "@/motor/calculo";
import prekuvremenaRabota from "./prekuvremena-rabota";

const KD = "https://portal.mdt.gov.mk/post-body-files/socijalno-partnerstvo-file-kXFT.pdf";
const ALAP = { bruto: 60000, chasoviMesec: 168, chasovi: 10, vid: "prekuvremena", godishno: null };

export default definirCasos(prekuvremenaRabota, [
  {
    nombre: "Јавен сектор, 10 часа прекувремено",
    origen: { tipo: "recalculado", url: KD, detalle: "Член 16: 35 %. 60.000 / 168 = 357,14; × 10 = 3.571,43; додаток 1.250; вкупно 4.821,43." },
    fecha: "2026-11-01",
    entrada: { ...ALAP, sektor: "javen", drugProcent: null },
    esperado: { chas: 357, osnova: 3571, dodatok: 1250, vkupno: 4821, procent: 35 },
  },
  {
    nombre: "Јавен сектор, работа во недела",
    origen: { tipo: "recalculado", url: KD, detalle: "Член 16: 50 %; 3.571,43 × 50 % = 1.785,71." },
    fecha: "2026-11-01",
    entrada: { ...ALAP, vid: "nedela", sektor: "javen", drugProcent: null },
    esperado: { dodatok: 1786, procent: 50 },
  },
  {
    nombre: "Приватен сектор со процент од договор",
    origen: { tipo: "recalculado", url: KD, detalle: "Процентот го внесува корисникот: 40 % × 3.571,43 = 1.428,57." },
    fecha: "2026-11-01",
    entrada: { ...ALAP, sektor: "drug", drugProcent: 40 },
    esperado: { dodatok: 1429, procent: 40 },
  },
]);
