import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mensual = montoEjemplo(ctx, 4000);
  const hora = montoEjemplo(ctx, 20);
  const horasAnio = 40 * 52;
  const horasMes = horasAnio / 12;
  return {
    h1: "Tuntipalkka kuukausipalkaksi ja toisin päin",
    title: tituloQueEntre(
      `Tuntipalkka kuukausipalkaksi: muunna palkkasi | ${ctx.nombrePais}`,
      `Tuntipalkka kuukausipalkaksi | ${ctx.nombrePais}`,
      "Tuntipalkka kuukausipalkaksi",
    ),
    description: "Muunna palkka tuntipalkan, päiväpalkan, viikkopalkan, kuukausipalkan ja vuosipalkan välillä omilla työtunneillasi ja palkallisilla viikoillasi.",
    intro: [
      "Paljonko kuukausipalkkasi on tunnilta? Mitä tuntipalkka tekee kuukaudessa tai vuodessa? Syötä summa ja valitse jakso, niin näet kaikki muut.",
      "Käytä laskuria työtarjousten vertailuun, lisätuntien laskemiseen tai nähdäksesi, mitä aikasi on arvoinen.",
    ],
    comoSeCalcula: [
      "Ensin kaikki muunnetaan vuosipalkaksi.",
      "Tuntipalkka = vuosipalkka ÷ (tunnit viikossa × palkalliset viikot).",
      "Päiväpalkka = vuosipalkka ÷ (päivät viikossa × palkalliset viikot). Viikkopalkka = vuosipalkka ÷ palkalliset viikot.",
      "Kuukausipalkka = vuosipalkka ÷ 12. Palkka puolelta kuukaudelta = vuosipalkka ÷ 24.",
    ],
    ejemplo: [
      `${m(mensual)}:n kuukausipalkka 40 tunnin työviikolla vastaa ${m((mensual * 12) / horasAnio)} tunnilta ja ${m(mensual * 12)} vuodessa.`,
      `${m(hora)}:n tuntipalkka kokoaikatyössä tekee ${m(hora * horasMes)} kuukaudessa ja ${m(hora * horasAnio)} vuodessa.`,
    ],
    faq: [
      {
        pregunta: "Montako työtuntia vuodessa on?",
        respuesta: `Kun viikossa on 40 tuntia ja palkallisia viikkoja 52, vuodessa on ${formatearNumero(ctx, horasAnio)} tuntia eli ${formatearNumero(ctx, horasMes, 1)} tuntia kuukaudessa.`,
      },
      {
        pregunta: "Miten tuntipalkka muutetaan kuukausipalkaksi?",
        respuesta: `Kerro tuntipalkka viikkotunneilla ja luvulla 52 ja jaa tulos luvulla 12. Kokoaikatyössä se on sama kuin kertoisit tuntipalkan luvulla ${formatearNumero(ctx, horasMes, 1)}.`,
      },
      {
        pregunta: "Miksi viikkopalkka kertaa 4 ei ole kuukausipalkka?",
        respuesta: `Koska kuukaudessa on keskimäärin ${formatearNumero(ctx, 52 / 12, 2)} viikkoa, ei 4. Kun muutat viikkopalkan kuukausipalkaksi, kerro se luvulla 52 ja jaa luvulla 12.`,
      },
      {
        pregunta: "Otetaanko verot tai lisät huomioon?",
        respuesta: "Ei. Laskuri muuntaa saman bruttopalkan jaksosta toiseen. Jos saat lisiä tai bonuksia, lisää ne erikseen, kun vertailet tarjouksia.",
      },
    ],
    glosario: [
      { termino: "Bruttopalkka", definicion: "Palkka ennen veroja ja muita vähennyksiä." },
      { termino: "Kokoaikatyö", definicion: "Täysi työaika, tässä laskettuna 40 tunniksi viikossa." },
    ],
  };
};
