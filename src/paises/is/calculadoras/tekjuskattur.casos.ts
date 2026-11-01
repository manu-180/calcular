import { definirCasos } from "@/motor/calculo";
import calc from "./tekjuskattur";

export default definirCasos(calc, [
  {
    nombre: "7,2 milljónir á ári",
    origen: { tipo: "recalculado", detalle: "Stofn 6.912.000; 5.977.470 x 31,49% = 1.882.305; 934.530 x 37,99% = 355.028; - 869.898 = 1.367.435. Útsvar 14,94% = 1.032.653." },
    fecha: "2026-06-15",
    entrada: { tekjur: 7200000, lifeyrir: true, nyting: 100 },
    esperado: { stofn: 6912000, skattur: 1367435, utsvar: 1032653 },
  },
  {
    nombre: "Lágar tekjur",
    origen: { tipo: "recalculado", detalle: "2.000.000 x 31,49% = 629.800, lægra en afslátturinn." },
    fecha: "2026-06-15",
    entrada: { tekjur: 2000000, lifeyrir: false, nyting: 100 },
    esperado: { skattur: 0, utsvar: null },
  },
]);
