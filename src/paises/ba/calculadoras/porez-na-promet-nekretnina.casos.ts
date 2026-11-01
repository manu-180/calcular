import { definirCasos } from "@/motor/calculo";
import porezNaPrometNekretnina from "./porez-na-promet-nekretnina";

export default definirCasos(porezNaPrometNekretnina, [
  {
    nombre: "Kanton Sarajevo, 200.000 KM",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/80eee-zakon-o-porezu-na-promet-nekretnina-i-porezu-na-naslijede-i-poklone-28-18.pdf", detalle: "Član 11: 5 %. 200.000 x 5 % = 10.000." },
    fecha: "2026-11-01",
    entrada: { kanton: "ks", cijena: 200000 },
    esperado: { porez: 10000, stopa: 5 },
  },
  {
    nombre: "Unsko-sanski kanton, najviša stopa",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/39551-usk-zakon-o-porezu-na-promet-nekretnina-precisceni.pdf", detalle: "Član 9: najviše 5 %." },
    fecha: "2026-11-01",
    entrada: { kanton: "usk", cijena: 100000 },
    esperado: { porez: 5000 },
  },
  {
    nombre: "Vrijednost nula je greška",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/80eee-zakon-o-porezu-na-promet-nekretnina-i-porezu-na-naslijede-i-poklone-28-18.pdf", detalle: "Bez vrijednosti nema obračuna." },
    fecha: "2026-11-01",
    entrada: { kanton: "ks", cijena: 0 },
    esperaError: true,
  },
]);
