import { definirCasos } from "@/motor/calculo";
import kalkulatorWalut from "./kalkulator-walut";

export default definirCasos(kalkulatorWalut, [
  {
    nombre: "100 euro po kursie z 23.10.2026",
    origen: {
      tipo: "oficial",
      url: "https://api.nbp.pl/api/exchangerates/rates/a/eur/last/40/?format=json",
      detalle: "Tabela 207/A/NBP/2026 z 23.10.2026: EUR 4,3917; 100 × 4,3917 = 439,17 zł.",
    },
    fecha: "2026-10-24",
    entrada: { waluta: "eur", kierunek: "na-pln", kwota: 100 },
    esperado: { kurs: 4.3917, wynik: 439.17, fecha: "2026-10-23" },
  },
  {
    nombre: "1000 zł na dolary",
    origen: {
      tipo: "oficial",
      url: "https://api.nbp.pl/api/exchangerates/rates/a/usd/last/40/?format=json",
      detalle: "Tabela 207/A/NBP/2026: USD 3,9247; 1000 / 3,9247 = 254,80 USD.",
    },
    fecha: "2026-10-24",
    entrada: { waluta: "usd", kierunek: "z-pln", kwota: 1000 },
    esperado: { kurs: 3.9247, wynik: 254.8 },
  },
  {
    nombre: "Frank szwajcarski z podanym kursem",
    origen: { tipo: "recalculado", url: "https://api.nbp.pl/api/exchangerates/rates/a/chf/last/40/?format=json", detalle: "500 CHF × 4,5 = 2250 zł." },
    fecha: "2026-10-24",
    entrada: { waluta: "chf", kierunek: "na-pln", kwota: 500 },
    valores: { "pl.chf": { fecha: "2026-10-23", valor: 4.5 } },
    esperado: { wynik: 2250 },
  },
]);
