import { definirCasos } from "@/motor/calculo";
import inflationsrechner from "./inflationsrechner";

const BBK = "https://api.statistiken.bundesbank.de/rest/data/BBDP1/M.DE.N.VPI.C.A00000.I20.A?startPeriod=2000-01&format=csv&lang=de";

export default definirCasos(inflationsrechner, [
  {
    nombre: "1000 Euro von Januar 2020 bis September 2026",
    origen: {
      tipo: "recalculado",
      url: BBK,
      detalle: "VPI Januar 2020 = 99,8; September 2026 = 126,6. Faktor 1,268537: 1268,54 Euro, Inflation 26,85 %. Vorjahr 126,6 / 122,6 − 1 = 3,26 %; Vormonat 126,6 / 125,8 − 1 = 0,64 %.",
    },
    fecha: "2026-10-14",
    entrada: { betrag: 1000, von: "2020-01-15", bis: "2026-10-14" },
    esperado: { angepasst: 1268.54, differenz: 268.54, gesamt: 26.85370741, vorjahr: 3.26264274, vormonat: 0.63593005, monatAnfang: "Januar 2020", monatEnde: "September 2026" },
    tolerancia: 0.005,
  },
  {
    nombre: "Anfang nach dem letzten veröffentlichten Monat",
    origen: { tipo: "recalculado", detalle: "November 2026 ist am 14.10.2026 noch nicht veröffentlicht." },
    fecha: "2026-10-14",
    entrada: { betrag: 1000, von: "2026-11-01", bis: "2026-11-30" },
    esperaError: true,
  },
]);
