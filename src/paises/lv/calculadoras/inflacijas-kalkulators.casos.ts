import { definirCasos } from "@/motor/calculo";
import inflacija from "./inflacijas-kalkulators";

const U = "https://data.stat.gov.lv/api/v1/lv/OSP_PUB/START/VEK/PC/PCI/PCI030m";

export default definirCasos(inflacija, [
  {
    nombre: "Gada izmaiņa no 2025-09 līdz 2026-09",
    origen: { tipo: "recalculado", url: U, detalle: "CSP indekss 2025-09 = 28840, 2026-09 = 29751. 1000 × 29751 / 28840 = 1031,59." },
    fecha: "2026-11-01",
    entrada: { summa: 1000, no: "2025-09-15", lidz: "2026-09-30" },
    esperado: { tagad: 1031.59, starpiba: 31.59 },
  },
  {
    nombre: "Beigas pēc jaunākajiem datiem: aprēķins beidzas ar pēdējo mēnesi",
    origen: { tipo: "recalculado", url: U, detalle: "Rezultāts tāds pats kā līdz 2026-09." },
    fecha: "2026-11-01",
    entrada: { summa: 1000, no: "2025-09-01", lidz: "2026-11-01" },
    esperado: { tagad: 1031.59 },
  },
  {
    nombre: "Sākums pēc beigām",
    origen: { tipo: "recalculado", url: U, detalle: "Sākuma mēnesim jābūt agrākam par beigu mēnesi." },
    fecha: "2026-11-01",
    entrada: { summa: 100, no: "2026-05-01", lidz: "2026-01-01" },
    esperaError: true,
  },
]);
