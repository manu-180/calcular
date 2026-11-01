import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const c = (x: number) => formatearCifra(ctx, x);
  const ponderado = (7 * 20 + 8 * 30 + 9 * 50) / (20 + 30 + 50);
  const simple = (7 + 8 + 9) / 3;
  return {
    h1: "Arvuta kaalutud keskmine",
    title: tituloQueEntre(
      `Kaalutud keskmine: arvuta keskmine kaaludega | ${ctx.nombrePais}`,
      `Kaalutud keskmine | ${ctx.nombrePais}`,
      "Kaalutud keskmine",
    ),
    description: "Arvuta tavaline või kaalutud keskmine kuni 10 väärtusest, kui iga väärtuse kaal on antud protsentides, ainepunktides või kordajana.",
    intro: [
      "Sisesta iga hinne või väärtus ja selle kaal. Näed kaalutud ja tavalist keskmist kõrvuti.",
      "Kalkulaator sobib kooli ja ülikooli hinnete jaoks ning iga keskmise jaoks, kus mõni väärtus loeb rohkem kui teised.",
    ],
    comoSeCalcula: [
      "Tavaline keskmine = väärtuste summa ÷ väärtuste arv.",
      "Kaalutud keskmine: korruta iga väärtus selle kaaluga, liida korrutised kokku ja jaga kaalude summaga.",
      "Kaalude summa ei pea olema 100, sest arvutuses jagatakse nende summaga.",
    ],
    ejemplo: [
      `Kui hinde 7 kaal on 20%, hinde 8 kaal 30% ja hinde 9 kaal 50%, on kaalutud keskmine ${n(ponderado)}.`,
      `Samade kolme hinde tavaline keskmine on ${n(simple)}. Hindel 9 on suurim kaal ja see tõstab kaalutud keskmist.`,
    ],
    faq: [
      {
        pregunta: "Kuidas kaalutud keskmist arvutatakse?",
        respuesta: "Korruta iga väärtus selle kaaluga, liida korrutised kokku ja jaga kaalude summaga.",
      },
      {
        pregunta: "Mis siis, kui kaalude summa ei ole 100%?",
        respuesta: `See ei ole probleem. Kui ühe aine eest saab 6 ainepunkti ja teise eest 4, kasuta kaaludena arve 6 ja 4. Arvutuses jagatakse kaalude summaga, siin ${c(6 + 4)}.`,
      },
      {
        pregunta: "Mis vahe on tavalisel ja kaalutud keskmisel?",
        respuesta: "Tavalises keskmises on kõigil väärtustel sama kaal. Kaalutud keskmises arvestatakse iga väärtust vastavalt selle kaalule.",
      },
    ],
    glosario: [
      { termino: "Kaal", definicion: "Kui palju väärtus lõplikku keskmist mõjutab." },
      { termino: "Kaalutud keskmine", definicion: "Keskmine, kus iga väärtus korrutatakse selle kaaluga." },
    ],
  };
};
