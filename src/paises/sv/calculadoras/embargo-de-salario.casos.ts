import { definirCasos } from "@/motor/calculo";
import embargo from "./embargo-de-salario";

export default definirCasos(embargo, [
  {
    nombre: "Salario de $800, deuda con un particular",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle: "Art. 133: 800 − 408,80 = 391,20; 20 % = 78,24. Le quedan 721,76.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 800, region: "comercio-servicios", deuda: "otra" },
    esperado: { base: 391.2, maximo: 78.24, queda: 721.76 },
  },
  {
    nombre: "Salario de $800, préstamo de banco",
    origen: { tipo: "recalculado", detalle: "Art. 136: no aplica el art. 133; 20 % de 800 = 160. Le quedan 640." },
    fecha: "2026-10-12",
    entrada: { salario: 800, region: "comercio-servicios", deuda: "financiera" },
    esperado: { base: 800, maximo: 160, queda: 640 },
  },
  {
    nombre: "Salario mínimo con deuda de un particular: no se embarga",
    origen: { tipo: "recalculado", detalle: "408,80 no pasa del mínimo: 0." },
    fecha: "2026-10-12",
    entrada: { salario: 408.8, region: "comercio-servicios", deuda: "otra" },
    esperado: { base: 0, maximo: 0, queda: 408.8 },
  },
  {
    nombre: "Cuota alimenticia: sin límite fijo",
    origen: { tipo: "recalculado", detalle: "El art. 133 deja fuera la cuota alimenticia: el monto lo fija la autoridad." },
    fecha: "2026-10-12",
    entrada: { salario: 800, region: "comercio-servicios", deuda: "alimentos" },
    esperado: { maximo: null, queda: null },
  },
]);
