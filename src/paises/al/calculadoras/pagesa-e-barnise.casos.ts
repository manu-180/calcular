import { definirCasos } from "@/motor/calculo";
import pagesaEBarnise from "./pagesa-e-barnise";

const L = "https://www.issh.gov.al/wp-content/uploads/2026/08/LIGJ-NR.-7703-DATE-11.5.1993-PER-SIGURIMET-SHOQERORE-NE-REPUBLIKEN-E-SHQIPERISE-I-NDRYSHUAR.pdf";

export default definirCasos(pagesaEBarnise, [
  {
    nombre: "Një fëmijë, neto 44 400",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 27: 1 480 në ditë. (35 + 150) ditë × 80% = 219 040; 180 ditë × 50% = 133 200. Neni 29: 25 000. Gjithsej 377 240." },
    fecha: "2026-10-30",
    entrada: { neto: 44400, femije: 1 },
    esperado: { pjesaLarte: 219040, pjesaPoshte: 133200, shperblimi: 25000, total: 377240, gjithsej: 365 },
  },
  {
    nombre: "Binjakë",
    origen: { tipo: "recalculado", url: L, detalle: "390 ditë: (60 + 150) × 80% = 248 640; 180 × 50% = 133 200; shpërblim 50 000." },
    fecha: "2026-10-30",
    entrada: { neto: 44400, femije: 2 },
    esperado: { pjesaLarte: 248640, pjesaPoshte: 133200, shperblimi: 50000, gjithsej: 390 },
  },
  {
    nombre: "Pa pagë",
    origen: { tipo: "recalculado", url: L, detalle: "Pa pagë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { neto: 0, femije: 1 },
    esperaError: true,
  },
]);
