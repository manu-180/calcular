import { definirCasos } from "@/motor/calculo";
import independientes from "./seguridad-social-independientes";

export default definirCasos(independientes, [
  {
    nombre: "Contrato de 5 millones al mes, riesgo I",
    origen: { tipo: "recalculado", detalle: "Ley 2277 art. 89: IBC 40 % = 2.000.000. Salud 12,5 % = 250.000; pensión 16 % = 320.000; ARL 0,522 % = 10.440. Total 580.440." },
    fecha: "2026-10-15",
    entrada: { ingreso: 5000000, riesgo: "i" },
    esperado: { ibc: 2000000, salud: 250000, pension: 320000, fsp: 0, arl: 10440, total: 580440 },
  },
  {
    nombre: "Contrato de 30 millones: paga Fondo de Solidaridad",
    origen: { tipo: "recalculado", detalle: "IBC 12.000.000 (6,85 SMMLV): salud 1.500.000, pensión 1.920.000, FSP 1 % 120.000, ARL 62.640. Total 3.602.640." },
    fecha: "2026-10-15",
    entrada: { ingreso: 30000000, riesgo: "i" },
    esperado: { ibc: 12000000, fsp: 120000, total: 3602640 },
  },
  {
    nombre: "El 40 % queda debajo del mínimo",
    origen: { tipo: "recalculado", detalle: "40 % de 3.000.000 = 1.200.000 < 1.750.905: IBC 1.750.905. Salud 218.863; pensión 280.145; ARL 9.140. Total 508.148." },
    fecha: "2026-10-15",
    entrada: { ingreso: 3000000, riesgo: "i" },
    esperado: { ibc: 1750905, salud: 218863, pension: 280145, arl: 9140, total: 508148 },
  },
  {
    nombre: "Riesgo V: la ARL la paga el contratante",
    origen: { tipo: "recalculado", detalle: "IBC 2.000.000 × 6,96 % = 139.200 a cargo del contratante. El contratista paga 570.000." },
    fecha: "2026-10-15",
    entrada: { ingreso: 5000000, riesgo: "v" },
    esperado: { arl: 0, arlContratante: 139200, total: 570000 },
  },
]);
