import { definirCasos } from "@/motor/calculo";
import danokNaNasledstvoIPodarok from "./danok-na-nasledstvo-i-podarok";

const ZDI = "https://portal.mdt.gov.mk/post-body-files/propisi-od-oblasta-na-danocite-taksite-i-drugite-javni-prixodi-file-y1mD.pdf";

export default definirCasos(danokNaNasledstvoIPodarok, [
  {
    nombre: "Втор наследен ред, 2.000.000 денари",
    origen: { tipo: "recalculado", url: ZDI, detalle: "Член 16: 2 % = 40.000; 3 % = 60.000." },
    fecha: "2026-11-01",
    entrada: { vrednost: 2000000, dolgovi: 0, red: "vtor", stapka: null },
    esperado: { najmalku: 40000, najmnogu: 60000, spored: null },
  },
  {
    nombre: "Трет наследен ред со долг и стапка 5 %",
    origen: { tipo: "recalculado", url: ZDI, detalle: "Основица 2.000.000 − 200.000 = 1.800.000; 5 % = 90.000; 4 % = 72.000." },
    fecha: "2026-11-01",
    entrada: { vrednost: 2000000, dolgovi: 200000, red: "tret", stapka: 5 },
    esperado: { osnovica: 1800000, spored: 90000, najmalku: 72000, najmnogu: 90000 },
  },
  {
    nombre: "Прв наследен ред е ослободен",
    origen: { tipo: "recalculado", url: ZDI, detalle: "Закон за даноците на имот: наследник од прв наследен ред не плаќа данок." },
    fecha: "2026-11-01",
    entrada: { vrednost: 2000000, dolgovi: 0, red: "prv", stapka: null },
    esperado: { spored: 0, najmalku: 0 },
  },
  {
    nombre: "Стапка надвор од опсегот на редот",
    origen: { tipo: "recalculado", url: ZDI, detalle: "Член 16: 4 % е над опсегот за втор ред." },
    fecha: "2026-11-01",
    entrada: { vrednost: 2000000, dolgovi: 0, red: "vtor", stapka: 4 },
    esperaError: true,
  },
]);
