import { definirCasos } from "@/motor/calculo";
import bonificacionFamiliar from "./bonificacion-familiar";

const CT = "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo" as const;

export default definirCasos(bonificacionFamiliar, [
  {
    nombre: "Dos hijos con el mínimo vigente",
    origen: { tipo: "recalculado", url: CT, detalle: "Art. 261: 5 % de 3.044.000 = 152.200 por hijo; × 2 = 304.400. Tope art. 263: 200 % = 6.088.000." },
    fecha: "2026-10-07",
    entrada: { salario: 3500000, hijos: 2 },
    esperado: { porHijo: 152200, tope: 6088000, total: 304400 },
  },
  {
    nombre: "Salario justo en el tope",
    origen: { tipo: "recalculado", url: CT, detalle: "Art. 263: se pierde al exceder el 200 %. Con 6.088.000 todavía corresponde." },
    fecha: "2026-10-07",
    entrada: { salario: 6088000, hijos: 1 },
    esperado: { total: 152200 },
  },
  {
    nombre: "Un guaraní arriba del tope",
    origen: { tipo: "recalculado", url: CT, detalle: "6.088.001 excede el 200 % del mínimo: no corresponde." },
    fecha: "2026-10-07",
    entrada: { salario: 6088001, hijos: 3 },
    esperado: { total: 0 },
  },
  {
    nombre: "Antes del reajuste de julio",
    origen: { tipo: "recalculado", detalle: "30/6/2026: 5 % de 2.899.048 = 144.952,4, redondeado 144.952." },
    fecha: "2026-06-30",
    entrada: { salario: 3000000, hijos: 1 },
    esperado: { porHijo: 144952, tope: 5798096, total: 144952 },
  },
]);
