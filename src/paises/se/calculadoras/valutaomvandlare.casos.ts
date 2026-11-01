import { definirCasos } from "@/motor/calculo";
import valutaomvandlare from "./valutaomvandlare";

const RB = "https://api.riksbank.se/swea/v1/Observations/SEKEURPMI/2026-08-25/2026-10-24";

export default definirCasos(valutaomvandlare, [
  {
    nombre: "100 euro till kronor, 23 oktober 2026",
    origen: { tipo: "oficial", url: RB, detalle: "Riksbankens mittkurs SEKEURPMI 23 oktober 2026: 11,131. 100 × 11,131 = 1 113,10 kr." },
    fecha: "2026-10-24",
    entrada: { valuta: "eur", riktning: "till-sek", belopp: 100 },
    esperado: { resultat: 1113.1, kurs: 11.131 },
  },
  {
    nombre: "1 000 kronor till dollar",
    origen: { tipo: "oficial", url: "https://api.riksbank.se/swea/v1/Observations/SEKUSDPMI/2026-08-25/2026-10-24", detalle: "Mittkurs SEKUSDPMI 23 oktober 2026: 9,94461. 1 000 / 9,94461 = 100,56 USD." },
    fecha: "2026-10-24",
    entrada: { valuta: "usd", riktning: "fran-sek", belopp: 1000 },
    esperado: { resultat: 100.56 },
  },
  {
    nombre: "Belopp noll",
    origen: { tipo: "recalculado", url: RB, detalle: "Utan belopp finns inget att räkna om." },
    fecha: "2026-10-24",
    entrada: { valuta: "eur", riktning: "till-sek", belopp: 0 },
    esperaError: true,
  },
]);
