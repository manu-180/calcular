import { definirCasos } from "@/motor/calculo";
import aportesTss from "./aportes-tss";

export default definirCasos(aportesTss, [
  {
    nombre: "RD$50,000 con riesgo de 0.10 %",
    origen: {
      tipo: "recalculado",
      detalle: "Tasas de la TSS: trabajador SFS 3.04 % = 1,520 y AFP 2.87 % = 1,435. Empleador SFS 7.09 % = 3,545, AFP 7.10 % = 3,550, SRL 1.10 % = 550. Total 10,600.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 50000, riesgo: 0.1 },
    esperado: { sfs: 1520, afp: 1435, trabajador: 2955, sfsEmpleador: 3545, afpEmpleador: 3550, srl: 550, empleador: 7645, total: 10600, costo: 57645 },
  },
  {
    nombre: "RD$300,000: pasa los topes de SFS y SRL",
    origen: {
      tipo: "recalculado",
      detalle:
        "SFS sobre el tope 232,230: 7,059.79 y 16,465.11. AFP sobre 300,000 (bajo el tope 464,460): 8,610 y 21,300. SRL 1.30 % sobre el tope 92,892 = 1,207.60.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 300000, riesgo: 0.3 },
    esperado: { sfs: 7059.79, afp: 8610, sfsEmpleador: 16465.11, afpEmpleador: 21300, srl: 1207.6, empleador: 38972.71, total: 54642.5 },
  },
]);
