import { definirCasos } from "@/motor/calculo";
import koerselsgodtgoerelse from "./koerselsgodtgoerelse";

const LL = "https://svmn.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/ligningsloven";

export default definirCasos(koerselsgodtgoerelse, [
  {
    nombre: "1.000 km i egen bil",
    origen: { tipo: "recalculado", url: LL, detalle: "Skatterådets sats 2026: 3,94 kr. pr. km til og med 20.000 km. 1.000 × 3,94 = 3.940." },
    fecha: "2026-10-24",
    entrada: { koeretoej: "bil", km: 1000, tidligere: 0 },
    esperado: { godtgoerelse: 3940, hoej: 1000, lav: 0 },
  },
  {
    nombre: "Over 20.000 km i året",
    origen: { tipo: "recalculado", url: LL, detalle: "19.500 km tidligere; 500 km × 3,94 + 500 km × 2,28 = 1.970 + 1.140 = 3.110." },
    fecha: "2026-10-24",
    entrada: { koeretoej: "bil", km: 1000, tidligere: 19500 },
    esperado: { godtgoerelse: 3110, hoej: 500, lav: 500 },
  },
  {
    nombre: "Cykel",
    origen: { tipo: "recalculado", url: LL, detalle: "0,64 kr. pr. km: 100 km = 64 kr." },
    fecha: "2026-10-24",
    entrada: { koeretoej: "cykel", km: 100, tidligere: null },
    esperado: { godtgoerelse: 64 },
  },
]);
