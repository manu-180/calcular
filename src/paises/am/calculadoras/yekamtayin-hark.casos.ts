import { definirCasos } from "@/motor/calculo";
import yekamtayinHark from "./yekamtayin-hark";

const LEY = "https://www.arlis.am/hy/acts/123521/latest";

export default definirCasos(yekamtayinHark, [
  { nombre: "Աշխատավարձ", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 150 մաս 1: 20 տոկոս։ 500 000 × 20% = 100 000." }, fecha: "2026-11-01", entrada: { tesak: "ashkhatavardz", yekamut: 500000 }, esperado: { hark: 100000, dedq: 20, zut: 400000 } },
  { nombre: "Ավանդի տոկոս", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 150 մաս 5.1: 10 տոկոս." }, fecha: "2026-11-01", entrada: { tesak: "avand", yekamut: 500000 }, esperado: { hark: 50000 } },
  { nombre: "Շահաբաժին", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 150 մաս 8: 5 տոկոս." }, fecha: "2026-11-01", entrada: { tesak: "shahabazhin", yekamut: 500000 }, esperado: { hark: 25000 } },
  { nombre: "Կառուցապատողի օտարում", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 150 մաս 11: 20 տոկոս." }, fecha: "2026-11-01", entrada: { tesak: "karutsapatogh", yekamut: 500000 }, esperado: { hark: 100000 } },
]);
