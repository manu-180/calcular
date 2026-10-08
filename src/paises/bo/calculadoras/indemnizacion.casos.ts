import { definirCasos } from "@/motor/calculo";
import indemnizacion from "./indemnizacion";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(indemnizacion, [
  {
    nombre: "Ejercicio del Ministerio de Trabajo",
    origen: {
      tipo: "recalculado",
      url: GUIA,
      detalle: "Ejercicio de la Guía del MTEPS con las fechas corridas tres años: 2 años 1 mes 25 días, SPI 3.000. Indemnización 6.000 + 250 + 208,33 = 6.458,33. Desahucio 3 × 3.000 = 9.000.",
    },
    fecha: "2026-09-20",
    entrada: { motivo: "despido", sueldo: 3000, ingreso: "2024-07-21", retiro: "2026-09-15", quinquenios: 0 },
    esperado: { antiguedad: "2 años, 1 mes y 25 días", indemnizacion: 6458.33, desahucio: 9000, total: 15458.33 },
  },
  {
    nombre: "Ejemplo de la guía: 1 año, 1 mes y 3 días",
    origen: { tipo: "oficial", url: GUIA, detalle: "Guía del MTEPS, capítulo XIV: S.P.I. 2.164 × 1 año = 2.164; 2.164 / 12 × 1 mes = 180,33; 2.164 / 360 × 3 días = 18,03. Total 2.362,36." },
    fecha: "2026-05-10",
    entrada: { motivo: "renuncia", sueldo: 2164, ingreso: "2025-04-01", retiro: "2026-05-04", quinquenios: 0 },
    esperado: { antiguedad: "1 año, 1 mes y 3 días", indemnizacion: 2362.36, desahucio: 0, total: 2362.36 },
  },
  {
    nombre: "Diez años con dos quinquenios cobrados",
    origen: { tipo: "recalculado", detalle: "10 años y 2 meses justos; dos quinquenios ya pagaron los 10 años. Queda 5.000 / 12 × 2 = 833,33 de indemnización y 15.000 de desahucio." },
    fecha: "2026-10-07",
    entrada: { motivo: "despido", sueldo: 5000, ingreso: "2016-08-01", retiro: "2026-10-01", quinquenios: 2 },
    esperado: { indemnizacion: 833.33, desahucio: 15000, total: 15833.33 },
  },
]);
