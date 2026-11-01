import { definirCasos } from "@/motor/calculo";
import kalkulyatorZarplaty from "./kalkulyator-zarplaty";

const NK = "https://andoz.tj/docs/kodex/TaxKodex.pdf";

export default definirCasos(kalkulyatorZarplaty, [
  {
    nombre: "5000 сомони в частной компании",
    origen: { tipo: "recalculado", url: NK, detalle: "Ст. 332: 2 % = 100. Ст. 191: 5000 - 100 - 156 = 4744. Ст. 183: 12 % = 569,28. На руки 4330,72." },
    fecha: "2026-10-31",
    entrada: {"oklad": 5000, "rabotodatel": "prochie", "vychetTip": "obychnyy"},
    esperado: {"netto": 4330.72, "vznos": 100, "vychet": 156, "baza": 4744, "nalog": 569.28},
  },
  {
    nombre: "Минимальная зарплата 1300 сомони",
    origen: { tipo: "recalculado", url: NK, detalle: "2 % = 26. 1300 - 26 - 156 = 1118. 12 % = 134,16. На руки 1139,84." },
    fecha: "2026-10-31",
    entrada: {"oklad": 1300, "rabotodatel": "prochie", "vychetTip": "obychnyy"},
    esperado: {"netto": 1139.84},
  },
  {
    nombre: "5000 сомони в бюджетном учреждении",
    origen: { tipo: "recalculado", url: NK, detalle: "Ст. 332: 1 % = 50. 5000 - 50 - 156 = 4794. 12 % = 575,28. На руки 4374,72." },
    fecha: "2026-10-31",
    entrada: {"oklad": 5000, "rabotodatel": "gosudarstvennye", "vychetTip": "obychnyy"},
    esperado: {"netto": 4374.72, "vznos": 50},
  },
  {
    nombre: "Льготный вычет в 10 показателей",
    origen: { tipo: "recalculado", url: NK, detalle: "Ч. 2 ст. 191: 780. 5000 - 100 - 780 = 4120. 12 % = 494,40. На руки 4405,60." },
    fecha: "2026-10-31",
    entrada: {"oklad": 5000, "rabotodatel": "prochie", "vychetTip": "lgotnyy"},
    esperado: {"netto": 4405.6, "vychet": 780},
  },
  {
    nombre: "Зарплата меньше вычета",
    origen: { tipo: "recalculado", url: NK, detalle: "100 - 2 = 98, вычет ограничен суммой 98, налог 0." },
    fecha: "2026-10-31",
    entrada: {"oklad": 100, "rabotodatel": "prochie", "vychetTip": "obychnyy"},
    esperado: {"netto": 98, "nalog": 0},
  },
  {
    nombre: "Зарплата ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Зарплата должна быть больше нуля." },
    fecha: "2026-10-31",
    entrada: {"oklad": 0, "rabotodatel": "prochie", "vychetTip": "obychnyy"},
    esperaError: true,
  },
]);
