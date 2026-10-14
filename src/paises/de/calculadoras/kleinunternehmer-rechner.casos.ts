import { definirCasos } from "@/motor/calculo";
import kleinunternehmerRechner from "./kleinunternehmer-rechner";

const USTG19 = "https://www.gesetze-im-internet.de/ustg_1980/__19.html";

export default definirCasos(kleinunternehmerRechner, [
  {
    nombre: "Unter beiden Grenzen",
    origen: { tipo: "recalculado", url: USTG19, detalle: "20000 ≤ 25000 und 30000 ≤ 100000: steuerfrei nach § 19 Absatz 1 UStG." },
    fecha: "2026-10-14",
    entrada: { vorjahr: 20000, laufend: 30000 },
    esperado: { ergebnis: "Ja, Kleinunternehmerregelung möglich", spielraumVorjahr: 5000, spielraumLaufend: 70000, ustBeiRegel: 5700 },
  },
  {
    nombre: "Vorjahr über 25.000 Euro",
    origen: { tipo: "recalculado", url: USTG19, detalle: "26000 > 25000: keine Kleinunternehmerregelung." },
    fecha: "2026-10-14",
    entrada: { vorjahr: 26000, laufend: 20000 },
    esperado: { ergebnis: "Nein, Umsatzsteuer fällt an", spielraumVorjahr: -1000 },
  },
  {
    nombre: "Laufendes Jahr über 100.000 Euro",
    origen: { tipo: "recalculado", url: USTG19, detalle: "120000 > 100000." },
    fecha: "2026-10-14",
    entrada: { vorjahr: 10000, laufend: 120000 },
    esperado: { ergebnis: "Nein, Umsatzsteuer fällt an" },
  },
]);
