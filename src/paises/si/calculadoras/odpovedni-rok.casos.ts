import { definirCasos } from "@/motor/calculo";
import calc from "./odpovedni-rok";

export default definirCasos(calc, [
  { nombre: "Pet let, poslovni razlog", origen: { tipo: "recalculado", detalle: "30 + 3 × 2 = 36" }, fecha: "2026-10-31", entrada: { razlog: "delodajalec", leta: 5 }, esperado: { dni: 36 } },
  { nombre: "Dvajset let: omejitev", origen: { tipo: "recalculado", detalle: "30 + 18 × 2 = 66, največ 60" }, fecha: "2026-10-31", entrada: { razlog: "delodajalec", leta: 20 }, esperado: { dni: 60 } },
  { nombre: "Več kot 25 let", origen: { tipo: "recalculado", detalle: "94. člen ZDR-1: 80 dni" }, fecha: "2026-10-31", entrada: { razlog: "delodajalec", leta: 26 }, esperado: { dni: 80 } },
  { nombre: "Delavec po treh letih", origen: { tipo: "recalculado", detalle: "94. člen ZDR-1: 30 dni" }, fecha: "2026-10-31", entrada: { razlog: "delavec", leta: 3 }, esperado: { dni: 30 } },
  { nombre: "Poskusno delo", origen: { tipo: "recalculado", detalle: "7 dni" }, fecha: "2026-10-31", entrada: { razlog: "poskusno", leta: 0 }, esperado: { dni: 7 } },
]);
