import { definirCasos } from "@/motor/calculo";
import ashkhatavardziHashvich from "./ashkhatavardzi-hashvich";

export default definirCasos(ashkhatavardziHashvich, [
  {
    nombre: "400 000 դրամ՝ 2026 թվականին",
    origen: { tipo: "recalculado", detalle: "ՀՕ-165-Ն հոդ։ 150, 20% = 80 000; ՀՕ-244-Ն հոդ։ 6, 5% = 20 000; ՀՕ-245-Ն հոդ։ 12 = 1000; ՀՕ-459-Ն հոդ։ 46 մաս 9 = 4800. 400 000 - 105 800 = 294 200." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 400000, kutakayin: true, pahvum: true },
    esperado: { zut: 294200, yekamtayin: 80000, kutakayin: 20000, drosh: 1000, aha: 4800, pahumner: 105800 },
  },
  {
    nombre: "700 000 դրամ՝ շեմից բարձր",
    origen: { tipo: "recalculado", detalle: "140 000 + (10% × 700 000 - 25 000 = 45 000) + 1000 + 10 800 = 196 800. Զուտ 503 200." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 700000, kutakayin: true, pahvum: true },
    esperado: { zut: 503200, kutakayin: 45000, aha: 10800 },
  },
  {
    nombre: "2 000 000 դրամ՝ կուտակային վճարի առավելագույնը",
    origen: { tipo: "recalculado", detalle: "Առավելագույն շեմ 15 × 75 000 = 1 125 000. 10% - 25 000 = 87 500. 400 000 + 87 500 + 15 000 + 10 800 = 513 300." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 2000000, kutakayin: true, pahvum: true },
    esperado: { zut: 1486700, kutakayin: 87500, drosh: 15000 },
  },
  {
    nombre: "150 000 դրամ՝ 2026 և 2027",
    origen: { tipo: "recalculado", detalle: "2026: 30 000 + 7500 + 1000 = 38 500. Զուտ 111 500." },
    fecha: "2026-12-31",
    entrada: { ashkhatavardz: 150000, kutakayin: true, pahvum: true },
    esperado: { zut: 111500, aha: 0 },
  },
  {
    nombre: "150 000 դրամ՝ 2027 թվականի հունվարից",
    origen: { tipo: "recalculado", detalle: "ՀՕ-459-Ն հոդ։ 45 մաս 1 կետ 6: 2027-ից 10 800 դրամ։ 38 500 + 10 800 = 49 300. Զուտ 100 700." },
    fecha: "2027-01-01",
    entrada: { ashkhatavardz: 150000, kutakayin: true, pahvum: true },
    esperado: { zut: 100700, aha: 10800 },
  },
  {
    nombre: "1974 թվականից առաջ ծնված աշխատող՝ առանց կուտակայինի",
    origen: { tipo: "recalculado", detalle: "ՀՕ-244-Ն հոդ։ 5: 400 000 - 80 000 - 1000 - 4800 = 314 200." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 400000, kutakayin: false, pahvum: true },
    esperado: { zut: 314200, kutakayin: 0 },
  },
  {
    nombre: "Զրո աշխատավարձը սխալ է",
    origen: { tipo: "recalculado", detalle: "Մուտքի ստուգում։" },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 0, kutakayin: true, pahvum: true },
    esperaError: true,
  },
]);
