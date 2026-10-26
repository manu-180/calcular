import { definirCasos } from "@/motor/calculo";
import ortiqcha from "./ortiqcha-ish-vaqti";

const MK = "https://lex.uz/uz/docs/-6257288";

export default definirCasos(ortiqcha, [
  {
    nombre: "Maosh 6 000 000, 4 kun × 3 soat, dam olish va tungi soatlar",
    origen: {
      tipo: "recalculado",
      url: MK,
      detalle:
        "Soatlik 6 000 000 / 168 = 35 714,29. 262-modda: kuniga 2 × 1,5 + 1 × 2 = 5 hissa, 4 kun = 20; 714 285,7 → 714 286. 263-modda: maoshdan tashqari 1 hissa × 8 soat = 285 714. 264-modda: 0,5 × 10 soat = 178 571.",
    },
    fecha: "2026-10-24",
    entrada: { tolov: "maosh", oylik: 6000000, norma: 168, stavka: null, kunlar: 4, soatKuniga: 3, noqulay: false, damOlish: 8, tungi: 10 },
    esperado: { ortiqcha: 714286, damOlishPuli: 285714, tungiQoshimcha: 178571, jami: 1178571, soatlik: 35714 },
  },
  {
    nombre: "Soatbay 40 000, noqulay sharoit",
    origen: { tipo: "recalculado", url: MK, detalle: "262-modda: noqulay sharoitda har soat 2 hissa; 2 kun × 2 soat × 2 × 40 000 = 320 000. 263-modda: soatbayga 2 hissa; 5 × 2 × 40 000 = 400 000." },
    fecha: "2026-10-24",
    entrada: { tolov: "soatbay", oylik: null, norma: null, stavka: 40000, kunlar: 2, soatKuniga: 2, noqulay: true, damOlish: 5, tungi: 0 },
    esperado: { ortiqcha: 320000, damOlishPuli: 400000, jami: 720000 },
  },
  {
    nombre: "Faqat ikki soat",
    origen: { tipo: "recalculado", url: MK, detalle: "Birinchi ikki soat 1,5 hissa: 5 kun × 2 × 1,5 × 30 000 = 450 000." },
    fecha: "2026-10-24",
    entrada: { tolov: "soatbay", oylik: null, norma: null, stavka: 30000, kunlar: 5, soatKuniga: 2, noqulay: false, damOlish: 0, tungi: 0 },
    esperado: { ortiqcha: 450000, jami: 450000 },
  },
]);
