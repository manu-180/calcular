import { definirCasos } from "@/motor/calculo";
import vanemahuvitis from "./vanemahuvitis";

const PHS = "https://www.riigiteataja.ee/akt/PHS";
const SKA = "https://sotsiaalkindlustusamet.ee/uudised/vanemahuvitise-ulempiir-ja-selle-muudatused-2026-aastal";

export default definirCasos(vanemahuvitis, [
  {
    nombre: "Tulu 2000 eurot",
    origen: { tipo: "recalculado", url: PHS, detalle: "§ 39: 2000 kuus; 2000 / 30 = 66,67 päevas; 605 päeva = 40 333,33; tulumaks (2000 - 700) × 22% = 286; neto 1714." },
    fecha: "2026-10-15",
    entrada: { tulu: 2000, maksuvaba: true, paevad: 605 },
    esperado: { kuu: 2000, paevas: 66.67, kokku: 40333.33, neto: 1714 },
  },
  {
    nombre: "Ülempiir 2026",
    origen: { tipo: "oficial", url: SKA, detalle: "Sotsiaalkindlustusamet: 2026. aastal ülempiir 3806,10 eurot kuus." },
    fecha: "2026-10-15",
    entrada: { tulu: 6000, maksuvaba: true, paevad: 30 },
    esperado: { kuu: 3806.1, kokku: 3806.1 },
  },
  {
    nombre: "Tulu puudub: hüvitise määr",
    origen: { tipo: "recalculado", url: PHS, detalle: "§ 41 lg 1 ja lg 3: 886 eurot kuus." },
    fecha: "2026-10-15",
    entrada: { tulu: 0, maksuvaba: true, paevad: 30 },
    esperado: { kuu: 886 },
  },
  {
    nombre: "Väike tulu: töötasu alammäär",
    origen: { tipo: "recalculado", url: PHS, detalle: "§ 42 lg 1 ja § 45 lg 1: alammäära suuruses, 946 eurot alates 1.4.2026." },
    fecha: "2026-10-15",
    entrada: { tulu: 500, maksuvaba: true, paevad: 30 },
    esperado: { kuu: 946 },
  },
]);
