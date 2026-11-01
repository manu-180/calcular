import { definirCasos } from "@/motor/calculo";
import otkazniRok from "./otkazni-rok";

export default definirCasos(otkazniRok, [
  {
    nombre: "FBiH, otkazuje radnik",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/f0787-zakon-o-radu-precisceni-tekst.pdf", detalle: "Član 105: 7 dana; 1. 11. + 7 = 8. 11." },
    fecha: "2026-11-01",
    entrada: { region: "fbih", ko: "radnik", datum: "2026-11-01", ugovoreno: 0 },
    esperado: { dani: 7, kraj: "2026-11-08" },
  },
  {
    nombre: "FBiH, otkazuje poslodavac",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/f0787-zakon-o-radu-precisceni-tekst.pdf", detalle: "Član 105: 14 dana." },
    fecha: "2026-11-01",
    entrada: { region: "fbih", ko: "poslodavac", datum: "2026-11-01", ugovoreno: 0 },
    esperado: { dani: 14 },
  },
  {
    nombre: "RS, otkazuje radnik",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-radu", detalle: "Član 192: 15 kalendarskih dana." },
    fecha: "2026-11-01",
    entrada: { region: "rs", ko: "radnik", datum: "2026-11-01", ugovoreno: 0 },
    esperado: { dani: 15 },
  },
  {
    nombre: "RS, otkazuje poslodavac uz duži ugovor",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-radu", detalle: "Član 192: 30 dana; ugovor 45 je duži." },
    fecha: "2026-11-01",
    entrada: { region: "rs", ko: "poslodavac", datum: "2026-11-01", ugovoreno: 45 },
    esperado: { dani: 45, zakonski: 30 },
  },
]);
