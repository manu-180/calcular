import { definirCasos } from "@/motor/calculo";
import traktamente from "./traktamente";

const SKV = "https://www.skatteverket.se/privat/skatter/beloppochprocent/2026.4.1522bf3f19aea8075ba89.html";

export default definirCasos(traktamente, [
  {
    nombre: "Tre hela dagar och en halv, frukost ingår två dagar",
    origen: { tipo: "recalculado", url: SKV, detalle: "3 × 300 + 150 = 1 050. Minskning för frukost 2 × 60 = 120. Skattefritt traktamente 930 kr." },
    fecha: "2026-10-24",
    entrada: { fas: "heldag", heldagar: 3, halvdagar: 1, natter: 0, frukost: 2, enMaltid: 0, tvaMaltider: 0, allMat: 0 },
    esperado: { dagar: 1050, minskning: 120, totalt: 930 },
  },
  {
    nombre: "Efter tre månader: 20 dagar med fri lunch",
    origen: { tipo: "recalculado", url: SKV, detalle: "20 × 210 = 4 200. Minskning för lunch eller middag 20 × 74 = 1 480. Totalt 2 720 kr." },
    fecha: "2026-10-24",
    entrada: { fas: "efter3", heldagar: 20, halvdagar: null, natter: 0, frukost: 0, enMaltid: 20, tvaMaltider: 0, allMat: 0 },
    esperado: { totalt: 2720 },
  },
  {
    nombre: "Efter två år med nattraktamente",
    origen: { tipo: "recalculado", url: SKV, detalle: "10 × 150 + 5 nätter × 150 = 2 250. Lunch och middag fri 4 dagar: 4 × 105 = 420. Totalt 1 830 kr." },
    fecha: "2026-10-24",
    entrada: { fas: "efter2", heldagar: 10, halvdagar: null, natter: 5, frukost: 0, enMaltid: 0, tvaMaltider: 4, allMat: 0 },
    esperado: { totalt: 1830, natt: 750 },
  },
  {
    nombre: "Fler måltidsdagar än resdagar",
    origen: { tipo: "recalculado", url: SKV, detalle: "Måltidsdagarna kan inte vara fler än de hela dagarna." },
    fecha: "2026-10-24",
    entrada: { fas: "heldag", heldagar: 1, halvdagar: 0, natter: 0, frukost: 3, enMaltid: 0, tvaMaltider: 0, allMat: 0 },
    esperaError: true,
  },
]);
