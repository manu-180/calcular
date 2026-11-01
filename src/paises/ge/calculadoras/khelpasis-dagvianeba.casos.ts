import { definirCasos } from "@/motor/calculo";
import khelpasisDagvianeba from "./khelpasis-dagvianeba";

const KOD = "https://sla.gov.ge/Ge/Files/ViewFile/3236";

export default definirCasos(khelpasisDagvianeba, [
  {
    nombre: "1000 ლარი, 30 დღე",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 41.4: 1000 × 0,07% × 30 = 21." },
    fecha: "2026-11-01",
    entrada: { tanxa: 1000, dghe: 30 },
    esperado: { pirgasamtekhlo: 21, dghiuri: 0.7, sul: 1021 },
  },
]);
