import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Tres años, año completo, nada usado",
    origen: { tipo: "recalculado", detalle: "Art. 109: 21 días. Diario 9.000 / 30 = 300. 21 x 300 = 6.300." },
    fecha: "2026-10-24",
    entrada: { salario: 9000, anios: 3, diasTrabajados: 365, tomados: 0 },
    esperado: { saldo: 21, pago: 6300, porAnio: 21, pagoCompleto: 6300 },
  },
  {
    nombre: "Cinco años: 30 días",
    origen: { tipo: "recalculado", detalle: "Desde cinco años continuos, 30 días. 30 x 400 = 12.000." },
    fecha: "2026-10-24",
    entrada: { salario: 12000, anios: 5, diasTrabajados: 365, tomados: 0 },
    esperado: { porAnio: 30, saldo: 30, pago: 12000 },
  },
  {
    nombre: "Medio año con días ya usados",
    origen: { tipo: "recalculado", detalle: "21 x 183 / 365 = 10,5288 días; menos 4 = 6,5288 x 300 = 1.958,63." },
    fecha: "2026-10-24",
    entrada: { salario: 9000, anios: 1, diasTrabajados: 183, tomados: 4 },
    esperado: { acumulados: 10.53, saldo: 6.53, pago: 1958.63 },
  },
  {
    nombre: "Sin sueldo",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-10-24",
    entrada: { salario: 0, anios: 1, diasTrabajados: 365, tomados: 0 },
    esperaError: true,
  },
]);
