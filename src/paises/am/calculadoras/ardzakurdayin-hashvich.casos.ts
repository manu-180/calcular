import { definirCasos } from "@/motor/calculo";
import ardzakurdayinHashvich from "./ardzakurdayin-hashvich";

const LEY = "https://www.arlis.am/hy/acts/66489/latest";

export default definirCasos(ardzakurdayinHashvich, [
  { nombre: "Հնգօրյա շաբաթ", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 159: 20 օր։ Հոդված 195 մաս 3: 420 000 / 21 = 20 000. Հոդված 169: × 20 = 400 000." }, fecha: "2026-11-01", entrada: { mijin: 420000, shabat: "hing", orer: null }, esperado: { vchar: 400000, orakan: 20000, orer: 20 } },
  { nombre: "Վեցօրյա շաբաթ", origen: { tipo: "oficial", url: LEY, detalle: "24 օր։ 420 000 / 25 = 16 800. × 24 = 403 200." }, fecha: "2026-11-01", entrada: { mijin: 420000, shabat: "vets", orer: null }, esperado: { vchar: 403200, orakan: 16800, orer: 24 } },
  { nombre: "10 օր", origen: { tipo: "oficial", url: LEY, detalle: "20 000 × 10 = 200 000." }, fecha: "2026-11-01", entrada: { mijin: 420000, shabat: "hing", orer: 10 }, esperado: { vchar: 200000 } },
]);
