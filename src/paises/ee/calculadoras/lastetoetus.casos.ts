import { definirCasos } from "@/motor/calculo";
import lastetoetus from "./lastetoetus";

const PHS = "https://www.riigiteataja.ee/akt/PHS";

export default definirCasos(lastetoetus, [
  { nombre: "Kaks last", origen: { tipo: "recalculado", url: PHS, detalle: "§ 17 lg 3: 2 × 80 = 160." }, fecha: "2026-10-15", entrada: { lapsed: 2, vastsundinud: 0 }, esperado: { kuus: 160, lasterikas: 0 } },
  { nombre: "Kolm last", origen: { tipo: "recalculado", url: PHS, detalle: "§ 17 ja § 21: 80 + 80 + 100 + 450 = 710." }, fecha: "2026-10-15", entrada: { lapsed: 3, vastsundinud: 0 }, esperado: { kuus: 710, lasterikas: 450, aastas: 8520 } },
  { nombre: "Seitse last", origen: { tipo: "recalculado", url: PHS, detalle: "§ 17 ja § 21: 160 + 500 + 650 = 1310." }, fecha: "2026-10-15", entrada: { lapsed: 7, vastsundinud: 0 }, esperado: { kuus: 1310, lasterikas: 650 } },
  { nombre: "Kolmikud", origen: { tipo: "recalculado", url: PHS, detalle: "§ 22 lg 5: 3 × 1000 = 3000." }, fecha: "2026-10-15", entrada: { lapsed: 3, vastsundinud: 3 }, esperado: { sunnitoetus: 3000 } },
  { nombre: "Üks vastsündinu", origen: { tipo: "recalculado", url: PHS, detalle: "§ 22 lg 4: 320." }, fecha: "2026-10-15", entrada: { lapsed: 1, vastsundinud: 1 }, esperado: { sunnitoetus: 320, kuus: 80 } },
]);
