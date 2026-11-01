import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhDia = (1000 * 4) / 1000;
  const kwhMes = kwhDia * 30;
  return {
    h1: "Arvuta seadme elektrikulu ja hind",
    title: tituloQueEntre(
      `Elektrikulu: arvuta seadme tarbimine ja hind | ${ctx.nombrePais}`,
      `Elektrikulu kalkulaator | ${ctx.nombrePais}`,
      "Elektrikulu kalkulaator",
    ),
    description: "Arvuta, kui palju elektrit seade tarbib ja mis see maksab ööpäevas, kuus ja aastas võimsuse, kasutusaja ja kilovatt-tunni hinna järgi.",
    intro: [
      "Sisesta seadme võimsus, mitu tundi seda kasutatakse ja elektri hind kilovatt-tunni kohta oma elektriarvelt. Näed tarbimist ja kulu.",
      "Kalkulaatoriga näed, milline seade elektriarvel kõige rohkem kaalub: soojuspump, elektriradiaator, sügavkülmik, saun või arvuti.",
    ],
    comoSeCalcula: [
      `kWh ööpäevas = vatid × kasutustunnid ÷ ${n(1000)}.`,
      "kWh kuus = kWh ööpäevas × kasutuspäevad. Aasta tarbimine on kuu tarbimine korda 12.",
      "Kulu = kWh × elektri hind kWh kohta.",
    ],
    ejemplo: [
      `Seade võimsusega ${n(1000)} W, mida kasutatakse 4 tundi päevas, tarbib ${n(kwhDia)} kWh ööpäevas ja ${n(kwhMes)} kWh kuus.`,
      `Kui elekter maksab ${m(precio)} kilovatt-tunni eest, on seadme kasutamise kulu kuus ${m(kwhMes * precio)}.`,
    ],
    faq: [
      {
        pregunta: "Mis on kilovatt-tund?",
        respuesta: `Kilovatt-tund (kWh) on energia, mille seade võimsusega ${n(1000)} W tunni jooksul tarbib. Elektriarve arvestatakse kilovatt-tundides.`,
      },
      {
        pregunta: "Kas külmkapp töötab terve ööpäeva täisvõimsusel?",
        respuesta: "Ei. Kompressor lülitub vaheldumisi sisse ja välja. Selliste seadmete puhul on mõistlikum arvestada 8-10 tundi ööpäevas kui 24.",
      },
      {
        pregunta: "Miks tulemus ei vasta täpselt elektriarvele?",
        respuesta: "Arvele lisanduvad põhitasud, võrgutasu, maksud ja mõnikord tunniti muutuv hind. Kalkulaator näitab ainult seda, mida seade ise tarbib.",
      },
    ],
    glosario: [
      { termino: "Vatt (W)", definicion: "Võimsuse ühik ehk see, kui palju energiat seade igas sekundis kasutab." },
      { termino: "Kilovatt-tund (kWh)", definicion: `${n(1000)} vatti ühe tunni jooksul. Selle eest maksad elektriarvel.` },
    ],
  };
};
