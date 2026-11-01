import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Liitintressi kalkulaator",
    title: tituloQueEntre(
      `Liitintress: arvuta, kuidas su säästud kasvavad | ${ctx.nombrePais}`,
      `Liitintressi kalkulaator | ${ctx.nombrePais}`,
      "Liitintressi kalkulaator",
    ),
    description: "Vaata, kuidas su raha kasvab liitintressi ja igakuiste säästudega. Näed lõppsummat, tootluse osa ja tabelit aasta aastalt.",
    intro: [
      "Liitintressi puhul lisatakse intress saldole ja see hakkab ise intressi kasvatama. Seepärast kasvavad säästud seda kiiremini, mida kauem nad saavad kasvada.",
      "Sisesta, kui palju sul praegu on, kui palju suudad kuus säästa, intress ja aastate arv. Näed lõppsummat ja seda, kui suur osa sellest on tootlus.",
    ],
    comoSeCalcula: [
      "Lõppsumma = algsumma × (1 + i) astmes n + igakuine sääst × ((1 + i) astmes n − 1) ÷ i.",
      "Siin on i kuu intressimäär, mis vastab sinu valitud arvestusviisile, ja n on kuude arv.",
      "Igakuine sääst lisatakse iga kuu lõpus.",
    ],
    ejemplo: [
      `Kui sinu algsumma on ${m(capital)} ja säästad kuus ${m(aporte)} aastatootlusega 7%, on sul 10 aasta pärast ${m(a10)}.`,
      `Kui jätkad veel 10 aastat, on saldo juba ${m(a20)}. Teine kümnend annab tunduvalt rohkem kui esimene.`,
    ],
    faq: [
      {
        pregunta: "Mis vahe on lihtintressil ja liitintressil?",
        respuesta:
          "Lihtintressi arvestatakse alati algsummalt. Liitintressi arvestatakse summalt, millele on juba saadud intressid lisatud.",
      },
      {
        pregunta: "Mis on reegel 72?",
        respuesta: `Kiire viis hinnata, kui kaua raha kahekordistumine kestab. Jaga arv 72 aastaintressiga. Intressiga 6% kahekordistub raha umbes ${formatearCifra(ctx, 72 / 6, 0)} aasta jooksul.`,
      },
      {
        pregunta: "Millise intressiga tasub arvutada?",
        respuesta:
          "Sellisega, mis on realistlik selle jaoks, mida rahaga teha kavatsed. Kui tahad näha tulemust tänases rahas, kasuta intressi, millest on maha arvatud oodatav inflatsioon.",
      },
    ],
    glosario: [
      { termino: "Intressi arvestamine", definicion: "Kui tihti lisatakse intress saldole." },
      { termino: "Liitintress", definicion: "Intress, mida arvestatakse saldolt koos sellele juba lisatud intressidega." },
    ],
  };
};
