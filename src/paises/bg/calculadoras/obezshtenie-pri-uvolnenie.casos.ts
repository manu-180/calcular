import { definirCasos } from "@/motor/calculo";
import calc from "./obezshtenie-pri-uvolnenie";

const KT = "https://www.noi.bg/wp-content/uploads/KT-2.pdf";

export default definirCasos(calc, [
  {
    nombre: "Съкращаване: един месец",
    origen: { tipo: "recalculado", url: KT, detalle: "Чл. 222, ал. 1: до 1 месец бруто, 1500." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, osnovanie: "sakrashtavane", bezRabota: 3 },
    esperado: { obezshtenie: 1500, mesetsi: 1 },
  },
  {
    nombre: "Пенсия след 10 години при същия работодател",
    origen: { tipo: "recalculado", url: KT, detalle: "Чл. 222, ал. 3: 6 × 1500 = 9000." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, osnovanie: "pensia10", bezRabota: null },
    esperado: { obezshtenie: 9000, mesetsi: 6 },
  },
  {
    nombre: "Незаконно уволнение: 4 месеца без работа",
    origen: { tipo: "recalculado", url: KT, detalle: "Чл. 225, ал. 1: 4 × 1500 = 6000, под максимума от 6 месеца." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, osnovanie: "nezakonno", bezRabota: 4 },
    esperado: { obezshtenie: 6000, mesetsi: 4 },
  },
  {
    nombre: "Болест",
    origen: { tipo: "recalculado", url: KT, detalle: "Чл. 222, ал. 2: 2 × 1500 = 3000." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, osnovanie: "bolest", bezRabota: null },
    esperado: { obezshtenie: 3000 },
  },
]);
