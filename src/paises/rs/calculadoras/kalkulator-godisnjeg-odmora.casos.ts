import { definirCasos } from "@/motor/calculo";
import kalkulatorGodisnjegOdmora from "./kalkulator-godisnjeg-odmora";

const RAD = "https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2005/24/1/reg";

export default definirCasos(kalkulatorGodisnjegOdmora, [
  {
    nombre: "Pola godine rada, 20 dana",
    origen: { tipo: "recalculado", url: RAD, detalle: "Čl. 72: 6/12 od 20 = 10 dana; neiskorišćeno 5; čl. 76: 120.000 puta 5 / 21 = 28.571,43." },
    fecha: "2026-10-31",
    entrada: { ukupnoDana: 20, meseci: 6, iskorisceno: 5, prosecnaZarada: 120000, radnihDana: 21 },
    esperado: { pripada: 10, ostalo: 5, naknada: 28571.43 },
  },
  {
    nombre: "Ceo godišnji odmor",
    origen: { tipo: "recalculado", url: RAD, detalle: "Čl. 69: 24 dana po ugovoru za punu godinu." },
    fecha: "2026-10-31",
    entrada: { ukupnoDana: 24, meseci: 12, iskorisceno: 0, prosecnaZarada: null, radnihDana: 21 },
    esperado: { pripada: 24, ostalo: 24 },
  },
]);
