import { definirCasos } from "@/motor/calculo";
import trosakPoslodavca from "./trosak-poslodavca";

const DOP = "https://www.mfin.gov.rs//upload/media/c59gCf_6aa14bd2e2c04.docx";

export default definirCasos(trosakPoslodavca, [
  {
    nombre: "Bruto 100.000, jedan zaposleni",
    origen: { tipo: "recalculado", url: DOP, detalle: "PIO 10 % = 10.000; zdravstvo 5,15 % = 5.150; trošak 115.150; državi 19.900 + 6.577,90 + 15.150 = 41.627,90." },
    fecha: "2026-10-31",
    entrada: { bruto: 100000, zaposleni: 1 },
    esperado: { trosak: 115150, doprinosiPoslodavca: 15150, drzavi: 41627.9, trosakGodisnje: 1381800 },
  },
  {
    nombre: "Bruto ispod najniže osnovice",
    origen: { tipo: "recalculado", url: DOP, detalle: "Doprinosi poslodavca na 51.297: 5.129,70 + 2.641,80 = 7.771,50; trošak 47.771,50." },
    fecha: "2026-10-31",
    entrada: { bruto: 40000, zaposleni: 1 },
    esperado: { doprinosiPoslodavca: 7771.5, trosak: 47771.5 },
  },
]);
