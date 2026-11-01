import { definirCasos } from "@/motor/calculo";
import sykepenger from "./sykepenger";

const NAV = "https://www.nav.no/sykepenger";

export default definirCasos(sykepenger, [
  {
    nombre: "Arbeidstaker med 600 000 kr, helt sykmeldt",
    origen: { tipo: "recalculado", url: NAV, detalle: "100 % av 600 000. Dagsats 600 000 / 260 = 2 307,69; per uke 5 dager = 11 538,46." },
    fecha: "2026-10-24",
    entrada: { inntekt: 600000, rolle: "arbeidstaker", grad: 100 },
    esperado: { rett: "Ja", perManed: 50000, dagsats: 2307.69, perUke: 11538.46 },
  },
  {
    nombre: "Inntekt over 6 G",
    origen: { tipo: "recalculado", url: NAV, detalle: "6 G = 819 294. Dagsats 819 294 / 260 = 3 151,13." },
    fecha: "2026-10-24",
    entrada: { inntekt: 900000, rolle: "arbeidstaker", grad: 100 },
    esperado: { grunnlag: 819294, dagsats: 3151.13, perManed: 68274.5 },
  },
  {
    nombre: "Selvstendig næringsdrivende: 80 %",
    origen: { tipo: "recalculado", url: NAV, detalle: "80 % av 500 000 = 400 000; dagsats 1 538,46." },
    fecha: "2026-10-24",
    entrada: { inntekt: 500000, rolle: "selvstendig", grad: 100 },
    esperado: { perAr: 400000, dagsats: 1538.46 },
  },
  {
    nombre: "Halvt sykmeldt",
    origen: { tipo: "recalculado", url: NAV, detalle: "50 % av 600 000 = 300 000 i året, 25 000 per måned." },
    fecha: "2026-10-24",
    entrada: { inntekt: 600000, rolle: "arbeidstaker", grad: 50 },
    esperado: { perManed: 25000 },
  },
  {
    nombre: "Under halv G",
    origen: { tipo: "recalculado", url: NAV, detalle: "60 000 er under 68 274,50 (0,5 G): ingen rett." },
    fecha: "2026-10-24",
    entrada: { inntekt: 60000, rolle: "arbeidstaker", grad: 100 },
    esperado: { rett: "Nei", perManed: null },
  },
  {
    nombre: "G før 1. mai 2026",
    origen: { tipo: "recalculado", url: "https://www.nav.no/grunnbelopet", detalle: "G 130 160 til 30. april 2026: 6 G = 780 960; dagsats 3 003,69." },
    fecha: "2026-04-15",
    entrada: { inntekt: 900000, rolle: "arbeidstaker", grad: 100 },
    esperado: { grunnlag: 780960, dagsats: 3003.69 },
  },
]);
