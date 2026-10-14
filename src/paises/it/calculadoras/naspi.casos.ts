import { definirCasos } from "@/motor/calculo";
import naspi from "./naspi";

export default definirCasos(naspi, [
  {
    nombre: "Quattro anni pieni con 96.000 euro di retribuzione",
    origen: {
      tipo: "recalculado",
      detalle:
        "96.000 / 208 × 4,33 = 1.998,46; 75% di 1.456,72 = 1.092,54 più 25% di (1.998,46 − 1.456,72) = 135,44: 1.227,98. Durata 104 settimane (24,02 mesi). Dopo la prima riduzione del 3%: 1.191,14.",
    },
    fecha: "2026-10-14",
    entrada: { retribuzione: 96000, settimane: 208, over55: false },
    esperado: { mensile: 1998.46, iniziale: 1227.98, settimaneDurata: 104, mesiDurata: 24.02, meseRiduzione: 6, dopoRiduzione: 1191.14 },
  },
  {
    nombre: "Retribuzione alta: si applica il tetto mensile",
    origen: { tipo: "recalculado", detalle: "200.000 / 208 × 4,33 = 4.163,46; il calcolo supera 1.584,70, che è il massimo 2026. Con 55 anni la riduzione parte dall'8° mese." },
    fecha: "2026-10-14",
    entrada: { retribuzione: 200000, settimane: 208, over55: true },
    esperado: { iniziale: 1584.7, meseRiduzione: 8, dopoRiduzione: 1537.16 },
  },
  {
    nombre: "Retribuzione bassa, sotto la soglia di riferimento",
    origen: { tipo: "recalculado", detalle: "20.000 / 104 × 4,33 = 832,69; 75% = 624,52; durata 52 settimane." },
    fecha: "2026-10-14",
    entrada: { retribuzione: 20000, settimane: 104, over55: false },
    esperado: { mensile: 832.69, iniziale: 624.52, settimaneDurata: 52 },
  },
  {
    nombre: "Più di 208 settimane",
    origen: { tipo: "recalculado", detalle: "Quattro anni hanno al massimo 208 settimane." },
    fecha: "2026-10-14",
    entrada: { retribuzione: 20000, settimane: 300, over55: false },
    esperaError: true,
  },
]);
