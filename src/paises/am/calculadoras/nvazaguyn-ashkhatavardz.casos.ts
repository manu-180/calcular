import { definirCasos } from "@/motor/calculo";
import nvazaguynAshkhatavardz from "./nvazaguyn-ashkhatavardz";

const LEY = "https://www.arlis.am/hy/acts/94713/latest";

export default definirCasos(nvazaguynAshkhatavardz, [
  {
    nombre: "40 ժամ՝ կուտակայինով",
    origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 1: 75 000 դրամ։ հոդված 2: 450 դրամ։ հոդված 4-ի համաձայն՝ առանց պահումների։ Հակառակ հաշվարկ: 0,75 × 101 334 - 1000 ≈ 75 000 (2026, առանց ապահովագրավճարի մինչև 200 000)." },
    fecha: "2026-11-01",
    entrada: { shabat: "40", kutakayin: true, im: null },
    esperado: { nvazaguyn: 75000, zham: 450, hamakharn: 101333, tarekan: 900000 },
    tolerancia: 1,
  },
  {
    nombre: "24 ժամ՝ առանց կուտակայինի",
    origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 2: մինչև 24-ժամյա շաբաթ՝ 750 դրամ։ 0,8 × 95 000 - 1000 = 75 000." },
    fecha: "2026-11-01",
    entrada: { shabat: "24", kutakayin: false, im: 70000 },
    esperado: { zham: 750, hamakharn: 95000, tarberutyun: -5000 },
  },
]);
