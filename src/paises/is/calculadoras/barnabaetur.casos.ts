import { definirCasos } from "@/motor/calculo";
import calc from "./barnabaetur";

export default definirCasos(calc, [
  {
    nombre: "Einstætt foreldri, tvö börn, annað yngra en 7 ára",
    origen: { tipo: "recalculado", detalle: "Yfir mörkum 156.000. 1.029.000 - 6.240 = 1.022.760. 130.000 - 6.240 = 123.760. Alls 1.146.520." },
    fecha: "2026-06-15",
    entrada: { stada: "einstaett", tekjur: 6000000, born: 2, yngri: 1 },
    esperado: { skerding: 12480, samtals: 1146520 },
  },
  {
    nombre: "Hjón undir mörkum",
    origen: { tipo: "recalculado", detalle: "2 x 345.000 = 690.000, engin skerðing." },
    fecha: "2026-06-15",
    entrada: { stada: "hjon", tekjur: 11000000, born: 2, yngri: 0 },
    esperado: { samtals: 690000, skerding: 0 },
  },
  {
    nombre: "Hjón langt yfir mörkum",
    origen: { tipo: "recalculado", detalle: "(40.000.000 - 11.688.000) x 4% = 1.132.480, meira en bæturnar." },
    fecha: "2026-06-15",
    entrada: { stada: "hjon", tekjur: 40000000, born: 1, yngri: 0 },
    esperado: { samtals: 0 },
  },
]);
