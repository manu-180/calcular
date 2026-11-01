import { definirCasos } from "@/motor/calculo";
import pagaMinimale from "./paga-minimale";

const V = "https://inspektoriatipunes.gov.al/wp-content/uploads/2026/01/vendim-2025-12-19-776.pdf";

export default definirCasos(pagaMinimale, [
  {
    nombre: "174 orë",
    origen: { tipo: "oficial", url: V, detalle: "VKM 776/2025: 50 000 lekë për 174 orë; 287,3 lekë në orë." },
    fecha: "2026-10-30",
    entrada: { ore: 174, pagaJuaj: null },
    esperado: { perOret: 50000, minimale: 50000, orare: 287.3, neto: 44400, kosto: 58350 },
  },
  {
    nombre: "87 orë me pagë 30 000",
    origen: { tipo: "recalculado", url: V, detalle: "87 × 287,3 = 24 995; 30 000 − 24 995 = 5 005." },
    fecha: "2026-10-30",
    entrada: { ore: 87, pagaJuaj: 30000 },
    esperado: { perOret: 24995, diferenca: 5005 },
  },
  {
    nombre: "Pa orë",
    origen: { tipo: "recalculado", url: V, detalle: "Nuk ka minimum për zero orë." },
    fecha: "2026-10-30",
    entrada: { ore: 0, pagaJuaj: null },
    esperaError: true,
  },
]);
