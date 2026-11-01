import { definirCasos } from "@/motor/calculo";
import kalkulyatorNds from "./kalkulyator-nds";

const NK = "https://andoz.tj/docs/kodex/TaxKodex.pdf";

export default definirCasos(kalkulyatorNds, [
  {
    nombre: "Начислить 14 % на 1000 сомони",
    origen: { tipo: "recalculado", url: NK, detalle: "Ч. 4 ст. 397: 14 % до 31.12.2026. 1000 × 14 % = 140." },
    fecha: "2026-10-31",
    entrada: {"summa": 1000, "rezhim": "dobavit", "vid": "obshchaya"},
    esperado: {"nds": 140, "bezNds": 1000, "sNds": 1140, "stavka": 14},
  },
  {
    nombre: "Выделить НДС из 1140 сомони",
    origen: { tipo: "recalculado", url: NK, detalle: "1140 × 100 / 114 = 1000, налог 140." },
    fecha: "2026-10-31",
    entrada: {"summa": 1140, "rezhim": "vydelit", "vid": "obshchaya"},
    esperado: {"nds": 140, "bezNds": 1000},
  },
  {
    nombre: "С 1 января 2027 года ставка 13 %",
    origen: { tipo: "recalculado", url: NK, detalle: "Ч. 4 ст. 397: 13 % с 01.01.2027. 1000 × 13 % = 130." },
    fecha: "2027-01-15",
    entrada: {"summa": 1000, "rezhim": "dobavit", "vid": "obshchaya"},
    esperado: {"nds": 130, "stavka": 13},
  },
  {
    nombre: "Пониженная ставка 7 % для строительных работ",
    origen: { tipo: "recalculado", url: NK, detalle: "П. 2 ч. 1 ст. 264: 1000 × 7 % = 70." },
    fecha: "2026-10-31",
    entrada: {"summa": 1000, "rezhim": "dobavit", "vid": "stroitelstvo"},
    esperado: {"nds": 70, "sNds": 1070},
  },
  {
    nombre: "Пониженная ставка 5 %: выделить из 1050",
    origen: { tipo: "recalculado", url: NK, detalle: "П. 2 ч. 1 ст. 264: 1050 × 100 / 105 = 1000." },
    fecha: "2026-10-31",
    entrada: {"summa": 1050, "rezhim": "vydelit", "vid": "selkhoz"},
    esperado: {"nds": 50, "bezNds": 1000},
  },
  {
    nombre: "Сумма ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Сумма должна быть больше нуля." },
    fecha: "2026-10-31",
    entrada: {"summa": 0, "rezhim": "dobavit", "vid": "obshchaya"},
    esperaError: true,
  },
]);
