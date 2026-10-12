import { definirCasos } from "@/motor/calculo";
import finiquitoAtrasado from "./finiquito-atrasado";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(finiquitoAtrasado, [
  {
    nombre: "Dentro del plazo de 15 días",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Retiro 01/10/2026: el plazo vence el 16/10/2026. Al 12/10 no hay multa." },
    fecha: "2026-10-12",
    entrada: { monto: 20000, retiro: "2026-10-01", ufvInicial: null },
    esperado: { limite: "2026-10-16", multa: 0, mantenimiento: 0, total: 20000 },
  },
  {
    nombre: "Plazo vencido, con UFV",
    origen: {
      tipo: "recalculado",
      url: GUIA,
      detalle: "Retiro 01/09/2026, vence 16/09/2026. Multa 30 % de 20.000 = 6.000. UFV 16/09 3,34497 y 12/10 3,35681: 20.000 × (3,35681 / 3,34497 − 1) = 70,79. Total 26.070,79.",
    },
    fecha: "2026-10-12",
    entrada: { monto: 20000, retiro: "2026-09-01", ufvInicial: 3.34497 },
    esperado: { limite: "2026-09-16", multa: 6000, ufvHoy: 3.35681, mantenimiento: 70.79, total: 26070.79 },
  },
  {
    nombre: "Plazo vencido, sin UFV",
    origen: { tipo: "recalculado", detalle: "Solo la multa del 30 %: 10.000 + 3.000." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, retiro: "2026-09-01", ufvInicial: null },
    esperado: { multa: 3000, mantenimiento: 0, total: 13000 },
  },
]);
