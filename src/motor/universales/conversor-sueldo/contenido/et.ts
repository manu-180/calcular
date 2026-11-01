import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mensual = montoEjemplo(ctx, 4000);
  const hora = montoEjemplo(ctx, 20);
  const horasAnio = 40 * 52;
  const horasMes = horasAnio / 12;
  return {
    h1: "Tunnipalk kuupalgaks ja vastupidi",
    title: tituloQueEntre(
      `Tunnipalk kuupalgaks: arvuta oma palk ümber | ${ctx.nombrePais}`,
      `Tunnipalk kuupalgaks | ${ctx.nombrePais}`,
      "Tunnipalk kuupalgaks",
    ),
    description: "Arvuta palk ümber tunni-, päeva-, nädala-, kuu- ja aastapalgaks, võttes aluseks oma töötunnid ja tasustatud nädalad.",
    intro: [
      "Kui palju on sinu kuupalk tunni kohta? Mida annab tunnipalk kuus või aastas? Sisesta summa ja vali periood, siis näed kõiki teisi.",
      "Kasuta kalkulaatorit tööpakkumiste võrdlemiseks, ületundide arvutamiseks või selleks, et näha, kui palju sinu aeg väärt on.",
    ],
    comoSeCalcula: [
      "Kõigepealt arvutatakse kõik ümber aastapalgaks.",
      "Tunnipalk = aastapalk ÷ (tunnid nädalas × tasustatud nädalad).",
      "Päevapalk = aastapalk ÷ (päevad nädalas × tasustatud nädalad). Nädalapalk = aastapalk ÷ tasustatud nädalad.",
      "Kuupalk = aastapalk ÷ 12. Palk poole kuu eest = aastapalk ÷ 24.",
    ],
    ejemplo: [
      `Kui kuupalk on ${m(mensual)} ja töönädal 40 tundi, on see tunnis ${m((mensual * 12) / horasAnio)} ja aastas ${m(mensual * 12)}.`,
      `Kui tunnipalk on ${m(hora)} ja töötad täistööajaga, on see kuus ${m(hora * horasMes)} ja aastas ${m(hora * horasAnio)}.`,
    ],
    faq: [
      {
        pregunta: "Mitu töötundi on aastas?",
        respuesta: `Kui nädalas on 40 tundi ja tasustatud nädalaid 52, on aastas ${formatearNumero(ctx, horasAnio)} tundi ehk kuus ${formatearNumero(ctx, horasMes, 1)} tundi.`,
      },
      {
        pregunta: "Kuidas arvutada tunnipalk kuupalgaks?",
        respuesta: `Korruta tunnipalk nädala töötundide arvuga ja arvuga 52, seejärel jaga tulemus arvuga 12. Täistööajaga töötades on see sama, mis korrutada tunnipalk arvuga ${formatearNumero(ctx, horasMes, 1)}.`,
      },
      {
        pregunta: "Miks ei ole nädalapalk korda 4 sama mis kuupalk?",
        respuesta: `Sest kuus on keskmiselt ${formatearNumero(ctx, 52 / 12, 2)} nädalat, mitte 4. Kui arvutad nädalapalga kuupalgaks, korruta see arvuga 52 ja jaga arvuga 12.`,
      },
      {
        pregunta: "Kas makse või lisatasusid arvestatakse?",
        respuesta: "Ei. Kalkulaator arvutab sama brutopalga ühelt perioodilt teisele. Kui saad lisatasusid või preemiaid, lisa need pakkumisi võrreldes eraldi.",
      },
    ],
    glosario: [
      { termino: "Brutopalk", definicion: "Palk enne makse ja muid kinnipidamisi." },
      { termino: "Täistööaeg", definicion: "Täielik tööaeg, siin arvestatud 40 tunnina nädalas." },
    ],
  };
};
