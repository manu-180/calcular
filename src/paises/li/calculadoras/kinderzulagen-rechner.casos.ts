import { definirCasos } from "@/motor/calculo";
import kinderzulagenRechner from "./kinderzulagen-rechner";

export default definirCasos(kinderzulagenRechner, [
  {
    nombre: "Ein Kind unter 10, eines ab 10",
    origen: { tipo: "recalculado", url: "https://www.ahv.li/leistungen/fak/kinderzulagen", detalle: "310 + 360 = 670." },
    fecha: "2026-10-22",
    entrada: { unter10: 1, ab10: 1, alleinerziehend: false },
    esperado: { monat: 670, jahr: 8040 },
  },
  {
    nombre: "Drei Kinder, alleinerziehend",
    origen: { tipo: "recalculado", url: "https://www.ahv.li/leistungen/fak/kinderzulagen", detalle: "Ab drei Kindern 360 für jedes: 1080; Alleinerziehendenzulage 3 x 120 = 360. Total 1440." },
    fecha: "2026-10-22",
    entrada: { unter10: 2, ab10: 1, alleinerziehend: true },
    esperado: { kinderzulagen: 1080, alleinerziehend: 360, monat: 1440 },
  },
  {
    nombre: "Zwei Kinder unter 10",
    origen: { tipo: "recalculado", url: "https://www.ahv.li/leistungen/fak/kinderzulagen", detalle: "2 x 310 = 620." },
    fecha: "2026-10-22",
    entrada: { unter10: 2, ab10: 0, alleinerziehend: false },
    esperado: { monat: 620 },
  },
]);
