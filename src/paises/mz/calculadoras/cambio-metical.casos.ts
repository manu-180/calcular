import { definirCasos } from "@/motor/calculo";
import cambioMetical from "./cambio-metical";

const BM = "https://www.bancomoc.mz/bmapi/exchangerates";

export default definirCasos(cambioMetical, [
  {
    nombre: "100 dólares para meticais",
    origen: { tipo: "recalculado", url: BM, detalle: "Taxa de compra do USD a 26/10/2026: 63,27. 100 × 63,27 = 6 327." },
    fecha: "2026-10-26",
    entrada: { moeda: "usd", sentido: "para-meticais", quantia: 100 },
    esperado: { meticais: 6327, taxa: 63.27 },
  },
  {
    nombre: "10 000 meticais em dólares",
    origen: { tipo: "recalculado", url: BM, detalle: "Taxa de venda do USD: 64,54. 10 000 / 64,54 = 154,94." },
    fecha: "2026-10-26",
    entrada: { moeda: "usd", sentido: "de-meticais", quantia: 10000 },
    esperado: { estrangeira: 154.94 },
  },
  {
    nombre: "1 000 randes para meticais",
    origen: { tipo: "recalculado", url: BM, detalle: "Taxa de compra do ZAR: 3,81. 1 000 × 3,81 = 3 810." },
    fecha: "2026-10-26",
    entrada: { moeda: "zar", sentido: "para-meticais", quantia: 1000 },
    esperado: { meticais: 3810 },
  },
]);
