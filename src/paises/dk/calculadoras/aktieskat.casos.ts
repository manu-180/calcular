import { definirCasos } from "@/motor/calculo";
import aktieskat from "./aktieskat";

const PSL = "https://svmn.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/personskatteloven";

export default definirCasos(aktieskat, [
  {
    nombre: "100.000 kr. i aktieindkomst",
    origen: { tipo: "recalculado", url: PSL, detalle: "27 % af 79.400 = 21.438; 42 % af 20.600 = 8.652; i alt 30.090. Tilbage 69.910." },
    fecha: "2026-10-24",
    entrada: { aktieindkomst: 100000 },
    esperado: { lav: 21438, hoej: 8652, skat: 30090, efterSkat: 69910 },
  },
  {
    nombre: "50.000 kr. under progressionsgrænsen",
    origen: { tipo: "recalculado", url: PSL, detalle: "27 % af 50.000 = 13.500." },
    fecha: "2026-10-24",
    entrada: { aktieindkomst: 50000 },
    esperado: { skat: 13500, hoej: 0 },
  },
  {
    nombre: "2027 med progressionsgrænse 89.600 kr.",
    origen: { tipo: "recalculado", url: PSL, detalle: "27 % af 89.600 = 24.192; 42 % af 10.400 = 4.368; i alt 28.560." },
    fecha: "2027-01-02",
    entrada: { aktieindkomst: 100000 },
    esperado: { skat: 28560 },
  },
]);
