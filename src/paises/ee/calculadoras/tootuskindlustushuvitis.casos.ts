import { definirCasos } from "@/motor/calculo";
import tkh from "./tootuskindlustushuvitis";

const TKA = "https://www.tootukassa.ee/et/teenused/tootuskindlustushuvitis/tootuskindlustushuvitise-suurus-ja-selle-arvutamine";
const TKS = "https://www.riigiteataja.ee/akt/TKindlS";

export default definirCasos(tkh, [
  {
    nombre: "Töötukassa näide: 50 eurot päevas",
    origen: { tipo: "oficial", url: TKA, detalle: "Töötukassa näide: keskmine 50 eurot; hüvitis 30 ja 20 eurot kalendripäevas; 180 päeva. 100 × 30 + 80 × 20 = 4600." },
    fecha: "2026-10-15",
    entrada: { tasu: 13500, staaz36: 36, staazAastad: 3, omaSoov: false },
    esperado: { algus: 30, hiljem: 20, paevad: 180, kokku: 4600 },
  },
  {
    nombre: "Staaž 6 aastat, 2000 eurot kuus",
    origen: { tipo: "recalculado", url: TKS, detalle: "§ 8 ja § 9: 18 000 / 270 = 66,67; 40 ja 26,67; 210 päeva: 4000 + 110 × 26,6667 = 6933,33." },
    fecha: "2026-10-15",
    entrada: { tasu: 18000, staaz36: 36, staazAastad: 6, omaSoov: false },
    esperado: { algus: 40, hiljem: 26.67, paevad: 210, kokku: 6933.33 },
  },
  {
    nombre: "Ülempiir",
    origen: { tipo: "oficial", url: TKA, detalle: "Töötukassa: 2026. aastal kuni 101,27 ja 67,51 eurot kalendripäevas." },
    fecha: "2026-10-15",
    entrada: { tasu: 90000, staaz36: 36, staazAastad: 12, omaSoov: false },
    esperado: { algus: 101.27, hiljem: 67.51, paevad: 300 },
  },
  {
    nombre: "Omal soovil: baasmäär",
    origen: { tipo: "oficial", url: TKA, detalle: "Töötukassa: baasmäär 14,77 eurot kalendripäevas; § 81: 180 päeva; 2658,60." },
    fecha: "2026-10-15",
    entrada: { tasu: 18000, staaz36: 36, staazAastad: 6, omaSoov: true },
    esperado: { algus: 14.77, paevad: 180, kokku: 2658.6, liik: "baasmäär" },
  },
  {
    nombre: "Väike palk: miinimum",
    origen: { tipo: "recalculado", url: TKS, detalle: "§ 9 lg 5: 40% jääb alla 14,77, seega 14,77." },
    fecha: "2026-10-15",
    entrada: { tasu: 6000, staaz36: 36, staazAastad: 1, omaSoov: false },
    esperado: { hiljem: 14.77 },
  },
  { nombre: "Liiga vähe staaži", origen: { tipo: "recalculado", url: TKS, detalle: "§ 61: vähemalt 8 kuud." }, fecha: "2026-10-15", entrada: { tasu: 6000, staaz36: 5, staazAastad: 1, omaSoov: false }, esperaError: true },
]);
