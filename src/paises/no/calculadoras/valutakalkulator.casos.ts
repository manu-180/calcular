import { definirCasos } from "@/motor/calculo";
import valutakalkulator from "./valutakalkulator";

const NB = "https://data.norges-bank.no/api/data/EXR/B.EUR+USD+SEK+DKK+GBP.NOK.SP?format=csv&startPeriod=2026-10-23&endPeriod=2026-10-23&locale=en";

export default definirCasos(valutakalkulator, [
  {
    nombre: "100 euro til kroner 23. oktober 2026",
    origen: { tipo: "oficial", url: NB, detalle: "Norges Bank 23.10.2026: EUR 10,4665. 100 × 10,4665 = 1 046,65." },
    fecha: "2026-10-23",
    entrada: { valuta: "eur", retning: "til-nok", belop: 100 },
    esperado: { resultat: 1046.65, kurs: 10.4665, dato: "2026-10-23" },
  },
  {
    nombre: "1 000 svenske kroner (kurs per 100 hos Norges Bank)",
    origen: { tipo: "oficial", url: NB, detalle: "SEK 94,03 per 100 = 0,9403 per krone. 1 000 × 0,9403 = 940,30." },
    fecha: "2026-10-23",
    entrada: { valuta: "sek", retning: "til-nok", belop: 1000 },
    esperado: { resultat: 940.3 },
  },
  {
    nombre: "1 000 kroner til dollar",
    origen: { tipo: "oficial", url: NB, detalle: "USD 9,3509. 1 000 / 9,3509 = 106,94." },
    fecha: "2026-10-23",
    entrada: { valuta: "usd", retning: "fra-nok", belop: 1000 },
    esperado: { resultat: 106.94 },
  },
]);
