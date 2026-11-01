import { definirCasos } from "@/motor/calculo";
import vardzakalutyanHark from "./vardzakalutyan-hark";

const LEY = "https://www.arlis.am/hy/acts/123521/latest";

export default definirCasos(vardzakalutyanHark, [
  { nombre: "300 000 դրամ ամսական", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 150 մաս 7: 3 600 000 × 10% = 360 000." }, fecha: "2026-11-01", entrada: { amsakan: 300000 }, esperado: { tarekanHark: 360000, amsakanHark: 30000, lrats: 0, zut: 3240000 } },
  { nombre: "6 000 000 դրամ ամսական", origen: { tipo: "oficial", url: LEY, detalle: "72 000 000 × 10% = 7 200 000. (72 000 000 - 60 000 000) × 10% = 1 200 000." }, fecha: "2026-11-01", entrada: { amsakan: 6000000 }, esperado: { himan: 7200000, lrats: 1200000, tarekanHark: 8400000, amsakanHark: 700000 } },
]);
