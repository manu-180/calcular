import { definirCasos } from "@/motor/calculo";
import izmaksas from "./darba-deveja-izmaksas";

const VID = "https://www.vid.gov.lv/lv/valsts-socialas-apdrosinasanas-obligato-iemaksu-likmes";

export default definirCasos(izmaksas, [
  {
    nombre: "1750 eiro bruto, vispārējā likme",
    origen: { tipo: "recalculado", url: VID, detalle: "1750 × 23,59% = 412,83. Izmaksas 2162,83. Neto pēc VID piemēra 1307,11." },
    fecha: "2026-11-01",
    entrada: { alga: 1750, kategorija: "vispariga", gramatina: true, apgadajamie: 0 },
    esperado: { devejaVsaoi: 412.83, izmaksas: 2162.83, gada: 25953.96, neto: 1307.11 },
  },
  {
    nombre: "Minimālā alga, sasniegts pensijas vecums",
    origen: { tipo: "recalculado", url: VID, detalle: "780 × 20,77% = 162,01. Izmaksas 942,01." },
    fecha: "2026-11-01",
    entrada: { alga: 780, kategorija: "pensijas-vecums", gramatina: true, apgadajamie: 0 },
    esperado: { devejaVsaoi: 162.01, izmaksas: 942.01 },
  },
]);
