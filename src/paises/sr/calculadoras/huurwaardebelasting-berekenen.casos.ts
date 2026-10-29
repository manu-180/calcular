import { definirCasos } from "@/motor/calculo";
import calculadora from "./huurwaardebelasting-berekenen";

const HWB = "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Huurwaardebelasting.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Eigen woning van SRD 1.000.000",
    origen: { tipo: "recalculado", url: HWB, detalle: "Artikel 6 lid 1: 1% × (1.000.000 − 50.000) = 9.500. Artikel 5: 6% × 9.500 = 570." },
    fecha: "2026-10-27",
    entrada: { gebruik: "eigen", verkoopwaarde: 1000000, jaarhuur: null },
    esperado: { belasting: 570, huurwaarde: 9500 },
  },
  {
    nombre: "Verhuurd voor SRD 120.000 per jaar",
    origen: { tipo: "recalculado", url: HWB, detalle: "Artikel 6 lid 2: huurwaarde = jaarhuur 120.000 (meer dan 1% van 1.000.000). 6% = 7.200." },
    fecha: "2026-10-27",
    entrada: { gebruik: "verhuurd", verkoopwaarde: 1000000, jaarhuur: 120000 },
    esperado: { belasting: 7200, huurwaarde: 120000 },
  },
  {
    nombre: "Lage huur: 1% van de verkoopwaarde",
    origen: { tipo: "recalculado", url: HWB, detalle: "Huur 5.000 is minder dan 1% van 1.000.000 = 10.000; huurwaarde 10.000; belasting 600." },
    fecha: "2026-10-27",
    entrada: { gebruik: "verhuurd", verkoopwaarde: 1000000, jaarhuur: 5000 },
    esperado: { belasting: 600, huurwaarde: 10000 },
  },
  {
    nombre: "Minimum van SRD 20",
    origen: { tipo: "recalculado", url: HWB, detalle: "1% × (60.000 − 50.000) = 100; 6% = 6, minder dan het minimum van 20." },
    fecha: "2026-10-27",
    entrada: { gebruik: "eigen", verkoopwaarde: 60000, jaarhuur: null },
    esperado: { belasting: 20, huurwaarde: 100 },
  },
]);
