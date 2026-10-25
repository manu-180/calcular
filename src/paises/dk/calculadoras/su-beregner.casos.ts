import { definirCasos } from "@/motor/calculo";
import suBeregner from "./su-beregner";

const HJEMME = "https://www.su.dk/satser/videregaaende-uddannelser-satser-for-su-til-hjemmeboende";
const UDE = "https://www.su.dk/satser/videregaaende-uddannelser-satser-for-su-til-udeboende";

export default definirCasos(suBeregner, [
  {
    nombre: "Udeboende på en videregående uddannelse",
    origen: { tipo: "oficial", url: UDE, detalle: "Satsen for udeboende er 7.426 kr. pr. måned før skat i 2026." },
    fecha: "2026-10-24",
    entrada: { bolig: "udeboende", foraeldre: null, soeskende: null },
    esperado: { maaned: 7426, aar: 89112 },
  },
  {
    nombre: "Hjemmeboende, forældre med 700.000 kr.",
    origen: { tipo: "oficial", url: HJEMME, detalle: "su.dk's tabel: forældreindkomst 700.000 kr. giver 1.225 kr. pr. måned." },
    fecha: "2026-10-24",
    entrada: { bolig: "hjemmeboende", foraeldre: 700000, soeskende: 0 },
    esperado: { maaned: 1225, grundsats: 1154, tillaeg: 71 },
  },
  {
    nombre: "Hjemmeboende med en søskende under 18",
    origen: { tipo: "oficial", url: HJEMME, detalle: "643.086 − 43.086 = 600.000 kr.; tabellen giver 1.930 kr. pr. måned." },
    fecha: "2026-10-24",
    entrada: { bolig: "hjemmeboende", foraeldre: 643086, soeskende: 1 },
    esperado: { grundlag: 600000, maaned: 1930 },
  },
  {
    nombre: "Hjemmeboende, lav og høj forældreindkomst",
    origen: { tipo: "oficial", url: HJEMME, detalle: "Under 419.589 kr. er satsen 3.202 kr. med fuldt tillæg." },
    fecha: "2026-10-24",
    entrada: { bolig: "hjemmeboende", foraeldre: 400000, soeskende: 0 },
    esperado: { maaned: 3202 },
  },
  {
    nombre: "Hjemmeboende, forældre over grænsen",
    origen: { tipo: "oficial", url: HJEMME, detalle: "Fra 710.077 kr. er satsen grundsatsen på 1.154 kr." },
    fecha: "2026-10-24",
    entrada: { bolig: "hjemmeboende", foraeldre: 800000, soeskende: 0 },
    esperado: { maaned: 1154, tillaeg: 0 },
  },
]);
