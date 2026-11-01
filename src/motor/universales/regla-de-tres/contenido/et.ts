import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Kolmreegel",
    title: tituloQueEntre(
      `Kolmreegel: lahenda võrdelisus kiiresti | ${ctx.nombrePais}`,
      `Kolmreegel | ${ctx.nombrePais}`,
      "Kolmreegel",
    ),
    description: "Lahenda otsene või pöördvõrdeline seos mõne sekundiga. Sisesta kolm väärtust, saad neljanda ja näed kogu arvutust.",
    intro: [
      "Kolmreegel töötab, kui kaks suurust sõltuvad teineteisest ja neljast väärtusest on kolm teada.",
      "Vali otsene võrdelisus või pöördvõrdelisus ning sisesta A, B ja C. Kalkulaator leiab X väärtuse.",
    ],
    comoSeCalcula: [
      "Otsene võrdelisus: X = B × C ÷ A. Seda kasutatakse, kui mõlemad suurused kasvavad koos (rohkem kilosid, kõrgem hind).",
      "Pöördvõrdelisus: X = A × B ÷ C. Seda kasutatakse, kui üks kasvab ja teine kahaneb (rohkem tegijaid, vähem päevi).",
    ],
    ejemplo: [
      `Kui 3 kilo maksab ${m(precio3)}, maksab 5 kilo ${m((precio3 * 5) / 3)}.`,
      `Kui 4 inimest värvivad maja 12 päevaga, kulub 6 inimesel selleks ${c((4 * 12) / 6)} päeva.`,
    ],
    faq: [
      {
        pregunta: "Kuidas aru saada, kas seos on otsene või pöördvõrdeline?",
        respuesta: "Kui üks suurus kasvab koos teisega, on seos otsene. Kui üks kahaneb, kui teine kasvab, on seos pöördvõrdeline.",
      },
      {
        pregunta: "Kuidas kolmreeglit käsitsi lahendada?",
        respuesta: `Korruta risti: korruta diagonaalis olevad teadaolevad väärtused omavahel ja jaga allesjäänud väärtusega. Kui 3 vastab väärtusele 600, siis 5 vastab väärtusele 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Kas kolmreegliga saab protsente arvutada?",
        respuesta: `Saab. Kui 200 on 100%, siis 50 on ${c((100 * 50) / 200)}%. See on otsene võrdelisus, kus A = 200, B = 100 ja C = 50.`,
      },
    ],
    glosario: [
      { termino: "Otsene võrdelisus", definicion: "Mõlemad suurused kasvavad või kahanevad samas suhtes." },
      { termino: "Pöördvõrdelisus", definicion: "Üks suurus kasvab, kui teine kahaneb." },
    ],
  };
};
