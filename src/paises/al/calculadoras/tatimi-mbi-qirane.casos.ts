import { definirCasos } from "@/motor/calculo";
import tatimiMbiQirane from "./tatimi-mbi-qirane";

const L = "https://tatime.gov.al/wp-content/uploads/2026/09/Ligj-Nr.-29-2023-Per-Tatimin-mbi-te-Ardhurat-i-ndryshuar.pdf";

export default definirCasos(tatimiMbiQirane, [
  {
    nombre: "60 000 në muaj, 12 muaj",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 24, pika 3: 15% = 9 000; në vit 108 000." },
    fecha: "2026-10-30",
    entrada: { qiraja: 60000, muaj: 12 },
    esperado: { mujor: 9000, neto: 51000, vjetor: 108000, netoVjetor: 612000 },
  },
  {
    nombre: "Tetë muaj",
    origen: { tipo: "recalculado", url: L, detalle: "40 000 × 8 × 15% = 48 000." },
    fecha: "2026-10-30",
    entrada: { qiraja: 40000, muaj: 8 },
    esperado: { vjetor: 48000 },
  },
  {
    nombre: "Qira zero",
    origen: { tipo: "recalculado", url: L, detalle: "Pa qira nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { qiraja: 0, muaj: 12 },
    esperaError: true,
  },
]);
