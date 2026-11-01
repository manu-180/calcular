import { definirCasos } from "@/motor/calculo";
import podokhodnyyNalog from "./podokhodnyy-nalog";

const NK = "https://andoz.tj/docs/kodex/TaxKodex.pdf";

export default definirCasos(podokhodnyyNalog, [
  {
    nombre: "Доход 5000 сомони",
    origen: { tipo: "recalculado", url: NK, detalle: "5000 - 100 - 156 = 4744. Ст. 183: 12 % = 569,28." },
    fecha: "2026-10-31",
    entrada: {"dokhod": 5000, "rabotodatel": "prochie", "vychetTip": "obychnyy"},
    esperado: {"nalog": 569.28, "baza": 4744, "vychet": 156, "stavka": 12, "nalogZaGod": 6831.36},
  },
  {
    nombre: "Доход 8000 сомони",
    origen: { tipo: "recalculado", url: NK, detalle: "8000 - 160 - 156 = 7684. 12 % = 922,08." },
    fecha: "2026-10-31",
    entrada: {"dokhod": 8000, "rabotodatel": "prochie", "vychetTip": "obychnyy"},
    esperado: {"nalog": 922.08},
  },
  {
    nombre: "Бюджетное учреждение",
    origen: { tipo: "recalculado", url: NK, detalle: "Ст. 332: 1 %. 5000 - 50 - 156 = 4794. 12 % = 575,28." },
    fecha: "2026-10-31",
    entrada: {"dokhod": 5000, "rabotodatel": "gosudarstvennye", "vychetTip": "obychnyy"},
    esperado: {"nalog": 575.28},
  },
  {
    nombre: "Льготный вычет",
    origen: { tipo: "recalculado", url: NK, detalle: "Ч. 2 ст. 191: 780. 5000 - 100 - 780 = 4120. 12 % = 494,40." },
    fecha: "2026-10-31",
    entrada: {"dokhod": 5000, "rabotodatel": "prochie", "vychetTip": "lgotnyy"},
    esperado: {"nalog": 494.4},
  },
  {
    nombre: "Доход ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Доход должен быть больше нуля." },
    fecha: "2026-10-31",
    entrada: {"dokhod": 0, "rabotodatel": "prochie", "vychetTip": "obychnyy"},
    esperaError: true,
  },
]);
