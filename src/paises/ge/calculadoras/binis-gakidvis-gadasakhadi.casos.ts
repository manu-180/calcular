import { definirCasos } from "@/motor/calculo";
import binisGakidvisGadasakhadi from "./binis-gakidvis-gadasakhadi";

const KOD = "https://infohub.rs.ge/ka/workspace/document/800cbef0-32bf-4f06-94fe-8afd2bf144a0";

export default definirCasos(binisGakidvisGadasakhadi, [
  {
    nombre: "ბინა ერთ წელში",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 81.3: 50 000 × 5% = 2500." },
    fecha: "2026-11-01",
    entrada: { tipi: "bina", gakidva: 200000, shedzena: 150000, tve: 12 },
    esperado: { gadasakhadi: 2500, nameti: 50000, zghvari: 24 },
  },
  {
    nombre: "ბინა ზუსტად ორ წელში",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 82 „ვ.ა“ ითხოვს 2 წელზე მეტს, 24 თვე ჯერ არ კმარა." },
    fecha: "2026-11-01",
    entrada: { tipi: "bina", gakidva: 200000, shedzena: 150000, tve: 24 },
    esperado: { gadasakhadi: 2500 },
  },
  {
    nombre: "ბინა 30 თვეში",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 82 „ვ.ა“: 2 წელზე მეტი, გადასახადი 0." },
    fecha: "2026-11-01",
    entrada: { tipi: "bina", gakidva: 200000, shedzena: 150000, tve: 30 },
    esperado: { gadasakhadi: 0, darcheni: 50000 },
  },
  {
    nombre: "ავტომობილი სამ თვეში",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 81.3: 5000 × 5% = 250." },
    fecha: "2026-11-01",
    entrada: { tipi: "avto", gakidva: 20000, shedzena: 15000, tve: 3 },
    esperado: { gadasakhadi: 250, zghvari: 6 },
  },
  {
    nombre: "ავტომობილი შვიდ თვეში",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 82 „ვ.ბ“: 6 თვეზე მეტი, გადასახადი 0." },
    fecha: "2026-11-01",
    entrada: { tipi: "avto", gakidva: 20000, shedzena: 15000, tve: 7 },
    esperado: { gadasakhadi: 0 },
  },
]);
