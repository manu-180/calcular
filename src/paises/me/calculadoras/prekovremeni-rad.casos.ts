import { definirCasos } from "@/motor/calculo";
import prekovremeniRad from "./prekovremeni-rad";

const OKU = "https://wapi.gov.me/download/93e93f14-6531-47c8-b6cc-7e9c191965e2?version=1.0";

export default definirCasos(prekovremeniRad, [
  {
    nombre: "Deset časova uz 40 odsto",
    origen: { tipo: "recalculado", url: OKU, detalle: "1.000 / 173 = 5,78; x 10 = 57,80; + 40 % = 23,12; ukupno 80,92." },
    fecha: "2026-10-31",
    entrada: { bruto: 1000, casovaMjesecno: 173, prekovremeni: 10, sedmicno: 45, nocni: false, praznik: false, ugovoreno: null },
    esperado: { cas: 5.78, procenat: 40, uvecanje: 23.12, ukupno: 80.92 },
  },
  {
    nombre: "Noću na praznik",
    origen: { tipo: "recalculado", url: OKU, detalle: "Uvećanja se sabiraju: 40 + 40 + 150 = 230 %; 57,80 x 2,3 = 132,94; ukupno 190,74." },
    fecha: "2026-10-31",
    entrada: { bruto: 1000, casovaMjesecno: 173, prekovremeni: 10, sedmicno: 45, nocni: true, praznik: true, ugovoreno: null },
    esperado: { procenat: 230, uvecanje: 132.94, ukupno: 190.74 },
  },
  {
    nombre: "Veće uvećanje po ugovoru",
    origen: { tipo: "recalculado", url: OKU, detalle: "Ugovoreno 50 %: 57,80 x 0,5 = 28,90; ukupno 86,70." },
    fecha: "2026-10-31",
    entrada: { bruto: 1000, casovaMjesecno: 173, prekovremeni: 10, sedmicno: 45, nocni: false, praznik: false, ugovoreno: 50 },
    esperado: { procenat: 50, ukupno: 86.7 },
  },
  {
    nombre: "Bruto nula je greška",
    origen: { tipo: "recalculado", url: OKU, detalle: "Bez zarade nema cijene časa." },
    fecha: "2026-10-31",
    entrada: { bruto: 0, casovaMjesecno: 173, prekovremeni: 10, sedmicno: 45, nocni: false, praznik: false, ugovoreno: null },
    esperaError: true,
  },
]);
