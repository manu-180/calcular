import { definirCasos } from "@/motor/calculo";
import prumernyVydelek from "./prumerny-vydelek";

const ZP = "https://www.zakonyprolidi.cz/cs/2006-262";

export default definirCasos(prumernyVydelek, [
  {
    nombre: "135 000 Kč za čtvrtletí a 504 hodin",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 356: 135 000 / 504 = 267,86 Kč/h; měsíční 267,86 × 40 × 4,348 = 46 586,21; za den 8 h = 2 142,88." },
    fecha: "2026-10-24",
    entrada: { mzda: 135000, hodiny: 504, tydenni: 40 },
    esperado: { hodinovy: 267.86, mesicni: 46586.21, denni: 2142.88 },
  },
  {
    nombre: "Výdělek pod minimální mzdou",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 357: 60 000 / 504 = 119,05 < 134,40, zvyšuje se na 134,40; měsíční 134,40 × 173,92 = 23 374,85." },
    fecha: "2026-10-24",
    entrada: { mzda: 60000, hodiny: 504, tydenni: 40 },
    esperado: { hodinovy: 134.4, mesicni: 23374.85 },
  },
  {
    nombre: "Třísměnný provoz 37,5 hodiny",
    origen: { tipo: "recalculado", url: ZP, detalle: "90 000 / 480 = 187,50 Kč/h; měsíční 187,50 × 37,5 × 4,348 = 30 571,88." },
    fecha: "2026-10-24",
    entrada: { mzda: 90000, hodiny: 480, tydenni: 37.5 },
    esperado: { hodinovy: 187.5, mesicni: 30571.88 },
  },
  {
    nombre: "Bez odpracovaných hodin",
    origen: { tipo: "recalculado", url: ZP, detalle: "Bez hodin nelze výdělek spočítat." },
    fecha: "2026-10-24",
    entrada: { mzda: 90000, hodiny: 0, tydenni: 40 },
    esperaError: true,
  },
]);
