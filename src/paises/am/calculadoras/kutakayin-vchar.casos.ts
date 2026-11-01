import { definirCasos } from "@/motor/calculo";
import kutakayinVchar from "./kutakayin-vchar";

export default definirCasos(kutakayinVchar, [
  {
    nombre: "400 000 դրամ",
    origen: { tipo: "recalculado", detalle: "ՀՕ-244-Ն հոդ։ 6 մաս 2: 5% = 20 000. հատկացում 10% = 40 000, պետությունը՝ 20 000." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 400000 },
    esperado: { vchar: 20000, petutyun: 20000, hatkatsum: 40000 },
  },
  {
    nombre: "600 000 դրամ",
    origen: { tipo: "recalculado", detalle: "10% × 600 000 - 25 000 = 35 000. Հատկացում 60 000, պետությունը՝ 25 000." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 600000 },
    esperado: { vchar: 35000, petutyun: 25000, hatkatsum: 60000 },
  },
  {
    nombre: "2 000 000 դրամ՝ առավելագույն շեմ",
    origen: { tipo: "recalculado", detalle: "Շեմ 15 × 75 000 = 1 125 000. 112 500 - 25 000 = 87 500. Հատկացում 112 500." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 2000000 },
    esperado: { vchar: 87500, petutyun: 25000, hatkatsum: 112500, tope: 1125000 },
  },
]);
