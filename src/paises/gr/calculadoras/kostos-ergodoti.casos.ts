import { definirCasos } from "@/motor/calculo";
import kostosErgodoti from "./kostos-ergodoti";

const EFKA =
  "https://www.e-efka.gov.gr/sites/default/files/2024-12/%CE%95%CE%93%CE%9A.%2038_2024_%CE%9C%CE%95%CE%99%CE%A9%CE%A3%CE%97%20%CE%91%CE%A3%CE%A6.%20%CE%95%CE%99%CE%A3%CE%A6%CE%9F%CE%A1%CE%A9%CE%9D%20%CE%99%CE%94%CE%99%CE%A9%CE%A4.%20%CE%94%CE%99%CE%9A%CE%91%CE%99%CE%9F%CE%A5%202025%20%28971%CE%A546%CE%9C%CE%91%CE%A0%CE%A3-348%29.pdf";

export default definirCasos(kostosErgodoti, [
  {
    nombre: "1.500 € μικτά, ΚΠΚ 101",
    origen: { tipo: "recalculado", url: EFKA, detalle: "Εργοδότης 1500 × 21,79% = 326,85. Κόστος 1826,85 τον μήνα, × 14 = 25575,90 τον χρόνο." },
    fecha: "2026-10-24",
    entrada: { miktos: 1500, kpk: "101" },
    esperado: { ergodotisMina: 326.85, kostosMina: 1826.85, kostosEtous: 25575.9, synolikesEisfores: 527.4 },
  },
  {
    nombre: "9.000 € μικτά, ΚΠΚ 103: εισφορές μέχρι το όριο",
    origen: { tipo: "recalculado", url: EFKA, detalle: "Βάση 7761,94. Εργοδότης 18,79% = 1458,47. Κόστος 9000 + 1458,47 = 10458,47." },
    fecha: "2026-10-24",
    entrada: { miktos: 9000, kpk: "103" },
    esperado: { ergodotisMina: 1458.47, kostosMina: 10458.47 },
  },
  {
    nombre: "Μισθός μηδέν",
    origen: { tipo: "recalculado", url: EFKA, detalle: "Χωρίς μισθό δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-24",
    entrada: { miktos: 0, kpk: "101" },
    esperaError: true,
  },
]);
