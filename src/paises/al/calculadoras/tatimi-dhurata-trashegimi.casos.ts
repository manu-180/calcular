import { definirCasos } from "@/motor/calculo";
import tatimiDhurataTrashegimi from "./tatimi-dhurata-trashegimi";

const L = "https://tatime.gov.al/wp-content/uploads/2026/09/Ligj-Nr.-29-2023-Per-Tatimin-mbi-te-Ardhurat-i-ndryshuar.pdf";

export default definirCasos(tatimiDhurataTrashegimi, [
  {
    nombre: "8 milionë, pasuri e paluajtshme, jo familje",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 60: 5 000 000 të përjashtuara; 3 000 000 × 15% = 450 000." },
    fecha: "2026-10-30",
    entrada: { vlera: 8000000, lloji: "paluajtshme", familje: false },
    esperado: { tatimi: 450000, baza: 3000000 },
  },
  {
    nombre: "Pasuri e luajtshme",
    origen: { tipo: "recalculado", url: L, detalle: "1 000 000 të përjashtuara; 500 000 × 15% = 75 000." },
    fecha: "2026-10-30",
    entrada: { vlera: 1500000, lloji: "luajtshme", familje: false },
    esperado: { tatimi: 75000 },
  },
  {
    nombre: "Familje: përjashtim i plotë",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 60 pika 7 shkronja a." },
    fecha: "2026-10-30",
    entrada: { vlera: 20000000, lloji: "paluajtshme", familje: true },
    esperado: { tatimi: 0 },
  },
  {
    nombre: "Vlerë zero",
    origen: { tipo: "recalculado", url: L, detalle: "Pa vlerë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { vlera: 0, lloji: "luajtshme", familje: false },
    esperaError: true,
  },
]);
