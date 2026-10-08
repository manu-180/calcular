import { definirCasos } from "@/motor/calculo";
import aguinaldo from "./aguinaldo";

export default definirCasos(aguinaldo, [
  {
    nombre: "Salario mínimo de comercio con 1 a 3 años",
    origen: {
      tipo: "recalculado",
      url: "https://www.mtps.gob.sv/2025/12/23/mtps-orienta-a-ciudadanos-sobre-el-pago-del-aguinaldo/",
      detalle: "Art. 198 del Código de Trabajo: 15 días. 408,80 / 30 = 13,6267 por día; × 15 = 204,40.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 408.8, antiguedad: "uno-a-tres", diasTrabajados: null },
    esperado: { diario: 13.63, diasAguinaldo: 15, aguinaldo: 204.4 },
  },
  {
    nombre: "De 3 a menos de 10 años: 19 días",
    origen: { tipo: "recalculado", detalle: "600 / 30 = 20 por día; × 19 = 380." },
    fecha: "2026-10-15",
    entrada: { salario: 600, antiguedad: "tres-a-diez", diasTrabajados: null },
    esperado: { diasAguinaldo: 19, aguinaldo: 380 },
  },
  {
    nombre: "10 años o más: 21 días",
    origen: { tipo: "recalculado", detalle: "1.000 / 30 = 33,3333 por día; × 21 = 700." },
    fecha: "2026-10-15",
    entrada: { salario: 1000, antiguedad: "diez-o-mas", diasTrabajados: null },
    esperado: { diasAguinaldo: 21, aguinaldo: 700 },
  },
  {
    nombre: "Menos de un año: proporcional de 180 días",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 197: parte proporcional de los 15 días. 15 × 180 / 365 = 7,3973 días; × (450 / 30 = 15) = 110,96.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 450, antiguedad: "menos-de-uno", diasTrabajados: 180 },
    esperado: { diasAguinaldo: 7.4, aguinaldo: 110.96 },
  },
  {
    nombre: "Menos de un año sin días trabajados",
    origen: { tipo: "recalculado", detalle: "Sin los días no se puede calcular el proporcional: tiene que dar error." },
    fecha: "2026-10-15",
    entrada: { salario: 450, antiguedad: "menos-de-uno", diasTrabajados: null },
    esperaError: true,
  },
]);
