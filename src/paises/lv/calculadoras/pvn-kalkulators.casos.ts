import { definirCasos } from "@/motor/calculo";
import pvn from "./pvn-kalkulators";

const VID = "https://www.vid.gov.lv/lv/pievienotas-vertibas-nodokla-likmes";

export default definirCasos(pvn, [
  {
    nombre: "100 eiro + 21%",
    origen: { tipo: "recalculado", url: VID, detalle: "100 × 21% = 21. Ar PVN 121." },
    fecha: "2026-11-01",
    entrada: { virziens: "pieskaitit", summa: 100, likme: "standarta" },
    esperado: { pvn: 21, arPvn: 121, likme: 21 },
  },
  {
    nombre: "121 eiro, izdalīt 21%",
    origen: { tipo: "recalculado", url: VID, detalle: "121 / 1,21 = 100. PVN 21." },
    fecha: "2026-11-01",
    entrada: { virziens: "izdalit", summa: 121, likme: "standarta" },
    esperado: { bezPvn: 100, pvn: 21 },
  },
  {
    nombre: "Zāles 12%",
    origen: { tipo: "recalculado", url: VID, detalle: "50 × 12% = 6." },
    fecha: "2026-11-01",
    entrada: { virziens: "pieskaitit", summa: 50, likme: "samazinata" },
    esperado: { pvn: 6, arPvn: 56 },
  },
  {
    nombre: "Grāmata 5%",
    origen: { tipo: "recalculado", url: VID, detalle: "21 / 1,05 = 20. PVN 1." },
    fecha: "2026-11-01",
    entrada: { virziens: "izdalit", summa: 21, likme: "gramatas" },
    esperado: { bezPvn: 20, pvn: 1 },
  },
]);
