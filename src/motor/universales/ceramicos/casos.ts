import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "20 m² con piezas de 60 × 60 cm",
    detalle: "Pieza 0,6 × 0,6 = 0,36 m². 20 × 1,10 = 22 m²; 22 ÷ 0,36 = 61,1 → 62 piezas; 62 ÷ 4 = 15,5 → 16 cajas, que cubren 16 × 4 × 0,36 = 23,04 m².",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { superficie: 20, largo: 60, ancho: 60, desperdicio: 10, porCaja: 4 },
    esperado: { piezas: 62, cajas: 16, conDesperdicio: 22, cubre: 23.04 },
  },
  {
    nombre: "150 ft² con piezas de 12 × 12 in",
    detalle: "Pieza 12 × 12 ÷ 144 = 1 ft². 150 × 1,10 = 165 → 165 piezas exactas (sin el error de coma flotante); 165 ÷ 10 → 17 cajas.",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: { superficie: 150, largo: 12, ancho: 12, desperdicio: 10, porCaja: 10 },
    esperado: { piezas: 165, cajas: 17 },
  },
  {
    nombre: "Sin piezas por caja",
    detalle: "10 m², piezas de 30 × 30 (0,09 m²), 0 % de desperdicio: 10 ÷ 0,09 = 111,1 → 112 piezas; sin cajas.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { superficie: 10, largo: 30, ancho: 30, desperdicio: 0, porCaja: null },
    esperado: { piezas: 112, cajas: null, cubre: null },
  },
  {
    nombre: "Pieza sin medida es un error",
    detalle: "Una pieza de 0 cm no cubre nada.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { superficie: 10, largo: 0, ancho: 30, desperdicio: 10, porCaja: null },
    esperaError: true,
  },
];
