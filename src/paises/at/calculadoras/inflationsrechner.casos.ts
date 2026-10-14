import { definirCasos } from "@/motor/calculo";
import inflationsrechner from "./inflationsrechner";

const VPI = "https://data.statistik.gv.at/data/OGD_vpi00_VPI_2000_1.csv";

export default definirCasos(inflationsrechner, [
  {
    nombre: "1.000 Euro von Jänner 2020 bis August 2026",
    origen: { tipo: "recalculado", url: VPI, detalle: "VPI 2000: Jänner 2020 144,2, August 2026 192,7, August 2025 186,8. 1.000 × 192,7 / 144,2 = 1.336,34; Vorjahr 192,7 / 186,8 − 1 = 3,16 %." },
    fecha: "2026-10-14",
    entrada: { betrag: 1000, von: "2020-01-01", bis: "2026-08-01" },
    esperado: { angepasst: 1336.34, differenz: 336.34, indexAnfang: 144.2, indexEnde: 192.7, monatEnde: "August 2026", vorjahr: 3.1585 },
    tolerancia: 0.01,
  },
  {
    nombre: "Endmonat nach dem letzten Indexwert",
    origen: { tipo: "recalculado", url: VPI, detalle: "Für Oktober 2026 gibt es noch keinen Wert: gerechnet wird bis August 2026, 1.000 × 192,7 / 119,3 = 1.615,26." },
    fecha: "2026-10-14",
    entrada: { betrag: 1000, von: "2010-01-15", bis: "2026-10-14" },
    esperado: { angepasst: 1615.26, monatAnfang: "Jänner 2010", monatEnde: "August 2026" },
  },
  {
    nombre: "Vor Beginn der Reihe",
    origen: { tipo: "recalculado", url: VPI, detalle: "Die Reihe beginnt im Jänner 2001." },
    fecha: "2026-10-14",
    entrada: { betrag: 1000, von: "2000-06-01", bis: "2026-08-01" },
    esperaError: true,
  },
]);
