import { definirCasos } from "@/motor/calculo";
import pension from "./pensionikalkulaator";

const RPKS = "https://www.riigiteataja.ee/akt/RPKS";

export default definirCasos(pension, [
  {
    nombre: "Näidis 2026",
    origen: { tipo: "recalculado", url: RPKS, detalle: "§ 11: 399,24 + 10 × 10,477 + 15 × 10,477 + (5 + 5) / 2 × 10,477 = 713,55." },
    fecha: "2026-10-15",
    entrada: { staaz: 10, osakud: 15, osakudUued: 5, solidaar: 5, koguStaaz: 40 },
    esperado: { pension: 713.55, staazOsa: 104.77, uhendOsa: 52.39 },
  },
  {
    nombre: "Ainult baasosa",
    origen: { tipo: "recalculado", url: "https://sotsiaalkindlustusamet.ee/en/pension-and-benefits/pension-amount/pension-calculation", detalle: "Baasosa 399,24." },
    fecha: "2026-10-15",
    entrada: { staaz: 0, osakud: 0, osakudUued: 0, solidaar: 0, koguStaaz: 40 },
    esperado: { pension: 399.24 },
  },
]);
