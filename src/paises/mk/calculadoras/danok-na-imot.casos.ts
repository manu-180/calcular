import { definirCasos } from "@/motor/calculo";
import danokNaImot from "./danok-na-imot";

const ZDI = "https://portal.mdt.gov.mk/post-body-files/propisi-od-oblasta-na-danocite-taksite-i-drugite-javni-prixodi-file-y1mD.pdf";

export default definirCasos(danokNaImot, [
  {
    nombre: "3.000.000 денари, стапка 0,15 %",
    origen: { tipo: "recalculado", url: ZDI, detalle: "Член 6: 0,10 % = 3.000; 0,20 % = 6.000; 0,15 % = 4.500." },
    fecha: "2026-11-01",
    entrada: { vrednost: 3000000, stapka: 0.15, neobrabotlivo: false },
    esperado: { najmalku: 3000, najmnogu: 6000, spored: 4500 },
  },
  {
    nombre: "Необработено земјоделско земјиште",
    origen: { tipo: "recalculado", url: ZDI, detalle: "Член 6, став 3: трипати: 1.000.000 × 0,10 % × 3 = 3.000; × 0,20 % × 3 = 6.000." },
    fecha: "2026-11-01",
    entrada: { vrednost: 1000000, stapka: null, neobrabotlivo: true },
    esperado: { najmalku: 3000, najmnogu: 6000, spored: null },
  },
]);
