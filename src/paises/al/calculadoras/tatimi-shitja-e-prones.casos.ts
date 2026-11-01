import { definirCasos } from "@/motor/calculo";
import tatimiShitjaEProness from "./tatimi-shitja-e-prones";

const L = "https://tatime.gov.al/wp-content/uploads/2026/09/Ligj-Nr.-29-2023-Per-Tatimin-mbi-te-Ardhurat-i-ndryshuar.pdf";

export default definirCasos(tatimiShitjaEProness, [
  {
    nombre: "Çmimi referues më i lartë",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 17 pika 5: merret 22 000 000. Fitim 7 000 000; 15% = 1 050 000." },
    fecha: "2026-10-30",
    entrada: { shitja: 20000000, referenca: 22000000, blerja: 15000000 },
    esperado: { baza: 22000000, fitimi: 7000000, tatimi: 1050000, neto: 18950000 },
  },
  {
    nombre: "Pa çmim referues",
    origen: { tipo: "recalculado", url: L, detalle: "20 000 000 − 15 000 000 = 5 000 000; 15% = 750 000." },
    fecha: "2026-10-30",
    entrada: { shitja: 20000000, referenca: null, blerja: 15000000 },
    esperado: { tatimi: 750000 },
  },
  {
    nombre: "Humbje: tatim zero",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 17 pika 4: humbja konsiderohet zero." },
    fecha: "2026-10-30",
    entrada: { shitja: 10000000, referenca: null, blerja: 12000000 },
    esperado: { fitimi: 0, tatimi: 0 },
  },
  {
    nombre: "Pa çmim shitjeje",
    origen: { tipo: "recalculado", url: L, detalle: "Pa shitje nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { shitja: 0, referenca: null, blerja: 0 },
    esperaError: true,
  },
]);
