import { definirCasos } from "@/motor/calculo";
import calc from "./izvanreden-trud";

const KT = "https://www.noi.bg/wp-content/uploads/KT-2.pdf";

export default definirCasos(calc, [
  {
    nombre: "Работен ден, 10 часа",
    origen: { tipo: "recalculado", url: KT, detalle: "Чл. 262: 1500 / 168 = 8,9286; × 1,5 × 10 = 133,93." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, chasoveMesets: 168, vid: "raboten", chasove: 10 },
    esperado: { obshto: 133.93, chasStavka: 8.93 },
  },
  {
    nombre: "Почивен ден, 10 часа",
    origen: { tipo: "recalculado", url: KT, detalle: "× 1,75: 156,25." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, chasoveMesets: 168, vid: "pochiven", chasove: 10 },
    esperado: { obshto: 156.25 },
  },
  {
    nombre: "Официален празник, 10 часа",
    origen: { tipo: "recalculado", url: KT, detalle: "× 2: 178,57." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, chasoveMesets: 168, vid: "praznik", chasove: 10 },
    esperado: { obshto: 178.57 },
  },
]);
