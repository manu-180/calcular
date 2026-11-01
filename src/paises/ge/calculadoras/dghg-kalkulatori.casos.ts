import { definirCasos } from "@/motor/calculo";
import dghgKalkulatori from "./dghg-kalkulatori";

const KOD = "https://infohub.rs.ge/ka/workspace/document/800cbef0-32bf-4f06-94fe-8afd2bf144a0";

export default definirCasos(dghgKalkulatori, [
  {
    nombre: "დამატება 100 ლარზე",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 166: 100 × 18% = 18, სულ 118." },
    fecha: "2026-11-01",
    entrada: { modo: "damateba", tanxa: 100, brunva: null },
    esperado: { sul: 118, dghg: 18, netoTanxa: 100 },
  },
  {
    nombre: "გამოყოფა 118 ლარიდან",
    origen: { tipo: "recalculado", url: KOD, detalle: "118 / 1,18 = 100, დღგ 18." },
    fecha: "2026-11-01",
    entrada: { modo: "gamoqopa", tanxa: 118, brunva: 150000 },
    esperado: { sul: 118, dghg: 18, netoTanxa: 100 },
  },
]);
