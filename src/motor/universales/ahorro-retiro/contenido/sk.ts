import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Kalkulačka sporenia na dôchodok",
    title: tituloQueEntre(`Sporenie na dôchodok: kalkulačka (${ctx.nombrePais})`, "Kalkulačka sporenia na dôchodok", "Sporenie na dôchodok"),
    description: "Zistite, koľko môžete mesačnými vkladmi nasporiť na dôchodok a aký mesačný príjem vám to prinesie, v dnešných cenách.",
    intro: [
      "Štátny dôchodok často nestačí na to, aby ste si udržali doterajšiu životnú úroveň. Vlastné úspory, aj malé, veľmi pomôžu, ak začnete včas.",
      "Zadajte svoj vek, kedy chcete ísť do dôchodku, koľko už máte a koľko môžete každý mesiac pridať. Ukážeme vám sumu v deň odchodu do dôchodku a koľko z nej môžete mesačne čerpať.",
    ],
    comoSeCalcula: [
      "Úspory každý mesiac rastú o reálny výnos, teda výnos mínus inflácia. Preto je výsledok v dnešných cenách.",
      "Po odchode do dôchodku sa úspory vyplácajú v rovnakých mesačných sumách počas zvoleného počtu rokov. Zostatok medzitým ďalej zarába.",
      "Štátny dôchodok, dane ani poplatky za investície sa nezapočítavajú.",
    ],
    ejemplo: [
      `Ak v 30 rokoch máte ${m(actual)} a každý mesiac pridáte ${m(aporte)} s reálnym výnosom 4 %, do 65 rokov nasporíte ${m(capital30)}. To vystačí na ${m(rentaMensual(capital30, 4, 25))} mesačne počas 25 rokov.`,
      `Keď začnete s rovnakými číslami až v 40 rokoch, vyjde ${m(capital40)}. Desať rokov navyše robí veľký rozdiel.`,
    ],
    faq: [
      {
        pregunta: "Čo je reálny výnos?",
        respuesta: "To, čo investície vynesú po odpočítaní inflácie. Keď investícia vynáša 7 % a inflácia je 3 %, reálny výnos je zhruba 4 %.",
      },
      {
        pregunta: "Nahradí to štátny dôchodok?",
        respuesta: "Nie. Ide o vaše vlastné úspory navyše k štátnemu dôchodku alebo doplnkovému dôchodkovému sporeniu. Odhad štátneho dôchodku vám poskytne príslušný úrad vo vašej krajine.",
      },
      {
        pregunta: "Koľko si odkladať na dôchodok?",
        respuesta: "Jediné správne číslo neexistuje. Bežné pravidlo odporúča odkladať 10 až 15 % príjmu. Najdôležitejšie je začať čo najskôr.",
      },
    ],
    glosario: [
      { termino: "Reálny výnos", definicion: "To, čo investície vynášajú nad infláciu." },
      { termino: "Dnešné ceny", definicion: "Budúca suma vyjadrená tým, čo sa za ňu dá kúpiť dnes." },
    ],
  };
};
