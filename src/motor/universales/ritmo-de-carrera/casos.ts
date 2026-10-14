import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "10K en 50 minutos",
    detalle: "3000 s ÷ 10 km = 300 s = 5:00 por km; 10 ÷ (3000 ÷ 3600) = 12 km/h.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { calcular: "ritmo", distancia: "10k", distanciaOtra: null, horas: 0, minutos: 50, segundos: 0, ritmoMin: null, ritmoSeg: null },
    esperado: { ritmo: "5:00", ritmoSegundos: 300, velocidad: 12, tiempo: "0:50:00" },
  },
  {
    nombre: "Media maratón a 5:30 por km",
    detalle: "330 s × 21,0975 km = 6962,2 s = 1:56:02.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { calcular: "tiempo", distancia: "media", distanciaOtra: null, horas: null, minutos: null, segundos: null, ritmoMin: 5, ritmoSeg: 30 },
    esperado: { tiempo: "1:56:02", segundosTotales: 6962, distanciaRes: 21.1 },
  },
  {
    nombre: "Distancia con 1 hora a 6:00 por km",
    detalle: "3600 s ÷ 360 s por km = 10 km; 10 km/h.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { calcular: "distancia", distancia: "otra", distanciaOtra: null, horas: 1, minutos: 0, segundos: 0, ritmoMin: 6, ritmoSeg: 0 },
    esperado: { distanciaRes: 10, velocidad: 10 },
  },
  {
    nombre: "3 millas en 27 minutos",
    detalle: "1620 s ÷ 3 mi = 540 s = 9:00 por milla; 3 ÷ 0,45 h = 6,67 mph.",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: { calcular: "ritmo", distancia: "otra", distanciaOtra: 3, horas: 0, minutos: 27, segundos: 0, ritmoMin: null, ritmoSeg: null },
    esperado: { ritmo: "9:00", velocidad: 6.67 },
  },
  {
    nombre: "5K en millas a 8:00",
    detalle: "5 km = 3,1069 mi; 480 s × 3,1069 = 1491,3 s = 0:24:51.",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: { calcular: "tiempo", distancia: "5k", distanciaOtra: null, horas: null, minutos: null, segundos: null, ritmoMin: 8, ritmoSeg: 0 },
    esperado: { tiempo: "0:24:51", distanciaRes: 3.11 },
  },
  {
    nombre: "Ritmo sin distancia es un error",
    detalle: "Con «Otra distancia» vacía no hay por qué dividir el tiempo.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { calcular: "ritmo", distancia: "otra", distanciaOtra: null, horas: 0, minutos: 30, segundos: 0, ritmoMin: null, ritmoSeg: null },
    esperaError: true,
  },
];
