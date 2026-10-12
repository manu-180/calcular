import { definirCasos } from "@/motor/calculo";
import utilidades from "./utilidades";

export default definirCasos(utilidades, [
  {
    nombre: "Empresa comercial con renta de S/ 1,000,000",
    origen: {
      tipo: "recalculado",
      detalle:
        "DL 892, art. 2: comercio 8 % = 80,000; mitad 40,000. Por días: 40,000 / 18,000 × 360 = 800. Por remuneraciones: 40,000 / 1,500,000 × 36,000 = 960. Total 1,760, debajo del tope de 18 × 3,000 = 54,000.",
    },
    fecha: "2026-10-12",
    entrada: {
      actividad: "comercio",
      renta: 1000000,
      trabajadores: 50,
      diasTotales: 18000,
      remuneracionesTotales: 1500000,
      diasTuyos: 360,
      remuneracionesTuyas: 36000,
      sueldoMensual: 3000,
    },
    esperado: { tasa: 8, monto: 80000, porDias: 800, porRemuneraciones: 960, total: 1760 },
  },
  {
    nombre: "Minera chica con tope de 18 sueldos",
    origen: {
      tipo: "recalculado",
      detalle: "Minera 8 % de 50,000,000 = 4,000,000; mitad 2,000,000. Por días 2,000,000 / 7,500 × 300 = 80,000. Por remuneraciones 2,000,000 / 1,200,000 × 30,000 = 50,000. Suma 130,000 > tope 18 × 2,500 = 45,000.",
    },
    fecha: "2026-10-12",
    entrada: {
      actividad: "minera",
      renta: 50000000,
      trabajadores: 25,
      diasTotales: 7500,
      remuneracionesTotales: 1200000,
      diasTuyos: 300,
      remuneracionesTuyas: 30000,
      sueldoMensual: 2500,
    },
    esperado: { monto: 4000000, porDias: 80000, porRemuneraciones: 50000, tope: 45000, total: 45000 },
  },
  {
    nombre: "Empresa con 20 trabajadores: no reparte",
    origen: { tipo: "recalculado", detalle: "DL 677, art. 9: no reparten las empresas que no exceden de 20 trabajadores." },
    fecha: "2026-10-12",
    entrada: {
      actividad: "otras",
      renta: 500000,
      trabajadores: 20,
      diasTotales: 7000,
      remuneracionesTotales: 600000,
      diasTuyos: 360,
      remuneracionesTuyas: 30000,
      sueldoMensual: 2500,
    },
    esperado: { total: 0 },
  },
  {
    nombre: "Días propios mayores que los de todos",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: {
      actividad: "otras",
      renta: 500000,
      trabajadores: 30,
      diasTotales: 100,
      remuneracionesTotales: 600000,
      diasTuyos: 360,
      remuneracionesTuyas: 30000,
      sueldoMensual: 2500,
    },
    esperaError: true,
  },
]);
