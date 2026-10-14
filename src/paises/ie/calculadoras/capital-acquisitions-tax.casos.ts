import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-acquisitions-tax";

export default definirCasos(calculadora, [
  {
    nombre: "€450,000 to a child after 7 October 2026",
    origen: { tipo: "recalculado", detalle: "Group A threshold 420,000. 30,000 over × 33% = 9,900." },
    fecha: "2026-10-14",
    entrada: { valor: 450000, grupo: "group-a", previos: 0 },
    esperado: { umbral: 420000, gravable: 30000, impuesto: 9900 },
  },
  {
    nombre: "Same inheritance before 7 October 2026",
    origen: { tipo: "recalculado", detalle: "Group A threshold 400,000. 50,000 over × 33% = 16,500." },
    fecha: "2026-06-15",
    entrada: { valor: 450000, grupo: "group-a", previos: 0 },
    esperado: { umbral: 400000, impuesto: 16500 },
  },
  {
    nombre: "€60,000 to a nephew, Group B",
    origen: { tipo: "recalculado", detalle: "Group B threshold 44,000. 16,000 × 33% = 5,280." },
    fecha: "2026-10-14",
    entrada: { valor: 60000, grupo: "group-b", previos: 0 },
    esperado: { gravable: 16000, impuesto: 5280 },
  },
  {
    nombre: "Group B with an earlier gift",
    origen: { tipo: "recalculado", detalle: "30,000 earlier + 20,000 now = 50,000, which is 6,000 over 44,000. 6,000 × 33% = 1,980." },
    fecha: "2026-10-14",
    entrada: { valor: 20000, grupo: "group-b", previos: 30000 },
    esperado: { gravable: 6000, impuesto: 1980, restante: 0 },
  },
  {
    nombre: "€15,000 to a friend, Group C",
    origen: { tipo: "recalculado", detalle: "Under the 22,000 Group C threshold: no tax, 7,000 left." },
    fecha: "2026-10-14",
    entrada: { valor: 15000, grupo: "group-c", previos: 0 },
    esperado: { impuesto: 0, restante: 7000 },
  },
]);
