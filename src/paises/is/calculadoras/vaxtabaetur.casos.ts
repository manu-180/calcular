import { definirCasos } from "@/motor/calculo";
import calc from "./vaxtabaetur";

export default definirCasos(calc, [
  {
    nombre: "Einhleypur undir eignamörkum",
    origen: { tipo: "recalculado", detalle: "Lægst af 900.000, 1.400.000 og 840.000 = 840.000; - 510.000 (8,5% af 6.000.000) = 330.000." },
    fecha: "2026-06-15",
    entrada: { stada: "einhleypur", vaxtagjold: 900000, skuldir: 20000000, tekjur: 6000000, eign: 5000000 },
    esperado: { vextir: 840000, baetur: 330000 },
  },
  {
    nombre: "Eignir á miðju skerðingarbili",
    origen: { tipo: "recalculado", detalle: "9.750.000 er mitt á milli 7.500.000 og 12.000.000: 330.000 x 50% = 165.000." },
    fecha: "2026-06-15",
    entrada: { stada: "einhleypur", vaxtagjold: 900000, skuldir: 20000000, tekjur: 6000000, eign: 9750000 },
    esperado: { baetur: 165000 },
  },
  {
    nombre: "Eignir yfir efri mörkum",
    origen: { tipo: "recalculado", detalle: "Við 12.000.000 falla bætur niður." },
    fecha: "2026-06-15",
    entrada: { stada: "einhleypur", vaxtagjold: 900000, skuldir: 20000000, tekjur: 6000000, eign: 12000000 },
    esperado: { baetur: 0 },
  },
  {
    nombre: "Hjón við hámark",
    origen: { tipo: "recalculado", detalle: "1.260.000 - 85.000 = 1.175.000, hámark 630.000." },
    fecha: "2026-06-15",
    entrada: { stada: "hjon", vaxtagjold: 2000000, skuldir: 40000000, tekjur: 1000000, eign: 0 },
    esperado: { baetur: 630000 },
  },
]);
