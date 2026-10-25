import { definirCasos } from "@/motor/calculo";
import morarenter from "./morarenter";

const RENTE = "https://www.retsinformation.dk/eli/lta/2014/459";

export default definirCasos(morarenter, [
  {
    nombre: "10.000 kr. forfaldet 1. august 2026, betalt 24. oktober",
    origen: { tipo: "recalculado", url: RENTE, detalle: "§ 5: referencesats 2,00 % + 8 = 10 %. 84 dage: 10.000 × 10 % × 84 / 365 = 230,14." },
    fecha: "2026-10-24",
    entrada: { beloeb: 10000, forfald: "2026-08-01", betalt: "2026-10-24", rykkere: 0 },
    esperado: { dage: 84, renter: 230.14, satsNu: 10 },
  },
  {
    nombre: "Over to halvår med to rykkere",
    origen: {
      tipo: "recalculado",
      url: RENTE,
      detalle: "1. halvår 2026: 1,75 + 8 = 9,75 % i 60 dage = 160,27. 2. halvår: 10 % i 62 dage = 169,86. Renter 330,13; 2 rykkere à 100 kr. (§ 9 b); i alt 10.530,13.",
    },
    fecha: "2026-10-24",
    entrada: { beloeb: 10000, forfald: "2026-05-01", betalt: "2026-08-31", rykkere: 2 },
    esperado: { renter: 330.13, gebyr: 200, ialt: 10530.13, dage: 122 },
  },
  {
    nombre: "Betaling efter det sidste kendte halvår",
    origen: { tipo: "recalculado", url: RENTE, detalle: "Referencesatsen for 2027 er ikke fastsat endnu." },
    fecha: "2026-10-24",
    entrada: { beloeb: 10000, forfald: "2026-10-01", betalt: "2027-01-15", rykkere: 0 },
    esperaError: true,
  },
]);
