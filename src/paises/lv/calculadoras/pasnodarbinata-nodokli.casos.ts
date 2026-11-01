import { definirCasos } from "@/motor/calculo";
import calc from "./pasnodarbinata-nodokli";

const VID = "https://www.vid.gov.lv/lv/biezak-uzdotie-jautajumi-katalogs/valsts-socialas-apdrosinasanas-obligatas-iemaksas-pasnodarbinato-personu-obligato-iemaksu-veiksanas-kartiba";
const IIN = "https://www.vid.gov.lv/lv/media/1894/download";

export default definirCasos(calc, [
  {
    nombre: "VID piemērs: peļņa 1200 eiro",
    origen: { tipo: "oficial", url: VID, detalle: "VID: 1200 - 780 = 420, pensijai 10% = 42 eiro. Objektam 780 × 31,07% = 242,35. VSAOI 284,35." },
    fecha: "2026-11-01",
    entrada: { pelna: 1200, kategorija: "vispariga", minimums: true },
    esperado: { pensijai: 42, pamata: 242.35, vsaoi: 284.35 },
  },
  {
    nombre: "VID piemērs: peļņa 500 eiro",
    origen: { tipo: "oficial", url: VID, detalle: "VID: ienākums līdz 780 eiro, 10% no 500 = 50 eiro." },
    fecha: "2026-11-01",
    entrada: { pelna: 500, kategorija: "vispariga", minimums: true },
    esperado: { pamata: 0, pensijai: 50, vsaoi: 50, iin: 0, paliek: 450 },
  },
  {
    nombre: "IIN no 1500 eiro",
    origen: { tipo: "recalculado", url: IIN, detalle: "VSAOI 242,35 + 72 = 314,35. Gadā (1500 - 314,35 - 550) × 12 = 7627,80, IIN 25,5% = 1945,09, mēnesī 162,09. Paliek 1023,56." },
    fecha: "2026-11-01",
    entrada: { pelna: 1500, kategorija: "vispariga", minimums: true },
    esperado: { vsaoi: 314.35, iin: 162.09, paliek: 1023.56 },
  },
  {
    nombre: "Pensijas vecumā 29,36%",
    origen: { tipo: "recalculado", url: "https://www.vid.gov.lv/lv/pasnodarbinata-socialas-apdrosinasanas-iemaksas", detalle: "780 × 29,36% = 229,01." },
    fecha: "2026-11-01",
    entrada: { pelna: 780, kategorija: "pensijas-vecums", minimums: false },
    esperado: { pamata: 229.01, pensijai: 0 },
  },
]);
