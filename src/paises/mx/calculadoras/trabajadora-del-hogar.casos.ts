import { definirCasos } from "@/motor/calculo";
import trabajadora from "./trabajadora-del-hogar";

export default definirCasos(trabajadora, [
  {
    nombre: "2,800 pesos a la semana con un año de antigüedad",
    origen: {
      tipo: "recalculado",
      detalle:
        "Salario diario 2800 / 7 = 400 (LFT art. 89). Aguinaldo 15 días = 6,000 (art. 87). Primer año: 12 días de vacaciones (art. 76) = 4,800 y prima vacacional 25 % = 1,200 (art. 80). Año: 400 × 365 + 6,000 + 1,200 = 153,200; al mes 12,766.67.",
    },
    fecha: "2026-10-08",
    entrada: { sueldo: 2800, periodo: "semanal", region: "general", anios: 1, jornadaCompleta: true },
    esperado: { diario: 400, minimo: 342.47, aguinaldo: 6000, dias: 12, pagoVacaciones: 4800, primaVacacional: 1200, costoAnual: 153200, costoMensual: 12766.67 },
  },
  {
    nombre: "Sexto año: 22 días de vacaciones",
    origen: {
      tipo: "recalculado",
      detalle: "LFT art. 76: 20 días al quinto año y dos más desde el sexto. Diario 350: vacaciones 7,700, prima 1,925, aguinaldo 5,250. Año: 127,750 + 5,250 + 1,925 = 134,925.",
    },
    fecha: "2026-10-08",
    entrada: { sueldo: 350, periodo: "diario", region: "general", anios: 6, jornadaCompleta: true },
    esperado: { dias: 22, pagoVacaciones: 7700, primaVacacional: 1925, costoAnual: 134925 },
  },
  {
    nombre: "Frontera norte: el mínimo del hogar es el general de la zona",
    origen: {
      tipo: "oficial",
      url: "https://dof.gob.mx/nota_detalle.php?codigo=5775534&fecha=09/12/2025",
      detalle: "Resolución CONASAMI 2026: trabajador(a) del hogar 440.87 en la Zona Libre de la Frontera Norte y 342.47 en el resto del país.",
    },
    fecha: "2026-10-08",
    entrada: { sueldo: 13000, periodo: "mensual", region: "frontera-norte", anios: 0, jornadaCompleta: true },
    esperado: { minimo: 440.87, diario: 433.33, dias: 0, primaVacacional: 0 },
  },
]);
