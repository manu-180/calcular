import { definirCasos } from "@/motor/calculo";
import mietzinsrechner from "./mietzinsrechner";

const VMWG = "https://www.fedlex.admin.ch/eli/cc/1990/835_835_835/de#art_13";

export default definirCasos(mietzinsrechner, [
  {
    nombre: "Senkung von 1,75 auf 1,25 % mit Teuerung seit Dezember 2023",
    origen: {
      tipo: "recalculado",
      url: VMWG,
      detalle:
        "Zwei Viertelprozent tiefer: 1 / 1,03² − 1 = −5,7404 %. LIK Dezember 2023 = 99,3, September 2026 = 101,5: +2,2155 %, davon 40 % = +0,8862 % (Art. 16 VMWG). Total −4,8542 %: 2000 × 0,951458 = 1902,92.",
    },
    fecha: "2026-10-14",
    entrada: { miete: 2000, refAlt: 1.75, monatAlt: "2023-12-01", kosten: null },
    esperado: { refNeu: 1.25, hypothek: -5.74040909, teuerung: 0.88620342, total: -4.85420566, neu: 1902.92, differenz: -97.08, likMonat: "September 2026" },
    tolerancia: 0.005,
  },
  {
    nombre: "Erhöhung um ein Viertelprozent mit Kostensteigerung",
    origen: {
      tipo: "recalculado",
      url: VMWG,
      detalle: "Von 1,00 auf 1,25 %: +3 %. LIK September 2025 = 100,5 bis 101,5: +0,995 %, davon 40 % = 0,398 %. Kosten 0,5 %. Total 3,898 %: 1500 × 1,03898 = 1558,47.",
    },
    fecha: "2026-10-14",
    entrada: { miete: 1500, refAlt: 1, monatAlt: "2025-09-01", kosten: 0.5 },
    esperado: { hypothek: 3, teuerung: 0.39800995, total: 3.89800995, neu: 1558.47 },
    tolerancia: 0.005,
  },
  {
    nombre: "Referenzzinssatz ausserhalb der Viertelprozent-Schritte",
    origen: { tipo: "recalculado", detalle: "1,30 % ist kein möglicher Referenzzinssatz." },
    fecha: "2026-10-14",
    entrada: { miete: 1500, refAlt: 1.3, monatAlt: "2025-09-01", kosten: null },
    esperaError: true,
  },
]);
