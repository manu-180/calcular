import { definirCasos } from "@/motor/calculo";
import topliObrokIRegres from "./topli-obrok-i-regres";

export default definirCasos(topliObrokIRegres, [
  {
    nombre: "RS, 22 radna dana",
    origen: { tipo: "recalculado", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/Ministarstva/mpb/PAO/Documents/Odluka%20o%20izmjeni%20Odluke%20o%20uve%c4%87anju%20plate%20-%20Izmjena%202-7.pdf", detalle: "0,85 % od 1.528 = 12,99 po danu; 22 x 12,99 = 285,78." },
    fecha: "2026-11-01",
    entrada: { region: "rs", dani: 22 },
    esperado: { dnevni: 12.99, mjesecni: 285.78 },
  },
  {
    nombre: "FBiH, 22 radna dana i regres",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/0491d-1-precisceni-pravilnik-o-primjeni-zakona-o-porezu-na-dohodak-60-25.pdf", detalle: "1 % od 1.708 = 17,08; 22 x 17,08 = 375,76; regres 50 % od 1.726 = 863." },
    fecha: "2026-11-01",
    entrada: { region: "fbih", dani: 22 },
    esperado: { dnevni: 17.08, mjesecni: 375.76, regres: 863 },
  },
]);
