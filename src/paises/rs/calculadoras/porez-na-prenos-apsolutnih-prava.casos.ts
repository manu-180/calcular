import { definirCasos } from "@/motor/calculo";
import porezNaPrenosApsolutnihPrava from "./porez-na-prenos-apsolutnih-prava";

const IMO = "https://www.mfin.gov.rs//upload/media/bxqPJF_675ab24783517.docx";

export default definirCasos(porezNaPrenosApsolutnihPrava, [
  {
    nombre: "Kupovina za 8 miliona",
    origen: { tipo: "recalculado", url: IMO, detalle: "Čl. 30: 2,5 % od 8.000.000 = 200.000." },
    fecha: "2026-10-31",
    entrada: { cena: 8000000, prviStan: false, povrsina: null, clanovi: null },
    esperado: { porez: 200000 },
  },
  {
    nombre: "Prvi stan 60 m², kupac i jedan član",
    origen: { tipo: "recalculado", url: IMO, detalle: "Čl. 31a: oslobođeno 40 + 15 = 55 m²; oporezivo 5/60 od 200.000 = 16.666,67." },
    fecha: "2026-10-31",
    entrada: { cena: 8000000, prviStan: true, povrsina: 60, clanovi: 1 },
    esperado: { porez: 16666.67, oslobodjeno: 55, usteda: 183333.33 },
  },
  {
    nombre: "Prvi stan 40 m², bez poreza",
    origen: { tipo: "recalculado", url: IMO, detalle: "Čl. 31a: 40 m² je cela površina." },
    fecha: "2026-10-31",
    entrada: { cena: 5000000, prviStan: true, povrsina: 40, clanovi: 0 },
    esperado: { porez: 0 },
  },
]);
