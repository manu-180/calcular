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
    nombre: "Styczeń 2020 do dziś: liczy do września 2026",
    origen: {
      tipo: "recalculado",
      url: GUS,
      detalle: "Indeks łańcuchowy (grudzień 1999 = 100): styczeń 2020 162,4202, wrzesień 2026 246,4491; mnożnik 1,51735; 1000 zł → 1517,35 zł.",
    },
    fecha: "2026-10-24",
    entrada: { kwota: 1000, od: "2020-01-01", do: "2026-10-24" },
    esperado: { dzisiaj: 1517.35, roznica: 517.35, sila: 659.04, miesiacDo: "wrzesień 2026" },
  },
  {
    nombre: "Miesiąc bez danych",
    origen: { tipo: "recalculado", url: GUS, detalle: "Październik 2026 nie jest jeszcze opublikowany na 24.10.2026." },
    fecha: "2026-10-24",
    entrada: { kwota: 1000, od: "2026-10-01", do: "2026-10-24" },
    esperaError: true,
  },
]);
