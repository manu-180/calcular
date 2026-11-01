import { definirCasos } from "@/motor/calculo";
import porodiljskoOdsustvo from "./porodiljsko-odsustvo";

export default definirCasos(porodiljskoOdsustvo, [
  {
    nombre: "FBiH, godinu dana",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/f0787-zakon-o-radu-precisceni-tekst.pdf", detalle: "Član 62: jedna godina neprekidno; 1. 3. 2026. do 1. 3. 2027." },
    fecha: "2026-11-01",
    entrada: { region: "fbih", pocetak: "2026-03-01", blizanci: null, plata: null },
    esperado: { mjeseci: 12, kraj: "2027-03-01" },
  },
  {
    nombre: "RS, godinu dana",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-izmjeni-zakona-o-radu", detalle: "Član 107 i član 112 (112/23): naknada je prosječna plata iz zadnjih 18 mjeseci." },
    fecha: "2026-11-01",
    entrada: { region: "rs", pocetak: "2026-03-01", blizanci: false, plata: 1500 },
    esperado: { mjeseci: 12, naknada: 1500 },
  },
  {
    nombre: "RS, blizanci 18 mjeseci",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-radu", detalle: "Član 107: 18 mjeseci neprekidno." },
    fecha: "2026-11-01",
    entrada: { region: "rs", pocetak: "2026-03-01", blizanci: true, plata: 1500 },
    esperado: { mjeseci: 18, kraj: "2027-09-01" },
  },
]);
