import { definirCasos } from "@/motor/calculo";
import itf from "./itf";

export default definirCasos(itf, [
  {
    nombre: "Transferencia de S/ 10,000",
    origen: { tipo: "recalculado", detalle: "TUO Ley 28194, art. 10: 0.005 % de 10,000 = 0.50. Ya tiene segundo decimal 0." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, operaciones: 1 },
    esperado: { porOperacion: 0.5, total: 0.5 },
  },
  {
    nombre: "Redondeo del artículo 13: S/ 15,800",
    origen: { tipo: "recalculado", detalle: "0.005 % de 15,800 = 0.79. Se suprime el tercer decimal y el segundo (9) se ajusta a 5: 0.75." },
    fecha: "2026-10-12",
    entrada: { monto: 15800, operaciones: 1 },
    esperado: { exacto: 0.79, porOperacion: 0.75 },
  },
  {
    nombre: "Segundo decimal menor que 5",
    origen: { tipo: "recalculado", detalle: "0.005 % de 6,800 = 0.34: el 4 se ajusta a 0, queda 0.30. Tres operaciones: 0.90." },
    fecha: "2026-10-12",
    entrada: { monto: 6800, operaciones: 3 },
    esperado: { porOperacion: 0.3, total: 0.9 },
  },
  {
    nombre: "Operación chica",
    origen: { tipo: "recalculado", detalle: "0.005 % de 900 = 0.045: se suprime el tercer decimal (0.04) y el 4 pasa a 0." },
    fecha: "2026-10-12",
    entrada: { monto: 900, operaciones: 1 },
    esperado: { porOperacion: 0 },
  },
]);
