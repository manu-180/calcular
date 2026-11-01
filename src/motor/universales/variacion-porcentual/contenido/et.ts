import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  const subida = ((despues - antes) / antes) * 100;
  const vuelta = ((despues - antes) / despues) * 100;
  return {
    h1: "Arvuta protsendimuutus",
    title: tituloQueEntre(
      `Protsendimuutus: arvuta tõus või langus protsentides | ${ctx.nombrePais}`,
      `Protsendimuutus | ${ctx.nombrePais}`,
      "Protsendimuutus",
    ),
    description: "Arvuta, mitu protsenti on väärtus tõusnud või langenud. Sobib hindade, palga, müügi ja iga muu muutunud arvu jaoks.",
    intro: [
      "Sisesta algne ja uus väärtus. Näed tõusu või langust protsentides ning nende vahet.",
      "Näed ka, kui palju peab väärtus muutuma, et jõuda tagasi algsele tasemele. See ei ole peaaegu kunagi sama protsent.",
    ],
    comoSeCalcula: [
      "Protsendimuutus = (uus väärtus − algne väärtus) ÷ algne väärtus × 100.",
      "Positiivne tulemus tähendab tõusu ja negatiivne langust.",
      "Kui algne väärtus on negatiivne, jagatakse selle absoluutväärtusega. Nii näitab märk endiselt, kas olukord paranes.",
    ],
    ejemplo: [
      `Toode, mis maksis ${m(antes)} ja maksab nüüd ${m(despues)}, on kallinenud ${c(subida)}%.`,
      `Et hind jõuaks tagasi endisele tasemele, peab see langema ${c(vuelta)}%, mitte ${c(subida)}%.`,
    ],
    faq: [
      {
        pregunta: "Kuidas arvutada tõusu protsentides?",
        respuesta: `Lahuta uuest väärtusest algne väärtus, jaga vahe algse väärtusega ja korruta sajaga. Kui väärtus oli 80 ja on nüüd 100, on muutus 20 ÷ 80 × 100 = ${c((20 / 80) * 100)}%.`,
      },
      {
        pregunta: "Kuidas arvutada langust protsentides?",
        respuesta: `Samamoodi. Kui väärtus oli 100 ja on nüüd 80, on muutus −20 ÷ 100 × 100 = −${c(20)}%, ehk väärtus langes ${c(20)}%.`,
      },
      {
        pregunta: "Miks ei tühista 25% tõus ja 25% langus teineteist?",
        respuesta: `Protsendid arvutatakse erinevatest põhiväärtustest. 80 pluss 25% on ${c(80 * 1.25)}, aga 100 miinus 25% on ${c(100 * 0.75)}.`,
      },
      {
        pregunta: "Mis vahe on protsendil ja protsendipunktil?",
        respuesta: `Kui intressimäär oli 10% ja on nüüd 12%, tõusis see ${c(12 - 10)} protsendipunkti. Protsentides on muutus ${c(((12 - 10) / 10) * 100)}%.`,
      },
    ],
    glosario: [
      { termino: "Protsendimuutus", definicion: "Kui palju on väärtus muutunud protsentides algsest väärtusest." },
      { termino: "Protsendipunkt", definicion: "Kahe protsendimäära otsene vahe." },
    ],
  };
};
