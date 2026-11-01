import { definirCasos } from "@/motor/calculo";
import cursValutarBnr from "./curs-valutar-bnr";

const BNR = "https://curs.bnr.ro/nbrfxrates10days.xml";

export default definirCasos(cursValutarBnr, [
  {
    nombre: "100 de euro la cursul din 23.10.2026",
    origen: { tipo: "oficial", url: BNR, detalle: "Cursul de referință BNR din 23.10.2026: EUR 5,3495; 100 × 5,3495 = 534,95 lei." },
    fecha: "2026-10-24",
    entrada: { moneda: "eur", directie: "in-lei", suma: 100 },
    esperado: { curs: 5.3495, rezultat: 534.95, fecha: "2026-10-23" },
  },
  {
    nombre: "1.000 de lei în dolari",
    origen: { tipo: "oficial", url: BNR, detalle: "USD 4,7770 la 23.10.2026; 1.000 / 4,777 = 209,34 USD." },
    fecha: "2026-10-24",
    entrada: { moneda: "usd", directie: "din-lei", suma: 1000 },
    esperado: { curs: 4.777, rezultat: 209.34 },
  },
  {
    nombre: "Leu moldovenesc cu un curs dat",
    origen: { tipo: "recalculado", url: BNR, detalle: "1.000 MDL × 0,25 = 250 lei." },
    fecha: "2026-10-24",
    entrada: { moneda: "mdl", directie: "in-lei", suma: 1000 },
    valores: { "ro.mdl": { fecha: "2026-10-23", valor: 0.25 } },
    esperado: { rezultat: 250 },
  },
  {
    nombre: "Sumă zero",
    origen: { tipo: "recalculado", url: BNR, detalle: "Fără sumă nu există calcul." },
    fecha: "2026-10-24",
    entrada: { moneda: "eur", directie: "in-lei", suma: 0 },
    esperaError: true,
  },
]);
