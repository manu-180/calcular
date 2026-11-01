import { definirCasos } from "@/motor/calculo";
import pausalneVydavky from "./pausalne-vydavky";

const V = "https://podpora.financnasprava.sk/270033-V%C3%BDdavky-percentom-z-pr%C3%ADjmov-";
const S = "https://podpora.financnasprava.sk/081400-Sadzba-dane-z-pr%C3%ADjmov-fyzickej-osoby-za-rok-2026";

export default definirCasos(pausalneVydavky, [
  {
    nombre: "Príjem 30 000 eur, paušál pod stropom",
    origen: { tipo: "recalculado", url: V, detalle: "Paušál 60 % = 18 000; základ 6 000; po 5 966,73 ostáva 33,27; 15 % = 4,99." },
    fecha: "2026-06-15",
    entrada: { prijmy: 30000, odvody: 6000 },
    esperado: { pausal: 18000, zaklad: 6000, dan: 4.99 },
  },
  {
    nombre: "Príjem 60 000 eur, strop paušálu 20 000 eur",
    origen: { tipo: "recalculado", url: V, detalle: "Základ 60 000 − 20 000 − 8 000 = 32 000; NČZD 14 661,11 − 32 000 / 3 = 3 994,44; 28 005,56 × 15 % = 4 200,83." },
    fecha: "2026-06-15",
    entrada: { prijmy: 60000, odvody: 8000 },
    esperado: { pausal: 20000, nczd: 3994.44, dan: 4200.83 },
  },
  {
    nombre: "Príjem nad 100 000 eur: pásma namiesto 15 %",
    origen: { tipo: "recalculado", url: S, detalle: "Základ 90 000, NČZD 0; 8 356,8308 + 4 091,4725 + 4 398,333 + 5 246,388 = 22 093,02." },
    fecha: "2026-06-15",
    entrada: { prijmy: 120000, odvody: 10000 },
    esperado: { zaklad: 90000, nczd: 0, dan: 22093.02 },
  },
]);
