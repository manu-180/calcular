import { definirCasos } from "@/motor/calculo";
import tyonantajanSivukulut from "./tyonantajan-sivukulut";

const ETK = "https://www.etk.fi/wp-content/uploads/2026/01/lakisaateiset-sosiaalivakuutusmaksut-suomessa-2026-suomi-1.pdf";

export default definirCasos(tyonantajanSivukulut, [
  {
    nombre: "3 000 euroa, pieni yritys, keskimääräinen TyEL",
    origen: { tipo: "recalculado", url: ETK, detalle: "TyEL 17,10 % = 513,00; työttömyys 0,31 % = 9,30; sairausvakuutus 1,91 % = 57,30. Yhteensä 579,60 ja kustannus 3 579,60." },
    fecha: "2026-10-24",
    entrada: { palkka: 3000, palkkasumma: "pieni", tyel: null, tapaturma: null },
    esperado: { sivukulut: 579.6, kokonais: 3579.6, vuodessa: 42955.2 },
  },
  {
    nombre: "4 000 euroa, suuri yritys, oma TyEL 16,5 % ja tapaturma 0,6 %",
    origen: { tipo: "recalculado", url: ETK, detalle: "TyEL 16,5 % = 660; työttömyys 1,23 % = 49,20; sairausvakuutus 1,91 % = 76,40; tapaturma 0,6 % = 24. Yhteensä 809,60." },
    fecha: "2026-10-24",
    entrada: { palkka: 4000, palkkasumma: "suuri", tyel: 16.5, tapaturma: 0.6 },
    esperado: { sivukulut: 809.6, kokonais: 4809.6 },
  },
]);
