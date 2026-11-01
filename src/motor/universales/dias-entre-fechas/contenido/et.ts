import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Arvuta päevad kahe kuupäeva vahel",
    title: tituloQueEntre(
      `Päevade kalkulaator: arvuta päevad kuupäevade vahel | ${ctx.nombrePais}`,
      `Päevade kalkulaator | ${ctx.nombrePais}`,
      "Päevade kalkulaator",
    ),
    description: "Arvuta, mitu päeva on kahe kuupäeva vahel. Näed kalendripäevi, nädalaid, kuid ja tööpäevi esmaspäevast reedeni.",
    intro: [
      "Vali alguskuupäev ja lõppkuupäev. Näed kalendripäevi, sama aega nädalates ja kuudes ning tööpäevade arvu.",
      "Kasuta kalkulaatorit tähtaegade, maksepäevade, puhkuste, raseduse või tagasiloenduse jaoks.",
    ],
    comoSeCalcula: [
      "Kalendripäevad on kõik päevad kahe kuupäeva vahel. Alguskuupäev läheb arvesse, lõppkuupäev ainult siis, kui selle valid.",
      "Tööpäevad on sama perioodi päevad esmaspäevast reedeni. Riigipühi maha ei arvata.",
      "Liigaasta 29. veebruar läheb arvesse.",
    ],
    ejemplo: [
      `Kui alguskuupäev on ${f(desde)} ja lõppkuupäev ${f(hasta)}, jääb nende vahele ${n(dias)} kalendripäeva.`,
      `Neist ${n(habiles)} on tööpäevad esmaspäevast reedeni.`,
    ],
    faq: [
      {
        pregunta: "Kas esimene või viimane päev läheb arvesse?",
        respuesta: "Vaikimisi läheb esimene päev arvesse ja viimane mitte, nagu siis, kui lahutad ühe kuupäeva teisest. Kui vajad mõlemat, vali „Arvesta ka lõppkuupäev“.",
      },
      {
        pregunta: "Kas riigipühad arvatakse tööpäevade hulgast maha?",
        respuesta: "Ei. Tööpäevad loetakse esmaspäevast reedeni. Riigipühad erinevad riigiti, piirkonniti ja aastati, seega arva need ise maha.",
      },
      {
        pregunta: "Mitu päeva on aastas?",
        respuesta: "Aastas on 365 päeva, liigaastal 366. Seetõttu võib samade kuupäevade vahe olla eri aastatel erinev.",
      },
    ],
    glosario: [
      { termino: "Kalendripäevad", definicion: "Kõik kalendri päevad, sealhulgas nädalavahetused ja riigipühad." },
      { termino: "Tööpäevad", definicion: "Selles kalkulaatoris päevad esmaspäevast reedeni." },
    ],
  };
};
