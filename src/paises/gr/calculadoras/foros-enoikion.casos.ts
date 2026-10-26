import { definirCasos } from "@/motor/calculo";
import forosEnoikion from "./foros-enoikion";

const FEK = "https://ia37rg02wpsa01.blob.core.windows.net/fek/01/2025/20250100198.pdf";

export default definirCasos(forosEnoikion, [
  {
    nombre: "9.600 € ενοίκια, φυσικό πρόσωπο",
    origen: { tipo: "recalculado", url: FEK, detalle: "Έκπτωση 5% = 480. Καθαρό 9120 × 15% = 1368." },
    fecha: "2026-10-24",
    entrada: { enoikia: 9600, fysiko: true },
    esperado: { ekptosi: 480, katharo: 9120, foros: 1368 },
  },
  {
    nombre: "15.000 €: το νέο κλιμάκιο 25%",
    origen: { tipo: "recalculado", url: FEK, detalle: "Καθαρό 14250. 12000 × 15% = 1800 + 2250 × 25% = 562,50. Σύνολο 2362,50." },
    fecha: "2026-10-24",
    entrada: { enoikia: 15000, fysiko: true },
    esperado: { foros: 2362.5 },
  },
  {
    nombre: "50.000 € χωρίς έκπτωση: όλα τα κλιμάκια",
    origen: { tipo: "recalculado", url: FEK, detalle: "1800 + 12000 × 25% = 3000 + 12000 × 35% = 4200 + 14000 × 45% = 6300. Σύνολο 15300." },
    fecha: "2026-10-24",
    entrada: { enoikia: 50000, fysiko: false },
    esperado: { foros: 15300, ekptosi: 0 },
  },
]);
