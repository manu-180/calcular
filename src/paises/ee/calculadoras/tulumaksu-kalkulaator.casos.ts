import { definirCasos } from "@/motor/calculo";
import tulumaks from "./tulumaksu-kalkulaator";

const TUMS = "https://www.riigiteataja.ee/akt/TuMS";
const ALUS = { kohustuslikud: 1080, koolitus: 0, kolmas: 0, pensioniiga: false, kinnipeetud: null };

export default definirCasos(tulumaks, [
  {
    nombre: "30 000 eurot ilma mahaarvamisteta",
    origen: { tipo: "recalculado", url: TUMS, detalle: "30 000 - 1080 - 8400 = 20 520; 22% = 4514,40." },
    fecha: "2026-10-15",
    entrada: { ...ALUS, tulu: 30000 },
    esperado: { tulumaks: 4514.4, maksustatav: 20520 },
  },
  {
    nombre: "Koolitus ja III sammas",
    origen: { tipo: "recalculado", url: TUMS, detalle: "§ 282 ja § 28: 1000 + 1000 maha; maksustatav 18 520; tulumaks 4074,40; kokkuhoid 440." },
    fecha: "2026-10-15",
    entrada: { ...ALUS, tulu: 30000, koolitus: 1000, kolmas: 1000, kinnipeetud: 4514.4 },
    esperado: { tulumaks: 4074.4, kokkuhoid: 440, enammakstud: 440 },
  },
  {
    nombre: "Koolituse piir 1200 eurot",
    origen: { tipo: "recalculado", url: TUMS, detalle: "§ 282 lg 1: 3000 asemel 1200; 20 520 - 1200 = 19 320; 22% = 4250,40." },
    fecha: "2026-10-15",
    entrada: { ...ALUS, tulu: 30000, koolitus: 3000 },
    esperado: { tulumaks: 4250.4, mahaarvamised: 1200 },
  },
  {
    nombre: "Pensioniealine",
    origen: { tipo: "recalculado", url: "https://www.emta.ee/eraklient/maksud-ja-tasumine/maksusoodustused/maksuvaba-tulu-arvestamine", detalle: "12 000 - 0 - 9312 = 2688; 22% = 591,36." },
    fecha: "2026-10-15",
    entrada: { ...ALUS, tulu: 12000, kohustuslikud: 0, pensioniiga: true },
    esperado: { tulumaks: 591.36 },
  },
]);
