import { definirCasos } from "@/motor/calculo";
import amBidrag from "./am-bidrag";

const AMBL = "https://svmn.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/arbejdsmarkedsbidragsloven";

export default definirCasos(amBidrag, [
  {
    nombre: "40.000 kr. om måneden med fuldt ATP-bidrag",
    origen: { tipo: "recalculado", url: AMBL, detalle: "40.000 − ATP 99 = 39.901; 8 % = 3.192,08 pr. måned og 38.304,96 pr. år. Efter am-bidrag 36.708,92." },
    fecha: "2026-10-24",
    entrada: { loen: 40000, pension: 0, atp: true },
    esperado: { grundlag: 39901, am: 3192.08, amAar: 38304.96, efterAm: 36708.92, atpArbejdsgiver: 198 },
  },
  {
    nombre: "40.000 kr. med 4 % egen pension",
    origen: { tipo: "recalculado", url: AMBL, detalle: "40.000 − pension 1.600 − ATP 99 = 38.301; 8 % = 3.064,08." },
    fecha: "2026-10-24",
    entrada: { loen: 40000, pension: 4, atp: true },
    esperado: { pension: 1600, grundlag: 38301, am: 3064.08 },
  },
  {
    nombre: "15.000 kr. uden ATP",
    origen: { tipo: "recalculado", url: AMBL, detalle: "8 % af 15.000 = 1.200." },
    fecha: "2026-10-24",
    entrada: { loen: 15000, pension: 0, atp: false },
    esperado: { am: 1200, amAar: 14400, atp: 0 },
  },
]);
