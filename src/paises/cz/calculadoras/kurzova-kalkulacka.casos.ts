import { definirCasos } from "@/motor/calculo";
import kurzovaKalkulacka from "./kurzova-kalkulacka";

const CNB = "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/rok.txt?rok=2026";

export default definirCasos(kurzovaKalkulacka, [
  {
    nombre: "100 eur podle kurzu ze dne 23. 10. 2026",
    origen: { tipo: "oficial", url: CNB, detalle: "Kurz ČNB 23. 10. 2026: EUR 24,335 Kč. 100 × 24,335 = 2 433,50 Kč." },
    fecha: "2026-10-24",
    entrada: { mena: "eur", smer: "na-czk", castka: 100 },
    esperado: { kurz: 24.335, vysledek: 2433.5, fecha: "2026-10-23" },
  },
  {
    nombre: "1 000 Kč na americké dolary",
    origen: { tipo: "oficial", url: CNB, detalle: "Kurz ČNB 23. 10. 2026: USD 21,741 Kč. 1 000 / 21,741 = 46,00 USD." },
    fecha: "2026-10-24",
    entrada: { mena: "usd", smer: "z-czk", castka: 1000 },
    esperado: { kurz: 21.741, vysledek: 46 },
  },
  {
    nombre: "Polský zlotý",
    origen: { tipo: "oficial", url: CNB, detalle: "Kurz ČNB 23. 10. 2026: PLN 5,537 Kč. 500 × 5,537 = 2 768,50 Kč." },
    fecha: "2026-10-24",
    entrada: { mena: "pln", smer: "na-czk", castka: 500 },
    esperado: { vysledek: 2768.5 },
  },
  {
    nombre: "Švýcarský frank se zadaným kurzem",
    origen: { tipo: "recalculado", url: CNB, detalle: "200 CHF × 26 = 5 200 Kč." },
    fecha: "2026-10-24",
    entrada: { mena: "chf", smer: "na-czk", castka: 200 },
    valores: { "cz.chf": { fecha: "2026-10-23", valor: 26 } },
    esperado: { vysledek: 5200 },
  },
]);
