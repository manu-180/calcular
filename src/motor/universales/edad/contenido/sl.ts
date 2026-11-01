import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionSl } from "../../dias-entre-fechas/textos/sl";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Izračun starosti",
    title: tituloQueEntre(`Koliko let imam: izračun starosti (${ctx.nombrePais})`, "Koliko let imam: izračun starosti", "Izračun starosti"),
    description: "Izračunajte natančno starost v letih, mesecih in dneh, koliko dni ste že preživeli in koliko jih je še do naslednjega rojstnega dne.",
    intro: [
      "Vnesite datum rojstva in dobili boste natančno starost na današnji dan, pa tudi starost v mesecih, tednih in dneh.",
      "Spremenite drugi datum, če želite izvedeti, koliko let je imel nekdo na določen dan ali koliko let bo dopolnil.",
    ],
    comoSeCalcula: [
      "Izračun šteje polne mesece od rojstva do izbranega datuma. Vsakih 12 mesecev je eno leto.",
      "Dnevi, ki ostanejo po zadnjem polnem mesecu, se starosti prištejejo kot dnevi.",
      "Prestopna leta imajo 366 dni.",
    ],
    ejemplo: [
      `Datum rojstva: ${fechaLarga(ctx.locale, nac)}. Izbrani dan: ${fechaLarga(ctx.locale, ref)}. Starost: natanko ${duracionSl(Math.floor(meses / 12), meses % 12, dias)}.`,
      `Skupno število dni: ${formatearNumero(ctx, total)}.`,
    ],
    faq: [
      {
        pregunta: "Kako se izračuna natančna starost?",
        respuesta: "Najprej se štejejo polna leta, nato polni meseci od zadnjega rojstnega dne in na koncu preostali dnevi.",
      },
      {
        pregunta: "Kaj velja za tiste, ki so rojeni 29. februarja?",
        respuesta: "V letih, ki niso prestopna, ta izračun za rojstni dan vzame 28. februar. Nekateri predpisi namesto tega uporabljajo 1. marec.",
      },
      {
        pregunta: "Koliko dni je minilo od mojega rojstva?",
        respuesta: "Poglejte vrstico „V dneh“. Šteje vsak dan od rojstva do izbranega datuma, brez zadnjega dne.",
      },
    ],
    glosario: [
      { termino: "Starost", definicion: "Število polnih let od rojstva." },
      { termino: "Prestopno leto", definicion: "Leto s 366 dnevi, v katerem obstaja 29. februar. Pride vsaka štiri leta, razen nekaterih let na prelomu stoletja." },
    ],
  };
};
