import { definirCasos } from "@/motor/calculo";
import kalkulatorInflacji from "./kalkulator-inflacji";

const GUS =
  "https://stat.gov.pl/obszary-tematyczne/ceny-handel/wskazniki-cen/wskazniki-cen-towarow-i-uslug-konsumpcyjnych-pot-inflacja-/miesieczne-wskazniki-cen-towarow-i-uslug-konsumpcyjnych-od-1982-roku/";

export default definirCasos(kalkulatorInflacji, [
  {
    nombre: "Grudzień 2024 do grudnia 2025: 2,4 %",
    origen: { tipo: "oficial", url: GUS, detalle: "GUS: grudzień 2025, grudzień poprzedniego roku = 100: 102,4. 1000 zł × 1,024 = 1024 zł." },
    fecha: "2026-10-24",
    entrada: { kwota: 1000, od: "2024-12-15", do: "2025-12-15" },
    esperado: { dzisiaj: 1024, roznica: 24 },
  },
  {
    nombre: "Styczeń 2020 do dziś: liczy do października 2026",
    origen: {
      tipo: "recalculado",
      url: GUS,
      detalle: "Indeks łańcuchowy (grudzień 1999 = 100): styczeń 2020 162,4202, październik 2026 245,4984; mnożnik 1,51150; 1000 zł → 1511,50 zł.",
    },
    fecha: "2026-11-19",
    entrada: { kwota: 1000, od: "2020-01-01", do: "2026-11-19" },
    esperado: { dzisiaj: 1511.5, roznica: 511.5, sila: 661.59, miesiacDo: "październik 2026" },
  },
  {
    nombre: "Miesiąc bez danych",
    origen: { tipo: "recalculado", url: GUS, detalle: "Listopad 2026 nie jest jeszcze opublikowany na 19.11.2026." },
    fecha: "2026-11-19",
    entrada: { kwota: 1000, od: "2026-11-01", do: "2026-11-19" },
    esperaError: true,
  },
]);
