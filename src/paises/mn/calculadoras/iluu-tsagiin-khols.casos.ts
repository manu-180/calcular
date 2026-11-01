import { definirCasos } from "@/motor/calculo";
import calculadora from "./iluu-tsagiin-khols";

export default definirCasos(calculadora, [
  { nombre: "10 илүү цаг", origen: { tipo: "recalculado", detalle: "1,680,000 / 168 = 10,000; 109.1: × 1.5 × 10 = 150,000." }, fecha: "2026-11-01", entrada: { dundaj: 1680000, normTsag: 168, torol: "iluu", tsag: 10, shonoTsag: 0 }, esperado: { niit: 150000 } },
  { nombre: "Баярын өдөр 8 цаг, шөнө 2", origen: { tipo: "recalculado", detalle: "109.4: 10,000 × 2 × 8 = 160,000; 109.3, 109.5: 10,000 × 0.2 × 2 = 4,000." }, fecha: "2026-11-01", entrada: { dundaj: 1680000, normTsag: 168, torol: "bayar", tsag: 8, shonoTsag: 2 }, esperado: { niit: 164000, shono: 4000 } },
  { nombre: "Шөнө нийтээс их", origen: { tipo: "recalculado", detalle: "Алдаа." }, fecha: "2026-11-01", entrada: { dundaj: 1680000, normTsag: 168, torol: "amralt", tsag: 2, shonoTsag: 3 }, esperaError: true },
]);
