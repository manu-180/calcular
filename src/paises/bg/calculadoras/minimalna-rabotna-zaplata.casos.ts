import { definirCasos } from "@/motor/calculo";
import calc from "./minimalna-rabotna-zaplata";

const NOI = "https://noi.bg/osiguriteli/osiguryavane_osiguriteli/osiguryavane-na-litsata-raboteshti-bez-trudovi-pravootnosheniya/";

export default definirCasos(calc, [
  {
    nombre: "Пълно работно време",
    origen: { tipo: "recalculado", url: NOI, detalle: "620,20 бруто, вноски 85,46, данък 53,47, нето 481,27." },
    fecha: "2026-10-31",
    entrada: { chasove: 8 },
    esperado: { bruto: 620.2, neto: 481.27 },
  },
  {
    nombre: "4 часа на ден",
    origen: { tipo: "recalculado", url: NOI, detalle: "620,20 × 4 / 8 = 310,10." },
    fecha: "2026-10-31",
    entrada: { chasove: 4 },
    esperado: { bruto: 310.1 },
  },
]);
