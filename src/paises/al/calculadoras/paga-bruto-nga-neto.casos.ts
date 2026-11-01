import { definirCasos } from "@/motor/calculo";
import pagaBrutoNgaNeto from "./paga-bruto-nga-neto";

const L = "https://tatime.gov.al/wp-content/uploads/2026/09/Ligj-Nr.-29-2023-Per-Tatimin-mbi-te-Ardhurat-i-ndryshuar.pdf";

export default definirCasos(pagaBrutoNgaNeto, [
  {
    nombre: "Neto 79 700 kthehet në 100 000",
    origen: { tipo: "recalculado", url: L, detalle: "E kundërta e llogaritjes: 100 000 bruto jep 79 700 neto." },
    fecha: "2026-10-30",
    entrada: { neto: 79700, tavani: null },
    esperado: { bruto: 100000, netoReal: 79700 },
  },
  {
    nombre: "Neto 44 400: paga minimale",
    origen: { tipo: "recalculado", url: L, detalle: "50 000 bruto jep 44 400 neto, pa tatim." },
    fecha: "2026-10-30",
    entrada: { neto: 44400, tavani: null },
    esperado: { bruto: 50000, tatimi: 0 },
  },
  {
    nombre: "Neto 49 381: zgjidhet bruto më i ulët",
    origen: { tipo: "recalculado", url: L, detalle: "Si 59 142 ashtu edhe 60 001 japin 49 381 neto. 59 142: shoqërore 5 618, shëndetësore 1 005, tatim 3 138. Zgjidhet më i ulëti." },
    fecha: "2026-10-30",
    entrada: { neto: 49381, tavani: null },
    esperado: { bruto: 59142, netoReal: 49381 },
  },
  {
    nombre: "Neto më i ulët se minimalja: del paga minimale",
    origen: { tipo: "recalculado", url: L, detalle: "Bruto nuk zbret nën 50 000: neto del 44 400." },
    fecha: "2026-10-30",
    entrada: { neto: 30000, tavani: null },
    esperado: { bruto: 50000, netoReal: 44400 },
  },
  {
    nombre: "Me tavan që e shkruan personi",
    origen: { tipo: "recalculado", url: L, detalle: "E kundërta e 300 000 bruto me tavan 200 000: neto 230 800." },
    fecha: "2026-10-30",
    entrada: { neto: 230800, tavani: 200000 },
    esperado: { bruto: 300000, netoReal: 230800 },
  },
  {
    nombre: "Neto zero",
    origen: { tipo: "recalculado", url: L, detalle: "Pa shumë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { neto: 0, tavani: null },
    esperaError: true,
  },
]);
