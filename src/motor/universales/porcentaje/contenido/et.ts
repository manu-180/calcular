import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Protsendikalkulaator",
    title: tituloQueEntre(
      `Protsendikalkulaator: arvuta protsendid lihtsalt | ${ctx.nombrePais}`,
      `Protsendikalkulaator | ${ctx.nombrePais}`,
      "Protsendikalkulaator",
    ),
    description: "Arvuta, kui palju on X protsenti arvust, mitu protsenti on üks arv teisest ja mis juhtub, kui lisad või lahutad protsente.",
    intro: [
      "Vali, mida tahad teada, sisesta kaks arvu ja saad vastuse kohe.",
      "Kalkulaatoris on neli kõige tavalisemat igapäevast protsendiarvutust: osa, protsent, hinnatõus ja allahindlus.",
    ],
    comoSeCalcula: [
      "X% arvust Y = X × Y ÷ 100.",
      "Mitu protsenti on X arvust Y = X ÷ Y × 100.",
      "Y pluss X% = Y × (1 + X ÷ 100). Y miinus X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15% arvust 200 on ${c((15 * 200) / 100)}.`,
      `30 on ${c((30 / 120) * 100)}% arvust 120.`,
      `Kui hind on ${m(precio)} ja see tõuseb 10%, on uus hind ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Kuidas arvutada protsenti arvust?",
        respuesta: `Korruta arv protsendimääraga ja jaga sajaga. 20% arvust 350 on 350 × 20 ÷ 100 = ${c((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Kuidas arvutada, mitu protsenti on üks arv teisest?",
        respuesta: `Jaga osa tervikuga ja korruta sajaga. Kui saad testis 60 võimalikust punktist 45, on see 45 ÷ 60 × 100 = ${c((45 / 60) * 100)}%.`,
      },
      {
        pregunta: "Kuidas lisada hinnale protsente?",
        respuesta: `Korruta hind arvuga, mis on 1 pluss protsent kümnendmurruna. Kui lisad 10%, on kordaja ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Kas arv jõuab tagasi algväärtuseni, kui see kõigepealt kasvab 10% ja siis kahaneb 10%?",
        respuesta: `Ei jõua. 100 pluss 10% on ${c(110)}, aga ${c(110)} miinus 10% on ${c(110 * 0.9)}. Vähenemine arvutatakse suuremast arvust.`,
      },
    ],
    glosario: [
      { termino: "Protsent", definicion: "Sajandik. Osa, mida väljendatakse sajandikes." },
      { termino: "Põhiväärtus", definicion: "Arv, millest protsent arvutatakse (selles kalkulaatoris Y)." },
    ],
  };
};
