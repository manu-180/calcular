import { definirCasos } from "@/motor/calculo";
import arfolyamKalkulator from "./arfolyam-kalkulator";

const MNB = "https://www.mnb.hu/arfolyam-tablazat?deviza=rbCurrencySelect&devizaSelected=EUR&datefrom=01%2F09%2F2026&datetill=24%2F10%2F2026&order=1";

export default definirCasos(arfolyamKalkulator, [
  {
    nombre: "100 euró forintra, 2026. október 22-i árfolyam",
    origen: { tipo: "oficial", url: MNB, detalle: "MNB hivatalos árfolyam 2026. október 22.: 366,52 Ft/EUR; 100 × 366,52 = 36 652 Ft." },
    fecha: "2026-10-24",
    entrada: { deviza: "eur", irany: "forintra", osszeg: 100 },
    esperado: { eredmeny: 36652, arfolyam: 366.52, fecha: "2026-10-22" },
  },
  {
    nombre: "100 000 Ft dollárra",
    origen: { tipo: "recalculado", url: "https://www.mnb.hu/arfolyam-tablazat?deviza=rbCurrencySelect&devizaSelected=USD&datefrom=01%2F09%2F2026&datetill=24%2F10%2F2026&order=1", detalle: "100 000 / 326,23 = 306,53 USD." },
    fecha: "2026-10-24",
    entrada: { deviza: "usd", irany: "devizara", osszeg: 100000 },
    esperado: { eredmeny: 306.53 },
  },
]);
