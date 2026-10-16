import { definirCasos } from "@/motor/calculo";
import teuerungsrechner from "./teuerungsrechner";

const SNB = "https://data.snb.ch/api/cube/plkopr/data/csv/de";
const BFS = "https://www.admin.ch/de/newnsb/wNfni1DvzKuQ";

export default definirCasos(teuerungsrechner, [
  {
    nombre: "1000 Franken von Januar 2020 bis heute",
    origen: {
      tipo: "recalculado",
      url: SNB,
      detalle: "LIK Januar 2020 = 94,1; September 2026 = 101,5 (letzter Wert am 14.10.2026). Faktor 1,078640: 1078,64 Franken, Teuerung 7,86 %. Jahresteuerung 101,5 / 100,5 − 1 = 1,0 % wie in der BFS-Mitteilung.",
    },
    fecha: "2026-10-14",
    entrada: { betrag: 1000, von: "2020-01-15", bis: "2026-10-14" },
    esperado: { angepasst: 1078.64, differenz: 78.64, gesamt: 7.86397450, vorjahr: 0.99502488, monatAnfang: "Januar 2020", monatEnde: "September 2026", indexEnde: 101.5 },
    tolerancia: 0.005,
  },
  {
    nombre: "Jahresteuerung September 2026 laut BFS",
    origen: { tipo: "oficial", url: BFS, detalle: "BFS, 1. Oktober 2026: LIK September 2026 101,5 Punkte (Dezember 2025 = 100), +1,0 % gegenüber dem Vorjahresmonat." },
    fecha: "2026-10-14",
    entrada: { betrag: 100, von: "2025-09-01", bis: "2026-09-30" },
    esperado: { indexEnde: 101.5, vorjahr: 0.99502488 },
    tolerancia: 0.06,
  },
  {
    nombre: "Anfang nach dem letzten veröffentlichten Monat",
    origen: { tipo: "recalculado", detalle: "November 2026 ist am 14.10.2026 noch nicht veröffentlicht." },
    fecha: "2026-10-14",
    entrada: { betrag: 1000, von: "2026-11-01", bis: "2026-11-30" },
    esperaError: true,
  },
]);
