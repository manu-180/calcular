import { definirCasos } from "@/motor/calculo";
import licencia from "./licencia-de-paternidad";

export default definirCasos(licencia, [
  {
    nombre: "Todo el embarazo cotizado",
    origen: { tipo: "recalculado", detalle: "CST art. 236 par. 2: 2 semanas = 14 días × 3.000.000 / 30 = 1.400.000." },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, semanasGestacion: 40, semanasCotizadas: 40 },
    esperado: { dias: 14, porcentaje: 100, total: 1400000 },
  },
  {
    nombre: "30 de 40 semanas cotizadas",
    origen: { tipo: "recalculado", detalle: "Proporcional a lo cotizado: 30 / 40 = 75 % de 1.400.000 = 1.050.000." },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, semanasGestacion: 40, semanasCotizadas: 30 },
    esperado: { porcentaje: 75, valorCompleto: 1400000, total: 1050000 },
  },
  {
    nombre: "Más semanas cotizadas que de gestación",
    origen: { tipo: "recalculado", detalle: "No se puede cotizar más semanas de las que duró el embarazo." },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, semanasGestacion: 38, semanasCotizadas: 40 },
    esperaError: true,
  },
]);
