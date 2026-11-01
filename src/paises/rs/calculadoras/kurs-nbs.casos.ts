import { definirCasos } from "@/motor/calculo";
import kursNbs from "./kurs-nbs";

const NBS = "https://webappcenter.nbs.rs/ExchangeRateWebApp/ExchangeRate/CurrentMiddleRate";

export default definirCasos(kursNbs, [
  {
    nombre: "100 evra u dinare",
    origen: { tipo: "oficial", url: NBS, detalle: "Kursna lista 208 od 30. 10. 2026: EUR 117,5367; 100 puta kurs = 11.753,67." },
    fecha: "2026-10-31",
    entrada: { valuta: "eur", smer: "udinar", iznos: 100 },
    esperado: { rezultat: 11753.67, kurs: 117.5367, fecha: "2026-10-30" },
  },
  {
    nombre: "10.000 dinara u dolare",
    origen: { tipo: "recalculado", url: NBS, detalle: "10.000 / 105,056 = 95,19." },
    fecha: "2026-10-31",
    entrada: { valuta: "usd", smer: "uvalutu", iznos: 10000 },
    esperado: { rezultat: 95.19 },
  },
]);
