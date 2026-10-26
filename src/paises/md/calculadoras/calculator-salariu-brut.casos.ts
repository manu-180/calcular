import { definirCasos } from "@/motor/calculo";
import calculatorSalariuBrut from "./calculator-salariu-brut";

const SFS = "https://dataset.gov.md/dataset/38ec2750-8671-4faa-833d-3041baae0a18/resource/7fcde90e-cac2-4a3e-b0f8-758607dd2205/download/anul-2026-1.pdf";

export default definirCasos(calculatorSalariuBrut, [
  {
    nombre: "Net 12.309 lei cu scutirea personală",
    origen: { tipo: "recalculado", url: SFS, detalle: "(12.309 − 12 % × 2.475) / (0,91 × 0,88) = 15.000; la 15.000 brut netul este 12.309." },
    fecha: "2026-10-26",
    entrada: { net: 12309, scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 },
    esperado: { brut: 15000, net: 12309, cost: 18600 },
  },
  {
    nombre: "Netul salariului minim",
    origen: { tipo: "recalculado", url: SFS, detalle: "La 6.300 de lei brut netul este 5.342,04; drumul invers dă tot 6.300." },
    fecha: "2026-10-26",
    entrada: { net: 5342.04, scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 },
    esperado: { brut: 6300 },
  },
  {
    nombre: "Net 28.028 lei: peste plafon, fără scutire",
    origen: { tipo: "recalculado", url: SFS, detalle: "Cu scutire ar ieși 34.629 brut, adică 415.549 pe an, peste 360.000. Fără scutire: 28.028 / 0,8008 = 35.000." },
    fecha: "2026-10-26",
    entrada: { net: 28028, scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 },
    esperado: { brut: 35000, impozit: 3822 },
  },
  {
    nombre: "Net zero",
    origen: { tipo: "recalculado", url: SFS, detalle: "Fără net nu există calcul." },
    fecha: "2026-10-26",
    entrada: { net: 0, scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 },
    esperaError: true,
  },
]);
