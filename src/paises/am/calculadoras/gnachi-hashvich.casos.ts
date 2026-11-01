import { definirCasos } from "@/motor/calculo";
import gnachiHashvich from "./gnachi-hashvich";

const ARMSTAT = "https://www.armstat.am/file/article/cpi_09_2026-eng.pdf";

export default definirCasos(gnachiHashvich, [
  { nombre: "2025 դեկտեմբերից մինչև 2026 սեպտեմբեր", origen: { tipo: "oficial", url: ARMSTAT, detalle: "Table 5: 2026 սեպտեմբեր, 2025 դեկտեմբեր = 100, 102,2. 100 000 × 1,022 = 102 200." }, fecha: "2026-11-01", entrada: { gumar: 100000, sksum: "2025-12-15", verj: "2026-09-01" }, esperado: { arzheq: 102200, tarberutyun: 2200, yndhanur: 2.2 }, tolerancia: 0.5 },
  { nombre: "Ապագա ամիսը կանգնում է վերջին տվյալի վրա", origen: { tipo: "recalculado", detalle: "2026 նոյեմբերի տվյալը չկա։ հաշվարկվում է մինչև սեպտեմբեր." }, fecha: "2026-11-01", entrada: { gumar: 100000, sksum: "2025-12-01", verj: "2026-11-01" }, esperado: { arzheq: 102200 }, tolerancia: 0.5 },
  { nombre: "Շատ վաղ ամիսը սխալ է", origen: { tipo: "recalculado", detalle: "Տվյալները սկսվում են 2018 դեկտեմբերից։" }, fecha: "2026-11-01", entrada: { gumar: 100000, sksum: "2018-11-01", verj: "2026-09-01" }, esperaError: true },
]);
