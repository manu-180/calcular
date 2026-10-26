import { definirCasos } from "@/motor/calculo";
import malyZusPlus from "./maly-zus-plus";

const SUS = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000199";

export default definirCasos(malyZusPlus, [
  {
    nombre: "Dochód 60 000 zł w 2025 r., cały rok",
    origen: {
      tipo: "recalculado",
      url: SUS,
      detalle: "Art. 18c ust. 3 i 4: 60 000 / 365 × 30 = 4931,51; × 0,5 = 2465,76. Składki: 481,32 + 197,26 + 41,18 + 60,41 + FP i FS 60,41 = 840,58.",
    },
    fecha: "2026-10-24",
    entrada: { przychod: 100000, dochod: 60000, dni: 365, chorobowe: true, fpFs: true },
    esperado: { sredniDochod: 4931.51, podstawa: 2465.76, emerytalne: 481.32, rentowe: 197.26, wypadkowe: 41.18, chorobowe: 60.41, razem: 840.58, oszczednosc: 1086.18 },
  },
  {
    nombre: "Niski dochód: podstawa minimalna",
    origen: { tipo: "recalculado", url: SUS, detalle: "10 000 / 365 × 30 × 0,5 = 410,96, mniej niż 1441,80; składki bez chorobowego i FP: 281,44 + 115,34 + 24,08 = 420,86." },
    fecha: "2026-10-24",
    entrada: { przychod: 50000, dochod: 10000, dni: 365, chorobowe: false, fpFs: false },
    esperado: { podstawa: 1441.8, razem: 420.86 },
  },
  {
    nombre: "Przychód ponad 120 000 zł",
    origen: { tipo: "recalculado", url: SUS, detalle: "Art. 18c ust. 1: limit 120 000 zł przychodu." },
    fecha: "2026-10-24",
    entrada: { przychod: 130000, dochod: 60000, dni: 365, chorobowe: true, fpFs: true },
    esperaError: true,
  },
  {
    nombre: "Działalność przez pół roku: limit proporcjonalny",
    origen: { tipo: "recalculado", url: SUS, detalle: "Art. 18c ust. 7: 120 000 / 365 × 182 = 59 835,62; przychód 70 000 zł go przekracza." },
    fecha: "2026-10-24",
    entrada: { przychod: 70000, dochod: 30000, dni: 182, chorobowe: true, fpFs: true },
    esperaError: true,
  },
]);
