import { definirCasos } from "@/motor/calculo";
import kursiIKembimit from "./kursi-i-kembimit";

const B = "https://www.bankofalbania.org/Tregjet/Kursi_zyrtar_i_kembimit/";

export default definirCasos(kursiIKembimit, [
  {
    nombre: "100 euro me kursin e 30.10.2026",
    origen: { tipo: "recalculado", url: B, detalle: "Kursi 90,90: 100 × 90,90 = 9 090." },
    fecha: "2026-10-30",
    entrada: { valuta: "eur", drejtimi: "ne-leke", shuma: 100 },
    esperado: { rezultati: 9090, kursi: 90.9 },
  },
  {
    nombre: "8 116 lekë në dollarë",
    origen: { tipo: "recalculado", url: B, detalle: "Kursi 81,16: 8 116 / 81,16 = 100." },
    fecha: "2026-10-30",
    entrada: { valuta: "usd", drejtimi: "ne-valute", shuma: 8116 },
    esperado: { rezultati: 100 },
  },
  {
    nombre: "Shumë zero",
    origen: { tipo: "recalculado", url: B, detalle: "Pa shumë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { valuta: "eur", drejtimi: "ne-leke", shuma: 0 },
    esperaError: true,
  },
]);
