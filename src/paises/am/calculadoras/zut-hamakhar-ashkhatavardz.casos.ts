import { definirCasos } from "@/motor/calculo";
import zutHamakharAshkhatavardz from "./zut-hamakhar-ashkhatavardz";

export default definirCasos(zutHamakharAshkhatavardz, [
  {
    nombre: "294 200 դրամ զուտ",
    origen: { tipo: "recalculado", detalle: "Հակառակ հաշվարկ: 400 000 - 80 000 - 20 000 - 1000 - 4800 = 294 200." },
    fecha: "2026-11-01",
    entrada: { zut: 294200, kutakayin: true, pahvum: true },
    esperado: { hamakharn: 400000, stacvogh: 294200 },
  },
  {
    nombre: "503 200 դրամ զուտ",
    origen: { tipo: "recalculado", detalle: "700 000 - 140 000 - 45 000 - 1000 - 10 800 = 503 200." },
    fecha: "2026-11-01",
    entrada: { zut: 503200, kutakayin: true, pahvum: true },
    esperado: { hamakharn: 700000, kutakayin: 45000 },
  },
  {
    nombre: "1 486 700 դրամ զուտ",
    origen: { tipo: "recalculado", detalle: "2 000 000 - 400 000 - 87 500 - 15 000 - 10 800 = 1 486 700." },
    fecha: "2026-11-01",
    entrada: { zut: 1486700, kutakayin: true, pahvum: true },
    esperado: { hamakharn: 2000000 },
  },
  {
    nombre: "Առանց կուտակայինի և ապահովագրավճարի",
    origen: { tipo: "recalculado", detalle: "0,8 × 100 000 - 1000 = 79 000." },
    fecha: "2026-11-01",
    entrada: { zut: 79000, kutakayin: false, pahvum: false },
    esperado: { hamakharn: 100000, aha: 0 },
  },
]);
