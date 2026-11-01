import { definirCasos } from "@/motor/calculo";
import tatimiPerProfesionistet from "./tatimi-per-profesionistet";

const L = "https://tatime.gov.al/wp-content/uploads/2026/09/Ligj-Nr.-29-2023-Per-Tatimin-mbi-te-Ardhurat-i-ndryshuar.pdf";

export default definirCasos(tatimiPerProfesionistet, [
  {
    nombre: "3 milionë me shpenzime të supozuara",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 14: 30% = 900 000; fitim 2 100 000; tatim 0 (neni 69); kontribute 178 800; mbetet 1 921 200." },
    fecha: "2026-10-30",
    entrada: { teArdhura: 3000000, shpenzime: null },
    esperado: { tatimi: 0, shpenzime: 900000, fitimi: 2100000, mbetet: 1921200, mbajtje: 450000 },
  },
  {
    nombre: "20 milionë me fatura",
    origen: { tipo: "recalculado", url: L, detalle: "Fitim 14 000 000 − 360 000 = 13 640 000; 15% = 2 046 000." },
    fecha: "2026-10-30",
    entrada: { teArdhura: 20000000, shpenzime: 6000000 },
    esperado: { tatimi: 2046000, fitimi: 14000000 },
  },
  {
    nombre: "Pa fatura mbi 10 milionë",
    origen: { tipo: "recalculado", url: L, detalle: "Regjimi i veçantë vlen deri në 10 000 000 lekë." },
    fecha: "2026-10-30",
    entrada: { teArdhura: 12000000, shpenzime: null },
    esperaError: true,
  },
]);
