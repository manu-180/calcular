import { definirCasos } from "@/motor/calculo";
import porezNaDohodak from "./porez-na-dohodak";

export default definirCasos(porezNaDohodak, [
  {
    nombre: "FBiH, bruto 3.000 KM",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/d9bf6-zakon-o-porezu-na-dohodak-ispravan-tekst.pdf", detalle: "Doprinosi 930; dohodak 2.070; odbitak 300; osnovica 1.770; porez 10 % = 177; udio 5,9 %." },
    fecha: "2026-11-01",
    entrada: { bruto: 3000, region: "fbih", faktor: 1, izdrzavani: null, sprema: null },
    esperado: { porez: 177, osnovica: 1770, godisnje: 2124, efektivna: 5.9 },
  },
  {
    nombre: "FBiH, plata ispod odbitka",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/d9bf6-zakon-o-porezu-na-dohodak-ispravan-tekst.pdf", detalle: "Bruto 400: dohodak 276 manji od 300, porez 0." },
    fecha: "2026-11-01",
    entrada: { bruto: 400, region: "fbih", faktor: 1, izdrzavani: null, sprema: null },
    esperado: { porez: 0, osnovica: 0 },
  },
  {
    nombre: "RS, bruto 3.000 KM",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-izmjenama-i-dopunama-zakona-o-porezu-na-dohodak-4", detalle: "Osnovica 3.000 - 1.000 = 2.000; porez 8 % = 160." },
    fecha: "2026-11-01",
    entrada: { bruto: 3000, region: "rs", faktor: null, izdrzavani: 0, sprema: "vise" },
    esperado: { porez: 160, osnovica: 2000, stopa: 8 },
  },
  {
    nombre: "RS, bruto ispod odbitka",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-izmjenama-i-dopunama-zakona-o-porezu-na-dohodak-4", detalle: "Bruto 900 manji od 1.000, porez 0." },
    fecha: "2026-11-01",
    entrada: { bruto: 900, region: "rs", faktor: null, izdrzavani: 0, sprema: "vise" },
    esperado: { porez: 0 },
  },
]);
