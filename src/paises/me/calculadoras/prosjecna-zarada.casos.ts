import { definirCasos } from "@/motor/calculo";
import prosjecnaZarada from "./prosjecna-zarada";

const MONSTAT = "https://monstat.org/DS/ZARADE/Zarade_CG_Sep_2026.html";

export default definirCasos(prosjecnaZarada, [
  {
    nombre: "Prosjek za septembar 2026",
    origen: { tipo: "oficial", url: MONSTAT, detalle: "MONSTAT: bruto 1.245 eura, neto 1.043 eura." },
    fecha: "2026-10-31",
    entrada: { plata: 1043 },
    esperado: { odnos: 100, neto: 1043, bruto: 1245, razlika: 0, mjesec: "septembar 2026." },
  },
  {
    nombre: "Zarada ispod prosjeka",
    origen: { tipo: "recalculado", url: MONSTAT, detalle: "600 / 1.043 = 57,5 %; razlika -443." },
    fecha: "2026-10-31",
    entrada: { plata: 600 },
    esperado: { razlika: -443, prema: 100 },
  },
  {
    nombre: "Zarada nula je greška",
    origen: { tipo: "recalculado", url: MONSTAT, detalle: "Nema šta da se poredi." },
    fecha: "2026-10-31",
    entrada: { plata: 0 },
    esperaError: true,
  },
]);
