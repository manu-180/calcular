import { definirCasos } from "@/motor/calculo";
import feriepenger from "./feriepenger";

const FERIELOVEN = "https://lovdata.no/dokument/NL/lov/1988-04-29-21";

export default definirCasos(feriepenger, [
  {
    nombre: "550 000 kr etter ferieloven",
    origen: { tipo: "recalculado", url: FERIELOVEN, detalle: "§ 10 nr. 2: 10,2 % av 550 000 = 56 100." },
    fecha: "2026-10-24",
    entrada: { grunnlag: 550000, sats: "lov", egenSats: null, over60: false },
    esperado: { feriepenger: 56100, tillegg60: 0, dager: 25 },
  },
  {
    nombre: "Over 60 år: 2,3 prosentpoeng ekstra",
    origen: { tipo: "recalculado", url: FERIELOVEN, detalle: "§ 10 nr. 3: 550 000 × 12,5 % = 68 750. Ekstraferie 6 virkedager (§ 5 nr. 2)." },
    fecha: "2026-10-24",
    entrada: { grunnlag: 550000, sats: "lov", egenSats: null, over60: true },
    esperado: { feriepenger: 68750, tillegg60: 12650, dager: 31 },
  },
  {
    nombre: "Over 60 år med lønn over 6 G",
    origen: { tipo: "recalculado", url: FERIELOVEN, detalle: "6 G = 6 × 136 549 = 819 294. 1 000 000 × 10,2 % = 102 000 + 819 294 × 2,3 % = 18 843,76." },
    fecha: "2026-10-24",
    entrada: { grunnlag: 1000000, sats: "lov", egenSats: null, over60: true },
    esperado: { feriepenger: 120843.76, tillegg60: 18843.76 },
  },
  {
    nombre: "Egen sats 12 % etter avtale",
    origen: { tipo: "recalculado", url: FERIELOVEN, detalle: "550 000 × 12 % = 66 000." },
    fecha: "2026-10-24",
    entrada: { grunnlag: 550000, sats: "egen", egenSats: 12, over60: false },
    esperado: { feriepenger: 66000, sats: 12 },
  },
  {
    nombre: "Egen sats under loven",
    origen: { tipo: "recalculado", url: FERIELOVEN, detalle: "8 % er lavere enn 10,2 % og er ikke lov." },
    fecha: "2026-10-24",
    entrada: { grunnlag: 550000, sats: "egen", egenSats: 8, over60: false },
    esperaError: true,
  },
]);
