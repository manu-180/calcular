import { definirCasos } from "@/motor/calculo";
import csaladiPotlekKalkulator from "./csaladi-potlek-kalkulator";

const CST = "https://njt.jog.gov.hu/jogszabaly/1998-84-00-00";

export default definirCasos(csaladiPotlekKalkulator, [
  {
    nombre: "Két gyermek",
    origen: { tipo: "oficial", url: CST, detalle: "11. § (1): kétgyermekes család, gyermekenként 13 300; havonta 26 600." },
    fecha: "2026-10-24",
    entrada: { gyerekek: 2, beteg: 0, egyedulallo: false },
    esperado: { gyermekenkent: 13300, havi: 26600, eves: 319200 },
  },
  {
    nombre: "Három gyermek, egyedülálló szülő",
    origen: { tipo: "oficial", url: CST, detalle: "11. § (1): gyermekenként 17 000; 3 × 17 000 = 51 000." },
    fecha: "2026-10-24",
    entrada: { gyerekek: 3, beteg: 0, egyedulallo: true },
    esperado: { havi: 51000 },
  },
  {
    nombre: "Három gyermek, egyikük tartósan beteg",
    origen: { tipo: "recalculado", url: CST, detalle: "2 × 16 000 + 23 300 = 55 300." },
    fecha: "2026-10-24",
    entrada: { gyerekek: 3, beteg: 1, egyedulallo: false },
    esperado: { havi: 55300, betegre: 23300 },
  },
  {
    nombre: "Egy gyermek",
    origen: { tipo: "oficial", url: CST, detalle: "11. § (1): egygyermekes család 12 200." },
    fecha: "2026-10-24",
    entrada: { gyerekek: 1, beteg: 0, egyedulallo: false },
    esperado: { havi: 12200, betegre: null },
  },
]);
