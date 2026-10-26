import { definirCasos } from "@/motor/calculo";
import doroPascha from "./doro-pascha";

const KYA = "https://ia37rg02wpsa01.blob.core.windows.net/fek/02/1981/19810200742.pdf";

export default definirCasos(doroPascha, [
  {
    nombre: "Μισθός 1.200 €, όλο το διάστημα",
    origen: { tipo: "recalculado", url: KYA, detalle: "Μισός μισθός × 1250 (με την αναλογία 1/24) = 625." },
    fecha: "2026-10-24",
    entrada: { typos: "misthos", misthos: 1200, imeromisthio: null, imeres: 120, analogiaAdeias: true },
    esperado: { doro: 625, prosafxisi: 25 },
  },
  {
    nombre: "60 ημέρες: 7,5 μερίδια του 1/15",
    origen: { tipo: "recalculado", url: KYA, detalle: "60 / 8 = 7,5 × 1/15 = 50% του 625 = 312,50." },
    fecha: "2026-10-24",
    entrada: { typos: "misthos", misthos: 1200, imeromisthio: null, imeres: 60, analogiaAdeias: true },
    esperado: { doro: 312.5, analogia: 50 },
  },
  {
    nombre: "Κατώτατο ημερομίσθιο 41,09 €: 15 ημερομίσθια",
    origen: { tipo: "oficial", url: KYA, detalle: "ΚΥΑ 19040/1981 άρθρο 1: 15 ημερομίσθια. 15 × 41,09 = 616,35." },
    fecha: "2026-10-24",
    entrada: { typos: "imeromisthio", misthos: null, imeromisthio: 41.09, imeres: 120, analogiaAdeias: false },
    esperado: { doro: 616.35 },
  },
  {
    nombre: "Χωρίς ημερομίσθιο",
    origen: { tipo: "recalculado", url: KYA, detalle: "Χωρίς αμοιβή δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-24",
    entrada: { typos: "imeromisthio", misthos: null, imeromisthio: null, imeres: 120, analogiaAdeias: false },
    esperaError: true,
  },
]);
