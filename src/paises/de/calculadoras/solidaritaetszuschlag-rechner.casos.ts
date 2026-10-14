import { definirCasos } from "@/motor/calculo";
import solidaritaetszuschlagRechner from "./solidaritaetszuschlag-rechner";

const SOLZG = "https://www.gesetze-im-internet.de/solzg_1995/__4.html";

export default definirCasos(solidaritaetszuschlagRechner, [
  {
    nombre: "Milderungszone",
    origen: { tipo: "recalculado", url: SOLZG, detalle: "26664: min(5,5 % = 1466,52; 11,9 % × (26664 − 20350) = 751,36)." },
    fecha: "2026-10-14",
    entrada: { steuer: 26664, veranlagung: "einzeln" },
    esperado: { soli: 751.36, freigrenze: 20350, zone: "Milderungszone" },
  },
  {
    nombre: "Voller Satz",
    origen: { tipo: "recalculado", url: SOLZG, detalle: "115529 × 5,5 % = 6354,09." },
    fecha: "2026-10-14",
    entrada: { steuer: 115529, veranlagung: "einzeln" },
    esperado: { soli: 6354.09, zone: "Voller Satz" },
  },
  {
    nombre: "Splitting unter der doppelten Freigrenze",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/solzg_1995/__3.html", detalle: "40000 liegt unter 2 × 20350 = 40700: kein Soli." },
    fecha: "2026-10-14",
    entrada: { steuer: 40000, veranlagung: "zusammen" },
    esperado: { soli: 0, freigrenze: 40700, zone: "Unter der Freigrenze" },
  },
]);
