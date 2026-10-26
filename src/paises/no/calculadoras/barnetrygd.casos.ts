import { definirCasos } from "@/motor/calculo";
import barnetrygd from "./barnetrygd";

const NAV = "https://www.nav.no/barnetrygd";

export default definirCasos(barnetrygd, [
  {
    nombre: "To barn fra februar 2026",
    origen: { tipo: "recalculado", url: NAV, detalle: "2 × 2 012 = 4 024 per måned, 48 288 per år." },
    fecha: "2026-10-24",
    entrada: { barn: 2, tillegg: false },
    esperado: { perManed: 4024, perAr: 48288, tilleggPerManed: 0 },
  },
  {
    nombre: "Tre barn i Finnmark",
    origen: { tipo: "recalculado", url: NAV, detalle: "3 × (2 012 + 512) = 7 572 per måned." },
    fecha: "2026-10-24",
    entrada: { barn: 3, tillegg: true },
    esperado: { perManed: 7572, perBarn: 2524, tilleggPerManed: 1536 },
  },
  {
    nombre: "Ingen barn",
    origen: { tipo: "recalculado", url: NAV, detalle: "Barnetrygd forutsetter minst ett barn." },
    fecha: "2026-10-24",
    entrada: { barn: 0, tillegg: false },
    esperaError: true,
  },
]);
