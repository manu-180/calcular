import { definirCasos } from "@/motor/calculo";
import ferie from "./ferie";

export default definirCasos(ferie, [
  {
    nombre: "Quattro settimane, 5 giorni a settimana, 9 mesi",
    origen: { tipo: "recalculado", detalle: "4 × 5 = 20 giorni l'anno; 20 × 9 / 12 = 15 maturati; 15 − 6 goduti = 9; 9 × 8 = 72 ore." },
    fecha: "2026-10-01",
    entrada: { settimane: 4, giorni: "5", mesi: 9, goduti: 6, oreGiorno: 8 },
    esperado: { annui: 20, maturati: 15, residui: 9, oreResidue: 72 },
  },
  {
    nombre: "Settimana di 6 giorni, anno intero",
    origen: { tipo: "recalculado", detalle: "4 × 6 = 24 giorni; nessun giorno goduto." },
    fecha: "2026-12-31",
    entrada: { settimane: 4, giorni: "6", mesi: 12, goduti: 0, oreGiorno: 6.5 },
    esperado: { annui: 24, maturati: 24, residui: 24, oreResidue: 156 },
  },
  {
    nombre: "Contratto con 5 settimane, 7 mesi",
    origen: { tipo: "recalculado", detalle: "5 × 5 = 25; 25 × 7 / 12 = 14,58." },
    fecha: "2026-08-01",
    entrada: { settimane: 5, giorni: "5", mesi: 7, goduti: 0, oreGiorno: 8 },
    esperado: { maturati: 14.58, residui: 14.58 },
  },
  {
    nombre: "Meno del minimo di legge",
    origen: { tipo: "recalculado", detalle: "Tre settimane sono sotto il minimo di quattro." },
    fecha: "2026-08-01",
    entrada: { settimane: 3, giorni: "5", mesi: 7, goduti: 0, oreGiorno: 8 },
    esperaError: true,
  },
]);
