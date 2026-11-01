import { definirCasos } from "@/motor/calculo";
import ogohlantirish from "./ogohlantirish-muddati";

const MK = "https://lex.uz/uz/docs/-6257288";

export default definirCasos(ogohlantirish, [
  {
    nombre: "Xodim oʻz xohishi bilan",
    origen: { tipo: "recalculado", url: MK, detalle: "160-modda: oʻn toʻrt kalendar kun, ertasidan boshlanadi; 24-oktabr + 14 = 7-noyabr." },
    fecha: "2026-10-24",
    entrada: { asos: "xodim", sana: "2026-10-24", oylik: null },
    esperado: { muddat: "14 kalendar kun", oxirgi: "2026-11-07", kompensatsiya: null },
  },
  {
    nombre: "Shtat qisqarishi, kompensatsiya bilan",
    origen: { tipo: "recalculado", url: MK, detalle: "165-modda 1-band: kamida ikki oy; 24-dekabr. Kompensatsiya 2 × 6 000 000 = 12 000 000." },
    fecha: "2026-10-24",
    entrada: { asos: "tugatish", sana: "2026-10-24", oylik: 6000000 },
    esperado: { muddat: "2 oy", oxirgi: "2026-12-24", kompensatsiya: 12000000 },
  },
  {
    nombre: "31-dekabrdan ikki oy",
    origen: { tipo: "recalculado", url: MK, detalle: "Fevralda 31 kun yoʻq: muddat 2027-yil 28-fevralda tugaydi." },
    fecha: "2026-12-31",
    entrada: { asos: "tugatish", sana: "2026-12-31", oylik: null },
    esperado: { oxirgi: "2027-02-28" },
  },
  {
    nombre: "Malaka yetarli emas",
    origen: { tipo: "recalculado", url: MK, detalle: "165-modda 2-band: kamida ikki hafta (14 kun)." },
    fecha: "2026-10-24",
    entrada: { asos: "malaka", sana: "2026-10-24", oylik: null },
    esperado: { muddat: "14 kalendar kun", oxirgi: "2026-11-07" },
  },
  {
    nombre: "Aybli harakat",
    origen: { tipo: "recalculado", url: MK, detalle: "165-modda 3-band: kamida uch kun." },
    fecha: "2026-10-24",
    entrada: { asos: "aybli", sana: "2026-10-24", oylik: null },
    esperado: { muddat: "3 kalendar kun", oxirgi: "2026-10-27" },
  },
]);
