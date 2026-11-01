import { definirCasos } from "@/motor/calculo";
import dekret from "./dekret-puli-hisoblash";

const VM = "https://lex.uz/uz/docs/-7926684";

export default definirCasos(dekret, [
  {
    nombre: "126 kun, staj 70 oy",
    origen: {
      tipo: "recalculado",
      url: VM,
      detalle: "4-ilova: 2-noyabr 2026 dan 7-mart 2027 gacha 126 kun; 18 yakshanba, 8-dekabr va 1-yanvar bayram; 106 kun. 24-band: 100%. 6 000 000 / 25,3 × 106 = 25 138 339,9 → 25 138 340.",
    },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 70, turi: "oddiy", boshlanish: "2026-11-02" },
    esperado: { nafaqa: 25138340, koef: 100, kalendar: 126, kunlar: 106, dam: 20, tugash: "2027-03-07" },
  },
  {
    nombre: "140 kun, staj 30 oy",
    origen: {
      tipo: "recalculado",
      url: VM,
      detalle: "21-mart 2027 gacha 140 kun; 20 yakshanba, 3 bayram (8-dekabr, 1-yanvar, 8-mart); 117 kun. 85%: 6 000 000 / 25,3 × 0,85 × 117 = 23 584 980,2 → 23 584 980.",
    },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 30, turi: "murakkab", boshlanish: "2026-11-02" },
    esperado: { nafaqa: 23584980, koef: 85, kunlar: 117 },
  },
  {
    nombre: "Staj oʻn oydan kam",
    origen: { tipo: "recalculado", url: VM, detalle: "7-band (b): kamida oʻn oy." },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 8, turi: "oddiy", boshlanish: "2026-11-02" },
    esperaError: true,
  },
]);
