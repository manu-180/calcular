import { definirCasos } from "@/motor/calculo";
import irpfAlquileres from "./irpf-alquileres";

export default definirCasos(irpfAlquileres, [
  {
    nombre: "Alquiler de $ 25.000 por mes con gastos",
    origen: {
      tipo: "recalculado",
      url: "https://www.impo.com.uy/bases/todgi2023/101-2024/16_T7",
      detalle: "300.000 en el año pasa 40 BPC (274.560). TO 2023, T7, art. 16: renta 300.000 − 20.000 = 280.000. Art. 37: 12 % = 33.600; 2.800 por mes.",
    },
    fecha: "2026-10-12",
    entrada: { alquiler: 25000, meses: 12, gastos: 20000, otrasRentas: false },
    esperado: { bruto: 300000, limite: 274560, renta: 280000, impuesto: 33600, porMes: 2800, exento: "No" },
  },
  {
    nombre: "Alquiler bajo: exonerado",
    origen: { tipo: "recalculado", url: "https://www.impo.com.uy/bases/todgi2023/101-2024/38_T7", detalle: "Art. 38 J: 240.000 no pasa 274.560 y no hay otras rentas: exento." },
    fecha: "2026-10-12",
    entrada: { alquiler: 20000, meses: 12, gastos: 10000, otrasRentas: false },
    esperado: { impuesto: 0, exento: "Sí" },
  },
  {
    nombre: "Alquiler bajo con otras rentas de capital",
    origen: { tipo: "recalculado", detalle: "Con otras rentas de más de 3 BPC no corre la exoneración: 12 % de 230.000 = 27.600." },
    fecha: "2026-10-12",
    entrada: { alquiler: 20000, meses: 12, gastos: 10000, otrasRentas: true },
    esperado: { impuesto: 27600, exento: "No" },
  },
]);
