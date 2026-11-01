import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSl } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  const horas = Math.round(r.horas);
  return {
    h1: "Izračun urne postavke za samostojne podjetnike",
    title: tituloQueEntre(
      `Urna postavka za samostojne podjetnike: kalkulator ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Koliko zaračunati uro dela: izračun urne postavke",
      "Izračun urne postavke",
    ),
    description:
      "Izračunajte urno in dnevno postavko kot samostojni podjetnik glede na želeni zaslužek, ob upoštevanju stroškov, davkov, prostih dni in obračunljivih ur.",
    intro: [
      "Najpogostejša napaka samostojnih podjetnikov je, da vzamejo plačo, ki bi si jo želeli kot zaposleni, in jo delijo s 160 urami. Pri tem manjkajo davki, stroški, dopust in vse ure, ki jih ni mogoče zaračunati.",
      "Ta kalkulator izhaja iz tega, koliko želite neto, in vam pove, koliko morate zaračunavati.",
    ],
    comoSeCalcula: [
      "Potrebni prihodki = neto dohodek ÷ (1 − davčna stopnja) + stroški poslovanja.",
      "Delovni dnevi = 52 tednov × delovni dnevi na teden − prosti dnevi.",
      "Obračunljive ure na leto = delovni dnevi × obračunljive ure na dan.",
      "Urna postavka = potrebni prihodki ÷ obračunljive ure na leto.",
    ],
    ejemplo: [
      `Če želite neto ${m(ingreso)} na leto, pri stroških v višini ${m(gastos)} in davkih 25 %, morate zaračunati ${m(r.facturado)}.`,
      `Pri 30 prostih dnevih in 25 obračunljivih urah na teden je to ${formatearNumero(ctx, horas)} ${formaSl(horas, "ura", "uri", "ure", "ur")} na leto: urna postavka ${m(r.hora)} ali dnevna postavka ${m(r.dia)}.`,
    ],
    faq: [
      {
        pregunta: "Koliko ur na teden lahko zaračunam?",
        respuesta:
          "Manj, kot jih delate. Iskanje strank, e-pošta, izdajanje računov in učenje vzamejo čas, ki vam ga nihče ne plača. Običajno je to 20 do 30 obračunljivih ur od 40.",
      },
      {
        pregunta: "Zaračunavati po urah ali po projektu?",
        respuesta: "Oba načina delujeta. Tudi ko date ceno za celoten projekt, ocenite število ur in ga pomnožite s to urno postavko, da ne boste delali z izgubo.",
      },
      {
        pregunta: "Katero davčno stopnjo uporabiti?",
        respuesta:
          "Odvisno je od države in oblike poslovanja. Seštejte dohodnino ter prispevke za pokojninsko in zdravstveno zavarovanje. Če niste prepričani, vprašajte računovodjo.",
      },
    ],
    glosario: [
      { termino: "Obračunljive ure", definicion: "Delovne ure, ki jih zaračunate stranki." },
      { termino: "Neto dohodek", definicion: "Kar vam ostane po davkih in stroških poslovanja." },
    ],
  };
};
