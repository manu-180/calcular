import { definirCasos } from "@/motor/calculo";
import pagasExtra from "./pagas-extra";

const ET = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430";

export default definirCasos(pagasExtra, [
  {
    nombre: "25.000 euros en 14 pagas, semestre completo",
    origen: { tipo: "recalculado", url: ET, detalle: "25.000 / 14 = 1.785,71 por paga. Prorrateado: 25.000 / 12 = 2.083,33; de eso, 1.785,71 × 2 / 12 = 297,62 son pagas extra." },
    fecha: "2026-10-14",
    entrada: { bruto: 25000, extras: 2, devengo: "semestral", meses: 6 },
    esperado: { paga: 1785.71, proporcional: 1785.71, mensualProrrateado: 2083.33, prorrataMensual: 297.62, pagas: 14 },
  },
  {
    nombre: "Cuatro meses del semestre",
    origen: { tipo: "recalculado", detalle: "1.785,71 × 4 / 6 = 1.190,47." },
    fecha: "2026-10-14",
    entrada: { bruto: 25000, extras: 2, devengo: "semestral", meses: 4 },
    esperado: { proporcional: 1190.47 },
  },
  {
    nombre: "Tres pagas extra con devengo anual",
    origen: { tipo: "recalculado", detalle: "30.000 / 15 = 2.000. Nueve meses de doce: 1.500." },
    fecha: "2026-10-14",
    entrada: { bruto: 30000, extras: 3, devengo: "anual", meses: 9 },
    esperado: { paga: 2000, proporcional: 1500, pagas: 15 },
  },
  {
    nombre: "Menos pagas que el mínimo legal",
    origen: { tipo: "recalculado", url: ET, detalle: "El artículo 31 del Estatuto exige dos." },
    fecha: "2026-10-14",
    entrada: { bruto: 25000, extras: 1, devengo: "semestral", meses: 6 },
    esperaError: true,
  },
]);
