import { definirCasos } from "@/motor/calculo";
import gastosDeducibles from "./gastos-deducibles";

const sinGastos = { restaurantes: null, medicos: null, servicios: null, alquiler: null, essaludHogar: null } as const;

export default definirCasos(gastosDeducibles, [
  {
    nombre: "Ingresos de S/ 70,900 con alquiler y restaurantes (2026)",
    origen: {
      tipo: "recalculado",
      detalle:
        "SUNAT, gastos deducibles 2026: alquiler 12,000 × 30 % = 3,600; restaurantes 8,000 × 15 % = 1,200; suma 4,800 (tope 3 UIT = 16,500). Base 70,900 − 38,500 = 32,400: impuesto 27,500 × 8 % + 4,900 × 14 % = 2,886. Con deducción, base 27,600: 2,200 + 100 × 14 % = 2,214. Ahorro 672.",
    },
    fecha: "2026-10-12",
    entrada: { ...sinGastos, ingresos: 70900, alquiler: 12000, restaurantes: 8000 },
    esperado: { alquiler: 3600, restaurantes: 1200, suma: 4800, deduccion: 4800, impuestoSin: 2886, impuestoCon: 2214, ahorro: 672 },
  },
  {
    nombre: "Gastos por encima del tope de 3 UIT",
    origen: {
      tipo: "recalculado",
      detalle: "Alquiler 40,000 × 30 % = 12,000; médicos 20,000 × 30 % = 6,000; suma 18,000 > tope 16,500. Ingresos 150,000: base 111,500. Sin: 2,200 + 82,500 × 14 % + 1,500 × 17 % = 2,200 + 11,550 + 255 = 14,005. Con base 95,000: 2,200 + 67,500 × 14 % = 11,650. Ahorro 2,355.",
    },
    fecha: "2026-10-12",
    entrada: { ...sinGastos, ingresos: 150000, alquiler: 40000, medicos: 20000 },
    esperado: { suma: 18000, tope: 16500, deduccion: 16500, impuestoSin: 14005, impuestoCon: 11650, ahorro: 2355 },
  },
  {
    nombre: "Ingresos de hasta 7 UIT: no hay impuesto",
    origen: { tipo: "recalculado", detalle: "Ingresos 36,000 < 38,500: base 0, el ahorro es 0 aunque el EsSalud del hogar se deduzca al 100 %." },
    fecha: "2026-10-12",
    entrada: { ...sinGastos, ingresos: 36000, essaludHogar: 1328.4 },
    esperado: { essaludHogar: 1328.4, impuestoSin: 0, ahorro: 0 },
  },
]);
