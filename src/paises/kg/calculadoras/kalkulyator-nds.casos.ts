import { definirCasos } from "@/motor/calculo";
import kalkulyatorNds from "./kalkulyator-nds";

const NK = "https://cbd.minjust.gov.kg/112340/edition/57656/ru";

export default definirCasos(kalkulyatorNds, [
  {
    nombre: "Начислить НДС на 100 000 сомов",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 254: ставка 12 %. 100 000 × 12 % = 12 000, с НДС 112 000." },
    fecha: "2026-10-27",
    entrada: { summa: 100000, napravlenie: "nachislit" },
    esperado: { nds: 12000, bezNds: 100000, sNds: 112000, stavka: 12 },
  },
  {
    nombre: "Выделить НДС из 56 000 сомов",
    origen: { tipo: "recalculado", url: NK, detalle: "56 000 / 1,12 = 50 000; НДС 6000." },
    fecha: "2026-10-27",
    entrada: { summa: 56000, napravlenie: "vydelit" },
    esperado: { nds: 6000, bezNds: 50000 },
  },
  {
    nombre: "Сумма ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Сумма должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { summa: 0, napravlenie: "nachislit" },
    esperaError: true,
  },
]);
