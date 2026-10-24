import { definirCasos } from "@/motor/calculo";
import geburtszulageRechner from "./geburtszulage-rechner";

export default definirCasos(geburtszulageRechner, [
  {
    nombre: "Ein Kind",
    origen: { tipo: "recalculado", url: "https://www.ahv.li/leistungen/fak/geburtszulagen", detalle: "2520 Franken." },
    fecha: "2026-10-22",
    entrada: { kinder: 1 },
    esperado: { total: 2520, proKind: 2520 },
  },
  {
    nombre: "Zwillinge",
    origen: { tipo: "recalculado", url: "https://www.ahv.li/leistungen/fak/geburtszulagen", detalle: "Mehrlinge: 2 x 3070 = 6140." },
    fecha: "2026-10-22",
    entrada: { kinder: 2 },
    esperado: { total: 6140, proKind: 3070 },
  },
]);
