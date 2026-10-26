import { definirCasos } from "@/motor/calculo";
import calculadora from "./leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Fábrica, 290 días trabajados",
    origen: { tipo: "recalculado", detalle: "Art. 117(1)(ক): un día cada 18 trabajados. 290 / 18 = 16.1, 16 días. Casual 10, enfermedad 14, festivos 13 (reforma 2026). Total 53." },
    fecha: "2026-10-24",
    entrada: { sector: "general", dias: 290, salario: null },
    esperado: { anual: 16, casual: 10, enfermedad: 14, festivos: 13, total: 53, valorDia: null },
  },
  {
    nombre: "Jardín de té",
    origen: { tipo: "recalculado", detalle: "Art. 117(1)(খ): uno cada 22. 286 / 22 = 13." },
    fecha: "2026-10-24",
    entrada: { sector: "tea", dias: 286, salario: 9000 },
    esperado: { anual: 13, valorDia: 300 },
  },
  {
    nombre: "Periodista",
    origen: { tipo: "recalculado", detalle: "Art. 117(1)(গ): uno cada 11. 300 / 11 = 27.27, 27 días." },
    fecha: "2026-10-24",
    entrada: { sector: "newspaper", dias: 300, salario: null },
    esperado: { anual: 27 },
  },
]);
