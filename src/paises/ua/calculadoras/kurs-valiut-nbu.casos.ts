import { definirCasos } from "@/motor/calculo";
import kursValiutNbu from "./kurs-valiut-nbu";

const NBU = "https://bank.gov.ua/NBU_Exchange/exchange_site?start=20260901&end=20261024&valcode=usd&sort=exchangedate&order=asc&json";

export default definirCasos(kursValiutNbu, [
  {
    nombre: "100 USD за курсом НБУ на 20.10.2026",
    origen: { tipo: "oficial", url: NBU, detalle: "Офіційний курс НБУ на 20.10.2026: 45,0013 грн за 1 USD; 100 × 45,0013 = 4500,13." },
    fecha: "2026-10-20",
    entrada: { valiuta: "usd", napriamok: "v-hryvni", suma: 100 },
    esperado: { rezultat: 4500.13, kurs: 45.0013, fecha: "2026-10-20" },
  },
  {
    nombre: "10 000 грн у євро на 20.10.2026",
    origen: { tipo: "oficial", url: "https://bank.gov.ua/NBU_Exchange/exchange_site?start=20260901&end=20261024&valcode=eur&sort=exchangedate&order=asc&json", detalle: "Курс 50,5311; 10 000 / 50,5311 = 197,90 EUR." },
    fecha: "2026-10-20",
    entrada: { valiuta: "eur", napriamok: "z-hryven", suma: 10000 },
    esperado: { rezultat: 197.9, valiutaRezultatu: "євро (EUR)" },
  },
  {
    nombre: "1000 PLN на 24.10.2026",
    origen: { tipo: "oficial", url: "https://bank.gov.ua/NBU_Exchange/exchange_site?start=20260901&end=20261024&valcode=pln&sort=exchangedate&order=asc&json", detalle: "Курс 11,5401; 1000 × 11,5401 = 11 540,10." },
    fecha: "2026-10-24",
    entrada: { valiuta: "pln", napriamok: "v-hryvni", suma: 1000 },
    esperado: { rezultat: 11540.1 },
  },
  {
    nombre: "Нульова сума",
    origen: { tipo: "recalculado", url: NBU, detalle: "Без суми нічого перераховувати." },
    fecha: "2026-10-20",
    entrada: { valiuta: "usd", napriamok: "v-hryvni", suma: 0 },
    esperaError: true,
  },
]);
