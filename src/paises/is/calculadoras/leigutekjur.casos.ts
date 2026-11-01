import { definirCasos } from "@/motor/calculo";
import calc from "./leigutekjur";

export default definirCasos(calc, [
  {
    nombre: "3 milljónir í leigu",
    origen: { tipo: "recalculado", detalle: "3.000.000 x 75% = 2.250.000; x 22% = 495.000." },
    fecha: "2026-06-15",
    entrada: { leiga: 3000000 },
    esperado: { stofn: 2250000, skattur: 495000, eftir: 2505000, manadar: 208750 },
  },
]);
