import { definirCasos } from "@/motor/calculo";
import sashemosavloGadasakhadi from "./sashemosavlo-gadasakhadi";

const KOD = "https://infohub.rs.ge/ka/workspace/document/800cbef0-32bf-4f06-94fe-8afd2bf144a0";

export default definirCasos(sashemosavloGadasakhadi, [
  {
    nombre: "ხელფასი 1000 ლარი, სქემით",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 81.1 და 82.1 „ბ3“: (1000 − 20) × 20% = 196." },
    fecha: "2026-11-01",
    entrada: { tipi: "khelpasi", tanxa: 1000, monatsile: true },
    esperado: { gadasakhadi: 196, baza: 980, darcheni: 784 },
  },
  {
    nombre: "ქირა 1000 ლარი",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 81.2: 1000 × 5% = 50." },
    fecha: "2026-11-01",
    entrada: { tipi: "qira", tanxa: 1000, monatsile: null },
    esperado: { gadasakhadi: 50, ganakveti: 5, darcheni: 950 },
  },
  {
    nombre: "სხვა შემოსავალი 1000 ლარი",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 81.1: 1000 × 20% = 200." },
    fecha: "2026-11-01",
    entrada: { tipi: "sxva", tanxa: 1000, monatsile: null },
    esperado: { gadasakhadi: 200, pensia: 0 },
  },
]);
