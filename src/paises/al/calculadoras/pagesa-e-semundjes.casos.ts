import { definirCasos } from "@/motor/calculo";
import pagesaESemundjes from "./pagesa-e-semundjes";

const L = "https://www.issh.gov.al/wp-content/uploads/2026/08/LIGJ-NR.-7703-DATE-11.5.1993-PER-SIGURIMET-SHOQERORE-NE-REPUBLIKEN-E-SHQIPERISE-I-NDRYSHUAR.pdf";

export default definirCasos(pagesaESemundjes, [
  {
    nombre: "20 ditë, mbi 10 vjet",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 22: 80%. 44 400 / 30 = 1 480; × 0,8 = 1 184 në ditë. 14 ditë punëdhënësi 16 576; 6 ditë ISSH 7 104." },
    fecha: "2026-10-30",
    entrada: { neto: 44400, dite: 20, rasti: "mbi-10" },
    esperado: { gjithsej: 23680, punedhenesi: 16576, issh: 7104 },
  },
  {
    nombre: "10 ditë, deri 10 vjet",
    origen: { tipo: "recalculado", url: L, detalle: "70%: 60 000 / 30 × 0,7 = 1 400; × 10 = 14 000; të gjitha nga punëdhënësi." },
    fecha: "2026-10-30",
    entrada: { neto: 60000, dite: 10, rasti: "deri-10" },
    esperado: { gjithsej: 14000, issh: 0 },
  },
  {
    nombre: "Në spital",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 22 pika 2: 50%. 60 000 / 30 × 0,5 = 1 000 në ditë; 30 ditë = 30 000." },
    fecha: "2026-10-30",
    entrada: { neto: 60000, dite: 30, rasti: "spital" },
    esperado: { gjithsej: 30000, ditore: 1000 },
  },
  {
    nombre: "Pa pagë",
    origen: { tipo: "recalculado", url: L, detalle: "Pa pagë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { neto: 0, dite: 5, rasti: "mbi-10" },
    esperaError: true,
  },
]);
