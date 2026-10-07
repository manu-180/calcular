import { definirCasos } from "@/motor/calculo";
import utilidades from "./utilidades";

export default definirCasos(utilidades, [
  {
    nombre: "Año completo, 10 personas, 2 de 8 cargas",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 97 del Código del Trabajo. 15 % de 100.000 = 15.000. 10 % (10.000) / 10 personas = 1.000. 5 % (5.000) × 2 cargas / 8 cargas = 1.250. Total 2.250.",
    },
    fecha: "2026-04-01",
    entrada: { utilidad: 100000, trabajadores: 10, cargasTotales: 8, cargas: 2, meses: 12 },
    esperado: { quince: 15000, parteIgual: 1000, parteCargas: 1250, total: 2250 },
  },
  {
    nombre: "Medio año trabajado",
    origen: {
      tipo: "recalculado",
      detalle: "Tiempo total 9 × 12 + 6 = 114. Parte igual 10.000 × 6 / 114 = 526,32. Cargas por tiempo 6 × 12 + 2 × 6 = 84. Parte por cargas 5.000 × 2 × 6 / 84 = 714,29. Total 1.240,61.",
    },
    fecha: "2026-04-01",
    entrada: { utilidad: 100000, trabajadores: 10, cargasTotales: 8, cargas: 2, meses: 6 },
    esperado: { parteIgual: 526.32, parteCargas: 714.29, total: 1240.61 },
  },
  {
    nombre: "Sin cargas en la empresa",
    origen: { tipo: "recalculado", detalle: "Sin cargas no hay reparto por cargas. Parte igual 10.000 / 10 = 1.000." },
    fecha: "2026-04-01",
    entrada: { utilidad: 100000, trabajadores: 10, cargasTotales: 0, cargas: 0, meses: 12 },
    esperado: { parteCargas: 0, total: 1000 },
  },
  {
    nombre: "Más cargas propias que del total",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-04-01",
    entrada: { utilidad: 100000, trabajadores: 10, cargasTotales: 1, cargas: 2, meses: 12 },
    esperaError: true,
  },
]);
