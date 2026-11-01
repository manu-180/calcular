import { definirCasos } from "@/motor/calculo";
import calc from "./obezshtenie-za-maychinstvo";

const KSO = "https://www.noi.bg/wp-content/uploads/KCO-7.pdf";

export default definirCasos(calc, [
  {
    nombre: "410 дни при 1500 евро",
    origen: { tipo: "recalculado", url: KSO, detalle: "90 % от 71,43 = 64,29; нето 55,43 на ден е по-малко. 410 × 5 / 7 = 293 работни дни; 55,43 × 293 = 16240,99; за месец 55,43 × 21 = 1164,03." },
    fecha: "2026-10-31",
    entrada: { dohod: 1500, dniMesets: 21, kalendarni: 410 },
    esperado: { den: 55.43, rabotniDni: 293, obshto: 16240.99, mesechno: 1164.03, sledTova: 398.81 },
  },
  {
    nombre: "Нисък доход: минимумът е дневната минимална заплата",
    origen: { tipo: "recalculado", url: KSO, detalle: "Чл. 49, ал. 1: не по-малко от минималната дневна заплата 620,20 / 21 = 29,53." },
    fecha: "2026-10-31",
    entrada: { dohod: 400, dniMesets: 21, kalendarni: 30 },
    esperado: { den: 29.53 },
  },
]);
