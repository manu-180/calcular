import { definirCasos } from "@/motor/calculo";
import doroChristougennon from "./doro-christougennon";

const KYA = "https://ia37rg02wpsa01.blob.core.windows.net/fek/02/1981/19810200742.pdf";

export default definirCasos(doroChristougennon, [
  {
    nombre: "Μισθός 1.200 €, όλο το διάστημα, με αναλογία επιδόματος αδείας",
    origen: { tipo: "recalculado", url: KYA, detalle: "Βάση 1200 × (1 + 0,5/12) = 1250. Ολόκληρο δώρο: ένας μισθός = 1250, από τα οποία 50 η αναλογία." },
    fecha: "2026-10-24",
    entrada: { typos: "misthos", misthos: 1200, imeromisthio: null, imeres: 245, analogiaAdeias: true },
    esperado: { doro: 1250, plires: 1250, analogia: 100, prosafxisi: 50 },
  },
  {
    nombre: "152 ημέρες: 8 φορές τα 2/25",
    origen: { tipo: "recalculado", url: KYA, detalle: "152 / 19 = 8 μερίδια × 2/25 = 64% του 1250 = 800." },
    fecha: "2026-10-24",
    entrada: { typos: "misthos", misthos: 1200, imeromisthio: null, imeres: 152, analogiaAdeias: true },
    esperado: { doro: 800, analogia: 64, prosafxisi: 32 },
  },
  {
    nombre: "Ημερομίσθιο 50 €: 25 ημερομίσθια για όλο το διάστημα",
    origen: { tipo: "oficial", url: KYA, detalle: "ΚΥΑ 19040/1981 άρθρο 1: 25 ημερομίσθια. 25 × 50 = 1250." },
    fecha: "2026-10-24",
    entrada: { typos: "imeromisthio", misthos: null, imeromisthio: 50, imeres: 245, analogiaAdeias: false },
    esperado: { doro: 1250, prosafxisi: 0 },
  },
  {
    nombre: "Ημερομίσθιο 50 €, 100 ημέρες",
    origen: { tipo: "recalculado", url: KYA, detalle: "100 / 19 × 2 = 10,526 ημερομίσθια × 50 = 526,32." },
    fecha: "2026-10-24",
    entrada: { typos: "imeromisthio", misthos: null, imeromisthio: 50, imeres: 100, analogiaAdeias: false },
    esperado: { doro: 526.32 },
  },
  {
    nombre: "Περισσότερες ημέρες από το διάστημα",
    origen: { tipo: "recalculado", url: KYA, detalle: "Από 1 Μαΐου έως 31 Δεκεμβρίου είναι 245 ημέρες." },
    fecha: "2026-10-24",
    entrada: { typos: "misthos", misthos: 1200, imeromisthio: null, imeres: 300, analogiaAdeias: true },
    esperaError: true,
  },
]);
