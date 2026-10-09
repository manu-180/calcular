import { definirCasos } from "@/motor/calculo";
import empleadaDomestica from "./empleada-domestica";

export default definirCasos(empleadaDomestica, [
  {
    nombre: "Salario mínimo 2026 con auxilio de transporte",
    origen: {
      tipo: "recalculado",
      detalle:
        "SMMLV 1.750.905 y auxilio 249.095. Trabajadora: salud 4 % = 70.036 y pensión 4 % = 70.036; recibe 1.859.928. Empleador: salud 8,5 % = 148.827 (Ley 100, art. 204), pensión 12 % = 210.109, ARL clase I 0,522 % = 9.140 (Decreto 1072, art. 2.2.4.3.5), caja 4 % = 70.036 (Ley 21 de 1982). Prestaciones sobre 2.000.000: prima 166.667 (CST art. 306), cesantías 166.667, intereses 12 % = 20.000; vacaciones 15/360 del salario = 72.954. Costo 2.864.400.",
    },
    fecha: "2026-10-08",
    entrada: { salario: 1750905, auxilio: true, dosOMas: false },
    esperado: {
      neto: 1859928,
      salud: 148827,
      pension: 210109,
      arl: 9140,
      caja: 70036,
      aportes: 438112,
      prima: 166667,
      cesantias: 166667,
      intereses: 20000,
      vacaciones: 72954,
      costoMensual: 2864400,
    },
  },
  {
    nombre: "Empleador con dos trabajadores: sin salud del empleador",
    origen: {
      tipo: "recalculado",
      detalle:
        "ET art. 114-1: la persona natural con dos o más trabajadores no paga la salud del empleador por quien gana menos de 10 SMMLV. Salario 2.000.000 con auxilio: pensión 240.000, ARL 10.440, caja 80.000; prima y cesantías 187.425 cada una, intereses 22.491, vacaciones 83.333. Costo 3.060.209.",
    },
    fecha: "2026-10-08",
    entrada: { salario: 2000000, auxilio: true, dosOMas: true },
    esperado: { salud: 0, pension: 240000, arl: 10440, caja: 80000, costoMensual: 3060209, neto: 2089095 },
  },
]);
