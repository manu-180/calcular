import { definirCasos } from "@/motor/calculo";
import mogebisGadasakhadi from "./mogebis-gadasakhadi";

const KOD = "https://infohub.rs.ge/ka/workspace/document/800cbef0-32bf-4f06-94fe-8afd2bf144a0";

export default definirCasos(mogebisGadasakhadi, [
  {
    nombre: "განაწილებული 8500 ლარი",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 97.10: 8500 / 0,85 = 10 000; მუხლი 98.1: 15% = 1500." },
    fecha: "2026-11-01",
    entrada: { ganatsilebuli: 8500 },
    esperado: { gadasakhadi: 1500, dasabegri: 10000, sul: 10000 },
  },
]);
