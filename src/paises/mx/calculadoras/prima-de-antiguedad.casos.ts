import { definirCasos } from "@/motor/calculo";
import primaDeAntiguedad from "./prima-de-antiguedad";

export default definirCasos(primaDeAntiguedad, [
  {
    nombre: "Renuncia con más de 16 años",
    origen: {
      tipo: "recalculado",
      detalle:
        "LFT art. 162. Del 1/03/2010 al 30/09/2026: 16 años y 214 días = 16.5863 años. Diario 400, debajo del tope 2 × 315.04. 400 × 12 × 16.5863014 = 79614.25. Exento: 17 años (la fracción pasa de seis meses) × 90 × 117.31 = 179484.30, cubre todo.",
    },
    fecha: "2026-10-15",
    entrada: { motivo: "renuncia", sueldo: 12000, periodo: "mensual", ingreso: "2010-03-01", salida: "2026-09-30", region: "general" },
    esperado: { antiguedad: 16.59, diario: 400, base: 400, prima: 79614.25, exento: 79614.25, gravado: 0 },
  },
  {
    nombre: "Renuncia antes de 15 años",
    origen: { tipo: "recalculado", detalle: "LFT art. 162 fr. III: al renunciar solo se paga con 15 años o más." },
    fecha: "2026-10-15",
    entrada: { motivo: "renuncia", sueldo: 12000, periodo: "mensual", ingreso: "2016-10-01", salida: "2026-09-30", region: "general" },
    esperado: { prima: 0 },
  },
  {
    nombre: "Despido con salario arriba del tope",
    origen: { tipo: "recalculado", detalle: "Seis años exactos (2020-01-01 a 2025-12-31). Tope 2 × 315.04 = 630.08. 630.08 × 12 × 6 = 45365.76." },
    fecha: "2026-10-15",
    entrada: { motivo: "despido", sueldo: 1000, periodo: "diario", ingreso: "2020-01-01", salida: "2025-12-31", region: "general" },
    esperado: { antiguedad: 6, base: 630.08, prima: 45365.76, exento: 45365.76 },
  },
  {
    nombre: "Frontera norte con salario debajo del mínimo de la zona",
    origen: { tipo: "recalculado", detalle: "Se usa el mínimo de la zona, 440.87. Dos años exactos: 440.87 × 12 × 2 = 10580.88." },
    fecha: "2026-10-15",
    entrada: { motivo: "muerte", sueldo: 400, periodo: "diario", ingreso: "2024-01-01", salida: "2025-12-31", region: "frontera-norte" },
    esperado: { base: 440.87, prima: 10580.88 },
  },
]);
