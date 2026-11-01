import { definirCasos } from "@/motor/calculo";
import calc from "./danak-varhu-dohodite";

const MI = "https://www.mi.government.bg/en/general/danaci-i-socialni-osigurovki-svarzani-sas-slujitelite/";

export default definirCasos(calc, [
  {
    nombre: "18 000 евро за година",
    origen: { tipo: "recalculado", url: MI, detalle: "(18000 - 2480,40) × 10 % = 1551,96." },
    fecha: "2026-10-31",
    entrada: { dohod: 18000, vnoski: 2480.4, udarzhan: null },
    esperado: { osnova: 15519.6, danak: 1551.96, sled: 13967.64 },
  },
  {
    nombre: "С удържан данък",
    origen: { tipo: "recalculado", url: MI, detalle: "1551,96 - 1500 = 51,96 разлика." },
    fecha: "2026-10-31",
    entrada: { dohod: 18000, vnoski: 2480.4, udarzhan: 1500 },
    esperado: { ostatak: 51.96 },
  },
  {
    nombre: "Осигуровките над дохода",
    origen: { tipo: "recalculado", url: MI, detalle: "Невъзможно въвеждане." },
    fecha: "2026-10-31",
    entrada: { dohod: 100, vnoski: 200, udarzhan: null },
    esperaError: true,
  },
]);
