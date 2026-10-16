import { definirCasos } from "@/motor/calculo";
import kinderzulagenRechner from "./kinderzulagen-rechner";

const FAMZG = "https://www.fedlex.admin.ch/eli/cc/2008/51/de#art_5";

export default definirCasos(kinderzulagenRechner, [
  {
    nombre: "Zwei Kinder und ein Kind in Ausbildung, Minimum",
    origen: { tipo: "recalculado", url: FAMZG, detalle: "2 × 215 + 268 = 698 pro Monat, 8376 pro Jahr (Art. 5 FamZG)." },
    fecha: "2026-10-14",
    entrada: { kinder: 2, inAusbildung: 1, kantonKinder: null, kantonAusbildung: null },
    esperado: { monat: 698, jahr: 8376, kinderzulage: 215, ausbildungszulage: 268 },
  },
  {
    nombre: "Höhere kantonale Ansätze",
    origen: { tipo: "recalculado", url: FAMZG, detalle: "2 × 250 + 300 = 800 pro Monat." },
    fecha: "2026-10-14",
    entrada: { kinder: 2, inAusbildung: 1, kantonKinder: 250, kantonAusbildung: 300 },
    esperado: { monat: 800, jahr: 9600 },
  },
  {
    nombre: "Kantonaler Betrag unter dem Minimum",
    origen: { tipo: "recalculado", url: FAMZG, detalle: "200 liegt unter 215: es gilt 215." },
    fecha: "2026-10-14",
    entrada: { kinder: 1, inAusbildung: 0, kantonKinder: 200, kantonAusbildung: null },
    esperado: { monat: 215 },
  },
]);
