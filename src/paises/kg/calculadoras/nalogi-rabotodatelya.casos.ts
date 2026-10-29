import { definirCasos } from "@/motor/calculo";
import nalogiRabotodatelya from "./nalogi-rabotodatelya";

const ZAKON = "https://cbd.minjust.gov.kg/4-1330/edition/56528/ru";
const NK = "https://cbd.minjust.gov.kg/112340/edition/57656/ru";

export default definirCasos(nalogiRabotodatelya, [
  {
    nombre: "50 000 сомов в частной компании",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Статья 2-2: 50 000 × 2,25 % = 1125. Расходы 51 125. На руки 40 565, это 79,3 %." },
    fecha: "2026-10-27",
    entrada: { zarplata: 50000, kategoriya: "predprinimatel", srednyaya: null },
    esperado: { vsego: 51125, sfRabotodatel: 1125, doplataPn: 0, nettoRabotnika: 40565, uderzhanoURabotnika: 9435 },
  },
  {
    nombre: "50 000 сомов в банке",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Статья 2: 50 000 × 17,25 % = 8625. Расходы 58 625." },
    fecha: "2026-10-27",
    entrada: { zarplata: 50000, kategoriya: "obshchiy", srednyaya: null },
    esperado: { vsego: 58625, sfRabotodatel: 8625 },
  },
  {
    nombre: "20 000 сомов при средней по району 30 000",
    origen: {
      tipo: "recalculado",
      url: NK,
      detalle: "Взносы не меньше 2,25 % × 30 000 = 675. Облагаемый доход работника 20 000 − 2000 − 650 = 17 350; работодатель доплачивает 10 % × (30 000 − 17 350) = 1265. Расходы 20 000 + 675 + 1265 = 21 940.",
    },
    fecha: "2026-10-27",
    entrada: { zarplata: 20000, kategoriya: "predprinimatel", srednyaya: 30000 },
    esperado: { sfRabotodatel: 675, doplataPn: 1265, vsego: 21940 },
  },
  {
    nombre: "Ноль",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Зарплата должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { zarplata: 0, kategoriya: "predprinimatel", srednyaya: null },
    esperaError: true,
  },
]);
