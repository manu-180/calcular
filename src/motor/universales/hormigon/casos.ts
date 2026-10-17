import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Contrapiso de 4 × 3 m y 10 cm con 5 % de margen",
    detalle: "4 × 3 × 0,10 = 1,2 m³; × 1,05 = 1,26 m³. Cemento 350 × 1,26 = 441 kg → 8,82 → 9 bolsas de 50 kg; arena 0,55 × 1,26 = 0,69 m³; piedra 0,8 × 1,26 = 1,01 m³; agua 180 × 1,26 = 226,8 L.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { largo: 4, ancho: 3, espesor: 10, margen: 5, bolsa: 50 },
    esperado: { volumen: 1.2, volumenTotal: 1.26, cemento: 441, bolsas: 9, arena: 0.69, piedra: 1.01, agua: 226.8, volumenPies: null },
  },
  {
    nombre: "Patio de 10 × 10 ft y 4 in sin margen",
    detalle: "10 × 10 × 4/12 = 33,33 ft³ = 1,23 yd³ = 0,9439 m³. Cemento 350 × 0,9439 ÷ 0,45359 = 728,33 lb → 7,75 → 8 bolsas de 94 lb; arena 18,33 ft³; piedra 26,67 ft³; agua 44,88 gal.",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: { largo: 10, ancho: 10, espesor: 4, margen: 0, bolsa: 94 },
    esperado: { volumenTotal: 1.23, volumenPies: 33.33, cemento: 728.33, bolsas: 8, arena: 18.33, piedra: 26.67, agua: 44.88 },
  },
  {
    nombre: "Espesor cero es un error",
    detalle: "Sin espesor no hay volumen.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: { largo: 4, ancho: 3, espesor: 0, margen: 5, bolsa: 50 },
    esperaError: true,
  },
];
