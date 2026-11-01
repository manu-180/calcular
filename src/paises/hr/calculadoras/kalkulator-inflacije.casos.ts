import { definirCasos } from "@/motor/calculo";
import calc from "./kalkulator-inflacije";

const U = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr?geo=HR&unit=I25&coicop18=TOTAL";

export default definirCasos(calc, [
  {
    nombre: "Od siječnja 2020. do rujna 2026.",
    origen: { tipo: "recalculado", url: U, detalle: "1.000 x 105.42 / 74.82 = 1408.98." },
    fecha: "2026-11-01",
    entrada: { iznos: 1000, od: "2020-01-15", do: "2026-09-01" },
    esperado: { danas: 1408.98 },
  },
  {
    nombre: "Godina do rujna 2026.",
    origen: { tipo: "recalculado", url: U, detalle: "1.000 x 105.42 / 101.04 = 1043.35." },
    fecha: "2026-11-01",
    entrada: { iznos: 1000, od: "2025-09-01", do: "2026-09-30" },
    esperado: { danas: 1043.35 },
  },
  {
    nombre: "Završni mjesec još bez podatka",
    origen: { tipo: "recalculado", url: U, detalle: "Računa se do zadnjeg objavljenog mjeseca, rujna 2026." },
    fecha: "2026-11-01",
    entrada: { iznos: 1000, od: "2025-09-01", do: "2026-11-01" },
    esperado: { danas: 1043.35 },
  },
  {
    nombre: "Početni mjesec nakon završnog",
    origen: { tipo: "recalculado", url: U, detalle: "Greška unosa." },
    fecha: "2026-11-01",
    entrada: { iznos: 1000, od: "2026-06-01", do: "2026-01-01" },
    esperaError: true,
  },
]);
