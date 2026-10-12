import { definirCasos } from "@/motor/calculo";
import vacacionesProporcionales from "./vacaciones-proporcionales";

export default definirCasos(vacacionesProporcionales, [
  {
    nombre: "Cuarto año incompleto",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo",
      detalle: "Desde el aniversario 1/3/2026 hasta el 31/8 (incluido): 184 de 365 días. El cuarto año da 12 días (art. 218): 12 × 184 / 365 = 6,0493. Diario 150.000: 907.397.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 4500000, ingreso: "2023-03-01", egreso: "2026-08-31" },
    esperado: { diasDelAnio: 12, monto: 907397 },
  },
  {
    nombre: "Antes del primer año con el salario mínimo",
    origen: { tipo: "recalculado", detalle: "Del 5/1 al 4/9/2026: 243 de 365 días. 12 × 243 / 365 = 7,989 días × 101.466,67 = 810.621,37 (810.621)." },
    fecha: "2026-10-12",
    entrada: { salario: 3044000, ingreso: "2026-01-05", egreso: "2026-09-04" },
    esperado: { diasDelAnio: 12, monto: 810621 },
  },
  {
    nombre: "Séptimo año: 18 días",
    origen: { tipo: "recalculado", detalle: "Seis años cumplidos el 1/2/2026; el séptimo da 18 días. Del 1/2 al 31/7: 181 de 365 días. 18 × 181 / 365 = 8,926 días × 200.000 = 1.785.205,48 (1.785.205)." },
    fecha: "2026-10-12",
    entrada: { salario: 6000000, ingreso: "2020-02-01", egreso: "2026-07-31" },
    esperado: { diasDelAnio: 18, monto: 1785205 },
  },
]);
