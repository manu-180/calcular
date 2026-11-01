import { definirCasos } from "@/motor/calculo";
import km from "./kaibemaksu-kalkulaator";

const KMS = "https://www.riigiteataja.ee/akt/KMS";

export default definirCasos(km, [
  { nombre: "Lisa 24%", origen: { tipo: "recalculado", url: KMS, detalle: "§ 15 lg 1: 100 × 24% = 24." }, fecha: "2026-10-15", entrada: { suund: "lisa", summa: 100, maar: "tavamaar" }, esperado: { kaibemaks: 24, koos: 124 } },
  { nombre: "Eemalda 24%", origen: { tipo: "recalculado", url: KMS, detalle: "124 / 1,24 = 100." }, fecha: "2026-10-15", entrada: { suund: "eemalda", summa: 124, maar: "tavamaar" }, esperado: { kaibemaks: 24, ilma: 100 } },
  { nombre: "Majutus 13%", origen: { tipo: "recalculado", url: KMS, detalle: "§ 15 lg 11: 200 × 13% = 26." }, fecha: "2026-10-15", entrada: { suund: "lisa", summa: 200, maar: "majutus" }, esperado: { kaibemaks: 26, koos: 226 } },
  { nombre: "Raamat 9%", origen: { tipo: "recalculado", url: KMS, detalle: "§ 15 lg 2: 21,80 / 1,09 = 20." }, fecha: "2026-10-15", entrada: { suund: "eemalda", summa: 21.8, maar: "vahendatud" }, esperado: { kaibemaks: 1.8, ilma: 20 } },
]);
