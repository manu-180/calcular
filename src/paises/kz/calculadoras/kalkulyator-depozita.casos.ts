import { definirCasos } from "@/motor/calculo";
import kalkulyatorDepozita from "./kalkulyator-depozita";

const KFGD = "https://kdif.kz/ru/what-we-guarantee";

export default definirCasos(kalkulyatorDepozita, [
  {
    nombre: "1 млн тенге на 12 месяцев под 14 % с капитализацией",
    origen: { tipo: "recalculado", url: KFGD, detalle: "1 000 000 × (1 + 0,14/12)^12 = 1 149 342,03. Предел для сберегательного вклада 20 млн." },
    fecha: "2026-10-24",
    entrada: { summa: 1000000, stavka: 14, srok: 12, kapitalizatsiya: true, vid: "sberegatelnyy" },
    esperado: { itogo: 1149342.03, dokhod: 149342.03, garantiya: 1149342.03, negarantirovano: 0, limit: 20000000 },
  },
  {
    nombre: "Без капитализации",
    origen: { tipo: "recalculado", url: KFGD, detalle: "1 000 000 × (1 + 0,14) = 1 140 000." },
    fecha: "2026-10-24",
    entrada: { summa: 1000000, stavka: 14, srok: 12, kapitalizatsiya: false, vid: "nesberegatelnyy" },
    esperado: { itogo: 1140000, limit: 10000000 },
  },
  {
    nombre: "25 млн тенге: часть сверх гарантии",
    origen: { tipo: "recalculado", url: KFGD, detalle: "25 000 000 × 1,15 = 28 750 000; гарантия 20 000 000; не покрыто 8 750 000." },
    fecha: "2026-10-24",
    entrada: { summa: 25000000, stavka: 15, srok: 12, kapitalizatsiya: false, vid: "sberegatelnyy" },
    esperado: { itogo: 28750000, garantiya: 20000000, negarantirovano: 8750000 },
  },
]);
