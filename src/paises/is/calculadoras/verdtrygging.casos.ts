import { definirCasos } from "@/motor/calculo";
import calc from "./verdtrygging";

export default definirCasos(calc, [
  {
    nombre: "30 milljónir, janúar til nóvember",
    origen: { tipo: "recalculado", detalle: "30.000.000 x 697,3 / 658,2 = 31.782.133. Vísitölur úr töflu Hagstofu VIS01004." },
    fecha: "2026-11-15",
    entrada: { upphaed: 30000000, fra: "2026-01-01", til: "2026-11-01" },
    esperado: { ny: 31782133, verdbaetur: 1782133 },
  },
  {
    nombre: "Upphafsmánuður á eftir lokamánuði",
    origen: { tipo: "recalculado", detalle: "Ógild innsláttur." },
    fecha: "2026-11-15",
    entrada: { upphaed: 1000000, fra: "2026-10-01", til: "2026-01-01" },
    esperaError: true,
  },
]);
