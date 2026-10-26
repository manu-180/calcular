import { definirCasos } from "@/motor/calculo";
import ortacha from "./ortacha-ish-haqi-hisoblash";

const MK = "https://lex.uz/uz/docs/-6257288";

export default definirCasos(ortacha, [
  {
    nombre: "12 oyda 72 000 000 soʻm",
    origen: { tipo: "recalculado", url: MK, detalle: "257-modda: 72 000 000 / 12 = 6 000 000; kunlik 6 000 000 / 25,3 = 237 154,15 → 237 154; soatlik 6 000 000 / 168 = 35 714,29 → 35 714." },
    fecha: "2026-10-24",
    entrada: { jami: 72000000, oylar: 12, soatlar: 168 },
    esperado: { oylik: 6000000, kunlik: 237154, soatlik: 35714 },
  },
  {
    nombre: "5 oy ishlagan, soatsiz",
    origen: { tipo: "recalculado", url: MK, detalle: "257-modda: amalda ishlangan davr; 20 000 000 / 5 = 4 000 000; kunlik 158 102,77 → 158 103." },
    fecha: "2026-10-24",
    entrada: { jami: 20000000, oylar: 5, soatlar: null },
    esperado: { oylik: 4000000, kunlik: 158103, soatlik: null },
  },
]);
