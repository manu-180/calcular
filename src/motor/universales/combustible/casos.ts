import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "300 km ida y vuelta a 8 L/100 km",
    detalle: "600 km × 8 ÷ 100 = 48 L; 48 × 1,50 = 72; entre 2 = 36; 72 ÷ 600 = 0,12 por km.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { distancia: 300, idaYVuelta: true, tipoConsumo: "l100", consumo: 8, precio: 1.5, personas: 2 },
    esperado: { combustible: 48, costo: 72, porPersona: 36, distanciaTotal: 600, costoPorDistancia: 0.12 },
  },
  {
    nombre: "200 km a 12 km por litro",
    detalle: "200 ÷ 12 = 16,67 L; 16,667 × 1000 = 16.666,67.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { distancia: 200, idaYVuelta: false, tipoConsumo: "kml", consumo: 12, precio: 1000, personas: 1 },
    esperado: { combustible: 16.67, costo: 16666.67, porPersona: 16666.67 },
  },
  {
    nombre: "150 millas a 30 mpg",
    detalle: "150 ÷ 30 = 5 galones; 5 × 3,50 = 17,50.",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: { distancia: 150, idaYVuelta: false, consumo: 30, precio: 3.5, personas: 1 },
    esperado: { combustible: 5, costo: 17.5 },
  },
  {
    nombre: "Consumo cero es un error",
    detalle: "Un consumo de 0 no permite calcular los litros.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { distancia: 100, idaYVuelta: false, tipoConsumo: "kml", consumo: 0, precio: 1, personas: 1 },
    esperaError: true,
  },
];
