import { definirCasos } from "@/motor/calculo";
import otpusknoy from "./otpusknoy-hisoblash";

const MK = "https://lex.uz/uz/docs/-6257288";

export default definirCasos(otpusknoy, [
  {
    nombre: "6 000 000 soʻm, 21 kun, 2-noyabrdan",
    origen: {
      tipo: "recalculado",
      url: MK,
      detalle: "2-22-noyabr: yakshanbalar 8, 15, 22 (233-modda: haq toʻlanmaydi); 18 kun. 257-modda: 6 000 000 / 25,3 × 18 = 4 268 774,7 → 4 268 775; soliq 12% = 512 253.",
    },
    fecha: "2026-10-24",
    entrada: { manba: "oylik", jami: null, oylar: null, oylik: 6000000, boshlanish: "2026-11-02", kunlar: 21 },
    esperado: { tatilPuli: 4268775, haqTolanadigan: 18, yakshanba: 3, soliq: 512253, qolga: 3756522, tugash: "2026-11-22" },
  },
  {
    nombre: "Dekabrda Konstitutsiya kuni bilan",
    origen: {
      tipo: "recalculado",
      url: MK,
      detalle: "1-dekabrdan 21 kun; 8-dekabr bayram (208-modda), taʼtilga qoʻshilmaydi (221-modda): oxirgi kun 22-dekabr. Yakshanbalar 6, 13, 20; 18 kun × 5 000 000 / 25,3 = 3 557 312,25 → 3 557 312.",
    },
    fecha: "2026-10-24",
    entrada: { manba: "oylik", jami: null, oylar: null, oylik: 5000000, boshlanish: "2026-12-01", kunlar: 21 },
    esperado: { tatilPuli: 3557312, haqTolanadigan: 18, tugash: "2026-12-22" },
  },
  {
    nombre: "12 oylik jami summadan",
    origen: { tipo: "recalculado", url: MK, detalle: "257-modda: 72 000 000 / 12 = 6 000 000 oʻrtacha; qolgani birinchi holat bilan bir xil." },
    fecha: "2026-10-24",
    entrada: { manba: "jami", jami: 72000000, oylar: 12, oylik: null, boshlanish: "2026-11-02", kunlar: 21 },
    esperado: { ortacha: 6000000, tatilPuli: 4268775 },
  },
  {
    nombre: "8 oy ishlagan xodim",
    origen: { tipo: "recalculado", url: MK, detalle: "257-modda: 40 000 000 / 8 = 5 000 000; 26-oktabrdan 14 kun: yakshanbalar 1 va 8-noyabr, 12 kun; 5 000 000 / 25,3 × 12 = 2 371 541,5 → 2 371 542." },
    fecha: "2026-10-24",
    entrada: { manba: "jami", jami: 40000000, oylar: 8, oylik: null, boshlanish: "2026-10-26", kunlar: 14 },
    esperado: { ortacha: 5000000, haqTolanadigan: 12, tatilPuli: 2371542 },
  },
]);
