import { definirCasos } from "@/motor/calculo";
import kasallik from "./kasallik-nafaqasi";

const VM = "https://lex.uz/uz/docs/-7926684";

export default definirCasos(kasallik, [
  {
    nombre: "10 kun, staj 120 oy",
    origen: {
      tipo: "recalculado",
      url: VM,
      detalle: "4-ilova, 16 va 18-band: 2–11-noyabr, yakshanba 8-noyabr chiqariladi, 9 kun; 6 000 000 / 25,3 × 80% × 9 = 1 707 509,9 → 1 707 510; soliq 12% = 204 901.",
    },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 120, boshlanish: "2026-11-02", kunlar: 10, oldingi: 0, hayit: 0, imtiyoz: false },
    esperado: { nafaqa: 1707510, koef: 80, kunlar: 9, dam: 1, soliq: 204901, qolga: 1502609 },
  },
  {
    nombre: "Staj 60 oy, imtiyozli toifa",
    origen: { tipo: "recalculado", url: VM, detalle: "18-band: 60%; 19-band: +20 foiz band = 80%; summa birinchi holat bilan bir xil." },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 60, boshlanish: "2026-11-02", kunlar: 10, oldingi: 0, hayit: 0, imtiyoz: true },
    esperado: { koef: 80, nafaqa: 1707510 },
  },
  {
    nombre: "Yuqori maosh va 8-dekabr",
    origen: {
      tipo: "recalculado",
      url: VM,
      detalle: "26-band: chegara 10 × 1 360 000 = 13 600 000; 17-band: 8-dekabr bayram; 7–11-dekabr, 4 kun; 13 600 000 / 25,3 × 60% × 4 = 1 290 118,6 → 1 290 119.",
    },
    fecha: "2026-10-24",
    entrada: { oylik: 20000000, staj: 50, boshlanish: "2026-12-07", kunlar: 5, oldingi: 0, hayit: 0, imtiyoz: false },
    esperado: { nafaqa: 1290119, kunlar: 4, koef: 60 },
  },
  {
    nombre: "77 kundan oshgan qismi",
    origen: {
      tipo: "recalculado",
      url: VM,
      detalle: "19-band: oldin 75 kun; 2 va 3-noyabr 80%, 4–6-noyabr 70%; 6 000 000 / 25,3 × (2 × 0,8 + 3 × 0,7) = 877 470,4 → 877 470.",
    },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 120, boshlanish: "2026-11-02", kunlar: 5, oldingi: 75, hayit: 0, imtiyoz: false },
    esperado: { nafaqa: 877470, kunlar: 5 },
  },
  {
    nombre: "Staj olti oydan kam",
    origen: { tipo: "recalculado", url: VM, detalle: "7-band (b): kamida olti oy sugʻurta staji talab qilinadi." },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 3, boshlanish: "2026-11-02", kunlar: 5, oldingi: 0, hayit: 0, imtiyoz: false },
    esperaError: true,
  },
]);
