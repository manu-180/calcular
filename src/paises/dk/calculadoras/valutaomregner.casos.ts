import { definirCasos } from "@/motor/calculo";
import valutaomregner from "./valutaomregner";

const NB = "https://www.nationalbanken.dk/api/currencyratesxml?lang=en";

export default definirCasos(valutaomregner, [
  {
    nombre: "100 euro til kroner",
    origen: { tipo: "oficial", url: NB, detalle: "Nationalbankens kurs 23. oktober 2026: EUR 747,48 kr. pr. 100. 100 euro = 747,48 kr." },
    fecha: "2026-10-24",
    entrada: { valuta: "eur", retning: "til-dkk", beloeb: 100 },
    esperado: { kurs100: 747.48, resultat: 747.48, dato: "2026-10-23" },
  },
  {
    nombre: "1.000 kroner til dollar",
    origen: { tipo: "oficial", url: NB, detalle: "USD 667,81 kr. pr. 100: 1.000 / 6,6781 = 149,74 dollar." },
    fecha: "2026-10-24",
    entrada: { valuta: "usd", retning: "fra-dkk", beloeb: 1000 },
    esperado: { resultat: 149.74 },
  },
  {
    nombre: "Svenske kroner med fast kurs",
    origen: { tipo: "recalculado", url: NB, detalle: "1.000 SEK ved kurs 70 = 700 kr." },
    fecha: "2026-10-24",
    entrada: { valuta: "sek", retning: "til-dkk", beloeb: 1000 },
    valores: { "dk.sek": { fecha: "2026-10-23", valor: 70 } },
    esperado: { resultat: 700 },
  },
]);
