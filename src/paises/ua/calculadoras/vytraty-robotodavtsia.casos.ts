import { definirCasos } from "@/motor/calculo";
import vytratyRobotodavtsia from "./vytraty-robotodavtsia";

const ESV = "https://zir.tax.gov.ua/docs/stavki/esv.pdf";

export default definirCasos(vytratyRobotodavtsia, [
  {
    nombre: "Один працівник, 25 000 грн",
    origen: { tipo: "recalculado", url: ESV, detalle: "ЄСВ 22 % = 5500; витрати 30 500; ПДФО і ВЗ 5750; до бюджету 11 250; на руки 19 250." },
    fecha: "2026-10-24",
    entrada: { brutto: 25000, pratsivnykiv: 1, osnovne: true },
    esperado: { vytratyMis: 30500, yesv: 5500, podatkyAgent: 5750, doBiudzhetu: 11250, naRuky: 19250, vytratyRik: 366000, chastka: 22 },
  },
  {
    nombre: "Троє працівників на неповному часі по 5000 грн",
    origen: { tipo: "recalculado", url: ESV, detalle: "Основне місце роботи: ЄСВ з мінімальної 8647 × 22 % = 1902,34 на кожного; разом 5707,02; витрати 3 × 6902,34 = 20 707,02." },
    fecha: "2026-10-24",
    entrada: { brutto: 5000, pratsivnykiv: 3, osnovne: true },
    esperado: { yesv: 5707.02, vytratyMis: 20707.02 },
  },
  {
    nombre: "Нульова зарплата",
    origen: { tipo: "recalculado", url: ESV, detalle: "Без зарплати нічого рахувати." },
    fecha: "2026-10-24",
    entrada: { brutto: 0, pratsivnykiv: 1, osnovne: true },
    esperaError: true,
  },
]);
