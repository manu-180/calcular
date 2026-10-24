import { definirCasos } from "@/motor/calculo";
import nafaqa from "./ishdan-boshatish-nafaqasi";

const MK = "https://lex.uz/uz/docs/-6257288";

export default definirCasos(nafaqa, [
  {
    nombre: "Staj 4 yil, shtat qisqarishi",
    origen: { tipo: "recalculado", url: MK, detalle: "173-modda uchinchi qismi: 3–5 yil, 75%; 6 000 000 × 75% = 4 500 000." },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 4, sabab: "ish-beruvchi" },
    esperado: { nafaqa: 4500000, foiz: 75 },
  },
  {
    nombre: "Staj 2 yil",
    origen: { tipo: "recalculado", url: MK, detalle: "Uch yilgacha: 50%; 3 000 000." },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 2, sabab: "ish-beruvchi" },
    esperado: { nafaqa: 3000000, foiz: 50 },
  },
  {
    nombre: "Staj 12 yil, yangi shartlarni rad etish",
    origen: { tipo: "recalculado", url: MK, detalle: "173-modda ikkinchi qismi; 10–15 yil: 150%; 9 000 000." },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 12, sabab: "rad-etish" },
    esperado: { nafaqa: 9000000, foiz: 150 },
  },
  {
    nombre: "Staj 20 yil",
    origen: { tipo: "recalculado", url: MK, detalle: "Oʻn besh yildan ortiq: 200%; 12 000 000." },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 20, sabab: "ish-beruvchi" },
    esperado: { nafaqa: 12000000, foiz: 200 },
  },
  {
    nombre: "Aybli harakat",
    origen: { tipo: "recalculado", url: MK, detalle: "173-modda: aybli asoslarda nafaqa toʻlanmaydi." },
    fecha: "2026-10-24",
    entrada: { oylik: 6000000, staj: 8, sabab: "aybli" },
    esperado: { nafaqa: 0 },
  },
]);
