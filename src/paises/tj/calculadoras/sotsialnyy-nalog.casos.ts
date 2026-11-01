import { definirCasos } from "@/motor/calculo";
import sotsialnyyNalog from "./sotsialnyy-nalog";

const NK = "https://andoz.tj/docs/kodex/TaxKodex.pdf";

export default definirCasos(sotsialnyyNalog, [
  {
    nombre: "Частная компания, 5000 сомони",
    origen: { tipo: "recalculado", url: NK, detalle: "Ст. 332: 20 % = 1000, 2 % = 100." },
    fecha: "2026-10-31",
    entrada: {"fond": 5000, "rabotodatel": "prochie"},
    esperado: {"rabotodatel": 1000, "rabotnik": 100, "vsego": 1100},
  },
  {
    nombre: "Бюджетное учреждение, 5000 сомони",
    origen: { tipo: "recalculado", url: NK, detalle: "Ст. 332: 25 % = 1250, 1 % = 50." },
    fecha: "2026-10-31",
    entrada: {"fond": 5000, "rabotodatel": "gosudarstvennye"},
    esperado: {"rabotodatel": 1250, "rabotnik": 50, "vsego": 1300},
  },
  {
    nombre: "Минимальная зарплата",
    origen: { tipo: "recalculado", url: NK, detalle: "1300 × 20 % = 260, 1300 × 2 % = 26." },
    fecha: "2026-10-31",
    entrada: {"fond": 1300, "rabotodatel": "prochie"},
    esperado: {"rabotodatel": 260, "rabotnik": 26, "vsego": 286},
  },
  {
    nombre: "Зарплата ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Зарплата должна быть больше нуля." },
    fecha: "2026-10-31",
    entrada: {"fond": 0, "rabotodatel": "prochie"},
    esperaError: true,
  },
]);
