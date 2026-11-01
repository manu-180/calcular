import { definirCasos } from "@/motor/calculo";
import obracunBolovanja from "./obracun-bolovanja";

const ZZO = "https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2019/25/1/reg";

export default definirCasos(obracunBolovanja, [
  {
    nombre: "Deset dana bolesti, zarada 200.000",
    origen: { tipo: "recalculado", url: ZZO, detalle: "65 % od 200.000 = 130.000 mesečno, puta 10/30 = 43.333,33, sve poslodavac." },
    fecha: "2026-10-31",
    entrada: { zarada: 200000, razlog: "bolest", dana: 10 },
    esperado: { ukupno: 43333.33, poslodavac: 43333.33, fond: 0 },
  },
  {
    nombre: "Četrdeset dana povrede na radu",
    origen: { tipo: "recalculado", url: ZZO, detalle: "100 %: 200.000 / 30 puta 30 = 200.000 poslodavac; puta 10 = 66.666,67 RFZO." },
    fecha: "2026-10-31",
    entrada: { zarada: 200000, razlog: "povreda", dana: 40 },
    esperado: { poslodavac: 200000, fond: 66666.67, ukupno: 266666.67 },
  },
  {
    nombre: "Niska zarada podiže se na minimalnu",
    origen: { tipo: "recalculado", url: ZZO, detalle: "65 % od 100.000 je ispod bruto minimalca 87.206,71; 87.206,71 / 30 puta 15 = 43.603,36." },
    fecha: "2026-10-31",
    entrada: { zarada: 100000, razlog: "bolest", dana: 15 },
    esperado: { ukupno: 43603.36 },
    tolerancia: 0.02,
  },
]);
