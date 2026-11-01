import { definirCasos } from "@/motor/calculo";
import { URL_KDP_427 } from "../lib/fuentes-url";
import katotatosMisthos from "./katotatos-misthos";

export default definirCasos(katotatosMisthos, [
  {
    nombre: "Πλήρης απασχόληση μετά από έξι μήνες: 1.088 €",
    origen: { tipo: "oficial", url: URL_KDP_427, detalle: "ΚΔΠ 427/2025: 1.088 € για πλήρη απασχόληση από 1.1.2026. ΚΑ 95,74, ΓεΣΥ 28,83, χωρίς φόρο. Καθαρά 963,43." },
    fecha: "2026-10-26",
    entrada: { exiMines: true, ores: 40, oresPlirous: 40 },
    esperado: { katotatos: 1088, kaMina: 95.74, gesyMina: 28.83, katharaMina: 963.43 },
  },
  {
    nombre: "Τους πρώτους έξι μήνες: 979 €",
    origen: { tipo: "oficial", url: URL_KDP_427, detalle: "ΚΔΠ 427/2025: 979 € μέχρι τη συμπλήρωση έξι μηνών συνεχούς απασχόλησης." },
    fecha: "2026-10-26",
    entrada: { exiMines: false, ores: 40, oresPlirous: 40 },
    esperado: { katotatos: 979 },
  },
  {
    nombre: "Μερική απασχόληση 20 από 40 ώρες",
    origen: { tipo: "recalculado", url: URL_KDP_427, detalle: "Ο κατώτατος προσαρμόζεται αναλόγως των ωρών: 1088 × 20 / 40 = 544." },
    fecha: "2026-10-26",
    entrada: { exiMines: true, ores: 20, oresPlirous: 40 },
    esperado: { katotatos: 544 },
  },
]);
