import { definirCasos } from "@/motor/calculo";
import calc from "./danak-pri-pokupka-na-imot";

const SOF = "https://council.sofia.bg/documents/d/guest/r-1036-2025";

export default definirCasos(calc, [
  {
    nombre: "София, 100 000 евро",
    origen: { tipo: "recalculado", url: SOF, detalle: "Чл. 35, ал. 2 от Наредбата на СОС: 3 на сто × 100000 = 3000." },
    fecha: "2026-10-31",
    entrada: { otsenka: 100000, obshtina: "sofia", stavka: null },
    esperado: { danak: 3000, stavka: 3 },
  },
  {
    nombre: "Друга община, ставка от потребителя",
    origen: { tipo: "recalculado", url: SOF, detalle: "100000 × 2 % = 2000." },
    fecha: "2026-10-31",
    entrada: { otsenka: 100000, obshtina: "druga", stavka: 2 },
    esperado: { danak: 2000, stavka: 2 },
  },
]);
