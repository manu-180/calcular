import { definirCasos } from "@/motor/calculo";
import calc from "./izchislyavane-na-bolnichni";

const KSO = "https://www.noi.bg/wp-content/uploads/KCO-7.pdf";

export default definirCasos(calc, [
  {
    nombre: "10 работни дни при 1500 евро: важи таванът на нетото",
    origen: { tipo: "recalculado", url: KSO, detalle: "Работодател: 71,4286 × 70 % = 50,00 × 2 = 100,00. НОИ: 80 % = 57,14, нето 1163,97 / 21 = 55,43; по-малкото × 8 = 443,44. Общо 543,44." },
    fecha: "2026-10-31",
    entrada: { dohod: 1500, dniMesets: 21, dni: 10, stazh: true },
    esperado: { firma: 100, noiDen: 55.43, noi: 443.44, obshto: 543.44 },
  },
  {
    nombre: "Един ден: само работодателят",
    origen: { tipo: "recalculado", url: KSO, detalle: "Чл. 40, ал. 5: 1 ден × 50,00; НОИ не плаща." },
    fecha: "2026-10-31",
    entrada: { dohod: 1500, dniMesets: 21, dni: 1, stazh: true },
    esperado: { firma: 50, noi: 0, obshto: 50 },
  },
  {
    nombre: "Без стаж: няма обезщетение от НОИ",
    origen: { tipo: "recalculado", url: KSO, detalle: "Чл. 40, ал. 1: нужни са 6 месеца стаж." },
    fecha: "2026-10-31",
    entrada: { dohod: 1500, dniMesets: 21, dni: 10, stazh: false },
    esperado: { noi: 0, dniNoi: 0 },
  },
]);
