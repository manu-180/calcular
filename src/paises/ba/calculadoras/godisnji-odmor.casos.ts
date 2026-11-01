import { definirCasos } from "@/motor/calculo";
import godisnjiOdmor from "./godisnji-odmor";

export default definirCasos(godisnjiOdmor, [
  {
    nombre: "FBiH, cijela godina",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/f0787-zakon-o-radu-precisceni-tekst.pdf", detalle: "Član 47: najmanje 20 radnih dana; naknada 2.000 / 22 x 20 = 1.818,18." },
    fecha: "2026-11-01",
    entrada: { region: "fbih", maloljetan: false, posebni: null, mjeseci: 12, plata: 2000 },
    esperado: { dani: 20, naknada: 1818.18 },
  },
  {
    nombre: "FBiH, maloljetni radnik",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/f0787-zakon-o-radu-precisceni-tekst.pdf", detalle: "Član 47: 24 radna dana." },
    fecha: "2026-11-01",
    entrada: { region: "fbih", maloljetan: true, posebni: null, mjeseci: 12, plata: 2000 },
    esperado: { dani: 24 },
  },
  {
    nombre: "RS, posebni uslovi rada",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-radu", detalle: "Član 80 stav 3: najmanje 30 radnih dana." },
    fecha: "2026-11-01",
    entrada: { region: "rs", maloljetan: null, posebni: true, mjeseci: 12, plata: 2000 },
    esperado: { dani: 30 },
  },
  {
    nombre: "RS, šest mjeseci",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-radu", detalle: "20 x 6 / 12 = 10." },
    fecha: "2026-11-01",
    entrada: { region: "rs", maloljetan: null, posebni: false, mjeseci: 6, plata: 2200 },
    esperado: { dani: 10, naknada: 1000 },
  },
]);
