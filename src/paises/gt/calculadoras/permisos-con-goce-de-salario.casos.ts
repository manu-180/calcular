import { definirCasos } from "@/motor/calculo";
import permisosConGoceDeSalario from "./permisos-con-goce-de-salario";

export default definirCasos(permisosConGoceDeSalario, [
  {
    nombre: "Matrimonio",
    origen: { tipo: "recalculado", detalle: "CT art. 61 lit. ñ: 5 días; 6000 / 30 = 200 × 5 = 1000." },
    fecha: "2026-10-12",
    entrada: { motivo: "matrimonio", salario: 6000 },
    esperado: { dias: 5, diario: 200, pago: 1000 },
  },
  {
    nombre: "Nacimiento de un hijo",
    origen: { tipo: "recalculado", detalle: "2 días × 150 = 300." },
    fecha: "2026-10-12",
    entrada: { motivo: "nacimiento", salario: 4500 },
    esperado: { dias: 2, pago: 300 },
  },
  {
    nombre: "Fallecimiento de un familiar",
    origen: { tipo: "recalculado", detalle: "3 días × 150 = 450." },
    fecha: "2026-10-12",
    entrada: { motivo: "fallecimiento", salario: 4500 },
    esperado: { dias: 3, pago: 450 },
  },
]);
