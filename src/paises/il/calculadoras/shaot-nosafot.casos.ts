import { definirCasos } from "@/motor/calculo";
import calculadora from "./shaot-nosafot";

export default definirCasos(calculadora, [
  {
    nombre: "3 horas extra por día durante 10 días a 50 por hora",
    origen: { tipo: "recalculado", detalle: "Art. 16(א): 2 h x 10 días x 62,5 = 1.250; 1 h x 10 x 75 = 750. Total 2.000; sobre el sueldo regular (1.500) son 500 más." },
    fecha: "2026-10-24",
    entrada: { sacharShaa: 50, shaotBeyom: 3, yamim: 10 },
    esperado: { tashlum125: 1250, tashlum150: 750, tashlum: 2000, tosefet: 500, shaot125: 20, shaot150: 10 },
  },
  {
    nombre: "Una hora y media por día",
    origen: { tipo: "recalculado", detalle: "1,5 h x 4 días x 40 x 1,25 = 300; sin horas al 150 %." },
    fecha: "2026-10-24",
    entrada: { sacharShaa: 40, shaotBeyom: 1.5, yamim: 4 },
    esperado: { tashlum: 300, shaot150: 0 },
  },
  {
    nombre: "Sin horas",
    origen: { tipo: "recalculado", detalle: "0 horas." },
    fecha: "2026-10-24",
    entrada: { sacharShaa: 50, shaotBeyom: 0, yamim: 10 },
    esperaError: true,
  },
]);
