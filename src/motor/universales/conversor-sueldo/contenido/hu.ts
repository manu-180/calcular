import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "Órabér kalkulátor",
    title: tituloQueEntre(`Órabér kalkulátor (${ctx.nombrePais})`, `Órabér és havi bér átszámítás (${ctx.nombrePais})`, "Órabér kalkulátor"),
    description: "Órabér kalkulátor: számold át a béredet órabér, napibér, heti, félhavi, havi és éves bér között a valódi munkaóráid és fizetett heteid alapján.",
    intro: [
      "Mennyi a fizetésed óránként? Mennyit ér évente egy órabéres ajánlat? Írj be egy összeget, válaszd ki az időszakot, és az összes többit megmutatjuk.",
      "Jól jön állásajánlatok összehasonlításához, a túlóra árazásához, vagy ha tudni szeretnéd, mennyit ér az időd.",
    ],
    comoSeCalcula: [
      "Először mindent éves összegre számolunk át.",
      "Órabér = éves bér ÷ (heti órák × fizetett hetek).",
      "Napibér = éves bér ÷ (heti napok × fizetett hetek). Heti bér = éves bér ÷ fizetett hetek.",
      "Havi bér = éves bér ÷ 12. Félhavi bér = éves bér ÷ 24.",
    ],
    ejemplo: [
      `Éves bér: ${m(anual)}, heti 40 óra munkával. Ez óránként ${m(anual / 2080)}, havonta ${m(anual / 12)}.`,
      `Egy teljes munkaidős ajánlat órabére: ${m(hora)}. Ez évente ennyi: ${m(hora * 2080)}.`,
    ],
    faq: [
      {
        pregunta: "Hány munkaóra van egy évben?",
        respuesta: `Heti 40 órával és 52 fizetett héttel ennyi: ${formatearNumero(ctx, 2080)} óra. Ezért gyors becsléshez az órabért nagyjából ennyivel érdemes szorozni: ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Miért nem jön ki a havi bér, ha a heti bért néggyel szorzom?",
        respuesta: `Mert egy átlagos hónap nem 4 hét, hanem ennyi: ${formatearNumero(ctx, 52 / 12, 2)}. Heti bérből havit úgy kapsz, hogy ötvenkettővel szorzol, és tizenkettővel osztasz.`,
      },
      {
        pregunta: "Benne vannak a prémiumok vagy az adók?",
        respuesta: "Nem. Ugyanazt az összeget számolja át más időszakokra. Ha prémiumot is kapsz, az ajánlatok összehasonlításakor külön add hozzá.",
      },
    ],
    glosario: [
      { termino: "Bruttó bér", definicion: "A bér adók és járulékok levonása előtt." },
      { termino: "Félhavi bér", definicion: "Havonta kétszer, évente 24 alkalommal fizetett bér." },
    ],
  };
};
