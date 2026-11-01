import { definirCasos } from "@/motor/calculo";
import calc from "./vsk-reiknivel";

export default definirCasos(calc, [
  {
    nombre: "24% ofan á 10.000 kr.",
    origen: { tipo: "recalculado", detalle: "10.000 x 24% = 2.400." },
    fecha: "2026-06-15",
    entrada: { upphaed: 10000, threp: "almennt", stefna: "baeta" },
    esperado: { vsk: 2400, med: 12400 },
  },
  {
    nombre: "24% úr 12.400 kr.",
    origen: { tipo: "recalculado", detalle: "12.400 / 1,24 = 10.000." },
    fecha: "2026-06-15",
    entrada: { upphaed: 12400, threp: "almennt", stefna: "draga" },
    esperado: { an: 10000, vsk: 2400 },
  },
  {
    nombre: "11% úr 11.100 kr.",
    origen: { tipo: "recalculado", detalle: "11.100 / 1,11 = 10.000." },
    fecha: "2026-06-15",
    entrada: { upphaed: 11100, threp: "laegra", stefna: "draga" },
    esperado: { an: 10000, vsk: 1100 },
  },
]);
