import { definirCasos } from "@/motor/calculo";
import kalkuliatorAlimentiv from "./kalkuliator-alimentiv";

const SUD = "https://nm.vn.court.gov.ua/sud0217/pres-centr/news/1961187/";

export default definirCasos(kalkuliatorAlimentiv, [
  {
    nombre: "Мінімум 2026 на дитину до 6 років",
    origen: { tipo: "oficial", url: SUD, detalle: "Мінʼюст: з початку 2026 року аліменти на дитину до 6 років не менше 1408,50 грн, від 6 до 18 років не менше 1756 грн." },
    fecha: "2026-10-24",
    entrada: { dokhid: 4000, dityDo6: 1, dity6do18: 0 },
    esperado: { chastka: 1000, minimum: 1408.5, naDo6: 1408.5, razom: 1408.5 },
  },
  {
    nombre: "Одна дитина 6 до 18 років, дохід 20 000 грн",
    origen: { tipo: "recalculado", url: SUD, detalle: "1/4 від 20 000 = 5000 більше за мінімум 1756." },
    fecha: "2026-10-24",
    entrada: { dokhid: 20000, dityDo6: 0, dity6do18: 1 },
    esperado: { razom: 5000, chastkaTekst: "1/4 доходу", minimum: 1756 },
  },
  {
    nombre: "Двоє дітей, дохід 30 000 грн",
    origen: { tipo: "recalculado", url: SUD, detalle: "1/3 від 30 000 = 10 000; по 5000 на дитину." },
    fecha: "2026-10-24",
    entrada: { dokhid: 30000, dityDo6: 1, dity6do18: 1 },
    esperado: { razom: 10000, naDo6: 5000, na6do18: 5000 },
  },
  {
    nombre: "Троє дітей, дохід 9000 грн: мінімум",
    origen: { tipo: "recalculado", url: SUD, detalle: "1/2 від 9000 = 4500, по 1500; мінімум 1408,50 і 1756: разом 1500 + 1756 × 2 = 5012." },
    fecha: "2026-10-24",
    entrada: { dokhid: 9000, dityDo6: 1, dity6do18: 2 },
    esperado: { chastka: 4500, naDo6: 1500, na6do18: 1756, razom: 5012 },
  },
  {
    nombre: "Без дітей",
    origen: { tipo: "recalculado", url: SUD, detalle: "Потрібна щонайменше одна дитина." },
    fecha: "2026-10-24",
    entrada: { dokhid: 10000, dityDo6: 0, dity6do18: 0 },
    esperaError: true,
  },
]);
