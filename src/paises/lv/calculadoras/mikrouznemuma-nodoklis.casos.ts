import { definirCasos } from "@/motor/calculo";
import calc from "./mikrouznemuma-nodoklis";

const VID = "https://www.vid.gov.lv/lv/mikrouznemumu-nodokla-likme";

export default definirCasos(calc, [
  {
    nombre: "3000 eiro apgrozījums",
    origen: { tipo: "recalculado", url: VID, detalle: "3000 × 25% = 750. 80% sociālajām iemaksām = 600. Paliek 3000 - 500 - 750 = 1750." },
    fecha: "2026-11-01",
    entrada: { apgrozijums: 3000, izdevumi: 500, gadaApgrozijums: 36000 },
    esperado: { nodoklis: 750, socialajam: 600, paliek: 1750 },
  },
  {
    nombre: "Virs PVN sliekšņa parādās piezīme, nodoklis nemainās",
    origen: { tipo: "recalculado", url: "https://www.vid.gov.lv/lv/ipasa-pvn-registracijas-kartiba-mazajiem-uznemumiem", detalle: "Gada apgrozījums 60 000 > 50 000. 5000 × 25% = 1250." },
    fecha: "2026-11-01",
    entrada: { apgrozijums: 5000, izdevumi: 0, gadaApgrozijums: 60000 },
    esperado: { nodoklis: 1250 },
  },
]);
