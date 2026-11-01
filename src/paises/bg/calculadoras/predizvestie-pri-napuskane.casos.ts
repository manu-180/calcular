import { definirCasos } from "@/motor/calculo";
import calc from "./predizvestie-pri-napuskane";

const KT = "https://www.noi.bg/wp-content/uploads/KT-2.pdf";

export default definirCasos(calc, [
  {
    nombre: "Безсрочен договор, 30 дни",
    origen: { tipo: "recalculado", url: KT, detalle: "Чл. 326, ал. 2 и 4: 30 дни от следващия ден; от 01.11.2026 г. до 01.12.2026 г." },
    fecha: "2026-10-31",
    entrada: { vid: "bezsrochen", uslovno: null, ostatak: null, data: "2026-11-01", bruto: 1500, nespazeni: 0 },
    esperado: { dni: 30, krayna: "2026-12-01", obezshtenie: 0 },
  },
  {
    nombre: "Срочен договор с 60 дни остатък",
    origen: { tipo: "recalculado", url: KT, detalle: "3 месеца, но не повече от остатъка: 60 дни." },
    fecha: "2026-10-31",
    entrada: { vid: "srochen", uslovno: null, ostatak: 60, data: "2026-11-01", bruto: 1500, nespazeni: 0 },
    esperado: { dni: 60 },
  },
  {
    nombre: "Неспазени 15 дни",
    origen: { tipo: "recalculado", url: KT, detalle: "Чл. 220: 1500 × 15 / 30 = 750." },
    fecha: "2026-10-31",
    entrada: { vid: "bezsrochen", uslovno: null, ostatak: null, data: "2026-11-01", bruto: 1500, nespazeni: 15 },
    esperado: { obezshtenie: 750 },
  },
]);
