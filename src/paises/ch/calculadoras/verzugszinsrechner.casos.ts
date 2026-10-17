import { definirCasos } from "@/motor/calculo";
import verzugszinsrechner from "./verzugszinsrechner";

const OR = "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_104";

export default definirCasos(verzugszinsrechner, [
  {
    nombre: "5000 Franken während 213 Tagen",
    origen: { tipo: "recalculado", url: OR, detalle: "15.3. bis 14.10.2026 = 213 Tage. 5000 × 5 % × 213 / 365 = 145,89 (Art. 104 Abs. 1 OR)." },
    fecha: "2026-10-14",
    entrada: { betrag: 5000, von: "2026-03-15", bis: "2026-10-14", satz: null, basis: "365" },
    esperado: { tage: 213, satz: 5, zins: 145.89, total: 5145.89 },
  },
  {
    nombre: "Mit 360 Zinstagen",
    origen: { tipo: "recalculado", url: OR, detalle: "5000 × 5 % × 213 / 360 = 147,92." },
    fecha: "2026-10-14",
    entrada: { betrag: 5000, von: "2026-03-15", bis: "2026-10-14", satz: null, basis: "360" },
    esperado: { zins: 147.92 },
  },
  {
    nombre: "Höherer vertraglicher Zins",
    origen: { tipo: "recalculado", url: OR, detalle: "8 % vereinbart (Art. 104 Abs. 2 OR): 10 000 × 8 % × 364 / 365 = 797,81." },
    fecha: "2026-10-14",
    entrada: { betrag: 10000, von: "2026-01-01", bis: "2026-12-31", satz: 8, basis: "365" },
    esperado: { tage: 364, satz: 8, zins: 797.81 },
  },
  {
    nombre: "Enddatum vor dem Verzug",
    origen: { tipo: "recalculado", detalle: "Negative Dauer ist nicht möglich." },
    fecha: "2026-10-14",
    entrada: { betrag: 1000, von: "2026-05-01", bis: "2026-04-01", satz: null, basis: "365" },
    esperaError: true,
  },
]);
