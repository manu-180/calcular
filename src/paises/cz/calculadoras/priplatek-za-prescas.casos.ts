import { definirCasos } from "@/motor/calculo";
import priplatekZaPrescas from "./priplatek-za-prescas";

const ZP = "https://www.zakonyprolidi.cz/cs/2006-262";

export default definirCasos(priplatekZaPrescas, [
  {
    nombre: "10 hodin přesčasu při 250 Kč za hodinu",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 114: příplatek 25 % průměrného výdělku. 250 × 10 × 25 % = 625; mzda 2 500 + 625 = 3 125." },
    fecha: "2026-10-24",
    entrada: { mzda: 250, vydelek: 250, prescas: 10, noc: 0, vikend: 0, svatek: 0 },
    esperado: { zaPrescas: 625, priplatky: 625, prescasCelkem: 3125 },
  },
  {
    nombre: "Kombinace příplatků",
    origen: {
      tipo: "recalculado",
      url: ZP,
      detalle: "Průměrný výdělek 300 Kč: přesčas 8 h × 25 % = 600; noc 16 h × 10 % = 480 (§ 116); víkend 8 h × 10 % = 240 (§ 118); svátek 8 h × 100 % = 2 400 (§ 115 odst. 2). Celkem 3 720.",
    },
    fecha: "2026-10-24",
    entrada: { mzda: 280, vydelek: 300, prescas: 8, noc: 16, vikend: 8, svatek: 8 },
    esperado: { zaPrescas: 600, zaNoc: 480, zaVikend: 240, zaSvatek: 2400, priplatky: 3720 },
  },
  {
    nombre: "Bez hodin",
    origen: { tipo: "recalculado", url: ZP, detalle: "Bez odpracovaných hodin nejsou příplatky." },
    fecha: "2026-10-24",
    entrada: { mzda: 250, vydelek: 250, prescas: 0, noc: 0, vikend: 0, svatek: 0 },
    esperaError: true,
  },
]);
