import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Palgatõusu kalkulaator",
    title: tituloQueEntre(
      `Palgatõus: arvuta uus palk ja reaalne tõus | ${ctx.nombrePais}`,
      `Palgatõus | ${ctx.nombrePais}`,
      "Palgatõus",
    ),
    description: "Arvuta oma uus palk pärast tõusu, vahe kuus ja aastas ning vaata, kas tõus on inflatsioonist suurem ehk milline on reaalne palgatõus.",
    intro: [
      "Said palgapakkumise või lähed palgaläbirääkimistele. Sisesta palk ja tõus protsentides või summana, siis näed, kui palju muutub kuus ja aastas.",
      "Lisa perioodi inflatsioon, siis näed, kas sinu ostujõud päriselt kasvab või jääd lihtsalt samale tasemele.",
    ],
    comoSeCalcula: [
      "Uus palk = praegune palk × (1 + tõus ÷ 100).",
      "Vahe aastas = vahe kuus × palkade arv aastas.",
      "Reaalne tõus = (1 + tõus) ÷ (1 + inflatsioon) − 1.",
    ],
    ejemplo: [
      `Kui kuupalk on ${m(sueldo)} ja tõus 5%, on uus palk ${m(sueldo * 1.05)}. See on kuus ${m(sueldo * 0.05)} ja aastas ${m(sueldo * 0.05 * 12)} rohkem.`,
      `Kui inflatsioon oli perioodil 3%, on reaalne tõus ${p(aumentoReal(5, 3))}. Kui inflatsioon oli 6%, on see ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Mida tähendab reaalne palgatõus?",
        respuesta: "See on palgatõus pärast inflatsiooni. See näitab, kas uue palga eest saad rohkem või vähem kui varem.",
      },
      {
        pregunta: "Miks ei saa inflatsiooni lihtsalt tõusust lahutada?",
        respuesta: `Sest protsendid korrutatakse, mitte ei liideta. Kui palgatõus on 5% ja inflatsioon 3%, on reaalne tõus ${p(aumentoReal(5, 3))}, mitte ${formatearCifra(ctx, 5 - 3)}%. Kõrge inflatsiooni korral kasvab vahe palju suuremaks.`,
      },
      {
        pregunta: "Kui suurt palgatõusu tasub küsida?",
        respuesta: "Vähemalt nii palju, kui inflatsioon on sinu eelmisest palgatõusust saadik olnud, et sa maha ei jääks. Lisaks saad palvet põhjendada sellega, mida teised tööandjad sarnase töö eest maksavad ja kuidas sinu ülesanded on kasvanud.",
      },
    ],
    glosario: [
      { termino: "Nominaalne tõus", definicion: "Tõus sellisena, nagu see palgateatisel paistab, enne inflatsiooni." },
      { termino: "Ostujõud", definicion: "See, mida sa oma palga eest saad." },
    ],
  };
};
