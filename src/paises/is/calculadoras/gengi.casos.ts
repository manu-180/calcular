import { definirCasos } from "@/motor/calculo";
import calc from "./gengi";

export default definirCasos(calc, [
  {
    nombre: "100 evrur í krónur",
    origen: { tipo: "recalculado", detalle: "Miðgengi Seðlabankans 30.10.2026: 136,000. 100 x 136 = 13.600." },
    fecha: "2026-10-30",
    entrada: { mynt: "eur", stefna: "ikr", upphaed: 100 },
    esperado: { nidurstada: 13600, gengi: 136 },
  },
  {
    nombre: "12.173 krónur í dali",
    origen: { tipo: "recalculado", detalle: "Miðgengi 30.10.2026: 121,73. 12.173 / 121,73 = 100." },
    fecha: "2026-10-30",
    entrada: { mynt: "usd", stefna: "erlent", upphaed: 12173 },
    esperado: { nidurstada: 100 },
  },
]);
