import { definirCasos } from "@/motor/calculo";
import oppsigelsestid from "./oppsigelsestid";

const AML = "https://lovdata.no/lov/2005-06-17-62/%C2%A715-3";

export default definirCasos(oppsigelsestid, [
  {
    nombre: "Hovedregel: én måned fra månedsskiftet",
    origen: { tipo: "recalculado", url: AML, detalle: "§ 15-3 (1) og (4): oppsigelse 24.10.2026, fristen løper fra 1.11 til 30.11.2026." },
    fecha: "2026-10-24",
    entrada: { hvem: "arbeidsgiver", provetid: false, ar: 3, alder: 40, dato: "2026-10-24" },
    esperado: { frist: "1 måned", start: "2026-11-01", slutt: "2026-11-30" },
  },
  {
    nombre: "Fem år: to måneder",
    origen: { tipo: "recalculado", url: AML, detalle: "§ 15-3 (2): oppsigelse 15.12.2026, fra 1.1 til 28.2.2027." },
    fecha: "2026-10-24",
    entrada: { hvem: "arbeidstaker", provetid: false, ar: 6, alder: 35, dato: "2026-12-15" },
    esperado: { frist: "2 måneder", start: "2027-01-01", slutt: "2027-02-28" },
  },
  {
    nombre: "Ti år og fylt 57, arbeidsgiver sier opp",
    origen: { tipo: "recalculado", url: AML, detalle: "§ 15-3 (3): fem måneder etter fylte 55. Oppsigelse 24.10.2026: 1.11.2026 til 31.3.2027." },
    fecha: "2026-10-24",
    entrada: { hvem: "arbeidsgiver", provetid: false, ar: 12, alder: 57, dato: "2026-10-24" },
    esperado: { frist: "5 måneder", slutt: "2027-03-31" },
  },
  {
    nombre: "Ti år og fylt 61, arbeidstaker sier opp selv",
    origen: { tipo: "recalculado", url: AML, detalle: "§ 15-3 (3) siste punktum: arbeidstakeren kan si opp med tre måneders frist." },
    fecha: "2026-10-24",
    entrada: { hvem: "arbeidstaker", provetid: false, ar: 15, alder: 61, dato: "2026-10-24" },
    esperado: { frist: "3 måneder", slutt: "2027-01-31" },
  },
  {
    nombre: "Ti år og fylt 62, arbeidsgiver sier opp",
    origen: { tipo: "recalculado", url: AML, detalle: "Seks måneder etter fylte 60: 1.11.2026 til 30.4.2027." },
    fecha: "2026-10-24",
    entrada: { hvem: "arbeidsgiver", provetid: false, ar: 20, alder: 62, dato: "2026-10-24" },
    esperado: { frist: "6 måneder", slutt: "2027-04-30" },
  },
  {
    nombre: "Prøvetid: 14 dager",
    origen: { tipo: "recalculado", url: AML, detalle: "§ 15-3 (7): 14 dager fra 24.10.2026 gir 7.11.2026." },
    fecha: "2026-10-24",
    entrada: { hvem: "arbeidsgiver", provetid: true, ar: 0, alder: 30, dato: "2026-10-24" },
    esperado: { frist: "14 dager", slutt: "2026-11-07" },
  },
]);
