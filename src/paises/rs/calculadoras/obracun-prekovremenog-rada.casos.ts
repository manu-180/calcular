import { definirCasos } from "@/motor/calculo";
import obracunPrekovremenogRada from "./obracun-prekovremenog-rada";

const RAD = "https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2005/24/1/reg";

export default definirCasos(obracunPrekovremenogRada, [
  {
    nombre: "Deset prekovremenih časova",
    origen: { tipo: "recalculado", url: RAD, detalle: "130.500 / 174 = 750; 750 puta 10 = 7.500; uvećanje 26 % = 1.950; ukupno 9.450." },
    fecha: "2026-10-31",
    entrada: { bruto: 130500, casovaMesecno: 174, prekovremeni: 10, nedeljno: 5, nocni: false, praznik: false },
    esperado: { ukupno: 9450, cenaCasa: 750, procenat: 26, uvecanje: 1950 },
  },
  {
    nombre: "Noću i na praznik se procenti sabiraju",
    origen: { tipo: "recalculado", url: RAD, detalle: "Čl. 108 st. 3: 26 + 26 + 110 = 162 %; 750 puta 2 = 1.500; uvećanje 2.430; ukupno 3.930." },
    fecha: "2026-10-31",
    entrada: { bruto: 130500, casovaMesecno: 174, prekovremeni: 2, nedeljno: 2, nocni: true, praznik: true },
    esperado: { ukupno: 3930, procenat: 162 },
  },
]);
