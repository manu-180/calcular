import { definirCasos } from "@/motor/calculo";
import inflyatsiya from "./inflyatsiya-kalkulyatori";

const STAT = "https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_1286.json";

export default definirCasos(inflyatsiya, [
  {
    nombre: "2021-yil yanvardan 2026-yil sentabrgacha",
    origen: { tipo: "recalculado", url: STAT, detalle: "Zanjir indeks: 2021-yanvar 101,0; 2026-sentabr 164,7551; 1 000 000 × 164,7551 / 101 = 1 631 238,6 → 1 631 239." },
    fecha: "2026-10-24",
    entrada: { summa: 1000000, dan: "2021-01-15", gacha: "2026-09-30" },
    esperado: { bugungi: 1631239, farq: 631239, oyDan: "2021-yil yanvar", oyGacha: "2026-yil sentabr" },
  },
  {
    nombre: "Oxirgi 12 oy, hali eʼlon qilinmagan oygacha",
    origen: { tipo: "recalculado", url: STAT, detalle: "Oktabr maʼlumoti yoʻq, sentabrgacha: 164,7551 / 154,8354 = 1,06407; 1 064 066." },
    fecha: "2026-10-24",
    entrada: { summa: 1000000, dan: "2025-09-01", gacha: "2026-10-24" },
    esperado: { bugungi: 1064066, oyGacha: "2026-yil sentabr" },
  },
  {
    nombre: "Besh yil: 2020-yil dekabrdan 2025-yil dekabrgacha",
    origen: { tipo: "recalculado", url: STAT, detalle: "158,1565 / 100 = 1,581565; jami 58,16%." },
    fecha: "2026-10-24",
    entrada: { summa: 10000000, dan: "2020-12-01", gacha: "2025-12-01" },
    esperado: { bugungi: 15815650, jami: 58.1565 },
    tolerancia: 0.01,
  },
]);
