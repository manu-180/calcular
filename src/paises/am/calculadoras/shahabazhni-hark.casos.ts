import { definirCasos } from "@/motor/calculo";
import shahabazhniHark from "./shahabazhni-hark";

export default definirCasos(shahabazhniHark, [
  { nombre: "1 000 000 դրամ", origen: { tipo: "oficial", url: "https://www.arlis.am/hy/acts/123521/latest", detalle: "Հոդված 150 մաս 8: 5 տոկոս = 50 000. Հոդված 125: 18 տոկոս, 1 000 000 / 0,82 = 1 219 512. Բեռը 18 + 82 × 5% = 22,1." }, fecha: "2026-11-01", entrada: { shahabazhin: 1000000 }, esperado: { hark: 50000, zut: 950000, shahuyt: 1219512, shahutahark: 219512, berr: 22.1 } },
  { nombre: "Զրո շահաբաժինը սխալ է", origen: { tipo: "recalculado", detalle: "Մուտքի ստուգում։" }, fecha: "2026-11-01", entrada: { shahabazhin: 0 }, esperaError: true },
]);
