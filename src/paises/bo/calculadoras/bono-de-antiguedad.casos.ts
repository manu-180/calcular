import { definirCasos } from "@/motor/calculo";
import bonoDeAntiguedad from "./bono-de-antiguedad";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(bonoDeAntiguedad, [
  {
    nombre: "Diez años en una empresa productiva",
    origen: { tipo: "recalculado", url: GUIA, detalle: "D.S. 21060 art. 60: de 8 a 10 años, 18 %. Base 3 × 3.300 = 9.900 (D.S. 23474 y D.S. 5516). 9.900 × 18 % = 1.782." },
    fecha: "2026-10-07",
    entrada: { ingreso: "2016-05-10", empleador: "productiva" },
    esperado: { anios: 10, tasa: 18, base: 9900, bono: 1782 },
  },
  {
    nombre: "Diez años con base de un salario mínimo",
    origen: { tipo: "recalculado", url: GUIA, detalle: "18 % de 3.300 = 594." },
    fecha: "2026-10-07",
    entrada: { ingreso: "2016-05-10", empleador: "general" },
    esperado: { base: 3300, bono: 594 },
  },
  {
    nombre: "El día que cumple 2 años",
    origen: { tipo: "recalculado", detalle: "Ingreso 7/10/2024: el 7/10/2026 cumple 2 años y pasa al 5 %: 9.900 × 5 % = 495." },
    fecha: "2026-10-07",
    entrada: { ingreso: "2024-10-07", empleador: "productiva" },
    esperado: { anios: 2, tasa: 5, bono: 495 },
  },
  {
    nombre: "Un día antes de los 2 años",
    origen: { tipo: "recalculado", detalle: "Ingreso 8/10/2024: el 7/10/2026 tiene 1 año cumplido, sin bono." },
    fecha: "2026-10-07",
    entrada: { ingreso: "2024-10-08", empleador: "productiva" },
    esperado: { anios: 1, tasa: 0, bono: 0 },
  },
  {
    nombre: "Veinticinco años o más",
    origen: { tipo: "recalculado", detalle: "De 25 años adelante, 50 %: 9.900 × 50 % = 4.950." },
    fecha: "2026-10-07",
    entrada: { ingreso: "2000-01-15", empleador: "productiva" },
    esperado: { anios: 26, tasa: 50, bono: 4950 },
  },
  {
    nombre: "Con el salario mínimo de 2025",
    origen: { tipo: "recalculado", url: "https://www.impuestos.gob.bo/wp-content/uploads/2025/09/DS-5383.pdf", detalle: "Salario mínimo 2025: 2.750 (D.S. 5383). 3 × 2.750 = 8.250; 18 % = 1.485." },
    fecha: "2025-06-01",
    entrada: { ingreso: "2015-03-01", empleador: "productiva" },
    esperado: { anios: 10, base: 8250, bono: 1485 },
  },
]);
