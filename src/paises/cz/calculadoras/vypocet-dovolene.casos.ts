import { definirCasos } from "@/motor/calculo";
import vypocetDovolene from "./vypocet-dovolene";

const ZP = "https://www.zakonyprolidi.cz/cs/2006-262";

export default definirCasos(vypocetDovolene, [
  {
    nombre: "Celý rok, 40 hodin, zákonná výměra",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 212 a § 213: 40 hodin × 4 týdny = 160 hodin, tedy 20 osmihodinových dnů." },
    fecha: "2026-10-24",
    entrada: { vymera: "zakladni", tydnu: 0, tydenni: 40, odpracovano: 52 },
    esperado: { hodiny: 160, dny: 20, vymera: 4 },
  },
  {
    nombre: "Pět týdnů podle smlouvy",
    origen: { tipo: "recalculado", url: ZP, detalle: "40 hodin × 5 týdnů = 200 hodin." },
    fecha: "2026-10-24",
    entrada: { vymera: "zakladni", tydnu: 5, tydenni: 40, odpracovano: 52 },
    esperado: { hodiny: 200, vymera: 5 },
  },
  {
    nombre: "Nástup během roku: 30 odpracovaných týdnů",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 213 odst. 4 a § 216 odst. 5: 160 / 52 × 30 = 92,31 → 93 hodin." },
    fecha: "2026-10-24",
    entrada: { vymera: "zakladni", tydnu: 0, tydenni: 40, odpracovano: 30 },
    esperado: { hodiny: 93 },
  },
  {
    nombre: "Zkrácený úvazek 20 hodin týdně",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 213 odst. 2: 20 × 4 = 80 hodin, při čtyřhodinových směnách 20 dnů." },
    fecha: "2026-10-24",
    entrada: { vymera: "zakladni", tydnu: 0, tydenni: 20, odpracovano: 52 },
    esperado: { hodiny: 80, dny: 20 },
  },
  {
    nombre: "Učitel: 8 týdnů",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 212 odst. 3: 40 × 8 = 320 hodin." },
    fecha: "2026-10-24",
    entrada: { vymera: "pedagog", tydnu: 0, tydenni: 40, odpracovano: 52 },
    esperado: { hodiny: 320 },
  },
  {
    nombre: "Méně než 4 odpracované týdny",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 213 odst. 3: poměrná část vzniká až po 4 týdnech." },
    fecha: "2026-10-24",
    entrada: { vymera: "zakladni", tydnu: 0, tydenni: 40, odpracovano: 3 },
    esperaError: true,
  },
]);
