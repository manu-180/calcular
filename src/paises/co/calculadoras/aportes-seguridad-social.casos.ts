import { definirCasos } from "@/motor/calculo";
import aportes from "./aportes-seguridad-social";

export default definirCasos(aportes, [
  {
    nombre: "Salario de 3 millones en una sociedad, riesgo I",
    origen: {
      tipo: "recalculado",
      detalle:
        "Trabajador: salud 4 % = 120.000, pensión 4 % = 120.000. Empresa exonerada (menos de 10 SMMLV): pensión 12 % = 360.000, ARL 0,522 % = 15.660, caja 4 % = 120.000. Total 240.000 + 495.660 = 735.660.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, empleador: "sociedad", riesgo: "i" },
    esperado: { totalTrabajador: 240000, saludEmpleador: 0, pensionEmpleador: 360000, arl: 15660, caja: 120000, sena: 0, icbf: 0, totalEmpleador: 495660, total: 735660 },
  },
  {
    nombre: "Salario de 20 millones, riesgo III",
    origen: {
      tipo: "recalculado",
      detalle:
        "11,42 SMMLV, sin exoneración. Trabajador: 800.000 + 800.000 + FSP 1 % 200.000 = 1.800.000. Empresa: salud 8,5 % 1.700.000, pensión 12 % 2.400.000, ARL 2,436 % 487.200, caja 800.000, SENA 400.000, ICBF 600.000 = 6.387.200.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 20000000, empleador: "sociedad", riesgo: "iii" },
    esperado: { totalTrabajador: 1800000, fsp: 200000, saludEmpleador: 1700000, arl: 487200, sena: 400000, icbf: 600000, totalEmpleador: 6387200, total: 8187200 },
  },
  {
    nombre: "Empleador sin exoneración con salario mínimo",
    origen: {
      tipo: "recalculado",
      detalle: "1.750.905: salud empresa 8,5 % = 148.826,9; pensión 12 % = 210.108,6; ARL 9.139,7; caja 70.036,2; SENA 35.018,1; ICBF 52.527,2. Redondeados: 148.827 + 210.109 + 9.140 + 70.036 + 35.018 + 52.527 = 525.657.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 1750905, empleador: "otro", riesgo: "i" },
    esperado: { totalTrabajador: 140072, totalEmpleador: 525657 },
  },
]);
