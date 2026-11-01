import { definirCasos } from "@/motor/calculo";
import obracunDoprinosa from "./obracun-doprinosa";

const DOP = "https://www.mfin.gov.rs//upload/media/c59gCf_6aa14bd2e2c04.docx";

export default definirCasos(obracunDoprinosa, [
  {
    nombre: "Bruto 100.000",
    origen: { tipo: "recalculado", url: DOP, detalle: "Čl. 44: 14 + 5,15 + 0,75 = 19,9 % zaposleni; 10 + 5,15 = 15,15 % poslodavac; ukupno 35.050." },
    fecha: "2026-10-31",
    entrada: { bruto: 100000 },
    esperado: { pio: 14000, zdravstvo: 5150, nezaposlenost: 750, zaposleni: 19900, poslodavac: 15150, ukupno: 35050 },
  },
  {
    nombre: "Najviša osnovica",
    origen: { tipo: "recalculado", url: DOP, detalle: "Bruto 900.000 se ograničava na 732.820; 35,05 % = 256.853,41." },
    fecha: "2026-10-31",
    entrada: { bruto: 900000 },
    esperado: { osnovica: 732820, ukupno: 256853.41 },
    tolerancia: 0.02,
  },
]);
