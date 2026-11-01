import { definirCasos } from "@/motor/calculo";
import cursValutarBnm from "./curs-valutar-bnm";

const BNM = "https://www.bnm.md/ro/official_exchange_rates?get_xml=1&date=26.10.2026";

export default definirCasos(cursValutarBnm, [
  {
    nombre: "100 de euro la cursul din 26.10.2026",
    origen: { tipo: "oficial", url: BNM, detalle: "Cursul oficial BNM din 26.10.2026: EUR 20,2242; 100 × 20,2242 = 2.022,42 lei." },
    fecha: "2026-10-26",
    entrada: { moneda: "eur", directie: "in-lei", suma: 100 },
    esperado: { curs: 20.2242, rezultat: 2022.42, fecha: "2026-10-26" },
  },
  {
    nombre: "1.000 de lei în dolari",
    origen: { tipo: "oficial", url: BNM, detalle: "USD 18,0638 la 26.10.2026; 1.000 / 18,0638 = 55,36 USD." },
    fecha: "2026-10-26",
    entrada: { moneda: "usd", directie: "din-lei", suma: 1000 },
    esperado: { curs: 18.0638, rezultat: 55.36 },
  },
  {
    nombre: "Leu românesc cu un curs dat",
    origen: { tipo: "recalculado", url: BNM, detalle: "500 RON × 3,8 = 1.900 MDL." },
    fecha: "2026-10-26",
    entrada: { moneda: "ron", directie: "in-lei", suma: 500 },
    valores: { "md.ron": { fecha: "2026-10-26", valor: 3.8 } },
    esperado: { rezultat: 1900 },
  },
  {
    nombre: "Sumă zero",
    origen: { tipo: "recalculado", url: BNM, detalle: "Fără sumă nu există calcul." },
    fecha: "2026-10-26",
    entrada: { moneda: "eur", directie: "in-lei", suma: 0 },
    esperaError: true,
  },
]);
