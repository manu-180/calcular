import { definirCasos } from "@/motor/calculo";
import calculadora from "./btw-berekenen";

const BTW = "https://belastingdienst.sr/wp-content/uploads/2026/01/BTWS.B.-2022-no.-121-WET-BTW-2022.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "10% erbij op SRD 1.000",
    origen: { tipo: "recalculado", url: BTW, detalle: "Artikel 4 lid 1: 10%. 1.000 × 10% = 100; inclusief 1.100." },
    fecha: "2026-10-27",
    entrada: { bedrag: 1000, richting: "erbij", tarief: "algemeen" },
    esperado: { btw: 100, zonder: 1000, met: 1100, tarief: 10 },
  },
  {
    nombre: "10% eruit halen uit SRD 1.100",
    origen: { tipo: "recalculado", detalle: "1.100 / 1,10 = 1.000; btw 100." },
    fecha: "2026-10-27",
    entrada: { bedrag: 1100, richting: "eraf", tarief: "algemeen" },
    esperado: { btw: 100, zonder: 1000 },
  },
  {
    nombre: "5% eruit halen uit SRD 525",
    origen: { tipo: "recalculado", url: "https://belastingdienst.sr/wp-content/uploads/2026/01/BTWS.B.-2022-no.-148-nadere-wijziging-WET-BTW-30-december-2022.pdf", detalle: "525 / 1,05 = 500; btw 25." },
    fecha: "2026-10-27",
    entrada: { bedrag: 525, richting: "eraf", tarief: "verlaagd" },
    esperado: { btw: 25, zonder: 500, tarief: 5 },
  },
  {
    nombre: "25% erbij op SRD 1.000",
    origen: { tipo: "recalculado", url: BTW, detalle: "Artikel 4 lid 3: 25% voor goederen uit bijlage 3. 1.000 × 25% = 250." },
    fecha: "2026-10-27",
    entrada: { bedrag: 1000, richting: "erbij", tarief: "verhoogd" },
    esperado: { btw: 250, met: 1250 },
  },
  {
    nombre: "10% eruit halen uit SRD 999",
    origen: { tipo: "recalculado", detalle: "999 / 1,10 = 908,1818 → 908,18; btw 90,82." },
    fecha: "2026-10-27",
    entrada: { bedrag: 999, richting: "eraf", tarief: "algemeen" },
    esperado: { btw: 90.82, zonder: 908.18 },
  },
  {
    nombre: "0% bij export",
    origen: { tipo: "recalculado", detalle: "0%: bedrag blijft gelijk." },
    fecha: "2026-10-27",
    entrada: { bedrag: 500, richting: "erbij", tarief: "nul" },
    esperado: { btw: 0, met: 500 },
  },
]);
