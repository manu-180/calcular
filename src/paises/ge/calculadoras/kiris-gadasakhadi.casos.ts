import { definirCasos } from "@/motor/calculo";
import kirisGadasakhadi from "./kiris-gadasakhadi";

const KOD = "https://infohub.rs.ge/ka/workspace/document/800cbef0-32bf-4f06-94fe-8afd2bf144a0";

export default definirCasos(kirisGadasakhadi, [
  {
    nombre: "საცხოვრებელი, 1000 ლარი თვეში",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 81.2: 12 000 × 5% = 600." },
    fecha: "2026-11-01",
    entrada: { qira: 1000, tipi: "sacxovrebeli", tve: 12 },
    esperado: { tslis: 600, tvis: 50, ganakveti: 5, darcheni: 11400 },
  },
  {
    nombre: "სხვა ფართი, 1000 ლარი თვეში",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 81.1: 12 000 × 20% = 2400." },
    fecha: "2026-11-01",
    entrada: { qira: 1000, tipi: "sxva", tve: 12 },
    esperado: { tslis: 2400, ganakveti: 20 },
  },
]);
