import { definirCasos } from "@/motor/calculo";
import obracunOtpremnine from "./obracun-otpremnine";

const RAD = "https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2005/24/1/reg";

export default definirCasos(obracunOtpremnine, [
  {
    nombre: "Višak, devet godina",
    origen: { tipo: "recalculado", url: RAD, detalle: "Čl. 158 i 159: 120.000 / 3 = 40.000 po godini; puta 9 = 360.000." },
    fecha: "2026-10-31",
    entrada: { vrsta: "visak", zarada: 120000, godine: 9 },
    esperado: { otpremnina: 360000, poGodini: 40000 },
  },
  {
    nombre: "Odlazak u penziju",
    origen: { tipo: "recalculado", url: RAD, detalle: "Čl. 119: dve prosečne zarade u Republici; 161.953 puta 2 = 323.906." },
    fecha: "2026-10-31",
    entrada: { vrsta: "penzija", zarada: null, godine: null },
    esperado: { otpremnina: 323906 },
  },
]);
