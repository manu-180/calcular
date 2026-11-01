import { definirCasos } from "@/motor/calculo";
import trosakPoslodavca from "./trosak-poslodavca";

export default definirCasos(trosakPoslodavca, [
  {
    nombre: "FBiH, bruto 2.000 KM",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/50ea7-zakon-o-izmjenama-i-dopunama-zakona-o-doprinosima-33-25.pdf", detalle: "Na teret poslodavca: 2,5 + 2 + 0,5 = 5 %; 2.000 x 5 % = 100; trošak 2.100." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, region: "fbih", faktor: 1, izdrzavani: null, sprema: null },
    esperado: { naPlatu: 100, trosak: 2100, godisnje: 25200, neto: 1272 },
  },
  {
    nombre: "RS, bruto 2.000 KM",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-izmjenama-i-dopunama-zakona-o-porezu-na-dohodak-4", detalle: "U RS nema doprinosa povrh bruta; trošak 2.000, neto 1.300." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, region: "rs", faktor: null, izdrzavani: 0, sprema: "vise" },
    esperado: { naPlatu: 0, trosak: 2000, neto: 1300 },
  },
  {
    nombre: "Bruto nula je greška",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/50ea7-zakon-o-izmjenama-i-dopunama-zakona-o-doprinosima-33-25.pdf", detalle: "Bez plate nema obračuna." },
    fecha: "2026-11-01",
    entrada: { bruto: 0, region: "fbih", faktor: 1, izdrzavani: null, sprema: null },
    esperaError: true,
  },
]);
