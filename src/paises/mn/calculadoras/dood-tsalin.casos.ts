import { definirCasos } from "@/motor/calculo";
import calculadora from "./dood-tsalin";

export default definirCasos(calculadora, [
  { nombre: "2026 он, бүтэн цаг", origen: { tipo: "oficial", url: "https://www.ndaatgal.mn/wp-content/uploads/2025/03/6.-HHDH_2025.04.01-nees.pdf", detalle: "Гурван талт хорооны 2024 оны дугаар 03 тогтоол: цагт 4715, сард 792000." }, fecha: "2026-11-01", entrada: { tsalin: 700000, tsag: 168 }, esperado: { sar: 792000, tsagt: 4715, doodDun: 792000, zuruu: -92000, tope: 7920000 } },
  { nombre: "Хагас цаг", origen: { tipo: "recalculado", detalle: "84 цаг × 4715 = 396,060." }, fecha: "2026-11-01", entrada: { tsalin: null, tsag: 84 }, esperado: { doodDun: 396060 } },
]);
