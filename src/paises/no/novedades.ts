import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "no.grunnbelop-2026",
    fecha: "2026-10-24",
    titulo: "Grunnbeløpet er 136 549 kr fra 1. mai 2026",
    texto: "G økte fra 130 160 kr til 136 549 kr 1. mai 2026. Taket for sykepenger og foreldrepenger (6 G) er dermed 819 294 kr, og kravet til inntekt for dagpenger er 204 824 kr siste 12 måneder.",
    vigenteDesde: "2026-05-01",
    calculadoras: ["no.grunnbelopet", "no.sykepenger", "no.foreldrepenger", "no.dagpenger", "no.feriepenger"],
    fuente: { organismo: "Nav", titulo: "Grunnbeløpet i folketrygden (G)", url: "https://www.nav.no/grunnbelopet", tipo: "primaria", verificadoEl: "2026-10-24" },
  },
  {
    id: "no.barnetrygd-februar-2026",
    fecha: "2026-10-24",
    titulo: "Barnetrygden er 2 012 kr per barn fra 1. februar 2026",
    texto: "Fra 1. februar 2026 er barnetrygden 2 012 kr i måneden for hvert barn fra 0 til 18 år. Finnmarks- og Svalbardtillegget er 512 kr i måneden per barn.",
    vigenteDesde: "2026-02-01",
    calculadoras: ["no.barnetrygd"],
    fuente: { organismo: "Nav", titulo: "Barnetrygd", url: "https://www.nav.no/barnetrygd", tipo: "primaria", verificadoEl: "2026-10-24" },
  },
  {
    id: "no.forsinkelsesrente-juli-2026",
    fecha: "2026-10-24",
    titulo: "Forsinkelsesrenten er 12,25 % fra 1. juli 2026",
    texto: "Forsinkelsesrenten økte fra 12 % til 12,25 % i året fra 1. juli 2026. Satsen følger styringsrenten til Norges Bank og fastsettes for et halvår om gangen.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["no.forsinkelsesrente"],
    fuente: {
      organismo: "Lovdata",
      titulo: "Forskrift om forsinkelsesrente og kompensasjon for inndrivelseskostnader (FOR-2026-06-25-1372)",
      url: "https://lovdata.no/dokument/LTI/forskrift/2026-06-25-1372",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "no.trygdeavgift-2026",
    fecha: "2026-10-24",
    titulo: "Trygdeavgiften på lønn er 7,6 % i 2026",
    texto: "Trygdeavgiften på lønn gikk ned fra 7,7 % i 2025 til 7,6 % i 2026, og på næringsinntekt fra 10,9 % til 10,8 %. Den nedre grensen er fortsatt 99 650 kr.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["no.trygdeavgift", "no.lonn-etter-skatt", "no.skattekalkulator"],
    fuente: { organismo: "Skatteetaten", titulo: "Satser: trygdeavgift 2026", url: "https://www.skatteetaten.no/satser/trygdeavgift/?year=2026", tipo: "primaria", verificadoEl: "2026-10-24" },
  },
];
