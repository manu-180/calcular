import { definirCasos } from "@/motor/calculo";
import recargoNocturno from "./recargo-nocturno";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(recargoNocturno, [
  {
    nombre: "Vigilante con el salario mínimo, 40 horas nocturnas",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Guía cap. V: vigilancia y oficinas 25 %. Hora 3.300 / 30 / 8 = 13,75; 13,75 × 25 % × 40 = 137,50." },
    fecha: "2026-10-12",
    entrada: { haberBasico: 3300, horas: 40, tipo: "comercio" },
    esperado: { hora: 13.75, tasa: 25, recargo: 137.5 },
  },
  {
    nombre: "Fábrica, 20 horas nocturnas",
    origen: { tipo: "recalculado", detalle: "Industria 30 %. Hora 5.000 / 240 = 20,8333; × 30 % × 20 = 125." },
    fecha: "2026-10-12",
    entrada: { haberBasico: 5000, horas: 20, tipo: "industria" },
    esperado: { hora: 20.83, tasa: 30, recargo: 125 },
  },
  {
    nombre: "Labor peligrosa de madrugada",
    origen: { tipo: "recalculado", detalle: "D.S. 90: 50 %. Hora 4.800 / 240 = 20; × 50 % × 10 = 100." },
    fecha: "2026-10-12",
    entrada: { haberBasico: 4800, horas: 10, tipo: "nocivo" },
    esperado: { tasa: 50, recargo: 100 },
  },
]);
