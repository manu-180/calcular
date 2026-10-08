import { definirCasos } from "@/motor/calculo";
import isrAsalariados from "./isr-asalariados";

export default definirCasos(isrAsalariados, [
  {
    nombre: "Salario mínimo no agrícola más bonificación: no paga ISR en 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "Renta 12 × (4002.28 + 250) = 51027.36. Deducciones 48000 (Decreto 10-2012 art. 72) + 3024 (Decreto 13-2026 art. 4) + 12 × 193.31 de IGSS = 53343.72. Imponible 0.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 4002.28, bonificaciones: 250, igss: 193.31, meses: 12, planillaIva: 0 },
    esperado: { rentaNeta: 51027.36, deducciones: 53343.72, imponible: 0, anual: 0, mensual: 0 },
  },
  {
    nombre: "Primer tramo del 5 %",
    origen: {
      tipo: "recalculado",
      detalle: "Renta 12 × 20250 = 243000. Deducciones 48000 + 3024 + 12 × 966 = 62616. Imponible 180384 × 5 % = 9019.20 (art. 73). Retención 9019.20 / 12 = 751.60.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 20000, bonificaciones: 250, igss: 966, meses: 12, planillaIva: 0 },
    esperado: { rentaNeta: 243000, deducciones: 62616, imponible: 180384, anual: 9019.2, mensual: 751.6 },
  },
  {
    nombre: "Día anterior a la deducción extraordinaria",
    origen: { tipo: "recalculado", detalle: "El 22/05/2026 todavía no regía el Decreto 13-2026: deducciones 48000 + 11592 = 59592. Imponible 183408 × 5 % = 9170.40; entre 12 = 764.20." },
    fecha: "2026-05-22",
    entrada: { sueldo: 20000, bonificaciones: 250, igss: 966, meses: 12, planillaIva: 0 },
    esperado: { deducciones: 59592, imponible: 183408, anual: 9170.4, mensual: 764.2 },
  },
  {
    nombre: "Segundo tramo y planilla del IVA por encima del tope",
    origen: {
      tipo: "recalculado",
      detalle:
        "Renta 12 × 40000 = 480000. Planilla 15000 topeada en 12000. Deducciones 48000 + 3024 + 12 × 1932 + 12000 = 86208. Imponible 393792: 15000 + 7 % de 93792 = 21565.44. Entre 12 = 1797.12.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 40000, bonificaciones: 0, igss: 1932, meses: 12, planillaIva: 15000 },
    esperado: { deducciones: 86208, imponible: 393792, anual: 21565.44, mensual: 1797.12 },
  },
  {
    nombre: "IGSS mayor que el salario",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-07",
    entrada: { sueldo: 1000, bonificaciones: 0, igss: 2000, meses: 12, planillaIva: 0 },
    esperaError: true,
  },
]);
