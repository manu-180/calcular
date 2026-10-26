import { definirCasos } from "@/motor/calculo";
import barnbidrag from "./barnbidrag";

const SFB = "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/socialforsakringsbalk-2010110_sfs-2010-110/";

export default definirCasos(barnbidrag, [
  {
    nombre: "Ett barn",
    origen: { tipo: "recalculado", url: SFB, detalle: "15 kap. 3 §: 1 250 kr i månaden. Inget flerbarnstillägg." },
    fecha: "2026-10-24",
    entrada: { barn: 1, delat: false },
    esperado: { summa: 1250, tillagg: 0 },
  },
  {
    nombre: "Två barn, delat mellan föräldrarna",
    origen: { tipo: "recalculado", url: SFB, detalle: "2 × 1 250 + 150 = 2 650 kr. Hälften var: 1 325 kr." },
    fecha: "2026-10-24",
    entrada: { barn: 2, delat: true },
    esperado: { summa: 2650, tillagg: 150, perForalder: 1325 },
  },
  {
    nombre: "Tre barn",
    origen: { tipo: "recalculado", url: SFB, detalle: "15 kap. 8 §: 3 × 1 250 + 150 + 580 = 4 480 kr." },
    fecha: "2026-10-24",
    entrada: { barn: 3, delat: false },
    esperado: { summa: 4480, tillagg: 730 },
  },
  {
    nombre: "Sex barn",
    origen: { tipo: "recalculado", url: SFB, detalle: "6 × 1 250 + 150 + 580 + 1 010 + 1 250 + 1 250 = 11 740 kr." },
    fecha: "2026-10-24",
    entrada: { barn: 6, delat: false },
    esperado: { summa: 11740, tillagg: 4240, perAr: 140880 },
  },
]);
