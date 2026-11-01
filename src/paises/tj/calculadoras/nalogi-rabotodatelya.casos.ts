import { definirCasos } from "@/motor/calculo";
import nalogiRabotodatelya from "./nalogi-rabotodatelya";

const NK = "https://andoz.tj/docs/kodex/TaxKodex.pdf";

export default definirCasos(nalogiRabotodatelya, [
  {
    nombre: "Один сотрудник, 5000 сомони",
    origen: { tipo: "recalculado", url: NK, detalle: "Ч. 1 ст. 332: 20 % = 1000. Расходы 6000." },
    fecha: "2026-10-31",
    entrada: {"oklad": 5000, "sotrudniki": 1, "rabotodatel": "prochie"},
    esperado: {"rashodNaOdnogo": 6000, "nalogNaOdnogo": 1000},
  },
  {
    nombre: "Три сотрудника",
    origen: { tipo: "recalculado", url: NK, detalle: "6000 × 3 = 18 000 в месяц, × 12 = 216 000 в год." },
    fecha: "2026-10-31",
    entrada: {"oklad": 5000, "sotrudniki": 3, "rabotodatel": "prochie"},
    esperado: {"rashodVsego": 18000, "rashodZaGod": 216000},
  },
  {
    nombre: "Бюджетное учреждение",
    origen: { tipo: "recalculado", url: NK, detalle: "Ч. 1 ст. 332: 25 %. 3000 + 750 = 3750." },
    fecha: "2026-10-31",
    entrada: {"oklad": 3000, "sotrudniki": 1, "rabotodatel": "gosudarstvennye"},
    esperado: {"rashodNaOdnogo": 3750},
  },
  {
    nombre: "Зарплата ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Зарплата должна быть больше нуля." },
    fecha: "2026-10-31",
    entrada: {"oklad": 0, "sotrudniki": 1, "rabotodatel": "prochie"},
    esperaError: true,
  },
]);
