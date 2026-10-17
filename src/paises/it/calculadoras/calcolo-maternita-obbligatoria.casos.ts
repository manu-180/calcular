import { definirCasos } from "@/motor/calculo";
import maternita from "./calcolo-maternita-obbligatoria";

export default definirCasos(maternita, [
  {
    nombre: "1.800 euro al mese, 13 mensilità, 150 giorni",
    origen: { tipo: "recalculado", detalle: "1.800 × 13 / 12 / 30 = 65; 80% = 52 al giorno; × 150 = 7.800." },
    fecha: "2026-10-14",
    entrada: { retribuzione: 1800, mensilita: "13", giorni: 150, integrazione: false },
    esperado: { giornaliera: 65, indennitaGiorno: 52, inps: 7800, datore: 0, totale: 7800 },
  },
  {
    nombre: "Con integrazione al 100% del contratto",
    origen: { tipo: "recalculado", detalle: "1.500 × 12 / 12 / 30 = 50; INPS 40 × 150 = 6.000; datore 10 × 150 = 1.500; totale 7.500." },
    fecha: "2026-10-14",
    entrada: { retribuzione: 1500, mensilita: "12", giorni: 150, integrazione: true },
    esperado: { inps: 6000, datore: 1500, totale: 7500 },
  },
  {
    nombre: "Zero giorni",
    origen: { tipo: "recalculado", detalle: "Serve almeno un giorno di congedo." },
    fecha: "2026-10-14",
    entrada: { retribuzione: 1500, mensilita: "12", giorni: 0, integrazione: false },
    esperaError: true,
  },
]);
