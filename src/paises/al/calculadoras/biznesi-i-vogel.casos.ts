import { definirCasos } from "@/motor/calculo";
import biznesiIVogel from "./biznesi-i-vogel";

const L = "https://tatime.gov.al/wp-content/uploads/2026/09/Ligj-Nr.-29-2023-Per-Tatimin-mbi-te-Ardhurat-i-ndryshuar.pdf";

export default definirCasos(biznesiIVogel, [
  {
    nombre: "8 milionë, pakicë: 0%",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 14: shpenzime 70%, fitim 2 400 000. Neni 69: 0%. Kontribute 14 900 × 12 = 178 800." },
    fecha: "2026-10-30",
    entrada: { qarkullimi: 8000000, metoda: "pakice", shpenzime: null },
    esperado: { tatimi: 0, fitimi: 2400000, kontribute: 178800, mbetet: 2221200 },
  },
  {
    nombre: "20 milionë me fatura: 15%",
    origen: { tipo: "recalculado", url: L, detalle: "Fitim 5 000 000 − zbritje 360 000 = 4 640 000; 15% = 696 000." },
    fecha: "2026-10-30",
    entrada: { qarkullimi: 20000000, metoda: "faktura", shpenzime: 15000000 },
    esperado: { tatimi: 696000, fitimi: 5000000 },
  },
  {
    nombre: "30 milionë me fatura: arrin 23%",
    origen: { tipo: "recalculado", url: L, detalle: "Fitim 20 000 000 − 360 000 = 19 640 000. 14 000 000 × 15% = 2 100 000; 5 640 000 × 23% = 1 297 200; gjithsej 3 397 200." },
    fecha: "2026-10-30",
    entrada: { qarkullimi: 30000000, metoda: "faktura", shpenzime: 10000000 },
    esperado: { tatimi: 3397200 },
  },
  {
    nombre: "Regjim i veçantë mbi 10 milionë",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 14: vetëm deri në 10 000 000 lekë." },
    fecha: "2026-10-30",
    entrada: { qarkullimi: 12000000, metoda: "sherbime", shpenzime: null },
    esperaError: true,
  },
]);
