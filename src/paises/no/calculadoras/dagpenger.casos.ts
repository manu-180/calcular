import { definirCasos } from "@/motor/calculo";
import dagpenger from "./dagpenger";

const NAV = "https://www.nav.no/dagpenger";
const LOV = "https://lovdata.no/lov/1997-02-28-19/%C2%A74-12";

export default definirCasos(dagpenger, [
  {
    nombre: "500 000 kr siste 12 måneder",
    origen: { tipo: "recalculado", url: NAV, detalle: "62,4 % av 500 000 / 260 = 1 200 per dag (2,4 promille). Over 2 G (273 098): 104 uker." },
    fecha: "2026-10-24",
    entrada: { inntekt12: 500000, inntekt36: null, barn: 0 },
    esperado: { rett: "Ja", dagsats: 1200, perUke: 6000, perMeldekort: 12000, perManed: 26000, uker: 104 },
  },
  {
    nombre: "To barn gir barnetillegg",
    origen: { tipo: "recalculado", url: NAV, detalle: "1 200 + 2 × 38 = 1 276 per dag." },
    fecha: "2026-10-24",
    entrada: { inntekt12: 500000, inntekt36: null, barn: 2 },
    esperado: { dagsats: 1276 },
  },
  {
    nombre: "Inntekt like over 1,5 G: 52 uker",
    origen: { tipo: "recalculado", url: NAV, detalle: "220 000 er over 204 824 (1,5 G), men under 2 G: 528 per dag i 52 uker." },
    fecha: "2026-10-24",
    entrada: { inntekt12: 220000, inntekt36: null, barn: 0 },
    esperado: { dagsats: 528, uker: 52 },
  },
  {
    nombre: "Inntekt over 6 G",
    origen: { tipo: "recalculado", url: LOV, detalle: "819 294 × 2,4 promille = 1 966,31." },
    fecha: "2026-10-24",
    entrada: { inntekt12: 1000000, inntekt36: null, barn: 0 },
    esperado: { dagsats: 1966.31, grunnlag: 819294 },
  },
  {
    nombre: "Snittet av 36 måneder er best",
    origen: { tipo: "recalculado", url: NAV, detalle: "12 måneder 100 000; 36 måneder 450 000 (over 3 G = 409 647), snitt 150 000. Dagsats 360 i 52 uker." },
    fecha: "2026-10-24",
    entrada: { inntekt12: 100000, inntekt36: 450000, barn: 0 },
    esperado: { dagsats: 360, uker: 52 },
  },
  {
    nombre: "Barnetillegg begrenset til 90 %",
    origen: { tipo: "recalculado", url: LOV, detalle: "528 + 10 × 38 = 908, men høyst 90 % av 220 000 / 260 = 761,54." },
    fecha: "2026-10-24",
    entrada: { inntekt12: 220000, inntekt36: null, barn: 10 },
    esperado: { dagsats: 761.54 },
  },
  {
    nombre: "For lav inntekt",
    origen: { tipo: "recalculado", url: NAV, detalle: "150 000 siste 12 og 300 000 siste 36 måneder er under kravene." },
    fecha: "2026-10-24",
    entrada: { inntekt12: 150000, inntekt36: 300000, barn: 0 },
    esperado: { rett: "Nei", dagsats: null },
  },
]);
