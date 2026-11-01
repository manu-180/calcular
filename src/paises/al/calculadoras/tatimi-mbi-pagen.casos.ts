import { definirCasos } from "@/motor/calculo";
import tatimiMbiPagen from "./tatimi-mbi-pagen";

const L = "https://tatime.gov.al/wp-content/uploads/2026/09/Ligj-Nr.-29-2023-Per-Tatimin-mbi-te-Ardhurat-i-ndryshuar.pdf";

export default definirCasos(tatimiMbiPagen, [
  {
    nombre: "90 000, një fëmijë, arsim 150 000",
    origen: { tipo: "recalculado", url: L, detalle: "Vit 1 080 000 − 360 000 − 48 000 − 100 000 (tavan) = 572 000; 13% = 74 360. Mbajtur 7 800 × 12 = 93 600; kthim 19 240." },
    fecha: "2026-10-30",
    entrada: { paga: 90000, femije: 1, arsimi: 150000 },
    esperado: { tatimiMujor: 7800, mbajtur: 93600, arsimi: 100000, tatimiVjetor: 74360, kthim: 19240 },
  },
  {
    nombre: "100 000, dy fëmijë: pa zbritje arsimi te kufiri",
    origen: { tipo: "recalculado", url: L, detalle: "Vit 1 200 000, jo më pak se kufiri: arsimi 0. Baza 744 000; 13% = 96 720; kthim 109 200 − 96 720 = 12 480." },
    fecha: "2026-10-30",
    entrada: { paga: 100000, femije: 2, arsimi: 50000 },
    esperado: { arsimi: 0, tatimiVjetor: 96720, kthim: 12480 },
  },
  {
    nombre: "Pagë minimale",
    origen: { tipo: "recalculado", url: L, detalle: "Zbritja 600 000 mbulon të gjithë pagën vjetore." },
    fecha: "2026-10-30",
    entrada: { paga: 50000, femije: 0, arsimi: 0 },
    esperado: { tatimiMujor: 0, tatimiVjetor: 0, kthim: 0 },
  },
  {
    nombre: "Pagë zero",
    origen: { tipo: "recalculado", url: L, detalle: "Pa pagë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { paga: 0, femije: 0, arsimi: 0 },
    esperaError: true,
  },
]);
