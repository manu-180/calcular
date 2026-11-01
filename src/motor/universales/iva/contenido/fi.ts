import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `Alv-laskuri: ${ctx.nombrePais}`,
    title: tituloQueEntre(
      `Alv-laskuri (${tasa}): laske arvonlisävero | ${ctx.nombrePais}`,
      `Alv-laskuri (${tasa}) | ${ctx.nombrePais}`,
      `Alv-laskuri (${tasa})`,
    ),
    description: `Lisää tai poista arvonlisävero (${tasa}) mistä tahansa hinnasta yhdellä kertaa. Näet verottoman hinnan, veron määrän ja verollisen hinnan.`,
    intro: [
      `Laskuri käyttää yleistä arvonlisäverokantaa ${tasa}. Maa: ${ctx.nombrePais}.`,
      "Valitse, lisäätkö veron verottomaan hintaan vai poistatko sen hinnasta, jossa vero on jo mukana. Syötä sitten summa.",
    ],
    comoSeCalcula: [
      "Alv:n lisääminen: vero = veroton hinta × verokanta ÷ 100. Verollinen hinta = veroton hinta + vero.",
      "Alv:n poistaminen: veroton hinta = verollinen hinta ÷ (1 + verokanta ÷ 100). Vero on näiden erotus.",
      "Jos tuotteeseen sovelletaan alennettua verokantaa, syötä se kohtaan ”Muu verokanta”.",
    ],
    ejemplo: [
      `Kun lisäät veron hintaan ${precio}, kerro summa verokannalla ${tasa} ja lisää tulos hintaan.`,
      `Kun haluat tietää, paljonko veroa hintaan ${precio} sisältyy, jaa summa luvulla 1 plus verokanta ja vähennä tulos hinnasta ${precio}.`,
    ],
    faq: [
      {
        pregunta: "Miten arvonlisävero poistetaan hinnasta?",
        respuesta: "Jaa hinta luvulla 1 plus verokanta desimaalilukuna. Tulos on veroton hinta, ja erotus on arvonlisävero.",
      },
      {
        pregunta: "Miksi verokantaa ei voi vain vähentää verollisesta hinnasta?",
        respuesta: "Koska vero laskettiin pienemmästä, verottomasta hinnasta. Jos vähennät prosentin verollisesta hinnasta, vähennät liikaa.",
      },
      {
        pregunta: `Koskeeko ${tasa} kaikkea?`,
        respuesta: "Ei aina. Elintarvikkeisiin, kirjoihin, henkilöliikenteeseen ja joihinkin palveluihin voidaan soveltaa alennettua verokantaa, tai ne voivat olla verottomia. Käytä silloin kohtaa ”Muu verokanta”.",
      },
    ],
    glosario: [
      { termino: "Arvonlisävero (alv)", definicion: "Vero, joka lisätään tavaroiden ja palvelujen hintaan." },
      { termino: "Veroton hinta", definicion: "Hinta ennen kuin arvonlisävero on lisätty." },
    ],
  };
};
