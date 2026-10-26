import { definirCasos } from "@/motor/calculo";
import nahradaMzdyZaDovolenou from "./nahrada-mzdy-za-dovolenou";

const ZP = "https://www.zakonyprolidi.cz/cs/2006-262";

export default definirCasos(nahradaMzdyZaDovolenou, [
  {
    nombre: "Týden dovolené při mzdě 135 000 Kč za čtvrtletí",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 222: průměrný výdělek 135 000 / 504 = 267,86 Kč/h × 40 hodin = 10 714,40 Kč." },
    fecha: "2026-10-24",
    entrada: { mzda: 135000, hodiny: 504, dovolena: 40 },
    esperado: { hodinovy: 267.86, nahrada: 10714.4, zaDen: 2142.88 },
  },
  {
    nombre: "Proplacení 160 hodin při odchodu",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 222 odst. 2 a 3: 267,86 × 160 = 42 857,60 Kč." },
    fecha: "2026-10-24",
    entrada: { mzda: 135000, hodiny: 504, dovolena: 160 },
    esperado: { nahrada: 42857.6 },
  },
  {
    nombre: "Výdělek pod minimální mzdou",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 357: 50 000 / 504 = 99,21 < 134,40; 134,40 × 40 = 5 376 Kč." },
    fecha: "2026-10-24",
    entrada: { mzda: 50000, hodiny: 504, dovolena: 40 },
    esperado: { hodinovy: 134.4, nahrada: 5376 },
  },
  {
    nombre: "Bez hodin dovolené",
    origen: { tipo: "recalculado", url: ZP, detalle: "Bez hodin dovolené není co počítat." },
    fecha: "2026-10-24",
    entrada: { mzda: 135000, hodiny: 504, dovolena: 0 },
    esperaError: true,
  },
]);
