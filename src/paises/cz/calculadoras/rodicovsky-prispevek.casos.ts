import { definirCasos } from "@/motor/calculo";
import rodicovskyPrispevek from "./rodicovsky-prispevek";

const SSP = "https://www.zakonyprolidi.cz/cs/1995-117";

export default definirCasos(rodicovskyPrispevek, [
  {
    nombre: "Mzda 40 000 Kč, čerpání 15 000 Kč měsíčně",
    origen: {
      tipo: "recalculado",
      url: SSP,
      detalle: "§ 30: 350 000 Kč. DVZ 40 000 × 12 / 365 = 1 315,07 → 1 316; 70 % z 30 × 1 316 = 27 636 Kč je strop. 350 000 / 15 000 = 23,3 → 24 měsíců, poslední výplata 5 000 Kč. Nejkratší čerpání 13 měsíců.",
    },
    fecha: "2026-10-24",
    entrada: { narozeni: "do-2026", vicercata: false, mzda: 40000, mesicne: 15000 },
    esperado: { celkem: 350000, maximum: 27636, mesice: 24, nejkratsi: 13, posledni: 5000 },
  },
  {
    nombre: "Bez příjmu, 10 000 Kč měsíčně",
    origen: { tipo: "recalculado", url: SSP, detalle: "Bez vyměřovacího základu nejvýše 15 000 Kč. 350 000 / 10 000 = 35 měsíců; nejkratší 24 měsíců." },
    fecha: "2026-10-24",
    entrada: { narozeni: "do-2026", vicercata: false, mzda: 0, mesicne: 10000 },
    esperado: { maximum: 15000, mesice: 35, nejkratsi: 24, posledni: 10000 },
  },
  {
    nombre: "Dvojčata narozená v roce 2027",
    origen: {
      tipo: "recalculado",
      url: "https://www.zakonyprolidi.cz/cs/2026-152",
      detalle: "Zákon č. 152/2026 Sb.: 400 000 Kč, u vícerčat dvojnásobek 800 000. Strop bez příjmu 2 × 15 000 = 30 000. 800 000 / 30 000 = 26,7 → 27 měsíců, poslední výplata 20 000.",
    },
    fecha: "2026-10-24",
    entrada: { narozeni: "od-2027", vicercata: true, mzda: 0, mesicne: 30000 },
    esperado: { celkem: 800000, maximum: 30000, mesice: 27, posledni: 20000 },
  },
  {
    nombre: "Nízké čerpání přes tři roky",
    origen: { tipo: "recalculado", url: SSP, detalle: "350 000 / 8 000 = 43,75 → 44 měsíců, víc než 36 měsíců do 3 let věku dítěte." },
    fecha: "2026-10-24",
    entrada: { narozeni: "do-2026", vicercata: false, mzda: 30000, mesicne: 8000 },
    esperado: { mesice: 44 },
  },
  {
    nombre: "Bez příjmu nelze čerpat 20 000 Kč",
    origen: { tipo: "recalculado", url: SSP, detalle: "Bez vyměřovacího základu nejvýše 15 000 Kč měsíčně." },
    fecha: "2026-10-24",
    entrada: { narozeni: "do-2026", vicercata: false, mzda: 0, mesicne: 20000 },
    esperaError: true,
  },
]);
