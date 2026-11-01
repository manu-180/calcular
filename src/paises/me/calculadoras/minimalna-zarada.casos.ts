import { definirCasos } from "@/motor/calculo";
import minimalnaZarada from "./minimalna-zarada";

const RADU = "https://wapi.gov.me/download/5708ed78-5d80-492f-89f1-daa147732dc8?version=1.0";

export default definirCasos(minimalnaZarada, [
  {
    nombre: "Radno mjesto do V nivoa, puno vrijeme",
    origen: { tipo: "recalculado", url: RADU, detalle: "Zakon o radu, čl. 101 st. 2: 600 eura neto. Bruto 600 / 0,895 = 670,39." },
    fecha: "2026-10-31",
    entrada: { nivo: "do-v", procenat: 100, prirez: 13, plata: null },
    esperado: { neto: 600, bruto: 670.39, godisnje: 7200 },
  },
  {
    nombre: "VI nivo, bez prireza",
    origen: { tipo: "recalculado", url: RADU, detalle: "Zakon o radu, čl. 101 st. 2: 800 eura neto. Bruto 915,53." },
    fecha: "2026-10-31",
    entrada: { nivo: "vi", procenat: 100, prirez: 0, plata: null },
    esperado: { neto: 800, bruto: 915.53 },
  },
  {
    nombre: "Pola radnog vremena",
    origen: { tipo: "recalculado", url: RADU, detalle: "Zakon o radu, čl. 101 st. 6: srazmjerno vremenu na radu. 300 / 0,895 = 335,20." },
    fecha: "2026-10-31",
    entrada: { nivo: "do-v", procenat: 50, prirez: 13, plata: null },
    esperado: { neto: 300, bruto: 335.2 },
  },
  {
    nombre: "Poređenje sa zaradom ispod minimalne",
    origen: { tipo: "recalculado", url: RADU, detalle: "550 - 600 = -50." },
    fecha: "2026-10-31",
    entrada: { nivo: "do-v", procenat: 100, prirez: 13, plata: 550 },
    esperado: { razlika: -50 },
  },
]);
