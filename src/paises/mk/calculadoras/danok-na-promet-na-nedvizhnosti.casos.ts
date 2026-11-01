import { definirCasos } from "@/motor/calculo";
import danokNaPrometNaNedvizhnosti from "./danok-na-promet-na-nedvizhnosti";

const ZDI = "https://portal.mdt.gov.mk/post-body-files/propisi-od-oblasta-na-danocite-taksite-i-drugite-javni-prixodi-file-y1mD.pdf";

export default definirCasos(danokNaPrometNaNedvizhnosti, [
  {
    nombre: "3.000.000 денари, стапка 3 %",
    origen: { tipo: "recalculado", url: ZDI, detalle: "Член 22: 2 % = 60.000; 4 % = 120.000; 3 % = 90.000." },
    fecha: "2026-11-01",
    entrada: { vrednost: 3000000, stapka: 3 },
    esperado: { najmalku: 60000, najmnogu: 120000, spored: 90000 },
  },
  {
    nombre: "Без внесена стапка",
    origen: { tipo: "recalculado", url: ZDI, detalle: "Член 22: само опсегот." },
    fecha: "2026-11-01",
    entrada: { vrednost: 3000000, stapka: null },
    esperado: { spored: null, najmalku: 60000 },
  },
  {
    nombre: "Стапка надвор од опсегот",
    origen: { tipo: "recalculado", url: ZDI, detalle: "Член 22: 5 % е над највисоката стапка." },
    fecha: "2026-11-01",
    entrada: { vrednost: 3000000, stapka: 5 },
    esperaError: true,
  },
]);
