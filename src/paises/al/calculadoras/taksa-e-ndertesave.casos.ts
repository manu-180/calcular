import { definirCasos } from "@/motor/calculo";
import taksaENdertesave from "./taksa-e-ndertesave";

const L = "https://tatime.gov.al/wp-content/uploads/2026/10/LigjNr-9632-Dt-30.10.2006-i-perditesuar-23.pdf";

export default definirCasos(taksaENdertesave, [
  {
    nombre: "Banim, 10 milionë",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 22/2: 0,05% × 10 000 000 = 5 000." },
    fecha: "2026-10-30",
    entrada: { vlera: 10000000, perdorimi: "banim" },
    esperado: { vjetore: 5000, mujore: 417 },
  },
  {
    nombre: "Veprimtari ekonomike, 10 milionë",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 22/2: 0,2% × 10 000 000 = 20 000." },
    fecha: "2026-10-30",
    entrada: { vlera: 10000000, perdorimi: "ekonomike" },
    esperado: { vjetore: 20000 },
  },
  {
    nombre: "Vlerë zero",
    origen: { tipo: "recalculado", url: L, detalle: "Pa vlerë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { vlera: 0, perdorimi: "banim" },
    esperaError: true,
  },
]);
