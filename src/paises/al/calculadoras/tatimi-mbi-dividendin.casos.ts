import { definirCasos } from "@/motor/calculo";
import tatimiMbiDividendin from "./tatimi-mbi-dividendin";

const L = "https://tatime.gov.al/wp-content/uploads/2026/09/Ligj-Nr.-29-2023-Per-Tatimin-mbi-te-Ardhurat-i-ndryshuar.pdf";

export default definirCasos(tatimiMbiDividendin, [
  {
    nombre: "1 000 000 dividend",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 59: 8% = 80 000; neto 920 000." },
    fecha: "2026-10-30",
    entrada: { dividendi: 1000000, ngaFitimi: false },
    esperado: { tatimi: 80000, neto: 920000 },
  },
  {
    nombre: "Me fitimin para tatimit",
    origen: { tipo: "recalculado", url: L, detalle: "850 000 / 0,85 = 1 000 000 fitim; dividendi neto 782 000; barra 21,8%." },
    fecha: "2026-10-30",
    entrada: { dividendi: 850000, ngaFitimi: true },
    esperado: { tatimi: 68000, neto: 782000, fitimiPara: 1000000, barraTotale: 21.8 },
  },
  {
    nombre: "Pa dividend",
    origen: { tipo: "recalculado", url: L, detalle: "Pa shumë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { dividendi: 0, ngaFitimi: false },
    esperaError: true,
  },
]);
