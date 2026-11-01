import { definirCasos } from "@/motor/calculo";
import calc from "./verdbolga";

export default definirCasos(calc, [
  {
    nombre: "Tólf mánuðir til október",
    origen: { tipo: "oficial", url: "https://hagstofa.is/utgafur/frettasafn/verdlag/visitala-neysluverds-i-oktober-2026", detalle: "Hagstofan: 5,9% á tólf mánuðum. 700,4 / 661,4 = 1,05897; 100.000 verða 105.897." },
    fecha: "2026-10-30",
    entrada: { upphaed: 100000, fra: "2025-10-01", til: "2026-10-01" },
    esperado: { ny: 105897, munur: 5897 },
  },
]);
