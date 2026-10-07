import { definirCasos } from "@/motor/calculo";
import aguinaldo from "./aguinaldo";

export default definirCasos(aguinaldo, [
  {
    nombre: "Año completo con sueldo de 12,000 al mes",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 12000/30 = 400; 400 × 15 = 6000. Exento 30 × 117.31 = 3519.30; gravado 2480.70. ISR tarifa mensual 2026: sobre 12160 (400 × 30.4) = 420.95 + (12160 − 7168.52) × 10.88 % = 964.02; sobre 14640.70 = 1011.68 + (14640.70 − 12598.03) × 16 % = 1338.51; diferencia 374.49.",
    },
    fecha: "2026-12-10",
    entrada: { sueldo: 12000, periodo: "mensual", diasTrabajados: 365, diasAguinaldo: null, region: "general" },
    esperado: { diario: 400, aguinaldo: 6000, exento: 3519.3, gravado: 2480.7, isr: 374.49, neto: 5625.51 },
  },
  {
    nombre: "Salario mínimo: todo el aguinaldo exento",
    origen: { tipo: "recalculado", detalle: "315.04 × 15 = 4725.60. Quien gana el mínimo no paga ISR por el aguinaldo de ley (LISR art. 93 fr. I)." },
    fecha: "2026-12-10",
    entrada: { sueldo: 315.04, periodo: "diario", diasTrabajados: 365, diasAguinaldo: null, region: "general" },
    esperado: { aguinaldo: 4725.6, exento: 4725.6, gravado: 0, isr: 0, neto: 4725.6 },
  },
  {
    nombre: "Medio año trabajado",
    origen: { tipo: "recalculado", detalle: "Diario 9000/30 = 300; 300 × 15 × 180 / 365 = 2219.18, debajo del exento." },
    fecha: "2026-12-15",
    entrada: { sueldo: 9000, periodo: "mensual", diasTrabajados: 180, diasAguinaldo: null, region: "general" },
    esperado: { aguinaldo: 2219.18, gravado: 0, isr: 0, neto: 2219.18 },
  },
  {
    nombre: "Enero de 2026 todavía usa la UMA de 2025",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 1000; aguinaldo 15000. Exento 30 × 113.14 = 3394.20; gravado 11605.80. ISR sobre 30400 = 1856.84 + (30400 − 17533.65) × 21.36 % = 4605.09; sobre 42005.80 = 5665.16 + (42005.80 − 35362.84) × 23.52 % = 7227.58; diferencia 2622.49.",
    },
    fecha: "2026-01-15",
    entrada: { sueldo: 30000, periodo: "mensual", diasTrabajados: 365, diasAguinaldo: null, region: "general" },
    esperado: { exento: 3394.2, gravado: 11605.8, isr: 2622.49, neto: 12377.51 },
  },
  {
    nombre: "Menos días que el mínimo de ley",
    origen: { tipo: "recalculado", detalle: "La ley pide 15 días como mínimo (LFT art. 87)." },
    fecha: "2026-12-10",
    entrada: { sueldo: 12000, periodo: "mensual", diasTrabajados: 365, diasAguinaldo: 10, region: "general" },
    esperaError: true,
  },
]);
