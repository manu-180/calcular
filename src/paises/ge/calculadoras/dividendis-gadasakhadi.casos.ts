import { definirCasos } from "@/motor/calculo";
import dividendisGadasakhadi from "./dividendis-gadasakhadi";

const KOD = "https://infohub.rs.ge/ka/workspace/document/800cbef0-32bf-4f06-94fe-8afd2bf144a0";

export default definirCasos(dividendisGadasakhadi, [
  {
    nombre: "დივიდენდი 1000 ლარი",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 130.1: 1000 × 5% = 50, ხელზე 950." },
    fecha: "2026-11-01",
    entrada: { modo: "dividendi", tanxa: 1000 },
    esperado: { kheze: 950, gadasakhadi: 50, jamuri: 5 },
  },
  {
    nombre: "მოგება 1000 ლარი",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 98.1 და 97.10: 1000 × 15% = 150, 850 × 5% = 42,5, ხელზე 807,5." },
    fecha: "2026-11-01",
    entrada: { modo: "mogeba", tanxa: 1000 },
    esperado: { kheze: 807.5, mogebis: 150, gadasakhadi: 42.5, jamuri: 19.25 },
  },
]);
