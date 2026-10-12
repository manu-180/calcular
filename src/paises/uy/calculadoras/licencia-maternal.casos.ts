import { definirCasos } from "@/motor/calculo";
import licenciaMaternal from "./licencia-maternal";

const BASE = { tipo: "maternidad", semanas: 14, dependiente: true } as const;

export default definirCasos(licenciaMaternal, [
  {
    nombre: "Licencia maternal de 14 semanas con promedio de $ 60.000",
    origen: {
      tipo: "recalculado",
      url: "https://www.impo.com.uy/bases/leyes/19161-2013/6",
      detalle: "Ley 19.161, art. 2 y 6: 98 días al promedio diario (60.000 / 30 = 2.000) = 196.000. Aguinaldo 196.000 / 12 = 16.333,33.",
    },
    fecha: "2026-10-12",
    entrada: { ...BASE, promedio: 60000 },
    esperado: { dias: 98, subsidio: 196000, aguinaldo: 16333.33, diasEmpresa: null },
  },
  {
    nombre: "Promedio bajo: mínimo de dos BPC",
    origen: { tipo: "recalculado", detalle: "2 × 6.864 = 13.728 por mes; 457,60 por día × 98 = 44.844,80." },
    fecha: "2026-10-12",
    entrada: { ...BASE, promedio: 10000 },
    esperado: { subsidio: 44844.8 },
  },
  {
    nombre: "Licencia paternal de un dependiente en 2026",
    origen: { tipo: "recalculado", detalle: "Ley 19.161, art. 8: 17 días desde el 1/1/2026 después de los 3 de la Ley 18.345. 17 × 2.000 = 34.000." },
    fecha: "2026-10-12",
    entrada: { ...BASE, tipo: "paternidad", promedio: 60000 },
    esperado: { dias: 17, subsidio: 34000, diasEmpresa: 3 },
  },
  {
    nombre: "Licencia paternal de un trabajador por su cuenta",
    origen: { tipo: "recalculado", detalle: "Sin la licencia de la Ley 18.345: 20 días. 20 × 2.000 = 40.000." },
    fecha: "2026-10-12",
    entrada: { ...BASE, tipo: "paternidad", promedio: 60000, dependiente: false },
    esperado: { dias: 20, subsidio: 40000, diasEmpresa: null },
  },
  {
    nombre: "Medio horario para cuidados",
    origen: { tipo: "recalculado", detalle: "Ley 19.161, art. 14: la mitad del subsidio por maternidad. 60.000 / 2 = 30.000 por mes." },
    fecha: "2026-10-12",
    entrada: { ...BASE, tipo: "cuidados", promedio: 60000 },
    esperado: { subsidio: 30000, dias: null },
  },
  {
    nombre: "Menos de 14 semanas",
    origen: { tipo: "recalculado", detalle: "El descanso nunca es menor a 14 semanas." },
    fecha: "2026-10-12",
    entrada: { ...BASE, promedio: 60000, semanas: 12 },
    esperaError: true,
  },
]);
