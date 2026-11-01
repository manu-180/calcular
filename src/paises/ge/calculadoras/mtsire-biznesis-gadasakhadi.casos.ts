import { definirCasos } from "@/motor/calculo";
import mtsireBiznesisGadasakhadi from "./mtsire-biznesis-gadasakhadi";

const KOD = "https://infohub.rs.ge/ka/workspace/document/800cbef0-32bf-4f06-94fe-8afd2bf144a0";

export default definirCasos(mtsireBiznesisGadasakhadi, [
  {
    nombre: "ზღვრის ფარგლებში",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 90.1: 5000 × 1% = 50." },
    fecha: "2026-11-01",
    entrada: { tve: 5000, tsina: 100000, turizmi: false },
    esperado: { gadasakhadi: 50, ganakveti: 1, darchenili: 395000 },
  },
  {
    nombre: "ზღვრის გადაჭარბების თვე",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 90.2: 480 000 + 30 000 > 500 000, 30 000 × 3% = 900." },
    fecha: "2026-11-01",
    entrada: { tve: 30000, tsina: 480000, turizmi: false },
    esperado: { gadasakhadi: 900, ganakveti: 3, darchenili: 0 },
  },
  {
    nombre: "იგივე თანხა, ღვინის ტურიზმი",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 90.1-2: ზღვარი 700 000, 30 000 × 1% = 300." },
    fecha: "2026-11-01",
    entrada: { tve: 30000, tsina: 480000, turizmi: true },
    esperado: { gadasakhadi: 300, ganakveti: 1, darchenili: 190000 },
  },
]);
