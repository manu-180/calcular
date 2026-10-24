import { definirCasos } from "@/motor/calculo";
import sperrfristRechner from "./sperrfrist-rechner";

export default definirCasos(sperrfristRechner, [
  {
    nombre: "5. Dienstjahr",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "90 Tage ab 01.10.2026: letzter Tag 29.12.2026." },
    fecha: "2026-10-22",
    entrada: { beginn: "2022-03-01", krank: "2026-10-01" },
    esperado: { tage: 90, dienstjahr: 5, ende: "2026-12-29" },
  },
  {
    nombre: "1. Dienstjahr",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "30 Tage ab 01.06.2026: 30.06.2026." },
    fecha: "2026-10-22",
    entrada: { beginn: "2026-01-01", krank: "2026-06-01" },
    esperado: { tage: 30, ende: "2026-06-30" },
  },
  {
    nombre: "9. Dienstjahr",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "180 Tage ab 01.03.2026: 27.08.2026." },
    fecha: "2026-10-22",
    entrada: { beginn: "2018-01-01", krank: "2026-03-01" },
    esperado: { tage: 180, ende: "2026-08-27" },
  },
]);
