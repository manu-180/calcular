import { definirCasos } from "@/motor/calculo";
import haigus from "./haigushuvitis";

const RAKS = "https://www.riigiteataja.ee/akt/RaKS";
const TK = "https://tervisekassa.ee/en/people/benefits-provided-health-insurance-fund/sickness-benefit";

export default definirCasos(haigus, [
  {
    nombre: "Haigus 14 päeva",
    origen: { tipo: "recalculado", url: RAKS, detalle: "Tööandja: 10 800 / 181 × 70% × 5 = 208,84. Tervisekassa: 24 000 / 365 × 70% × 6 = 276,16. Kokku 485,00; 22% maha = 378,30." },
    fecha: "2026-10-15",
    entrada: { pohjus: "haigus", paevad: 14, aastatulu: 24000, kuueKuuTasu: 10800, kuueKuuPaevad: 181 },
    esperado: { tooandja: 208.84, tervisekassa: 276.16, kokku: 485, neto: 378.3, tasustamataPaevi: 3 },
  },
  {
    nombre: "Ülempiir 126,87 päevas",
    origen: { tipo: "oficial", url: TK, detalle: "Tervisekassa: 2026. aasta päevane ülempiir 126,87 eurot; 120 000 / 365 × 70% = 230,14 piirdub sellega." },
    fecha: "2026-10-15",
    entrada: { pohjus: "haigus", paevad: 9, aastatulu: 120000, kuueKuuTasu: 0, kuueKuuPaevad: 181 },
    esperado: { paevaHuvitis: 126.87, tervisekassa: 126.87 },
  },
  {
    nombre: "Hooldusleht 80% esimesest päevast",
    origen: { tipo: "recalculado", url: RAKS, detalle: "§ 54: 36 500 / 365 = 100; 80% = 80; × 5 = 400." },
    fecha: "2026-10-15",
    entrada: { pohjus: "hooldus", paevad: 5, aastatulu: 36500, kuueKuuTasu: null, kuueKuuPaevad: null },
    esperado: { tervisekassa: 400, tooandja: 0, tervisekassaPaevi: 5 },
  },
  {
    nombre: "Tööõnnetus 100% teisest päevast",
    origen: { tipo: "recalculado", url: TK, detalle: "36 500 / 365 = 100; 100%; päevad 2 kuni 5 = 4; 400." },
    fecha: "2026-10-15",
    entrada: { pohjus: "too", paevad: 5, aastatulu: 36500, kuueKuuTasu: null, kuueKuuPaevad: null },
    esperado: { tervisekassa: 400, tervisekassaPaevi: 4 },
  },
  { nombre: "Liiga pikk hooldusleht", origen: { tipo: "recalculado", url: RAKS, detalle: "§ 59: kuni 60 päeva." }, fecha: "2026-10-15", entrada: { pohjus: "hooldus", paevad: 90, aastatulu: 20000, kuueKuuTasu: null, kuueKuuPaevad: null }, esperaError: true },
]);
