import { definirCasos } from "@/motor/calculo";
import pensionskasseRechner from "./pensionskasse-rechner";

export default definirCasos(pensionskasseRechner, [
  {
    nombre: "78 000 Franken, 35 Jahre",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1988012000", detalle: "8 % von 78 000 = 6240, je die Hälfte 3120. Schwelle 12 x 1225 = 14 700, Obergrenze 3 x 12 x 2450 = 88 200." },
    fecha: "2026-10-22",
    entrada: { jahreslohn: 78000, alter: 35 },
    esperado: { total: 6240, arbeitnehmer: 3120, arbeitgeber: 3120, monat: 520, schwelle: 14700, obergrenze: 88200 },
  },
  {
    nombre: "Unter der Schwelle",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1988012000", detalle: "12 000 erreicht 14 700 nicht." },
    fecha: "2026-10-22",
    entrada: { jahreslohn: 12000, alter: 35 },
    esperado: { total: 0 },
  },
  {
    nombre: "19 Jahre",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1988012000", detalle: "Altersvorsorge erst ab dem 20. Kalenderjahr." },
    fecha: "2026-10-22",
    entrada: { jahreslohn: 30000, alter: 19 },
    esperado: { total: 0 },
  },
]);
