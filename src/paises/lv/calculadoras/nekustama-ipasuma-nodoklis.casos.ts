import { definirCasos } from "@/motor/calculo";
import nin from "./nekustama-ipasuma-nodoklis";

const VID = "https://www.vid.gov.lv/lv/nekustama-ipasuma-nodoklis";

export default definirCasos(nin, [
  {
    nombre: "60 000 eiro ar 0,2%",
    origen: { tipo: "recalculado", url: VID, detalle: "60 000 × 0,2% = 120." },
    fecha: "2026-11-01",
    entrada: { vertiba: 60000, likme: 0.2 },
    esperado: { gada: 120, menesi: 10 },
  },
  {
    nombre: "Augstākā likme 3%",
    origen: { tipo: "recalculado", url: VID, detalle: "100 000 × 3% = 3000." },
    fecha: "2026-11-01",
    entrada: { vertiba: 100000, likme: 3 },
    esperado: { gada: 3000 },
  },
  {
    nombre: "Likme zem robežas",
    origen: { tipo: "recalculado", url: VID, detalle: "VID: no 0,2 līdz 3 procentiem." },
    fecha: "2026-11-01",
    entrada: { vertiba: 100000, likme: 0.1 },
    esperaError: true,
  },
]);
