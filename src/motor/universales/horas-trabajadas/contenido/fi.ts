import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const tuntia = (x: number) => `${n(x)} ${x === 1 ? "tunti" : "tuntia"}`;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Työaikalaskuri: tunnit ja viikon palkka",
    title: tituloQueEntre(
      `Työaikalaskuri: tunnit, tauot ja ylityö | ${ctx.nombrePais}`,
      `Työaikalaskuri | ${ctx.nombrePais}`,
      "Työaikalaskuri",
    ),
    description: "Laske viikon työtunnit aloitus- ja lopetusajan sekä taukojen perusteella ja näe palkkasi ylityö mukaan luettuna.",
    intro: [
      "Valitse jokaiselle päivälle aloitus ja lopetus, palkaton taukosi ja tuntipalkkasi. Näet tunnit yhteensä, ylityön ja viikon palkan.",
      "Käytä laskuria palkkalaskelman tarkistamiseen, tuntilistan täyttämiseen tai tuntityön laskuttamiseen.",
    ],
    comoSeCalcula: [
      "Tunnit päivässä = lopetusaika − aloitusaika − tauko. Jos lopetus on aikaisemmin kuin aloitus, vuoro päättyy seuraavana päivänä.",
      "Ylityö = viikon tunnit − säännöllinen työaika, kun viikon tunteja on enemmän.",
      "Palkka = säännölliset tunnit × tuntipalkka + ylityötunnit × tuntipalkka × (1 + ylityökorotus).",
    ],
    ejemplo: [
      `Kello ${hora("09:00")} alkava ja ${hora("17:30")} päättyvä työpäivä 30 minuutin tauolla tekee ${tuntia(jornada)} päivässä. Maanantaista perjantaihin se on ${tuntia(jornada * 5)}, ja ${m(pago)}:n tuntipalkalla ${m(jornada * 5 * pago)}.`,
      `Kello ${hora("08:00")} alkava ja ${hora("18:00")} päättyvä päivä tunnin tauolla tekee ${tuntia(larga * 5)} viikossa, joista ${n(extra)} on ylityötä. 50 %:n ylityökorotuksella palkka on ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Miten tehdyt työtunnit lasketaan?",
        respuesta: "Vähennä aloitusaika lopetusajasta ja vähennä tauko. Laske sitten yhteen viikon kaikki päivät.",
      },
      {
        pregunta: "Miten minuutit muutetaan desimaalitunneiksi?",
        respuesta: `Jaa minuutit luvulla 60. Puoli tuntia on ${n(0.5, 1)}, 15 minuuttia on ${n(0.25, 2)} ja 45 minuuttia on ${n(0.75, 2)}. Siis 7 tuntia ja 45 minuuttia on ${n(7.75, 2)} tuntia.`,
      },
      {
        pregunta: "Paljonko ylitöitä saa tehdä ja miten niistä maksetaan?",
        respuesta: "Se riippuu työpaikkasi maan laista, työehtosopimuksesta ja työsopimuksestasi. Laskuri käyttää syöttämääsi korotusta ja säännöllistä työaikaa eikä sovella mitään tiettyä sääntöä.",
      },
    ],
    glosario: [
      { termino: "Ylityö", definicion: "Säännöllisen työajan ylittävät tunnit, joista maksetaan korotettua palkkaa." },
      { termino: "Tauko", definicion: "Keskeytys työssä, jonka aikana olet vapaa ja josta ei yleensä makseta palkkaa." },
    ],
  };
};
