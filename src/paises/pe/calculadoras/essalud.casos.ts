import { definirCasos } from "@/motor/calculo";
import essalud from "./essalud";

export default definirCasos(essalud, [
  {
    nombre: "Sueldo de S/ 2,500",
    origen: { tipo: "recalculado", detalle: "Ley 26790: 9 % de 2,500 = 225 al mes; 2,700 al año." },
    fecha: "2026-10-12",
    entrada: { remuneracion: 2500, trabajadores: 1 },
    esperado: { porTrabajador: 225, mensual: 225, anual: 2700 },
  },
  {
    nombre: "Aporte mínimo con la RMV nueva",
    origen: { tipo: "recalculado", detalle: "Sueldo de 1,000 (menor que la RMV de 1,230): base 1,230, 9 % = 110.70, el aporte mínimo que publicó El Peruano." },
    fecha: "2026-10-12",
    entrada: { remuneracion: 1000, trabajadores: 1 },
    esperado: { base: 1230, porTrabajador: 110.7 },
  },
  {
    nombre: "Cinco trabajadores con la RMV de setiembre",
    origen: { tipo: "recalculado", detalle: "RMV 1,130 hasta el 30/9/2026: 9 % = 101.70 por trabajador; × 5 = 508.50." },
    fecha: "2026-09-30",
    entrada: { remuneracion: 1130, trabajadores: 5 },
    esperado: { porTrabajador: 101.7, mensual: 508.5 },
  },
]);
