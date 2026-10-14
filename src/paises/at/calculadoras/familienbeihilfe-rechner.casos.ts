import { definirCasos } from "@/motor/calculo";
import familienbeihilfeRechner from "./familienbeihilfe-rechner";

const BKA = "https://www.bundeskanzleramt.gv.at/agenda/familie/familienbeihilfe/basisinformation-zur-familienbeihilfe/familienbeihilfenbetraege.html";

export default definirCasos(familienbeihilfeRechner, [
  {
    nombre: "Zwei Kinder, 1 und 5 Jahre",
    origen: { tipo: "recalculado", url: BKA, detalle: "138,40 + 148,00 + 2 × 8,60 Geschwisterstaffel = 303,60; Kinderabsetzbetrag 2 × 70,90 = 141,80; zusammen 445,40 im Monat, 5.344,80 im Jahr." },
    fecha: "2026-10-14",
    entrada: { unter3: 1, ab3: 1, ab10: 0, ab19: 0, behinderung: 0, schulkinder: 0 },
    esperado: { familienbeihilfe: 303.6, geschwister: 17.2, kinderabsetzbetrag: 141.8, monatlich: 445.4, jaehrlich: 5344.8 },
  },
  {
    nombre: "Drei Kinder mit Schulstartgeld",
    origen: { tipo: "recalculado", url: BKA, detalle: "148 + 148 + 171,80 + 3 × 21,10 = 531,10; Kinderabsetzbetrag 212,70; 743,80 im Monat; Schulstartgeld 2 × 121,40 = 242,80; im Jahr 9.168,40." },
    fecha: "2026-10-14",
    entrada: { unter3: 0, ab3: 2, ab10: 1, ab19: 0, behinderung: 0, schulkinder: 2 },
    esperado: { familienbeihilfe: 531.1, monatlich: 743.8, schulstartgeld: 242.8, jaehrlich: 9168.4 },
  },
  {
    nombre: "Ein Kind mit erheblicher Behinderung",
    origen: { tipo: "recalculado", url: BKA, detalle: "171,80 + 189,20 Zuschlag = 361,00; plus Kinderabsetzbetrag 70,90 = 431,90." },
    fecha: "2026-10-14",
    entrada: { unter3: 0, ab3: 0, ab10: 1, ab19: 0, behinderung: 1, schulkinder: 0 },
    esperado: { familienbeihilfe: 361, monatlich: 431.9 },
  },
  {
    nombre: "Acht Kinder: höchste Geschwisterstaffel",
    origen: { tipo: "recalculado", url: BKA, detalle: "Ab sieben Kindern 63,10 je Kind: 8 × 148 + 8 × 63,10 = 1.688,80." },
    fecha: "2026-10-14",
    entrada: { unter3: 0, ab3: 8, ab10: 0, ab19: 0, behinderung: 0, schulkinder: 0 },
    esperado: { familienbeihilfe: 1688.8 },
  },
]);
