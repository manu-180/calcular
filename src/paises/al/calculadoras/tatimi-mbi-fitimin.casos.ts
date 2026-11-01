import { definirCasos } from "@/motor/calculo";
import tatimiMbiFitimin from "./tatimi-mbi-fitimin";

const L = "https://tatime.gov.al/wp-content/uploads/2026/09/Ligj-Nr.-29-2023-Per-Tatimin-mbi-te-Ardhurat-i-ndryshuar.pdf";

export default definirCasos(tatimiMbiFitimin, [
  {
    nombre: "Mbi 14 milionë: 15%",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 41: 5 000 000 × 15% = 750 000." },
    fecha: "2026-10-30",
    entrada: { teArdhura: 20000000, fitimi: 5000000 },
    esperado: { tatimi: 750000, norma: 15, fitimiPasTatimit: 4250000 },
  },
  {
    nombre: "Deri 14 milionë: 0%",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 69, pika 1, shkronja dh: norma 0% deri më 31.12.2029." },
    fecha: "2026-10-30",
    entrada: { teArdhura: 14000000, fitimi: 3000000 },
    esperado: { tatimi: 0, norma: 0 },
  },
  {
    nombre: "Fitim më i madh se të ardhurat",
    origen: { tipo: "recalculado", url: L, detalle: "Hyrje e pamundur." },
    fecha: "2026-10-30",
    entrada: { teArdhura: 1000, fitimi: 2000 },
    esperaError: true,
  },
]);
