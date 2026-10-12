import { definirCasos } from "@/motor/calculo";
import embargoDeSalario from "./embargo-de-salario";

const CT = "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo" as const;

export default definirCasos(embargoDeSalario, [
  {
    nombre: "Pensión alimenticia sin otros embargos",
    origen: { tipo: "recalculado", url: CT, detalle: "Art. 245 a: hasta 50 % por pensión alimenticia. 4.000.000 × 50 % = 2.000.000; queda 2.000.000." },
    fecha: "2026-10-12",
    entrada: { salario: 4000000, tipo: "alimentos", otros: 0 },
    esperado: { porTipo: 2000000, maximo: 2000000, teQueda: 2000000 },
  },
  {
    nombre: "Deuda común",
    origen: { tipo: "recalculado", url: CT, detalle: "Art. 245 c: hasta 25 % en los demás casos. 4.000.000 × 25 % = 1.000.000." },
    fecha: "2026-10-12",
    entrada: { salario: 4000000, tipo: "otros", otros: 0 },
    esperado: { porTipo: 1000000, maximo: 1000000, teQueda: 3000000 },
  },
  {
    nombre: "Embargos acumulados con tope",
    origen: { tipo: "recalculado", url: CT, detalle: "Tope de embargos juntos: 50 % = 2.000.000. Ya hay 1.500.000 embargados: solo caben 500.000 más. Queda 2.000.000." },
    fecha: "2026-10-12",
    entrada: { salario: 4000000, tipo: "alimentos", otros: 1500000 },
    esperado: { porTipo: 2000000, maximo: 500000, teQueda: 2000000 },
  },
]);
