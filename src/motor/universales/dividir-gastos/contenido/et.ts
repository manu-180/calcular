import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kulude jagamine",
    title: tituloQueEntre(
      `Kulude jagamine: kes on kellele võlgu | ${ctx.nombrePais}`,
      `Kulude jagamine | ${ctx.nombrePais}`,
      "Kulude jagamine",
    ),
    description: "Jaga ühised kulud kuni 8 inimese vahel. Näed igaühe osa ja seda, kes maksab kellele, võimalikult väheste maksetega.",
    intro: [
      "Kasuta kalkulaatorit reisil, õhtusöögil, peol või ühisel suvilareisil, kui kõik on maksnud erineva summa.",
      "Sisesta, kui palju igaüks on maksnud. Saad igaühe osa ja maksed, millega kõik tasa saavad.",
    ],
    comoSeCalcula: [
      "Osa = kulud kokku ÷ inimeste arv.",
      "Kes on maksnud oma osast vähem, võlgneb vahe. Kes on maksnud rohkem, saab raha tagasi.",
      "Maksed liiguvad suurimast võlast suurima saadavani, nii et asjatuid ülekandeid pole vaja.",
    ],
    ejemplo: [
      `Anna maksis ${m(a)}, Mart maksis ${m(b)} ja Sara ei maksnud midagi. Kulud on kokku ${m(a + b)}, nii et igaühe osa on ${m(cuota)}.`,
      `Sara maksab Annale ${m(cuota)} ja Mart maksab Annale ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Kuidas jagada arvet, kui kõik on maksnud erineva summa?",
        respuesta: "Liida kõik kulud kokku, jaga inimeste arvuga ja võrdle tulemust sellega, mida igaüks on maksnud. Vahe näitab, kui palju inimene võlgneb või tagasi saab.",
      },
      {
        pregunta: "Mis siis, kui keegi pole midagi maksnud?",
        respuesta: "Sisesta tema väljale 0, siis arvestatakse ta jagamisse. Kui jätad välja tühjaks, teda ei arvestata.",
      },
      {
        pregunta: "Miks on makseid vähem kui inimesi?",
        respuesta: "Võlad liidetakse kokku. Kõige suurema võlaga inimene maksab sellele, kes on kõige rohkem maksnud, ja nii edasi. Makseid pole kunagi vaja rohkem kui inimeste arv miinus üks.",
      },
    ],
    glosario: [
      { termino: "Osa", definicion: "Summa, mille igaüks ühistest kuludest maksab." },
      { termino: "Saldo", definicion: "Vahe selle vahel, mida inimene on maksnud, ja tema osa vahel." },
    ],
  };
};
